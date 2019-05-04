import { asyncRouterMap } from './router/index'
import { sessionfetch, localsave, localfetch } from './api/access'
import { MPdata, ZBdata, MAdata } from './store/modules/simulationData/data'
import { sortKey } from './store/modules/simulationData/sortKeyList'
import { orderData } from './store/modules/simulationData/orderData'


export function refreshAddRouter (vm) {

    if( !localfetch('MPdata') ) {
        localsave('MPdata', MPdata)
        localsave('ZBdata', ZBdata)
        localsave('MAdata', MAdata)
        localsave('sortKey', sortKey)
        localsave('ORDERdata', orderData) 
    }
    
    if( sessionfetch('addRoutes') || false ) {
        vm.$router.addRoutes(asyncRouterMap)
    }
}