<template>
  <div v-loading="loading" style="width: 100%">
    <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); padding:30px">
      <el-radio-group v-model="value">
        <el-radio
          v-for="item in options"
          :key="item.value"
          :label="$t(item.label)"
          :value="item.value"
        ></el-radio>
      </el-radio-group>
    </div>
    <div style="margin-top: 30px">
      <!-- <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <el-table
        :data="tableData2"
        border
        row-key="id"
        style="width: 100%"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column align="center" prop="area" :label="$t('statistics.canton')" width="96%"></el-table-column>

        <el-table-column
          align="center"
          prop="detail_area"
          :label="$t('statistics.businessArea')"
          width="96%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="核心机房"
          :label="$t('statistics.coreEquipmentRoom')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="光交箱"
          :label="$t('statistics.opticalFiberBox')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="园区分纤箱光交箱"
          :label="$t('statistics.ParkSubFiberLightBox')"
          width="93%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="一级光交箱"
          :label="$t('statistics.1stOpticalFiberBox')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="二级光交箱"
          :label="$t('statistics.2ndOpticalFiberBox')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="分光器"
          :label="$t('statistics.opticalSplitter')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="一级分光器"
          :label="$t('statistics.1stOpticalSplitter')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="二级分光器"
          :label="$t('statistics.2ndOpticalSplitter')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="室分"
          :label="$t('statistics.indoorCoverage')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="用户机房"
          :label="$t('statistics.userEquipmentRoom')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="骨干汇聚机房"
          :label="$t('statistics.mainConvergenceEquipmentRoom')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="OLT设备"
          :label="$t('statistics.OLTDevice')"
          width="92%"
        ></el-table-column>

        <el-table-column align="center" prop="基站" :label="$t('statistics.baseStation')" width="92%"></el-table-column>

        <el-table-column
          align="center"
          prop="设备"
          :label="$t('statistics.equipmentResources')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="全业务机房"
          :label="$t('statistics.fullServiceEquipmentRoom')"
          width="92%"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="汇聚机房"
          :label="$t('statistics.convergenceEquipmentRoom')"
          width="92%"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "SeviceAll",
  data() {
    return {
      classId: 1,
      isTableAlive: [false, false, false],
      isRouterAlive: false,
      activeNames: ["1"],
      const: {
        carrierData: {}
      },
      tableData: [],
      tableData2: [],
      options: [
        {
          value: "All",
          label: "dataManagerCard.all"
        }
      ],
      value: "所有",
      loading: true
    };
  },
  created () {
    this.getAll();
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    getAll: async function () {
      this.loading = true;
      let res = await this.$http.get(
        "/api/ldsysCount/getResourceCountByServiceArea"
      );
      let temp = {};
      let temp_area = "";
      let id = 0;

      for (let area in res.data) {
        temp["value"] = area;
        temp["label"] = area;
        let father_data = {};
        let child_id = 1;
        this.options.push(temp);
        temp = {};

        // let b = this.tableData[area]
        let b = res.data[area];

        // console.log('area 是：' + area + ' b 是:' + b)
        for (let c in b) {
          let d = b[c];
          // console.log('c 是' + c + ' d是:' + d)
          for (let e in d) {
            let row_data = d[e];
            row_data["detail_area"] = e;
            if (area != temp_area) {
              row_data["area"] = area;
              father_data = row_data;
              father_data["id"] = ++id;
              father_data["children"] = [];
              this.tableData2.push(father_data);
            } else {
              row_data["id"] = "" + id + child_id++;
              father_data["children"].push(row_data);
            }
            temp_area = area;
            // console.log('e 是' + e + " f是:" + f)
            // for (let g in f) {
            //   let h = f[g]
            //   console.log('g,' + g + ',h是:' + h)
            // }
          }
        }
        // console.log(Object.entries(res.data).map(([key, val]) => val.forEach()) )
        // console.log(Object.entries(res.data).map(([key, val]) => val.map(item => {  })) )
        this.tableData = this.tableData2;
      }

      this.loading = false;
    },
    show(f) {
      if (this.isTableAlive[f] === false) {
        this.isTableAlive[f] = true;
      } else {
        this.isTableAlive[f] = false;
      }
      this.reload();
    }
  },
  watch: {
    // 筛选
    value: function (val) {
      this.tableData2 = [];
      if (val === "All" || val === "所有") this.tableData2 = this.tableData;
      if (val != "" && val != "All") {
        let flag = 0;
        for (let x in this.tableData) {
          x = this.tableData[x];
          if (x.area == val) flag = 1;
          if (flag == 1) {
            if (x.area != undefined && x.area != val) break;
            this.tableData2.push(x);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
template div div el-table {
  text-align: center;
}
</style>
