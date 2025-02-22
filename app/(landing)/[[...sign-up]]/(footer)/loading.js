import Loader from "@/components/Loader"

export default function Loading() {
    return ( 
    <div className="w-full min-h-screen flex justify-center items-center">
        <div className='w-full flex justify-center'>
              <Loader/>
        </div>
    </div>
    )
}