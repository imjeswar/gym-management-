'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import { Dumbbell, ArrowRight, Mail, Phone, Download, CheckCircle, CreditCard, Banknote, AlertCircle } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const programs = [
  {
    title: 'PERSONAL TRAINING',
    desc: 'One-on-one coaching tailored to your unique goals, schedule, and fitness level.',
    images: ['/program_personal.png', '/program_personal_2.png', '/program_personal_3.png']
  },
  {
    title: 'STRENGTH TRAINING',
    desc: 'Build muscle, increase power, and transform your physique.',
    images: ['/program_strength.png', '/program_strength_2.png', '/program_strength_3.png']
  },
  {
    title: 'HIIT CLASSES',
    desc: 'High-intensity interval training that burns calories and builds endurance in record time.',
    images: ['/program_hiit.png', '/program_hiit_2.png', '/program_hiit_3.png']
  },
  {
    title: 'FITNESS TRAINING',
    desc: 'One-on-one coaching tailored to your unique goals, schedule, and fitness level.',
    images: ['/program_fitness.png', '/program_fitness_2.png']
  }
]

const ProgramCard = ({ program, idx }: { program: any, idx: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && program.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % program.images.length);
      }, 2000);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, program.images.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-80 rounded-3xl overflow-hidden bg-card border border-border/20"
    >
      {program.images.map((src: string, i: number) => (
        <Image 
          key={i}
          src={src} 
          alt={`${program.title} ${i + 1}`} 
          fill 
          priority={i === 0}
          className={`object-cover transition-all duration-1000 ${i === currentImageIndex ? 'opacity-70 group-hover:scale-105' : 'opacity-0 scale-100'}`} 
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end z-20">
        <div className="max-w-[70%]">
          <h3 className="text-xl font-black uppercase tracking-wide text-white mb-2">{program.title}</h3>
          <p className="text-xs text-gray-300 leading-relaxed">{program.desc}</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 hover:bg-white hover:text-primary transition-colors"
        >
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const scheduleTabs = ['Timing', 'Flexibility', 'Cardio', 'HIIT', 'Bodybuilding', 'Crossfit']
const days = ['Monday', 'Tuesday', 'Wed', 'Thursday', 'Friday', 'Saturday']
const realisticTimeSlots = ['6:00am - 8:00am', '9:00am - 10:00am', '5:00pm - 7:00pm', '7:00pm - 8:30pm']

const workoutPlans: Record<string, any> = {
  'Flexibility': {
    goal: 'Improve mobility, posture, and muscle recovery.',
    difficulty: 'Beginner',
    duration: '30-45 min',
    calories: '150-250 kcal',
    weeklyPlan: [
      { day: 'Monday', desc: 'Full Body Stretching (30 min)' },
      { day: 'Tuesday', desc: 'Yoga Flow (45 min)' },
      { day: 'Wednesday', desc: 'Mobility Drills (30 min)' },
      { day: 'Thursday', desc: 'Dynamic Stretching (30 min)' },
      { day: 'Friday', desc: 'Yoga + Core Stability (45 min)' },
      { day: 'Saturday', desc: 'Foam Rolling & Recovery (30 min)' },
      { day: 'Sunday', desc: 'Rest' }
    ],
    exercises: ['Hamstring Stretch', 'Hip Flexor Stretch', 'Cobra Stretch', 'Cat-Cow Stretch', 'Shoulder Mobility Drills', 'Child\'s Pose']
  },
  'Cardio': {
    goal: 'Improve endurance and burn calories.',
    difficulty: 'Intermediate',
    duration: '20-45 min',
    calories: '300-500 kcal',
    weeklyPlan: [
      { day: 'Monday', desc: 'Treadmill Running (30 min)' },
      { day: 'Tuesday', desc: 'Cycling (40 min)' },
      { day: 'Wednesday', desc: 'Jump Rope (20 min)' },
      { day: 'Thursday', desc: 'HIIT Cardio (20 min)' },
      { day: 'Friday', desc: 'Rowing Machine (30 min)' },
      { day: 'Saturday', desc: 'Outdoor Run (45 min)' },
      { day: 'Sunday', desc: 'Rest' }
    ],
    exercises: ['Running', 'Cycling', 'Jump Rope', 'Rowing', 'Stair Climber', 'Elliptical']
  },
  'HIIT': {
    goal: 'Maximum fat loss and conditioning.',
    difficulty: 'Advanced',
    duration: '30-45 min',
    calories: '400-600 kcal',
    weeklyPlan: [
      { day: 'Monday', desc: 'Full Body HIIT' },
      { day: 'Tuesday', desc: 'Lower Body HIIT' },
      { day: 'Wednesday', desc: 'Active Recovery' },
      { day: 'Thursday', desc: 'Upper Body HIIT' },
      { day: 'Friday', desc: 'Core HIIT' },
      { day: 'Saturday', desc: 'Full Body Circuit' },
      { day: 'Sunday', desc: 'Rest' }
    ],
    exercises: ['Burpees – 40 sec', 'Mountain Climbers – 40 sec', 'Jump Squats – 40 sec', 'Push-ups – 40 sec', 'High Knees – 40 sec', 'Rest – 20 sec']
  },
  'Bodybuilding': {
    goal: 'Muscle growth and strength.',
    difficulty: 'Intermediate',
    duration: '60-90 min',
    calories: '300-450 kcal',
    weeklyPlan: [
      { day: 'Monday', desc: 'Chest (Bench Press, Flys)' },
      { day: 'Tuesday', desc: 'Back (Pull-Ups, Rows)' },
      { day: 'Wednesday', desc: 'Legs (Squats, Press)' },
      { day: 'Thursday', desc: 'Shoulders (Overhead Press)' },
      { day: 'Friday', desc: 'Arms (Curls, Pushdowns)' },
      { day: 'Saturday', desc: 'Weak Point Training' },
      { day: 'Sunday', desc: 'Rest' }
    ],
    exercises: ['Bench Press', 'Incline Dumbbell Press', 'Cable Fly', 'Pull-Ups', 'Lat Pulldown', 'Squats']
  },
  'Crossfit': {
    goal: 'Functional fitness and athletic performance.',
    difficulty: 'Advanced',
    duration: '60 min',
    calories: '500-700 kcal',
    weeklyPlan: [
      { day: 'Monday', desc: 'WOD (Run, Pull-Ups, Push-Ups)' },
      { day: 'Tuesday', desc: 'Strength (Deadlift, Squat)' },
      { day: 'Wednesday', desc: 'AMRAP 20 Min' },
      { day: 'Thursday', desc: 'Olympic Lifting' },
      { day: 'Friday', desc: 'Hero WOD' },
      { day: 'Saturday', desc: 'Functional Circuit' },
      { day: 'Sunday', desc: 'Recovery' }
    ],
    exercises: ['Clean & Jerk', 'Snatch Practice', 'Deadlift', 'Front Squat', 'Box Jumps', 'Kettlebell Swings']
  }
}

const socialLinks = {
  instagram: "https://instagram.com/imjeswar",
  facebook: "https://facebook.com/imjeswar",
  email: "mailto:imjeswar@gmail.com",
  whatsapp: "https://wa.me/917904181537"
}

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment' | 'success'>('details')
  const [userDetails, setUserDetails] = useState({ name: '', email: '', phone: '' })
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online' | null>(null)
  const [memberId, setMemberId] = useState('')
  const [selectedScheduleTab, setSelectedScheduleTab] = useState('Timing')
  const [isScrolled, setIsScrolled] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getPlanPrice = (plan: string) => {
    if (plan === 'Basic Plan') return 1999
    if (plan === 'Regular Plan') return 3999
    if (plan === 'Premium Plan') return 5999
    return 0
  }

  const startDate = new Date();
  const getExpiryDate = (plan: string | null) => {
    const expiry = new Date(startDate);
    if (plan === 'Basic Plan') expiry.setMonth(expiry.getMonth() + 3);
    else if (plan === 'Regular Plan') expiry.setMonth(expiry.getMonth() + 6);
    else if (plan === 'Premium Plan') expiry.setFullYear(expiry.getFullYear() + 1);
    return expiry;
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  }

  const getCardTheme = (plan: string | null) => {
    if (plan === 'Basic Plan') return { bg: 'bg-[#F9F9F6]', text: 'text-[#B8985B]', primaryText: 'text-[#8A7143]', border: 'border-[#B8985B]' };
    if (plan === 'Regular Plan') return { bg: 'bg-[#FF4500]', text: 'text-white/80', primaryText: 'text-white', border: 'border-white/40' };
    return { bg: 'bg-[#111111]', text: 'text-[#D4AF37]', primaryText: 'text-[#D4AF37]', border: 'border-[#D4AF37]/50' };
  }

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setCheckoutStep('details');
    setPaymentMethod(null);
    setMemberId(`FIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    setTimeout(() => {
      document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  const handleDownloadCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2 });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `FitZone_Membership_${userDetails.name.replace(/\s+/g, '_') || 'Card'}.png`;
      link.click();
    }
  }

  return (
    <div className="min-h-screen bg-transparent overflow-hidden selection:bg-primary/30 relative">
      <AnimatedBackground />
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'border-b border-border/20 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 shadow-xl' : 'bg-transparent border-transparent'}`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-widest text-foreground uppercase">FITZONE</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
            <a href="#" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-primary transition-colors text-foreground">Home</a>
            <a href="#programs" onClick={(e) => scrollToSection(e, 'programs')} className="hover:text-primary transition-colors">Programs</a>
            <a href="#schedule" onClick={(e) => scrollToSection(e, 'schedule')} className="hover:text-primary transition-colors">Schedule</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-primary transition-colors">About</a>
            <a href="#progress" onClick={(e) => scrollToSection(e, 'progress')} className="hover:text-primary transition-colors">Progress</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-primary transition-colors">Contact</a>
            
            {/* Social Icons in Nav */}
            <div className="flex items-center gap-3 border-l border-border/50 pl-6 ml-2">
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><InstagramIcon className="h-4 w-4" /></a>
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><FacebookIcon className="h-4 w-4" /></a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Phone className="h-4 w-4" /></a>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="rounded-full bg-primary px-6 py-2 text-xs sm:px-8 sm:text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Join Now
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen pt-20 flex items-center">
        <div className="absolute inset-0 z-0">
          <Image src="/hero_bg.png" alt="Hero" fill className="object-cover opacity-60" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl">
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <div className="h-3 w-2 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">EVERY DROP COUNT</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-6xl sm:text-[80px] font-black uppercase tracking-tighter text-white leading-[0.9] mb-6">
              UNLEASH YOUR<br />
              <span className="text-primary">POTENTIAL</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-8 max-w-md leading-relaxed font-light">
              Join a community where goals are crushed, strength is built, and potential becomes power.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get Started
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="rounded-full border border-primary/50 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-primary/10 transition-colors"
              >
                Explore More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black uppercase tracking-wider text-white mb-2">OUR PROGRAMS</h2>
            <p className="text-gray-400 max-w-md mx-auto text-sm">Discover the perfect programs to match your goals and fitness level.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, idx) => (
              <ProgramCard key={idx} program={program} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Give Shape To Your Body */}
      <section id="about" className="py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full aspect-[4/5] max-h-[600px] rounded-[3rem] overflow-hidden border border-border/20"
            >
              <Image src="/shape_body.png" alt="Fitness Woman" fill className="object-cover object-center scale-[1.25]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-none">
                GIVE SHAPE TO<br />YOUR BODY
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-md">
                At FITZONE, we help you build strength, confidence, and lasting habits. With expert coaches and proven programs, we guide you toward your best shape.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Explore More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 relative z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black uppercase tracking-wider text-white">OUR SCHEDULE</h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full overflow-x-auto pb-4"
          >
            <div className="min-w-[800px]">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {scheduleTabs.map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setSelectedScheduleTab(tab)}
                    className={`flex-1 min-w-[120px] py-3 text-sm font-bold tracking-wider rounded-xl transition-colors border ${selectedScheduleTab === tab ? 'bg-primary text-white border-primary' : 'bg-card/50 backdrop-blur-sm text-gray-400 border-border hover:border-gray-500 hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {selectedScheduleTab === 'Timing' ? (
                /* Grid */
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
                  {days.map((day) => (
                    <div key={day} className="flex gap-2 h-14">
                      <div className="w-32 flex items-center justify-center font-bold tracking-wider text-primary border border-border/50 bg-card/30 backdrop-blur-sm rounded-xl">
                        {day}
                      </div>
                      {/* Realistic grid cells */}
                      <div className="flex-1 border border-border/50 bg-card/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-xs text-gray-300">
                        {Math.random() > 0.3 ? realisticTimeSlots[0] : ''}
                      </div>
                      <div className="flex-1 border border-border/50 bg-card/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-xs text-gray-300">
                        {Math.random() > 0.5 ? realisticTimeSlots[1] : ''}
                      </div>
                      <div className="flex-1 border border-border/50 bg-card/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-xs text-gray-300">
                        {Math.random() > 0.3 ? realisticTimeSlots[2] : ''}
                      </div>
                      <div className="flex-1 border border-border/50 bg-card/30 backdrop-blur-sm rounded-xl flex items-center justify-center text-xs text-gray-300">
                        {Math.random() > 0.1 ? realisticTimeSlots[3] : ''}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedScheduleTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-card/40 backdrop-blur-md rounded-2xl p-8 border border-border/50 text-white mt-4"
                  >
                    <div className="mb-8">
                      <h3 className="text-2xl font-black uppercase text-primary mb-2">{selectedScheduleTab} Program</h3>
                      <p className="text-gray-300 italic">Goal: {workoutPlans[selectedScheduleTab]?.goal}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-6">
                        <div className="bg-background/60 px-4 py-2 rounded-lg border border-border/50">
                          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Difficulty</span>
                          <span className="text-sm font-bold">{workoutPlans[selectedScheduleTab]?.difficulty}</span>
                        </div>
                        <div className="bg-background/60 px-4 py-2 rounded-lg border border-border/50">
                          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Duration</span>
                          <span className="text-sm font-bold">{workoutPlans[selectedScheduleTab]?.duration}</span>
                        </div>
                        <div className="bg-background/60 px-4 py-2 rounded-lg border border-border/50">
                          <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Calories Burned</span>
                          <span className="text-sm font-bold">{workoutPlans[selectedScheduleTab]?.calories}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <h4 className="text-sm font-black uppercase text-gray-400 mb-4 pb-2 border-b border-border/50">Weekly Plan</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                          {workoutPlans[selectedScheduleTab]?.weeklyPlan.map((p: any, idx: number) => (
                            <li key={idx} className="flex gap-4">
                              <span className="font-bold text-primary w-24 shrink-0">{p.day}</span>
                              <span>{p.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase text-gray-400 mb-4 pb-2 border-b border-border/50">Core Exercises</h4>
                        <div className="flex flex-wrap gap-2">
                          {workoutPlans[selectedScheduleTab]?.exercises.map((ex: string, idx: number) => (
                            <span key={idx} className="bg-primary/10 border border-primary/30 text-primary px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
          >
            <h2 className="text-3xl font-black uppercase tracking-tight text-white max-w-md leading-none">
              START YOUR BODY GOAL FROM CHOOSING OUR PACKAGE
            </h2>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Whatever your fitness journey, we've a package tailored to your needs. Whether you are aiming to build strength, lose weight, improve overall wellness, or simply feel more confident in your skin.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
            {/* Basic Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`border bg-card/60 backdrop-blur-md p-10 rounded-2xl flex flex-col justify-between h-[400px] transition-colors ${selectedPlan === 'Basic Plan' ? 'border-primary' : 'border-border/50'}`}
            >
              <div>
                <h3 className="text-xl font-black text-white mb-4">Basic Plan</h3>
                <p className="text-sm text-gray-400">Great for beginners. Simple, and effective. Includes access to the gym and basic equipment.</p>
              </div>
              <div>
                <div className="flex items-start text-white mb-6">
                  <span className="text-2xl font-bold mt-1 mr-1">₹</span>
                  <span className="text-5xl font-black">2999</span>
                  <span className="text-sm text-gray-400 self-end mb-1 ml-1">/month</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlanSelect('Basic Plan')}
                  className={`w-full rounded-full py-3 text-sm font-bold uppercase tracking-wider transition-colors ${selectedPlan === 'Basic Plan' ? 'bg-primary text-white border border-primary' : 'border border-primary/50 text-white hover:bg-primary hover:border-primary'}`}
                >
                  {selectedPlan === 'Basic Plan' ? 'Selected' : 'Join Now'}
                </motion.button>
              </div>
            </motion.div>

            {/* Regular Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`border-t-4 border-x border-b bg-card/80 backdrop-blur-md p-10 rounded-2xl flex flex-col justify-between h-[400px] relative shadow-2xl shadow-primary/5 transform md:-translate-y-4 transition-colors ${selectedPlan === 'Regular Plan' ? 'border-primary' : 'border-t-primary border-x-border/50 border-b-border/50'}`}
            >
              <div className="absolute -top-4 left-8 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                POPULAR
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-4">Regular Plan</h3>
                <p className="text-sm text-gray-400">Great for active gym-goers. Includes access to the gym, classes, and group sessions.</p>
              </div>
              <div>
                <div className="flex items-start text-white mb-6">
                  <span className="text-2xl font-bold mt-1 mr-1">₹</span>
                  <span className="text-5xl font-black text-primary">3999</span>
                  <span className="text-sm text-gray-400 self-end mb-1 ml-1">/month</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlanSelect('Regular Plan')}
                  className={`w-full rounded-full py-3 text-sm font-bold uppercase tracking-wider transition-colors ${selectedPlan === 'Regular Plan' ? 'bg-primary/80 border border-primary text-white' : 'bg-primary border border-primary text-white hover:bg-primary/90'}`}
                >
                  {selectedPlan === 'Regular Plan' ? 'Selected' : 'Join Now'}
                </motion.button>
              </div>
            </motion.div>

            {/* Premium Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={`border bg-card/60 backdrop-blur-md p-10 rounded-2xl flex flex-col justify-between h-[400px] transition-colors ${selectedPlan === 'Premium Plan' ? 'border-primary' : 'border-border/50'}`}
            >
              <div>
                <h3 className="text-xl font-black text-white mb-4">Premium Plan</h3>
                <p className="text-sm text-gray-400">Personalized training, premium access, and priority support for ultimate results.</p>
              </div>
              <div>
                <div className="flex items-start text-white mb-6">
                  <span className="text-2xl font-bold mt-1 mr-1">₹</span>
                  <span className="text-5xl font-black">5999</span>
                  <span className="text-sm text-gray-400 self-end mb-1 ml-1">/month</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlanSelect('Premium Plan')}
                  className={`w-full rounded-full py-3 text-sm font-bold uppercase tracking-wider transition-colors ${selectedPlan === 'Premium Plan' ? 'bg-primary text-white border border-primary' : 'border border-primary/50 text-white hover:bg-primary hover:border-primary'}`}
                >
                  {selectedPlan === 'Premium Plan' ? 'Selected' : 'Join Now'}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Expandable Checkout Form */}
          <div id="checkout-form">
            <AnimatePresence mode="wait">
              {selectedPlan && (
                <motion.div
                  key="checkout-container"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 48 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="border border-primary/30 bg-card/90 backdrop-blur-xl rounded-3xl overflow-hidden relative z-10"
                >
                  <div className="p-8 md:p-12">
                    
                    {/* Step 1: Details */}
                    {checkoutStep === 'details' && (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                        <h3 className="text-2xl font-black uppercase tracking-wider text-white mb-2">Step 1: Your Details</h3>
                        <p className="text-gray-400 text-sm mb-8">You are signing up for the <strong className="text-primary">{selectedPlan}</strong>.</p>
                        
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" onSubmit={(e) => { e.preventDefault(); setCheckoutStep('payment') }}>
                          <div className="space-y-5">
                            <div>
                              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Full Name</label>
                              <input type="text" value={userDetails.name} onChange={e => setUserDetails({...userDetails, name: e.target.value})} placeholder="Enter your name" className="w-full bg-background/50 border border-border/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors" required />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Email Address</label>
                              <input type="email" value={userDetails.email} onChange={e => setUserDetails({...userDetails, email: e.target.value})} placeholder="Enter your email" className="w-full bg-background/50 border border-border/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors" required />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Phone Number</label>
                              <input type="tel" value={userDetails.phone} onChange={e => setUserDetails({...userDetails, phone: e.target.value})} placeholder="Enter your phone number" className="w-full bg-background/50 border border-border/50 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors" required />
                            </div>
                          </div>
                          
                          <div className="flex flex-col justify-between h-full">
                            <div className="bg-background/80 border border-border/50 rounded-xl p-6 mb-6">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6 pb-4 border-b border-border/50">Order Summary</h4>
                              <div className="flex justify-between text-white mb-3"><span className="font-medium">{selectedPlan}</span><span className="font-bold">₹{getPlanPrice(selectedPlan)}</span></div>
                              <div className="flex justify-between text-gray-400 mb-6 text-sm"><span>Taxes & GST (18%)</span><span>₹{Math.floor(getPlanPrice(selectedPlan) * 0.18)}</span></div>
                              <div className="border-t border-border/50 pt-4 flex justify-between items-center"><span className="text-sm font-bold uppercase text-gray-400">Total Due Today</span><span className="text-2xl font-black text-primary">₹{Math.floor(getPlanPrice(selectedPlan) * 1.18)}</span></div>
                            </div>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full rounded-full bg-primary py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(255,69,0,0.3)]">
                              Continue to Payment <ArrowRight className="inline h-4 w-4 ml-2" />
                            </motion.button>
                          </div>
                        </form>
                      </motion.div>
                    )}

                    {/* Step 2: Payment */}
                    {checkoutStep === 'payment' && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <h3 className="text-2xl font-black uppercase tracking-wider text-white mb-2">Step 2: Payment Method</h3>
                        <p className="text-gray-400 text-sm mb-8">Choose how you'd like to pay for your <strong className="text-primary">{selectedPlan}</strong>.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <button onClick={() => setPaymentMethod('online')} className={`flex items-center p-6 border rounded-xl text-left transition-colors ${paymentMethod === 'online' ? 'bg-primary/10 border-primary' : 'bg-background/50 border-border/50 hover:border-primary/50'}`}>
                            <CreditCard className={`h-8 w-8 mr-4 ${paymentMethod === 'online' ? 'text-primary' : 'text-gray-400'}`} />
                            <div>
                              <h4 className={`font-bold ${paymentMethod === 'online' ? 'text-white' : 'text-gray-300'}`}>Pay Online</h4>
                              <p className="text-xs text-gray-500">Credit Card, UPI, Netbanking</p>
                            </div>
                          </button>
                          <button onClick={() => setPaymentMethod('cash')} className={`flex items-center p-6 border rounded-xl text-left transition-colors ${paymentMethod === 'cash' ? 'bg-primary/10 border-primary' : 'bg-background/50 border-border/50 hover:border-primary/50'}`}>
                            <Banknote className={`h-8 w-8 mr-4 ${paymentMethod === 'cash' ? 'text-primary' : 'text-gray-400'}`} />
                            <div>
                              <h4 className={`font-bold ${paymentMethod === 'cash' ? 'text-white' : 'text-gray-300'}`}>Pay at Desk (Cash)</h4>
                              <p className="text-xs text-gray-500">Pay in person at the facility</p>
                            </div>
                          </button>
                        </div>

                        {paymentMethod === 'online' && (
                          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start text-red-500 mb-8">
                            <AlertCircle className="h-5 w-5 mr-3 shrink-0 mt-0.5" />
                            <p className="text-sm">Online payment gateway is not currently available due to server maintenance. Please select "Pay at Desk" or try again later.</p>
                          </div>
                        )}

                        <div className="flex gap-4">
                          <button onClick={() => setCheckoutStep('details')} className="px-8 py-4 rounded-full border border-border text-white hover:bg-white/5 transition-colors text-sm font-bold uppercase tracking-wider">
                            Back
                          </button>
                          <motion.button 
                            disabled={paymentMethod !== 'cash'}
                            whileHover={paymentMethod === 'cash' ? { scale: 1.02 } : {}}
                            whileTap={paymentMethod === 'cash' ? { scale: 0.98 } : {}}
                            onClick={() => { if(paymentMethod === 'cash') setCheckoutStep('success') }} 
                            className={`flex-1 rounded-full py-4 text-sm font-bold uppercase tracking-wider text-white transition-all ${paymentMethod === 'cash' ? 'bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(255,69,0,0.3)]' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                          >
                            Confirm & Generate Membership
                          </motion.button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Success & Card */}
                    {checkoutStep === 'success' && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
                        <CheckCircle className="h-16 w-16 text-primary mb-6" />
                        <h3 className="text-3xl font-black uppercase tracking-wider text-white mb-2">Welcome to FitZone!</h3>
                        <p className="text-gray-400 mb-10 max-w-md">Your registration is complete. Please show this card and pay at the front desk to activate your membership.</p>
                        
                        {/* Digital Membership Card */}
                        <div 
                          ref={cardRef}
                          className={`w-[450px] max-w-full aspect-[1.586] rounded-2xl p-6 relative flex flex-col justify-between border-2 shadow-2xl mb-8 group ${getCardTheme(selectedPlan).bg} ${getCardTheme(selectedPlan).border}`}
                        >
                          {/* Top Section */}
                          <div className={`flex items-center justify-center gap-3 ${getCardTheme(selectedPlan).primaryText}`}>
                            <Dumbbell className="h-5 w-5" />
                            <span className="text-[11px] font-bold tracking-[0.25em] uppercase">FITZONE</span>
                          </div>
                          
                          {/* Middle Section */}
                          <div className="text-center mt-3">
                            <p className={`text-[10px] tracking-widest uppercase mb-1 font-bold ${getCardTheme(selectedPlan).primaryText}`}>{userDetails.name || 'MEMBER NAME'}</p>
                            <h3 className={`text-3xl font-serif tracking-[0.15em] uppercase ${getCardTheme(selectedPlan).primaryText}`} style={{ fontFamily: 'Georgia, serif' }}>MEMBERSHIP CARD</h3>
                            <div className="flex items-center justify-center my-3 gap-3">
                               <div className={`h-[1px] w-12 ${getCardTheme(selectedPlan).border} opacity-50`}></div>
                               <span className={`text-[8px] tracking-[0.2em] uppercase ${getCardTheme(selectedPlan).text}`}>COMMIT TO YOUR FITNESS JOURNEY</span>
                               <div className={`h-[1px] w-12 ${getCardTheme(selectedPlan).border} opacity-50`}></div>
                            </div>
                          </div>
                          
                          {/* Details Grid */}
                          <div className="grid grid-cols-2 gap-x-12 gap-y-5 px-6 mt-2">
                            {/* Card Number */}
                            <div className={`border-b ${getCardTheme(selectedPlan).border} pb-1 flex flex-col items-center`}>
                               <span className={`text-[8px] tracking-widest uppercase mb-1 ${getCardTheme(selectedPlan).text}`}>Card Number</span>
                               <span className={`text-[10px] font-bold tracking-wider ${getCardTheme(selectedPlan).primaryText}`}>{memberId}</span>
                            </div>
                            {/* Membership Type */}
                            <div className={`border-b ${getCardTheme(selectedPlan).border} pb-1 flex flex-col items-center`}>
                               <span className={`text-[8px] tracking-widest uppercase mb-1 ${getCardTheme(selectedPlan).text}`}>Membership Type</span>
                               <span className={`text-[10px] font-bold tracking-wider ${getCardTheme(selectedPlan).primaryText}`}>{selectedPlan}</span>
                            </div>
                            {/* Valid From */}
                            <div className={`border-b ${getCardTheme(selectedPlan).border} pb-1 flex flex-col items-center`}>
                               <span className={`text-[8px] tracking-widest uppercase mb-1 ${getCardTheme(selectedPlan).text}`}>Valid From</span>
                               <span className={`text-[10px] font-bold tracking-wider ${getCardTheme(selectedPlan).primaryText}`}>{formatDate(startDate)}</span>
                            </div>
                            {/* Valid Until */}
                            <div className={`border-b ${getCardTheme(selectedPlan).border} pb-1 flex flex-col items-center`}>
                               <span className={`text-[8px] tracking-widest uppercase mb-1 ${getCardTheme(selectedPlan).text}`}>Valid Until</span>
                               <span className={`text-[10px] font-bold tracking-wider ${getCardTheme(selectedPlan).primaryText}`}>{formatDate(getExpiryDate(selectedPlan))}</span>
                            </div>
                          </div>
                          
                          {/* Footer */}
                          <div className={`flex items-center justify-center gap-2 mt-5 ${getCardTheme(selectedPlan).primaryText}`}>
                            <InstagramIcon className="h-4 w-4" />
                            <span className="text-[10px] tracking-widest uppercase font-bold">IMJESWAR</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm">
                          <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDownloadCard} 
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(255,69,0,0.3)] hover:bg-primary/90 transition-colors"
                          >
                            <Download className="h-4 w-4" /> Download Card
                          </motion.button>
                          <button 
                            onClick={() => { setSelectedPlan(null); setCheckoutStep('details'); setUserDetails({name:'', email:'', phone:''}) }} 
                            className="px-6 py-3 rounded-full border border-border text-gray-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-wider text-sm transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </motion.div>
                    )}
                    
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trainers Progress Section */}
      <section id="progress" className="py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-border/50"
            >
              <div className="absolute top-8 left-8 z-10 w-12 h-2 bg-primary rounded-full" />
              <Image src="/trainers.png" alt="Trainers" fill className="object-cover opacity-80" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-4">
                GET STRONGER AND FITTER WITH OUR<br />EXPERIENCED TRAINERS
              </h2>
              <p className="text-gray-400 mb-10 text-sm max-w-md">
                Build strength and confidence with support from our expert coaches, dedicated to your success.
              </p>
              
              <div className="space-y-6">
                {[
                  { label: 'Fitness Training', percent: 84 },
                  { label: 'Cardio Training', percent: 62 },
                  { label: 'Body Building', percent: 88 },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-xs font-bold uppercase text-white mb-2 tracking-wider">
                      <span>{stat.label}</span>
                      <span>{stat.percent}%</span>
                    </div>
                    <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-primary" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Comprehensive Footer & Contact */}
      <footer id="contact" className="border-t border-border/20 bg-card/80 backdrop-blur-md pt-16 pb-8 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Dumbbell className="h-8 w-8 text-primary" />
                <span className="text-2xl font-black tracking-widest text-white uppercase">FITZONE</span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-8">
                Join a community where goals are crushed, strength is built, and potential becomes power. Unleash your potential today.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#programs" className="hover:text-primary transition-colors">Programs</a></li>
                <li><a href="#schedule" className="hover:text-primary transition-colors">Schedule</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" /> <span>+91 79041 81537</span>
                  </a>
                </li>
                <li>
                  <a href={socialLinks.email} className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" /> <span>imjeswar@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <InstagramIcon className="h-4 w-4" /> <span>@imjeswar</span>
                  </a>
                </li>
                <li>
                  <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <FacebookIcon className="h-4 w-4" /> <span>imjeswar</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/20 pt-8 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
            <span>© 2026 FITZONE. UNLEASH YOUR POTENTIAL.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
