"use client"

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
      <div className="relative max-w-6xl mx-auto">
        {/* Desktop Flowchart */}
        <div className="hidden lg:block">
          <div className="flex flex-wrap justify-center items-start gap-8 pb-20">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                {/* Process Step */}
                <div className="relative">
                  <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-300`}>
                    {step.step}
                  </div>
                  <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center w-32">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-xs text-gray-600 leading-tight">{step.description}</p>
                  </div>
                </div>
                
                {/* Arrow Connector */}
                {index < processSteps.length - 1 && (
                  <div className="flex items-center mx-4">
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <div className="w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Flowchart */}
        <div className="lg:hidden">
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center relative">
                {/* Step Circle */}
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0`}>
                  {step.step}
                </div>
                
                {/* Step Content */}
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Vertical Arrow */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-8 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
