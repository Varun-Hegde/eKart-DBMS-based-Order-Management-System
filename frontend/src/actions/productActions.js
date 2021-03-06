import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_DELETE_REVIEW_FAIL,
    PRODUCT_DELETE_REVIEW_REQUEST,
    PRODUCT_DELETE_REVIEW_SUCCESS,
    PRODUCT_UPDATE_REVIEW_FAIL,
    PRODUCT_UPDATE_REVIEW_REQUEST,
    PRODUCT_UPDATE_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_QUANTITY_FAIL,
    PRODUCT_QUANTITY_REQUEST,
    PRODUCT_QUANTITY_SUCCESS,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
} from '../constants/productConstants'

import axios from '../axios'
//GET DETAILS OF ALL THE PRODUCTS 
export const listProducts = (keyword='',pageNumber='') => async(dispatch) => {
    try{
        dispatch({
            type:PRODUCT_LIST_REQUEST
        })

        const resp = await axios.get(`/api/products/?keyword=${keyword}&pageNumber=${pageNumber}`)
        const {data} = resp
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
        console.log(resp);

    }catch(error){
        dispatch({   
            type:PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


//GET DETAILS OF A PARTICULAR  PRODUCT
export const listProductDetails = (id) => async(dispatch) => {
    try{
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({   
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


//DELETE A PARTICULAR PRODUCT 
export const deleteProduct = (id) => async (dispatch,getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        await axios.delete(
            `/api/products/${id}`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
        
    }catch(error) {
        dispatch({   
            type:PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


//CREATE A PRODUCT 
export const createProduct = () => async (dispatch,getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.post(
            `/api/products`,
            {},
            config
        )

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


//UPDATE A PRODUCT 
export const updateProduct = (product) => async (dispatch,getState) => {
    try{
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' :'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.put(
            `/api/products/${product._id}`,
            product,
            config
        )

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


//ADD A REVIEW TO A PRODUCT 
export const createProductReview = (productId,review) => async (dispatch,getState) => {
    try{
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' :'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.post(
            `/api/products/${productId}/reviews`,
            review,
            config
        )

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

//DELETE A REVIEW TO A PRODUCT 
export const deleteProductReview = (productId,reviewId) => async (dispatch,getState) => {
    try{
        dispatch({
            type: PRODUCT_DELETE_REVIEW_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' :'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.delete(
            `/api/products/${productId}/reviews/${reviewId}`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_REVIEW_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:PRODUCT_DELETE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


//GET A PRODUCT REVIEW 
export const getProductReview = (productId,reviewId) => async (dispatch,getState) => {
    try{
        dispatch({
            type: PRODUCT_REVIEW_REQUEST
        })

        const {data} = await axios.get(
            `/api/products/${productId}/reviews/${reviewId}`,
        )

        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:PRODUCT_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

//UPDATE A PRODUCT REVIEW 
export const updateProductReview = (productId,reviewId,review) => async (dispatch,getState) => {
    try{
        dispatch({
            type: PRODUCT_UPDATE_REVIEW_REQUEST
        })
 
        const {userLogin : {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' :'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.put(
            `/api/products/${productId}/reviews/${reviewId}`,
            review,
            config
        )

        dispatch({
            type: PRODUCT_UPDATE_REVIEW_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:PRODUCT_UPDATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

//UPDATE A PRODUCT Quantity 
export const updateProductQuantity = (orderItems) => async (dispatch,getState) => {
    try{
        dispatch({
            type: PRODUCT_QUANTITY_REQUEST
        })
        console.log("orderItems from action",orderItems);
        const {userLogin : {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' :'application/json',
                Authorization : `Bearer ${userInfo.token}`
            },
        }
        const {data} = await axios.put(
            `/api/products/reduceqty`,
            orderItems,
            config
        )

        dispatch({
            type: PRODUCT_QUANTITY_SUCCESS,
            payload: data
        })
        
    }catch(error) {
        dispatch({   
            type:PRODUCT_QUANTITY_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })

    const { data } = await axios.get(`/api/products/top`)

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}