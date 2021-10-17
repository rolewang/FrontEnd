import React, {useState, useEffect} from "react";
import {Form, Label ,Modal, Message, Accordion, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import {useParams, Link, useHistory } from "react-router-dom";


function ResetPassword({localFetchUrl}) {
    const [formData, setFormData] = useState({password: "", password_confirmation: ""})
    const [serverResponse, setServerResponse ] = useState('')
    
    let {id}  = useParams()

    // console.log(id)
    const queryString = window.location.search
    const email = new URLSearchParams(queryString).get('email');

console.log(email)

    function handleChange(e, data) {
        setFormData({...formData, [e.target.name]: e.target.value })
      }

      function handleSubmit(e) {
        e.preventDefault();
          ResetPassword()
        }


    
function ResetPassword() {

    fetch(`${localFetchUrl}/password_resets`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({id: id, email: email, password: formData.password, password_confirmation: formData.password_confirmation}),
      })
        .then((r) => r.json())
        .then((message) => setServerResponse(message.message));
      // history.push('/SignIn')
      // window.location.reload();
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
        <Image src='/logo.png'  avatar/> Reset password
      </Header>

      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
           <Form.Input fluid icon='lock' iconPosition='left' name="password" placeholder='Password' type='password' value={formData.password} onChange={handleChange}/>
           <Form.Input fluid icon='lock' iconPosition='left' name="password_confirmation" placeholder='Confirm Password' type='password' value={formData.password_confirmation} onChange={handleChange}/>
          {/*<Checkbox style={{marginRight: '43%'}} name="checkbox" label='Remember me on this computer'  onChange={handleChange}/> */}
          <Button style={{marginTop: '10px'}} type='submit' color='teal' fluid size='large'>Reset Password</Button>
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

export default ResetPassword