import { useEffect, useRef, useState } from "react";
import { YorkLogo } from "./YorkLogo";
import { PlayIcon } from "./icons";
import instagramLogo from "../assets/Instagram_logo_2016.svg.png";

const ADVANCE_MS = 7000;

const reels = [
  "/media/reel1.mp4",
  "/media/reel2.mp4",
  "/media/reel1.mp4",
  "/media/reel2.mp4",
  "/media/reel1.mp4",
  "/media/reel2.mp4",
];

const stats = [
  { value: "120", unit: "K", label: "Views" },
  { value: "10", unit: "K", label: "Likes" },
  { value: "16.4", unit: "%", label: "Engagement" },
];

const N = reels.length;

/** Normalized offset of phone `i` from the active center, in range [-N/2, N/2]. */
function relativeOffset(i: number, active: number) {
  let rel = (i - active) % N;
  if (rel < -N / 2) rel += N;
  if (rel > N / 2) rel -= N;
  return rel;
}

const LAYOUTS = {
  desktop: {
    slots: [
      { x: 0, scale: 1, rotateY: 0, z: 40 },
      { x: 215, scale: 0.82, rotateY: 24, z: 30 },
      { x: 360, scale: 0.64, rotateY: 32, z: 20 },
    ],
    offstageX: 430,
  },
  mobile: {
    slots: [
      { x: 0, scale: 1, rotateY: 0, z: 40 },
      { x: 118, scale: 0.78, rotateY: 22, z: 30 },
      { x: 180, scale: 0.58, rotateY: 30, z: 20 },
    ],
    offstageX: 220,
  },
};

/** Discrete slot layout — phones only ever sit in one of these positions. */
function slotStyle(rel: number, mobile: boolean) {
  const sign = Math.sign(rel);
  const abs = Math.abs(rel);
  const layout = mobile ? LAYOUTS.mobile : LAYOUTS.desktop;
  const config = layout.slots[Math.min(abs, 2)];

  // anything farther than 2 steps away is parked off-stage (where the wrap happens)
  const offstage = abs > 2;
  const x = offstage ? sign * layout.offstageX : sign * config.x;
  const scale = offstage ? 0.5 : config.scale;
  const opacity = offstage ? 0 : 1;
  const rotateY = -sign * (offstage ? 36 : config.rotateY);
  const z = offstage ? 0 : config.z;

  return {
    transform: `translateX(calc(-50% + ${x}px)) scale(${scale}) rotateY(${rotateY}deg)`,
    opacity,
    zIndex: z,
    pointerEvents: offstage ? "none" : "auto",
  } as const;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 639px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}

export function ReelsCarousel() {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Advance one position every 7 seconds. Re-running on `active` change also
  // restarts the countdown when a viewer manually selects a phone.
  useEffect(() => {
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % N);
    }, ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active]);

  // Only the centered phone plays; the rest pause and dim.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        void v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  return (
    <section id="reels" className="overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="font-serif text-2xl italic text-ink/80 sm:text-3xl">Social Media Content</p>

        {/* Account + stats */}
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <img
              src={instagramLogo}
              alt="Instagram"
              className="h-7 w-7 rounded-[7px]"
            />
            <span className="h-6 w-px bg-line" />
            <YorkLogo className="h-8" />
            <span className="h-6 w-px bg-line" />
            <span className="text-left leading-tight">
              <span className="block font-medium text-ink">York International</span>
              <span className="text-xs text-ink-soft">@yorkuintlstdnts</span>
            </span>
          </div>

          <div className="mt-8 flex items-start gap-8 sm:gap-16">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="font-serif text-4xl text-ink sm:text-5xl">
                  {s.value}
                  <span className="align-top text-lg text-accent">{s.unit}</span>
                </span>
                <span className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Phone carousel */}
        <div
          className="relative mt-10 h-[360px] w-full sm:mt-12 sm:h-[460px]"
          style={{ perspective: "1400px" }}
        >
          {reels.map((src, i) => {
            const rel = relativeOffset(i, active);
            const isActive = i === active;
            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                role="button"
                aria-label={isActive ? "Now playing" : "Play this reel"}
                className={`absolute left-1/2 top-1/2 -translate-y-1/2 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive ? "cursor-default" : "cursor-pointer"
                }`}
                style={slotStyle(rel, isMobile)}
              >
                <div
                  className={`relative h-[300px] w-[150px] overflow-hidden rounded-[1.7rem] border-[5px] border-black bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] transition-[filter,opacity] duration-700 sm:h-[420px] sm:w-[210px] sm:rounded-[2.2rem] sm:border-[6px] ${
                    isActive
                      ? ""
                      : "opacity-70 brightness-[0.45] grayscale hover:opacity-90 hover:brightness-[0.6]"
                  }`}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    className="h-full w-full object-cover"
                    src={src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-ink shadow-lg">
                        <PlayIcon className="h-5 w-5 translate-x-0.5" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
