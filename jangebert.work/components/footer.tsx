import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-[#1d1d1d] text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">Katharina Engfer</span>
            </div>
            <p className="text-sm text-gray-300">
              HR Thought Leader, Corporate Influencer und Gründerin von Engfer Consulting und blauerpfau.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#content5-6" className="text-gray-300 hover:text-white">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="#features4-2" className="text-gray-300 hover:text-white">
                  Kanzleien
                </Link>
              </li>
              <li>
                <Link href="#gallery2-7" className="text-gray-300 hover:text-white">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link href="#tabs1-1" className="text-gray-300 hover:text-white">
                  Gesellschafter & Partner
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/impressum" className="text-gray-300 hover:text-white">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-gray-300 hover:text-white">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Katharina Engfer. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}

