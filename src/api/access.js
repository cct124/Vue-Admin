export function localsave(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    console.log('localsave')
}

export function localfetch(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function sessionsave(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
    console.log('localsave')
}

export function sessionfetch(key) {
    // console.log('sessionfetch')
    return JSON.parse(sessionStorage.getItem(key));
}

export function sessionremove(key) {
    sessionStorage.removeItem(key);
}

export function localremove(key) {
    localStorage.removeItem(key);
}

export function sortDataSplice(sort, id, row) {
    var sortData = localfetch(sort + 'data')
    if(row){
        sortData.splice(sortData.findIndex(element => {
            if (element.id === id) {
                return true
            } else {
                return false
            }
        }), 1, row)
        console.log('sortDataSplice2')
    }else {
        sortData.splice(sortData.findIndex(element => {
            if (element.id === id) {
                return true
            } else {
                return false
            }
        }), 1)
        console.log('sortDataSplice2')
    }
    localsave(sort + 'data', sortData)
}

export function computedQuantityInformation (array, key, value) {
    return array.filter((itmes) => {
        if(itmes[key] === value) {
            return true
        }else {
            return false
        }
    }).length
}