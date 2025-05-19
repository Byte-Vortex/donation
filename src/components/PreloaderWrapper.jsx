'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image';
import Logo from '@/assets/LOGO.gif';

export default function PreLoaderWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1900)

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <div className="fixed z-50 bg-black flex items-center justify-center min-h-screen w-screen">
                    <Image
                        src={Logo}
                        alt="Gupt Vrindavan Dham"
                        className="h-54 w-54 object-cover"
                        priority
                        unoptimized
                    />
                </div>
            ) : (
                    <motion.div
                        key="content"
                        className=" bg-background" // Ensure full coverage with black background
                        initial={{ opacity: 0, y: 20 }} // Start slightly below and transparent
                        animate={{ opacity: 1, y: 0 }} // Fade in and slide up
                        transition={{ duration: 0.4, ease: 'easeOut' }} // Smooth easing, no delay
                    >
                        {children}
                    </motion.div>
                )}
        </AnimatePresence>
    )
}