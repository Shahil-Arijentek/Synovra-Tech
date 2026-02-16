import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SECTION_BG = '#000000'
const ACCENT_ORANGE = '#FF6B1A'
const SUBTITLE_COLOR = '#A1A1A1'

const LOCATIONS = [
  {
    id: 'us',
    image: '/aboutus/us.png',
    label: 'UNITED STATES',
    country: 'United States',
    subtitle: 'Global Headquarters',
    bullets: [
      'The foundational software and diagnostics layers',
      'System logic for monitoring, tracking, and lifecycle intelligence',
      'Platform integrations across storage, metering, and control systems',
      'Scalable frameworks for deploying energy afterlife infrastructure globally',
    ],
    address: ['2010 Crow Canyon Place, Suite 100', 'San Ramon, CA 94583', 'United States'],
    imageFirst: true,
  },
  {
    id: 'india',
    image: '/aboutus/india.jpg',
    label: 'INDIA',
    country: 'India',
    subtitle: 'Electrochemical Research & Validation',
    bullets: [
      'Electrochemical process development and optimization',
      'Diagnostics calibration and performance benchmarking',
      'Multi-vendor validation across real-world deployments',
      'Continuous improvement of system protocols and recovery automatics',
    ],
    address: ['Namrata, Office No. 316, 3rd Floor', 'NL HD, Metro Road', 'Karnak Bandar, Mumbai - 400009', 'India'],
    imageFirst: false,
  },
  {
    id: 'uae',
    image: '/aboutus/uae.jpg',
    label: 'UAE EMIRATES',
    country: 'United Arab Emirates',
    subtitle: 'Primary Operations & Infrastructure',
    bullets: [
      'Energy asset intake, diagnostics, and processing',
      'Storage, tracking, and lifecycle logging',
      'Integration with energy systems, facilities, and clients',
      'Deployment of monitored storage solutions and infrastructure',
    ],
    address: ['Dubai Industrial City', '(Exact facility address under finalization)'],
    imageFirst: true,
  },
]

function LocationCard({
  image,
  label,
  country,
  subtitle,
  bullets,
  address,
  imageFirst,
  index: _index, // eslint-disable-line @typescript-eslint/no-unused-vars
}: {
  image: string
  label: string
  country: string
  subtitle: string
  bullets: string[]
  address: string[]
  imageFirst: boolean
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isCardInView = useInView(cardRef, { once: true, amount: 0.2 })

  const imageBlock = (
    <motion.div
      className="relative aspect-[4/3] min-h-[240px] rounded-xl overflow-hidden bg-neutral-900"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isCardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      <motion.img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isCardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }}
      />
      <motion.div
        className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-2"
        initial={{ opacity: 0, x: -8 }}
        animate={isCardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
      >
        <img src="/aboutus/location.svg" alt="" className="w-5 h-5 shrink-0" aria-hidden />
        <span className="text-white text-base sm:text-lg font-medium whitespace-nowrap">{label}</span>
      </motion.div>
    </motion.div>
  )

  const textVariants = {
    hidden: { opacity: 0, x: imageFirst ? -16 : 16 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  }

  const textBlock = (
    <motion.div
      className="flex flex-col justify-center"
      initial="hidden"
      animate={isCardInView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
        hidden: {},
      }}
    >
      <motion.h3
        variants={textVariants}
        custom={0}
        className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-1"
      >
        {country}
      </motion.h3>
      <motion.p
        variants={textVariants}
        custom={1}
        className="text-base sm:text-lg md:text-xl mb-6"
        style={{ color: ACCENT_ORANGE }}
      >
        {subtitle}
      </motion.p>
      <motion.ul className="space-y-2 mb-6" variants={{ visible: { transition: { staggerChildren: 0.05 } }, hidden: {} }}>
        {bullets.map((bullet, i) => (
          <motion.li
            key={bullet}
            variants={{ hidden: { opacity: 0, x: 12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.35 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const } } }}
            className="text-white text-base sm:text-lg md:text-xl flex gap-2"
          >
            <span className="text-white shrink-0 mt-2 w-2 h-2 rounded-full bg-white" aria-hidden />
            <span>{bullet}</span>
          </motion.li>
        ))}
      </motion.ul>
      <motion.p
        variants={textVariants}
        custom={4}
        className="text-white font-bold text-base sm:text-lg uppercase tracking-wider mb-2"
      >
        Address
      </motion.p>
      <motion.div
        className="text-white text-base sm:text-lg md:text-xl leading-relaxed space-y-0.5"
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.75, ease: [0.25, 0.1, 0.25, 1] as const } } }}
      >
        {address.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </motion.div>
    </motion.div>
  )

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
    >
      <div className={imageFirst ? '' : 'lg:order-2'}>{imageBlock}</div>
      <div className={imageFirst ? '' : 'lg:order-1'}>{textBlock}</div>
    </motion.div>
  )
}

export default function GlobalPresence() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section
      ref={ref}
      className="w-full pt-28 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 scroll-mt-24 md:scroll-mt-32 relative"
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* Fade to black gradient at top to prevent bleed-through from previous section */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black to-transparent pointer-events-none z-0" />
      <div className="mx-auto w-full max-w-7xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6"
          style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.2, fontWeight: 700 }}
        >
          Global Presence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="text-center mx-auto mb-12 md:mb-16 text-base sm:text-lg max-w-2xl"
          style={{ color: SUBTITLE_COLOR }}
        >
          Operating across three continents to deliver a truly global energy afterlife infrastructure.
        </motion.p>

        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {LOCATIONS.map((loc, index) => (
            <LocationCard
              key={loc.id}
              image={loc.image}
              label={loc.label}
              country={loc.country}
              subtitle={loc.subtitle}
              bullets={loc.bullets}
              address={loc.address}
              imageFirst={loc.imageFirst}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
