<template>
  <div>
    <el-table :data="tableData" style="width: 100%" :default-expand-all="true">
      <el-table-column type="expand">
        <template v-slot:default="{ '$index': index }">
          <fullinfo-view :tableData="parseData(showInfo[index].clash)"></fullinfo-view>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" v-slot:default="{ '$index': index }" width="400px">
        <div>
          <el-button
            type="primary"
            icon="el-icon-info"
            size="mini"
            circle
            @click="$alertInfo(showInfo[index].wa, 'business')"
          ></el-button>
          {{ showInfo[index].wa.name }}
          <hr />

          <el-button
            type="primary"
            icon="el-icon-info"
            size="mini"
            circle
            @click="$alertInfo(showInfo[index].wa, 'business')"
          ></el-button>
          {{ showInfo[index].wb.name }}
        </div>
      </el-table-column>
      <el-table-column label="ODF" prop="odf"></el-table-column>
      <el-table-column label="光缆" prop="oc"></el-table-column>
      <el-table-column label="光交" prop="occ"></el-table-column>
      <el-table-column label="引上" prop="ledUp"></el-table-column>
      <el-table-column label="引入段" prop="ledUpLineSection"></el-table-column>
      <el-table-column label="电杆" prop="pole"></el-table-column>
      <el-table-column label="杆路段" prop="poleLineSection"></el-table-column>
      <el-table-column label="撑点" prop="support"></el-table-column>
      <el-table-column label="挂墙段" prop="supportLineSection"></el-table-column>
      <el-table-column label="井" prop="well"></el-table-column>
      <el-table-column label="管道段" prop="wellLineSection"></el-table-column>

      <el-table-column label="地图" v-slot:default="{ 'row': data }">
        <map-view :showData="data"></map-view>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import fullinfoView from './fullinfo'
import MapView from './map/map'

export default {
  name: 'DiffRouteTable',
  props: {
    showInfo: Array
  },
  components: {
    fullinfoView, MapView
  },
  computed: {
    tableData: function () {
      return this.showInfo.map(item => item.info)
    }
  },
  methods: {
    parseData (info) {
      let maxLength =
        Object
          .values(info)
          .map(item => item.length)
          .sort()
          .reverse()[0]

      return [...Array(maxLength)]
        .map((item, index) =>
          Object
            .entries(info)
            .reduce((res, [key, val]) => {
              res[key] = val[index] || null
              return res
            }, {})
        )
    }
  }
}
</script>
