const products= [

  {
    productId: 1,
    productName: "test1",
    categoryId: 1,
    unitPrice: 12,
    unitsInStock:  11,
    categoryName: "Food"
  },
  {
    productId: 2,
    productName: "test2",
    categoryId: 2,
    unitPrice: 10,
    unitsInStock:  10,
    categoryName: "Drinks"
  }

];

const categories = [{
  categoryId: 1,
  categoryName: "Food",
  description: "Food Description",
  picture: []
},{
  categoryId: 2,
  categoryName: "Drinks",
  description: "Drinks description",
  picture: []
}
];

const newProduct = {
  productId: 0,
  productName: "",
  categoryId: 0,
  unitPrice: 0,
  unitsInStock:  0,
  categoryName: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newProduct,
  products,
  categories
};
