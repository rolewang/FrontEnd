import React, {useState, useEffect} from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { Elements, StripProvider} from 'react-stripe-elements'

import CategorieList from "./components/CategorieList";
import Items from "./components/ItemsList";
import ItemCard from "./components/ItemCard";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp";
import ShoppingCart from "./components/ShoppingCart";
import Loading from "./components/Loading";
import UserList from "./components/UserList";
import OrdersList from "./components/OrdersList";
import Profile from "./components/Profile";
import AccountActivation from "./components/AccountActivation";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import CreateItems from "./components/CreateItems";
import Donate from "./components/Donate"


function App() {

  const [categoriesList, setCategories] = useState([])
  const [currentUser, setCurrentUser] = useState();
  const [triggerRerender, setTriggerRerender] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cartCount, setCartCount] = useState({})

  

  const history = useHistory();
  // const fetchUrl = "https://noshvitz.herokuapp.com"
  // const localFetchUrl = "http://localhost:3000"
  const fetchUrl = "http://localhost:3000"
  const localFetchUrl = "https://noshvitz.herokuapp.com"

  

  useEffect(() => {
    setIsLoading(true)
      fetch(`${localFetchUrl}/categories`,{
        credentials: "include",
      })
      .then(res => res.json())
      .then(categoriesArray => 
        {
          return (
            setCategories(categoriesArray), setIsLoading(false))})
  }, [])


  useEffect(() => {
    // if (categoriesList.length > 0) {
    //   console.log('in the fetch', currentUser.id)
    //   setIsLoading(true)
    //   fetch(`${localFetchUrl}/cartCount`,{
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({user_id: currentUser.id}),
    // })
    
    // .then(res => res.json())
    // .then((cartCount) => { return (
    //   console.log(cartCount, 'this is the cart count'),
    //   setCartCount(cartCount),
    //   setIsLoading(false)
    // )}).catch((err) => {
    //   console.log(err)
    //   setIsLoading(false)
    // }) 
    // }
  }, []);
  
  
  useEffect(() => {
    autoLogin()
  }, []);

  

// /SignIn needs to be chaneged to a landing page
  useEffect(() => {
    if (currentUser) {
  //   // history.push("/")
  //   console.log('in the fetch', currentUser.id)
  //   setIsLoading(true)
  //   fetch(`${localFetchUrl}/cartCount`,{
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //         "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({user_id: currentUser.id}),
  // })
  
  // .then(res => res.json())
  // .then((cartCount) => { return (
  //   console.log(cartCount, 'this is the cart count'),
  //   setIsLoading(false)
  // )}).catch((err) => {
  //   console.log(err)
  //   setIsLoading(false)
  // }) 
    } else {
    //  history.push("/SignIn");
    // history.push("/")
    }
  }, [currentUser, history]);

 
  function autoLogin() {
    setIsLoading(true)
    fetch(`${localFetchUrl}/autologin`, {
      credentials: "include",
    })
      .then((r) => {
        if (!r.ok) throw Error("Not logged in!"),
        setIsLoading(false)
        return r.json();
      })
      .then((user) => { return (
         setCurrentUser(user),
         setIsLoading(false)
         )})
      .catch((err) => console.error(err));
      
     
      
  }
  function handleLogout() {
    // remove the userId from localstorage
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("category_id");
    localStorage.clear();
    setIsLoading(true)
    fetch(`${localFetchUrl}/logout`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((r) => r.json())
      .then(() => setCurrentUser(null));
    history.push('/SignIn')
    // window.location.reload();
    setIsLoading(false)
  }

  function onUpdateUser(user) {
    setCurrentUser(user);
  }

 if (categoriesList.length < 1) {
   <Loading></Loading>
 }

  return (
<>


       
        
        <div>
        <NavBar currentUser={currentUser} onLogout={handleLogout}
        triggerRerender={triggerRerender} setTriggerRerender={setTriggerRerender}
        fetchUrl={fetchUrl} localFetchUrl={localFetchUrl} categoriesList={categoriesList}
        isLoading={isLoading} setIsLoading={setIsLoading}
        cartCount={cartCount} setCartCount={setCartCount} />
    </div>

{/*         
    <StripProvider apiKey="pk_test_51JFLXwAGIFi71zekn2ka7VNBoW9eYECrLkacNfLvyBxCQXFiEYAWk0T36VlKDVgM9udRONAWASUqWEMcuLgISkzK006yKpNAlG">
 <div>
     <Elements>
     <Donate fetchUrl={fetchUrl} localFetchUrl={localFetchUrl}/>
     </Elements>
 </div>
  </StripProvider> */}

  <Switch>
    <Route exact path="/SignUp">
      <SignUp fetchUrl={fetchUrl} localFetchUrl={localFetchUrl}/>
    </Route>



    <Route exact path="/SignIn">
      <SignIn setCurrentUser={setCurrentUser} autoLogin={autoLogin} fetchUrl={fetchUrl} localFetchUrl={localFetchUrl}/>
    </Route>

    <Route exact path="/ShoppingCart/:id">
      <ShoppingCart currentUser={currentUser} triggerRerender={triggerRerender} setTriggerRerender={setTriggerRerender} autoLogin={autoLogin} fetchUrl={fetchUrl} localFetchUrl={localFetchUrl} categoriesList={categoriesList}/>
    </Route>

  <Route exact path="/categories">
    <CategorieList categoriesList={categoriesList} setCategories={setCategories} currentUser={currentUser} fetchUrl={fetchUrl} localFetchUrl={localFetchUrl}/>
  </Route>

  <Route exact path="/categories/:id">
    <Items categoriesList={categoriesList} currentUser={currentUser} fetchUrl={fetchUrl} localFetchUrl={localFetchUrl} cartCount={cartCount} setCartCount={setCartCount}/>            
  </Route >

  <Route exact path="/UserList">
    <UserList isLoading={isLoading} setIsLoading={setIsLoading} currentUser={currentUser} fetchUrl={fetchUrl} localFetchUrl={localFetchUrl} />            
  </Route >

  <Route exact path="/Profile/:id">
    <Profile currentUser={currentUser} fetchUrl={fetchUrl} localFetchUrl={localFetchUrl}/>            
  </Route >

  <Route exact path="/OrdersList/:id">
    <OrdersList currentUser={currentUser} fetchUrl={fetchUrl} localFetchUrl={localFetchUrl} />            
  </Route >

  <Route   path="/Account_activations/:id">
    <AccountActivation currentUser={currentUser} fetchUrl={fetchUrl} localFetchUrl={localFetchUrl}/>            
  </Route >

  <Route  path="/password_resets/:id">
    <ResetPassword  fetchUrl={fetchUrl} localFetchUrl={localFetchUrl}/>            
  </Route >

  <Route exact  path="/ForgotPassword">
    <ForgotPassword  fetchUrl={fetchUrl} localFetchUrl={localFetchUrl}/>            
  </Route >

  <Route exact  path="/CreateItems">
    <CreateItems  fetchUrl={fetchUrl} localFetchUrl={localFetchUrl} currentUser={currentUser} categoriesList={categoriesList} setTriggerRerender={setTriggerRerender}/>            
  </Route >

  <Route exact  path="/Donate">
    <Donate fetchUrl={fetchUrl} localFetchUrl={localFetchUrl}/>
  </Route >

  <Route exact path="/">
  <CategorieList categoriesList={categoriesList} setCategories={setCategories} currentUser={currentUser} fetchUrl={fetchUrl} localFetchUrl={localFetchUrl}/>
  </Route>
  </Switch>
</>
  );
}

export default App;
