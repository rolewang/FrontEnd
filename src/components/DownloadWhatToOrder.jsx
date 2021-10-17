import React, {useState, useEffect, useRef} from "react";
import {Dimmer, Loader, Image,Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'
import { CSVLink } from "react-csv";


function WhatToDownload({categoriesList ,setLoading, localFetchUrl, setServerResponse}) {
  const csvLink = useRef()
  const itemsToOrder = useRef()
  // const [itemsToOrder, setItemsToOrder] = useState()
  const categoryToFetch = useRef()
  // const [categoryToFetch, setCategoryToFetch] = useState()
   const [csvData, setCsvData] = useState([])
  //  const [headers, setHeaders] = useState([])

  

  function handleChange(e, data) {
    // console.log(data.value)
    // setCategoryToFetch(data.value)
    categoryToFetch.current = data.value
    setTimeout(() => {
      fetchData()
    }, 300);

}


  console.log(categoryToFetch.current)
function fetchData() {
  // setLoading(true)
  console.log(categoryToFetch.current)
        fetch(`${localFetchUrl}/what_to_order/${categoryToFetch.current}`, {
          credentials: "include"
      })
          .then((r) => r.json())
          .then((data) => {
          console.log(data);
          if (data.message) {
            setServerResponse(data.message)
          }
          // setItemsToOrder(data)
          itemsToOrder.current = data
          }).catch((err) => {
            console.log(err)
          });
    
          // setLoading(false)
}

    function handleSubmit(e) {
      console.log(itemsToOrder.current, 'before the data is formatted')
        if (itemsToOrder.current) {
        isDataToExport()
            setTimeout(() => {
                csvLink.current.link.click()
            },2000)
        }  
      }
 
      function isDataToExport() {

       let keys = Object.keys(itemsToOrder.current)

       setCsvData(keys.map((key, index) => { return (
            {[key]: itemsToOrder.current[key]}
            ) }) ) 
            console.log(csvData)

            // setHeaders(keys.map((name, index2) => { return (
            //   { label: name, key: name }
            // )})  )

            // console.log(headers)
    }
    
    let dropOptions = ""
    if (categoriesList.length > 0) {
       dropOptions =  categoriesList.map(categorys => { return  { key: categorys.id, text: categorys.name, value: categorys.id }})
    }


      return(
        <Grid textAlign='center' style={{ height: '30vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 550 }}>
          <Header as='h2' color='blue' textAlign='center'>
            What to Order
          </Header>
    
          <Form size='large' onSubmit={handleSubmit}>
            
            < Dropdown
            style={{marginBottom: "1rem"}}
            clearable
            fluid
            search
            selection
            options={dropOptions}
            name="category"
            onChange={handleChange}
            placeholder='Select A Category To DownLoad'
            />
            {/* {categoryToFetch.current ?  */}
            <>
            <Button style={{marginTop: '10px'}} type='submit'  color='facebook' fluid size='large'>Download: What to order</Button>


            <CSVLink
            data={csvData}
            filename="whatToOrder.csv"
            className='hidden'
            ref={csvLink}
            // headers={headers}
            target='_blank'/>


            </>
  
          {/*  :
            null
          } */}
              
          </Form>
        </Grid.Column>
      </Grid>
      )
}

export default WhatToDownload

