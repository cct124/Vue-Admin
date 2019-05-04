import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters'
import user from './modules/user'
import database from './modules/database'

import { localsave } from '../api/access'

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    database
  },
  getters,
});
//监视tableProductData列表的数据变化，实时更新首页统计表
store.watch(
  (state) => state.database.tableProductData,
  function () {
    store.dispatch('computedProductInformation')
  }, {
    deep: true
  }
);
store.watch(
  (state) => state.database.orderData,
  function () {
    localsave('ORDERdata',store.state.database.orderData)
  }, {
    deep: true
  }
);

// store.watch(
//   (state) => state.database.sortKeyData,
//   function () {
//     store.dispatch('sortKeyChange')
//   }, {
//     deep: true
//   }
// );

export default store
