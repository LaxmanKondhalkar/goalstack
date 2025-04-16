'use client';

import { Star, Quote, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import AppLayout from '../components/AppLayout';
import { mockTestimonials } from '../data/mockData';

export default function TestimonialsPage() {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[var(--accent-300)] rounded-full blur-3xl transform -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[var(--primary-300)] rounded-full blur-3xl transform translate-x-1/2"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              What Our <span className="text-[var(--primary)]">Users</span> Say
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
      <section className="py-16 bg-[var(--background-100)]">
        <div className="container mx-auto px-6">
          <motion.div 
            className="card-elevated p-8 md:p-12 border border-[var(--primary-300)] max-w-4xl mx-auto relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 opacity-10 text-9xl text-[var(--primary)]">
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
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[var(--primary)] relative">
                  <Image 
                    src="/avatars/featured.png" 
                    alt="Featured Testimonial" 
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[var(--accent)] text-[var(--background-50)] rounded-full p-2">
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
          <h2 className="text-3xl font-bold mb-12 text-center">Success Stories from <span className="text-[var(--primary)]">Students</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className={`${index % 2 === 0 ? 'card-elevated' : 'card-bordered'} h-full flex flex-col`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="mb-4 text-[var(--primary-400)]">
                  <Quote size={24} />
                </div>
                <p className="italic flex-grow mb-6">{testimonial.text}</p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-[var(--primary-300)]">
                    <Image 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-16 bg-[var(--background-100)]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Video <span className="text-[var(--accent)]">Testimonials</span></h2>
          <p className="text-center opacity-70 mb-12 max-w-2xl mx-auto">
            Watch how students are transforming their financial futures with GoalStack
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((video) => (
              <motion.div 
                key={video}
                className="card p-4 border-2 border-[var(--secondary-300)] bg-gradient-to-br from-[var(--background-50)] to-[var(--background-100)]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-video bg-[var(--background-200)] rounded-lg relative overflow-hidden mb-4">
                  <Image 
                    src={`/videos/thumbnail${video}.png`} 
                    alt={`Video thumbnail ${video}`}
                    width={1280}
                    height={720}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-[var(--background-50)] ml-1"></div>
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
            className="card-elevated bg-gradient-to-r from-[var(--primary-200)] to-[var(--accent-200)] rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto border-2 border-[var(--primary-300)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-900)]">Ready to Transform Your Savings?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto text-[var(--text-800)]">
              Join over 50,000 students who are building better financial habits and achieving their goals.
            </p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2 text-lg px-6 py-3 border-2 border-[var(--background-50)] shadow-lg hover:shadow-xl">
              Get Started Now <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </AppLayout>
  );
}