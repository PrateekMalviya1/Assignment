'use client'
import axios from 'axios';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Card from '../Components/Card';
import Header from '../Components/Header';

export default function page() {
  let [data, setData] = useState([]);

  let getData = () => {
    axios.get('/schoolapi/ShowSchool')
      .then((res) => { setData(res.data.result) })
      .catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className='dark:bg-neutral-800 dark:text-neutral-100 bg-neutral-100 text-neutral-800 min-h-[100vh]'>
      <header className='shadow shadow-neutral-300 dark:shadow-neutral-700 drop-shadow-xl mb-2'>
        <Header />
      </header>
      <div className='max-w-[1320px] mx-auto px-[20px]'>
        <h2 className='text-center text-[30px] my-[20px] font-medium'> School Records </h2>
        <div className='grid gap-3 py-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {
            (data.length > 0) ?
              data.map((value, index) => {
                return (
                  <Card key={index} name={value.name} address={value.address} city={value.city} state={value.state} contact={value.contact} imageName={value.image} email={value.email_id}/>
                  
                )
              })
              : <div className='m-2 w-[90%] border shadow-2xl h-[200px] rounded-2xl text-center'> ... Plese Wait</div>
          }
        </div>
      </div>
    </div>
  )
}
