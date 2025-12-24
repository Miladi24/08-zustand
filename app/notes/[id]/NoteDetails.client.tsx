"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import css from "./NoteDetailsClient.module.css";

type Props = {
  noteId: string;
};

const NoteDetailsClient = ({ noteId }: Props) => {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
  });

  useEffect(() => {
    if (note?.createdAt) {
      setFormattedDate(new Date(note.createdAt).toLocaleString());
    }
  }, [note]);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <button className={css.backBtn} onClick={() => router.back()}>
          Back
        </button>

        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {formattedDate}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
