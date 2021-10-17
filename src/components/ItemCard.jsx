import React, { useState } from "react";
import { Link, useParams } from "react-router-dom"
import {Dimmer, Loader, Card, Segment, Icon, Image, Container, Button, Divider, Form } from 'semantic-ui-react'

// start here by after shabbos 

function ItemCard({product, setItemsCount, itemsCount, handleAddToCart, cartItems, fetchUrl, localFetchUrl}) {
    const [inCart, setInCart] = useState(false)
   
if (!cartItems ) {
  // window.location.reload()
  console.log(product)
  return( <Segment>
    <Dimmer active inverted>
      <Loader size='large'>Loading</Loader>
    </Dimmer>
    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
  </Segment>)
}

// console.log(cartItems)
    let itemsInCart = cartItems.filter(item => item.product_id === product.id)
    // let itemsInCart = Object.values(item).filter(product_id === product_id)
    if (itemsInCart.length > 0) {
      console.log('item', product.id, 'is in the cart already')
      // setInCart(true)
    }


      function handleSubmit(e, data) {
        e.preventDefault()
       
        // before adding to cart test if the object holds a value and that the value is more then 0  and that the item is not already in the cart
        if (Object.keys(itemsCount).length !== 0 && itemsCount[`${data.id}`] !== 0 && !itemsInCart.length > 0 ) {
          console.log(itemsCount,'in if statement')
          handleAddToCart(data.id, data.category_id)
          setInCart(true)
        }
        
      }

      function handleChange(e, data) {
         setItemsCount({...itemsCount, [data.id]: data.value})
      }
     

    let limitArray = [];
    for (let i = 1; i <= product.limit; i++) {
      limitArray.push(i);
    }
    
    const options = limitArray.map(n => {return {key: n.toString(), text: n.toString(), value: n}})
    console.log(options)
  

    return(

          
      <>

         <Card link style={{width: '18rem'}} className="itemCard" id="hover">
          {inCart || itemsInCart.length > 0 ? 
          // <img style={{height: '15rem', width: '18rem'}} src={product.image} alt="nothing" />
          <Image  src={product.image} wrapped ui={false}  circular  label={{ as: 'a', corner: 'left', icon: 'cart' }}/>
          :
          <Image src={product.image} wrapped ui={false}  circular />
        // <img style={{height: '15rem', width: '18rem'}} src={product.image} alt="nothing" />
}
        
        <Card.Content >
            <Card.Meta textAlign="center">
                <Card.Header>{product.name}</Card.Header>
                <Card.Meta>{product.company}</Card.Meta> 
                <Card.Description>${product.price}</Card.Description> 
            </Card.Meta>
        </Card.Content>
        <Card.Content extra >
        {/* <div className='ui two button ' > */}
            <Form  id={product.id} category_id={product.category_id} onSubmit={handleSubmit}>
            <Form.Select
            fluid
            name={product.name}
            options={options}
            placeholder='quantity'
            id={product.id}
            onChange={handleChange}
          />
          {itemsInCart.length > 0 || inCart ? <Button disabled type='submit'  >Add to cart</Button>:  <Button type='submit'>Add to cart</Button>}
         
            </Form>
          {/* </div> */}
          </Card.Content>
    </Card>

  </>
    )
}

export default ItemCard