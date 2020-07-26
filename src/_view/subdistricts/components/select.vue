<template>
  <div>
    <el-select
      style="width: 100%;"
      :multiple="true"
      v-model="select"
      value-key="id"
      size="mini"
      v-on="$listeners"
      @change="eventBus.emit('ToMapToShow', select)"
    >
      <el-option v-for="item in selectList" :key="item.name" :label="item.name" :value="item"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'SelectItem',
  props: {
    eventBus: Object
  },
  data () {
    return {
      select: [],
      selectList: []
    }
  },
  methods: {
  },
  mounted () {
    this.eventBus
      .on('ToSelect', val => this.selectList = val)
      .on('ToSelect', val => this.select = val)
      .on('ToSelect', val => { this.eventBus.emit('ToMapToShow', val) })
  },
}
</script>
