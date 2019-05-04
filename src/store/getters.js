export default {
    userInfo: state => state.user.userInfo,
    pass: state => state.user.pass,
    username: state => state.user.loginFrom.username,
    password: state => state.user.loginFrom.password,
    tableProductData: state => state.database.tableProductData,
    productEditFrom: state => state.database.productEditFrom,
    productFromData: state => state.database.productFromData,
    basicProductInformation: state => state.database.basicProductInformation,
    lineChart: state => state.database.lineChart,
    pieChart: state => state.database.pieChart,
    sortKeyData: state => state.database.sortKeyData,
    orderData: state => state.database.orderData

}