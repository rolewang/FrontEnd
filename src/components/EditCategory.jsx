import React, {useState, useEffect} from "react";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'

function EditCategory({localFetchUrl, setServerResponse, categoriesList }) {

    const [formData, setFormData] = useState({name: "", deadLine: "", picture: "" })    
    const [itemFormData, setItemFormData] = useState({category: ""})  



    function handleChange(e, data) {
        console.log(e.target.value)      
        setFormData({...formData, [e.target.name]: e.target.value })         
      }       

      function handleCategoryChange(e, data) {

           // only try to set the name / deadline.. if a category is selected and not on blank
      if (!e.target.name && data.value) {
        console.log('in the if')
        let selectedCategory =  categoriesList.filter( category => category.id === data.value)
        let name = selectedCategory[0].name
        console.log(selectedCategory)
        let deadLine = selectedCategory[0].deadline.slice(0, 10)
        let image = selectedCategory[0].image
        setFormData({...formData, name: name, deadLine: deadLine, picture: image })
        setItemFormData({...itemFormData, category: data.value })
      }else{
        setItemFormData({...itemFormData, [e.target.name]: e.target.value })
      }
      // if the user clears the category drop down the category state should be set to false to hidet the 
        if (!data.value) {
          setItemFormData({...itemFormData, category: ''})
        }
      }


      function handleSubmit(e) {
        e.preventDefault();
        console.log(itemFormData.category)
        fetch(`${localFetchUrl}/categories/${itemFormData.category}`, {
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

      

      let dropOptions = ""
      if (categoriesList.length > 0) {
         dropOptions =  categoriesList.map(categorys => { return  { key: categorys.id, text: categorys.name, value: categorys.id }})
      }
console.log(itemFormData.category, 'line 65')
    return(
        <Grid textAlign='center' style={{ height: '40vh', marginTop: '20%' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 550 }}>
      <Header as='h2' color='green' textAlign='center'>
        Edit Category
      </Header>
      
      <Form size='large' >
        <Segment stacked>

        < Dropdown
        style={{marginBottom: "1rem"}}
        clearable
        fluid
        search
        selection
        options={dropOptions}
        name="category"
        onChange={handleCategoryChange}
        placeholder='Select Category To Add Product'
        />
{ itemFormData.category ?
<> 
<Form size='large' onSubmit={handleSubmit}>
<Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' name="name" placeholder='Category name' value={formData.name} onChange={handleChange}/>
          <Form.Input fluid icon='hourglass half' iconPosition='left' name="deadLine" placeholder='year month date format example 2021-07-01'value={formData.deadLine} onChange={handleChange}/>
          <Form.Input fluid icon='picture' iconPosition='left' name="picture" placeholder='picture URL' type='text' value={formData.picture} onChange={handleChange}/>
          <Button style={{marginTop: '10px'}} type='submit' color='green' fluid size='large' onClick={handleSubmit}>Update Category</Button>
          </Segment>
      </Form>
          </>
: null}
          
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
    )
}

export default EditCategory