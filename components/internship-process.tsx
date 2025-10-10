"use client"

import { Card, CardContent } from "@/components/ui/card"

const processSteps = [
  {
    step: "01",
    title: "Application",
    description: "Submit your application with resume and statement of purpose",
    icon: "📝",
    color: "bg-blue-500",
  },
  {
    step: "02", 
    title: "Screening",
    description: "Initial review and shortlisting based on skills and interests",
    icon: "🔍",
    color: "bg-emerald-500",
  },
  {
    step: "03",
    title: "Interview",
    description: "Technical and behavioral interview with mentors",
    icon: "💬",
    color: "bg-purple-500",
  },
  {
    step: "04",
    title: "Selection",
    description: "Final selection and project assignment",
    icon: "✅",
    color: "bg-amber-500",
  },
  {
    step: "05",
    title: "Onboarding",
    description: "Orientation, team introduction, and project kickoff",
    icon: "🚀",
    color: "bg-red-500",
  },
  {
    step: "06",
    title: "Internship",
    description: "Hands-on work with mentorship and regular feedback",
    icon: "⚡",
    color: "bg-cyan-500",
  },
]

export function InternshipProcess() {
  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Internship Process</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our streamlined process ensures you get the best internship experience with proper guidance and support.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 ${step.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{step.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              {/* Connecting line for desktop */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gray-200" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Timeline for mobile */}
      <div className="lg:hidden mt-8">
        <div className="flex justify-center">
          <div className="w-0.5 h-32 bg-gradient-to-b from-blue-500 to-cyan-500" />
        </div>
      </div>
    </section>
  )
}
