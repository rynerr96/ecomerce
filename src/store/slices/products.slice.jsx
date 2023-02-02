import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';


export const productSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    setProduct: (state, action) => {
      return action.payload
    }

  }
})

export const getProductsThunk = () => (dispatch) => {

  dispatch(setIsLoading(true))

  axios
    .get(`https://e-commerce-api.academlo.tech/api/v1/products`)
    .then(resp => dispatch(setProduct(resp.data.data.products)))
    .catch(error => console.log(error))
    .finally(() => {
      setTimeout(() => {
        dispatch(setIsLoading(false))
      }, 1500);
    })
}
export const getFilterProducts = (e) => (dispatch) => {
  dispatch(setIsLoading(true))
  axios
    .get(`https://e-commerce-api.academlo.tech/api/v1/products`)
    .then(resp => dispatch(setProduct(resp.data.data.products.filter(product => product.title.toLowerCase().includes(e)))))
    .catch(error => console.log(error))
    .finally(() => {
      setTimeout(() => {
        dispatch(setIsLoading(false))
      }, 1500);
    })
}
export const getFilterPrice = (data) => (dispatch) => {

  axios
    .get(`https://e-commerce-api.academlo.tech/api/v1/products`)
    .then(resp => dispatch(setProduct(resp.data.data.products.filter(product => (parseInt(product.price)) >= data.priceOne && (parseInt(product.price) <= data.priceTwo)))))
    .catch(error => console.log(error))

}
export const filterCategoriesThunk = (id) => (dispatch) => {

  dispatch(setIsLoading(true))

  axios
    .get(`https://e-commerce-api.academlo.tech/api/v1/products/?category=${id}`)
    .then(resp => dispatch(setProduct(resp.data.data.products)))
    .catch(error => console.log(error))
    .finally(() => {
      setTimeout(() => {
        dispatch(setIsLoading(false))
      }, 1500);
    })
}

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;