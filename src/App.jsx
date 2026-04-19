import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from '@vueuse/core'
import { 
  Layers, 
  Zap, 
  Code2, 
  Smartphone, 
  Gauge, 
  Lightbulb,
  Menu,
  X,
  ArrowRight,
  Check,
  Layers3,
  GitBranch,
  Wand2,
  Sparkles
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false

// Custom hook for GSAP with reduced motion support
function useGsapAnimation(animateFn, deps = []) {
  const ref = useRef(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  
  useEffect(() => {
    if (reducedMotion || !ref.current) return
    
    const ctx = gsap.context(() => {
      animateFn()
    }, ref)

    return () => ctx.revert()
  }, [reducedMotion, ...deps])
  
  return ref
}

// Preset A: "Organic Tech" Design Tokens
const PRESET = {
  name: 'Organic Tech',
  palette: {
    moss: '#2E4036',
    clay: '#CC5833',
    cream: '#F2F0E9',
    charcoal: '#1A1A1A',
  },
  typography: {
    heading: 'Plus Jakarta Sans',
    drama: 'Cormorant Garamond',
    data: 'IBM Plex Mono',
  },
  imageMood: 'dark forest, organic textures, moss, ferns, laboratory glassware',
}

function App() {
  // Performance monitoring
  useEffect(() => {
    // Report Web Vitals
    if ('PerformanceObserver' in window) {
      // Measure LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('[Web Vitals] LCP:', lastEntry.startTime)
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Measure CLS
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        }
        console.log('[Web Vitals] CLS:', clsValue)
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Measure FID/INP
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('[Web Vitals] FID:', entry.processingStart - entry.startTime)
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      return () => {
        lcpObserver.disconnect()
        clsObserver.disconnect()
        fidObserver.disconnect()
      }
    }
  }, [])

  return (
    <div className="relative">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

// NAVBAR — "The Floating Island"
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      ref={navRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#F2F0E9]/90 backdrop-blur-xl border border-[#2E4036]/20 shadow-lg' 
          : 'bg-transparent'
      }`}
      style={{ borderRadius: '100px' }}
    >
      <div className="flex items-center gap-8 px-6 py-4">
        <a href="#" className="flex items-center gap-2 lift-link">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: PRESET.palette.moss }}
          >
            <Layers3 className="w-4 h-4 text-white" />
          </div>
          <span className={`font-bold text-lg transition-colors duration-500 ${
            scrolled ? 'text-[#1A1A1A]' : 'text-white'
          }`}>
            Bright Leaf
          </span>
        </a>
        
        <div className="hidden md:flex items-center gap-6">
          {['Services', 'Process', 'Work', 'Pricing'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium transition-colors duration-500 lift-link ${
                scrolled ? 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]' : 'text-white/80 hover:text-white'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        <a 
          href="#contact"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 text-white rounded-full font-semibold text-sm magnetic-btn"
          style={{ background: scrolled ? PRESET.palette.moss : PRESET.palette.clay }}
        >
          <span className="btn-bg" style={{ background: PRESET.palette.moss }} />
          <span className="relative z-10 flex items-center gap-2">
            Start Project
            <ArrowRight className="w-4 h-4" />
          </span>
        </a>

        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#F2F0E9]/95 backdrop-blur-xl border border-[#2E4036]/20 rounded-b-[2rem] p-6 flex flex-col gap-4">
          {['Services', 'Process', 'Work', 'Pricing'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium text-[#1A1A1A]"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact"
            className="flex items-center justify-center gap-2 px-5 py-3 text-white rounded-full font-semibold"
            style={{ background: PRESET.palette.clay }}
          >
            Start Project
          </a>
        </div>
      )}
    </nav>
  )
}

// HERO SECTION — "The Opening Shot"
function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (reducedMotion) return
    
    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section 
      ref={heroRef}
      className="relative h-[100dvh] min-h-[700px] flex items-end overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&h=1080&fit=crop&q=80"
          alt="Dark forest organic texture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 md:pb-32"
      >
        <p className="hero-animate font-data text-xs tracking-[0.2em] text-[#CC5833] mb-4 uppercase">
          Design-forward Development Studio
        </p>
        
        <h1 className="hero-animate mb-6">
          <span className="block font-heading font-bold text-white text-4xl md:text-6xl lg:text-7xl tracking-tight">
            Design Systems is the
          </span>
          <span 
            className="block font-drama text-[#CC5833] text-6xl md:text-8xl lg:text-9xl"
            style={{ fontWeight: 500 }}
          >
            future.
          </span>
        </h1>

        <p className="hero-animate font-heading text-white/70 text-lg md:text-xl max-w-xl mb-8">
          We bridge the gap between design intent and digital reality. Using agentic 
          development workflows, we translate the most ambitious design systems into 
          pixel-perfect, production-ready interfaces.
        </p>

        <div className="hero-animate flex flex-wrap gap-4">
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-full font-semibold magnetic-btn"
            style={{ background: PRESET.palette.clay }}
          >
            <span className="btn-bg" style={{ background: PRESET.palette.moss }} />
            <span className="relative z-10">Start Your Project</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
          </a>
          
          <a 
            href="#work"
            className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-full font-semibold border-2 border-white/30 hover:border-white/60 transition-colors"
          >
            View Our Work
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="font-data text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  )
}

// FEATURES — "Interactive Functional Artifacts"
function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-[#F2F0E9]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-data text-xs tracking-[0.2em] text-[#CC5833] mb-4 uppercase">
            What We Do
          </p>
          <h2 className="font-heading font-bold text-[#1A1A1A] text-4xl md:text-5xl mb-4">
            Crafting digital experiences
          </h2>
          <p className="font-heading text-[#1A1A1A]/60 text-lg max-w-2xl mx-auto">
            From complex design systems to single-page landings, we bring the same 
            meticulous attention to every pixel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Diagnostic Shuffler */}
          <FeatureCard1 className="feature-card" />
          
          {/* Card 2: Telemetry Typewriter */}
          <FeatureCard2 className="feature-card" />
          
          {/* Card 3: Cursor Protocol */}
          <FeatureCard3 className="feature-card" />
        </div>

        {/* Static Service Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            { icon: Code2, title: 'Full-Stack Engineering', desc: 'React, Next.js, Vue, Svelte — we speak your stack fluently.' },
            { icon: Smartphone, title: 'Responsive Excellence', desc: 'Every breakpoint considered. Your interface excels on every device.' },
            { icon: Gauge, title: 'Performance', desc: 'Sub-second load times. We engineer for Core Web Vitals from day one.' },
          ].map((service, i) => (
            <div 
              key={i}
              className="feature-card bg-white rounded-[2rem] p-8 border border-[#1A1A1A]/5 hover:shadow-xl transition-shadow"
            >
              <service.icon className="w-10 h-10 text-[#2E4036] mb-4" strokeWidth={1.5} />
              <h3 className="font-heading font-bold text-[#1A1A1A] text-xl mb-2">{service.title}</h3>
              <p className="text-[#1A1A1A]/60">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Feature Card 1: Diagnostic Shuffler
function FeatureCard1({ className }) {
  const items = [
    { label: 'Token Extraction', sub: 'Colors, typography, spacing' },
    { label: 'Component Mapping', sub: 'Hierarchy & relationships' },
    { label: 'System Documentation', sub: 'Living design specs' },
  ]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`${className} bg-white rounded-[2rem] p-8 border border-[#1A1A1A]/5`}>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse" />
        <span className="font-data text-xs tracking-widest text-[#1A1A1A]/50 uppercase">
          Diagnostic Engine
        </span>
      </div>
      
      <div className="relative h-32 overflow-hidden">
        {items.map((item, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col justify-center transition-all duration-500"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <span className="font-heading font-bold text-[#1A1A1A] text-2xl">{item.label}</span>
            <span className="text-[#1A1A1A]/50 mt-1">{item.sub}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        {items.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all ${i === current ? 'w-8 bg-[#2E4036]' : 'w-1 bg-[#1A1A1A]/20'}`}
          />
        ))}
      </div>
    </div>
  )
}

// Feature Card 2: Telemetry Typewriter
function FeatureCard2({ className }) {
  const messages = [
    '> Analyzing design tokens...',
    '> Mapping components...',
    '> Generating system specs...',
    '> Ready for production.',
  ]
  const [displayText, setDisplayText] = useState('')
  const [messageIndex, setMessageIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (messageIndex >= messages.length) return

    const currentMessage = messages[messageIndex]
    
    if (charIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => currentMessage.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setMessageIndex(prev => prev + 1)
        setCharIndex(0)
        if (messageIndex < messages.length - 1) {
          setDisplayText(prev => prev + '\n')
        }
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [charIndex, messageIndex])

  return (
    <div className={`${className} bg-white rounded-[2rem] p-8 border border-[#1A1A1A]/5`}>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse" />
        <span className="font-data text-xs tracking-widest text-[#1A1A1A]/50 uppercase">
          Live Feed
        </span>
      </div>
      
      <div className="bg-[#1A1A1A] rounded-xl p-4 h-32">
        <pre className="font-data text-sm text-[#2E4036] whitespace-pre-wrap">
          {displayText}
          <span className="inline-block w-2 h-4 bg-[#CC5833] ml-1 animate-pulse" />
        </pre>
      </div>

      <div className="flex gap-2 mt-4">
        <div className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse" />
        <span className="font-data text-xs text-[#1A1A1A]/50">System Active</span>
      </div>
    </div>
  )
}

// Feature Card 3: Cursor Protocol Scheduler
function FeatureCard3({ className }) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const [activeDay, setActiveDay] = useState(null)
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    const runAnimation = () => {
      setShowCursor(true)
      const dayIndex = Math.floor(Math.random() * 7)
      setTimeout(() => {
        setActiveDay(dayIndex)
        setTimeout(() => {
          setShowCursor(false)
          setTimeout(() => {
            setActiveDay(null)
            setTimeout(runAnimation, 2000)
          }, 1500)
        }, 1000)
      }, 500)
    }
    
    const timeout = setTimeout(runAnimation, 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={`${className} bg-white rounded-[2rem] p-8 border border-[#1A1A1A]/5`}>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse" />
        <span className="font-data text-xs tracking-widest text-[#1A1A1A]/50 uppercase">
          Scheduler
        </span>
      </div>
      
      <div className="relative">
        <div className="flex justify-between mb-4">
          {days.map((day, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-data text-sm transition-all ${
                activeDay === i 
                  ? 'bg-[#CC5833] text-white scale-110' 
                  : 'bg-[#F2F0E9] text-[#1A1A1A]/50'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        
        <button className="w-full py-3 rounded-full bg-[#2E4036] text-white font-semibold text-sm">
          Save Schedule
        </button>

        {/* Animated Cursor */}
        {showCursor && (
          <div className="absolute -top-2 -left-2 w-6 h-6">
            <svg viewBox="0 0 24 24" fill="#CC5833" className="w-full h-full">
              <path d="M4 4l16 8-8 2-2 8z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

// PHILOSOPHY — "The Manifesto"
function Philosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.manifesto-line', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ background: PRESET.palette.charcoal }}
    >
      {/* Parallax Background */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&h=1080&fit=crop&q=80"
          alt="Forest texture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="manifesto-line font-data text-[#CC5833] text-sm tracking-[0.2em] mb-8 uppercase">
          Our Philosophy
        </p>
        
        <div className="manifesto-line">
          <p className="font-heading text-white/60 text-xl md:text-2xl mb-12">
            Most agencies focus on: <span className="text-white/40">delivery speed.</span>
          </p>
        </div>

        <div className="manifesto-line">
          <h2 
            className="font-drama text-[#CC5833] text-5xl md:text-7xl lg:text-8xl"
            style={{ fontWeight: 500 }}
          >
            We focus on: <span className="text-white">design fidelity.</span>
          </h2>
        </div>

        <p className="manifesto-line font-heading text-white/50 text-lg mt-12 max-w-2xl mx-auto">
          Every pixel, every transition, every moment of delight — grown with intention. 
          Your vision, realized at machine speed with human precision.
        </p>
      </div>
    </section>
  )
}

// PROTOCOL — "Sticky Stacking Archive"
function Protocol() {
  const sectionRef = useRef(null)

  useEffect(() => {
    // Only enable sticky effect on desktop (md = 768px+)
    const isDesktop = window.innerWidth >= 768
    
    if (!isDesktop) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 40%',
          onUpdate: (self) => {
            const progress = self.progress
            gsap.to(card, {
              scale: 1 - (progress * 0.1),
              filter: `blur(${progress * 10}px)`,
              opacity: 1 - (progress * 0.5),
              duration: 0.1,
            })
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      desc: 'We absorb your design files, understand your brand DNA, and map out the implementation strategy.',
      icon: Wand2,
      animation: 'rotate',
    },
    {
      number: '02',
      title: 'Translation',
      desc: 'Design tokens extracted, component hierarchies mapped, and a comprehensive plan created.',
      icon: Layers,
      animation: 'scan',
    },
    {
      number: '03',
      title: 'Agentic Build',
      desc: 'Multiple agentic workers build components in parallel, integrating continuously for consistency.',
      icon: GitBranch,
      animation: 'pulse',
    },
  ]

  return (
    <section 
      id="process"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-[#F2F0E9]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-data text-xs tracking-[0.2em] text-[#CC5833] mb-4 uppercase">
            Our Process
          </p>
          <h2 className="font-heading font-bold text-[#1A1A1A] text-4xl md:text-5xl">
            How we bring ideas to life
          </h2>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <ProtocolCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProtocolCard({ step, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        }
      })
    }, cardRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={cardRef}
      className="protocol-card bg-white rounded-[2rem] p-8 md:p-12 border border-[#1A1A1A]/5"
    >
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Visual */}
        <div className="w-full md:w-48 h-48 flex items-center justify-center bg-[#F2F0E9] rounded-2xl">
          <ProtocolAnimation type={step.animation} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <span className="font-data text-[#CC5833] text-sm mb-2 block">
            {step.number}
          </span>
          <h3 className="font-heading font-bold text-[#1A1A1A] text-2xl md:text-3xl mb-4">
            {step.title}
          </h3>
          <p className="text-[#1A1A1A]/60 text-lg leading-relaxed">
            {step.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

function ProtocolAnimation({ type }) {
  if (type === 'rotate') {
    return (
      <svg viewBox="0 0 100 100" className="w-24 h-24 animate-spin" style={{ animationDuration: '8s' }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#2E4036" strokeWidth="2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#CC5833" strokeWidth="2" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="#2E4036" strokeWidth="2" />
        <circle cx="50" cy="20" r="4" fill="#CC5833" />
      </svg>
    )
  }

  if (type === 'scan') {
    return (
      <div className="relative w-24 h-24">
        <div className="grid grid-cols-4 gap-1 w-full h-full p-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="bg-[#2E4036]/20 rounded-sm" />
          ))}
        </div>
        <div 
          className="absolute inset-x-2 h-0.5 bg-[#CC5833]"
          style={{
            animation: 'scan 2s ease-in-out infinite',
            boxShadow: '0 0 10px #CC5833',
          }}
        />
        <style>{`
          @keyframes scan {
            0%, 100% { top: 8px; }
            50% { top: calc(100% - 10px); }
          }
        `}</style>
      </div>
    )
  }

  if (type === 'pulse') {
    return (
      <svg viewBox="0 0 100 50" className="w-32 h-16">
        <path 
          d="M0 25 L20 25 L25 5 L30 45 L35 15 L40 35 L45 25 L60 25 L65 10 L70 40 L75 20 L80 30 L85 25 L100 25"
          fill="none"
          stroke="#2E4036"
          strokeWidth="2"
          className="animate-pulse"
          style={{ strokeDasharray: 200, strokeDashoffset: 200, animation: 'dash 2s ease-in-out infinite' }}
        />
        <style>{`
          @keyframes dash {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    )
  }

  return null
}

// PRICING
function Pricing() {
  const tiers = [
    {
      name: 'Essential',
      price: 'Custom',
      desc: 'Perfect for single-page sites and landing pages.',
      features: ['Up to 5 sections', 'Responsive design', 'Basic animations', '1 round of revisions'],
      cta: 'Get Started',
    },
    {
      name: 'Performance',
      price: 'Custom',
      desc: 'For complex applications and design systems.',
      features: ['Unlimited sections', 'Design system build', 'Agentic workflows', 'Unlimited revisions', 'Ongoing support'],
      cta: 'Start Project',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'Full-scale digital product development.',
      features: ['Everything in Performance', 'Dedicated team', 'Priority support', 'SLA guarantee'],
      cta: 'Contact Us',
    },
  ]

  return (
    <section 
      id="pricing"
      className="py-24 md:py-32 px-6 bg-[#F2F0E9]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-data text-xs tracking-[0.2em] text-[#CC5833] mb-4 uppercase">
            Pricing
          </p>
          <h2 className="font-heading font-bold text-[#1A1A1A] text-4xl md:text-5xl">
            Investment in precision
          </h2>
          <p className="font-heading text-[#1A1A1A]/60 text-lg mt-4 max-w-2xl mx-auto">
            Every project is unique. Let's discuss your needs and find the right fit.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div 
              key={i}
              className={`rounded-[2rem] p-8 transition-all hover:-translate-y-2 ${
                tier.featured 
                  ? 'bg-[#2E4036] text-white ring-4 ring-[#CC5833]/30 scale-105' 
                  : 'bg-white border border-[#1A1A1A]/5'
              }`}
            >
              <h3 className={`font-heading font-bold text-xl mb-2 ${tier.featured ? 'text-white' : 'text-[#1A1A1A]'}`}>
                {tier.name}
              </h3>
              <p className={`font-drama text-4xl mb-4 ${tier.featured ? 'text-[#CC5833]' : 'text-[#1A1A1A]'}`}>
                {tier.price}
              </p>
              <p className={`text-sm mb-6 ${tier.featured ? 'text-white/70' : 'text-[#1A1A1A]/60'}`}>
                {tier.desc}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${tier.featured ? 'text-[#CC5833]' : 'text-[#2E4036]'}`} />
                    <span className={tier.featured ? 'text-white/90' : 'text-[#1A1A1A]/70'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a 
                href="#contact"
                className={`block text-center py-4 rounded-full font-semibold transition-all magnetic-btn ${
                  tier.featured 
                    ? 'bg-[#CC5833] text-white' 
                    : 'bg-[#1A1A1A] text-white'
                }`}
              >
                <span className={`btn-bg ${tier.featured ? 'bg-[#1A1A1A]' : 'bg-[#CC5833]'}`} />
                <span className="relative z-10">{tier.cta}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FOOTER
function Footer() {
  return (
    <footer 
      id="contact"
      className="relative pt-24 pb-12 px-6 rounded-t-[4rem]"
      style={{ background: PRESET.palette.charcoal }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: PRESET.palette.clay }}>
                <Layers3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-white text-xl">Bright Leaf Design</span>
            </div>
            <p className="text-white/60 max-w-md leading-relaxed mb-6">
              A design-forward development studio. We bridge the gap between design intent 
              and digital reality through agentic precision.
            </p>
            <a 
              href="mailto:hello@brightleaf.design"
              className="inline-flex items-center gap-2 font-heading font-semibold text-[#CC5833] hover:text-white transition-colors"
            >
              hello@brightleaf.design
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {['Design Systems', 'Agentic Dev', 'Full-Stack', 'Consultation'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-white/60 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Studio</h4>
            <ul className="space-y-2">
              {['Work', 'Process', 'Pricing'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#0ACF83] animate-pulse" />
            <span className="font-data text-xs text-white/50 tracking-wider">
              SYSTEM OPERATIONAL
            </span>
          </div>
          
          <p className="text-white/40 text-sm">
            © 2026 Bright Leaf Design. Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default App
