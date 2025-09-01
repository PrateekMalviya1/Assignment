'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Header from './Pages/Components/Header';


export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  let [btnStatus, setBtnStatus] = useState('')

  let handleBtnStatus = () => {
    setBtnStatus('...Enter Proper Data')
  }

  let timeOutFunction = () => {
    setTimeout(() => {
      setBtnStatus('')
    }, 1000);
  }

  let form = (data) => {
    console.log('Enter In Function')
    setBtnStatus('...Wait')

    let formData = new FormData()
    formData.append('name', data.Name);
    formData.append('address', data.Address);
    formData.append('city', data.City);
    formData.append('state', data.State);
    formData.append('contact', data.Contact);
    formData.append('email', data.Email);
    if (data.Image && data.Image[0]) {
      formData.append('image', data.Image[0]);
    }

    axios.post('/schoolapi/addschool', formData)
      .then((res) => { console.log(res.data) })
      .then(() => {
        reset();
        setBtnStatus('...Complete');
        timeOutFunction();
      })
      .catch(()=>{
        setBtnStatus('...Wrong Data');
        timeOutFunction()
      })
  }



  return (
    <div >
      <header className='shadow shadow-neutral-300 dark:shadow-neutral-700 drop-shadow-xl mb-2 bg-neutral-100 dark:bg-neutral-800'>
        <Header />
      </header>
      <div
        className='fixed top-0 left-0 -z-50 h-screen w-full text-center bg-[url(/FormBackgroundImage.webp)] dark:bg-[url(/UpdatedBG.webp)] bg-cover  text-[#1c1917] dark:text-[#f5f5f4] bg-center'>

        {/* Form Div */}
        <div className='border rounded-2xl py-[20px] absolute -z-40 top-[50%] left-[50%] translate-[-50%] w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] p-[12px] bg-[rgba(255,255,255,0.5)] dark:bg-[rgba(0,0,0,0.5)]'>
          <h2 className='py-[20px] text-[32px]'> Add School </h2>

          <form onSubmit={handleSubmit(form)} className='flex flex-col gap-2 px-2'>

            <input type="file"
              {...register("Image", { required: false })}
              accept="image/*"
              className='border py-1 rounded-sm file:bg-[#bcb6b1] dark:file:bg-[#332f2c] file:rounded-e-full file:px-[8px] file:mr-2' />

            <input type="text"
              {...register("Name", { required: false })}
              className='border py-1 rounded-sm placeholder:ps-[8px]'
              placeholder='Name' />

            <input type="text"
              {...register("Address", { required: false })}
              className='border py-1 rounded-sm placeholder:ps-[8px]'
              placeholder='Address' />

            <input type="text"
              {...register("City", { required: false })}
              className='border py-1 rounded-sm placeholder:ps-[8px]'
              placeholder='City' />

            <input type="text"
              {...register("State", { required: false })}
              className='border py-1 rounded-sm placeholder:ps-[8px]'
              placeholder='State' />

            <input type="text"
              {...register("Contact", { required: true, pattern: /^[0-9+ ]{10,}$/i })}
              className='border py-1 rounded-sm placeholder:ps-[8px]'
              placeholder='Contact' />

            <input type="email"
              {...register("Email", { required: false, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className='border py-1 rounded-sm placeholder:ps-[8px]'
              placeholder='Email' />

            <div>
              <button
                className={`p-[4px_8px] rounded-sm text-white hover:bg-[#2b76a5] hover:shadow-2xl hover:shadow-[#2b76a5] ${(btnStatus == '...Wait')?'bg-sky-400 dark:bg-neutral-600':( btnStatus == '...Complete' ) ?'bg-green-400 dark:bg-neutral-600': (btnStatus == '...Wrong Data') ? 'bg-red-500 dark:bg-neutral-600' : 'bg-[rgb(51,145,203)] dark:bg-neutral-600'}`}
                onClick={handleBtnStatus}>
                Submit {btnStatus}
              </button>
            </div>
          </form>
        </div>



      </div>

    </div>
  )
}

