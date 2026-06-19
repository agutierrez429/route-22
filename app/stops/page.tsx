import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function StopsIndexPage() {
  const { data: stops, error } = await supabase
    .from("stops")
    .select("id")
    .order("order_index", { ascending: true })
    .limit(1);

  if (error || !stops || stops.length === 0) {
    redirect("/intro");
  }

  redirect(`/stops/${stops[0].id}`);
}