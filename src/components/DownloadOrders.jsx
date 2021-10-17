import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import {Form, Divider, Message, Accordion, Button, Checkbox, Grid, Header,Segment, Dropdown} from 'semantic-ui-react'


function DownloadOrders({localFetchUrl, categoriesList, setTriggerRerender, products, users}) {
    
    const [orders, setOrders] = useState([])
    const [loaded, setLoaded] = useState(false)
    const csvLink = useRef()
    // console.log(users)


    let headers = [
        products.map(product => { return { label: product.name, key: product.name}})   
    ];

    headers[0].unshift({label: 'name', key: 'name'})
    headers = headers[0]
    // console.log(headers)






    let itemsOrderdFinal = []
   
    function handleClick(e) {
        


        let submitedOrders = []
        let sumbmitedOrderDetails = []
        let itemsOrderd = {}

        function isSubmited(value) {
            if (value.submitted === true) {
                
                submitedOrders.push(value.id)
                return value.id
            }
        }

        // GET THE USERS WHICH ADDED ITEMS TO THE CART
        if (users.length > 0 && products.length > 0) {
            let usersWithItems = users.filter(user => user.orders.length > 0)
    //    console.log(usersWithItems)

       // build an array of all order id's of submitted orders
       for (let i = 0; i < usersWithItems.length; i++) {
        // console.log(usersWithItems[i].order_details)
        usersWithItems[i].orders.filter(isSubmited)
    }
    //  console.log(submitedOrders)


       // get the orders details which belong to submitted orders
       for (let i = 0; i < usersWithItems.length; i++) {
        //    console.log(usersWithItems[i].order_details)
          sumbmitedOrderDetails.push(usersWithItems[i].order_details.filter(detail => submitedOrders.indexOf(detail.order_id) != -1 ))
       }
        // console.log(sumbmitedOrderDetails)

        for (let u = 0; u < usersWithItems.length; u++) {
           usersWithItems[u].order_details = sumbmitedOrderDetails[u] 
        }





            // console.log(usersWithItems)
             for (let index = 0; index < usersWithItems.length; index++) {
                // console.log(usersWithItems[index])
                 
                 itemsOrderd[usersWithItems[index].name] = {items:[], quantity:[]}
                 // console.log(itemsOrderd)
                 for (let i = 0; i < usersWithItems[index].order_details.length; i++) {
                     //console.log(usersWithItems[index].order_details[i])
                     itemsOrderd[usersWithItems[index].name].items.push(usersWithItems[index].order_details[i].product_id)
                     itemsOrderd[usersWithItems[index].name].quantity.push(usersWithItems[index].order_details[i].quantity)
                 }
                 
             }
             
        }
       
       let peaple  // array of the keys (users names)
       // IF THE OBJECT HOLDING THE NAEMS ITEM ID'S AND QUANTITY EXIST BEGIN LOOP TO SWAP OUT THE 
       // ID'S FOR THE REAL NAMES
        if (itemsOrderd) {
            peaple = Object.keys(itemsOrderd)
            
            for (let x = 0; x < peaple.length; x++) {
                for (let i = 0; i < products.length; i++) {
                    let item = products[i].id
                let indexToBeChanged = itemsOrderd[peaple[x]].items.indexOf(item) 
                    if (indexToBeChanged != -1) {
                        itemsOrderd[peaple[x]].items[indexToBeChanged] = products[i].name
                    }
                }
                let orderDetails = {}
                for (let y = 0; y < itemsOrderd[peaple[x]].items.length; y++) {
                    orderDetails[itemsOrderd[peaple[x]].items[y]] =  itemsOrderd[peaple[x]].quantity[y]
                }
                itemsOrderd[peaple[x]] = { orderDetails }
                itemsOrderd[peaple[x]].orderDetails['name'] = peaple[x]
                itemsOrderdFinal.push(itemsOrderd[peaple[x]].orderDetails)
                
            }

        }

        
        if (itemsOrderdFinal.length > 0) {
            // console.log(itemsOrderdFinal)
         
            setOrders(itemsOrderdFinal)
            // itemsOrderdFinal = itemsOrderdFinalss
            setTimeout(() => {
                csvLink.current.link.click()
            },300)
           
            console.log('just clicked ')
        }
    }

    
    return(
        <>
<Grid.Column width={3}>

<Button content='Downloed orders.csv' secondary onClick={handleClick}  />


   <CSVLink
       data={orders}
       filename="orders.csv"
       className='hidden'
       ref={csvLink}
    //    headers={headers}
       target='_blank'
   />
</Grid.Column>
       

      </>
    )
 


}

export default DownloadOrders