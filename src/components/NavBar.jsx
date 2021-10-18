import React, { Component, useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  Dropdown,
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Loader,
  Label
} from "semantic-ui-react";
import CategorieList from "./CategorieList";
import CreateItems from "./CreateItems";
import Loading from "./Loading";

function NavBar({
  currentUser,
  onLogout,
  triggerRerender,
  setTriggerRerender,
  fetchUrl,
  localFetchUrl,
  categoriesList,
  isLoading,
  setIsLoading,
  cartCount,
  setCartCount
}) {
  const [focused, setFocused] = useState({});
  const { activeItem } = focused;

  let cartCategorys = "";
  // console.log('in navBar')
  useEffect(() => {
    if (categoriesList.length > 0 && currentUser) {
      // console.log('in the fetch')
      setIsLoading(true);
      fetch(`${localFetchUrl}/cartCount`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id: currentUser.id })
      })
        .then((res) => res.json())
        .then((cartCount) => {
          return (
            console.log(cartCount, "this is the cart count"),
            setCartCount(cartCount),
            //setTriggerRerender(!triggerRerender),
            setIsLoading(false)
          );
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [currentUser, categoriesList]);

  if (categoriesList.length > 0) {
    console.log(cartCount);
    for (let i = 0; i < categoriesList.length; i++) {
      if (cartCount[categoriesList[i].id] === undefined) {
        cartCount[categoriesList[i].id] = 0;
      }
      // cartCount[categoriesList[i].id] !=null ? null : categoriesList[i].id = 0
    }

    cartCategorys = categoriesList.map((categorys) => {
      return (
        <div onClick={onDropdownClick} id={categorys.id} class="item">
          <Label color="red" floating>
            {cartCount[categorys.id]}
          </Label>
          {categorys.name}
        </div>
      );
    });
  }

  const history = useHistory();

  function handleItemClick(e, { name }) {
    setFocused({ activeItem: name });
  }

  if (activeItem === "log out") {
    onLogout();
  }

  function onDropdownClick(e, data) {
    // console.log(e.target.id)
    localStorage.removeItem("admin_search_user_id");
    history.push(`/ShoppingCart/${e.target.id}`);
    localStorage.setItem(
      "shoppingCart_id",
      JSON.stringify(parseInt(e.target.id))
    );
    setTriggerRerender(!triggerRerender);
    window.location.reload(true);
  }

  function handleChange(e, data) {
    // history.push(`/ShoppingCart/${data.value}`);
    localStorage.removeItem("admin_search_user_id");
    history.push(`/ShoppingCart/${data.value}`);
    console.log(data.value);
    localStorage.setItem(
      "shoppingCart_id",
      JSON.stringify(parseInt(data.value))
    );
    setTriggerRerender(!triggerRerender);
    // setTriggerRerender(!triggerRerender)
  }

  function handleClick(e, data) {
    localStorage.removeItem("admin_search_user_id");
    history.push(`/ShoppingCart/${e.target.id}`);
    // console.log(e.target.id)
    // console.log('registerd click')
    localStorage.setItem(
      "shoppingCart_id",
      JSON.stringify(parseInt(e.target.id))
    );
    setTriggerRerender(!triggerRerender);
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!currentUser) {
    return (
      <>
        <Menu
          className="navBar"
          style={{ backgroundColor: "rgb(249, 247, 250)" }}
        >
          <Menu.Item
            as={Link}
            to="/SignUp"
            name="sign up"
            active={activeItem === "sign up"}
            onClick={handleItemClick}
          >
            Sign Up
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/SignIn"
            name="sign in"
            active={activeItem === "sign in"}
            onClick={handleItemClick}
          >
            Sign in
          </Menu.Item>
        </Menu>
      </>
    );
  }

  return (
    <Menu className="navBar" style={{ backgroundColor: "rgb(249, 247, 250)" }}>
      {/*           
          {currentUser ? null:
           <>
          <Menu.Item  as={Link}  to="/SignUp"
           name='sign up'
           active={activeItem === 'sign up'}
           onClick={handleItemClick}>Sign Up</Menu.Item> 

 <Menu.Item as={Link} to="/SignIn"
          name='sign in'
          active={activeItem === 'sign in'}
          onClick={handleItemClick}>Sign in</Menu.Item>
             
          </>
          } */}

      {currentUser ? (
        <>
          <Menu.Item
            name="log out"
            active={activeItem === "log out"}
            onClick={handleItemClick}
          >
            Log Out
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/"
            name="main menu"
            active={activeItem === "main menu"}
            onClick={handleItemClick}
          >
            main menu
          </Menu.Item>
        </>
      ) : null}

      <div class="ui compact ">
        <div class="ui simple dropdown item">
          Shopping Cart
          <i class="dropdown icon"></i>
          <div class="menu">{cartCategorys}</div>
        </div>
      </div>

      <Menu.Item
        position="right"
        as={Link}
        to={`/profile/${currentUser.id}`}
        name="profile"
        active={activeItem === "main menu"}
        onClick={handleItemClick}
      >
        profile
      </Menu.Item>

      {currentUser.admin ? (
        <Menu.Item
          as={Link}
          to="/UserList"
          name="UserList"
          active={activeItem === "UserList"}
          onClick={handleItemClick}
        >
          All Users
        </Menu.Item>
      ) : null}

      {currentUser.admin ? (
        <Menu.Item
          as={Link}
          to="/CreateItems"
          name="CreateItems"
          active={activeItem === "CreateItems"}
          onClick={handleItemClick}
        >
          Control Panel
        </Menu.Item>
      ) : null}
    </Menu>
  );
}

export default NavBar;
