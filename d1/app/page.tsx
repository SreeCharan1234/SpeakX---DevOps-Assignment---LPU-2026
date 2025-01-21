'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Hero from '../components/Hero'
import Features from '../components/Features'
import DataVisualization from '../components/DataVisualization'
import EnhancedDarkChat from '../components/ChatDemo'
import CareerPathShowcase from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import BackgroundEffect from '../components/BackgroundEffect'
import SparkleEffect from '../components/SparkleEffect'
import CustomCursor from '../components/CustomCursor'
import CourseCatalog from '../components/CourseCatalog'
import SuccessStories from '../components/SuccessStories'
import CommunityForum from '../components/CommunityForum'
import CallToAction from '../components/CallToAction'
import LoadingTransition from '../components/LoadingTransition'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [showSparkles, setShowSparkles] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleClick = () => {
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 1000)
  }

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  if (loading) {
    return <LoadingTransition onComplete={handleLoadingComplete} />
  }

  return (
    <main 
      className="relative min-h-screen overflow-hidden"
      onClick={handleClick}
    >
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900" />
      {/* <CustomScrollbar /> */}
      <CustomCursor />
      <BackgroundEffect />
      {showSparkles && <SparkleEffect />}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />
      <div className="relative z-10">
        <Hero />
        <Features />
        <CourseCatalog />
        <DataVisualization />
        <EnhancedDarkChat />
        <SuccessStories />
        <CommunityForum />
        <CareerPathShowcase />
        <Pricing />
        <CallToAction />
        <Footer />
      </div>
    </main>
  )
}

