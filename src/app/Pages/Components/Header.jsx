'use client'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className=''>
        <div className='max-w-[1320px] mx-auto px-[12px] sticky top-0 py-[20px] '>
            <div className='flex justify-end pe-[20px] text-[20px] font-medium'>
                <div className='flex justify-between items-center gap-4'>
                    <Link href={`/`}> Add School </Link>
                    <Link href={`/Pages/ShowSchool`}> Show School </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
