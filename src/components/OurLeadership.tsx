import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function OurLeadership() {
  const headingRef = useRef(null)
  const ceoRef = useRef(null)
  const teamRef = useRef(null)
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 })
  const isCeoInView = useInView(ceoRef, { once: true, amount: 0.3 })
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.2 })

  const ceo = {
    name: "Yash Doshi",
    title: "Chief Executive Officer",
    image: "/leadership/ceo.png"
  }

  const leadership = [
    {
      name: "Kamlesh Doshi",
      title: "Chief Financial Officer",
      image: "/leadership/cfo.png"
    },
    {
      name: "Chandrashekar Diwaakaran",
      title: "Head of Battery Intelligence",
      image: "/leadership/hbi.png"
    },
    {
      name: "Samir Shah",
      title: "Chief Logistics Officer",
      image: "/leadership/clo.png"
    },
    {
      name: "Sasi Nair",
      title: "Chief Business Officer",
      image: "/leadership/cbo.png"
    },
    {
      name: "Jayesh Doshi",
      title: "Chief Procurement Officer",
      image: "/leadership/cpo.png"
    },
    {
      name: "Harinder Mohan Singh",
      title: "Technology Advisor",
      image: "/leadership/ta.png"
    }
  ]

  return (
    <section className="relative w-full bg-black py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10" 
           style={{
             backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 sm:mb-6"
        >
          Our Leadership
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 0.7,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="text-sm sm:text-base md:text-lg text-gray-400 text-center mb-10 sm:mb-12 md:mb-16 max-w-3xl mx-auto px-2"
        >
          Experienced leaders guiding technology innovation, operational excellence, and global expansion
        </motion.p>

        {/* CEO Card - Large at top */}
        <motion.div
          ref={ceoRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isCeoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="flex justify-center mb-8 sm:mb-10 md:mb-12"
        >
          <div className="bg-black/80 border border-white/5 rounded-xl sm:rounded-2xl overflow-hidden w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] transform transition-transform hover:scale-105 duration-300">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-600 to-gray-800 relative">
              <img 
                src={ceo.image} 
                alt={ceo.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <div className="p-4 sm:p-5 text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{ceo.name}</h3>
              <p className="text-xs sm:text-sm text-[#FF6B35] font-medium uppercase">{ceo.title}</p>
            </div>
          </div>
        </motion.div>

        {/* Leadership Grid - Responsive columns */}
        <div ref={teamRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6 max-w-6xl mx-auto">
          {leadership.slice(0, 3).map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="bg-black/80 border border-white/5 rounded-xl sm:rounded-2xl overflow-hidden transform transition-transform hover:scale-105 duration-300 max-w-[280px] sm:max-w-[320px] md:max-w-[350px] mx-auto w-full"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-600 to-gray-800 relative">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="p-3 sm:p-4 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{leader.name}</h3>
                <p className="text-xs text-[#FF6B35] font-medium uppercase leading-tight">{leader.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second Row - Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {leadership.slice(3, 6).map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 1.2,
                delay: (index + 3) * 0.15,
                ease: [0.19, 1, 0.22, 1]
              }}
              className="bg-black/80 border border-white/5 rounded-xl sm:rounded-2xl overflow-hidden transform transition-transform hover:scale-105 duration-300 max-w-[280px] sm:max-w-[320px] md:max-w-[350px] mx-auto w-full"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-600 to-gray-800 relative">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="p-3 sm:p-4 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{leader.name}</h3>
                <p className="text-xs text-[#FF6B35] font-medium uppercase leading-tight">{leader.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
