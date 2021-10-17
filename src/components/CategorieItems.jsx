import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { Card, Icon, Image, Container, Button, Divider, Transition, Header, Segment, Message } from 'semantic-ui-react'



function CategorieItems({categories, currentUser, fetchUrl, localFetchUrl, index, visible, setVisible, setMessage}) {
    const history = useHistory();


    const category_id = categories.id
    let user_id = 0
    const index_id = index
    if (!categories) {
        return(<h1>loadding</h1>)
    }
   
   if (currentUser) {
       user_id = currentUser.id
   }

   


    function toggleVisibility() {
        setVisible(!visible)
        console.log('clicked')
    }

    function handleClick(e, data) {
    console.log('just got clicked')
    if (user_id === 0) {
        window.scrollTo(0, 0);
        setMessage(true)
        return null
    }
    
    setUserAndCategoriesId()
    console.log(`${localFetchUrl}`)
        fetch(`${localFetchUrl}/orders`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_id: currentUser.id, category_id: category_id})
            })
            .then(res => res.json())
            .then(newCartObj => { console.log(newCartObj)})

            history.push(`/categories/${category_id}`);
    }

    function setUserAndCategoriesId() {
        localStorage.setItem("category_id", JSON.stringify(parseInt(category_id)))
        localStorage.setItem("user_id", JSON.stringify(parseInt(user_id)))
        localStorage.setItem("index_id", JSON.stringify(parseInt(index_id)))
    }
   
    return(
        <>
{/* as={Link} to={`/categories/${category_id}`} */}
 <Transition visible={visible} animation='scale' duration={2000}>
<Card id="categorieCard"  onClick={handleClick} link > 
        <Image src={categories.image} wrapped ui={false} size='tiny' circular/>
        <Card.Content>
            <Card.Meta textAlign="center">
                <span >{categories.name}</span>
            </Card.Meta>
        </Card.Content>
    </Card>
    </Transition>
 
    
</>
    )
}

export default CategorieItems 