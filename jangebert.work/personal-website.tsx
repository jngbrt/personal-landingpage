import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Briefcase,
  ChevronRight,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Phone,
  Plane,
  Utensils,
  BookOpen,
  Dumbbell,
  ClubIcon as Football,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function KatharinaEngferWebsite() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">Katharina Engfer</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-blue-600">
              Über mich
            </Link>
            <Link href="#companies" className="text-sm font-medium hover:text-blue-600">
              Unternehmen
            </Link>
            <Link href="#services" className="text-sm font-medium hover:text-blue-600">
              Leistungen
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-blue-600">
              Kontakt
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">Kontakt aufnehmen</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-blue-600">HR Thought Leader</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Katharina Engfer</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    𝗜𝗱𝗲𝗮𝗹𝗶𝘀𝘁𝗶𝘀𝗰𝗵, 𝗺𝗼𝗱𝗲𝗿𝗻 𝘂𝗻𝗱 𝗹𝗲𝗶𝗱𝗲𝗻𝘀𝗰𝗵𝗮𝗳𝘁𝗹𝗶𝗰𝗵 - 𝗱𝗮𝘀 𝗯𝗶𝗻 𝗶𝗰𝗵.
                  </p>
                  <p className="max-w-[600px] text-muted-foreground">
                    Corporate Influencer, Gründerin von Engfer Consulting und Co-Gründerin von blauerpfau.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-blue-600 hover:bg-blue-700 gap-1">
                    Mehr erfahren <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Link href="#contact">
                    <Button variant="outline" className="gap-1">
                      Kontakt <Mail className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-4 pt-4">
                  <Link
                    href="https://www.linkedin.com/in/katharina-engfer/"
                    target="_blank"
                    className="text-muted-foreground hover:text-blue-600"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                    className="text-muted-foreground hover:text-blue-600"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=600&width=600"
                width={600}
                height={600}
                alt="Katharina Engfer"
                className="mx-auto aspect-square overflow-hidden rounded-full object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-600">Über mich</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Die Personalberatung MUSS SICH ÄNDERN! Für mich ist eines klar: erfolgreiches Recruiting steht und
                  fällt mit dem Employer Branding.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Es bricht mir das Herz zu sehen, wie oft die Personalberatung von Unverbindlichkeit, Anonymität und
                  mangelnder Transparenz geprägt ist. Daran arbeite ich seit der Gründung von Engfer Consulting.
                </p>
                <p className="text-muted-foreground">
                  Mein Ansatz ist ganzheitlich und persönlich. Ich gehe auch gerne unkonventionelle Wege, denke ums Eck
                  und bediene mich sowohl klassischer als auch moderner Recruiting-Ansätze. Ohne dabei jemals mein
                  Wertesystem sowie meine persönliche Überzeugung zu vernachlässigen!
                </p>
                <p className="text-muted-foreground">
                  Und weil das alles nicht genug ist, habe ich seit diesem Jahr auch meine Begeisterung fürs Marketing
                  zum Beruf gemacht, mit der Gründung von Blauer Pfau. Hier kann jede Idee so einzigartig und farbenfroh
                  sein wie die Federn des Blauen Pfaus. Mit uns kommt die #pfauenpower und damit eine bunte Palette an
                  kreativen Lösungen, die Ihre (Arbeitgeber-) Marke zum Strahlen bringt.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Meine Interessen</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Football className="h-5 w-5 text-blue-600" />
                    <span>Fussball</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-blue-600" />
                    <span>Kochen & gutes Essen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span>Lesen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Plane className="h-5 w-5 text-blue-600" />
                    <span>Reisen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-blue-600" />
                    <span>CrossFit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section id="companies" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-600">
                  Meine Unternehmen
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Zwei Partner für Ihren Erfolg!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card className="overflow-hidden">
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle>Engfer Consulting</CardTitle>
                  <CardDescription className="text-blue-100">Personalberatung in Köln</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p>
                      Seit 7 Jahren unterstütze ich mit Engfer Consulting Unternehmen bei der Suche nach den passenden
                      Talenten. Wir setzen auf einen persönlichen Ansatz und transparente Prozesse.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-blue-600" />
                        <span>Unterstützung bei der Mitarbeitergewinnung</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-blue-600" />
                        <span>Stärkung Ihrer Arbeitgebermarke</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-blue-600" />
                        <span>Suche nach Führungskräften</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-4">
                  <Link href="https://www.engfer-consulting.de" target="_blank">
                    <Button variant="outline" className="gap-1">
                      Website besuchen <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle>blauerpfau</CardTitle>
                  <CardDescription className="text-blue-100">Creative HR Marketing Agency</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p>
                      Mit blauerpfau habe ich meine Begeisterung fürs Marketing zum Beruf gemacht. Wir entwickeln
                      kreative Lösungen, die Ihre Arbeitgebermarke zum Strahlen bringen.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-blue-600" />
                        <span>Entwicklung und Umsetzung kreativer Employer Branding-Kampagnen</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-blue-600" />
                        <span>Strategische Kommunikation über digitale Kanäle</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-blue-600" />
                        <span>Optimierung Ihrer Präsenz auf Social Media und Karriereseiten</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-4">
                  <Link href="https://blauerpfau.design/" target="_blank">
                    <Button variant="outline" className="gap-1">
                      Website besuchen <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-600">
                  Meine Leistungen
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ganzheitliche Lösungen für Ihr Unternehmen
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Tabs defaultValue="recruiting" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recruiting">Recruiting & Headhunting</TabsTrigger>
                  <TabsTrigger value="branding">Employer Branding & Marketing</TabsTrigger>
                </TabsList>
                <TabsContent value="recruiting" className="p-4 pt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Recruiting & Headhunting</h3>
                    <p>
                      Mein Ansatz in der Personalberatung ist ganzheitlich und persönlich. Ich gehe auch gerne
                      unkonventionelle Wege und bediene mich sowohl klassischer als auch moderner Recruiting-Ansätze.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Direktansprache</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Gezielte Ansprache von passenden Kandidaten durch professionelles Headhunting.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Executive Search</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Suche nach Führungskräften und Spezialisten für anspruchsvolle Positionen.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Recruiting-Strategie</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Entwicklung einer maßgeschneiderten Recruiting-Strategie für Ihr Unternehmen.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Bewerbermanagement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Professionelle Betreuung des gesamten Bewerbungsprozesses.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="branding" className="p-4 pt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Employer Branding & Marketing</h3>
                    <p>
                      Mit blauerpfau entwickeln wir kreative Lösungen, die Ihre Arbeitgebermarke zum Strahlen bringen
                      und Sie als attraktiven Arbeitgeber positionieren.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Employer Branding</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Entwicklung einer authentischen und attraktiven Arbeitgebermarke.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Content Marketing</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Erstellung von ansprechenden Inhalten für Ihre Karriereseite und Social Media.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Social Media</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Strategische Präsenz auf relevanten Social-Media-Kanälen für Ihre Zielgruppe.
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Kampagnen</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Entwicklung und Umsetzung kreativer Employer Branding-Kampagnen.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-600">Kontakt</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ich freue mich auf inspirierende Kontakte!
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Telefon</h3>
                    <p className="text-sm text-muted-foreground">+49 177 6338901</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">E-Mail</h3>
                    <p className="text-sm text-muted-foreground">k.engfer@engfer-consulting.de</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Standort</h3>
                    <p className="text-sm text-muted-foreground">Köln, Deutschland</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Unternehmen</h3>
                    <div className="flex flex-col gap-1">
                      <Link
                        href="https://www.engfer-consulting.de"
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        www.engfer-consulting.de
                      </Link>
                      <Link
                        href="https://blauerpfau.design/"
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        blauerpfau.design
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Nachricht senden</CardTitle>
                  <CardDescription>Ich freue mich über Ihre Anfrage</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Ihr Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            E-Mail
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Ihre E-Mail"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Betreff
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Betreff Ihrer Nachricht"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Nachricht
                        </label>
                        <textarea
                          id="message"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Ihre Nachricht"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Nachricht senden</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-600">
                  Lassen Sie uns zusammenarbeiten
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ob Personalberatung oder Employer Branding – ich freue mich auf neue Partnerschaften und spannende
                  Kontakte.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 gap-1">
                  Kontakt aufnehmen <ChevronRight className="h-4 w-4" />
                </Button>
                <Link href="https://www.linkedin.com/in/katharina-engfer/" target="_blank">
                  <Button size="lg" variant="outline" className="gap-1">
                    LinkedIn Profil <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-blue-600">Katharina Engfer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                HR Thought Leader, Corporate Influencer und Gründerin von Engfer Consulting und blauerpfau.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-blue-600">
                    Über mich
                  </Link>
                </li>
                <li>
                  <Link href="#companies" className="text-muted-foreground hover:text-blue-600">
                    Unternehmen
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="text-muted-foreground hover:text-blue-600">
                    Leistungen
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-blue-600">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Rechtliches</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-blue-600">
                    Datenschutz
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Katharina Engfer. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <Link
                href="https://www.linkedin.com/in/katharina-engfer/"
                target="_blank"
                className="text-muted-foreground hover:text-blue-600"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                className="text-muted-foreground hover:text-blue-600"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

