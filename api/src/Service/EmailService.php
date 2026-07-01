<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EmailService
{
    public function __construct(
        private MailerInterface $mailer,
    ) {}

    public function sendMagicLink(string $to, string $url): void
    {
        $email = (new Email())
            ->from('no-reply@assetflow.local')
            ->to($to)
            ->subject('Your login link')
            ->html("
                <p>Click to login:</p>
                <p><a href=\"$url\">Login</a></p>
            ");

        $this->mailer->send($email);
    }
}