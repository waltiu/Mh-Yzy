<template>
  <div>
    <el-checkbox-group v-model="checked" @change="change">
      <el-checkbox :label="'notSameServiceAreaAndAssociated'">
        <span class="colorful">不同</span>
        业务区
        <span class="colorful">关联</span>
        机房 ({{ checkNum('notSameServiceAreaAndAssociated') }})
      </el-checkbox>
      <el-checkbox :label="'sameServiceAreaAndAssociated'">
        <span class="colorful">同</span>
        业务区
        <span class="colorful">关联</span>
        机房 ({{ checkNum('sameServiceAreaAndAssociated') }})
      </el-checkbox>
      <el-checkbox :label="'sameServiceAreaAndNotAssociated'">
        <span class="colorful">同</span>
        业务区
        <span class="colorful">未关联</span>
        机房 ({{ checkNum('sameServiceAreaAndNotAssociated') }})
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'SubdistrictsCheckbox',
  props: {
    eventBus: Object
  },
  data () {
    return {
      checked: [],
      mechinerooms: []
    }
  },
  watch: {
    eventBus: {
      immediate: true,
      handler: function () {
        this.bindEvent()
      }
    }
  },
  computed: {
    filterCheck: function () {
      return this.mechinerooms
        .filter(item => this.checked.includes(item.typeForSubdistrict))
    }
  },
  methods: {
    checkNum (key) {
      return this.mechinerooms
        .filter(item => item.typeForSubdistrict === key)
        .length
    },
    change () {
      this.eventBus.emit('ToShowList', this.filterCheck)
    },
    bindEvent () {
      this.eventBus
        .on('FullChange', (res) => this.mechinerooms = res.ldsysMachineRoomList)
        .on('FullChange', () => this.change())
    }
  }
}
</script>

<style>
.colorful {
  color: #3099ff;
  font-weight: bold;
}
</style>