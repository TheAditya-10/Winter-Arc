

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
      question: "What is Winter-Arc?",
      answer: "Winter-Arc is a 30-day gamified skill-development event by Matrix where students complete daily and weekly challenges, earn XP, maintain streaks, and get rewarded while building real skills."
    },
    {
      no: "02",
      question: "Who can participate in Winter-Arc?",
      answer: "Winter-Arc is open to all college-going students who want to learn new skills, stay consistent, and earn rewards. There are no restrictions based on branch or year."
    },
    {
      no: "03",
      question: "Is it mandatory to post task completion on LinkedIn or X?",
      answer: "Yes. Posting task completion on LinkedIn or X (Twitter) by tagging Matrix and using official hashtags (e.g., #WinterArcMatrix) is mandatory to be eligible for rewards."
    },
    {
      no: "04",
      question: "What happens if I don't post on LinkedIn or X?",
      answer: "If a participant does not post task completion updates: XP may still be earned, but they will NOT be eligible for prizes or rewards."
    },
    {
      no: "05",
      question: "How many challenges can I enroll in?",
      answer: "There is no maximum limit on Daily Challenge enrollment. However, participants are encouraged to master at least one skill during Winter-Arc."
    },
    {
      no: "06",
      question: "What are Daily Challenges?",
      answer: "Daily Challenges consist of: 6 skill categories, 30 tasks per category, each task carries up to 50 XP. XP from Daily Challenges contributes to the Global Leaderboard."
    },
    {
      no: "07",
      question: "What are Weekly Fireplace Challenges?",
      answer: "Weekly Fireplace Challenges go live every Sunday, have a separate leaderboard, offer rewards like gadgets and accessories, and do not affect the Global Leaderboard."
    },
    {
      no: "08",
      question: "Do Weekly Challenges require separate registration?",
      answer: "Yes. To participate in Weekly Challenges, participants must first complete the required Power-Up task to unlock eligibility."
    },
    {
      no: "09",
      question: "What are Power-Ups?",
      answer: "Power-Ups are non-skill-based mini tasks that unlock special benefits such as: Streak Freeze, Access to Weekly Challenges, and other in-event advantages. Power-Ups do not directly provide XP."
    },
    {
      no: "10",
      question: "What happens if I miss a day?",
      answer: "If you miss completing a Daily task on any day: Your streak will break, 50 XP will be deducted (no XP is deducted if your score is already zero). You can restart your streak any day during the event."
    },
    {
      no: "11",
      question: "Are there bonus points for consistency?",
      answer: "Yes. Bonus XP is awarded for completing milestones in any Daily Challenge: 10 days → +150 XP, 20 days → +300 XP, 30 days → +500 XP."
    },
    {
      no: "12",
      question: "How are task submissions verified?",
      answer: "Task submissions are verified using a multimodal AI system, supported by manual review when needed. Low-effort, fake, or copied submissions may be rejected."
    },
    {
      no: "13",
      question: "What happens if someone uses fake accounts or spams?",
      answer: "Any participant found creating fake accounts, spamming submissions, or manipulating XP or leaderboards will be permanently banned from the platform."
    },
    {
      no: "14",
      question: "What rewards can I win?",
      answer: "Rewards include: Cash prizes for Global Leaderboard winners, Gadgets & merchandise for Weekly Challenge winners, and Skill certificates & digital badges. Reward details may vary and will be finalized before the event starts."
    },
    {
      no: "15",
      question: "Can rules or rewards change during the event?",
      answer: "Yes. Matrix reserves the right to: Modify rules, Adjust XP logic, and Update rewards. All changes will be communicated through the platform, and Matrix's decision will be final."
    }
  ];

  return (
    <div>
      <div className='flex flex-col items-center'>
        <p className='mt-35 text-[#8ACADE] text-6xl font-bold max-md:text-4xl'>GOT QUESTIONS?</p>
        <p className='mt-8 font-semibold text-xl w-[80%] max-md:w-[70%] text-center max-md:text-sm'>We&#39;ve answered the most common queries about the event—rules, registration, participation, and more. If you&#39;re still unsure, we&#39;ve got your back!</p>
      </div>

      <div className='w-[80%] mx-auto flex justify-between items-center mt-20 max-md:flex-col'>

        <div className=''>

          <p className=' text-left text-6xl font-bold'>FAQs</p>

          <div className='flex flex-col items-start'>
            <p className='mt-8'>Got questions about the event ?</p>
            <p className=' '>We&#39;ve got all the info you need to get started</p>
          </div>
          <div className='flex flex-col items-start'>
            <p className='mt-4'>Still curious?</p>
            <p className=' '>Ping us anytime at team.matrix.jec@gmail.com</p>
            <p className=' '>— we&#39;re all ears (and keyboards)! 👨‍💻👩‍💻</p>
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