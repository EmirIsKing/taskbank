import React from 'react'
import Image from 'next/image'
import { Poppins, Rethink_Sans } from 'next/font/google'
import LandingSignUp from '@/components/LandingSignUp';
import EarnCards from '@/components/EarnCards';
import HookCards from '@/components/HookCards';
import FooterLogo from '@/components/FooterLogo';

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

const rethinkSans = Rethink_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"]
});


const Landing = () => {
  return (
    <div className={`w-full justify-center ${poppins.className}`}>
      <section>
        <div className="relative w-full h-[320px] overflow-hidden">
          <div className="absolute inset-0 transform -rotate-6 bg-cover bg-center bg-[url('/images/hero-shadow.webp')]">
          </div>
          <div className="relative inset-0 flex items-center justify-center w-full h-full bg-gradient-to-b from-base-1/85 to-base-4">
          </div>
        </div>
        <div className="absolute top-0 gap-3 h-[320px] max-md:h-[200px] max-md:gap-1 w-full">
          <div className='pt-24 w-full h-full flex-col items-center justify-center'>
            <div className="text-white mb-9 text-[3.2rem] font-bold text-center leading-snug max-md:text-2xl max-md:mb-4">
              <span className='text-base-2'>Get paid </span>for testing apps,<br/>games & surveys
            </div>
            <div className='text-blue-100 text-lg opacity-95 font-medium text-center max-md:text-sm'>Earn up to <span className='font-bold text-white'>$10.00</span> per offer</div>
          </div>          
        </div>
        <div className='gap-[120px] max-md:w-screen max-md:relative top-[-90px] flex mt-7 items-center max-lg:gap-[60px] justify-center max-lg:flex-col max-md:justify-normal'>
          <div className='block w-[530] h-full z-0'>
            <div className='flex w-[530px] gap-7 max-md:gap-2 h-[244.67px] max-md:h-[173px] max-md:w-full items-center justify-center'>
              <div className='flex-col p-4 max-md:p-2 w-[150.17px] max-md:w-[108px] max-md:h-[173px] max-lg:w-[170px] rounded-xl bg-base-3 items-center justify-center max-md:text-xs'>
                <div className='flex w-full justify-center items-center '>
                  <Image alt='netflix' src={'/images/netflix.webp'} width={128.03} height={128.03} className='rounded-md max-md:w-[90px] max-md:h-[90px]'/>
                </div>
                <p className='pt-1 w-full text-xs font-bold text-white'>Netflix</p>
                <p className={`${poppins.className} mt-1 text-xs font-light text-blue-200 opacity-85 w-full max-md:whitespace-nowrap max-md:overflow-hidden`}>Start a trial month</p>
                <div className='w-full mt-1 flex justify-between'>
                  <div className='flex justify-center items-center'>
                    <div className={`font-bold ${poppins.className} text-white`}>$5</div>
                    <div className={`${poppins.className} text-white font-bold text-xs`}>.00</div>
                  </div>
                  <div className='flex justify-center items-center gap-1 max-md:hidden'>
                    <Image src={'/images/star.svg'} height={6} width={6} alt='star'/>
                    <p className='text-[10px] text-white'>5.00</p>
                  </div>
                </div>
              </div>
              <div className='max-md:w-[108px] max-md:h-[173px] max-md:p-2 p-4 flex-col h-full max-lg:w-[200px] w-[176.67px] bg-base-3 rounded-xl max-md:text-xs'>
                <div className='flex-col w-full justify-center items-center'>
                  <Image alt='free' src={'/images/freebuild.webp'} width={144.67} height={144.67} className='rounded-md max-md:w-[90px] max-md:h-[90px]'/>
                  <p className='pt-1 w-full text-xs font-bold text-white'>Dice Dreams</p>
                  <p className={`${poppins.className} mt-1 text-xs font-light text-blue-200 opacity-85`}>Reach level 10</p>
                  <div className='w-full mt-1 flex justify-between'>
                  <div className='flex justify-center items-center'>
                    <div className={`font-bold ${poppins.className} text-white`}>$100</div>
                    <div className={`${poppins.className} text-white font-bold text-xs`}>.00</div>
                  </div>
                  <div className='flex justify-center items-center gap-1 max-md:hidden'>
                    <Image src={'/images/star.svg'} height={6} width={6} alt='star'/>
                    <p className='text-[10px] text-white'>5.00</p>
                  </div>
                </div>
                </div>
              </div>
              <div className='max-md:w-[108px] max-md:h-[173px] max-md:p-2 p-4 flex-col max-lg:w-[170px] w-[150.17px] bg-base-3 rounded-xl max-md:text-xs'>
                <div className='flex-col w-full justify-center items-center'>
                  <Image alt='tiktok' src={'/images/tiktok.webp'} width={122.97} height={122.97} className='rounded-md max-md:w-[90px] max-md:h-[90px]'/>
                  <p className='pt-1 w-full text-xs font-bold text-white'>Tiktock</p>
                  <p className={`${poppins.className} mt-1 text-xs font-light text-blue-200 opacity-85`}>Sign up</p>
                  <div className='w-full mt-1 flex justify-between'>
                    <div className='flex justify-center items-center'>
                      <div className={`font-bold ${poppins.className} text-white`}>$2</div>
                      <div className={`${poppins.className} text-white font-bold text-xs`}>.00</div>
                    </div>
                    <div className='flex justify-center items-center gap-1 max-md:hidden'>
                      <Image src={'/images/star.svg'} height={6} width={6} alt='star'/>
                      <p className='text-[10px] text-white'>5.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[427px] max-lg:w-[500px] h-full max-md:w-auto'>
            <LandingSignUp/>
          </div>
        </div>
        <div className='w-full h-auto p-5 flex flex-grow mt-16 px-32 max-md:px-6 max-md:relative max-md:top-[-70px]'>
          <div className='w-full h-auto bg-[#201c2c] py-[48px] rounded-lg max-md:gap-3 flex max-md:flex-col'>
            <div className='w-full text-center justify-center items-center flex flex-col px-[32px]'>
              <span className={`flex gap-2 font-extrabold font-mono ${rethinkSans.className} text-4xl text-white mb-2`}>
                <Image src={'/images/rocket.svg'} width={28} height={28} alt='rocket'/>
                17m 12s</span>
              <p className={`text-blue-200 opacity-75 ${rethinkSans.className} font-semibold text-center`}>
                Average time until user makes first cashout</p>
            </div>
            <div className='h-auto opacity-70 w-[2px] bg-gray-500 max-md:h-[2px] max-md:w-full'></div>
            <div className='w-full text-center flex flex-col px-[32px] justify-center items-center'>
              <span className={`flex gap-4 font-extrabold ${rethinkSans.className} font-mono text-4xl text-white mb-2`}>
                <Image src={'/images/fire.svg'} width={28} height={28} alt='fire'/>
                $34.66</span>
              <p className={`text-blue-200 ${rethinkSans.className} opacity-75 font-semibold text-center`}>
                Average money earned by users yesterday</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-[358px_600px] max-md:grid-cols-1 mx-[133px] px-4 max-md:mx-4 max-md:mt-2 mt-9 max-md:flex-col gap-24 max-md:gap-6'>
            <div className='w-full sticky top-20 self-start max-md:px-4 max-md:static'>
              <h2 className={`${poppins.className} text-white text-3xl text-left font-bold max-md:text-[25px] max-md:leading-7`}>Want to earn free 
                <br/>cash within minutes?
              <span className='text-base-2'>
              Here’s how  
              </span></h2>
              <div className='mt-14 max-md:hidden'>
                <a href='#' className={`${poppins.className} mt-1 w-full px-11 hover:bg-green-500 active:opacity-55 transition-all py-3 h-14 text-xl rounded-lg bg-base-2 text-black font-semibold`}>
                    Start earning now
                </a>
              </div>           
            </div>
          <div className='flex w-full h-full flex-col gap-12 text-white'>
            <div className='flex flex-col gap-2 w-full h-full'>
              <div className='font-bold text-xl flex gap-4'>
                <Image src={'/images/cao.svg'} width={28} height={28} alt='cao'/>
                1. Choose an offer</div>
              <p className='text-blue-200 opacity-85'>Take your pick from the tasks on the earn page.
              We list the best offers from companies who want to advertise their apps, surveys, and products.
              </p>
              <div className='w-full border-base-3 border-[2px] bg-[url("/images/offers.webp")] bg-cover rounded-lg h-[350px]'>
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full h-full'>
              <div className='font-bold text-xl flex gap-4'>
                <Image src={'/images/cto.svg'} width={28} height={28} alt='cto'/>
                2. Complete the offer</div>
              <p className='text-blue-200 opacity-85'>Most offers are very simple and have already earned money for 
                thousands of people. Most offers take around 5-10 minutes to complete.
              </p>
              <div className='w-full border-base-3 border-[2px] rounded-lg h-[310px] relative justify-center items-center'>
                <div className='absolute w-full inset-0 bg-gradient-to-br from-green-500 via-blue-900 to-green-500 blur-sm h-full opacity-25 justify-center items-center'>
                </div>
                <div className='relative flex flex-col justify-center items-center w-full h-full '>
                  <Image alt='dream' src={'/images/dice-dreams-home-mobile.webp'} width={120} height={120}/>
                  <div className='max-w-48 h-8 bg-base-3 rounded justify-center items-centerp-[8px]'>
                    <div className='text-base-2 text-xs bg-base-2 bg-opacity-25'>$ 5.00</div>
                  </div>
                </div>

              </div>
            </div>
            <div className='flex flex-col gap-2 w-full h-full'>
              <div className='font-bold text-xl flex gap-4'>
                <Image src={'/images/gp.svg'} width={28} height={28} alt='get-paid'/>
                3. Get paid</div>
              <p className='text-blue-200 opacity-85'>For each task you complete, you’ll be rewarded with coins: 1000 coins = 
                $1,00. Cashout the coins and get your hands on your free cash!
              </p>
              <div className='w-full border-base-3 border-[2px] bg-[url("/images/payment4.webp")] bg-center bg-no-repeat rounded-lg h-[310px] max-md:bg-center'>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-20 flex flex-col max-md:mt-7'>
          <div className='w-full flex justify-center items-center'><span className='font-bold text-2xl w-full text-center text-white'>Best ways to earn</span></div>
          <div className='w-full flex justify-between gap-8 px-20 mt-5 max-md:flex-col max-md:gap-4 max-md:px-5'>
            <EarnCards 
            title={`Play Games`} 
            desc={`In order to attract more players, gaming companies want to pay you to play their games. Let’s play!`}
            mode={`Earn Per Game`}
            epgmin={`0.50`}
            epgmax={`120`}
            imgback={`/images/lite-game-bg.webp`}
            img1={`lite-rok-icon.webp`}
            img2={`lite-clash-of-clans-icon.webp`}
            img3={`lite-clash-of-clans-character.webp`}
            w={32}
            h={32}
            />
            <EarnCards 
            title={`Complete offers`} 
            desc={`Get to know new companies by trying their apps while you earn money. It’s time to get paid for using apps!`}
            mode={`Earn per app`}
            epgmin={`1.00`}
            epgmax={`75`}
            imgback={`/images/lite-apps-bg-2.webp`}
            img1={`lite-stash-icon.webp`}
            img3={`lite-feather-icon.webp`}
            w={12}
            h={12}/>
            <EarnCards 
            title={`Join surveys`} 
            desc={`Companies need your opinion to create better products and services. That’s why they pay for your feedback.`}
            mode={`Earn per 5-10 min survey`}
            epgmin={`0.50`}
            epgmax={`1.00`}
            imgback={`/images/lite-withdraw-bg.webp`}
            img1={`lite-app-1.webp`}
            img3={`lite-app-2.webp`}
            w={12}
            h={12}/>
          </div>
        </div>
        <div className="mt-16 text-white">
          <div className="w-full text-3xl text-center font-bold"><span>We&apos;re the #1 site to make money. <span className="text-base-2">Here&apos;s why</span></span></div>
          <div className='flex mt-5 gap-8 px-36 justify-center items-center max-md:flex-col max-md:px-4'>
            <div>
              <HookCards
               img={'/images/highestpayout.svg'}
               title={'Highest Payout'}
               desc={`Earn way more than on other sites. It' s our goal to help you make as much money as possible.`}
               alt={'highesy-payout'}/>
            </div>
            <div>
              <HookCards
              img={'/images/instantcashout.svg'}
              title={'Instant Cashouts'}
              desc={'Need your earnings now? No problem. You can withdraw them almost instantly starting at $5,00 and 5 referrals.'}
              alt={'instant-cashout'}/>
            </div>
            <div> <HookCards
              img={'/images/dailybonus.svg'}
              title={'Daily Bonuses'}
              desc={'Climb the daily bonus ladder, reach the leaderboard, or start a streak to earn extra rewards, for free.'}
              alt={'daily-bonus'}/>
           </div>
          </div>
        </div>
      </section>
      <footer className='w-full bg-base-1 py-14 mt-12'>
        <div className='w-full px-20 max-md:px-0 flex max-md:flex-col max-md:gap-7 text-blue-200 justify-between opacity-85'>
          <div className='flex flex-col text-blue-200 opacity-85 w-full text-center'>
            <FooterLogo/>
            <p className='text-sm'>© 2020 - 2024 Freecash. All rights reserved.</p>
          </div>
          <div className='w-full flex max-md:flex max-md:gap-9 gap-11 justify-center items-center'>
            <div className='flex flex-col gap-2'>
              <p className='font-bold text-xl text-slate-200'>About</p>
              <div className='flex flex-col gap-1 text-base max-md:text-xs'>
                <a href="/terms-of-service">Terms of Service</a>
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/cookie-policy">Cookie Policy</a>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
            <p className='font-bold text-xl text-slate-200'>Support</p>
              <div className='flex flex-col gap-1 text-base max-md:text-xs'>
                <a href="/how-it-works">How does TaskBank work?</a>
                <a href="/support">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing