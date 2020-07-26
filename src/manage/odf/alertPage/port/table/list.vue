<template>
  <div>
    <el-table
      :data="tableData"
      row-key="key"
      border
      @row-click="editInfo"
      :row-class-name="tableRowClassName"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <Expand :getData="props.row"></Expand>
        </template>
      </el-table-column>-->
      <el-table-column
        v-for="item  in tableConfig"
        :key="item.key"
        :prop="item.key"
        :label="item.title"
        :width="item.width"
      >
        <el-button v-if="item.key=='operation'" @click="edit">编辑</el-button>
        <!-- <template v-if="item.type==='tag'" slot-scope="scope" >
        <el-tag  size="medium">{{scope.row.stateName}}</el-tag>
        </template>-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _ from 'lodash'
import { config } from './config'
// import Expand from './expand'

export default {
  name: 'list',
  props: {
    fullData: Object,
    page: String
  },
  components: {
    // Expand
  },
  data () {
    return {
      tableData: [],
      eInfo: {},
    }
  },
  methods: {
    editInfo (info) {
      this.eInfo = info;
    },
    edit () {
      setTimeout(() => {
        let info = this.eInfo
        let t = info.portRange.split('-');
        if (t.length == 3)
          this.selectPort(t[0], t[1], t[2], info);
      }, 50)
    },
    selectPort (border, frame, num, info) {
      this.$emit('selectPort', {
        show: border + '-' + frame + '-' + num,
        num: this.$showToPortNum({ show: border + '-' + frame + '-' + num, frame: this.fullData.rectangleRowNum, dist: 12 }),
        info: info
      })
    },
    mShort (sources) {
      let mShortresult = []
      sources.forEach((source) => {
        let nextIndex;
        let group;
        let result = [];
        source.forEach(function (current) {
          let currentIndex = current.key
          if (nextIndex === currentIndex) {
            group.push(current);
            nextIndex++;
            return;
          }
          group = [current];
          nextIndex = currentIndex + 1;
          result.push(group);
        });
        mShortresult = mShortresult.concat(result)
      })
      mShortresult = _.sortBy(mShortresult, mShortresult => mShortresult[0].key)
      return mShortresult
    },
    computedData (info) {
      let useInfos = Object.keys(info.useInfos)
        .filter(key => !isNaN(Number(key)))
        .map((key) => {
          let value = info.useInfos[key]
          return { ...value, key: Number(key) }
        })
        .filter(value => _.has(value, 'ocPortOcPort') && !isNaN(value.ocPortOcPort))
      // 排序
      useInfos = _.sortBy(useInfos, data => data.key)
      let agg = _.filter(_.groupBy(useInfos, 'ocPortOcId'), null)
      //通过ocPortOcId进行分组，过滤空端口
      agg = this.mShort(agg)
        .map(datas => {
          const portMax = _.maxBy(datas, data => data.key).key
          const portMin = _.minBy(datas, data => data.key).key
          let Max = this.$portNumToShow({ port: portMax, dist: 12, frame: info.rectangleRowNum })
          let min = this.$portNumToShow({ port: portMin, dist: 12, frame: info.rectangleRowNum })
          return {
            //获取最大最小值
            ocName: datas[0].ocName,
            portMax: Max,
            portMin: min,
            fiberMax: _.maxBy(datas, data => Number(data.ocPortOcPort)).ocPortOcPort,
            fiberMin: _.minBy(datas, data => Number(data.ocPortOcPort)).ocPortOcPort,
            carryingWay: '-',
            carryingBusiness: '-',
            linkEquiment: '-',
            userPort: '-',
            useId: '-',
            children: datas,
          }
        })
      agg = agg.map(data => {
        let t = {
          ...data,
          // 格式化
          // $portNumToShow({port: a.maxPort, dist: 12
          fiberRange: `${data.fiberMin} ~ ${data.fiberMax}`,
          // todo 需要转换

          portRange: `${data.portMin} ~ ${data.portMax}`,
          key: `${data.portMin} ~ ${data.portMax}`
        }
        return t
      })

      this.tableData = agg.filter(item => {
        return item.ocName
      })
      this.tableData.forEach(data => {
        data.children = data.children.map(item => {
          let stateId = 0
          let stateName = '未使用'
          if (item.ocName) {
            stateId = 1
            stateName = '空闲'
          }
          if (item.useId) {
            stateId = 2
            stateName = '占用'
          }
          let t = {
            ...item,
            portRange: this.$portNumToShow({ port: item.key, dist: 12, frame: info.rectangleRowNum }),
            fiberRange: item.ocPortOcPort,
            stateId,
            stateName
          }
          return t
        })
      })

    },
    tableRowClassName ({ row }) {
      if (row.stateId === 2) {
        return 'use-row';
      } else if (row.stateId === 1) {
        return 'unuse-row';
      }
      return '';
    }
  },
  watch: {
    fullData: function (newVAL) {
      this.computedData(newVAL)
      return newVAL
    },
    tableData: function (newVAL) {
      return newVAL
    }

  },
  computed: {
    tableConfig: function () {
      let i
      if (this.page == 'edit')
        return Object.values(config)
      else
        i = Object.values(config).filter(data => data.key != "operation")
      // .map(item => {
      //   return {
      //     title: item.title,
      //     key: item.key,
      //     width: item.width
      //   }
      // })
      return i
    }
  }
}
</script>

<style>
.el-table .use-row {
  background: rgb(253, 230, 230);
}

.el-table .unuse-row {
  background: #f0f9eb;
}
</style>