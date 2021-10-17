import { Dimmer, Image, Menu, Segment, Sidebar, Loader } from 'semantic-ui-react'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"


function Loading() {
    let loading = true
    return(
 <div id="loader">
<div id="loader-animation">
<ClimbingBoxLoader  color={'#3699D7'}
                  loading={loading}
                  // css={override}
                  size={30} 
         />
         </div>
         <span>Loading</span>
 </div>
         
      //   <Segment id="loader">
      //   <Dimmer active>
      //     <Loader />
      //   </Dimmer>
    
      //   <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      // </Segment>
    )
}

export default Loading