//使用module将mutation分块
//改变数据--> 病毒混合之后效果是不一样的,导致不一样的感染个体
// initial state
import shop from '../../utils/shopRequest'
import { PRODUCTS } from '../mutation-types'
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllProducts({ commit }) {
    shop.getProducts(products => {
      commit(PRODUCTS.SET_PRODUCTS, products)
    })
  }
}

// mutations
const mutations = {
  [PRODUCTS.SET_PRODUCTS](state, products) {
    state.all = products
  },

  [PRODUCTS.DECREMENT_PRODUCT_INVENTORY](state, { id, number }) {
    const product = state.all.find(product => product.id === id)
    product.inventory -= number
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
