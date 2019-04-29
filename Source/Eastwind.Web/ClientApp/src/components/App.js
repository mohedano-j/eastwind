import React from "react";
import { Route, Switch } from "react-router";
import AboutPage from "./about/AboutPage";
import NavMenu from "./common/NavMenu/NavMenu";
import HomePage from "./home/HomePage";
import ProductsPage from "./products/ProductsPage";
import ManageProductPage from "./products/ManageProductPage";
import PageNotFound from "./pageNotFound/PageNotFound";
import Hello from "./Hello";
import "../../node_modules/react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

function App() {
  /*Only one route in a switch can match. Order of the delclaration is important*/
  return (
    <div className="container-fluid">
      <NavMenu />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/product/:id" component={ManageProductPage}/>
        <Route path="/product/" component={ManageProductPage}/>
        <Route path="/about" component={AboutPage} />
        <Route path="/helloTypescript" component={Hello} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar/>
    </div>
  );
}

export default App;
