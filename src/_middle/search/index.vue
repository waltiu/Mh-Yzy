<template>
  <div>
    <div>
      <el-select
        :disabled="disabled || startLoading"
        :size="size"
        v-model="value"
        :multiple="multiple"
        filterable
        remote
        reserve-keyword
        :placeholder="placeholderStatus"
        :remote-method="startRequest"
        :loading="loading"
        :style="{
        width: width
      }"
        value-key="id"
        @change="change"
      >
        <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item"></el-option>
      </el-select>
      <slot :methods="{clear}"></slot>
    </div>

    <div v-loading="fullInfoLoading">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { checkOutData } from '@/_command/tools'

export default {
  name: 'searchInfo',
  props: {
    disabled: Boolean,
    width: {
      default: '100%',
      type: String
    },
    size: String,
    multiple: Boolean,
    placeholder: String,
    request: Object,
    defaultValue: [Object, String],
    selectTypeMap: Boolean
  },
  data () {
    return {
      fullInfoLoading: false,
      loading: false,
      value: null,
      list: [],
      startLoading: false,
      selectType: ''
    }
  },
  mounted () {
    if (this.selectTypeMap) {
      this.selectType = this.selectTypeMap
    }
  },
  computed: {
    placeholderStatus: function () {
      if (this.loading) {
        return this.$i18n.t('infoMap.loading')
      } else {
        return this.placeholder
      }
    },
    defaultValueToString: function () {
      let name = null
      if (this.defaultValue) {
        if (_.isString(this.defaultValue)) {
          name = this.defaultValue
        } else {
          name = this.defaultValue.name || ''
        }
      }
      return name
    }
  },
  watch: {
    defaultValueToString: {
      immediate: true,
      handler: function (newVal) {
        let name = this.value ? this.value.name : ''
        if (newVal && newVal !== name) {
          this.startLoading = true
          this.startRequest()
            .finally(() => { this.startLoading = false })
            .finally(() => { this.$emit('dataReady', this.value) })
        }
      },
      deep: true
    },
    list: function (newVal) {
      if (!this.value) {
        let list = newVal.filter(item => item.name === this.defaultValueToString)
        if (list.length === 0) {
          if (this.defaultValue && !this.defaultValueToString) this.$message.error(`没有匹配到 ${this.defaultValueToString}`)
        } else {
          this.value = newVal.filter(item => item.name === this.defaultValueToString)[0]
        }
      }
    },
    request: {
      immediate: true,
      handler: function () {
        this.clear()
        this.startRequest()
      }
    }
  },
  methods: {
    startRequest (str = this.defaultValueToString) {
      this.loading = true
      return this.request
        .search({ args: { name: str } })
        .then(checkOutData)
        .then(result => { this.list = result })
        .catch(this.$message.error)
        .finally(() => { this.loading = false })
    },
    change (info) {
      this.$emit('returnData', info)
      if (!this.selectType) {
        this.fullInfoLoading = true
        this.request
          .readOneTable({ info: info })
          .then(res => res.data)
          .then(result => this.$emit('returnFullData', result))
          .finally(() => { this.fullInfoLoading = false })      }
    },
    clear () {
      this.value = null
      this.$emit('clear')
    }
  }
}
</script>
