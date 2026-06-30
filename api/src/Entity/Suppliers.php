<?php

namespace App\Entity;

use App\Repository\SuppliersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SuppliersRepository::class)]
class Suppliers
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $executiveName = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $chiefName = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $address = null;

    #[ORM\Column(nullable: true)]
    private ?float $caSupplier = null;

    #[ORM\Column(nullable: true)]
    private ?float $caGroup = null;

    /**
     * @var Collection<int, Document>
     */
    #[ORM\OneToMany(targetEntity: Document::class, mappedBy: 'supplier')]
    private Collection $documents;

    /**
     * @var Collection<int, Contact>
     */
    #[ORM\OneToMany(targetEntity: Contact::class, mappedBy: 'supplier')]
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

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getExecutiveName(): ?string
    {
        return $this->executiveName;
    }

    public function setExecutiveName(?string $executiveName): static
    {
        $this->executiveName = $executiveName;

        return $this;
    }

    public function getChiefName(): ?string
    {
        return $this->chiefName;
    }

    public function setChiefName(?string $chiefName): static
    {
        $this->chiefName = $chiefName;

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

    public function getCaSupplier(): ?float
    {
        return $this->caSupplier;
    }

    public function setCaSupplier(?float $caSupplier): static
    {
        $this->caSupplier = $caSupplier;

        return $this;
    }

    public function getCaGroup(): ?float
    {
        return $this->caGroup;
    }

    public function setCaGroup(?float $caGroup): static
    {
        $this->caGroup = $caGroup;

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
            $document->setSupplier($this);
        }

        return $this;
    }

    public function removeDocument(Document $document): static
    {
        if ($this->documents->removeElement($document)) {
            // set the owning side to null (unless already changed)
            if ($document->getSupplier() === $this) {
                $document->setSupplier(null);
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
            $contact->setSupplier($this);
        }

        return $this;
    }

    public function removeContact(Contact $contact): static
    {
        if ($this->contacts->removeElement($contact)) {
            // set the owning side to null (unless already changed)
            if ($contact->getSupplier() === $this) {
                $contact->setSupplier(null);
            }
        }

        return $this;
    }
}
