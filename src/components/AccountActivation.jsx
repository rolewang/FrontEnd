import React, {useState, useEffect} from "react";
import { useParams, Route, Switch, Redirect, useHistory } from "react-router-dom";
import {Message} from 'semantic-ui-react'





function AccountActivation({fetchUrl, localFetchUrl}) {
    const [serverResponse, setServerResponse] = useState("")
    let {id}  = useParams()
    const history = useHistory();

    // console.log(id)
    const queryString = window.location.search
    const email = new URLSearchParams(queryString).get('email');
    if (serverResponse.length < 1) {
        setTimeout(() => sendOthToken(), 200)
    }
   
function sendOthToken() {
    fetch(`${localFetchUrl}/account_activations`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({id: id, email: email}),
      })
        .then((r) => r.json())
        .then((message) =>  { return( setServerResponse(message.message))});

      //history.push('/SignIn')
      // window.location.reload();
}







    return(
        <>
                {serverResponse
        ?
        <Message positive id="placeOrder-message">
        <Message.Header>{serverResponse}</Message.Header>
        </Message>:null}

        <Message info id="placeOrder-message">
    <Message.Header>whan your account is activated You'll have full access to all the features on the side</Message.Header>
    <p>Once account is activated go ahead and login</p>
  </Message>
      
        
        </>
    )
}

export default AccountActivation