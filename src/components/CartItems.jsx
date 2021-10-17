import React, {useState, useEffect} from "react";
import {List ,Divider ,Image, Button, Header, Icon, Segment,  Input, Label } from 'semantic-ui-react'
import ShoppingCartItems from "./CartItems";


function CartItem({currentUser, cartItem, handleDelete, handleQuantityChange, submitted, fetchUrl, localFetchUrl, deadline}) {
   

    function handleRemoveItem(e, data) {
      const id = parseInt(data.id)
        handleDelete(id)
    }

    function incrementQuantity(e, data) {
        let currentDate = new Date();
        let endData = new Date(deadline);
        // console.log(currentDate < endData)
        if ((cartItem.quantity < cartItem.product.limit && currentDate < endData ) || currentUser.admin) {
            handleQuantityChange(data.id, (cartItem.quantity + 1))
        }
    }

    // item limits are hard coded in Ultimately admin should control the limits with variables
    function decrementQuantity(e, data) {
        if (cartItem.quantity > 1 ) {
            // const newQuantity = itemQuantity - 1
            // setItemQuantity(newQuantity)
            handleQuantityChange(data.id, (cartItem.quantity - 1))
        }
    }


    return(
        <>
        <Segment.Group id={submitted ? 'cart-submitted': null} >
        <Image wrapped id="itemImage" src={cartItem.product.image} inline  size="medium" />

        <List  horizontal link id="itemName" >
            <List.Item style={{borderRight: '1px solid #ccc', paddingRight: '10px'}} id="itemDetails" as='a' content={<a href='https://www.kosherwine.com/rashi-light-red-concord-15356.html' target="_blank">{cartItem.product.name} </a>}></List.Item>
            <List.Item id="itemDetails" as='a' content={<a href='http://www.kedemwinery.com/index.php' target="_blank">{cartItem.product.company} </a>}></List.Item>
        </List>

        <Header color='grey' sub link as="a" id="itemDetails" textAlign="center">price:  ${cartItem.product.price}</Header>
      
          
            <br/>
            <Button style={{width: '20%', marginTop: '20px', marginLeft: '0px'}}  id={cartItem.id} order_id={cartItem.order_id} icon='trash' onClick={handleRemoveItem } />
            <Label  as={'h1'} pointing='right' >Quantity</Label>
            
            <Button.Group size="mini"  style={{ marginTop: '6%'}} >
                    <Button  id={cartItem.id} icon='add' onClick={incrementQuantity}/>
                    <Label basic>{cartItem.quantity}</Label>
                    <Button id={cartItem.id} icon='minus'  onClick={decrementQuantity}/>
                   
            </Button.Group>
           
        </Segment.Group>
        </>
    )
}
// use the [disabled] tag on the buttons when item can not be changed
export default CartItem