import { Users, Star, Quote, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Computer Science Student",
    university: "MIT",
    image: "/avatars/avatar1.png",
    quote: "GoalStack helped me save enough for my new laptop in just 4 months. The visual tracking kept me motivated and I loved seeing my progress each day. The achievement system makes it feel like a game!",
    stars: 5
  },
  {
    id: 2,
    name: "Mia Williams",
    role: "Business Major",
    university: "NYU",
    image: "/avatars/avatar2.png",
    quote: "The achievement system makes saving fun! I've been consistently putting money away for 3 months straight, which I've never done before. The streak feature keeps me wanting to log in daily.",
    stars: 5
  },
  {
    id: 3,
    name: "David Chen",
    role: "Engineering Student",
    university: "Stanford",
    image: "/avatars/avatar3.png",
    quote: "Being able to visualize my progress makes all the difference. I've saved more in the last 6 months than ever before. The monthly reports help me understand where my money goes.",
    stars: 4
  },
  {
    id: 4,
    name: "Sophie Rodriguez",
    role: "Medical Student",
    university: "Johns Hopkins",
    image: "/avatars/avatar4.png",
    quote: "As a med student with limited time, I needed something simple but effective. GoalStack's interface is intuitive and the automated savings features help me stay on track without constant attention.",
    stars: 5
  },
  {
    id: 5,
    name: "Michael Taylor",
    role: "Art & Design Student",
    university: "RISD",
    image: "/avatars/avatar5.png",
    quote: "The customizable goal visuals make saving for my art supplies more engaging. I can match the theme to my project and the progress bars give me a clear picture of when I can afford new equipment.",
    stars: 5
  },
  {
    id: 6,
    name: "Aisha Patel",
    role: "Law Student",
    university: "Harvard",
    image: "/avatars/avatar6.png",
    quote: "The emergency fund feature saved me during an unexpected expense. The app helped me build a safety net while still working toward my main savings goals. Great prioritization options!",
    stars: 4
  }
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-primary/10 rounded-full blur-3xl transform translate-x-1/2"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              What Our <span className="text-primary">Users</span> Say
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of students who are achieving their financial goals and transforming their relationship with money.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-text/5">
        <div className="container mx-auto px-6">
          <motion.div 
            className="card p-8 md:p-12 border border-primary/20 max-w-4xl mx-auto relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 opacity-10 text-9xl text-primary">
              <Quote />
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <motion.div 
                className="relative"
                whileHover={{ 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary relative">
                  <Image 
                    src="/avatars/featured.png" 
                    alt="Featured Testimonial" 
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-accent text-background rounded-full p-2">
                  <Star size={16} fill="currentColor" />
                </div>
              </motion.div>
              
              <div>
                <p className="text-xl md:text-2xl italic mb-6">
                  &quot;GoalStack completely changed my financial habits. I&rsquo;m graduating debt-free because I started using this app in my freshman year. The visualization tools and achievement system made saving feel rewarding rather than restrictive.&quot;
                </p>
                <div className="flex items-center">
                  <div>
                    <h3 className="font-bold text-lg">Jamie Sanchez</h3>
                    <p className="text-sm opacity-70">Economics Graduate, UC Berkeley</p>
                  </div>
                </div>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="var(--primary)" color="var(--primary)" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Success Stories from Students</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className="card p-6 border border-text/10 h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="mb-4 text-primary">
                  <Quote size={24} />
                </div>
                <p className="italic flex-grow mb-6">{testimonial.quote}</p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm opacity-70">{testimonial.role}, {testimonial.university}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          fill={i < testimonial.stars ? "var(--primary)" : "transparent"} 
                          color="var(--primary)"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 bg-text/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Video Testimonials</h2>
          <p className="text-center opacity-70 mb-12 max-w-2xl mx-auto">
            Watch how students are transforming their financial futures with GoalStack
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((video) => (
              <motion.div 
                key={video}
                className="card p-4 border border-text/10"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-video bg-text/10 rounded-lg relative overflow-hidden mb-4">
                  <Image 
                    src={`/videos/thumbnail${video}.png`} 
                    alt={`Video thumbnail ${video}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-background ml-1"></div>
                    </motion.div>
                  </div>
                </div>
                <h3 className="font-medium">My Savings Journey With GoalStack</h3>
                <p className="text-sm opacity-70">Student: Taylor Martinez</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Savings?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto opacity-80">
              Join over 50,000 students who are building better financial habits and achieving their goals.
            </p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2 text-lg px-6 py-3">
              Get Started Now <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}