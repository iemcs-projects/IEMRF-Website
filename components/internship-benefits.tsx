"use client"

import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    title: "Industry Mentorship",
    description: "Get guidance from experienced professionals and industry experts",
    icon: "👨‍🏫",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Real Projects",
    description: "Work on actual industry projects with real impact and outcomes",
    icon: "💼",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    title: "Skill Development",
    description: "Enhance your technical and soft skills through hands-on experience",
    icon: "🎯",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Networking",
    description: "Build connections with peers, mentors, and industry professionals",
    icon: "🤝",
    color: "from-amber-500 to-amber-600",
  },
  {
    title: "Career Growth",
    description: "Boost your resume and increase job prospects with practical experience",
    icon: "📈",
    color: "from-red-500 to-red-600",
  },
  {
    title: "Innovation Focus",
    description: "Contribute to cutting-edge research and innovative solutions",
    icon: "💡",
    color: "from-cyan-500 to-cyan-600",
  },
]

export function InternshipBenefits() {
  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose IEMRF Internships?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our internship program offers unique opportunities for growth, learning, and career development.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-6">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${benefit.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{benefit.icon}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
