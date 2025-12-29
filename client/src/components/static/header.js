

'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button';

const Header = ({ isRegistered }) => {

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Sponsors', href: '/sponsors' },
    { name: 'Humans', href: '/humans' },
    { name: 'Rules & Rewards', href: '/rules-rewards' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* laptop view  */}

      <div className='absolute w-full top-4 max-md:hidden'>

        <div className='flex justify-around items-center'>

          <Link href="/">
            <img className='h-12' src="/MatrixLogo.svg" />
          </Link>

          <div className='flex justify-between w-[50%]'>
            {navItems.map((item) => <Link href={item.href} key={item.name}>{item.name}</Link>)}
          </div>

          <Link href={isRegistered ? "/dashboard/me" : "/auth/register"}>
            <Button>{isRegistered ? "Dashboard" : "Register"}</Button>
          </Link>

        </div>
      </div>

      {/* phone view  */}

      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#060A17] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">

              <img className='h-8' src="/MatrixLogo.svg" />
            </div>

            {/* Hamburger Button - Visible only on mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#070C1B] border-t border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {[
                  ...navItems,
                  { name: isRegistered ? "Dashboard" : "Register", href: isRegistered ? "/dashboard/me" : "/auth/register" }
                ].map((item, index) => (
                  <Link href={item.href} key={item.name}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block px-4 py-2 text-white hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>



    </div>
  )
}

export default Header

