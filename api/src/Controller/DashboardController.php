<?php

namespace App\Controller;

use App\Repository\SiteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class DashboardController extends AbstractController
{
    #[Route('/api/dashboard', name: 'api_dashboard', methods: ['GET'])]
    public function __invoke(SiteRepository $siteRepository): JsonResponse
    {
        return $this->json(
            $siteRepository->getDashboard()
        );
    }
}