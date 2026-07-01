<?php

namespace App\Security;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Core\User\UserInterface;
use TheNetworg\OAuth2\Client\Provider\Azure;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class OAuthAuthenticator extends AbstractAuthenticator
{
    private Azure $provider;

    public function __construct(
        private RouterInterface $router,
        private UserRepository $userRepository,
        private EntityManagerInterface $em,
        array $oauthCredentials
    ) {
        $this->provider = new Azure([
            'clientId' => $oauthCredentials['microsoft_client_id'],
            'clientSecret' => $oauthCredentials['microsoft_client_secret'],
            'redirectUri' => $oauthCredentials['microsoft_redirect_uri'],
            'tenant' => $oauthCredentials['microsoft_tenant'],
        ]);

        $this->provider->defaultEndPointVersion = Azure::ENDPOINT_VERSION_2_0;
    }

    public function supports(Request $request): ?bool
    {
        return $request->attributes->get('_route') === 'auth_microsoft_callback';
    }

    public function authenticate(Request $request): SelfValidatingPassport
    {
        $code = $request->query->get('code');

        if (!$code) {
            throw new AuthenticationException('Missing OAuth code');
        }

        $accessToken = $this->provider->getAccessToken('authorization_code', [
            'code' => $code
        ]);

        $userData = $this->provider
            ->getResourceOwner($accessToken)
            ->toArray();

        $email = $userData['email'] ?? null;

        if (!$email) {
            throw new AuthenticationException('No email from Microsoft');
        }

        return new SelfValidatingPassport(
            new UserBadge($email, function ($identifier): UserInterface {

                $user = $this->userRepository->findOneBy(['email' => $identifier]);

                if (!$user) {
                    throw new AuthenticationException('User not found');
                }

                return $user;
            })
        );
    }

    public function onAuthenticationSuccess(
        Request $request,
        TokenInterface $token,
        string $firewallName
    ): ?Response {
        /** @var \App\Entity\User $user */
        $user = $token->getUser();

        $user->setLastLogin(new \DateTime());

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new RedirectResponse($this->router->generate('app_home'));
    }


    public function onAuthenticationFailure(
        Request $request,
        AuthenticationException $exception
    ): ?Response {
        if ($exception->getMessage() === 'Token has expired') {
            $request->getSession()->getFlashBag()->add(
                'danger',
                'Your authentication link has expired.'
            );
        } else {
            $request->getSession()->getFlashBag()->add(
                'danger',
                'Authentication failed.'
            );
        }

        return new RedirectResponse($this->router->generate('app_login'));
    }

    public function getMicrosoftAuthorizationUrl(): string
    {
        return $this->provider->getAuthorizationUrl();
    }
}