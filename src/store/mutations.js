import {
  ADD_GOODS,
  MINUS_GOODS
} from './mutation-types.js';

export default {
  [ADD_GOODS] (state, {
    name, // 商品名字
    price, // 商品价格
    foodNum // 商品数量
  }) {
    let cart = state.cartList;
    if (cart[foodNum]) {
      cart[foodNum]++;
    } else {
      cart = {
        'foodNum': 1,
        'name': name,
        'price': price
      };
    }
    state.cartList = {...cart};
  },
  [MINUS_GOODS] (state) {
    state.goodCount--;
  }
};
