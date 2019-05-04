<template>
  <el-main>
    <el-table
      :data="tableProductData.filter(data => !search || data.model.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      height="100%"
    >
      <el-table-column label="商品ID" prop="id"></el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          <span class="productName">
            <p>型号: {{ scope.row.model }}</p>
            <p>品牌: {{ scope.row.Brand }}</p>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <span class="productPictureSpan">
            <img class="productPicture" :src="scope.row.img" alt="图片">
          </span>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">{{ scope.row.price | Pricefilter }}</template>
      </el-table-column>
      <el-table-column label="销量" prop="salesVolume"></el-table-column>
      <el-table-column label="库存" prop="reserve"></el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.sort | namefilter }}</el-tag>
          <el-tag type="success" v-if="scope.row.Listing">以上架</el-tag>
          <el-tag type="info" v-if="!scope.row.Listing">未上架</el-tag>
          <!-- <span>上架</span>
          <el-switch v-model="scope.row.Listing" active-color="#13ce66" inactive-color="#c5c5c5"></el-switch>-->
        </template>
      </el-table-column>
      <el-table-column label="审核状态" prop="check">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.check">以审核</el-tag>
          <el-tag type="info" v-if="!scope.row.check">未审核</el-tag>
          <!-- <el-button class="reviewDetails" type="success" v-if="scope.row.check">以审核</el-button>
          <el-button class="reviewDetails" type="danger" v-if="!scope.row.check">未审核</el-button>-->
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入商品名称搜索" :user="scope"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="open2(scope.$index, scope.row)">删除</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.id, scope.row.sort)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <router-view></router-view>
  </el-main>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { localfetch } from "./../../api/access.js";

export default {
  data() {
    return {
      search: "",
      dialogFormVisible: false,
      formLabelWidth: "80px",
      payload: {
        index: null,
        id: null,
        sort: null
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$store.state.database.productFromData.row = Object.assign({}, row);
      this.$store.state.database.productFromData.index = index;
      this.$router.replace({ path: "/Admin/tabularData/productEdit" });
      this.$store.state.database.productEditFrom = true;
    },
    handleDelete(index, id, sort) {
      this.payload.index = index;
      this.payload.id = id;
      this.payload.sort = sort;
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.$store.dispatch("productDataDelete", this.payload);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
          return;
        });
    }
  },
  computed: {
    ...mapGetters(["tableProductData"])
  },
  filters: {
    Pricefilter: function(value) {
      value = +value;
      return value.toFixed(2);
    },
    namefilter: function(value) {
      var item = localfetch("sortKey").find(items => {
        return items.sort === value;
        // console.log(items.sort)
      });
      // console.log(localfetch("sortKey"), value);
      return item.name;
    }
  }
};
</script>

<style>
.productPictureSpan {
  width: 100px;
  height: 100px;
}
.formNameBrand {
  margin-bottom: 5px;
}
.cell {
  text-align: center;
  text-align: -webkit-center;
}
.productName {
  text-align: left;
}
.productPicture {
  width: 60%;
  background: #ececec;
}
.reviewDetails {
  width: 70px;
  height: 30px;
  line-height: 2px;
  padding: 0;
  font-weight: 300;
}
.el-tag {
  margin: 5px;
}
</style>
