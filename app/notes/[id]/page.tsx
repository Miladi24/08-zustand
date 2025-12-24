import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type PageProps = {
  params: { id: string };
};

/* ---------- Metadata ---------- */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 50),
    openGraph: {
      title: note.title,
      description: note.content,
      url: `/notes/${params.id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub – modern note-taking app",
        },
      ],
    },
  };
}

/* ---------- Page ---------- */
export default async function NoteDetails({ params }: PageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={params.id} />
    </HydrationBoundary>
  );
}
