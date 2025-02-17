"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  MailIcon,
  PhoneIcon,
  GlobeIcon,
  GithubIcon,
  Menu,
  UserIcon,
  PenToolIcon as ToolIcon,
  FolderIcon,
} from "lucide-react"
import ProjectCard from "@/components/ProjectCard"
import SkillBar from "@/components/SkillBar"
import FloatingEmojis from "@/components/FloatingEmojis"
import AOS from "aos"
import "aos/dist/aos.css"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import "./animations.css"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const getIconForMenuItem = (item: string) => {
    switch (item) {
      case "À propos":
        return <UserIcon className="h-5 w-5" />
      case "Compétences":
        return <ToolIcon className="h-5 w-5" />
      case "Projets":
        return <FolderIcon className="h-5 w-5" />
      case "Contact":
        return <MailIcon className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <FloatingEmojis />
      <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-3 hover-effect">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="./joel-attitso-portrait.jpg"
                alt="Joel ATTITSO"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="font-bold text-xl">Joel ATTITSO</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto lg:hidden hover-effect">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-900 border-l border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <Image
                    src="./joel-attitso-portrait.jpg"
                    alt="Joel ATTITSO"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="font-bold text-xl text-white">Joel ATTITSO</span>
              </div>
              <nav className="flex flex-col gap-4">
                {["À propos", "Compétences", "Projets", "Contact"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-lg font-medium text-gray-300 hover:text-orange-500 transition-colors flex items-center hover-effect"
                  >
                    <span className="mr-2">{getIconForMenuItem(item)}</span>
                    {item}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="ml-auto hidden lg:flex gap-6">
            {["À propos", "Compétences", "Projets", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover-effect"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: "url('/hero-bg.jpg')",
              transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
              transition: "transform 0.2s ease-out",
            }}
          ></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center text-center md:text-left">
            <div className="md:mr-8 mb-6 md:mb-0">
              <Image
                src="joel-attitso-portrait.jpg"
                alt="Joel ATTITSO"
                width={200}
                height={200}
                className="rounded-full border-4 border-orange-500 shadow-lg"
              />
            </div>
            <div>
              <h1
                className="text-5xl md:text-7xl font-bold mb-4 text-white shadow-text hover-effect"
                data-aos="fade-up"
              >
                Joel ATTITSO
              </h1>
              <p
                className="text-2xl md:text-3xl mb-8 text-gray-300 shadow-text hover-effect"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Développeur Web & Logiciel Freelance
              </p>
              <div className="space-x-4" data-aos="fade-up" data-aos-delay="400">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white hover-effect">
                  <Link href="#contact">Me contacter</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover-effect"
                >
                  <Link href="#projets">Voir mes projets</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="à-propos" className="w-full py-16 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-blue-500 hover-effect"
              data-aos="fade-right"
            >
              À propos
            </h2>
            <p
              className="mt-4 max-w-[700px] text-gray-300 md:text-xl leading-relaxed hover-effect"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Spécialisé dans le développement web et logiciel, je m'appuie sur une approche généraliste pour concevoir
              des solutions adaptées aux besoins de chaque client. Grâce à ma créativité et à ma recherche constante de
              performance, je propose des services couvrant l'intégralité du cycle de développement, principalement dans
              le cadre du freelancing.
            </p>
          </div>
        </section>

        <section id="compétences" className="w-full py-16 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-blue-500 hover-effect"
              data-aos="fade-right"
            >
              Mes Compétences
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {/* Catégorie : Langages */}
  <SkillBar
    category="Langages"
    skills={[
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "Java", level: 70 },
      { name: "Python", level: 80 },
      { name: "PHP", level: 75 },
      { name: "Dart", level: 60 },
      { name: "VBA", level: 65 },
      { name: "R", level: 60 },
      { name: "Scala", level: 50 },
    ]}
  />

  {/* Catégorie : Front-end */}
  <SkillBar
    category="Front-end"
    skills={[
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Vue.js", level: 70 },
      // { name: "Angular", level: 65 },
      { name: "Flutter", level: 60 },
      { name: "jQuery", level: 70 },
    ]}
  />

  {/* Catégorie : Back-end */}
  <SkillBar
    category="Back-end"
    skills={[
      // { name: "Next.js", level: 80 },
      { name: "Nest.js", level: 75 },
      { name: "Django", level: 70 },
      { name: "Laravel", level: 75 },
    ]}
  />

  {/* Catégorie : Bases de données */}
  <SkillBar
    category="Bases de données"
    skills={[
      { name: "MySQL", level: 85 },
      { name: "MariaDB", level: 75 },
      { name: "SQLite", level: 60 },
      { name: "MongoDB", level: 70 },
      { name: "PostgreSQL", level: 75 },
      { name: "Oracle", level: 60 },
    ]}
  />

  {/* Catégorie : DevOps */}
  <SkillBar
    category="DevOps"
    skills={[
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "CI/CD", level: 70 },
      { name: "AWS", level: 65 },
    ]}
  />

  {/* Catégorie : Autres */}
  <SkillBar
    category="Autres"
    skills={[
      { name: "Agile", level: 80 },
      { name: "UX/UI", level: 70 },
      { name: "SEO", level: 60 },
      { name: "API RESTful", level: 75 },
      { name: "WordPress", level: 70 },
      { name: "Shopify", level: 65 },
      // { name: "PrestaShop", level: 60 },
      // { name: "Joomla", level: 50 },
      // { name: "Wix", level: 60 },
    ]}
  />
</div>

          </div>
        </section>

        <section id="projets" className="w-full py-16 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-blue-500 hover-effect"
              data-aos="fade-right"
            >
              Projets Clés
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="TOUBABI"
                description="Site de recherche immobilier en ligne"
                image="/toubabi.jpg"
                tags={["Laravel", "JQUERY", "MySql"]}
              />
              {/* <ProjectCard
                title="Best to Have"
                description="Site e-commerce de produits cosmétiques au Liban"
                image="/best-to-have-project.jpg"
                tags={["Wordpress", "SEO", "UX/UI", "WooCommerce"]}
              /> */}
              <ProjectCard
                title="Villa la Louisette"
                description="Site vitrine pour restaurant"
                image="/louisette.jpg"
                tags={["HTML", "CSS", "JQUERY", "SEO"]}
              />
              <ProjectCard
                title="Gestion de Caisse"
                description="Logiciel de gestion pour restaurant"
                image="/gestion-caisse-project.jpg"
                tags={["Laravel", "Livewire", "MySql"]}
              />
              {/* <ProjectCard
                title="TOGes Immobilier"
                description="Solution de gestion de projet pour promoteur immobilier"
                image="/toges-immobilier-project.jpg"
                tags={["Laravel", "Vue.js", "MySQL"]}
              />
              <ProjectCard
                title="EazyFlex"
                description="App mobile IA pour recommandation de forfaits téléphoniques"
                image="/eazyflex-project.jpg"
                tags={["Flutter", "TensorFlow", "Firebase"]}
              /> */}
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-16 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-blue-500 hover-effect"
              data-aos="fade-right"
            >
              Contact
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col space-y-4" data-aos="fade-up">
                <div className="flex items-center space-x-3 hover-effect">
                  <MailIcon className="w-6 h-6 text-orange-500" />
                  <span>joelattitso@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 hover-effect">
                  <PhoneIcon className="w-6 h-6 text-orange-500" />
                  <span>+225 05 55 74 5936</span>
                </div>
                <div className="flex items-center space-x-3 hover-effect">
                  <GlobeIcon className="w-6 h-6 text-orange-500" />
                  <Link href="https://www.univers10.net" className="hover:text-orange-500 transition-colors">
                    UNIVERS 10
                  </Link>
                </div>
                <div className="flex items-center space-x-3 hover-effect">
                  <GithubIcon className="w-6 h-6 text-orange-500" />
                  <Link
                    href="https://github.com/Univers10"
                    className="hover:text-orange-500 transition-colors"
                  >
                    github.com/Univers10
                  </Link>
                </div>
              </div>
              <form className="space-y-4" data-aos="fade-up" data-aos-delay="200">
                <input
                  type="text"
                  placeholder="Nom"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 hover-effect"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 hover-effect"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 hover-effect"
                />
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white hover-effect">Envoyer</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-gray-900 border-t border-gray-800">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-gray-500 hover-effect">
            © {new Date().getFullYear()} Joel ATTITSO. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}

