import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'


function DownloadItems({localFetchUrl, categoriesList, setTriggerRerender, setServerResponse, products, setProducts}) {
    // let data = useRef([])
    const [data, setData] = useState([])
   
    const [loaded, setLoaded] = useState(false)
    const csvLink = useRef()


   if (!loaded) {
       setLoaded(true)
        fetch(`${localFetchUrl}/products`,{
            credentials: "include",
        })
    .then(res => res.json())
    .then(productsData => {setProducts(productsData)})
   }

   
       



    function handleClick(e) {
        if (products.length > 0) {
            isDataToExport()
            setTimeout(() => {
                csvLink.current.link.click()
            },300)
            return
        }else if (categoriesList.length > 0){
           
            noDataToExport()
            setTimeout(() => {
                csvLink.current.link.click()
            },300)
            
          
            return
        }else{
            setServerResponse('Please create categories first')
        }
       
        console.log('just clicked ')
    }

   const headers = [
        { label: "name", key: "name" },
        { label: "company", key: "company" },
        { label: "price", key: "price" },
        { label: "limit", key: "limit" },
        { label: "category_name", key: "category_name" },
        { label: "category_id", key: "category_id" },
        { label: "image", key: "image"}
      ];
            
   console.log(data)



function isDataToExport() {

    setData(products.map((product, index) => { return (
        { name: product.name,
         company: product.company,
         price: product.price,
         limit: product.limit,
         category_name: product.category.name,
         category_id: product.category_id,
         image: product.image }
      )
      })  )
}

function noDataToExport() {
    setData(categoriesList.map((category, index) => { return (
        {category_name: category.name,
        category_id: category.category_id
    }
    )}))
    
}

    return(
        <>
      <Grid.Column width={3}>

        <Button content={ products.length < 1 ? 'Blank products template' : 'Products.csv' } primary onClick={handleClick}  />
   
        <CSVLink
            data={data}
            filename="products.csv"
            className='hidden'
            ref={csvLink}
            headers={headers}
            target='_blank'
        />
        </Grid.Column>
      </>
      
    )
 


}

export default DownloadItems