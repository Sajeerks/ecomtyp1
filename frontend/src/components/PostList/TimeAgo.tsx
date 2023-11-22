
import {parseISO, formatDistanceToNow} from 'date-fns'

interface TimeAgoProps{
    timeStamp? :string
}
 
const TimeAgo = ({timeStamp}:TimeAgoProps) => {
   // console.log({timeStamp})

    let timeAgo =""
     if(timeStamp){
     
      // const  dateprev = new Date(timeStamp).getDay() + "-"+new Date(timeStamp).getMonth() + "-"+new Date(timeStamp).getFullYear() 

      // console.log({dateprev})
        const date = parseISO(timeStamp) 
      //   console.log({date})
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
     }
  return (
     <span title={timeStamp}>
        &nbsp; <i>{timeAgo}</i>

     </span>
  )
}

export default TimeAgo