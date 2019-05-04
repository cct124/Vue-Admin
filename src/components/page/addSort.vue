<template>
  <div class="demo-ruleForm">
    <el-form class="ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="Sort" prop="sort">
        <el-col :span="60">
          <el-input v-model.trim="ruleForm.sort" placeholder="sort对应类名"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="类名" prop="name">
        <el-col :span="60">
          <el-input placeholder="类名通常为中文" v-model.trim="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <span class="sortKeyTableTitle">已有分类</span>
    <el-table
      :data="this.$store.state.database.sortKeyData"
      border
      class="sortKeyTable"
      height="300px"
    >
      <el-table-column prop="sort" label="Sort" width="180"></el-table-column>
      <el-table-column prop="key" label="LocalStorageKey" width="180"></el-table-column>
      <el-table-column prop="name" label="类名"></el-table-column>
      <el-table-column align="right">>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.key)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  localsave,
  localfetch,
  computedQuantityInformation
} from "../../api/access.js";

import { mapState } from "vuex";
import { localremove } from "./../../api/access.js";

export default {
  name: "addsort",
  data() {
    return {
      ruleForm: {
        sort: "",
        name: ""
      },
      rules: {
        sort: [{ required: true, message: "请输入Sort", trigger: "blur" }],
        name: [{ required: true, message: "请输入类名", trigger: "blur" }]
      },
      tableData: []
    };
  },
  computed: {
    ...mapState({
      sortKeyData: state => state.database.sortKeyData
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var pattern = new RegExp("[A-Z]+");
          if (!pattern.test(this.ruleForm.sort)) {
            this.$message({
              message: "Sort应为大写英文字母",
              type: "warning"
            });
            return;
          }
          var data = Object.assign({}, this.ruleForm);
          var sortKeyData = this.sortKeyData;
          if (
            computedQuantityInformation(sortKeyData, "sort", data.sort) ||
            computedQuantityInformation(sortKeyData, "name", data.name)
          ) {
            this.$message({
              message: "Sort或类名以存在",
              type: "warning"
            });
            return;
          }
          sortKeyData.push({
            sort: data.sort,
            key: data.sort + "data",
            name: data.name
          });
          localsave("sortKey", this.sortKeyData);
          this.resetForm(formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDelete(index, key) {
      this.$confirm(
        "此操作将永久删除该分类且此类商品也将被删除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.sortKeyData.splice(index, 1);
          localsave("sortKey", this.sortKeyData);
          this.$store.dispatch("listinFormationinJection");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          return;
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.sortKeyTableTitle {
  font-size: 1em;
  margin: 0 0 5px 10px;
  display: block;
}
.sortKeyTable {
  width: 580px;
  margin: 0 auto;
}
.demo-ruleForm {
  width: 600px;
  margin: 8% auto;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  padding: 10px;
}
.ruleForm {
  width: 380px;
  margin: 80px auto 15px auto;
}
.formNameBrand {
  margin-bottom: 5px;
}
.ruleForm > div {
  margin: 20px auto;
}
</style>
