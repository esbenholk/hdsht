import styles from "./Sticky.module.scss";
import { useRef, useEffect, useState } from "react";
import useCursor from "../Resolvers/States/Cursor";
import { useFooterOffset } from "../Resolvers/States/FooterOffset";
import useWindowDimensions from "../Resolvers/UseWindowDimensions";
import ParticleCanvas from "../Resolvers/_particleCanvas";
import Logo from 'assets/svg/HDSHT_HD.svg';

// if(bodyContainer.scrollTop < offset){
//   for (let i = bodyContainer.scrollTop; i <= offset; i++) {
//     setTimeout(() => (bodyContainer.scrollTop = i), 4);
//   }
// } else {
//   for (let i = bodyContainer.scrollTop; i >= offset; i--) {
//     setTimeout(() => (bodyContainer.scrollTop = i), 4);
//   }
// }

const Sticky = ({ slice }) => {
  const header = useRef();
  const [height, setHeight] = useState(0);
  const [OffSetValue, setOffset] = useState(0.9);
  const {width} = useWindowDimensions();
  const [isNotInAHirarchy, setIsNotInAHirarchy] = useState(true);
  const [hirarchyTitle, setHirarchyTitle] = useState("");

  const logoRef = useRef();
  const [logoInPosition, setLogoInPosition] = useState(false);
  const [headerInPosition, setHeaderInPosition] = useState(false);
  const { footerOffset } = useFooterOffset();
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    setIsMobile(mobile);
    if(!mobile){
      setOffset(0.65);
    }
    setHeight(header.current.offsetHeight);

    if(isNaN(slice.primary.order)){
      setHirarchyTitle(slice.primary.order);
      slice.primary.order = 1;
      setIsNotInAHirarchy(true);
    } else {
      setHirarchyTitle(slice.primary.order-1);
      setIsNotInAHirarchy(false);
    }
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if(logoRef.current){
        const itemOffset = logoRef.current.getBoundingClientRect().y;
        if (itemOffset < -50) {
          setLogoInPosition(true);
        } else {
          setLogoInPosition(false);
        }
      }

      let h3s = document.getElementsByTagName('h3');
      if(h3s[1]){
        let stickyPosY = h3s[1].getBoundingClientRect().y;
  
       
        if(stickyPosY<50){
          setHeaderInPosition(true);
        } else {
          setHeaderInPosition(false);
        }
      }

    };

   
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <h3
      className={styles.Header}
      style={{
        top: isNotInAHirarchy ? 0 : `calc(${slice.primary.order * height * OffSetValue}px - ${height}px)`,
        bottom: `calc(${
          slice.primary.negative_order * height * OffSetValue - footerOffset
        }px - ${height}px)`,
        zIndex: slice.primary.order ? slice.primary.order + 10 : 10,
      }}
      ref={header}
      id={slice.primary.title}
      onClick={() => {
        const nextSibling = header.current.nextSibling;
        const offset =
         ( nextSibling.offsetTop -
          slice.primary.order * height * OffSetValue) - 50;


        // const bodyContainer = document.getElementsByClassName("body")[0];
        // bodyContainer.scrollTop = offset;
        window.scrollTo( { top: offset,behavior: "smooth"});

     
 
      }}
      onMouseOver={() => {
        useCursor.setState({
          cursorVariant: "hoveronlink",
        });
      }}
      onMouseLeave={() => {
        useCursor.setState({
          cursorVariant: "default",
        });
      }}
    >
         {slice.primary.title !== "logo" &&   <span className={styles.Order}>{hirarchyTitle}.</span> }
    
      {slice.primary.title !== "logo" && slice.primary.title}
    </h3>
    


    {slice.primary.title === "logo" &&  
      <>       
        <div className={`${styles.LogoContainer} ${logoInPosition && styles.StuckLogoContainer}` } 
                onMouseOver={() => {
                  useCursor.setState({
                    cursorVariant: "hoveronlink",
                    isOverProject: true,
                    title: "HDSHT",
                    description: "score:" + 0
                  });
                }}
             
                onMouseLeave={() => {
                  useCursor.setState({
                    cursorVariant: "default",
                    isOverProject: false,
                    title: "",
                    description: ""

                  })
                }}>
          {/**/}
          {isMobile ?  <img className="logo"src={Logo.src} alt="logo" style={{width: "calc(100% - 2rem)", margin: "1rem"}}/> :<ParticleCanvas  imageUrl={Logo.src} isPageTop={true}/>}

          
        </div>
   
        {/* {logoInPosition &&  <div style={{visibility: "hidden"}}>
          <img className={`${styles.Logo}` } src={Logo.src} alt="logo" style={{visibility: "hidden"}}/>
        </div>} */}

        <div style={{width: "100%", position: "fixed", zIndex: 1, top: "0", backgroundColor: "var(--main-font-color-highlight)", maxHeight: "2.7rem", minHeight: "2rem", overflow: "hidden", transition: "opacity 0.01s ease-in", opacity: headerInPosition ? 1 :0}}>
          <img className="logo"src={Logo.src} alt="logo" style={{width: "calc(100% - 2rem)", margin: "0rem 1rem"}}/>
        </div>

      </>
    }
     
    </>
  );
};

export default Sticky;
