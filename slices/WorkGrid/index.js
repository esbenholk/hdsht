import React,{useEffect, useState} from 'react'
import { createClient } from "../../prismicio";
import useCursor from '@/components/Resolvers/States/Cursor';
import AnimatedButton from '@/components/ProjectCarousel/AnimatedButton';

const LandingGrid = React.lazy(() => import('../../components/LandingGrid/LandingGrid'));

const handleHover = (e) => {
  useCursor.setState({
    cursorVariant: "hoveronlink",
    shouldrenderdetailsontop: false,
    description: "",
    title: "",
    shouldrenderdetailsontop: false,
    instruction: "view",

  });
};
const handleLeave = (e) => {
  useCursor.setState({
    cursorVariant: "default",
    shouldrenderdetailsontop: false,
    description: "",
    title: "",
    shouldrenderdetailsontop: false,
    instruction: "",

  });
};

function WorkGrid({ slice }){
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWorking, setIsWorking] = useState(false);

  const [workInGridWithDetails, setWorkInGridWithDetails] = useState([]);
  // const [tempWorkArray, setTempWorkArray] = useState([]); 
  let tempWorkArray = [];

  async function getWorkDetails(work, index, interval){
    const client = createClient();

    const workdetails = await client.getByUID("work", work.uid);

    let indexWorkObject = {work: workdetails, index: index};
    tempWorkArray.push(indexWorkObject);

    if(tempWorkArray.length === interval){
      tempWorkArray.sort(function(a, b){return a.index - b.index});
      for (let index = 0; index < tempWorkArray.length; index++) {
        const indexWork = tempWorkArray[index];
        setWorkInGridWithDetails(workInGridWithDetails => [...workInGridWithDetails, indexWork.work] );
      }

      tempWorkArray = [];
      setIsWorking(false);

    }

  }

  function getNextProjects(startpoint, interval){
    handleLeave();
    setIsWorking(true);
    setCurrentIndex(startpoint + interval);

    if(startpoint + interval > slice.items.length){
      interval = slice.items.length - startpoint;
    }
    for (let index = startpoint; index < startpoint+interval; index++) {
      const element = slice.items[index];
      if(element && element.work && element.work.uid){
        getWorkDetails(element.work, index, interval);
      }  
    }
  }

  useEffect(()=>{
    if(slice.items){
      getNextProjects(0, 10);
    }

  },[slice])

  return (  <section>
    <LandingGrid workInGridWithDetails={workInGridWithDetails}/>

    <div className='loadmorecontainer'>
    {!isWorking && currentIndex < slice.items.length && 
        <button className="loadmore" 
        onMouseOver={handleHover}
        onMouseLeave={handleLeave}
        onClick={() => getNextProjects(currentIndex, 10) }>
          load more</button>
    } 
    
    {isWorking && <div className='loadingbutton'><AnimatedButton/></div>}
    </div>

  </section>)
}

  



export default WorkGrid