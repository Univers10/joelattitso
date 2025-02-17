"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useRef } from "react"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
}

export default function ProjectCard({ title, description, image, tags }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <Card
      ref={cardRef}
      className="overflow-hidden bg-gray-800 border-gray-700 opacity-0 transition-all duration-500 ease-out transform translate-y-4"
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs font-semibold text-orange-500 bg-orange-500/10 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

