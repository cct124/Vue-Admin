<template>
  <div>
    <el-card shadow="hover" class="titleFrom">
      <span>订单编号: {{ this.productFromData.row.id }}</span>
      <span>账户名称：{{ this.productFromData.row.userName }}</span>
      <span>下单日期：{{ this.productFromData.row.date }}</span>
    </el-card>
    <div class="productOrder">
      <div class="s-ctn">
        <el-card shadow="hover" v-for="(item, index) in productOrder" :key="index">
          <el-badge :value="hash[item.id]" v-if="hash[item.id] === 1 ? false : true" class="item"></el-badge>
          <div class="item" v-if="hash[item.id] === 1 ? true : false"></div>
          <div class="productOrderImg">
            <img :src="item.img">
            <p>型号：{{ item.model }}</p>
            <p>品牌：{{ item.Brand }}</p>
          </div>
        </el-card>
      </div>
    </div>
    <el-table :data="tableFrom" style="width: 100%" height="100%">
      <el-table-column label="客户姓名">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <el-input v-model="scope.row.address"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="电话">
        <template slot-scope="scope">
          <el-input v-model="scope.row.phone"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="商品总额">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.money"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="支付状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.pay"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <el-select v-model="scope.row.fettle">
            <el-option label="已关闭" value="0"></el-option>
            <el-option label="已完成" value="1"></el-option>
            <el-option label="待发货" value="2"></el-option>
            <el-option label="已发货" value="3"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="right">
          <el-button class="orderButton" size="mini" @click="orderDataEdit">保存</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "orderEdit",
  data() {
    return {
      data: []
    };
  },
  computed: {
    ...mapGetters(["orderData", "productFromData", "tableProductData"]),
    productOrder() {
      var dataList = this.productFromData.row.productList;
      function bool(element) {
        for (let i = 0; i < dataList.length; i++) {
          if (dataList[i] === element.id) {
            return true;
          }
        }
      }
      return this.tableProductData.filter(element => {
        return bool(element);
      });
    },
    hash() {
      var dataList = this.productFromData.row.productList;
      var hash = {};
      for (var i = 0; i < dataList.length; i++) {
        var key = dataList[i].toString();
        if (!hash[key]) {
          hash[key] = 1;
          continue;
        } else {
          hash[key] += 1;
        }
      }
      return hash;
    },
    tableFrom() {
      var data = [];
      data.push(this.productFromData.row);
      return data;
    }
  },
  methods: {
    orderDataEdit(){
      this.$store.dispatch('orderDataChange')
      this.$router.push('/Admin/ordersComputing')
    }
  },
  filters: {
    orderMoney: function(value) {
      value = +value;
      return (value = value.toFixed(2) + "￥");
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.productOrder {
  overflow-x: auto;
  margin: 5px 20px;
  padding: 12px 10px 10px 10px;
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

.productOrder .s-ctn {
  white-space: nowrap;
}

.productOrder .s-ctn > div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  display: inline-block;
  width: 200px;
  height: 200px;
  margin: 5px;
  text-align: center;
  font-size: 0.87em;
}
.productOrderImg {
  margin: 5px auto;
  position: relative;
  top: -20px;
}
.productOrderImg > img {
  width: 100px;
  height: 100px;
}
.item {
  right: -80px;
  top: -12px;
  height: 24px;
}
.productOrderForm {
  width: 400px;
}
.orderButton {
  width: 80px;
  height: 30px;
  margin: 0 20px;
}
.titleFrom span {
  margin: 0 30px 0 0;
  line-height: 30px;
  color: #7d7f82;
  font-size: 0.9em;
  position: relative;
  top: -16px;
}
.titleFrom {
  margin: 10px 20px;
  height: 35px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}
</style>
