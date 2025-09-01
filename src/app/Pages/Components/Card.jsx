'use client'
import React from 'react'

export default function Card({ name, imageName, address, city }) {
    return (
        <div className='my-[8px]'>
            <div className='w-[100%] h-[310px] sm:h-[340px] shadow-neutral-300 dark:shadow-neutral-700 shadow-md rounded-md overflow-hidden'>
                <div>
                    <img src={`${imageName}`} alt="../ Image Not Found" className='w-[100%] h-[200px] rounded-t-md' />
                </div>
                <div className='flex flex-col my-[8px]'>
                    <div className='text-[14px] ps-2'> {city} </div>
                    <h2 className='text-center py-[8px] text-[20px] shadow-neutral-300 dark:shadow-neutral-700 font-medium'> {name} </h2>
                    <div className=' text-[14px] ps-2 shadow-neutral-300 dark:shadow-neutral-700 '> {address} </div>
                </div>
            </div>
        </div>
    )
}
