import { useEffect, useState} from "react";
import { useParams,useLocation, useHistory } from "react-router-dom"
import { List ,Label, Button, Divider ,Header, Icon, Segment, Message, Loader } from 'semantic-ui-react'
import CartItem from "./CartItems";
import Loading from "./Loading"


// THE Issue with the cart seems to be stemming from the way the cart items are being stored in state

function ShoppingCart({currentUser, triggerRerender, setTriggerRerender, autoLogin, fetchUrl, localFetchUrl, categoriesList}) {
        let { id } = useParams()
        const [cart, setCarts] = useState([])
        const [submitted, setSubmitted] = useState(false)
        // const [triggerRerender, setTriggerRerender] = useState(false)
        let [cartTotal, setCartTotal] = useState(0)
        const [deadline, setDeadLine] = useState('')
        const [countDown, setCountDown] = useState(getTimeRemaining(deadline))
        const history = useHistory();
        const [isLoading, setIsLoading] = useState(true)
        
        let user_id = JSON.parse(localStorage.getItem("user_id"))
        const category_id = JSON.parse(localStorage.getItem("shoppingCart_id"))
        const admin_search_user_id = JSON.parse(localStorage.getItem('admin_search_user_id'))
        // console.log(deadline)
        // console.log(countDown, "this is the seconds")
        if (admin_search_user_id) {
          user_id = admin_search_user_id
        }

        useEffect(() => {
            getCart(user_id, category_id)   // id is the  category id 
                           // for the fetch to only return the cart for that user and a given category
        }, [triggerRerender])


     useEffect(() => {
      if (deadline.length > 7) {
        // console.log(deadline)
        setCountDown(getTimeRemaining(deadline))
        initializeClock(deadline)
      }
     },[deadline])
     
        


       if (categoriesList.length > 0 && deadline === '') {
        let thisCategory = categoriesList.filter(category => category.id === category_id)
        setDeadLine(thisCategory[0].deadline.slice(0, 10))
       }
      
        
       

    function getCart(userId, categoryId) {
        setIsLoading(true)
        fetch(`${localFetchUrl}/cart`,{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user_id: userId, category_id: categoryId}),
        })
        
        .then(res => res.json())
        .then((resCart) => { return (
            // wasSubmitted(resCart),
            // setCartTotal(resCart[0].order.total),
            console.log(resCart),
            setIsLoading(false),
            handleExceptions(resCart)
        )}).catch((err) => {
          console.log(err)
          setIsLoading(false)
        }) 
    }

    function handleExceptions(resCart) {
   
   
    if (!resCart[0]) {
      return(<h1></h1>)
    }
      if (resCart.length < 1) {
        
      }else{
       
        setCartTotal(resCart[0].order.total)
        wasSubmitted(resCart)
      }
    }


    function handleClick() {
    
        setSubmitted(!submitted)
        fetch(`${localFetchUrl}/submit`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: cart[0].order.id, user_id: user_id })
        })
        .then(res => res.json())
      
        .catch((err) => console.error(err))
    }

    // this fuction will make sure the place order or cancel order button will display the corect state even if the page is refreshed
    function wasSubmitted(resCart) {
        if (resCart.length > 0) {
            if (resCart[0].order.submitted) {
            // console.log('it was submitted')
            setSubmitted(true)
            setCarts(resCart)
        }else{
            setCarts(resCart)
            setSubmitted(false)
        }}}


    function handleDelete(id){
            fetch(`${localFetchUrl}/order_details/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                      // Authorization: `Bearer ${localStorage.token}`
                }
            })
            .then(res => res.json())
            .then((response) => {return(
                setTriggerRerender(!triggerRerender),
                console.log(response.amount_remaining),
                redirect(response)
                )} )
    }

    function redirect(response) {
      if (response.amount_remaining < 1) {
        history.push("/")
        window.location.reload();
      }
    }

                
function handleQuantityChange(id, newQuantity) {
    // console.log('in quantityChange', id, newQuantity)
    fetch(`${localFetchUrl}/order_details/${id}`,{
        method: "PATCH",
        credentials: "include",
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify({quantity: newQuantity})
      })
      .then(res => res.json())
      .then(data => setTriggerRerender(!triggerRerender))
    //   .then((newItemDetail) => console.log(newItemDetail))
}




//   START OF TIMER CODE



function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function initializeClock(deadline) {
    
    function updateClock() {
      const t = getTimeRemaining(deadline);
      setCountDown({...countDown, days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds})
  
        if (t.total <= 0 || submitted === true) {
          clearInterval(timeinterval);
        }
    }
  
    // updateClock();
    const timeinterval = setInterval(updateClock, 60000);
  
  }


// initializeClock(deadline)



// END OF TIMER CODE
    
    

   



    let cartItemFragment = ""
    if (cart.length > 0) {
        cartItemFragment = cart
        .sort(function(a, b) {
          if(a.id < b.id) return -1;
          if(a.id > b.id) return 1;
          return 0;
         })
        .map(order =>
            <CartItem key={order.name} cartItem={order} setCarts={setCarts} 
                    handleDelete={handleDelete} handleQuantityChange={handleQuantityChange}
                     cartTotal={cartTotal} setCartTotal={setCartTotal}
                     submitted={submitted} currentUser={currentUser} deadline={deadline}/>)
    }

    if (cartItemFragment === ""  && isLoading === false) {
        return( 
          <Message  negative id="placeOrder-message">
          <Message.Header> it seems this cart is empty try choosing a different cart category or adding items to this one</Message.Header>
        </Message>
      )
    }

    if (isLoading) {
      return(<Loading></Loading>)
    }


    return(

        <>
{submitted ? 
<Message positive id="placeOrder-message">
    <Message.Header>Order has been received and is in line for proceeding</Message.Header>
    <p>
      Order my be edited or canceled until  <b> {deadline}</b>.
    </p>
  </Message>
: null}

<div id="checkout_page">


<div id="checkout_page-items" class="col" >

<Header id="itemHeader" >{cart.length} Items</Header>
        
            <Segment style={{marginLeft: '2%', width: '70%'}}  id={submitted ? 'cart-submitted': null}  placeholder floated="left">
            {cartItemFragment}
            </Segment>

      </div>
   
            {/* box-shadow: 5px 10px #bae6bf */}

   <div id="checkout_page-summery" class="col">

           {/* id="checkOut-header" */}
           
            <Header textAlign="center"  > Order summery</Header>
            {/* id="checkOut-divider" */}
            <Divider  />
            <div className='checkOutDiv' class="col">

              <div  class="textbox">
                    <p class="alignleft">Merchandise:</p>
                    <p class="alignright">${parseFloat(cartTotal.toFixed(4))}</p>
             </div>


             <div class=" pickUp  textbox">
             <p  class="alignleft">Pick Up:</p>
             <p class="alignright">FREE</p>
             </div>

             <div class="textbox">
                <b><p class="alignleft" >SUB TOTAL:<Icon name='question circle outline' /></p></b>
                <b> <p class="alignright">${parseFloat(cartTotal.toFixed(4))}</p></b>
             </div>

            
             <div class="buttonDiv">
              
             <Button  className={countDown.minutes <=0 && countDown.seconds <=0 && !currentUser.admin ? 'disabled': null}
              color={submitted ? 'red': 'green'} onClick={handleClick}>
            {submitted  ?
             < Button.Content  id="placeOrder"  visible>Cancel order</Button.Content>:
             < Button.Content  visible>Place Order</Button.Content>
            }
            </Button>

         

            {!submitted ?     <div class='countDownTimerDiv'>
            <h4 class="checkoutTimeLeft"> <b id="timer-digits">{countDown.days}</b> days <b id="timer-digits">{countDown.hours}</b> hours  <b id="timer-digits">{countDown.minutes} </b> minutes      left to place order</h4> 
            </div>: null}
        
            
             </div >

            </div>



            </div>
            {/* checkout_page-summery */}
            </div> 
            {/* checkout_page   */}
        </>
    )
}

export default ShoppingCart

{/* <b id="timer-digits-seconds">{countDown.seconds}</b> sec */}




 
