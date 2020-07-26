<template>
  <div class="filterByDict_box">
    <!-- 通过字典类型来过滤 数据的组件,  -->
    <div class="tittleBox">
      <span style="font-size: 14px">{{ $t(dictName1) }}</span>
    </div>

    <el-checkbox-group v-model="selected" v-loading="loading">
      <div
        v-for="(a, index) in $store.getters.getObjByType[dictName]"
        :key="index"
        style="display: grid;"
      >
        <!-- {{ a }} -->
        <!-- <p> {{ a.name }} </p> -->

        <div class="checkBox">
          <el-checkbox :label="a.code">
            <span style="font-size: 13px">{{ a.name }}</span>
          </el-checkbox>

          <div style="display: flex; flex-direction: row; align-items: center;height: 30px">
            <!-- 线, 线段 -->
            <div
              v-if="line"
              :style="'border: 2px solid' + color[a.code] + '; width: 50px; height: 1px;  margin-right: 10px;'"
            ></div>

            <!-- SVG -->
            <public-svg-icons
              class="colorManage"
              v-if="icon"
              v-show="false"
              style="margin-right: 8px"
              :color="color[a.code]"
              :svgType="icon"
              @returnData="(val) => {$set(b64, a.code, val)}"
            ></public-svg-icons>

            <el-color-picker v-model="color[a.code]" size="mini"></el-color-picker>
          </div>
        </div>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'filterByDict',
  props: {
    dictName: String,
    icon: String,
    line: Boolean,
    dictKey: String,
    dictName1: String
  },
  data () {
    return {
      loading: true,
      selected: [],
      color: {},
      b64: {}
    }
  },
  computed: {
    dictList: function () {
      if (this.$store.getters.getObjByType[this.dictName]) {
        return this.$store.getters.getObjByType[this.dictName].map(item => {
          return item.code
        })
      } else {
        return []
      }
    }
  },
  watch: {
    selected: function () {
      this.$emit('returnData', { selected: this.selected, color: this.color, b64: this.b64 })
    },
    // 在初次加载的时候需要监视检出
    '$store.getters.getObjByType': function () {
      this.checkOutColor()
    }
  },
  mounted () {
    this.checkOutColor()
    // 检出所选择的项目
    if (this.icon) {
      if (this.$store.state.infoMapShow.inputSelect[this.icon].config[this.dictKey]) {
        this.selected = [...this.$store.state.infoMapShow.inputSelect[this.icon].config[this.dictKey].selected]
      } else {
        this.selected = []
      }
    }
  },
  methods: {
    // 检出颜色数据, 如果颜色没有显示，将默认使用black
    checkOutColor () {
      this.$nextTick(() => {
        if (this.$store.getters.getObjByType[this.dictName]) {
          this.$store.getters.getObjByType[this.dictName].map(item => {
            this.color = { ...this.color, [item.code]: item.jsonExtends.color || 'black' }
          })
          setTimeout(() => {
            this.loading = false
          }, 2000)
        }
      })
    },
    checkSelectItems () {
    }
  }
}
</script>

<style>
.checkBox {
  /*margin-top: 5px;*/
  width: 100%;
  display: flex;
  flex-direction: row;
  /*justify-items: center;*/
  justify-content: space-between;
  align-items: center;
  height: 30px;
}
.tittleBox {
  border-left: 2px solid #2d8cf0;
  padding-left: 4px;
}
.filterByDict_box {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}
</style>
