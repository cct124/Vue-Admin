// import { productData } from './simulationData/data'
import {
  localfetch,
  localsave,
  sortDataSplice,
  computedQuantityInformation,
  localremove
} from './../../api/access'

import {
  lineChart,
  pieChart
} from './simulationData/echartsData'

export default {
  state: {
    orderData: [],
    tableProductData: [],
    productEditFrom: false,
    productFromData: {
      row: {},
      index: null
    },
    basicProductInformation: {
      id: "",
      sort: "",
      model: "",
      Brand: "",
      img: '/static/5bf4b276N43dbe886.jpg',
      price: null,
      salesVolume: 0,
      reserve: null,
      Listing: false,
      check: false
    },
    lineChart,
    pieChart,
    sortKeyData: []

  },
  mutations: {
    productDataDelete(state, payload) {
      state.tableProductData.splice(payload.index, 1)
      sortDataSplice(payload.sort, payload.id)
    },
    productFromDataChange(state) {
      state.tableProductData.splice(state.productFromData.index, 1, state.productFromData.row);
      sortDataSplice(state.productFromData.row.sort, state.productFromData.row.id, state.productFromData.row)
    },
    orderDataChange(state) {
      state.orderData.splice(state.productFromData.index, 1, state.productFromData.row);
    },
    orderDataDelete(state) {
      state.orderData.splice(state.productFromData.index, 1);
    },
    addProductDate(state) {
      var data = localfetch(state.basicProductInformation.sort + "data") || [];
      data.push(state.basicProductInformation);
      localsave(state.basicProductInformation.sort + "data", data);
      this.commit('listinFormationinJection')

    },
    listinFormationinJection(state) {
      state.sortKeyData = [];
      state.sortKeyData = localfetch('sortKey');
      state.orderData = [];
      state.orderData = localfetch('ORDERdata')
      state.tableProductData = [];
      localfetch('sortKey').forEach((items) => {
        let data = localfetch(items.key) || [];
        state.tableProductData = state.tableProductData.concat(data)
      });
    },
    computedProductInformation(state) {
      state.lineChart.xAxis.data = [];
      for (let i = 0; i < state.lineChart.series.length; i++) {
        state.lineChart.series[i].data = []
      };
      state.tableProductData.forEach((items) => {
        state.lineChart.xAxis.data.push(items.model)
        state.lineChart.series[0].data.push(items.salesVolume)
        state.lineChart.series[1].data.push(items.reserve)
        state.lineChart.series[2].data.push(items.price)
      });
      state.pieChart.series[0].data = [];
      localfetch('sortKey').forEach((items) => {
        state.pieChart.series[0].data.push({
          value: computedQuantityInformation(state.tableProductData, 'sort', items.sort),
          name: items.name
        })
      })
    },
    sortKeyChange(state) {
      localsave('sortKey', state.sortKeyData)
    },
    sortKeyDataDelete(state, soretObject) {
      state.sortKeyData.splice(soretObject.index, 1);
      localremove(soretObject.key);
      this.commit('listinFormationinJection')
    }

  },
  actions: {
    productDataDelete(context, payload) {
      context.commit('productDataDelete', payload)
    },
    productFromDataChange(context) {
      context.commit('productFromDataChange')
    },
    addProductDate(context) {
      context.commit('addProductDate')
    },
    listinFormationinJection(context) {
      context.commit('listinFormationinJection')
    },
    computedProductInformation(context) {
      context.commit('computedProductInformation')
    },
    sortKeyChange(context) {
      context.commit('sortKeyChange')
    },
    sortKeyDataDelete(context) {
      context.commit('sortKeyDataDelete', soretObject)
    },
    orderDataChange(context) {
      context.commit('orderDataChange')
    },
    orderDataDelete(context) {
      context.commit('orderDataDelete')
    }
  }
}
