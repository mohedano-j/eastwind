import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import ProductForm from "./ProductForm";
import PropTypes from "prop-types";

//Mock of product object for a new product
const newProduct = {
    productId: null,
    productName:"",
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
  saveProduct, // This will call the function bound to dispatch insteat of the one from productActions
  history,
  ...props
}) {
  //...props assign any property that has not been destructed
  //useState is a hook to allows to add React State to function components
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
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
        setProduct({ ...props.product }); // Copy course on props in state.
    }
  }, [props.product]); //Second argument is an array argument to watch if anything change. As we want this to run in didMount we pass empty array.

  function handleChange(event) {
    const { name, value } = event.target;
    //Using functional form of setState so I can safely set a new state that's based on the existing state
    setProduct(prevCourse => ({...prevCourse,
      [name]: value // JS computed property syntax to allow reference to a property via a variable.
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {history.push("/products")} ); // This is passed in oun props, so it's already bound to dispatch. The bound saveCourse takes precedence
  }

  return (
    <>
      <ProductForm
        product={product}
        errors={errors}
        categories={categories}
        onChange={handleChange}
        onSave={handleSave}
      />
    </>
  );
}
export function getProductById(products, id) {
    return products.find(product => product.productId === id) || null;
  }

//OwnProps access tp component's props, we can use this to read the url data by react router
function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.id ? parseInt(ownProps.match.params.id,10) : 0; 
  const product = productId != 0 && state.products.length > 0 ?  getProductById(state.products,productId) : newProduct
  return {
    product,
    products: state.products,
    categories: state.categories
  };
}

/* Make maptDispatch cleaner by using the object form, this is cleaner*/
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
