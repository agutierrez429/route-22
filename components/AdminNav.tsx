import Link from "next/link";

type AdminNavItem = {
  href: string;
  label: string;
  id: "memory" | "stops" | "photos" | "final";
};

type AdminNavProps = {
  current: AdminNavItem["id"];
};

const adminNavItems: AdminNavItem[] = [
  { href: "/admin/stops", label: "Add Stop", id: "stops" },
  { href: "/admin/stop-photos", label: "Stop Photos", id: "photos" },
  { href: "/admin/final-stop", label: "Final Stop", id: "final" },
  { href: "/admin", label: "Scrapbook", id: "memory" },
];

export default function AdminNav({ current }: AdminNavProps) {
  return (
    <nav className="grid gap-2 sm:grid-cols-4" aria-label="Admin tools">
      {adminNavItems.map((item) => {
        const isActive = item.id === current;

        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={[
              "flex min-h-12 items-center justify-center rounded-2xl border px-4 py-3 text-center text-sm font-black transition",
              isActive
                ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                : "border-pink-200 bg-white text-slate-700 shadow hover:-translate-y-0.5 hover:border-pink-300 hover:text-pink-600",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
