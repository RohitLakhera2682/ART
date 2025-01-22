import { useState } from 'react'
import './App.css'
import axios from 'axios';


function App() {
  const [input, useInput] = useState("");
  const [city, useCity] = useState("");
  const [temp, useTemp] = useState("");
  const [des, useDes] = useState("");
  const [avail, useAvail]= useState(false);
  

  return (
    <div>
    
<div className="mt-40 max-w-md mx-auto mb-30">   
   
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text" onChange={(e) => {
      useInput(e.target.value);
     }} id="default-search" className=" block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Cities..." required />
        <button onClick={async ()=> {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${import.meta.env.VITE_API_KEY}`).then(res => {
          
           useAvail(true);
            useTemp(res.data.main.temp);
            useDes(res.data.weather[0].description);
            useCity(input);
        }).catch(()=> {
          
          useAvail(false);
        })
      }} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
    </div>
</div>
      <Display city={city} temp={temp} des= {des} avail = {avail}/>

    </div>
  )
}
function Display({city, temp, des, avail}:{city:string, temp:string, des:string, avail:boolean}) {
  if(avail===false) {
    return <div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Enter correct city name</h5>
    </div>
  }
  return  <div>
  <div  className="mt-25 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">

  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">City Name: {city}</h5>
  <p className="font-normal text-gray-700 ">Current temp : {temp}°C</p>
  <p className="font-normal text-gray-700 ">Weather: {des}</p>
  </div>
</div>
}

export default App
