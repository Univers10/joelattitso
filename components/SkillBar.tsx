"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Définition d'un type pour chaque compétence
interface Skill {
  name: string
  level: number // Pourcentage (0 - 100)
}

// Props du composant SkillBar
interface SkillBarProps {
  category: string
  skills: Skill[]
}

export default function SkillBar({ category, skills }: SkillBarProps) {
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Lorsqu'une barre est visible, on lance l'animation
            const bar = entry.target as HTMLDivElement
            const finalWidth = bar.dataset.level // Récupère la valeur stockée
            if (finalWidth) {
              bar.style.width = `${finalWidth}%`
              // On ajoute des classes pour la transition
              bar.classList.add("transition-all", "duration-700", "ease-out")
            }
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // La barre doit être visible à au moins 10%
      },
    )

    // On observe chaque barre de progression
    barRefs.current.forEach((bar) => {
      if (bar) {
        observer.observe(bar)
      }
    })

    // Nettoyage
    return () => {
      barRefs.current.forEach((bar) => {
        if (bar) {
          observer.unobserve(bar)
        }
      })
    }
  }, [])

  return (
    <Card className="bg-gray-800 border-gray-700" data-aos="fade-up">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {skills.map((skill, index) => (
            <div key={skill.name} className="flex items-center">
              {/* Barre de progression */}
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  ref={(el) => (barRefs.current[index] = el)}
                  // Couleurs de gauche -> droite
                  className="bg-gradient-to-r from-orange-500 to-blue-500 h-2.5 rounded-full w-0"
                  // On stocke le niveau dans un data-attribute
                  data-level={skill.level}
                  style={{ width: "0%" }} // Démarre à 0
                ></div>
              </div>
              {/* Nom & pourcentage */}
              <span className="ml-2 text-sm text-gray-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
