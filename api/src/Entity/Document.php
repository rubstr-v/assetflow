<?php

namespace App\Entity;

use App\Repository\DocumentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DocumentRepository::class)]
class Document
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $size = null;

    #[ORM\Column(type: Types::BLOB)]
    private mixed $file = null;

    #[ORM\Column]
    private ?\DateTime $addedDate = null;

    #[ORM\ManyToOne(inversedBy: 'documents')]
    private ?Site $site = null;

    #[ORM\ManyToOne(inversedBy: 'documents')]
    private ?Suppliers $supplier = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): static
    {
        $this->type = $type;

        return $this;
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

    public function getSize(): ?string
    {
        return $this->size;
    }

    public function setSize(string $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getFile(): mixed
    {
        return $this->file;
    }

    public function setFile(mixed $file): static
    {
        $this->file = $file;

        return $this;
    }

    public function getAddedDate(): ?\DateTime
    {
        return $this->addedDate;
    }

    public function setAddedDate(\DateTime $addedDate): static
    {
        $this->addedDate = $addedDate;

        return $this;
    }

    public function getSite(): ?Site
    {
        return $this->site;
    }

    public function setSite(?Site $site): static
    {
        $this->site = $site;

        return $this;
    }

    public function getSupplier(): ?Suppliers
    {
        return $this->supplier;
    }

    public function setSupplier(?Suppliers $supplier): static
    {
        $this->supplier = $supplier;

        return $this;
    }
}
