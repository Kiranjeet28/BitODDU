type Props = {
  title?: string
  subtitle?: string
}

export function WelcomeTitle({ title = "Welcome to Placement Tracker", subtitle }: Props) {
  return (
    <header className="mb-8 md:mb-12 text-center md:text-left">
      <h1 className="text-pretty font-sans text-4xl md:text-6xl font-semibold tracking-tight text-foreground drop-shadow-sm">
        {title}
      </h1>
      {subtitle ? <p className="mt-3 text-muted-foreground max-w-prose">{subtitle}</p> : null}
    </header>
  )
}
