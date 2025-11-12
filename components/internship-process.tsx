"use client"

import { Fragment } from "react"
import { ArrowRight } from "lucide-react"

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
      
      {/* Flowchart Structure */}
      <div className="relative mx-auto max-w-6xl">
        {/* Desktop Flow */}
        <div className="hidden items-start justify-center gap-6 lg:flex">
          {processSteps.map((step, index) => (
            <Fragment key={step.step}>
              <div className="flex flex-col items-center text-center max-w-[200px]">
                <div
                  className={`${step.color} flex h-14 w-14 items-center justify-center rounded-full text-white text-sm font-semibold shadow-md transition-transform duration-300 hover:scale-105`}
                >
                  {step.step}
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
              {index < processSteps.length - 1 && (
                <div className="flex items-center gap-3 text-emerald-500">
                  <div className="h-0.5 w-12 bg-gradient-to-r from-gray-200 to-emerald-400" />
                  <ArrowRight className="h-6 w-6 text-emerald-500" />
                  <div className="h-0.5 w-12 bg-gradient-to-r from-emerald-400 to-gray-200" />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Mobile Flow */}
        <div className="space-y-8 lg:hidden">
          {processSteps.map((step, index) => (
            <div key={step.step} className="relative flex items-start gap-4">
              <div
                className={`${step.color} flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white shadow-md`}
              >
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="absolute left-6 top-12 flex flex-col items-center text-emerald-500">
                  <div className="h-10 w-0.5 bg-gradient-to-b from-gray-200 to-emerald-400" />
                  <ArrowRight className="mt-1 rotate-90 text-emerald-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
