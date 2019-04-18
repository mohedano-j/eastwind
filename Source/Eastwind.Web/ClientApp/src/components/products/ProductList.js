import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductList = ({ products, onRequestSort }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name<button onClick={()=>onRequestSort("productName")}></button></th>
        <th>Price</th>
        <th>Units</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {products.map(product=> {
        return (
          <tr key={product.productId} id={product.productId}>
            <td>
              <Link to={"/product/" +  product.productId }> {product.productName}</Link>
            </td>
            <td>
             {product.unitPrice}
            </td>
            <td>{product.unitsInStock}</td>
            <td>{product.categoryName}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductList;