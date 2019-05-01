# Eastwind

## Overview

Eastwind is a sample React application running on ASP.NET core.

## Flow

index.tsx
-> app.tsx
-> ProductsPage.tsx
-> productListLoad : productActions.productListLoad
-> componentDidMount => productListLoad()

productActions.productListLoad
-> dispatch(apiCallBegin())
-> productsApi.productListGet() => dispatch(productListLoadSuccess, products)
-> apiStatusReducer.
