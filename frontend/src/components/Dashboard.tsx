import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import TutorCard from './TutorCard';


interface Tutor {
  id: number;
  userId: number;
  edu: string;
  lat: number | null;
  long: number | null;
  active: boolean;
  offering: {
    grade: string;
    subject: string;
  };
  ratings:number
  photo: string;
}


const Dashboard = () => {
   const[ list ,setList]=useState<Tutor[]> ([])


   useEffect(()=>{
    async function    fetchTutor(){
    console.log('Fetching tutors...');
   try{
 const res =  await axios.get<{allTutor:Tutor[]}>('http://localhost:3000/api/tutor/listall?limit=3?&page=4')
   if (Array.isArray(res.data.allTutor)) {
          setList(res.data.allTutor); // Ensure the response is an array
        console.log('Fetched data:', res.data); 
        }


 }
 catch(e){
   return ('error fetching tutor list')

 }
 


  }
    
 fetchTutor();
   

   },[])
 
function handleClick(){
   return 0;
}

 const [dis,setDis]= useState(50);
 const [loc,setLoc]=useState("")
 
//      async function manG(){

//         try{
//      const dist= await axios.get("https//localhost:3000/api/search",{
//     params:{
//       ...(dis&&{dis}),
//        ...(loc&&{loc})
//     }


//      }) 
//     console.log(dist);}
//      catch(e){
//         return ({"message": "failed to fetched"})
//      }
    
//  } 
// function handleDef(e:any ){
//     setDis(e.target.value)
//     manG();
// } 

    return (



    <div> 
     <Sidebar/>   
  <div 
    
  className='bg-slate-700'>
<div className=' flex w-full   ' > 
        <div className=' visible :md bg-blue-300 min-h-[100vh] w-1/5 flex flex-col items-center justify-center '>
            <div>
               <form onSubmit={handleClick}>
 <label htmlFor='text'className=' ml-9  font-bold '>Area 
    <input className='ml-6 mr-6 mb-6 bg-red-400 text-xl font-thin' />

 </label>

      </form>
         </div> 
            <div className=''>  
              <label htmlFor="medium-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distance </label>
<input id="medium-range"  type="range" value={dis} className="w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
              </div>
              <div>
            
                a3
            </div>
             </div>
  
          <div className='bg-yellow-200 w-4/5  flex   flex-wrap '>
           {
             list.map((tutor)=>(
              <TutorCard key={tutor.userId} 
              image= {tutor.photo}
               reviews={tutor.ratings} 
               offerings={tutor.offering.grade}   />
         
               ) )
           

           }      
         
          </div>
       
    </div>


           <nav aria-label="Page navigation example">
  <ul className="flex items-center -space-x-px h-8 text-sm justify-center">
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">Previous</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
        </svg>
      </a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
    </li>
    <li>
      <a href="#" aria-current="page" className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <span className="sr-only">Next</span>
        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
      </a>
    </li>
  </ul>
</nav>

</div>

        
    </div>
  )
}

export default Dashboard