import React,{useEffect, useState} from 'react'
import LandingGrid from '../../components/LandingGrid/LandingGrid'
import { createClient } from "../../prismicio";

function WorkGrid({ slice }){


  const [workInGridWithDetails, setWorkInGridWithDetails] = useState([]);
  
  async function getWorkDetails(work){
    const client = createClient();
    const workdetails = await client.getByUID("work", work.uid);
    console.log("has slice/work",workdetails);
    setWorkInGridWithDetails(workInGridWithDetails => [...workInGridWithDetails,workdetails] );
  }

  useEffect(()=>{
  if(slice.items){
      for (let index = 0; index < slice.items.length; index++) {
        const element = slice.items[index];
        if(element.work && element.work.uid){
          getWorkDetails(element.work);
        }  
      }
    }

  },[slice])

  return (  <section>
    <LandingGrid workInGridWithDetails={workInGridWithDetails}/>
  </section>)
}

  



export default WorkGrid