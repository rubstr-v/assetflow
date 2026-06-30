<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260630131017 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE entity ADD company_group_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE entity ADD CONSTRAINT FK_E284468E6C3CC2A FOREIGN KEY (company_group_id) REFERENCES "group" (id)');
        $this->addSql('CREATE INDEX IDX_E284468E6C3CC2A ON entity (company_group_id)');
        $this->addSql('ALTER TABLE "group" DROP CONSTRAINT fk_6dc044c581257d5d');
        $this->addSql('DROP INDEX idx_6dc044c581257d5d');
        $this->addSql('ALTER TABLE "group" DROP entity_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE entity DROP CONSTRAINT FK_E284468E6C3CC2A');
        $this->addSql('DROP INDEX IDX_E284468E6C3CC2A');
        $this->addSql('ALTER TABLE entity DROP company_group_id');
        $this->addSql('ALTER TABLE "group" ADD entity_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "group" ADD CONSTRAINT fk_6dc044c581257d5d FOREIGN KEY (entity_id) REFERENCES entity (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_6dc044c581257d5d ON "group" (entity_id)');
    }
}
