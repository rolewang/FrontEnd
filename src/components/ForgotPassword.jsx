import React, {useState, useEffect} from "react";
import {Form, Label ,Modal, Message, Accordion, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Link, useHistory } from "react-router-dom";




function ForgotPassword({localFetchUrl}) {    

    const [formData, setFormData] = useState({email: ""})      
    const [serverResponse, setServerResponse ] = useState('') 
         
    function handleChange(e, data) {          
        setFormData({...formData, [e.target.name]: e.target.value })         
      }           

      function handleSubmit(e) {
        e.preventDefault();
        fetch(`${localFetchUrl}/password_resets`, {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then((data) => {
            console.log(data);
            // setError(data.message)
            // printError(data)
            const { user } = data;
            // localStorage.token = token;
            // save the user in state in App
            setServerResponse(data.message)
            }).catch((err) => {
              console.log(err)
            });
        }



    return(

      <>

{serverResponse
?
<Message negative id="placeOrder-message">
  <Message.Header>{serverResponse}</Message.Header>
</Message>:null}


    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png'  avatar/> Enter password for rest link
      </Header>

      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' name="email" placeholder='E-mail address' value={formData.email} onChange={handleChange}/>
          {/* <Form.Input fluid icon='lock' iconPosition='left' name="password" placeholder='Password' type='password' value={formData.password} onChange={handleChange}/>
          <Checkbox style={{marginRight: '43%'}} name="checkbox" label='Remember me on this computer'  onChange={handleChange}/> */}
          <Button style={{marginTop: '10px'}} type='submit' color='blue' fluid size='large'>Submit</Button>
        </Segment>
      </Form>

      {/* <Message as={Link}  to="/SignUp" style={{ width: '50%' }}>
        Do not have an account? <a href='#'>Sign Up</a>
      </Message>
      <Message as={Link}  to="/ResetPassword" style={{ width: '50%' }}>
         <a href='#'>Forgot Password</a>
      </Message> */}
    </Grid.Column>
  </Grid>
</>

    )
}

export default ForgotPassword