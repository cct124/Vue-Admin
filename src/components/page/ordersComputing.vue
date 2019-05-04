<template>
  <el-main>
    <el-button class="orderEditButton" size="mini" type="primary" @click="orderAdd">添加订单</el-button>
    <el-table
      :data="orderData.filter(data => !orderfilters || data.userName.toLowerCase().includes(orderfilters.toLowerCase()))"
      style="width: 100%"
      height="100%"
    >
      <el-table-column label="订单编号" prop="id"></el-table-column>
      <el-table-column label="下单日期" prop="date"></el-table-column>
      <el-table-column label="账户名称" prop="userName"></el-table-column>
      <el-table-column label="客户姓名" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="商品总额">
        <template slot-scope="scope">{{ scope.row.money | orderfilter }}</template>
      </el-table-column>
      <el-table-column label="支付状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.pay"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template>
          <el-select class="orderSelect" v-model="orderFettleSelect">
            <el-option label="已关闭" :value="0"></el-option>
            <el-option label="已完成" :value="1"></el-option>
            <el-option label="待发货" :value="2"></el-option>
            <el-option label="已发货" :value="3"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="orderfilters" size="mini" placeholder="输入账户名称搜索" :user="scope"/>
        </template>
        <template slot-scope="scope">
          <el-button
            class="orderEditButton"
            size="mini"
            type="primary"
            @click="orderEdit(scope.$index, scope.row)"
          >编辑订单</el-button>
          <el-button
            class="orderEditButton"
            size="mini"
            type="danger"
            @click="orderDataDelete(scope.$index)"
          >删除订单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加订单" :visible.sync="dialogFormVisible" width="500px" @close="orderCancel">
      <el-form class="orderAdd" :model="form" ref="form">
        <el-form-item label="账户名称" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-input v-model="form.productList" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付状态" :label-width="formLabelWidth">
          <el-switch v-model="form.pay"></el-switch>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-select v-model="form.fettle" placeholder="请选择活动区域">
            <el-option label="已关闭" value="0"></el-option>
            <el-option label="已完成" value="1"></el-option>
            <el-option label="待发货" value="2"></el-option>
            <el-option label="已发货" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderCancel">取 消</el-button>
        <el-button type="primary" @click="orderDataAdd('form')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { localfetch } from "./../../api/access.js";

export default {
  name: "ordersComputing",
  data() {
    return {
      orderfilters: "",
      dialogFormVisible: false,
      form: {
        id: null,
        date: null,
        name: "",
        address: "",
        phone: "",
        userName: "",
        fettle: "0",
        productList: "",
        pay: false,
        money: null,
        postalId: null
      },
      backupForm: {
        id: null,
        date: null,
        name: "",
        address: "",
        phone: "",
        userName: "",
        fettle: "0",
        productList: "",
        pay: false,
        money: null,
        postalId: null
      },
      formLabelWidth: "120px",
      options: [
        {
          value: "广东省",
          label: "广东省",
          children: [
            {
              value: "广州市",
              label: "广州市",
              children: [
                {
                  value: "天河区",
                  label: "天河区"
                },
                {
                  value: "越秀区",
                  label: "越秀区"
                },
                {
                  value: "番禺区",
                  label: "番禺区"
                }
              ]
            }
          ]
        }
      ],
      selectedOptions2: []
    };
  },
  methods: {
    orderCancel() {
      this.dialogFormVisible = false;
      this.form = Object.assign({}, this.backupForm);
    },
    orderEdit(index, row) {
      this.productFromData.row = Object.assign({}, row);
      this.productFromData.index = index;
      this.$router.push("/Admin/orderEdit");
    },
    orderDataDelete(index) {
      this.productFromData.index = index;
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$store.dispatch("orderDataDelete");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          return;
        });
    },
    orderAdd() {
      this.dialogFormVisible = true;
    },
    handleChange(value) {
      this.form.address = value;
    },
    orderDataAdd() {
      var data = [];
      var items;
      var person = this.verification;
      for (items in person) {
        if (!person[items]) {
          data.push(items);
        }
      }
      if (data[0]) {
        data.forEach(items => {
          switch (items) {
            case "userName":
              this.$message({
                type: "warning",
                message: "账户名称不能为空！"
              });
              break;
            case "name":
              this.$message({
                type: "warning",
                message: "客户名称不能为空!"
              });
              break;
            case "address":
              this.$message({
                type: "warning",
                message: "地址不能为空!"
              });
              break;
            case "phone":
              this.$message({
                type: "warning",
                message: "电话不能为空!"
              });
              break;
            case "productList":
              this.$message({
                type: "warning",
                message: "商品不能为空!"
              });
              break;
          }
        });
      } else {
        var userInfoName = localfetch("userInfo");
        if (
          userInfoName.find(items => {
            return items.username === this.form.userName;
          })
        ) {
          // var this.form = Object.assign({}, this.form);
          this.form.address = this.form.address.join("-");
          this.form.productList = this.form.productList.split(",");
          this.form.productList = this.form.productList.map(function(items) {
            return +items;
          });
          var totalPrice = 0;
          this.form.productList.forEach(items => {
            this.tableProductData.forEach(element => {
              if (items === element.id) {
                totalPrice += element.price;
              }
            });
          });
          if (totalPrice === 0) {
            this.$message({
              type: "warning",
              message: "商品ID不存在！!"
            });
            return;
          }
          this.form.id = new Date().format("yyyyMMddhhmmss");
          this.form.date = new Date().format("yyyy-MM-dd hh:mm:ss");
          this.form.money = totalPrice;
          this.form.id = +this.form.id
          this.orderData.push(this.form);
          this.$message({
            type: "success",
            message: "创建成功!"
          });
          this.dialogFormVisible = false;
          this.form = Object.assign({}, this.backupForm);
          console.log(this.orderData);
        } else {
          this.$message({
            type: "warning",
            message: "账户名不存在!"
          });
        }
      }
    }
  },
  computed: {
    ...mapGetters(["orderData", "productFromData", "tableProductData"]),
    verification() {
      var verificationForm = {
        name: this.form.name,
        address: this.form.address,
        phone: this.form.phone,
        userName: this.form.userName,
        productList: this.form.productList
      };

      return verificationForm;
    },
    orderFettleSelect:{
      get(){
        return null
      },
      set(value){
        console.log(value)
      }
    }
    // ...mapState(['productFromData'])
  },
  filters: {
    orderfilter: function(value) {
      value = +value;
      return (value = value.toFixed(2) + "￥");
    }
  }
};
</script>
<style scoped>
.orderEditButton {
  margin: 2px auto;
}
.orderAdd > div {
  margin: 20px auto;
}
.orderSelect {
  width: 100px;
}
</style>