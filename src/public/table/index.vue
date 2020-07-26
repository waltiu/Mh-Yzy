<template>
  <!-- 这是一个共用组件, 是各个表格的 base
      这个组件包含  删除, 查看, 在地图上
      API:
        button: [edit, show, map, del] [all]
        baseKey: 用途 (权限控制)
        columns: 表头 Array
        tableData: 数据 Array
      EMIT:
        reload: 请求重载方法
  -->
  <div>
    <display-in-map :type="type" :point.sync="selectArrayForMap"></display-in-map>
    <div style="margin: 10px 10px 10px 10px;">
      <table-components
        @on-selection-change="(e) => { selectArray = e }"
        :columns="operating"
        :data="tableData != 0 ? tableData : []"
        :loading="loading"
      ></table-components>
    </div>

    <div style="display: block;">
      <slot name="errorButton">
        <el-button
          size="small"
          type="danger"
          v-if="!!selectArray.length"
          @click="deleteAlert(selectArray)"
          style="margin-top: 18px; float: left;"
        >{{$t('tableSearch.deleteItem')}}</el-button>
      </slot>
      <slot v-bind:selectArray="selectArray"></slot>
    </div>
  </div>
</template>

<script>
import displayInMap from '../displayInMap'
import tableComponents from './tableComponents.vue'

export default {
  components: {
    tableComponents,
    displayInMap
  },
  name: 'showTables',
  props: {
    type: String, // 要显示的类型
    columns: Array,
    tableData: Array,
    button: Array
  },
  computed: {
    operating: function () {
      if (this._.isEmpty(this.button)) return [...this.columnsFilter]
      let target = this._.cloneDeep(this.columnsFilter)
      let length = target.length
      if (target[length - 1].title === 'tableSearch.operation') {
        target[length - 1] = {
          width: 300,
          ...target[length - 1],
          align: 'center',
          render: (h, params) =>
            h('div', { style: 'display: flex;' }, [
              this.columnsFilter[length - 1].render(h, params),
              this.tableOperating(h, params)
            ])
        }
      }
      return target
    },
    columnsFilter: function () {
      return this.columns.reduce((res, val) => {
        if (!val.tableDisplay) return res
        switch (true) {
          case !!val.enumerate:
            res.push(
              {
                ...val,
                render: (h, params) => {
                  let item = this.$store.getters.getObjByCode[params.row[params.column.property]]
                  return h('p', item ? item.name : this.$i18n.t('infoMap.noCorresponding')) // 暂无对应
                }
              }
            )
            break

          case (val.inputType === 'date' || val.time):
            res.push(
              {
                ...val,
                render: (h, params) => {
                  return h('p', this.$formatTime(params.row[params.column.property]) || this.$i18n.t('infoMap.noCorresponding')) // 无时间
                }
              }
            )
            break

          case (val.colorPicker):
            res.push(
              {
                ...val,
                render: (h, params) => {
                  return h('color-picker', {
                    props: {
                      color: params.row[params.column.property]
                    }
                  })
                }
              }
            )
            break

          default:
            res.push(val)
            break
        }

        return res
      }, [])
    }
  },
  watch: {
    tableData: function (newVal) {
      console.log(newVal)
      if (newVal && newVal[0] !== 0) {
        this.loading = false
      } else {
        this.loading = true
      }
    },
    deleteArray: function (newVal) {
      if (newVal) {
        this.deleteAlert([newVal])
        this.deleteArray = null
      }
    }
  },
  data () {
    return {
      styleObject: {},
      selectArray: [], // 多选框选择的
      selectArrayForMap: {}, // 选中的信息显示地图
      selectArrayForView: {}, // 选中的信息显示详细信息
      deleteArray: [],
      loading: true,
      showButton: [],
      tableOperating: (h, params) =>
        <div style="margin-left: 10px;">
          {this.$checkPermission(this.type, 'r') && this.showButton.includes('show')
            ? <el-button type="primary" size="mini"
              onClick={() => { this.selectArrayForView = params.row }}>{this.$i18n.t('alert.view')}</el-button>
            : ''}
          {this.$checkPermission(this.type, 'd') && this.showButton.includes('del')
            ? <el-button type="danger" size="mini"
              onClick={() => { this.deleteArray = params.row }}>{this.$i18n.t('addZone.delete')}</el-button>
            : ''}
          {this.$checkPermission(this.type, 'r') && this.showButton.includes('map')
            ? <el-button type="primary" size="mini"
              onClick={() => { this.selectArrayForMap = params.row }}>{this.$i18n.t('alert.map')}</el-button>
            : ''}
        </div>
    }
  },
  methods: {
    deleteAlert (info) {
      let tmp = info.map(item => item.name)
      this.$confirm(this.$i18n.t('business.delete') + tmp.length + this.$i18n.t('business.entry'), {
        type: 'warning'
      })
        .then(() => {
          for (const iterator of info) {
            this.$resourceOperating({
              name: this.type,
              type: 'delete',
              info: iterator
            }, e => {
              this.$checkStatus(e)
              this.$emit('reload')
            })
          }
        })
        .catch(() => { })
    },
    reloadTable () {
      this.loading = true
      this.$emit('reload')
    }
  },
  mounted () {
    this.$store.watch(state => state.other.uploadFileOK, () => {
      this.$emit('reload')
    })
    if (this.button) {
      if (this.button.includes('all')) {
        this.showButton = ['map', 'del', 'show']
      } else {
        this.showButton = [...this.button]
      }
    }
  }
}
</script>
