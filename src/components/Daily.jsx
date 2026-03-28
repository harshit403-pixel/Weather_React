import React from 'react'

const Daily = ({dailyData}) => {
  return (

      <div className="flex gap-10">
       
          <div className='w-25'>
          <h1>{new Date(dailyData.date).toLocaleDateString("en-US", {
  weekday: "long"
})}</h1>
          <p className="text-white/30 font-thin text-[10px]">{dailyData.temp <= 5 && "It's Snowing"}
{dailyData.temp > 5 && dailyData.temp <= 10 && "Very Cold"}
{dailyData.temp > 10 && dailyData.temp <= 20 && "Cloudy"}
{dailyData.temp > 20 && dailyData.temp <= 30 && "Pleasant"}
{dailyData.temp > 30 && dailyData.temp <= 35 && "Hot"}
{dailyData.temp > 35 && dailyData.temp <= 40 && "Very Hot"}
{dailyData.temp > 40 && "Extreme Heat"}</p>
        </div>
        <h1>{dailyData.temp}</h1>
        </div>
  )
}

export default Daily
