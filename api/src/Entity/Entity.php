<?php

namespace App\Entity;

use App\Repository\EntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EntityRepository::class)]
class Entity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::SMALLINT, nullable: true)]
    private ?int $sort = null;

    #[ORM\Column(length: 10, nullable: true)]
    private ?string $color = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $theme = null;

    /**
     * @var Collection<int, Group>
     */
    #[ORM\OneToMany(targetEntity: Group::class, mappedBy: 'entity')]
    private Collection $company_group;

    /**
     * @var Collection<int, Site>
     */
    #[ORM\OneToMany(targetEntity: Site::class, mappedBy: 'entity')]
    private Collection $sites;

    public function __construct()
    {
        $this->company_group = new ArrayCollection();
        $this->sites = new ArrayCollection();
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

    public function getSort(): ?int
    {
        return $this->sort;
    }

    public function setSort(?int $sort): static
    {
        $this->sort = $sort;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getTheme(): ?string
    {
        return $this->theme;
    }

    public function setTheme(?string $theme): static
    {
        $this->theme = $theme;

        return $this;
    }

    /**
     * @return Collection<int, Group>
     */
    public function getCompanyGroup(): Collection
    {
        return $this->company_group;
    }

    public function addCompanyGroup(Group $companyGroup): static
    {
        if (!$this->company_group->contains($companyGroup)) {
            $this->company_group->add($companyGroup);
            $companyGroup->setEntity($this);
        }

        return $this;
    }

    public function removeCompanyGroup(Group $companyGroup): static
    {
        if ($this->company_group->removeElement($companyGroup)) {
            // set the owning side to null (unless already changed)
            if ($companyGroup->getEntity() === $this) {
                $companyGroup->setEntity(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Site>
     */
    public function getSites(): Collection
    {
        return $this->sites;
    }

    public function addSite(Site $site): static
    {
        if (!$this->sites->contains($site)) {
            $this->sites->add($site);
            $site->setEntity($this);
        }

        return $this;
    }

    public function removeSite(Site $site): static
    {
        if ($this->sites->removeElement($site)) {
            // set the owning side to null (unless already changed)
            if ($site->getEntity() === $this) {
                $site->setEntity(null);
            }
        }

        return $this;
    }
}
