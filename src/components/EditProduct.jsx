import React, {useState, useEffect} from "react";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'

function EditProduct({localFetchUrl, setServerResponse, categoriesList }) {

    const [formData, setFormData] = useState({name: "", company: "", category_name: "", price: "", limit: "",  image: ""})    
    const [category, setCategory] = useState()  


 
    const [itemToUpdate, setItemToUpdate] = useState([])
    const [items, setItems] = useState([])
    const [fetchedOnce, setFetchedOnce] = useState(false)

    
    useEffect(() => {
        fetch(`${localFetchUrl}/products/${category}`, {
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
    }, [category])


console.log(itemToUpdate[0])
if (itemToUpdate.length > 0) {
    console.log(items)
    let itemData = items.filter(item => item.id === itemToUpdate[0])
    let name = itemData[0].name
    let company = itemData[0].company
    let price = itemData[0].limit
    let image = itemData[0].image
}
    
    function handleFormChange(e) {
        console.log(e.target.value)
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
        function handleSubmit(e) {
        e.preventDefault();
        console.log(itemToUpdate)
        fetch(`${localFetchUrl}/products/${itemToUpdate[0]}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then((data) => {
            console.log(data);
            setServerResponse(data.message)
            }).catch((err) => {
              console.log(err)
            });
        }



    function handleCategoryChange(e, data) {
        setCategory(data.value)

        // setFormData({...formData, name: name, deadLine: deadLine, picture: image })
    }

    


    function handleItemChange(e, data) {
        setItemToUpdate([data.value])

        let itemData = items.filter(item => item.id === data.value)
        let name = itemData[0].name
        let company = itemData[0].company
        let limit = itemData[0].limit
        let image = itemData[0].image
        let price = itemData[0].price
        
        setFormData({name: name, company: company, price: price, limit: limit,  image: image, })
        console.log(itemData)
        if (!data.value) {
            setItemToUpdate(false)
        }
    }
    
    let dropOptions = ""
    if (categoriesList.length > 0) {
       dropOptions =  categoriesList.map(categorys => { return  { key: categorys.id, text: categorys.name, value: categorys.id }})
    }

    let productOptions = ""
    if (items.length > 0) {
        productOptions = items.map((item, index) => { return {key: item.id, text: item.name, value: item.id} })
    }



    return(

        <Grid textAlign='center' style={{ height: '30vh', marginTop: '20%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 550 }}>
          <Header as='h2' color='green' textAlign='center'>
            Edit Product
          </Header>
     <Segment stacked>
          <Form size='large' onSubmit={handleSubmit}>
            
    
            < Dropdown
            style={{marginBottom: "1rem"}}
            clearable
            fluid
            search
            selection
            options={dropOptions}
            name="category"
            onChange={handleCategoryChange}
            placeholder='Select A Category'
            />
            {category ? 
             < Dropdown
             style={{marginBottom: "1rem"}}
             clearable
             fluid
            //  multiple
             search
             selection
             options={productOptions}
             name="category"
             onChange={handleItemChange}
             placeholder='Select A Product'
             />
            : null}
            {itemToUpdate && itemToUpdate.length > 0 ? 
            <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
            <Form.Group >
           <Form.Input name="name"  placeholder='Product Name' width={8} value={formData.name} onChange={handleFormChange}/>
           <Form.Input name="company"  placeholder='Company Name' width={8} value={formData.company} onChange={handleFormChange}/>
         </Form.Group>
          <Form.Input  name="image" fluid icon='picture' iconPosition='left' placeholder='picture URL' type='text' value={formData.image} onChange={handleFormChange}/>
          <Form.Group>
           <Form.Input name="price" type='number'  placeholder='Product Price' width={8} value={formData.price} onChange={handleFormChange}/>
           <Form.Input name="limit" type='number'  placeholder='Quantity limit' width={8} value={formData.limit} onChange={handleFormChange}/>
         </Form.Group>
         <Button style={{marginTop: '10px'}} type='submit' color='green' fluid size='large' onClick={handleSubmit}>Update Category</Button>
                      
                      </Segment>
                  </Form>
                   :  null }
              {/* <Button style={{marginTop: '10px'}} type='submit' color='green' fluid size='large'>Update Product</Button> */}
          </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
}

export default EditProduct