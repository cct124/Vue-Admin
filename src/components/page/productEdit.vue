<template>
    <el-dialog title="商品编辑" @close="closeFrom" :visible="this.$store.state.database.productEditFrom" width="500px">
      <el-form :model="form = this.$store.state.database.productFromData.row">
        <el-form-item label="商品ID" :label-width="formLabelWidth">
          <el-col :span="40">
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-col :span="60">
            <el-input
              class="formNameBrand"
              placeholder="品牌"
              v-model="form.Brand"
              autocomplete="off"
            ></el-input>
            <el-input v-model="form.model" placeholder="型号" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-input v-model="form.price" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="销量" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-input v-model="form.salesVolume" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-input v-model="form.reserve" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上架" :label-width="formLabelWidth">
          <el-switch v-model="form.Listing"></el-switch>
        </el-form-item>
        <el-form-item label="审核" :label-width="formLabelWidth">
          <el-switch active-text="已审核" inactive-text="未审核" v-model="form.check"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFrom">取 消</el-button>
        <el-button type="primary" @click="productDataChange">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name:'productEdit',
    data() {
    return {
      formLabelWidth: "80px"
    };
  },
  methods: {
    productDataChange() {
      this.$store.dispatch("productFromDataChange");
      this.$store.state.database.productEditFrom = false;
    },
    closeFrom() {
        this.$store.state.database.productEditFrom = false;
    }
  },
  computed: {
    ...mapGetters(["tableProductData"])
  },
}
</script>

<style>

</style>
