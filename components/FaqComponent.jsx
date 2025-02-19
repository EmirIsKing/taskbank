"use client"
import React, { useState } from 'react'
import PlusSvg from '@/public/images/plus.svg'
import { cn } from '@/lib/utils'

const FaqComponent = ({ title, content, id="faq" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id={id} className="flex text-white w-full h-full justify-center items-center">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex flex-col transition-all duration-300 w-[600px] border-white border hover:cursor-pointer rounded-md items-center justify-center bg-background"
      >
        {/* Header */}
        <div className="flex w-full justify-between p-3 px-5">
          <h2 className="font-semibold block">{title}</h2>
          <PlusSvg 
            className={cn('font-bold text-3xl transition-transform duration-300', {
              '-rotate-45': isOpen
            })}
          />
        </div>

        {/* Collapsible Content */}
        <div className={cn("transition-all duration-300 overflow-hidden text-start items-start justify-start w-full", {
          "max-h-0": !isOpen,
          "max-h-[500px]": isOpen // Adjust max height based on content
        })}>
          <p className="text-blue-50 opacity-90 p-4 leading-none text-start w-full">
  {content.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ))}
</p>
        </div>
      </div>
    </div>
  );
}

export default FaqComponent;
