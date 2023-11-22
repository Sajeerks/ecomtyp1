import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import "./SpeedDialOptions.scss"
import {
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
  } from 'react-share';

  import html2canvas from 'html2canvas';
  import { jsPDF } from "jspdf";


export default function SpeedDialOptions() {
    // const printRef = React.useRef();

    const [showSocial, setshowSocial] = React.useState(false)

    const shareFuc=()=>{
        // console.log("funccalled ");
        setshowSocial(true)
    }

    const downloadImage = (blob:string, fileName:string) => {
      const fakeLink = window.document.createElement("a");
      // fakeLink.style = "display:none;";
      fakeLink.style["display"] = "none"

      fakeLink.download = fileName;
      
      fakeLink.href = blob;
      
      document.body.appendChild(fakeLink);
      fakeLink.click();
      document.body.removeChild(fakeLink);
      
      fakeLink.remove();
      };
    const saveFunc=async()=>{
        // console.log("funccalled ");

        const rootDIVElement = document.getElementById("root")
        // console.log(rootDIVElement);
        if(!rootDIVElement) return
        const canvasElement = await  html2canvas(rootDIVElement, {useCORS:true, })
        const image = await canvasElement.toDataURL("image/png", 1.0);
        downloadImage(image, "imageFileName");
    }


const saveAsPdf=async()=>{
  const rootDIVElement = document.getElementById("root")
  // console.log(rootDIVElement);
  if(!rootDIVElement) return
  const canvasElement = await  html2canvas(rootDIVElement, {useCORS:true, })
  const imgData = await canvasElement.toDataURL("image/png", 1.0);
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format:"a4"
  });
  let widthOFROoT = rootDIVElement.offsetWidth;
let heightOfRoot = rootDIVElement.offsetHeight;
console.log({widthOFROoT,heightOfRoot});
let positionInfo = rootDIVElement.getBoundingClientRect();
var height = positionInfo.height;
var width = positionInfo.width;

console.log({height,width});

     pdf.addImage(imgData,"JPEG",0,0,width*.264,height*.264, 'FAST')
        pdf.save("download.pdf");

}

const printEntirePage=()=>{
  window.print();
}

    const actions = [
        { icon: <FileCopyIcon />, name: 'print to computer' ,func:printEntirePage },
        { icon: <SaveIcon />, name: 'Save as image' ,func:saveFunc},
        { icon: <PrintIcon />, name: 'Print as pdf',func:saveAsPdf} ,
        { icon: <ShareIcon />, name: 'Share', func:shareFuc},
      ];
      

React.useEffect(() => {
  if(showSocial){
    setTimeout(() => {
        setshowSocial(false)
    }, 2000);
  }

  return () => {
   
  }
}, [showSocial])





  return (
    // <Box sx={{ height: "90vh", transform: 'translateZ(0px)', flexGrow: 1, }}>
    <> 
   
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 1, left: 16 , overflow:"hidden",}}
        direction ="up"
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
             onClick={action.func}
          />
        ))}









 </SpeedDial>
 {
        showSocial && <Box    sx={{ position: 'fixed', bottom: 300, left: 16 , overflow:"hidden",zIndex:10}}>
        <FacebookShareButton 
        url={"https://www.facebook.com/sajeersayed"}
        // quote={'Title or jo bhi aapko likhna ho'}
        // hashtag={'#portfolio...'}
        >
        <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        
        <WhatsappShareButton  
                  url={"https://wa.me/+966541396257"}
               
                  title={"direlty message me"}
                >
                  <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>
 <TwitterShareButton
   url={"https://twitter.com/sajeersayed"}
 

 >
<TwitterIcon size={40} round={true}/>
 </TwitterShareButton>

              
                
        </Box>
    
    }


 </>
   


    
  );
}


