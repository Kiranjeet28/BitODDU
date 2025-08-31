import { SocialLinks } from "./social-links"
import { FooterLegal } from "./legal"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/80">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <SocialLinks />
        <FooterLegal />
      </div>
    </footer>
  )
}
