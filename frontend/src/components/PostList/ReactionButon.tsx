import React from 'react'
import { PostStateType, reactionAdded } from '../../redux/reducers/postSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Box, Button } from '@mui/material'



interface reactionEmojiType{
    thumbsUp: string;
    wow: string;
    heart: string;
    rocket: string;
    coffee: string;
    
}
const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

interface ReactionButonTypeProps{
    post:PostStateType
}

interface ReactoreType{
    id:string
}
let Reactore:any = ({id}:ReactoreType)=>{
    const dispatch = useDispatch<AppDispatch>()


    return(
        <Button  sx={{background:"black", width:"10%"}} onClick={()=>{
            dispatch(reactionAdded({postId:id, reaction:"thumbsUp"}))
        }}> thmnhs</Button>
    )
}



// const customComparator2 = (prevProps:ReactoreType, nextProps:ReactoreType) => {
//     //  if(JSON.stringify(nextProps.post.reactions.thumbsUp)=== JSON.stringify(prevProps.post.reactions.thumbsUp)){
     
     
//     return nextProps !== prevProps;
//   };




Reactore = React.memo(Reactore )


let ReactionButon:any = ({post}:ReactionButonTypeProps) => {
    // console.log("posts == ",post)
  
// console.log("rerender reation butn")

    const dispatch = useDispatch<AppDispatch>()
    const reactionsButtons = Object.entries(reactionEmoji).map(([name  , emoji])=>(
        <Box key={name} 
         sx={{display:"flex", flexDirection:"row", maxHeight:"85%", justifyContent:"center", alignItems:"center"}}
        // sx={{width:"10vw", }}
        
        >
        <button
        
        key={name}
        // type="button"
        onClick={()=>{
            dispatch(reactionAdded({postId:post.id, reaction:name}))
        }}
        >
    {emoji}{post.reactions[name as keyof reactionEmojiType ]}
        </button>
     {/* <Reactore id={post.id}/> */}
        </Box>
    ))

  return (
    <Box key="dfddf">{reactionsButtons}</Box>
  )
}




const customComparator = (prevProps:ReactionButonTypeProps, nextProps:ReactionButonTypeProps) => {
    //  if(JSON.stringify(nextProps.post.reactions.thumbsUp)=== JSON.stringify(prevProps.post.reactions.thumbsUp)){
     if(nextProps.post.reactions.thumbsUp=== prevProps.post.reactions.thumbsUp){
        //    console.log("prevProps.post.reactions.thumbsUp",prevProps.post.reactions.thumbsUp)
        //    console.log("nextProps.post.reactions.thumbsUp",nextProps.post.reactions.thumbsUp)

        // console.log("equal")
     }else{
        // console.log("unequal")
        
     }
     
    return nextProps.post.reactions === prevProps.post.reactions;
  };

ReactionButon = React.memo(ReactionButon,customComparator )

export default ReactionButon