<?php

namespace App\Entity;

use App\Repository\SiteCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;


#[ApiResource]
#[ORM\Entity(repositoryClass: SiteCategoryRepository::class)]
class SiteCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, Site>
     */
    #[ORM\OneToMany(targetEntity: Site::class, mappedBy: 'siteCategory')]
    private Collection $siteCategory;

    public function __construct()
    {
        $this->siteCategory = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Site>
     */
    public function getSiteCategory(): Collection
    {
        return $this->siteCategory;
    }

    public function addSiteCategory(Site $siteCategory): static
    {
        if (!$this->siteCategory->contains($siteCategory)) {
            $this->siteCategory->add($siteCategory);
            $siteCategory->setSiteCategory($this);
        }

        return $this;
    }

    public function removeSiteCategory(Site $siteCategory): static
    {
        if ($this->siteCategory->removeElement($siteCategory)) {
            // set the owning side to null (unless already changed)
            if ($siteCategory->getSiteCategory() === $this) {
                $siteCategory->setSiteCategory(null);
            }
        }

        return $this;
    }
}
