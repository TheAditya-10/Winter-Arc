
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FaqBox = ({ no, question, answer, isOpen, onToggle }) => {
    //   return (
    //     <div className='py-10 px-20 rounded-2xl bg-[#F3F3F3] w-[80%] mx-auto'>

    //         <p>01</p>
    //         <p> What is Winter Arc?</p>

    //     </div>
    //   )





    return (
        <motion.div
            layout
            className="bg-[#F3F3F3] rounded-3xl shadow-md mb-4 overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.button
                layout="position"
                onClick={onToggle}
                className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
                <motion.span layout="position" className="font-semibold text-gray-800 text-lg pr-4 font-space-grotesk">
                    <div className='flex items-center'>

                        <p className='text-4xl mr-3'>
                            {no}
                        </p>
                        {question}

                    </div>
                </motion.span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 font-inter"
                >
                    {isOpen ? (
                        <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    )}
                </motion.div>
            </motion.button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="px-6 pb-4 pt-2 text-gray-600 leading-relaxed"
                        >
                            {answer}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default FaqBox