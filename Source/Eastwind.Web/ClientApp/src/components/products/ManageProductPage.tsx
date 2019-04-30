import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import ProductForm from "./ProductForm";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner/Spinner";
import { toast } from "react-toastify";

const newProduct = {
  productId: 0,
  productName: "",
  categoryId: "0",
  unitPrice: 0,
  unitsInStock: 0
};

type propsType = {
  products: Array<any>;
  categories: Array<any>;
  categoryListLoad: any;
  productListLoad: any;
  productAdd: any;
  productEdit: any;
  history: Array<string>;
  product: any;
};

function ManageProductPage({
  products,
  categories,
  categoryListLoad,
  productListLoad,
  productAdd,
  productEdit,
  history,
  ...props
}: propsType) {
  //...props assign any property that has not been destructed
  //useState is a hook to allows to add React State to function components
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
  const [saving, setSavings] = useState(false);
  //Use effect accept a function that may be called any time after render
  useEffect(() => {
    if (categories.length === 0) {
      categoryListLoad().catch((error: any) => {
        alert("Loading categories failed" + error);
      });
    }

    if (products.length === 0) {
      productListLoad().catch((error: any) => {
        alert("Loading productss failed" + error);
      });
    } else {
      setProduct({ ...props.product }); // Copy product on props in state.
    }
  }, [props.product]); //Second argument is an array argument to watch if anything change in those objects

  function handleChange(event: any) {
    const { name, value } = event.target;
    //Using functional form of setState so I can safely set a new state that's based on the existing state
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      [name]: value // JS computed property syntax to allow reference to a property via a variable.
    }));
  }
  /*The history object allows you to manage and handle the browser history inside your views or components.*/
  /*push(path, [state]): (function), pushes a new entry onto the history stack*/
  function handleCancel() {
    history.push("/products");
  }

  function handleSave(event: any) {
    event.preventDefault();
    if (!formIsValid()) return;

    setSavings(true);

    console.log("handleSave...");

    if (product.productId) {
      console.log("editing...");
      productEdit(product)
        .then(() => {
          history.push("/products");
          toast.success("Product edited");
        })
        .catch((error: any) => {
          setSavings(false);
          setErrors({ onSave: error.message });
        });
    } else {
      console.log("adding...");
      productAdd(product)
        .then(() => {
          history.push("/products");
          toast.success("Product added");
        })
        .catch((error: any) => {
          setSavings(false);
          setErrors({ onSave: error.message });
        });
    }
  }

  function isPositiveInteger(s: any) {
    return /^\+?[1-9][\d]*$/.test(s);
  }

  function isPositiveFloat(s: any) {
    return !isNaN(s) && Number(s) > 0;
  }

  function formIsValid() {
    const { productName, categoryId, unitPrice, unitsInStock } = product;
    const errors: any = {};

    if (!productName) errors.productName = "Product Name is required.";
    if (!unitPrice) errors.unitPrice = "Unit Price is required";
    if (!categoryId) errors.categoryId = "Category is required";
    if (!unitsInStock) errors.unitsInStock = "Units in Stocks is required";

    if (!errors.unitPrice && !isPositiveFloat(unitPrice)) {
      errors.unitPrice = "Unit Price must be a positive number";
    }

    if (!errors.unitsInStock && !isPositiveInteger(unitsInStock)) {
      errors.unitsInStock = "Units in Stocks must be a positive integer";
    }

    if (
      !errors.categoryId &&
      !categories.find(category => category.categoryId == categoryId)
    ) {
      errors.categoryId = "Please select a valid";
    }

    setErrors(errors);

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
export function productGetById(products: Array<any>, id: number) {
  return products.find(product => product.productId === id) || null;
}

function mapStateToProps(state: any, ownProps: any) {
  const productId = ownProps.match.params.id
    ? parseInt(ownProps.match.params.id, 10)
    : 0;
  const product =
    productId != 0 && state.products.length > 0
      ? productGetById(state.products, productId)
      : null;
  return {
    product,
    products: state.products,
    categories: state.categories
  };
}

const mapDispatchToProps = {
  productListLoad: productActions.productListLoad,
  categoryListLoad: categoryActions.categoryListLoad,
  productAdd: productActions.productAdd,
  productEdit: productActions.productEdit
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProductPage);
