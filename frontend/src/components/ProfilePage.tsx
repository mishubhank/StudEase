 

 import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
 //import {} from '../assets/location-sign-svgrepo-com.svg'

 interface Tutor {

about:string
photo:string
edu:{
 year:number 
 specialization:string
 degree:string

}
offering:string 
rating:number 
count: number
location:string





 }
 


 export const  ProfilePage = ( ) => {
    const loggedIn=false;
      const [res, setResponse] = useState<Tutor | null>(null);
//bool loggedIn=false;
     const params=useParams();
     const userId=params.userId

     useEffect(()=>{
     async function tutorProfile(){
 //   console.log(params.userId);
         try{
         const profile= await axios.get(`http://localhost:3000/api/userProfile/${userId}`)
         setResponse(profile.data); 
       console.log(profile.data);
      
        }
         catch(e){
         return {'message':'error fetching profile'}


         }


    }
 tutorProfile();
  

     },[])
    

   


    return (
        
       <div > 
         <div className='h-20 bg-pink-200 flex items-center font-sans text-3xl ' >
        <div className='ml-12'>StudEase</div>
 

      
      
   </div>
     <div className='flex space-x-4  m-10 '>
  <div className= 'p-2   font-semibold bg-yellow-200 border-r-sky-300 rounded-2xl   '>afdfdfd </div>
 <div className= 'p-1  font-semibold bg-yellow-200 border-r-sky-300 rounded-2xl  '>afdfdfd </div>
  <div className= 'p-1  font-semibold bg-yellow-200 border-r-sky-300 rounded-2xl  '>afdfdfd </div>
  
         </div>
   <div className='flex-row flex-1   bg-blue-200'>

   </div>
   
    <div className="flex flex-col  h-full bg-blue-200  ">
    <div  className='h-screen  flex'>
        <div className=' basis-2/3 p-8
        '> 
        
        <div className='font-bold text-4xl'> I'm an educator pursuing ph.d in English with having experience of teaching not only English But also, personality development, communication skills </div>
        

    
       <div className='font-bold text-xl pt-8'>location </div>
       
     <div className=' flex flex-row space-x-4' >
        <div className='rounded-md bg-red-200 p-2 '> Russell Chowk</div>
         <div className='rounded-md bg-red-200 p-2'> Russell Chowk</div>
     </div>
         <div className='' > : )</div>
          </div>


         
          
         <div className=' p-6 basis-1/3  rounded-xl '>
          <img className='  rounded-lg border-red-600' src={res?.photo}/>
         <span> status </span>
         <button type="button" className=" w-32 text-white m-3 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Contact</button>
         </div>
      
        
 
    </div>
 <div className='footer w-full min-h-48 bg-black flex text-white' >fotter</div>

  </div>
 

        </div>
   )

 }
 






