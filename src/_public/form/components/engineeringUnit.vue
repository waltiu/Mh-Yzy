<template>
  <el-select
    clearable
    @change="sendMsg"
    size="small"
    v-model="value2"
    value-key="id"
    placeholder="选择工程单位"
  >
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item"></el-option>
  </el-select>
</template>

<script>
import { http } from '@/_command/http';

export default {
  name: "enginennringUnit",
  props: {
    value: Number
  },
  data () {
    return {
      options: [],
      value2: {},
    }
  },
  methods: {
    sendMsg () {
      this.$emit('returnData', this.value2)
    },
    getSelectInfo () {
      http.get('/api/departments/all')
        .then(res => this.options = res.data)
    }
  },
  mounted () {
    this.getSelectInfo()

  },
  watch: {
    value: function () {
      this.value2 = this.options.find(item => item.id == this.value)
    },
    options: function () {
      if (JSON.parse(sessionStorage.getItem('other')).sysDepartments.length) {
        const sysDepartments = JSON.parse(sessionStorage.getItem('other')).sysDepartments[0]
        this.value2 = sysDepartments || {}
      } else {
        this.value2 = this.options[0] || {}
      }
      this.sendMsg()
    }
  }

}
</script>