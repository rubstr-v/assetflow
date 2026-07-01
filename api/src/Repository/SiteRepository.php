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

    private function isValidDate(?string $value): bool
    {
        if (!$value) return false;

        if (in_array($value, ['N/A', 'CDI', 'CDI ', ''])) {
            return false;
        }

        return (bool) \DateTime::createFromFormat('Y-m-d', $value);
    }

    public function getContractStats(): array
    {
        $sites = $this->createQueryBuilder('s')
            ->select('s.contractExpirationDate')
            ->getQuery()
            ->getArrayResult();

        $now = new \DateTime();
        $limit = (clone $now)->modify('+3 months');

        $expired = 0;
        $expiringSoon = 0;

        foreach ($sites as $site) {
            $value = $site['contractExpirationDate'] ?? null;

            if (!$value || in_array($value, ['CDI', 'N/A', ''], true)) {
                continue;
            }

            $date = \DateTime::createFromFormat('d/m/Y', $value);

            if (!$date) {
                continue;
            }

            if ($date < $now) {
                $expired++;
            } elseif ($date <= $limit) {
                $expiringSoon++;
            }
        }

        return [
            'expired' => $expired,
            'expiringSoon' => $expiringSoon,
        ];
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

        $contractStats = $this->getContractStats();

        return [
            'sitesCount' => $sitesCount,
            'employeesCount' => $employeesCount,
            'documentsCount' => 0,
            'contactsCount' => 0,
            'expiredContractsCount' => $contractStats['expired'],
            'expiringContractsCount' => $contractStats['expiringSoon'],
            'sites' => array_map(fn($s) => [
                'id' => $s['id'],
                'name' => $s['name'],
                'latitude' => $s['latitude'],
                'longitude' => $s['longitude'],
            ], $sites),
        ];
    }
}
