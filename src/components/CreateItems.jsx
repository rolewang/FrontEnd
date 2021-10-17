import React, {useState, useEffect} from "react";
import {Popup,Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'
import { Link, useHistory } from "react-router-dom";
import DeleteCategory from "./DeleteCategory";
import DeleteProduct from "./DeleteProduct";
import DownloadFiles from "./DownloadFiles";
import EditCategory from "./EditCategory";
import EditProduct from "./EditProduct";


function CreateItems({localFetchUrl, categoriesList, setTriggerRerender}) {
    const [formData, setFormData] = useState({name: "", deadLine: "", picture: "" })    
    const [itemFormData, setItemFormData] = useState({category: "", name: "", company: "", price: "", limit: "", image: "",  })  
    const [serverResponse, setServerResponse ] = useState('') 

    function handleChange(e, data) {
        console.log(e.target.value)      
        setFormData({...formData, [e.target.name]: e.target.value })         
      } 

      
      function handleItemsChange(e, data) {
        console.log(e.target.name)    
      if (!e.target.name) {
        setItemFormData({...itemFormData, category: data.value })   
      }else{
        setItemFormData({...itemFormData, [e.target.name]: e.target.value })
      }
      }
     
      
    function handle30DayDelete(){
      console.log('inside')
      }

      function handleSubmit(e) {
        e.preventDefault();
        fetch(`${localFetchUrl}/categories`, {
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
            const { user } = data;
            setServerResponse(data.message)
            }).catch((err) => {
              console.log(err)
            });
        }

        function handleItemSubmit(e) {
          e.preventDefault();
          fetch(`${localFetchUrl}/products`, {
              method: "POST",
              credentials: "include",
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify(itemFormData),
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

        let dropOptions = ""
        if (categoriesList.length > 0) {
           dropOptions =  categoriesList.map(categorys => { return  { key: categorys.id, text: categorys.name, value: categorys.id }})
        }

        // refresh page affter the server response message was displayed for 3 sec
        if (serverResponse.toLowerCase().includes("successful") ) {
            setTimeout(() => setServerResponse(''), 5000)
            setTimeout(() => window.location.reload(), 5200)
        }
        //window.location.reload()

    return(
      <>

{serverResponse
?
<Message positive id="uploadDownload-message">
  <Message.Header>{serverResponse}</Message.Header>
</Message>:null}

<Segment style={{margin: '2%'}}>

    <Grid textAlign='center' style={{ height: '40vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 550 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Create New Category
      </Header>

      <Form size='large' onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' name="name" placeholder='Category name' value={formData.name} onChange={handleChange}/>
          <Form.Input fluid icon='hourglass half' iconPosition='left' name="deadLine" placeholder='year month day format example 2021-07-01' type='date' value={formData.deadLine} onChange={handleChange}/>
          <Form.Input fluid icon='picture' iconPosition='left' name="picture" placeholder='picture URL' type='text' value={formData.picture} onChange={handleChange}/>
          <Button style={{marginTop: '10px'}} type='submit' color='' fluid size='large'>Create Categroy</Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>





  <EditCategory categoriesList={categoriesList} localFetchUrl={localFetchUrl} setServerResponse={setServerResponse}/>
  <DeleteCategory categoriesList={categoriesList} localFetchUrl={localFetchUrl} setServerResponse={setServerResponse}/>
  <Divider section/>

 



  <Grid textAlign='center' style={{ height: '40vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 550 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Create New Product
      </Header>

      <Form size='large' onSubmit={handleItemSubmit}>
        <Segment stacked>

        < Dropdown
        style={{marginBottom: "1rem"}}
        clearable
        fluid
        search
        selection
        options={dropOptions}
        name="category"
        onChange={handleItemsChange}
        placeholder='Select Category To Add Product'
        />

{ itemFormData.category ?
<> 
         <Form.Group >
           <Form.Input name="name"  placeholder='Product Name' width={8} value={itemFormData.name} onChange={handleItemsChange}/>
           <Form.Input name="company"  placeholder='Company Name' width={8} value={itemFormData.company} onChange={handleItemsChange}/>
         </Form.Group>
          <Form.Input fluid icon='picture' iconPosition='left' name="image" placeholder='picture URL' type='text' value={itemFormData.image} onChange={handleItemsChange}/>
          <Form.Group >
           <Form.Input name="price" type='number'  placeholder='Product Price' width={8} value={itemFormData.price} onChange={handleItemsChange}/>
           <Form.Input name="limit" type='number'  placeholder='Quantity limit' width={8} value={itemFormData.limit} onChange={handleItemsChange}/>
         </Form.Group>
          </>
: null}
          <Button style={{marginTop: '10px'}} type='submit' color='' fluid size='large'>Add Items</Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
  

  <EditProduct categoriesList={categoriesList} localFetchUrl={localFetchUrl} setServerResponse={setServerResponse}/>
  <DeleteProduct categoriesList={categoriesList} localFetchUrl={localFetchUrl} setServerResponse={setServerResponse}/>
  </Segment>

<Segment style={{margin: '2%'}}>
<DownloadFiles categoriesList={categoriesList} localFetchUrl={localFetchUrl} setServerResponse={setServerResponse}/>

</Segment>
<Popup trigger={<Button id='delete30days' color='orange'>Delete all orders older then 30 days</Button>} flowing hoverable>
    <Grid centered divided columns={1}>
      <Grid.Column textAlign='center'>
        <Header as='h4'>This is perminent</Header>
        <p>
          <b>All</b> Orders whith in the last 30  days whith all its items will be deleted form history
        </p>
        <Button color='red' onClick={handle30DayDelete}>Delete</Button>
      </Grid.Column>
    </Grid>
  </Popup>

</>

    )
}

export default CreateItems