export const lineChart = {
    title: {
        text: "销量-库存-价格"
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        data: ["销量", "库存", "价格"]
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: "category",
        data: []
    },
    yAxis: {
        type: "value"
    },
    series: [
        {
            name: "销量",
            type: "line",
            data: [],
            smooth: true,
        },
        {
            name: "库存",
            type: "line",
            data: [],
            smooth: true,
        },
        {
            name: "价格",
            type: "line",
            data: [],
            smooth: true,
        }
    ]
}


export const pieChart = {
    title : {
        text: '商品类别占比',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: '种类',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}