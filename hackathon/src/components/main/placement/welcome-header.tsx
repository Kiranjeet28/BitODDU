"use client"

export function WelcomeHeader() {
  return (
    <header className="w-full">
      {/* Large welcoming headline matching the reference */}
      <h1 className="text-pretty text-center font-sans font-semibold text-4xl md:text-6xl text-slate-700 drop-shadow-sm">
        Welcome to Placement Tracker
      </h1>
    </header>
  )
}

export default WelcomeHeader
