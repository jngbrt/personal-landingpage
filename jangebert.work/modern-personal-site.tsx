import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function ModernPersonalSite() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-black"></div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=1080&width=1080"
              alt="Katharina Engfer"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-7xl font-bold tracking-tight">KATHARINA ENGFER</h1>
            <p className="text-2xl text-blue-400">HR Thought Leader & Corporate Influencer</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg h-12 px-8">Mehr erfahren</Button>
          </div>
        </div>
      </section>

      {/* Status Quo Section */}
      <section className="py-32 bg-white text-black">
        <div className="container mx-auto px-4 grid grid-cols-2 gap-24">
          <div className="space-y-8">
            <h2 className="text-6xl font-bold">DEIN STATUS QUO?</h2>
            <div className="space-y-4 text-xl text-gray-600">
              <p>Die Personalberatung MUSS SICH ÄNDERN! 🚨</p>
              <p>
                Es bricht mir das Herz zu sehen, wie oft sie von Unverbindlichkeit, Anonymität und mangelnder
                Transparenz geprägt ist.
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Katharina Engfer Portrait"
              width={600}
              height={800}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-24">
            <div className="space-y-12">
              <h2 className="text-6xl font-bold text-blue-400">ENGFER CONSULTING</h2>
              <div className="space-y-6 text-xl">
                <p>
                  Seit 7 Jahren unterstütze ich mit Engfer Consulting Unternehmen bei der Suche nach den passenden
                  Talenten.
                </p>
                <ul className="space-y-4">
                  <li>✓ Unterstützung bei der Mitarbeitergewinnung</li>
                  <li>✓ Stärkung Ihrer Arbeitgebermarke</li>
                  <li>✓ Suche nach Führungskräften</li>
                </ul>
                <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                  Mehr erfahren <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-12">
              <h2 className="text-6xl font-bold text-blue-400">BLAUERPFAU</h2>
              <div className="space-y-6 text-xl">
                <p>Creative HR Marketing Agency für einzigartige und farbenfreudige Employer Branding Lösungen.</p>
                <ul className="space-y-4">
                  <li>✓ Kreative Employer Branding-Kampagnen</li>
                  <li>✓ Strategische Kommunikation</li>
                  <li>✓ Social Media Optimierung</li>
                </ul>
                <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                  Mehr erfahren <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-24">
            <div className="text-center space-y-8">
              <h2 className="text-6xl font-bold">ÜBER MICH</h2>
              <p className="text-2xl text-gray-600">Idealistisch, modern und leidenschaftlich - das bin ich.</p>
            </div>
            <div className="grid grid-cols-2 gap-12 text-xl">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Meine Leidenschaften</h3>
                <ul className="space-y-4 text-gray-600">
                  <li>⚽️ Fussball</li>
                  <li>🧑‍🍳 Kochen & gutes Essen</li>
                  <li>📚 Lesen</li>
                  <li>🧳 Reisen</li>
                  <li>💪🏻 CrossFit</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Meine Vision</h3>
                <p className="text-gray-600">
                  Mein Ansatz ist ganzheitlich und persönlich. Ich gehe auch gerne unkonventionelle Wege, denke ums Eck
                  und bediene mich sowohl klassischer als auch moderner Recruiting-Ansätze.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-6xl font-bold">BEREIT FÜR DEN NÄCHSTEN SCHRITT?</h2>
            <div className="space-y-8">
              <p className="text-2xl">Lassen Sie uns gemeinsam Ihre HR-Strategie auf das nächste Level bringen.</p>
              <div className="flex justify-center gap-6">
                <Button className="bg-blue-400 hover:bg-blue-500 text-black text-lg h-12 px-8">
                  Kontakt aufnehmen
                </Button>
                <Button
                  variant="outline"
                  className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black text-lg h-12 px-8"
                >
                  LinkedIn Profil
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-400">Kontakt</h3>
              <div className="space-y-2">
                <p>📞 +49 177 6338901</p>
                <p>📧 k.engfer@engfer-consulting.de</p>
                <p>📍 Köln, Deutschland</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-400">Unternehmen</h3>
              <div className="space-y-2">
                <Link href="https://www.engfer-consulting.de" className="block hover:text-blue-400">
                  Engfer Consulting
                </Link>
                <Link href="https://blauerpfau.design" className="block hover:text-blue-400">
                  blauerpfau
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-blue-400">Social Media</h3>
              <div className="flex gap-4">
                <Link href="https://www.linkedin.com/in/katharina-engfer/" className="hover:text-blue-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link href="https://www.instagram.com/" className="hover:text-blue-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Katharina Engfer. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  )
}

