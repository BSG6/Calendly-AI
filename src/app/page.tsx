import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Globe, Music, AtSign, Mail, Github } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, color-mix(in srgb, #645986 10%, transparent), color-mix(in srgb, #801A86 5%, transparent))' }}>
      {/* Main Content Card */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          {/* Avatar */}
          <div className="flex justify-center">
            <Image
              src="/avatar.png"
              alt="Brie"
              width={160}
              height={160}
              className="rounded-full"
              priority
            />
          </div>

          {/* Name and Tagline */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Brie 
            </h1>
            <p className="text-2xl text-muted-foreground sm:text-3xl">
              Grab a slot, let's make some magic
            </p>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <h2 className="text-3xl font-semibold mb-12 sm:text-4xl">
              Pick a vibe, not just a time ✨
            </h2>
          </div>
        </div>

        {/* Event Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto mb-12">
          {/* Let's Bloom Card */}
          <Link href="/b/intro-call" className="group block">
            <div className="relative p-8 rounded-2xl shadow-md thought-bubble thought-bubble-purple transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-0" style={{ backgroundColor: 'color-mix(in srgb, #4E0250 8%, white)' }}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-brand-primary group-hover:text-brand-accent-purple transition-colors">
                    Let's Bloom
                  </h3>
                  <Badge 
                    variant="secondary" 
                    className="text-sm px-3 py-1 bg-brand-primary/10 text-brand-primary border-brand-primary/20 group-hover:bg-brand-accent-purple/10 group-hover:text-brand-accent-purple group-hover:border-brand-accent-purple/20 transition-all"
                  >
                    30 min
                  </Badge>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  A half hour to plant ideas, swap stories, and see what grows 🌱
                </p>
              </div>
            </div>
          </Link>

          {/* Coffee Chat Card */}
          <Link href="/b/coffee-chat" className="group block">
            <div className="relative p-8 rounded-2xl shadow-md thought-bubble thought-bubble-green transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-0" style={{ backgroundColor: 'color-mix(in srgb, #58BC82 8%, white)' }}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-brand-deep-green group-hover:text-brand-accent-green transition-colors">
                    Coffee Chat
                  </h3>
                  <Badge 
                    variant="secondary" 
                    className="text-sm px-3 py-1 bg-brand-deep-green/10 text-brand-deep-green border-brand-deep-green/20 group-hover:bg-brand-accent-green/10 group-hover:text-brand-accent-green group-hover:border-brand-accent-green/20 transition-all"
                  >
                    15 min
                  </Badge>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Short, sweet, and caffeinated ☕ — a quick burst of connection
                </p>
              </div>
            </div>
          </Link>
        </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Inspired by Calendly, built by me 💜 digitalflower
            </p>
            
            {/* Social Icons */}
            <div className="flex justify-center space-x-4">
              <Link 
                href="https://www.linkedin.com/in/bsspann/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-brand-accent-purple transition-colors rounded-full hover:bg-brand-accent-purple/10"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </Link>
              
              <Link 
                href="https://www.digitalflower.tech/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-brand-accent-purple transition-colors rounded-full hover:bg-brand-accent-purple/10"
                aria-label="Portfolio Website"
              >
                <Globe size={20} />
              </Link>
              
              <Link 
                href="https://www.tiktok.com/@digitalflower_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-brand-accent-purple transition-colors rounded-full hover:bg-brand-accent-purple/10"
                aria-label="TikTok Profile"
              >
                <Music size={20} />
              </Link>
              
              <Link 
                href="https://bsky.app/profile/digitalflower.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-brand-accent-purple transition-colors rounded-full hover:bg-brand-accent-purple/10"
                aria-label="Bluesky Profile"
              >
                <AtSign size={20} />
              </Link>
              
              <Link 
                href="mailto:digitalflower0101@gmail.com"
                className="p-2 text-muted-foreground hover:text-brand-accent-purple transition-colors rounded-full hover:bg-brand-accent-purple/10"
                aria-label="Send Email"
              >
                <Mail size={20} />
              </Link>
              
              <Link 
                href="https://github.com/BSG6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-brand-accent-purple transition-colors rounded-full hover:bg-brand-accent-purple/10"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
