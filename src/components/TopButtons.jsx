import React from 'react'

const TopButtons = ({setQuery}) => {
  return (
    <div className='flex flex-row items-center justify-around my-6 gap-9'>
        <button onClick={() => setQuery({q:"London"})} className='text-lg font-medium hover:bg-gray-700/20 px-3 py-3 rounded-md duration-200'>London</button>
        <button onClick={() => setQuery({q:"Mumbai"})} className='text-lg font-medium hover:bg-gray-700/20 px-3 py-3 rounded-md duration-200'>Mumbai</button>
        <button onClick={() => setQuery({q:"Paris"})} className='text-lg font-medium hover:bg-gray-700/20 px-3 py-3 rounded-md duration-200'>Paris</button>
        <button onClick={() => setQuery({q:"Sydney"})} className='text-lg font-medium hover:bg-gray-700/20 px-3 py-3 rounded-md duration-200'>Sydney</button>
        <button onClick={() => setQuery({q:"Tokyo"})} className='text-lg font-medium hover:bg-gray-700/20 px-3 py-3 rounded-md duration-200'>Tokyo</button>
    </div>
  )
}

export default TopButtons