export default {
  //   getProducts(cb) {
  //     setTimeout(() => cb(_products), 100)
  //   },
  async getProducts(cb) {
    const _products = await this.$http.get('/user-list')
    return (() => {
      cb(_products)
    })()
  },
  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      Math.random() > 0.5 ? cb() : errorCb()
    }, 100)
  }
}
