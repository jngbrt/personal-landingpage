import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Impressum() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fcfbf5]">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-[#1d1d1d]">Impressum</h1>

          <div className="space-y-6 text-[#1d1d1d]">
            <div>
              <h2 className="text-xl font-bold mb-2">Angaben gemäß § 5 TMG</h2>
              <p>Katharina Engfer</p>
              <p>Engfer Consulting</p>
              <p>Musterstraße 123</p>
              <p>50667 Köln</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Kontakt</h2>
              <p>Telefon: +49 177 6338901</p>
              <p>E-Mail: k.engfer@engfer-consulting.de</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Umsatzsteuer-ID</h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
              <p>DE123456789</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <p>Katharina Engfer</p>
              <p>Musterstraße 123</p>
              <p>50667 Köln</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Haftungsausschluss</h2>
              <h3 className="text-lg font-semibold mb-1">Haftung für Inhalte</h3>
              <p className="mb-4">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
                und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß
                § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§
                8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
                fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen.
              </p>

              <h3 className="text-lg font-semibold mb-1">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
                verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#1d1d1d] px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#333] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1d1d1d]"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

