import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Input, Menu, Message, Card, Button, Divider, Form, Grid, Segment, Transition } from 'semantic-ui-react'
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useScrollPosition } from '@n8tb1t/use-scroll-position'


import CategorieItems from './CategorieItems'



function CategorieList({categoriesList, setCategories, currentUser, fetchUrl, localFetchUrl}) {
            const history = useHistory();
            const [visible, setVisible] = useState(false)
            const [message, setMessage] = useState(false)
          

useEffect(()=> {
   Aos.init({ duration: 3000 })
}, [])

let wasActivated = false
useScrollPosition(({ prevPos, currPos }) => {
   // console.log(currPos.x, 'this is the X')
   // console.log(currPos.y, 'this is the Y')
   // console.log(currPos.y < -300)
 
   if (currPos.y < -300 && !wasActivated ) {
      setVisible(true)
      wasActivated = true
   
   }
 }

 )

 function handleDonate(e) {
    history.push('/Donate')
 }

//  const changeBackground = () => {
//     console.log(window.scrollY)
//  }
//  window.addEventListener('scroll', changeBackground)


if (categoriesList.length < 1) {
   return( <h1></h1>)
}

if (categoriesList.message) {
   console.log(categoriesList.message, '***in second if***')
   // history.push('/SignIn')
   // window.location.reload();
   return( <h1></h1>)
}
const categories = categoriesList.map( (cat, index) => {
        return(<CategorieItems key={cat.id}
            categories={cat}
            currentUser={currentUser}
            localFetchUrl={localFetchUrl}
            fetchUrl={fetchUrl}
            index={index}
            visible={visible}
            setVisible={setVisible}
            setMessage={setMessage}
            />
            )})

   return(
        <>

{message ?   
    <Message  negative id="placeOrder-message">
            <Message.Header> Pleas login to view products</Message.Header>
          </Message>
: null}
        {/* <Segment id="category-segment-top"></Segment> */}

        <div class="full-hero hero-home">

           <div class="hero-content" data-aos="fade-up">
               <h1>The thanks <span>goes to you!</span></h1>
           </div>

           <a href="#category-segment-middle"> ﹀</a>
        </div>

        <div class="home-callout"></div>

       <Segment id="category-segment-middle">
          <Card.Group itemsPerRow={3} >
        {categories}
    </Card.Group>
       </Segment>

<footer class="footer">
<h3>Here at the <span>rebbe's wholesale shop</span></h3>
<p>we are here to service the teachers who give so much to our community and our future </p>
   <div>
         <Button primary onClick={handleDonate}>Donate</Button>
          <Button style={{marginLeft: "4%"}} secondary>Report A Bug</Button>
</div>
</footer>
       </>      

   ) 
}


export default CategorieList