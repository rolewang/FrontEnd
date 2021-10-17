import React, { Component, useState } from "react";
import {useParams, Link, NavLink, useHistory } from "react-router-dom";
import { Dropdown, Button, Checkbox, Grid, Header, Icon, Image, Menu, Segment, Sidebar, Loader } from 'semantic-ui-react'


function OrderCard({fetchUrl, localFetchUrl, details}) {
        let { id } = useParams()
        let history = useHistory();


    function handleClick(e, data) {
      localStorage.setItem("admin_search_order_id", JSON.stringify(parseInt(e.target.id)))
      localStorage.setItem("admin_search_user_id", JSON.stringify(parseInt(id)))
      localStorage.setItem("shoppingCart_id", JSON.stringify(details.category_id))
      setTimeout(() => history.push(`/ShoppingCart/${details.category_id}`), 100)
    }

    return(
        <>
        <div   id="card-individual" class="card">
        <div style={{marginTop: "20px"}} class="content">
        <div class="header">Category: {details.category.name}</div>
      </div>
      <div class="content">
        <span class="ui sub header">Itme Quantity: {details.category_quantity}</span>
        <span class="ui sub header">Total cases: {details.case_quantity}</span>
        <div class="ui small feed">
          <div class="event">
            <div class="content">
              <div class="summary">
                 <span class="ui">Submitted: {details.submitted ? 'true': 'false'}</span>
              </div>
            </div>
          </div>
          <div class="event">
            <div class="content">
              <div class="summary">
                 <span class="ui">Fulfiled: {details.fulfilled ? 'true': 'false'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="extra content">
        <button id={details.id}  class="ui button" onClick={handleClick}> View order</button>
      </div>
      </div>
      </>
    )
}

export default OrderCard