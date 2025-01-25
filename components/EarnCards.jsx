'use client';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const EarnCards = ({ title, desc, epgmin, epgmax, imgback, mode, img1, img2, img3, w, h }) => {
  const [img1Checker, setImg1Checker] = useState(true);
  const [img2Checker, setImg2Checker] = useState(true);
  const [img3Checker, setImg3Checker] = useState(true);

  useEffect(() => {
    setImg1Checker(!img1);
    setImg2Checker(!img2);
    setImg3Checker(!img3);
  }, [img1, img2, img3]);

  return (
    <div className='bg-base-3 text-white gap-4 pt-4 flex flex-col justify-center items-center rounded-xl max-md:text-xs'>
      <span className='text-xl text-white font-bold max-md:text-base'>{title}</span>
      <p className='text-center text-blue-200 opacity-85 text-sm px-3 max-md:text-xs'>{desc}</p>
      <div className='flex flex-col w-full justify-center items-center gap-2 mt-3'>
        <span className='text-blue-200 opacity-85 text-sm'>{mode}</span>
        <span className='font-bold text-2xl'>${epgmin} - ${epgmax}</span>
      </div>
      <div className={`relative bg-cover w-2/3 h-44`}
      style={{ backgroundImage: `url("${imgback}")` }}>
        {!img1Checker && (
          <div className="animate-float left-[-10px] absolute top-4 w-12 h-12 bg-cover max-md:w-12" 
               style={{ backgroundImage: `url("/images/${img1}")` }}></div>
        )}
        {!img2Checker && (
          <div className="animate-float left-1 absolute top-20 w-12 h-12 bg-cover max-md:w-12" 
               style={{ backgroundImage: `url("/images/${img2}")` }}></div>
        )}
        {!img3Checker && (
          <div className={`animate-float right-5 absolute top-10 w-${w} h-${h} bg-cover max-md:w-12`} 
               style={{ backgroundImage: `url("/images/${img3}")` }}></div>
        )}
      </div>
    </div>
  );
};

export default EarnCards;
