import React, { useState } from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
import { GoSearch } from 'react-icons/go'


const SearchBar = ({setQuery, setUnits}) => {
  const [city, setCity] = useState('');

  const searchHandler = () => {
    if(city.length) setQuery({q : city});
  }
  const searchHandlerOnEnter = (e) => {
    if(e.key !== 'Enter') return
    if(city.length) setQuery({q : city});
  }
  const locationHandler = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords
        setQuery({lat:latitude, lon:longitude})
      })
    }
  }
  return (
    <div className='flex flex-row items justify-center my-5'>
        <div className='flex flex-row w-3/4 items-center justify-center gap-4'>
            <input value={city} onKeyDown={searchHandlerOnEnter} onChange={(e) => setCity(e.currentTarget.value)} className='text-gray-500 text-xl font-medium p-2 w-full shadow-xl focus:outline-none capitalize placeholder:normal-case' type="text" placeholder='Search by city'/>
            <GoSearch onClick={searchHandler} size={30} className='cursor-pointer hover:scale-[120%] duration-200'/>
            <BiCurrentLocation onClick={locationHandler} size={30} className='cursor-pointer hover:scale-[120%] duration-200'/>
        </div>

        <div className='flex flex-row w-[25%] items-center justify-center '>
            <button onClick={() => setUnits('metric')} className='text-2xl font-medium hover:scale-[120%] duration-200'>°C</button>
            <p className='text-2xl font-medium mx-1'>|</p>
            <button onClick={() => setUnits('imperial')} className='text-2xl font-medium hover:scale-[120%] duration-200'>°F</button>
        </div>

        
    </div>
  )
}

export default SearchBar