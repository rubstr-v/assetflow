<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Service\EmailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Security\OAuthAuthenticator;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends AbstractController
{
    #[Route('/auth/email/request', name: 'auth_email_request', methods: ['POST'])]
    public function requestEmailLogin(
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $em,
        EmailService $emailService,
    ): JsonResponse {
        $email = $request->toArray()['email'] ?? null;

        if (!$email) {
            return $this->json(['error' => 'Missing email'], 400);
        }

        $user = $userRepository->findOneBy(['email' => $email]);

        if (!$user) {
            return $this->json(['error' => 'User not found'], 404);
        }

        $token = bin2hex(random_bytes(32));

        $user->setToken($token);
        $user->setExpiredAt(new \DateTime('+10 minutes'));

        $em->flush();

        $url = $this->generateUrl('auth_email_callback', [
            'token' => $token,
            'email' => $email,
        ], true);

        // envoi email
        $emailService->sendMagicLink($email, $url);

        return $this->json(['status' => 'sent', 'url' => $url]);
    }

    #[Route('/auth/microsoft', name: 'auth_microsoft_redirect')]
    public function microsoftRedirect(OAuthAuthenticator $authenticator)
    {
        return $this->redirect($authenticator->getMicrosoftAuthorizationUrl());
    }

    #[Route('/auth/email/callback', name: 'auth_email_callback', methods: ['GET'])]
    public function emailCallback(): Response
    {
        // L'authenticator EmailAuthenticator gère déjà le login
        // donc ici on ne fait RIEN

        return $this->redirect('/app');
    }

    #[Route('/auth/microsoft/callback', name: 'auth_microsoft_callback', methods: ['GET'])]
    public function microsoftCallback(): Response
    {
        // géré par OAuthAuthenticator
        return $this->redirect('/app');
    }

    #[Route('/api/me', methods: ['GET'])]
    public function me()
    {
        return $this->json($this->getUser());
    }

    #[Route('/logout', name: 'app_logout', methods: ['GET'])]
    public function logout(): never
    {
        throw new \LogicException('This should never be reached.');
    }
}
