import React from "react";
import { Link } from "react-router-dom";
import Modal from "../common/Modal/Modal";

type propTypes = {
  products: Array<any>;
  onRequestSort: any;
  onDeleteClick: any;
  onDeleteConfirm: any;
  onModalCancel: any;
  modalIsOpen: boolean;
};

const ProductList = ({
  products,
  onRequestSort,
  onDeleteClick,
  onDeleteConfirm,
  onModalCancel,
  modalIsOpen
}: propTypes) => (
  <>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <button
              className="btn default"
              onClick={() => onRequestSort("productName")}
            >
              Name
            </button>
          </th>
          <th>
            {" "}
            <button
              className="btn default"
              onClick={() => onRequestSort("unitPrice")}
            >
              Price
            </button>
          </th>
          <th>
            <button
              className="btn default"
              onClick={() => onRequestSort("unitsInStock")}
            >
              Units in Stock
            </button>
          </th>
          <th>
            <button
              className="btn default"
              onClick={() => onRequestSort("categoryName")}
            >
              Category
            </button>
          </th>
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
      isOpen={modalIsOpen}
      onSave={onDeleteConfirm}
      onCancel={onModalCancel}
    />
  </>
);

export default ProductList;
