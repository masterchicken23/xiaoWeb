import { useRef, useState } from "react";
import { PauseIcon, PlayIcon, SpeakerOffIcon, SpeakerOnIcon } from "./icons";

export function BigVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    // unmuting may require a fresh play() on some browsers
    if (!next && v.paused) {
      void v.play();
      setPlaying(true);
    }
  };

  return (
    <section id="work" className="relative w-full bg-black">
      <div className="relative w-full">
        <video
          ref={videoRef}
          className="block h-[78vh] w-full object-cover sm:h-auto sm:max-h-[88vh]"
          src="/media/chelsea.mov"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* legibility gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* top label */}
        <p className="absolute left-5 top-5 font-serif text-2xl italic text-white/85 sm:left-10 sm:top-8 sm:text-3xl">
          Post Production
        </p>

        {/* caption + controls */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-10">
          <div className="max-w-xl text-left text-white">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
              Fashion Film · Concept · Direction · Edit
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-5xl">
              Chelsea Nizan <br />
              Autumn/Winter
            </h2>
            <p className="mt-2 font-signature text-3xl text-white/90 sm:text-4xl">
              By Xiao Yi Song
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
            >
              {muted ? (
                <SpeakerOffIcon className="h-5 w-5" />
              ) : (
                <SpeakerOnIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pause video" : "Play video"}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
            >
              {playing ? (
                <PauseIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="h-5 w-5 translate-x-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
