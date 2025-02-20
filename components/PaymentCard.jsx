'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ProgressBar from '@/components/ProgressBar'
import UserSvg from "../public/images/users.svg"
import CloseSvg from '@/public/images/close.svg'
import getDetails from '@/utils/actions/getDetails'
import { useAuth } from '@clerk/nextjs'
import { useToast } from "@/hooks/use-toast"

const PaymentCard = ({ img, className, name, nameAdd, max, min}) => {
	const { toast } = useToast();


	  const { userId } = useAuth();
	  const [data, setData] = useState(null);
	  
	
	  useEffect(() => {
		const unsubscribe = getDetails(userId, (data) => {
		  if (data) { 
			setData(data);
		  } else {
			console.log("No data or error occurred");
		  }
		});
	
		return () => {
		  if (unsubscribe) {
			unsubscribe();
		  }
		};
	  }, [userId])
	  


const [openForm, setOpenForm] = useState(false);
const [value, setValue] = useState("3");
const handleScroll = (e) => {
	e.preventDefault(); // Prevents the page from scrolling
	setValue((prev) => Math.max(Number(e.target.value), Number(prev) + (e.deltaY < 0 ? 1 : -1))); // Increase on scroll up, decrease on scroll down
};

const handleChange = (e) => {
	const newValue = e.target.value;
	setValue(newValue === "" ? "" : newValue);
};

const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default first
	console.log('submit check1')

    // Ensure data values are not undefined
    const barValue = Number(
        (data?.referralCount || 0) + 
        (data?.referralEarnings || 0) + 
        ((data?.reward || 0) / 1000)
    );
	console.log('submit check2')

    // Check eligibility
    if (barValue !== 6) {
		console.log('submit check2.5')
	
        toast({
			variant: "destructive",
            title: "Not eligible for withdrawal",
            description: "You must complete the required actions before you can withdraw.",
        });
	console.log('submit check2.6')

        return;
    }
	console.log('submit check3')

    // Process form data
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());

	handleUpdateWithdrawal("Pending", formDataObject.Address, Number(formDataObject.Amount), name);

	console.log('submit check4')

    
    console.log("Submitted Data:", { ...formDataObject, name });

    setOpenForm(false);
    setValue(0);
};

const handleUpdateWithdrawal = async ( newStatus, address, amount, method ) => {
	const userid = userId;
	try {
	  const response = await fetch("/api/webhooks/withdrawal", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ newStatus, address, amount, method, userid }),
	  });
  
	  const data = await response.json();
	  if (!response.ok) throw new Error(data.error || "Something went wrong - withdrawal");
  
	  console.log("Withdrawal requested successfully:", data);
	  toast({
		title: "Success",
		description: "Withdrawal requested!",
	  });
	} catch (error) {
	  console.error("request failed:", error);
	  toast({
		title: "Error",
		description: error.message || "Failed to request withdrawal. Try again later or contact support.",
	  });
	}
  };



const placeholder = name === "Mobile Money" 
? 'Mobile Money number'
: `${name} address`;

const text = name === "Mobile Money" 
  ? <>Mobile Money number <br /> </> 
  : `${name} address`;

  return (
    <>
		<button onClick={() => setOpenForm(true)} className={'bg-base-1 w-[220px] h-[200px] max-md:w-[300px] rounded-lg flex flex-col gap-3 hover:ring-1 hover:ring-base-2 pt-1'}>
          <h1 className='text-center font-bold w-full'>{name}</h1>
          <div className='px-3 flex flex-col gap-2 w-full'>
              <div className={`rounded-lg ${className} flex justify-center items-center h-[120px]`}>
                <Image src={img} width={40} height={40} alt={name}/>
              </div>
              <div>
                <ProgressBar value={Number(data?.referralCount + data?.referralEarnings + (data?.reward/1000))} max={6} className={'h-2 bg-base-3'} indicatorclassName={'bg-white'}/>
              </div>
              <div className='text-xs text-blue-200 opacity-80 w-full flex justify-between'>
                <span>${data?.referralEarnings + (data?.reward/1000)}/$3.00</span>
                <span className='flex gap-1 justify-center items-center'>
                  <UserSvg className="text-blue-200 text-opacity-80 w-3 h-3 font-bold"/>
                  <span>{data?.referralCount}/{max}</span>
                </span>
              </div>
          </div>
    	</button>
			{openForm && (
				<div onClick={()=>{setOpenForm(false); setValue(0)}} className='absolute z-50 top-0 w-full left-0 h-[100vh] flex justify-center items-center bg-black bg-opacity-20'>
					<form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className='bg-base-1 max-md:rounded-md py-4 px-3 justify-start flex flex-col' name={name}>
						<div className='flex px-3 py-4 items-center gap-2 justify-between'>
							<div className='flex gap-2 items-center justify-center'>
								<div className={`rounded-lg ${className} flex justify-center items-center w-[50px] h-[50px] my-[5px]`}>
									<Image src={img} width={30} height={30} alt='mobile money' className='w-[60%] h-[60%] object-contain'/>
								</div>
								<span className='font-bold'>{name}</span>
							</div>
							<button onClick={() => {setOpenForm(false); setValue(0)}} type='reset' className='rounded-full p-2 border border-blue-200 border-opacity-85'>
								<CloseSvg className="text-blue-200 opacity-85 w-4 h-4"/>
							</button>
						</div>
						<div className='flex flex-col gap-6'>
							<div className='flex flex-col gap-1'>
								<span className='font-semibold'>{name} {nameAdd}</span>
								<input 
									type="text" 
									name="Address" 
									id="Address" 
									className='w-[629px] max-md:w-[300px] p-3 bg-base-3 rounded-lg placeholder-opacity-85' 
									placeholder={`Enter ${placeholder}...`}
									{...(name === "Mobile Money" ? { maxLength: 10 } : {})}
									required
								/>
								<p className='text-blue-200 text-opacity-85 text-xs break-words'>The {text} for your {name} Wallet.</p>
							</div>
							<div className='flex flex-col gap-1'>
								<span className='font-semibold'>Amount in USD</span>
								<input type="number" 
									onWheel={handleScroll} 
									onChange={handleChange}
									onClick={() => setValue("")}
									name="Amount" 
									id="Amount" 
									className='w-[629px] p-3 max-md:w-[300px] bg-base-3 rounded-lg placeholder-opacity-85 appearance-none focus:outline-none' 
									min={3} 
									value={value}
									required
								/>
								<p className='text-blue-200 text-opacity-85 text-xs'>Minimum ${min}</p>
							</div>
							<button type='submit' className='w-[629px] rounded-lg p-2 max-md:w-[300px] bg-base-2'>
								Withdraw
							</button>
						</div>

					</form>
				</div>
			)}
    </>
  )
}

export default PaymentCard