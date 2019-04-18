import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import { bindActionCreators } from "redux";
import ProductList from "./ProductList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner/Spinner";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

/* This is an example of a Class component */
class ProductsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      clickedProduct: {},
      modalIsOpen: false
    }
  }
  componentDidMount() {
    const { products, categories, actions } = this.props; 
    if (categories.length === 0) {
      actions.loadCategories().catch(error => {
        alert("Loading categories failed" + error);
      });
    }

    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        alert("Loading productss failed" + error);
      });
    }
  }
  handleRequestSort = property => {
    const { products, actions } = this.props;
    actions.sortProducts(this.props.products, property).catch(error => {
      alert("Loading products failed" + error);
    });
  };
  handleDeleteSelected = productSelected => {
    this.setState({modalIsOpen: true})
    this.setState({clickedProduct: productSelected});
  };

  handleDeleteProduct = async () => {
    this.setState({modalIsOpen: false})
    toast.success("Product deleted");
    const product = this.state.clickedProduct;
    try {
      await this.props.actions.deleteProduct(product);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/product" />}{" "}
        {/* If redirectToAddCourse, we will redirect to product */}
        <h2>Products</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <ProductList
              products={this.props.products}
              onRequestSort={this.handleRequestSort}
              onDeleteClick={this.handleDeleteSelected}
              onDeleteConfirm={this.handleDeleteProduct}
              modalIsOpen = {this.state.modalIsOpen}
            />
          </>
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    products:
      state.categories.length === 0
        ? []
        : state.products.map(product => {
            return {
              ...product,
              categoryName:
                state.categories.find(
                  a => a.categoryId === product.categoryId
                ) !== null
                  ? state.categories.find(
                      a => a.categoryId === product.categoryId
                    ).categoryName
                  : ""
            };
          }),
    categories: state.categories,
    loading: state.apiCallInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      sortProducts: bindActionCreators(productActions.sortProducts, dispatch),
      loadCategories: bindActionCreators(
        categoryActions.loadCategories,
        dispatch
      ),
      deleteProduct: bindActionCreators(productActions.deleteProduct, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
