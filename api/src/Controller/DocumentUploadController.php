<?php

namespace App\Controller;

use App\Entity\Document;
use App\Entity\Site;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

class DocumentUploadController
{
    public function __construct(
        private EntityManagerInterface $em,
        private SluggerInterface $slugger,
    ) {
    }

    #[Route('/api/documents/upload', name: 'document_upload', methods: ['POST'])]
    public function __invoke(Request $request): JsonResponse
    {
        /** @var UploadedFile|null $file */
        $file = $request->files->get('file');

        if (!$file) {
            return new JsonResponse(['error' => 'No file'], 400);
        }

        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($filename);
        $newFilename = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();

        $file->move(
            $this->getUploadDirectory(),
            $newFilename
        );

        $siteIri = $request->request->get('site');
        $siteId = basename($siteIri);

        $site = $this->em->getRepository(Site::class)->find($siteId);

        $document = new Document();
        $document->setName($request->request->get('name'));
        $document->setType($request->request->get('type'));
        $document->setSize($request->request->get('size'));
        $document->setAddedDate(new \DateTime());
        $document->setSite($site);

        // on stocke uniquement le chemin
        $document->setPath('/uploads/documents/'.$newFilename);

        $this->em->persist($document);
        $this->em->flush();

        return new JsonResponse([
            'id' => $document->getId(),
            'name' => $document->getName(),
            'type' => $document->getType(),
            'size' => $document->getSize(),
            'addedDate' => $document->getAddedDate()->format(DATE_ATOM),
            'path' => $document->getPath(),
        ]);
    }

    private function getUploadDirectory(): string
    {
        return dirname(__DIR__, 2).'/public/uploads/documents';
    }

    #[Route('/api/documents/{id}/download', methods: ['GET'])]
    public function download(Document $document): Response
    {
        $filePath = $this->getUploadDirectory() . '/' . basename($document->getPath());

        if (!file_exists($filePath)) {
            throw $this->createNotFoundException('File not found');
        }

        return new Response(
            file_get_contents($filePath),
            200,
            [
                'Content-Type' => 'application/octet-stream',
                'Content-Disposition' => 'attachment; filename="'.$document->getName().'"'
            ]
        );
    }
}