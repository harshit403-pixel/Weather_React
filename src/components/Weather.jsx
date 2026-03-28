import React from "react";
import Lottie from "lottie-react";
import logo from "../assets/logo.json";
import snowfall from "../assets/snaow.json";
import cloudLight from "../assets/cloudLight.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Daily from "./Daily";
import isLoading from "../assets/loading.json"
import thermoHot from "../assets/thermoHot.png"
import thermoDecent from "../assets/thermoDecent.png"
import thermoCold from "../assets/thermoCold.png"
import sunnyMain from "../assets/sunnyMain.json"
import snowMain from "../assets/snowMain.json"
import cloudSunMain from "../assets/cloudSunMain.json"
  


const Weather = () => {

const [weather, setWeather] = useState({
  temperature: null,
  wind: null,
  humidity: null
});
const [forecast, setForecast] = useState([
])

const [coordinates, setCoordinates] = useState(null)

const [city, setCity] = useState(null)

const [loading, setLoading] = useState(false)


let cityData = async(cityName)=>{
  let res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`)

let location = res.data.results?.[0];
let latitude = location?.latitude;
let longitude = location?.longitude;

  setCoordinates( {
  latitude : latitude,
    longitude : longitude
  } )

}



let handleTemp = ()=>{
cityData(city)
}

let fetchData = async () => {
try {
    let res = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_mean&forecast_days=7&timezone=auto`
  );



let formatted = res.data.daily.time.map((date, i) => ({
  date: date,
  temp: res.data.daily.temperature_2m_mean[i]
}));

  
  let data = res.data.current;

  setWeather({
    temperature: data.temperature_2m,
    wind: data.wind_speed_10m,
    humidity: data.relative_humidity_2m
  });

  setForecast(
   formatted
    
  )
} catch (error) {
  console.log("erro in fetching weather data")
  
}

finally{
    setLoading(false)
}
};

useEffect(()=>{
console.log("devendra bhaiya OP")
},[])

  useEffect(()=>{
    if(coordinates){
      fetchData()
    }

  },[coordinates])

  const [mode, setMode] = useState(true)



  const getGradientStyle = (temp) => {
  if (temp < 10)
    return "radial-gradient(circle, #1e3a8a, #000)";
  if (temp < 20)
    return "radial-gradient(circle, #4b5563, #000)";
  if (temp < 30)
    return "radial-gradient(circle, #f59e0b, #000)";
  return "radial-gradient(circle, #dc2626, #000)";
};

  return ( 
    <div
  style={{
    background: getGradientStyle(weather.temperature),
    transition: "background 4s ease-in-out",
    overflow:"hidden"
  }}
  className="h-screen w-screen text-white overflow-hidden"
>

      <div className="absolute pointer-events-none flex">
             <Lottie style={{ width:"100%", opacity:"0.4", filter:"blur(10px)"}} animationData={snowfall} loop={true} autoFocus={true} />
             <Lottie style={{ width:"100%", opacity:"0.4", filter:"blur(10px)"}} animationData={snowfall} loop={true} autoFocus={true} />
      </div>

     <div className="h-[16%] flex justify-between pl-3 md:pr-16 pr-10  items-center ">
      <div>
        <Lottie animationData={logo} loop={true} autoPlay={true} style={{height: "110px", marginTop:"12px"}}  />
        

      </div>
     <div className="flex gap-1">
       <input
       onChange={(data)=>{
        setCity(data.target.value)
       }}
       type="text" placeholder="Enter Your City" className="outline-0  text-white border border-white/20 rounded px-2 " />
       <button
       onClick={()=>{

        {handleTemp()}

        setLoading(true)
        
       }} 
      className="text-white bg-blue-500 px-4 py-0.5  transition-all duration-300 ease-in-out  rounded-sm cursor-pointer hover:bg-blue-200 hover:text-black active:scale-97  ">Search</button>
     </div>

     </div>

     <div className=" h-[60%] flex mt-10 flex-col md:flex-row items-center md:items-start ">

{/* tempertarure bagera yyahha */}
      <div className=" h-full md:w-[30%] -mt-15 md:-mt-0 flex flex-col gap-8 md:pl-40 ">

        <div className="">
        <div className="flex ">  <h1 className="text-9xl" > {weather.temperature}</h1> <span className="text-xl mt-2 " >{weather.temperature ? "°C": ""}</span> </div>
          <h2 className="text-5xl font-thin">

            {weather.temperature? "" :"Enter your city" }
  { weather.temperature && weather.temperature <= 10 && weather.temperature > -10 && "Snowfall"}
  {weather.temperature > 10 && weather.temperature <= 20 && "Cold and Cloudy"}
  {weather.temperature > 20 &&weather.temperature  <= 30 && "Pleasant Weather"}
  {weather.temperature > 30 && weather.temperature <= 40 && "Hot Conditions"}
  {weather.temperature > 40 && "Extreme Heat"}

</h2>
        </div>

<div className="flex gap-10">
          <div className="flex flex-col justify-center">
<div className="flex items-center gap-1">
            <svg className="h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M10.5 17H4V15H10.5C12.433 15 14 16.567 14 18.5C14 20.433 12.433 22 10.5 22C8.99957 22 7.71966 21.0559 7.22196 19.7293L9.09513 19.0268C9.30843 19.5954 9.85696 20 10.5 20C11.3284 20 12 19.3284 12 18.5C12 17.6716 11.3284 17 10.5 17ZM5 11H18.5C20.433 11 22 12.567 22 14.5C22 16.433 20.433 18 18.5 18C16.9996 18 15.7197 17.0559 15.222 15.7293L17.0951 15.0268C17.3084 15.5954 17.857 16 18.5 16C19.3284 16 20 15.3284 20 14.5C20 13.6716 19.3284 13 18.5 13H5C3.34315 13 2 11.6569 2 10C2 8.34315 3.34315 7 5 7H13.5C14.3284 7 15 6.32843 15 5.5C15 4.67157 14.3284 4 13.5 4C12.857 4 12.3084 4.40463 12.0951 4.97317L10.222 4.27073C10.7197 2.94414 11.9996 2 13.5 2C15.433 2 17 3.567 17 5.5C17 7.433 15.433 9 13.5 9H5C4.44772 9 4 9.44772 4 10C4 10.5523 4.44772 11 5 11Z"></path></svg>
          <p className="text-[13px]">Wind</p>
</div>
<h2 className="text-2xl">{weather.wind}km/h</h2>
        </div>


        <div>
<div className="flex items-center">
<svg className="h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M7.05025 8.04673L12 3.09698L16.9497 8.04673C19.6834 10.7804 19.6834 15.2126 16.9497 17.9462C14.2161 20.6799 9.78392 20.6799 7.05025 17.9462C4.31658 15.2126 4.31658 10.7804 7.05025 8.04673ZM18.364 6.63252L12 0.268555L5.63604 6.63252C2.12132 10.1472 2.12132 15.8457 5.63604 19.3604C9.15076 22.8752 14.8492 22.8752 18.364 19.3604C21.8787 15.8457 21.8787 10.1472 18.364 6.63252ZM16.2427 10.1714L14.8285 8.75718L7.7574 15.8282L9.17161 17.2425L16.2427 10.1714ZM8.11095 11.232C8.69674 11.8178 9.64648 11.8178 10.2323 11.232C10.8181 10.6463 10.8181 9.69652 10.2323 9.11073C9.64648 8.52494 8.69674 8.52494 8.11095 9.11073C7.52516 9.69652 7.52516 10.6463 8.11095 11.232ZM15.8891 16.8889C15.3033 17.4747 14.3536 17.4747 13.7678 16.8889C13.182 16.3031 13.182 15.3534 13.7678 14.7676C14.3536 14.1818 15.3033 14.1818 15.8891 14.7676C16.4749 15.3534 16.4749 16.3031 15.8891 16.8889Z"></path></svg>
          <p className="text-[13px]">Humidity</p>
</div>
<h2 className="text-2xl">{weather.humidity}%</h2>
        </div>
</div>







      </div>



{/* pngs images ofg clouds */}
      <div className=" md:flex justify-center h-full w-[40%] hidden mr-20">

        {
          loading ? <Lottie animationData={isLoading} autoPlay={true} loop={true} /> : 
<Lottie
  className="h-full transition-opacity duration-500"
  animationData={
    weather.temperature < 10
      ? snowMain
      : weather.temperature < 25
      ? cloudSunMain
      : sunnyMain
  }
  loop
  autoplay
/>
        }
        

      </div>

      {/* here the 7 day information */}

      <div className=" md:w-[25%] h-full   ">

<div className="flex mt-5 md:mt-0 flex-col gap-2 backdrop-blur-2xl w-fit bg-white/5 px-7 py-5 rounded-2xl shadow-[inset_-0.5px_0.5px_1px_0px_#ffffff] " >  
<h1 className="border-b mb-2 pb-2">7-day forecast</h1>

{
  forecast.map((elem)=>{
    return <Daily key={elem.date} dailyData={elem}/>
  })
}




        </div>



      </div>


     </div>


     {/* hourly here */}

     <div className=" w-full hidden  md:flex justify-center mt-10 h-[200px] ">

      <div className="w-[80%] h-[10px] bg-linear shadow-[inset_-0px_1px_0px_0px_#ffffff]  ">

      </div>

     </div>


      
    </div>
  );
};

export default Weather;