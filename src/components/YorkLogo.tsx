import yorkLogo from "../assets/Logo_York_University.svg.png";

export function YorkLogo({ className = "h-7" }: { className?: string }) {
  return (
    <img
      src={yorkLogo}
      alt="York University"
      className={`w-auto ${className}`}
    />
  );
}
