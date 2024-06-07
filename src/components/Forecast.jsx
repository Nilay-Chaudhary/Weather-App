import React from 'react'

const Forecast = ({title, data}) => {
  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
            <p className='font-medium uppercase'>{title}</p>
        </div>
        <hr className='my-2'/>
        <div className='flex items-center justify-between'>
            {
                data.map((d, index) => (
                    <div key={index} className='flex flex-col items-center justify-center'>
                        <p className='font-light text-sm'>{d.title}</p>
                        <img className='w-12 my-1' src={d.icon} alt="" />
                        <p className='font-medium mb-1'>{d.temp.toFixed()}°</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Forecast