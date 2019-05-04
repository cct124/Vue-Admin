<template>
  <div>
    <div class="demoruleForm">
      <el-form
        class="ruleForm"
        :model="ruleForm = this.$store.state.database.basicProductInformation"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="商品ID" prop="id">
          <el-input v-model.number.trim="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="sort">
          <el-select v-model="ruleForm.sort" placeholder="请选择商品分类">
            <el-option
              v-for="(item, index) in this.sortKeyData"
              :key="index"
              :label="item.name"
              :value="item.sort"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" prop="Brand">
          <el-col :span="60">
            <el-input
              class="formNameBrand"
              placeholder="品牌"
              v-model.trim="ruleForm.Brand"
              autocomplete="off"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="型号" prop="model">
          <el-col :span="60">
            <el-input v-model.trim="ruleForm.model" placeholder="型号" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number.trim="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="reserve">
          <el-input v-model.number.trim="ruleForm.reserve"></el-input>
        </el-form-item>
      </el-form>
      <div class="demoruleFormButton">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { computedQuantityInformation } from "../../api/access.js";
import { mapState } from "vuex";

export default {
  name: "addCommodity",
  data() {
    return {
      rules: {
        id: [
          { required: true, message: "商品ID不能为空" },
          { type: "number", message: "商品ID必须为数字" }
        ],
        price: [
          { required: true, message: "商品价格不能为空" },
          { type: "number", message: "商品价格须为数字" }
        ],
        reserve: [
          { required: true, message: "库存不能为空" },
          { type: "number", message: "库存必须为数字" }
        ],
        sort: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        Brand: [{ required: true, message: "请输入品牌", trigger: "blur" }],
        model: [{ required: true, message: "请输入型号", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState({
      sortKeyData: state => state.database.sortKeyData
    })
  },
  methods: {
    submitForm(formName) {
      if (
        computedQuantityInformation(
          this.$store.state.database.tableProductData,
          "id",
          this.$store.state.database.basicProductInformation.id
        )
      ) {
        this.$message({
          message: "id已存在!",
          type: "warning"
        });
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("addProductDate");
          this.resetForm(formName);
          this.$message({
            type: "success",
            message: "创建成功!"
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.demoruleForm {
  width: 500px;
  margin: 8% auto;
  height: 600px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
}
.demoruleFormButton {
  width: 190px;
  margin: 0 auto;
  display: block;
}
.ruleForm {
  width: 350px;
  margin: 0 auto;
  height: 400px;
  margin-top: 50px;
}
.ruleForm > div {
  margin: 20px auto;
}
</style>
