import React, { useRef, useState } from "react";
import {useParams, Link, NavLink, useHistory } from "react-router-dom";
import {Message, Form, Dropdown, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar, Loader } from 'semantic-ui-react'
import CreateItems from "./CreateItems";
import Loading from "./Loading"


function Profile({fetchUrl, localFetchUrl, currentUser}) {
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const wasTrigerded = useRef(false)
    const [serverResponse, setServerResponse] = useState("")
    const [formData, setFormData] = useState({email: "", name: "", phone1: "", phone2: ""})

    let { id } = useParams()
        

    

    if (currentUser) {
        if (currentUser.admin && currentUser.id != parseInt(id) && wasTrigerded.current === false) {
            wasTrigerded.current = true
             fetchUsersData()
        }
        if (currentUser.id === parseInt(id) && wasTrigerded.current === false) {
          wasTrigerded.current = true
          autoFillCurentUserData()
        }
    }
  


    async function fetchUsersData() {
         setIsLoading(true)
        const response = await fetch(`${localFetchUrl}/users/${id}`,{
                credentials: "include",
                  })
            .then(res => res.json())
            .then(userArray => 
          {
                return (
                setUserData(userArray), setIsLoading(false), console.log(userArray), autoFillData(userArray))})
            }

             
function autoFillData(userArray) {
  setFormData({...formData, email: userArray.email, name: userArray.name, phone1: userArray.phoneNumber1, phone2: userArray.phoneNumber2})

}
 
 function  autoFillCurentUserData() {
  setFormData({...formData, email: currentUser.email, name: currentUser.name, phone1: currentUser.phoneNumber1, phone2: currentUser.phoneNumber2})
 }


    function handleChange(e) {
        console.log(e.target.name)
        setFormData({...formData, [e.target.name]: e.target.value })
    }

 

    function handleSubmit(e) {
      e.preventDefault();
    
      setIsLoading(true)
      fetch(`${localFetchUrl}/users/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((r) => r.json())
        .then((data) => {
          console.log(data)
          setServerResponse(data.message);
          if (data.error) {
            console.log(data.exception)
            setServerResponse(data.exception.slice(50, -1))
          }
        // setCurrentUser(user);
        setIsLoading(false)
        }).catch((err) => {
          console.log(err)
          setIsLoading(false)
          setServerResponse("sorry we encounterd an error. Changing the email might fix it")
        }) 
    }


    return(
      <>
      {serverResponse
    ?
  <Message positive id="placeOrder-message">
    <Message.Header>{serverResponse}</Message.Header>
  </Message>:null
    }

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 550 }}>
          <Header as='h2' color='teal' textAlign='center'>
          Profile Data
          </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
               <Form.Input name="name" type='text'  placeholder='Full Name' value={formData.name} onChange={handleChange}/>
              {/* <Form.Input name="email" type='email' fluid icon='user' iconPosition='left'  placeholder='E-mail address' value={formData.email} onChange={handleChange} /> */}
              <Form.Group >
           <Form.Input name="phone1" type='tel'  placeholder='Phone#1    1234564567' pattern="[0-9]{3}[0-9]{3}[0-9]{4}" width={8} value={formData.phone1} onChange={handleChange} />
             <Form.Input name="phone2" placeholder='Phone#2      1234564567' pattern="[0-9]{3}[0-9]{3}[0-9]{4}" width={8} value={formData.phone2} onChange={handleChange} />
            </Form.Group>
            <Button loading={isLoading} type='submit' color='teal' fluid size='large'>Update Profile</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
            </>
    )

}

export default Profile