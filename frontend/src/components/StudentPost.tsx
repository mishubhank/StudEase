import React, { useEffect, useState } from 'react'

const StudentPost = () => {
   const [location, setLocation]=useState({lat:null,long:null})

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

   function success(pos:any) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function errors(err:any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }



    useEffect(() => {
        const LocPerm= localStorage.getItem("locAccess")
        if(LocPerm=='block'){
            
        }
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
      const a= navigator.geolocation.getCurrentPosition((pos)=>{
        
      })
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable 
            localStorage.setItem() 
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
   
    function Submit(){


   }

    return (
    <>  
    <div className=' flex flex-col flex-2 bg-pink-200 justify-center items-center h-screen min-w-full '>

   <form >  
 <div className='min-w-64 min-h-10   border-2 border-dotted border-black rounded-xl   bg-yellow-300 m-4 ' > 
 <label id=' class' className='p-4 text-3xl'>Standard
    <input placeholder='VIII...' className='m-4 p-2  rounded-lg  text-2xl'/>
 </label>
 </div>
 <div className='min-w-64 min-h-10   border-2 border-dotted border-black rounded-xl   bg-yellow-300 m-4 ' > 
 <label id=' class' className='p-4 text-3xl'>Location 
    <input placeholder='VijayNagar? etc' className='m-4 text-xl p-2 rounded-xl '/>
 </label>
 </div>
 <div className='    border-2 border-dotted border-black rounded-xl   bg-yellow-300 m-4 ' > 
 <label id=' class' className='p-4 text-3xl flex items-center'>Message 
    <textarea placeholder='looking for a english tutor....' className= ' resize-none  rounded-xl p-2 h-32  m-4 text-2xl'
    rows={4}/>
 </label>
 </div>
<button type="submit" className="text-white flex  bg-blue-700 ml-6 min-h-8 min-w-8 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm pr-4 px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post Tuition </button>
         </form>

        </div>
      
          </>
  )
}


export default StudentPost
