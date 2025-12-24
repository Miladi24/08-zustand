import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type PageProps = {
  params: Promise<{ id: string }>;
};

/* ---------- Metadata ---------- */
export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const { id } = await props.params;

  try {
    const note = await fetchNoteById(id);

    if (!note) {
      return {
        title: "Note not found",
        description: "The requested note does not exist",
      };
    }

    return {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 50),
      openGraph: {
        title: note.title,
        description: note.content,
        url: `/notes/${id}`,
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
  } catch {
    return {
      title: "Note",
      description: "Failed to load note",
    };
  }
}

/* ---------- Page ---------- */
export default async function NoteDetailsPage(
  props: PageProps
) {
  const { id } = await props.params;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch {
    // не валимо SSR
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}

