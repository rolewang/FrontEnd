import React, {useState, useEffect} from "react";
import {Form, Label, Loader, Dimmer ,Modal, Message, Accordion, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Link, useHistory } from "react-router-dom";


function SignIn({ setCurrentUser, autoLogin, fetchUrl, localFetchUrl }) {
    const [formData, setFormData] = useState({email: "", password: "", remember_me: false})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory();

    function handleChange(e, data) {
      if (data.name === 'checkbox') {
        setFormData({...formData, remember_me: data.checked })
      }else{
        setFormData({...formData, [e.target.name]: e.target.value })
      }
        // console.log(formData)
    }



    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        fetch(`${localFetchUrl}/login`, {
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
            setIsLoading(false)
            setError(data.message)
            printError(data)
            const { user } = data;
            setCurrentUser(user);
            redirect(data)
            }).catch((err) => {
              console.log(err)
              setIsLoading(false)
            }) 
        }
function redirect(data) {
  if (data.user) {
    history.push("/")
  }

}
        // add the error message commit form the server to state to be render as a message
        function printError(data) {
          if (data.error) {
            // console.log(data.error)
            setError(data.error)
            console.log(error)
          }
        }
    return(
<>

{error
?
<Message negative id="placeOrder-message">
  <Message.Header>{error}</Message.Header>
</Message>:null}



<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        {/* <Image src='/logo.jpg'  avatar/> */}
         Log-in to your account
      </Header>

      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' name="email" placeholder='E-mail address' value={formData.email} onChange={handleChange}/>
          <Form.Input fluid icon='lock' iconPosition='left' name="password" placeholder='Password' type='password' value={formData.password} onChange={handleChange}/>
          <Checkbox style={{marginRight: '43%'}} name="checkbox" label='Remember me on this computer'  onChange={handleChange}/>
  
          <Button loading={isLoading} style={{marginTop: '10px'}} type='submit' color='teal' fluid size='large'>Login</Button>
 
        </Segment>
        
      </Form>

      <Message as={Link}  to="/SignUp" style={{ width: '50%' }}>
        Do not have an account? <a href='#'>Sign Up</a>
      </Message>
      <Message as={Link}  to="/ForgotPassword" style={{ width: '50%' }}>
         <a href='#'>Forgot Password</a>
      </Message>
    </Grid.Column>
  </Grid>














 
        </>
    )
}

export default SignIn