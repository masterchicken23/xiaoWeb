import { site } from "../lib/site";

export function Footer() {
  return (
    <footer className="bg-mist pb-12 pt-6">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-5xl">
          Let's make something worth watching.
        </h2>
        <a
          href={`mailto:${site.email}`}
          className="mt-3 inline-block break-all font-serif text-2xl italic text-accent transition-colors hover:text-accent-strong sm:text-4xl"
        >
          {site.email}
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
          <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-ink">
            Instagram
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            Email
          </a>
          <span>{site.phone}</span>
          <span>{site.location}</span>
        </div>

        <p className="mt-8 text-xs text-ink-soft/80">
          © {new Date().getFullYear()} {site.name} · {site.nameCN}
        </p>
      </div>
    </footer>
  );
}
