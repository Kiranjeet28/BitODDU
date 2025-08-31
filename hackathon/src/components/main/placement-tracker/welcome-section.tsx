import { WelcomeTitle } from "./welcome-title"
import { FeatureMap } from "./feature-map"

export function PlacementWelcomeSection() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-16">
        <WelcomeTitle />
        <FeatureMap />
      </div>
    </section>
  )
}
