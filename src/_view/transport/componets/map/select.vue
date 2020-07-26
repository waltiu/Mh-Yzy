<template>
  <div>
    <el-select
      style="width: 100%;"
      :multiple="true"
      v-model="select"
      value-key="id"
      size="mini"
      v-on="$listeners"
    >
      <el-option v-for="item in selectList" :key="item.name" :label="item.name" :value="item"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'SelectItem',
  props: {
    selectInfo: Array
  },
  data () {
    return {
      select: [],
      selectList: []
    }
  },
  watch: {
    selectInfo: function (newVal) {
      this.select = newVal
      this.selectList = newVal
    }
  },
}
</script>
