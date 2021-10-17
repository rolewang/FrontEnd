import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'


function DownloadUsers({localFetchUrl, categoriesList, setTriggerRerender, users, setUsers}) {
    
   
    const [loaded, setLoaded] = useState(false)
    const csvLink = useRef()

   if (!loaded) {
       setLoaded(true)
        fetch(`${localFetchUrl}/users`,{
            credentials: "include",
        })
    .then(res => res.json())
    .then(usersData => {setUsers(usersData)})
   }



    function handleClick(e) {
        if (users.length > 0) {
            csvLink.current.link.click()
            console.log('just clicked ')
        }
    }
  

   const headers = [
        { label: "name", key: "name" },
        { label: "email", key: "email" },
        { label: "phone_number_1", key: "phone_number_1" },
        { label: "phone_number_2", key: "phone_number_2" },
        { label: "admin", key: "admin" },
        { label: "activated", key: "activated" },
        { label: "password", key: "password"}
      ];

    
    let data = []

    data = users.map((user, index) => { return (
      { name: user.name,
       email: user.email,
       phone_number_1: user.phoneNumber1 ,
       phone_number_2: user.phoneNumber2,
       admin: user.admin ? 'TRUE': 'FALSE',
       activated: user.activated ? 'TRUE': 'FALSE',
        }
    )
  
    })
    console.log(data)

    return(
        <>

<Grid.Column width={4} style={{margin: ''}}>
    
        <Button content='Downloed Users.csv' color='facebook' onClick={handleClick} className={ users.length < 1 ? 'disabled' : null } />
   
        
        <CSVLink
            data={data}
            filename="users.csv"
            className='hidden'
            ref={csvLink}
            headers={headers}
            target='_blank'
        />
 </Grid.Column>
      </>
    )
 


}

export default DownloadUsers