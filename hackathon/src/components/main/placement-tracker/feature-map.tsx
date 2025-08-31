import { FeaturePill, type FeatureItem } from "./feature-pill"
import { TargetGraphic } from "./target-graphic"

const defaultItems: FeatureItem[] = [
  { label: "RESUME BUILDER" },
  { label: "JOB APPLICATION TRACKER" },
  { label: "PRACTICE AND MOCK TESTS" },
  { label: "INTERVIEW PREPARATION" },
  { label: "RESOURCES AND LEARNING" },
]

export function FeatureMap({ items = defaultItems }: { items?: FeatureItem[] }) {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left: target graphic */}
        <div className="order-2 md:order-1">
          <TargetGraphic />
        </div>

        {/* Right: pills with dashed connectors */}
        <div className="order-1 md:order-2 flex flex-col gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center">
              {/* connector (hidden on mobile) */}
              <span
                className="hidden md:block w-16 border-t border-dashed border-blue-600/70 mr-3"
                aria-hidden="true"
              />
              <FeaturePill {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
