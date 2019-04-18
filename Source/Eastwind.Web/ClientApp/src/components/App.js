import React from "react";
import { Route, Switch } from "react-router";
import AboutPage from "./about/AboutPage";
import NavMenu from "./common/NavMenu/NavMenu";
import HomePage from "./home/HomePage";
import ProductsPage from "./products/ProductsPage";
import ManageCourse from './products/ManageProductPage'
import ManageProductPage from "./products/ManageProductPage";

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
      </Switch>
    </div>
  );
}

export default App;
