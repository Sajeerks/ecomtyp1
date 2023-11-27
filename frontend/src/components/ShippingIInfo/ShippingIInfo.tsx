import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography,useTheme } from "@mui/material"
import "./ShippingIInfo.scss"
import {  useEffect, useRef, useState } from "react"
import { useFormik } from "formik"
import * as yup from 'yup';

import { Country, State, City }  from 'country-state-city';


import tt2 from '@tomtom-international/web-sdk-services';

import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";



// const DefaultLocation = { lat: 10, lng: 106};
// const DefaultZoom = 10;



const validationSchema =yup.object({
  adddressLine1: yup.string()
  .required("please enter a adddressLine1 ")
  .min(2, "adddressLine1 too short"),
  adddressLine2: yup.string().required("please enter a adddressLine1 2")
.min(10, "adddressLine2 too short"),
phoneNumber: yup.number()
  .integer()
  .test(
    "Is positive?",
    "ERROR: The number must be greater than 0!",
    (value) => value! > 0
  )
  .required("please enter a phone numnber")
  .min(6),
  pinCode: yup.number()
  .integer()
  .test(
    "Is positive?",
    "ERROR: The number must be greater than 0!",
    (value) => value! > 0
  )
  .required("please enter a phone numnber")
  .min(6),
  state: yup.string()
  .required("please enter a state ")
  .min(2, "state too short"),
  city: yup.string()
  .required("please enter a city ")
  .min(1, "state too short"),
  country: yup.string()
  .required("please enter a country ")
  .min(2, "state too short"),
  email:yup.string().email().required("plese enter valid email")
  



});


const ShippingIInfo = () => {
  const themer = useTheme()
  const navigate = useNavigate()
  
  const mapElement = useRef<HTMLDivElement>(null);
  const [mapLongitude, _setMapLongitude] = useState(76.270523);
  const [mapLatitude, _setMapLatitude] = useState(9.939093);
  const [mapZoom, _setMapZoom] = useState(13);
  const [_map, setMap] = useState<any>({});
   const [longlatdata, setlonglatdata] = useState({lng: 76.27655576506731, lat: 9.945387544627295})


// const [onceClicked, setonceClicked] = useState(false)
  const [query, setquery] = useState("")


//   tt.services.copyrightsV2({
//     key: "jBp00OEZNB1oFayNf4ANuZFw7G2t3Y7O"
// })
//     .then(function (results) {
//         console.log('Copyrights', results);
//     })
//     .catch(function (reason) {
//         console.log('Copyrights', reason);
//     });


// const map2 = tt.map({
//   key: 'jBp00OEZNB1oFayNf4ANuZFw7G2t3Y7O',
//   container: 'map'
// });


// const increaseZoom = () => {
//   if (mapZoom < 20) {
//     setMapZoom(mapZoom + 1);
//   }
// };

// const decreaseZoom = () => {
//   if (mapZoom > 1) {
//     setMapZoom(mapZoom - 1);
//   }
// };

// const updateMap = () => {
//   map.setCenter([parseFloat(String(mapLongitude)), parseFloat(String(mapLatitude))]);
//   map.setZoom(mapZoom);
// };

let map2:any
// let marker1: tt.Marker
useEffect(() => {
  const timer = setTimeout(() => {
   map2= tt.map({
    /* 
    This key will API key only works on this Stackblitz. To use this code in your own project,
    sign up for an API key on the TomTom Developer Portal.
    */
    key: "jBp00OEZNB1oFayNf4ANuZFw7G2t3Y7O",
    container: mapElement.current!,
    center: [mapLongitude, mapLatitude],
    zoom: mapZoom
  });
  setMap(map2);
  

  var moveMap = function(lngLat:any){
    // console.log("ddddddddddddddd");
    // console.log(lngLat);
    map2.flyTo({
     center:lngLat,
     zoom:14
    })
  }
var search =  function(){
  tt2.services.fuzzySearch({
    key:"jBp00OEZNB1oFayNf4ANuZFw7G2t3Y7O",
    query:query,

  }).then(handleResults)

}
var handleResults = function(result:any){

if(result.results){
moveMap(result.results[0]?.position)
  
}
// console.log({result});

}





  if(query){
    search()
  }


// var popupOffsets = {
//   top: [0, 0],
//   bottom: [0, -70],
//   "bottom-right": [0, -70],
//   "bottom-left": [0, -70],
//   left: [25, -35],
//   right: [-25, -35],
// }
map2.on("load",()=>{
  // var marker = new tt.Marker().setLngLat( [mapLongitude, mapLatitude]).addTo(map2)
  // var popup =new tt.Popup({ offset: popupOffsets as any  }).setHTML("hei there")

  // marker.setPopup(popup).togglePopup()
  // let center2 =  [mapLongitude, mapLatitude]
  // new tt.Popup().setLngLat().setText("hello there ").addTo(map2)
})
let xx:any[] =[]
map2.on("click",(e:any)=>{
  // console.log("clicked");
  // console.log(e);
  // console.log(e.lngLat);
  setlonglatdata(e.lngLat)
  // var popper1 = new tt.Popup().setLngLat(e.lngLat).setText("hello there ").addTo(map2)
 var  marker1 = new tt.Marker().setLngLat(e.lngLat).addTo(map2)
 xx.push(marker1)

 if(xx.length>1){
  xx.reverse()
  xx[1].remove()
  xx.length = 1
 }
  // return marker
  


// console.log(map2)

})

}, 3000);



  return () =>{ 
    clearTimeout(timer)
    map2 &&  map2.remove()
  
  }


 

}, [query]);

// useEffect(() => {
// if(onceClicked){
//   if(marker1){
//     console.log("remvvvvvvvvvvvvvvvvvvvvvvvvvv");
//     marker1.remove()
//   }

// }
// }, [onceClicked])






  ////////////////////////



  
  // const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  // const [location, setLocation] = useState(defaultLocation);
  // const [zoom, setZoom] = useState(DefaultZoom);

  // function handleChangeLocation (lat:number, lng:number){
  //   setLocation({lat:lat, lng:lng});
  // }
  
  // function handleChangeZoom (newZoom:number){
  //   setZoom(newZoom);
  // }

  // function handleResetLocation(){
  //   setDefaultLocation({ ... DefaultLocation});
  //   setZoom(DefaultZoom);
  // }
//  const iREF = useRef<HTMLIFrameElement>(null)


  // console.log(State.getStatesOfCountry("IN"));
  
    // const [address, setaddress] = useState({
    //     adddressLine1:"",
    //     adddressLine2:"",
    //     phoneNumber:0,
    //     pinCode:0,
    //     state:"",
    //     city:"",
    //     email:"",
    //     country:'',

    //     })



        // const onChangehander=(e:ChangeEvent<any>)=>{
        //   setaddress({...address,[e.target.name]:e.target.value})
        // }
        
        // console.log(address);
        // const shippingInfoSubmit= (e:React.FormEvent<HTMLFormElement>)=>{
        //     e.preventDefault()
           
        
        // }

       const formik  = useFormik({
        initialValues:{
          adddressLine1:"enter first address line",
          adddressLine2:"enter first address line",
          phoneNumber:222222222,
          pinCode:382001,
          state:"",
          city:"",
          email:"sample@sample.com",
          country:''
   
        },
        validationSchema:validationSchema,
        validate:(_values)=>{
          const errors:any ={}
          
         
          return errors
        },
         
      onSubmit: (values) => {
        console.log("sbmittingumit");
          let addingLangLatData =values.adddressLine2 + `,   longitude:${longlatdata.lng}, lattitude:${longlatdata.lat}`
          values.adddressLine2 = addingLangLatData
          console.log({values});
         localStorage.setItem("shippingInfo",JSON.stringify(values))

         navigate("/payment")
      },
      
            

       })

      //  console.log(formik);





    //    useEffect(()=>{
    //     const ifameData =document.getElementById("iframeId")  as HTMLIFrameElement
    //     const lat= defaultLocation.lat || 1.305385 ;
    //     const lon=  defaultLocation.lng || 30.923029;
    //     if(ifameData){
    //       ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`


    //     }
    // //  console.log("src form ifgramadea===",ifameData.src);
      
    // }, [defaultLocation.lat, defaultLocation.lng])


    // const x = document.getElementById("demo");

  
    // function getLocation() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition);
    //     // console.log(  navigator.geolocation.getCurrentPosition());
    //   } else {
    //     x!.innerHTML = "Geolocation is not supported by this browser.";
    //   }
    // }
    // function showPosition(position:any) {

    //   x!.innerHTML = "Latitude: " + position.coords.latitude +
    //   "<br>Longitude: " + position.coords.longitude;
    //   setDefaultLocation({lat:position.coords.latitude, lng:position.coords.longitude})

    // }
  
   
    // useEffect(() => {
    //  if(x){
    //   getLocation()
    //  }
   
     
      
    // }, [])
      
 
  
    ///////////////////////////


    
  return (
      <div className="shippingInfo_main">
           <Helmet>
        <title>Shipping page</title>
       
      </Helmet>
        <Typography>Add Shipping Info</Typography>

        <Box component={"form"} onSubmit={formik.handleSubmit} display={"flex"} justifyContent={"center"} flexDirection={"column"}>
<TextField
placeholder="Address line 1 " 
type ="text"
sx={{mt:2}}
fullWidth
name ="adddressLine1"
value={formik.values.adddressLine1}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
error={formik.touched.adddressLine1 && Boolean(formik.errors.adddressLine1)}
helperText={formik.touched.adddressLine1 && formik.errors.adddressLine1 || "enter adddressLine1 "}
 />



<TextField
placeholder="contact email address" 
type ="text"
sx={{mt:2}}
fullWidth
name ="email"
value={formik.values.email}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
error={formik.touched.email && Boolean(formik.errors.email)}
helperText={formik.touched.email && formik.errors.email || "enter email "}
 />

 
<TextField
placeholder="Address line 2 " 
type ="text"
sx={{mt:2}}
fullWidth
name ="adddressLine2"
value={formik.values.adddressLine2}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
error={formik.touched.adddressLine2 && Boolean(formik.errors.adddressLine2)}
helperText={formik.touched.adddressLine2 && formik.errors.adddressLine2 || "enter adddressLine2 "}
 />

<TextField
placeholder="phoneNumber  " 
type ="number"
sx={{mt:2}}
fullWidth
name ="phoneNumber"
value={formik.values.phoneNumber}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
helperText={formik.touched.phoneNumber && formik.errors.phoneNumber || "enter phoneNumber "}
 />
<TextField
placeholder="Pincode  " 
type ="number"
sx={{mt:2}}
fullWidth
name ="pinCode"
value={formik.values.pinCode}
onChange={formik.handleChange}
onBlur={formik.handleBlur}
error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
helperText={formik.touched.pinCode && formik.errors.pinCode || "enter pinCode "}
 />




<FormControl sx={{ m: 1 , minWidth:"70vw"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          // value={formik.values.category}
          // onChange={handleSelectChange}
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          // helperText={formik.touched.category && formik.errors.category || "enter product category"}
          // autoWidth
          fullWidth
            
        
          label="country"
          name='country'
        >

          {Country.getAllCountries().map((cat)=>(
            <MenuItem key={cat.name} value={cat.isoCode} >
              {cat.name}
            </MenuItem>
          )) }
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem> */}


          
        </Select>
       <span color={themer.palette.error.main}  > <FormHelperText error >{formik.errors.country}</FormHelperText></span>
      </FormControl>

{formik.values.country!=="" && <FormControl sx={{ m: 1 , minWidth:"70vw"}}>
        <InputLabel id="demo-simple-select-autowidth-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          // value={formik.values.category}
          // onChange={handleSelectChange}
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          // helperText={formik.touched.category && formik.errors.category || "enter product category"}
          // autoWidth
          fullWidth
            
        
          label="state"
          name='state'
        >

          { State.getStatesOfCountry(formik.values.country).map((cat)=>(
            <MenuItem key={cat.name} value={cat.isoCode} >
              {cat.name}
            </MenuItem>
          )) }
  

          
        </Select>
       <span  color={themer.palette.error.main}  > <FormHelperText error >{formik.errors.state}</FormHelperText></span>
      </FormControl>
}


{formik.values.state!==""  && <FormControl sx={{ m: 1 , minWidth:"70vw"}}>
        <InputLabel id="demo-simple-select-autowidth-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          // value={formik.values.category}
          // onChange={handleSelectChange}
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          // helperText={formik.touched.category && formik.errors.category || "enter product category"}
          // autoWidth
          fullWidth
            
        
          label="city"
          name='city'
        >

          { formik.values.state && City.getCitiesOfState(formik.values.country, formik.values.state).map((cat)=>(
            <MenuItem key={cat.name} value={cat.name} >
              {cat.name}
            </MenuItem>
          )) }
  

          
        </Select>
       <span  color={themer.palette.error.main}  > <FormHelperText error >{formik.errors.city}</FormHelperText></span>
      </FormControl>
}




<Button  variant="contained" type="submit" disabled={false}
     sx={{mt:2}}
     
     fullWidth
     >
      Proceed to checkout
     </Button>

<Box>
<hr />

<Typography>Pick location on Map</Typography>
<Typography>{`longitude:${longlatdata.lng}, lattitude:${longlatdata.lat}`}</Typography>
<TextField placeholder="Map Query" value={query} onChange={e=>setquery(e.target.value)} fullWidth/>
<Box>

<div ref={mapElement} className="mapDiv"  />
</Box>


  
<hr />
{/* <Typography>GET location on Map</Typography> */}
{/* 
  <div id="map"></div>
  <hr />
  <iframe id="iframeId" height="500px" width="100%" ref={iREF}></iframe> */}

</Box>


        </Box>

        

      </div>
  )
}

export default ShippingIInfo