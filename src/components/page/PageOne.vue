<template>
  <div>
    <div id="myChart" class="echarts"></div>
    <div id="myDataset" class="myDataset"></div>
  </div>
</template>

<script>
export default {
  name: "eCharts",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.drawLine();
    this.drawLineDataset();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      // console.log(this.$store.state.database.lineChart)
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption(this.$store.state.database.lineChart);
    },
    drawLineDataset() {
      // 基于准备好的dom，初始化echarts实例
      // console.log(this.$store.state.database.lineChart)
      var myDataset = this.$echarts.init(document.getElementById("myDataset"));
      // 绘制图表
      myDataset.setOption(this.$store.state.database.pieChart);
    }
  }
};
</script>

<style scoped>
.echarts {
  width: 800px;
  height: 400px;
  margin: 20px;
  border: 1px solid #d0d0d0;
  padding: 10px;
  float: left;
}
.myDataset{
  width: 400px;
  height: 400px;
  margin: 20px;
  border: 1px solid #d0d0d0;
  padding: 10px;
  float: left;
}
</style>
