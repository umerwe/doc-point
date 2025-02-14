import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className='mt-[90px] md:mt-[120px] pb-10 px-0 flex flex-col gap-10 lg-[870px]:flex lg:flex-row lg:justify-between text-gray-600'>
                <div className='flex flex-col items-center text-center lg:text-left lg:items-start  lg:w-[500px]'>
                    <div className='flex items-center gap-1'>
                        <img className='w-10 lg:w-11 pt-1 lg:pt-0' src='/images/decktopus.svg' alt="" />
                        <h1 className='text-xl font-bold text-blue-900 pt-1.5 lg:pt-0'>DocPoint</h1>
                    </div>
                    <p className=' text-sm leading-6 mt-4 px-[10px] lg:px-0 lg:pr-32 '>DocPoint is your trusted platform for booking doctor appointments.
                        Explore our extensive list of professionals, schedule hassle-free,
                        and access reliable healthcare resources, all designed to prioritize
                        your convenience and well-being.
                    </p>
                </div>
                <div className='flex justify-between min-[1100px]:gap-[150px] lg:text-[19px]'>
                    <div className='w-[135px] pl-7'>
                        <p className='font-semibold mb-4 text-black'>COMPANY</p>
                        <div className='flex flex-col gap-2 text-sm'>
                            <span>Home</span>
                            <span>About</span>
                            <span>Delivery</span>
                            <span>Privacy Policy</span>
                        </div>
                    </div >
                    <div>
                        <p className='font-semibold mb-4 text-black'>GET IN TOUCH</p>
                        <div className='text-sm flex flex-col gap-2'>
                            <p>03484677011</p>
                            <p>tubey3976@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <hr />
                <p className='text-center my-4 font-medium text-gray-600 text-xs lg:text-sm'>Copyright 2024 @ Umer.dev - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
