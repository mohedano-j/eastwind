import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Modal from "../common/Modal/Modal";

const ProductList = ({
  products,
  onRequestSort,
  onDeleteClick,
  onDeleteConfirm,
  modalIsOpen
}) => (
  <>
    <table className="table">
      <thead>
        <tr>
          <th>
            Name<button onClick={() => onRequestSort("productName")} />
          </th>
          <th>Price</th>
          <th>Units</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {products.map(product => {
          return (
            <tr key={product.productId} id={product.productId}>
              <td>
                <Link to={"/product/" + product.productId}>
                  {" "}
                  {product.productName}
                </Link>
              </td>
              <td>{product.unitPrice}</td>
              <td>{product.unitsInStock}</td>
              <td>{product.categoryName}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDeleteClick(product)}
          
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <Modal
      id="deleteModal"
      title="Delete Product"
      label="Are you sure?"
      saveLabel="Confirm"
      isOpen = {modalIsOpen}
      onSave={onDeleteConfirm}
    />
  </>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductList;
