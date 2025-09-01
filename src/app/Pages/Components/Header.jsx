'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";


export default function Header() {
  let [offCanvas, setOffCanvas] = useState(false);
  const pathname = usePathname();


  return (
    <div className=''>
      <div className='max-w-[1320px] mx-auto px-[12px] sticky top-0 py-[20px] '>
        <div className='flex justify-end items-center pe-[20px] text-[20px] font-medium'>
          <div className='sm:hidden'>
            <CiMenuBurger className='font-medium text-[30px]' onClick={() => { setOffCanvas(!offCanvas) }} />
          </div>
          <div className='hidden sm:flex justify-between items-center gap-4'>
            <Link href={`/`}
              className={(pathname === '/') ?
                'text-[rgb(51,145,203)] dark:text-neutral-100 ' :
                `text-neutral-600 dark:text-neutral-400`}>
              Add School
            </Link>
            <Link href={`/Pages/ShowSchool`}
              className={(pathname === '/Pages/ShowSchool') ?
                'text-[rgb(51,145,203)] dark:text-neutral-100 ' :
                `text-neutral-600 dark:text-neutral-400`}>
              Show School
            </Link>
          </div>
        </div>
      </div>

      {/* Canvas div */}
      <div className={`dark:bg-neutral-800 bg-neutral-700 dark:text-neutral-100 fixed top-0 left-0 z-20 w-screen text-neutral-800 h-screen ${(offCanvas) ? 'block overflow-hidden ' : 'hidden overflow-hidden'}`}>
        <div className='bg-neutral-200 dark:bg-neutral-700 absolute top-0 left-0 w-full  h-screen  border'>
          <div className='flex justify-end pr-[20px] pt-[20px] text-[24px] w-full'>
            <IoCloseOutline onClick={()=>{setOffCanvas(!offCanvas)}} />
          </div>
          <div className='w-full h-full text-center flex justify-center items-center'>
            <div className='flex flex-col gap-5'>
              <Link href={`/`}
                className={(pathname === '/') ?
                  'text-[rgb(51,145,203)] dark:text-neutral-100 ' :
                  `text-neutral-600 dark:text-neutral-400`}>
                Add School
              </Link>
              <Link href={`/Pages/ShowSchool`}
                className={(pathname === '/Pages/ShowSchool') ?
                  'text-[rgb(51,145,203)] dark:text-neutral-100 ' :
                  `text-neutral-600 dark:text-neutral-400`}>
                Show School
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
