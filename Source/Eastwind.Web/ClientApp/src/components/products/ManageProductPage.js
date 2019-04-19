import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import ProductForm from "./ProductForm";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner/Spinner";
import { toast } from "react-toastify";

//Mock of product object for a new product. TODO Refactor all mocks should go to a different folder
const newProduct = {
  productId: 0,
  productName: "",
  categoryId: "0",
  unitPrice: 0,
  unitsInStock: 0
};

/* This is an example of a Function component */
/*Function components with hooks are easier to declare and maintain */
function ManageProductPage({
  products,
  categories,
  loadCategories,
  loadProducts,
  saveProduct, // This will call the function bound to dispatch instead of the one from productActions
  history,
  ...props
}) {
  //...props assign any property that has not been destructed
  //useState is a hook to allows to add React State to function components
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
  const [saving, setSavings] = useState(false);
  useEffect(() => {
    if (categories.length === 0) {
      loadCategories().catch(error => {
        alert("Loading categories failed" + error);
      });
    }

    if (products.length === 0) {
      loadProducts().catch(error => {
        alert("Loading productss failed" + error);
      });
    } else {
      setProduct({ ...props.product }); // Copy product on props in state.
    }
  }, [props.product]); //Second argument is an array argument to watch if anything change in those objects

  function handleChange(event) {
    const { name, value } = event.target;
    //Using functional form of setState so I can safely set a new state that's based on the existing state
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value // JS computed property syntax to allow reference to a property via a variable.
    }));
  }
  /*The history object allows you to manage and handle the browser history inside your views or components.*/
  /*push(path, [state]): (function), pushes a new entry onto the history stack*/
  function handleCancel(){
    history.push("/products");
  }

  function handleSave(event) {
    event.preventDefault();
    if(!formIsValid())return;
    setSavings(true);
    saveProduct(product).then(() => {
      history.push("/products");
      toast.success("Product Saved");
    }).catch(error=>{
        setSavings(false);
        setErrors({onSave : error.message})
    }); // This is passed in oun props, so it's already bound to dispatch. The bound saveProduct takes precedence
  }

  function isPositiveInteger(s) {
    return /^\+?[1-9][\d]*$/.test(s);
  }

  function isPositiveFloat(s) {
    return !isNaN(s) && Number(s) > 0;
  }

  function formIsValid() {
    const { productName, categoryId, unitPrice, unitsInStock} = product;
    const errors = {};

    /*Check required fields */
    if (!productName) errors.productName = "Product Name is required.";
    if (!unitPrice) errors.unitPrice = "Unit Price is required";
    if (!categoryId) errors.categoryId = "Category is required";
    if (!unitsInStock) errors.unitsInStock = "Units in Stocks is required";

    /*Check number fields */
    if(!errors.unitPrice && !isPositiveFloat(unitPrice)){
      errors.unitPrice = "Unit Price must be a positive number";
    }

    if(!errors.unitsInStock && !isPositiveInteger(unitsInStock)){
      errors.unitsInStock = "Units in Stocks must be a positive integer";
    }

    if(!errors.categoryId && !categories.find(category => category.categoryId == categoryId)){
      errors.categoryId = "Please select a valid";
    }

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }


  return products.length === 0 || categories.length === 0 ? (
    <Spinner />
  ) : (
    <ProductForm
      product={product}
      errors={errors}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      saving={saving}
    />
  );
}
export function getProductById(products, id) {
  return products.find(product => product.productId === id) || null;
}

//OwnProps access to component's props, we can use this to read the url data by react router
function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.id
    ? parseInt(ownProps.match.params.id, 10)
    : 0;
  const product =
    productId != 0 && state.products.length > 0
      ? getProductById(state.products, productId)
      : newProduct;
  return {
    product,
    products: state.products,
    categories: state.categories
  };
}

/* Make maptDispatch cleaner by using the object form*/
const mapDispatchToProps = {
  loadProducts: productActions.loadProducts,
  loadCategories: categoryActions.loadCategories,
  saveProduct: productActions.saveProduct
};

ManageProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired // Any component via Route gets history in on props from React Router
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProductPage);
