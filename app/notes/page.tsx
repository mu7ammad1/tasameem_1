"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("notes").select();

      setNotes(data);
    };

    getData();
  }, []);

  return (
    <main>
      <div>
        {notes?.map(({ id, title }: any) => <div key={id}>{title}</div>)}
      </div>
    </main>
  );
}
