<?php

namespace App\Security;

use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class EmailAuthenticator extends AbstractAuthenticator
{
    public function __construct(
        private UserRepository $userRepository
    ) {}

    public function supports(Request $request): ?bool
    {
        return $request->attributes->get('_route') === 'auth_email_callback';
    }

    public function authenticate(Request $request): SelfValidatingPassport
    {
        $token = $request->query->get('token');
        $email = $request->query->get('email');

        if (!$token || !$email) {
            throw new AuthenticationException('Missing token/email');
        }

        return new SelfValidatingPassport(
            new UserBadge($email, function ($identifier) use ($token) {

                $user = $this->userRepository->findOneBy([
                    'email' => $identifier,
                    'token' => $token,
                ]);

                if (!$user) {
                    throw new AuthenticationException('Invalid token');
                }

                if ($user->getExpiredAt() < new \DateTime()) {
                    throw new AuthenticationException('Token expired');
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
        return new RedirectResponse('http://localhost:5174/');    
    }

    public function onAuthenticationFailure(
        Request $request,
        AuthenticationException $exception
    ): ?Response {
        return new RedirectResponse('http://localhost:5174/login');
    }
}