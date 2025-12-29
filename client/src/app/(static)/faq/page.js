

'use client';
import FaqBox from '@/components/static/FaqBox'
import React, { useState } from 'react';


const Faq = () => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      no: "01",
      question: "What is React?",
      answer: "React is a popular JavaScript library for building user interfaces, particularly single-page applications. It allows developers to create reusable UI components and manage application state efficiently."
    },
    {
      no: "02",
      question: "What is Framer Motion?",
      answer: "Framer Motion is a production-ready motion library for React. It provides a simple and powerful API for creating animations and gestures in your React applications with minimal code."
    },
    {
      no: "03",
      question: "How do I install these libraries?",
      answer: "You can install React and Framer Motion using npm or yarn. Run 'npm install react react-dom framer-motion' or 'yarn add react react-dom framer-motion' in your project directory."
    },
    {
      no: "04",
      question: "Can I customize the styling?",
      answer: "Absolutely! This component uses Tailwind CSS classes which you can easily modify. You can change colors, spacing, borders, and any other styling properties to match your design system."
    },
    {
      no: "05",
      question: "Can I customize the styling?",
      answer: "Absolutely! This component uses Tailwind CSS classes which you can easily modify. You can change colors, spacing, borders, and any other styling properties to match your design system."
    },
    {
      no: "06",
      question: "Can I customize the styling?",
      answer: "Absolutely! This component uses Tailwind CSS classes which you can easily modify. You can change colors, spacing, borders, and any other styling properties to match your design system."
    },
    {
      no: "07",
      question: "Can I customize the styling?",
      answer: "Absolutely! This component uses Tailwind CSS classes which you can easily modify. You can change colors, spacing, borders, and any other styling properties to match your design system."
    },
    {
      no: "08",
      question: "Can I customize the styling?",
      answer: "Absolutely! This component uses Tailwind CSS classes which you can easily modify. You can change colors, spacing, borders, and any other styling properties to match your design system."
    },
    {
      no: "09",
      question: "Is this component accessible?",
      answer: "This component uses semantic HTML with button elements for interactive areas. For full accessibility, you could add ARIA attributes like aria-expanded and aria-controls to improve screen reader support."
    }
  ];

  return (
    <div>
      <div className='flex flex-col items-center'>
        <p className='mt-35 text-[#8ACADE] text-6xl font-bold max-md:text-4xl'>GOT QUESTIONS?</p>
        <p className='mt-8 font-semibold text-xl w-[80%] max-md:w-[70%] text-center max-md:text-sm'>We&#39;ve answered the most common queries about the event—rules, registration, participation, and more. If you're still unsure, we’ve got your back!</p>
      </div>

      <div className='w-[80%] mx-auto flex justify-between items-center mt-20 max-md:flex-col'>

        <div className=''>

          <p className=' text-left text-6xl font-bold'>FAQs</p>

          <div className='flex flex-col items-start'>
            <p className='mt-8'>Got questions about the event ?</p>
            <p className=' '>We’ve got all the info you need to get started</p>
          </div>
          <div className='flex flex-col items-start'>
            <p className='mt-4'>Still curious?</p>
            <p className=' '>Ping us anytime at team.matrix.jec@gmail.com</p>
            <p className=' '>— we’re all ears (and keyboards)! 👨‍💻👩‍💻</p>
          </div>

        </div>

        <div className='max-md:mt-8'>
          <img src="/faq_hero_sec_illustration.svg" />
        </div>

      </div>

      {/* FAQ boxes  */}


      <div className='w-[80%] mx-auto mt-20'>
        {faqs.map((faq, index) => (
          <FaqBox
            key={index}
            no={faq.no}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => toggleFAQ(index)}
          />
        ))}
      </div>


    </div>
  )
}

export default Faq