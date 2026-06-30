<?php

namespace App\Entity;

use App\Repository\SiteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SiteRepository::class)]
class Site
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $address = null;

    #[ORM\Column(nullable: true)]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    private ?float $longitude = null;

    #[ORM\Column(length: 40, nullable: true)]
    private ?string $siteRef = null;

    #[ORM\ManyToOne(inversedBy: 'sites')]
    private ?SiteType $siteType = null;

    #[ORM\ManyToOne(inversedBy: 'sites')]
    private ?SiteCriticity $siteCriticity = null;

    #[ORM\ManyToOne(inversedBy: 'sites')]
    private ?User $siteManager = null;

    #[ORM\ManyToOne(inversedBy: 'safetyManager')]
    private ?User $safetyManager = null;

    #[ORM\Column(nullable: true)]
    private ?int $numberEmployees = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $recommendations = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comments = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $contractExpirationDate = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $exitConditions = null;

    #[ORM\ManyToOne(inversedBy: 'sites')]
    private ?Entity $entity = null;

    #[ORM\ManyToOne(inversedBy: 'securityManager')]
    private ?User $securityManager = null;

    #[ORM\ManyToOne(inversedBy: 'siteCategory')]
    private ?SiteCategory $siteCategory = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $nbEtpSite = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $supplier = null;

    /**
     * @var Collection<int, Document>
     */
    #[ORM\OneToMany(targetEntity: Document::class, mappedBy: 'site')]
    private Collection $documents;

    /**
     * @var Collection<int, Contact>
     */
    #[ORM\OneToMany(targetEntity: Contact::class, mappedBy: 'site')]
    private Collection $contacts;

    public function __construct()
    {
        $this->documents = new ArrayCollection();
        $this->contacts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getSiteRef(): ?string
    {
        return $this->siteRef;
    }

    public function setSiteRef(?string $siteRef): static
    {
        $this->siteRef = $siteRef;

        return $this;
    }

    public function getSiteType(): ?SiteType
    {
        return $this->siteType;
    }

    public function setSiteType(?SiteType $siteType): static
    {
        $this->siteType = $siteType;

        return $this;
    }

    public function getSiteCriticity(): ?SiteCriticity
    {
        return $this->siteCriticity;
    }

    public function setSiteCriticity(?SiteCriticity $siteCriticity): static
    {
        $this->siteCriticity = $siteCriticity;

        return $this;
    }

    public function getSiteManager(): ?User
    {
        return $this->siteManager;
    }

    public function setSiteManager(?User $siteManager): static
    {
        $this->siteManager = $siteManager;

        return $this;
    }

    public function getSafetyManager(): ?User
    {
        return $this->safetyManager;
    }

    public function setSafetyManager(?User $safetyManager): static
    {
        $this->safetyManager = $safetyManager;

        return $this;
    }

    public function getNumberEmployees(): ?int
    {
        return $this->numberEmployees;
    }

    public function setNumberEmployees(?int $numberEmployees): static
    {
        $this->numberEmployees = $numberEmployees;

        return $this;
    }

    public function getRecommendations(): ?string
    {
        return $this->recommendations;
    }

    public function setRecommendations(?string $recommendations): static
    {
        $this->recommendations = $recommendations;

        return $this;
    }

    public function getComments(): ?string
    {
        return $this->comments;
    }

    public function setComments(?string $comments): static
    {
        $this->comments = $comments;

        return $this;
    }

    public function getContractExpirationDate(): ?string
    {
        return $this->contractExpirationDate;
    }

    public function setContractExpirationDate(?string $contractExpirationDate): static
    {
        $this->contractExpirationDate = $contractExpirationDate;

        return $this;
    }

    public function getExitConditions(): ?string
    {
        return $this->exitConditions;
    }

    public function setExitConditions(?string $exitConditions): static
    {
        $this->exitConditions = $exitConditions;

        return $this;
    }

    public function getEntity(): ?Entity
    {
        return $this->entity;
    }

    public function setEntity(?Entity $entity): static
    {
        $this->entity = $entity;

        return $this;
    }

    public function getSecurityManager(): ?User
    {
        return $this->securityManager;
    }

    public function setSecurityManager(?User $securityManager): static
    {
        $this->securityManager = $securityManager;

        return $this;
    }

    public function getSiteCategory(): ?SiteCategory
    {
        return $this->siteCategory;
    }

    public function setSiteCategory(?SiteCategory $siteCategory): static
    {
        $this->siteCategory = $siteCategory;

        return $this;
    }

    public function getNbEtpSite(): ?string
    {
        return $this->nbEtpSite;
    }

    public function setNbEtpSite(?string $nbEtpSite): static
    {
        $this->nbEtpSite = $nbEtpSite;

        return $this;
    }

    public function getSupplier(): ?string
    {
        return $this->supplier;
    }

    public function setSupplier(?string $supplier): static
    {
        $this->supplier = $supplier;

        return $this;
    }

    /**
     * @return Collection<int, Document>
     */
    public function getDocuments(): Collection
    {
        return $this->documents;
    }

    public function addDocument(Document $document): static
    {
        if (!$this->documents->contains($document)) {
            $this->documents->add($document);
            $document->setSite($this);
        }

        return $this;
    }

    public function removeDocument(Document $document): static
    {
        if ($this->documents->removeElement($document)) {
            // set the owning side to null (unless already changed)
            if ($document->getSite() === $this) {
                $document->setSite(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Contact>
     */
    public function getContacts(): Collection
    {
        return $this->contacts;
    }

    public function addContact(Contact $contact): static
    {
        if (!$this->contacts->contains($contact)) {
            $this->contacts->add($contact);
            $contact->setSite($this);
        }

        return $this;
    }

    public function removeContact(Contact $contact): static
    {
        if ($this->contacts->removeElement($contact)) {
            // set the owning side to null (unless already changed)
            if ($contact->getSite() === $this) {
                $contact->setSite(null);
            }
        }

        return $this;
    }
}
