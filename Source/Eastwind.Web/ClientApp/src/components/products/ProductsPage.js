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
      nextOrderAsc: "asc",
      modalIsOpen: false,
      fieldOrder: ""
    };
  }
  /*This will run every time after the component is mount */
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
  /* Set of handlers to manipulate state or call actions */
  handleRequestSort = clickedHeader => {
    const { products, actions } = this.props;

    actions
      .sortProducts(
        this.props.products,
        clickedHeader,
        this.state.nextOrderAsc
      );
      if (this.state.fieldOrder === clickedHeader) {
        this.setState({ nextOrderAsc: this.state.nextOrderAsc == "asc" ? "desc" : "asc" });
      } else {
        this.setState({ nextOrderAsc: "desc" });
        this.setState({ fieldOrder: clickedHeader });
      }
  };
  handleModalCancel = () => {
    this.setState({ modalIsOpen: false });
    this.setState({ clickedProduct: {} });
  };

  handleDeleteSelected = productSelected => {
    this.setState({ modalIsOpen: true });
    this.setState({ clickedProduct: productSelected });
  };

  handleDeleteProduct = async () => {
    this.setState({ modalIsOpen: false });
    toast.success("Product deleted");
    const product = this.state.clickedProduct;
    try {
      await this.props.actions.deleteProduct(product);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };
  /*JSX Code*/
  render() {
    return (
      <>
        {/* If redirectToAddCourse, we will redirect to product */}
        {this.state.redirectToAddCoursePage && <Redirect to="/product" />}
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
              onModalCancel={this.handleModalCancel}
              modalIsOpen={this.state.modalIsOpen}
            />
          </>
        )}
      </>
    );
  }
}
/*End JSX Code*/
/* Conections to REDUX */
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
