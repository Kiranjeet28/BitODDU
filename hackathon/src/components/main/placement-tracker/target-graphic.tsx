/**
 * Lightweight, CSS-only target/dart accent to echo the reference.
 * Colors: orange accent, blue stroke — matches our 4-color rule.
 */
export function TargetGraphic() {
  return (
    <div
      className="relative mx-auto h-56 w-56 md:h-80 md:w-80 rounded-full"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #ffb27a 0 18%, #ff8a5b 18% 34%, #ffa66a 34% 48%, #ffd7b4 48% 60%, transparent 60%)",
      }}
    >
      {/* outer ring stroke */}
      <div className="absolute inset-0 rounded-full ring-2 ring-blue-700/70" />
      {/* dart body */}
      <div
        className="absolute right-[18%] top-1/2 h-16 w-3 -translate-y-1/2 rounded-sm bg-orange-500 shadow-md"
        style={{ transform: "translateY(-50%) rotate(25deg)" }}
      />
      {/* dart head */}
      <div
        className="absolute right-[12%] top-1/2 h-6 w-6 -translate-y-1/2 bg-orange-600 shadow"
        style={{
          clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
          transform: "translateY(-50%) rotate(25deg)",
        }}
      />
    </div>
  )
}
