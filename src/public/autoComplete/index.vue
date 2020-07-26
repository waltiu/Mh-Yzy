<template>
  <!-- 全局组件， 禁止直接引用文件 -->
  <div>
    <el-select
      :collapse-tags="collapseTags"
      :multiple="multiple"
      clearable
      :disabled="disabled"
      style="width: 100%;"
      :size="size"
      :value="selectData"
      filterable
      value-key="id"
      :placeholder="$t(placeholder)"
      :remote-method="search"
      :remote="true"
      :loading="loading"
      @change="change"
    >
      <el-option
        v-for="(option) in resultData"
        :key="option.id"
        :label="option.name"
        :value="option"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'autoCompleteGlobal',
  props: {
    collapseTags: Boolean,
    multiple: Boolean,
    size: {
      type: String,
      default: 'small'
    },
    preString: {
      default: '%', // 预制的搜索前后附加
      type: String
    },
    values: null,
    placeholder: {
      default: 'tableSearch.pleaseInput',
      type: String
    },
    url: String, // 搜索 URL
    preData: Object, // Search 的预置信息
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      resultDataBase: [],
      selectDataBase: {}
    }
  },
  computed: {
    selectData: function () {
      if (_.isObject(this.values)) {
        return this.values
      } else {
        if (!_.isEmpty(this.selectDataBase)) {
          return this.selectDataBase
        }
        return {
          id: 99999999999999999999,
          name: this.values
        }
      }
    },
    resultData: function () {
      if (this.resultDataBase && this.resultDataBase.length) {
        return this.resultDataBase
      } else {
        return [this.selectData]
      }
    }
  },
  methods: {
    change (newVal) {
      this.selectDataBase = newVal
      this.$emit('returnData', newVal)
    },
    search (searchText) {
      this.loading = true
      this.$http.get(this.url, {
        params: {
          size: 10,
          page: 0,
          name: this.preString + searchText + this.preString,
          ...this.preData
        }
      }).then((res) => {
        this.loading = false
        this.resultDataBase = this.$checkOutData(res)
      })
    }
  }
}
</script>
