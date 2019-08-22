// const GET_ALL_PROJECTS = "GET_ALL_PROJECTS";

// const initialState = {
//   products: [],
//   pickedProducts: [],
//   favoritedItem: {},
//   filteredProducts: []
// };

// export const gotAllProducts = products => ({
//   type: GOT_PRODUCTS,
//   products
// });

// const pickedProduct = item => ({
//   type: PICKED_ITEM,
//   item
// });

// const deletedProduct = item => ({
//   type: DELETE_ONE_ITEM,
//   item
// });

// const deletedAll = () => ({
//   type: DELETE_ALL
// });

// const pickedType = category => ({
//   type: GOT_TYPE,
//   category
// });

// export const getAllProducts = () => {
//   return dispatch => {
//     fetch("https://funiture-ar.firebaseio.com/products.json")
//       .catch(err => console.log(err))
//       .then(res => res.json())
//       .then(parsedRes => {
//         const products = parsedRes;
//         dispatch(gotAllProducts(products));
//       });
//   };
// };

// export const pickProduct = item => {
//   return dispatch => {
//     dispatch(pickedProduct(item));
//   };
// };

// export const deleteProduct = item => {
//   return dispatch => {
//     dispatch(deletedProduct(item));
//   };
// };

// export const deleteAll = () => {
//   return dispatch => {
//     dispatch(deletedAll());
//   };
// };

// export const pickType = type => {
//   return dispatch => {
//     dispatch(pickedType(type));
//   };
// };

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case GOT_PRODUCTS:
//       return { ...state, products: action.products };
//     case PICKED_ITEM:
//       return {
//         ...state,
//         pickedProducts: [...state.pickedProducts, action.item]
//       };
//     case DELETE_ONE_ITEM:
//       let newArr = state.pickedProducts.slice();
//       newArr[action.item] = null;
//       return {
//         ...state,
//         pickedProducts: newArr
//       };
//     case DELETE_ALL:
//       return {
//         ...state,
//         pickedProducts: []
//       };
//     case GOT_TYPE:
//       const filteredProducts = state.products.filter(
//         product => product.type === action.category
//       );
//       return { ...state, filteredProducts: filteredProducts };
//     default:
//       return state;
//   }
// }
