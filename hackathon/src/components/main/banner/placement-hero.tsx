import Image from "next/image"
import { GlassButton } from "./glass-button"

export default function PlacementHero() {
  return (
    <main className="relative h-[55vh] w-full">
      {/* background image */}
      <Image
        src="/2.png"
        alt=""
        width={1920}
        height={1080}
        aria-hidden="true"
        className="absolute left-0 top-0 w-full h-[400px] object-cover md:h-[600px]"
      />
      {/* overlays for readability */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-blue-900/20" />

      {/* content */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 py-16 md:flex-row md:items-center md:justify-between md:gap-16 md:px-10 md:py-24">
        <h1 className="text-pretty text-4xl font-semibold leading-tight text-white drop-shadow md:text-6xl">
          {"Preparing for Placement?"}
        </h1>

        <div className="flex w-full max-w-xs flex-col gap-6 md:max-w-sm">
          <GlassButton label="STUDENT" href="/student" />
          <GlassButton label="COMPANY" href="/company" />
          <GlassButton label="TPO" href="/tpo" />
        </div>
      </section>
    </main>
  )
}
