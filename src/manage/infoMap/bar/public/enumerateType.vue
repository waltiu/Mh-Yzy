<template>
  <!-- 这个组件是用来枚举的组件， 用来针对卡片上枚举的信息进行筛选 -->
  <div class="box">
    <el-form label-width="90px" size="mini">
      <div v-for="(a, index) in enumerateArray" :key="index">
        <div v-if="!!a.enumerate" class="enuselectitem">
          <div class="nameBox">
            <span>{{$t(a.title)}}:</span>
          </div>

          <el-select
            class="input"
            clearable
            size="small"
            v-model="form[a.key]"
            :placeholder="$t('tableSearch.all')"
            :multiple="!!a.mapMultipleSplit"
          >
            <!-- 进入Vuex字典筛选 -->
            <el-option
              v-for="(b, indexB) in $store.getters.getObjByType[a.enumerate]"
              :key="indexB"
              :label="b.name"
              :value="b.code"
            ></el-option>
          </el-select>
        </div>
      </div>

      <slot></slot>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'enumerateType',
  props: {
    name: String, // 更新的目标
    enumerateArray: Array // 枚举的目标, 为字典里的中文属性
  },
  data () {
    return {
      form: {}
    }
  },
  watch: {
    form: {
      handler: function (newVal) {
        let val = Object.entries(newVal).reduce((res, [key, val]) => {
          if (Array.isArray(val)) {
            res[key] = val.join(';')
          } else {
            res[key] = val
          }
          return res
        }, {})
        this.$emit('returnData', val)
        // 提交Vuex
        this.$store.commit('setInputSelect', {
          name: this.name,
          keys: this.name,
          val: val
        })
      },
      deep: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.form = this.$store.state.infoMapShow.inputSelect[this.name].selected
      this.form = this.enumerateArray.reduce((res, val) => {
        if (val.mapMultipleSplit) {
          res[val.key] = []
        }
        return res
      }, {})
    })
  }
}
</script>

<style>
.enuselectitem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
  align-items: center;
}
.nameBox {
  display: flex;
  width: 25%;
  font-size: 13px;
  /*justify-content: flex-end;*/
}
.input {
  width: 75%;
}
</style>
