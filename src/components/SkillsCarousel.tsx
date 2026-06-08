import wordIcon from "../assets/word.png";
import powerBiIcon from "../assets/powerBI.png";
import tableauIcon from "../assets/tableau.png";
import powerpointIcon from "../assets/powerpoint.png";
import excelIcon from "../assets/excel.png";

type Skill = {
  name: string;
  category: string;
  icon?: string;
  glyph?: string;
  bg?: string;
  fg?: string;
};

const skills: Skill[] = [
  { name: "Word", category: "Microsoft Office", icon: wordIcon },
  { name: "Photoshop", category: "Adobe Creative Suite", glyph: "Ps", bg: "#001e36", fg: "#31a8ff" },
  { name: "Lightroom", category: "Adobe Creative Suite", glyph: "Lr", bg: "#001e36", fg: "#31a8ff" },
  { name: "Power BI", category: "Business Intelligence", icon: powerBiIcon },
  { name: "Tableau", category: "Data Visualization", icon: tableauIcon },
  { name: "PowerPoint", category: "Microsoft Office", icon: powerpointIcon },
  { name: "Excel", category: "Microsoft Office", icon: excelIcon },
];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex w-40 shrink-0 flex-col items-center gap-3 rounded-2xl border border-line bg-white px-5 py-6 text-center shadow-[0_10px_30px_-20px_rgba(0,0,0,0.4)]">
      {skill.icon ? (
        <img src={skill.icon} alt={skill.name} className="h-12 w-12 object-contain" />
      ) : (
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold"
          style={{ background: skill.bg, color: skill.fg }}
        >
          {skill.glyph}
        </div>
      )}
      <div className="font-medium text-ink">{skill.name}</div>
      <div className="text-[10px] uppercase leading-tight tracking-[0.14em] text-ink-soft">
        {skill.category}
      </div>
    </div>
  );
}

export function SkillsCarousel() {
  const loop = [...skills, ...skills];

  return (
    <section id="skills" className="bg-mist py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-serif text-2xl italic text-ink/80 sm:text-3xl">Computer Skills</p>
      </div>

      <div className="group relative mt-8 overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-mist to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-mist to-transparent" />

        <div className="marquee-track flex w-max animate-marquee gap-5 px-5">
          {loop.map((skill, i) => (
            <SkillCard key={`${skill.name}-${i}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
