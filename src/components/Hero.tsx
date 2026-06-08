import { site } from "../lib/site";
import { YorkLogo } from "./YorkLogo";
import { ArrowDownIcon, InstagramIcon, LinkedInIcon, MailIcon } from "./icons";
import pfp from "../assets/xiaopfp.avif";

const languages = [
  { flag: "🇧🇷", name: "Portuguese", level: "Native" },
  { flag: "🇨🇦", name: "English", level: "Fluent" },
  { flag: "🇨🇳", name: "Chinese", level: "Advanced" },
];

export function Hero() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 pt-28 pb-16 sm:px-8">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Photo */}
        <div className="order-1 flex justify-center md:justify-start">
          <div className="rounded-[2rem] bg-[#f4ede4] p-4 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.3)]">
            <img
              src={pfp}
              alt="Xiao Yi Song"
              className="h-64 w-64 rounded-[1.5rem] object-cover sm:h-80 sm:w-80"
            />
          </div>
        </div>

        {/* Intro */}
        <div className="order-2 text-left">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-ink-soft">
            Marketing · Human Resources · Event Planning
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Hi, my name is
            <br />
            <span className="italic text-accent">Xiao Yi</span>
            <span className="text-ink">.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            A brand marketer and video storyteller. I shape campaigns from first
            concept to final cut, and I've learned to do it across cultures and
            continents. 
          </p>

          <div className="mt-7 flex items-center gap-3">
            <YorkLogo className="h-9" />
            <span className="h-8 w-px bg-line" />
            <span className="text-sm leading-tight">
              <span className="block text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                Bachelor's in
              </span>
              <span className="font-medium text-ink">Communication &amp; Media Studies</span>
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {languages.map((l) => (
              <span key={l.name} className="flex items-center gap-2 text-sm">
                <span className="text-base leading-none">{l.flag}</span>
                <span className="text-ink">{l.name}</span>
                <span className="text-ink-soft">({l.level})</span>
              </span>
            ))}
          </div>

          <div id="social" className="mt-7 flex items-center gap-3">
            {[
              { Icon: InstagramIcon, href: site.instagram, label: "Instagram" },
              { Icon: LinkedInIcon, href: site.linkedin, label: "LinkedIn" },
              { Icon: MailIcon, href: `mailto:${site.email}`, label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work"
        className="mt-14 flex justify-center text-ink-soft"
      >
        <ArrowDownIcon className="h-6 w-6 animate-floaty" />
      </a>
    </section>
  );
}
