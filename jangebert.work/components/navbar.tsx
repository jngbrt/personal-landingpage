"use client"
import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#e9e8de] border-b border-[#d7d7d7]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-[#1d1d1d]">Katharina Engfer</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#content5-6" className="text-sm font-medium text-[#1d1d1d] hover:text-[#333]">
              Über uns
            </Link>
            <Link href="#features4-2" className="text-sm font-medium text-[#1d1d1d] hover:text-[#333]">
              Kanzleien
            </Link>
            <Link href="#gallery2-7" className="text-sm font-medium text-[#1d1d1d] hover:text-[#333]">
              Leistungen
            </Link>
            <Link href="#tabs1-1" className="text-sm font-medium text-[#1d1d1d] hover:text-[#333]">
              Gesellschafter & Partner
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#form1-9"
              className="hidden md:inline-flex h-10 items-center justify-center rounded-md bg-[#1d1d1d] px-8 text-sm font-medium text-white shadow"
            >
              Kontakt
            </Link>
            {/* Menu button is now in OffCanvasMenu component */}
          </div>
        </div>
      </div>
    </header>
  )
}

