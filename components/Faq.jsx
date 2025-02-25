'use client'
import React, { useState } from 'react'
import faq from '@/constants/faq'
import FaqComponent from '@/components/FaqComponent'

const Faq = () => {

    const [faqElements, setFaqElements] = useState(faq);

  return (
    <>
     <div className='flex flex-col mt-7 text-white w-full h-full justify-center items-center gap-3'>
      {faqElements.map((answer, index) => (
        <FaqComponent key={index} title={answer.title} content={answer.content} id={answer.id}/>
      ))}
    </div>
   </>
  )
}

export default Faq