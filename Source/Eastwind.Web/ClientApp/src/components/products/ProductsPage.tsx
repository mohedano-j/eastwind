import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import { bindActionCreators } from "redux";
import ProductList from "./ProductList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner/Spinner";
import { toast } from "react-toastify";
import { Product } from "../../Entities/product";
import { Category } from "../../Entities/category";

type propsType = {
  products: Array<Product>;
  categories: Array<Category>;
  categoryListLoad: any;
  productListLoad: any;
  productListSort: any;
  productDelete: any;
  loading: boolean;
};

type stateType = {
  products: Array<Product>;
  categories: Array<Category>;
  clickedProduct: any;
  nextOrderAsc: string;
  modalIsOpen: boolean;
  fieldOrder: string;
  redirectToAddProductPage: boolean;
  apiStatus: number;
};

class ProductsPage extends React.Component<propsType, stateType> {
  constructor(props: propsType) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      clickedProduct: {},
      nextOrderAsc: "asc",
      modalIsOpen: false,
      fieldOrder: "",
      redirectToAddProductPage: false,
      apiStatus: 0
    };
  }
  /*This will run every time after the component is mount */
  componentDidMount() {
    const {
      products,
      categories,
      categoryListLoad,
      productListLoad
    } = this.props;
    if (categories.length === 0) {
      categoryListLoad();
    }

    if (products.length === 0) {
      productListLoad().catch((error: any) => {
        alert("Loading products failed" + error);
      });
    }
  }

  handleRequestSort = (clickedHeader: string) => {
    const { productListSort } = this.props;

    productListSort(
      this.props.products,
      clickedHeader,
      this.state.nextOrderAsc
    );

    if (this.state.fieldOrder === clickedHeader) {
      this.setState({
        nextOrderAsc: this.state.nextOrderAsc == "asc" ? "desc" : "asc"
      });
    } else {
      this.setState({ nextOrderAsc: "desc" });
      this.setState({ fieldOrder: clickedHeader });
    }
  };

  handleModalCancel = () => {
    this.setState({ modalIsOpen: false });
    this.setState({ clickedProduct: {} });
  };

  handleDeleteSelected = (productSelected: any) => {
    this.setState({ modalIsOpen: true });
    this.setState({ clickedProduct: productSelected });
  };

  handleDeleteProduct = () => {
    this.setState({ modalIsOpen: false });

    const product = this.state.clickedProduct;

    this.props.productDelete(product);

    toast.success("Product deleted");
  };

  render() {
    return (
      <>
        {this.state.redirectToAddProductPage && <Redirect to="/product" />}
        <h2>Products {this.props.products.length}</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-product"
              onClick={() => this.setState({ redirectToAddProductPage: true })}
            >
              Add Product
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

function mapStateToProps(state: any) {
  const categories = state.categories ? state.categories : [];
  const products = state.products ? state.products : [];

  const productsWithCat = products.map((product: any) => {
    const category = categories.find(
      (category: any) => category.categoryId === product.categoryId
    );
    const categoryName = category ? category.categoryName : "";
    return {
      ...product,
      categoryName: categoryName,
      category: category
    };
  });
  return {
    products: productsWithCat,
    categories: categories,
    loading: state.apiStatus > 0
  };
}

const mapDispatchToProps = {
  productListLoad: productActions.productListLoad,
  productListSort: productActions.productListSort,
  categoryListLoad: categoryActions.categoryListLoad,
  productDelete: productActions.productDelete
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
