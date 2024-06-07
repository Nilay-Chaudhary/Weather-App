import React from 'react'
import { BiSolidDropletHalf } from 'react-icons/bi'
import { FaThermometerEmpty } from 'react-icons/fa'
import { FiWind } from 'react-icons/fi'
import { GiSunrise, GiSunset } from 'react-icons/gi'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

const TempAndDets = ({units, weather: {details, icon, temp_min, temp_max, humidity, temp, formattedSunriseTime,formattedSunsetTime, speed, feels_like}}) => {
    const verticalDets = [
        {
            id : 1,
            Icon : FaThermometerEmpty,
            desc:"Real Feel",
            val:`${feels_like.toFixed()}°`
        },
        {
            id : 2,
            Icon : BiSolidDropletHalf,
            desc:"Humidity",
            val:`${humidity}%`
        },
        {
            id : 3,
            Icon : FiWind,
            desc:"Wind",
            val:`${speed.toFixed()} ${units === 'metric'?'m/s':'mph'} `
        },
    ]
    const horizontalDets = [
        {
            id : 1,
            Icon : GiSunrise,
            desc:"Sunrise",
            val: formattedSunriseTime
        },
        {
            id : 2,
            Icon : GiSunset,
            desc:"Sunset",
            val: formattedSunsetTime
        },
        {
            id : 3,
            Icon : MdKeyboardArrowUp,
            desc:"High",
            val:`${temp_max.toFixed()}°`
        },
        {
            id : 4,
            Icon : MdKeyboardArrowDown,
            desc:"Low",
            val:`${temp_min.toFixed()}°`
        },
    ]
  return (
    <div>
        {/* top row */}
        <div className='flex items-center justify-center py-3 text-xl text-cyan-300'>
            <p>{details}</p>
        </div>
        {/* middle row */}
        <div className='flex flex-row items-center justify-between py-3'>
            <img className='w-20' src={icon} alt="weather_icon" />
            <p className='text-4xl'>{temp.toFixed()}°</p>
            <div className='flex flex-col gap-3 items-start'>
                {
                    verticalDets.map(({id, Icon, desc, val}) => (
                        <div key={id} className='flex font-light text-sm items-center justify-center'>
                            <Icon size={18} className='mr-1'/>
                            {`${desc}: `} <span className='font-medium ml-1'>{val}</span>
                        </div>
                    ))
                }
            </div>
        </div>
        {/* bottom row */}
        <div className='flex flex-row items-center justify-center gap-10 text-sm py-3'>
            {
                horizontalDets.map(({id, Icon, desc, val}) =>  (
                    <div key={id} className='flex flex-row items-center'>
                        <Icon size={30} />
                        <p className='font-light ml-1'>
                            {`${desc}: `} <span className='font-medium ml-1'>{val}</span>
                        </p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default TempAndDets