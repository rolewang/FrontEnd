import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import {Dimmer, Loader, Card, Segment, Icon, Image, Container, Button, Divider } from 'semantic-ui-react'
import CategorieList from "./CategorieList";
import ItemCard from "./ItemCard";



function Items({categoriesList, currentUser, fetchUrl, localFetchUrl, cartCount, setCartCount}) {
    const [newCategoryList, setNewCategoryList] = useState([])
    const [itemsCount, setItemsCount] = useState({})
    const [cartItems, setCartItems] = useState([])   
    const { id } = useParams()
    const user_id = JSON.parse(localStorage.getItem("user_id"))
    const category_id = JSON.parse(localStorage.getItem("category_id"))
    const index_id = JSON.parse(localStorage.getItem("index_id"))
    const [loading, setLoading] = useState(false)
    const [sleep, setSleep] = useState(true)
    setTimeout(() => setSleep(false), 100)


    useEffect(() => {
        getCart(user_id, category_id)  
    }, [sleep])

    // console.log(categoriesList)
    function getCart(userId, categoryId) {
        setLoading(true)
        fetch(`${localFetchUrl}/cart`,{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user_id: userId, category_id: categoryId}),
        })
        .then(res => res.json())
        .then((resCart) => { return(setCart(resCart))}  )
        setLoading(false)
        // console.log(user_id, categoryId, 'this is cart fetch params')
    }

    // when the fetch to find what items are alredy in the cart runs this will
    // stop a empty cart message from the server frome beaing stord in the cart state vauble
function setCart(resCart) {
    if (!resCart.message) {
        setCartItems(resCart)
    }
}
    
    

    function handleAddToCart(id, category_id) {
        const cartDetails = {product_id: parseInt(id), quantity: itemsCount[id], user_id: currentUser.id, category_id: category_id}
        fetch(`${localFetchUrl}/order_details`,{
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartDetails)})
                .then(res => res.json())
       setCartCount({...cartCount, [category_id]: cartCount[category_id] + itemsCount[id]})

        console.log(cartCount, 'in the add to cart button')
                // .then(newCartDetail => {console.log(newCartDetail)})
                
    }


// console.log(categoriesList, "in inininini")
    let itemFrag = ''
    if (categoriesList.length > 0 && newCategoryList !== categoriesList) {
        setNewCategoryList(categoriesList) 
    }


    if (newCategoryList.length > 0) {
        const categories = newCategoryList[(index_id)]
        // console.log(index_id, 'in the brackets')
        // console.log(categories)
        itemFrag = categories.products.map(product => {return <ItemCard key={product.id} product={product} setItemsCount={setItemsCount} itemsCount={itemsCount} handleAddToCart={handleAddToCart} 
                                                               cartItems={cartItems} loading={loading} setLoading={setLoading}/>})
      
    }

    
    if (newCategoryList.length < 1) {
        return( <h1>Lodding</h1>)
    }

    return(
     <>
     <Segment id="segment-style">

     <Card.Group className="cardGroup" itemsPerRow={3}>
        {itemFrag}
    </Card.Group>         
     </Segment>


    </>
      

  
    )
}

export default Items