import React, { Component, useRef, useState } from 'react';
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import {Form, Label ,Modal, Message, Accordion, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar, Input } from 'semantic-ui-react'
import StripeCheckout from 'react-stripe-checkout'
import {StripeProvider, Elements} from 'react-stripe-elements';

function Donate({ localFetchUrl, }) {

    const buttonRef = useRef();
    const [product, setProduct] = useState({name: 'Donation', price: null})
    const [message, setMessage] = useState('')

    function handleChange(e, data) {
        console.log(e.target.value)
        setProduct({...product, price: e.target.value })
    }




    function handleToken(token, addresses) {
        console.log({ token, addresses })
        token['amount'] = product.price
        fetch(`${localFetchUrl}/charges`, {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, addresses, }),
        })
            .then((r) => r.json())
            .then((data) => {
            console.log(data);
            setMessage(data.message)
            })
            // .catch((err) => {
            //   console.log(err)
            // }) 
    }
    return(


       
<>

<h1 class="constroction">this page is currntly under development</h1>



{/* <Input labelPosition='right' type='number' placeholder='Amount' onChange={handleChange} value={product.price}>
    <Label basic>$</Label>
    <input />
    <Label>.00</Label>
  </Input>

       <div>
        <StripeCheckout 
          stripeKey="pk_test_51JFLXwAGIFi71zekn2ka7VNBoW9eYECrLkacNfLvyBxCQXFiEYAWk0T36VlKDVgM9udRONAWASUqWEMcuLgISkzK006yKpNAlG"
          token={handleToken}
        //   billingAddress
          amount={product.price * 100}
          label="Donate"
        > 
 <Button inverted color='blue'>
        Donate
      </Button>
</StripeCheckout>
        </div> */}
        



    {/* <StripProvider apiKey="pk_live_51JFLXwAGIFi71zeksb8KwMaJBmBl73CRHpOCVqLMdww2wTRpunpv2zZKbQ0Tr3ViT7dPjcIx0YRD0Fgdrshm5Vg800ksPDdpzZ">
 <div>
     <Elements>
         <PaymentForm />
     </Elements>
 </div>
  </StripProvider> */}

       </>
    )
}

export default Donate