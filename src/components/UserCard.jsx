import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Input, Menu, Card, Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'



function UserCard({name, number, id, fetchUrl, localFetchUrl}) {

  // function handleClick(e) {
  //   console.log(e.target.innerText, 'got clicked')
  //   if (e.target.innerText === 'Orders') {
  //   }
  //   console.log(e)
  // }


    return(
        <>
<div class="card" id="card-individual">
          <div class="content">
            {/* <img class="right floated mini ui image" src="/images/avatar/large/elliot.jpg"></img> */}
            <div class="header">
              {name}
            </div>
            <div class="meta">
              Phone: {number}
            </div>
            <div class="description">
              {/* Elliot requested permission to view your contact details */}
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
            <Link id="card-individual-button" to={`/Profile/${id}`}>  <div class="ui basic green button">Profile</div> </Link>
            <Link id="card-individual-button" to={`/OrdersList/${id}`}>   <div class="ui basic blue button">Orders</div> </Link>
            </div>
          </div>
        </div>
        </>
    )
}

export default UserCard