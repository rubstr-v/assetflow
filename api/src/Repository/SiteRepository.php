<?php

namespace App\Repository;

use App\Entity\Site;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Site>
 */
class SiteRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Site::class);
    }

    public function getDashboard(): array
    {
        $em = $this->getEntityManager();

        // 1. stats sites
        $sitesCount = (int) $this->createQueryBuilder('s')
            ->select('COUNT(s.id)')
            ->getQuery()
            ->getSingleScalarResult();

        // 2. employees total
        $employeesCount = (int) $this->createQueryBuilder('s')
            ->select('COALESCE(SUM(s.numberEmployees), 0)')
            ->getQuery()
            ->getSingleScalarResult();

        // 3. sites pour la map (DTO léger)
        $sites = $this->createQueryBuilder('s')
            ->select('s.id, s.name, s.latitude, s.longitude, s.siteRef')
            ->getQuery()
            ->getArrayResult();

        return [
            'sitesCount' => $sitesCount,
            'employeesCount' => $employeesCount,
            'documentsCount' => 0, // placeholder (à brancher plus tard)
            'contactsCount' => 0,  // placeholder
            'sites' => array_map(fn($s) => [
                'id' => $s['id'],
                'name' => $s['name'],
                'latitude' => $s['latitude'],
                'longitude' => $s['longitude'],
            ], $sites),
        ];
    }
}
