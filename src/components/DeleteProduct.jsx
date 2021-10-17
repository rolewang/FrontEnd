import React, {useState, useEffect} from "react";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'
import { Link, useHistory } from "react-router-dom";

function DeleteProduct({categoriesList, setServerResponse, localFetchUrl}) {
    const [itemsToDelete, setItemsToDelete] = useState()
    const [items, setItems] = useState([])
    const [fetchedOnce, setFetchedOnce] = useState(false)
    function handleDelete(e, data) {
        e.preventDefault();
        fetch(`${localFetchUrl}/products`, {
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
        // console.log(data.value)
        setItemsToDelete(data.value)
    }
    
    let dropOptions = ""
    if (categoriesList.length > 0) {
       dropOptions =  categoriesList.map(categorys => { return  { key: categorys.id, text: categorys.name, value: categorys.id }})
    }

    let productOptions = ""
    if (items.length > 0) {
        productOptions = items.map((item, index) => { return {key: item.id, text: item.name, value: item.id} })
    }

    if (itemsToDelete && !fetchedOnce) {
      
        setFetchedOnce(true)
        console.log(itemsToDelete, 'fetch all items in this category')
        fetch(`${localFetchUrl}/products/${itemsToDelete}`, {
            method: "GET",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            }
        })
            .then((r) => r.json())
            .then((data) => {
            // console.log(data);
            setItems(data)
            
            }).catch((err) => {
              console.log(err)
            });
    }
    // console.log(items)
     console.log(itemsToDelete, 'items to be deleted')

    return(
        <Grid textAlign='center' style={{ height: '30vh', marginTop: '25%' , marginBottom: '10%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 550 }}>
          <Header as='h2' color='blue' textAlign='center'>
            Delete Product
          </Header>
    
          <Form size='large' onSubmit={handleDelete}>
            
    
            < Dropdown
            style={{marginBottom: "1rem"}}
            clearable
            fluid
            search
            selection
            options={dropOptions}
            name="category"
            onChange={handleChange}
            placeholder='Select A Category'
            />
            {items.length > 0 ? 
             < Dropdown
             style={{marginBottom: "1rem"}}
             clearable
             fluid
             multiple
             search
             selection
             options={productOptions}
             name="category"
             onChange={handleChange}
             placeholder='Select A Product'
             />
            : null}
              <Button style={{marginTop: '10px'}} type='submit' color='blue' fluid size='large'>Delete Product</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
}

export default DeleteProduct
