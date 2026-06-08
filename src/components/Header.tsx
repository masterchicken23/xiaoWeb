import { mailto, site } from "../lib/site";

const links = [
  { label: "About", href: "#top" },
  { label: "Video Production", href: "#work" },
  { label: "Social Media", href: "#reels" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-white/65 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-serif text-lg font-medium text-ink">{site.name}</span>
          <span className="text-sm text-ink-soft">{site.nameCN}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={mailto}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}
