import React, {useState, useEffect} from "react";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'
import { Link, useHistory } from "react-router-dom";


function DeleteCategory({categoriesList, setServerResponse, localFetchUrl}) {
 const [itemsToDelete, setItemsToDelete] = useState([])

function handleDelete(e, data) {
    e.preventDefault();
    fetch(`${localFetchUrl}/categories`, {
        method: "DELETE",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({itemsToDelete}),
    })
        .then((r) => r.json())
        .then((data) => {
        console.log(data);
        const { user } = data;
        setServerResponse(data.message)
        }).catch((err) => {
          console.log(err)
        });
}

function handleChange(e, data) {
    console.log(data.value)
    setItemsToDelete([data.value])
}



let dropOptions = ""
if (categoriesList.length > 0) {
   dropOptions =  categoriesList.map(categorys => { return  { key: categorys.id, text: categorys.name, value: categorys.id }})
}

// console.log(itemsToDelete, 'items to be deleted')
    return(
        <Grid textAlign='center' style={{ height: '30vh', marginTop: '20%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 550 }}>
          <Header as='h2' color='blue' textAlign='center'>
            Delete Category
          </Header>
    
          <Form size='large' onSubmit={handleDelete}>
            
    
            < Dropdown
            style={{marginBottom: "1rem"}}
            clearable
            fluid
            multiple
            search
            selection
            options={dropOptions}
            name="category"
            onChange={handleChange}
            placeholder='Select Category'
            />
              <Button style={{marginTop: '10px'}} type='submit' color='blue' fluid size='large'>Delete Category</Button>
          
          </Form>
        </Grid.Column>
      </Grid>
    )
  
}

export default DeleteCategory