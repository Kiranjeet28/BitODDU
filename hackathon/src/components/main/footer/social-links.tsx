import { Facebook,  Globe } from "lucide-react"
import { SocialLink } from "./social-link"

export function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-4">
      <SocialLink href="https://facebook.com" label="Facebook" icon={<Facebook className="h-4 w-4" />} />
      <SocialLink href="https://instagram.com" label="Instagram" icon={} />
      <SocialLink href="https://example.com" label="Website" icon={<Globe className="h-4 w-4" />} />
      <SocialLink href="https://linkedin.com" label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
      <SocialLink href="https://x.com" label="X (Twitter)" icon={<Twitter className="h-4 w-4" />} />
      <SocialLink href="https://youtube.com" label="YouTube" icon={<Youtube className="h-4 w-4" />} />
    </div>
  )
}
