<?php

namespace App\Entity;

use App\Repository\SiteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;

#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ],
    normalizationContext: ['groups' => ['site:read']],
    denormalizationContext: ['groups' => ['site:write']],
)]
#[ApiFilter(SearchFilter::class, properties: [
    'name' => 'ipartial',
    'address' => 'ipartial',
    'siteRef' => 'ipartial',
    'entity.id' => 'exact',
    'entity.name' => 'ipartial',
    'siteType.name' => 'ipartial',
    'supplier' => 'ipartial',
    'numberEmployees' => 'exact',
    'siteType.id' => 'exact',
    'siteCriticity.id' => 'exact',
    'siteCategory.id' => 'exact',
])]
#[ORM\Entity(repositoryClass: SiteRepository::class)]
class Site
{
    #[Groups(['site:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['site:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name = null;

    #[Groups(['site:read'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $address = null;

    #[Groups(['site:read'])]
    #[ORM\Column(nullable: true)]
    private ?float $latitude = null;

    #[Groups(['site:read'])]
    #[ORM\Column(nullable: true)]
    private ?float $longitude = null;

    #[Groups(['site:read'])]
    #[ORM\Column(length: 40, nullable: true)]
    private ?string $siteRef = null;

    #[Groups(['site:read'])]
    #[ORM\ManyToOne(inversedBy: 'sites')]
    private ?SiteType $siteType = null;

    #[Groups(['site:read'])]
    #[ORM\ManyToOne(inversedBy: 'sites')]
    private ?SiteCriticity $siteCriticity = null;

    #[Groups(['site:read'])]
    #[ORM\ManyToOne(inversedBy: 'siteManager')]
    private ?User $siteManager = null;

    #[Groups(['site:read'])]
    #[ORM\ManyToOne(inversedBy: 'safetyManager')]
    private ?User $safetyManager = null;

    #[Groups(['site:read'])]
    #[ORM\Column(nullable: true)]
    private ?int $numberEmployees = null;

    #[Groups(['site:read'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $recommendations = null;

    #[Groups(['site:read'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comments = null;

    #[Groups(['site:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $contractExpirationDate = null;

    #[Groups(['site:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $exitConditions = null;

    #[Groups(['site:read'])]
    #[ORM\ManyToOne(inversedBy: 'sites')]
    private ?Entity $entity = null;

    #[Groups(['site:read'])]
    #[ORM\ManyToOne(inversedBy: 'securityManager')]
    private ?User $securityManager = null;

    #[Groups(['site:read'])]
    #[ORM\ManyToOne(inversedBy: 'siteCategory')]
    private ?SiteCategory $siteCategory = null;

    #[Groups(['site:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $nbEtpSite = null;

    #[Groups(['site:read'])]
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

    #[ORM\Column(type: Types::SIMPLE_ARRAY, nullable: true)]
    private ?array $polygon = null;

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

    public function getPolygon(): ?array
    {
        return $this->polygon;
    }

    public function setPolygon(?array $polygon): static
    {
        $this->polygon = $polygon;

        return $this;
    }
}
