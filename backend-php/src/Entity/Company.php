<?php

// Entity/Company.php

declare(strict_types=1);

class Company
{
    private ?int $id = null;
    private string $name;
    private ?string $alias = null;
    private ?string $createdAt = null;
    private bool $isDeleted;

    public function __construct(string $name, ?string $alias = null)
    {
        $this->name = $name;
        $this->alias = $alias;
    }

    // Getters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getAlias(): ?string
    {
        return $this->alias;
    }

    public function getCreatedAt(): ?string
    {
        return $this->createdAt;
    }

    public function getIsDeleted(): bool
    {
        return $this->isDeleted;
    }

    // Setters

    // auto-incremented by db
    /* public function setId(int $id): void */
    /* { */
    /*     $this->id = $id; */
    /* } */

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function setAlias(?string $alias): void
    {
        $this->alias = $alias;
    }

    // set by db
    /* public function setCreatedAt(string $createdAt): void */
    /* { */
    /*     $this->createdAt = $createdAt; */
    /* } */

    public function delete(): void
    {
        $this->isDeleted = true;
    }

    public function restore(): void
    {
        $this->isDeleted = false;
    }
}
