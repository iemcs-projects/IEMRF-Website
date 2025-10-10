"use client"

import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "AI/ML Intern",
    company: "TechCorp",
    quote: "The internship at IEMRF gave me hands-on experience with real-world machine learning projects. The mentorship was exceptional and helped me land my dream job.",
    image: "/placeholder-user.jpg",
    domain: "AI/ML",
  },
  {
    name: "Arjun Patel",
    role: "Web Development Intern",
    company: "StartupXYZ",
    quote: "Working on the ScholarHub project taught me modern web technologies and collaborative development practices. The experience was invaluable.",
    image: "/placeholder-user.jpg",
    domain: "Web",
  },
  {
    name: "Sneha Reddy",
    role: "IoT Intern",
    company: "GreenTech Solutions",
    quote: "The IoT internship allowed me to work on cutting-edge sensor networks. The practical approach and industry exposure were amazing.",
    image: "/placeholder-user.jpg",
    domain: "IoT",
  },
]

export function InternshipTestimonials() {
  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Interns Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear from students who have completed their internships and are now making an impact in the industry.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-blue-600">{testimonial.company}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-700 italic mb-4">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {testimonial.domain}
                </span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
