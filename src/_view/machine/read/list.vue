<template>
  <div>
    <div v-for="(item, index) in columnConfig" :key="index">
      <div :style="item.style || { display: 'flex' }">
        <slot :name="`${item.key}-full`">
          {{ item.title && `${$t(item.title)} :` }}
          <div style="margin-left: 10px;">
            <slot :name="`${item.key}-header`"></slot>
            <slot :name="`${item.key}-body`">
              <public-render
                v-if="item.render"
                :renderObject="item.render"
                :value="fullData[item.key]"
                :fullData="fullData"
                :bus="bus"
                @bindData="(info) => { bindData(info, item.key) }"
              ></public-render>

              <div v-else>{{ fullData[item.key] || '空' }}</div>
            </slot>

            <slot :name="`${item.key}-tail`"></slot>
          </div>
        </slot>
      </div>

      <hr v-if="item.title" style="margin: 5px" />
    </div>
  </div>
</template>

<script>
import { column } from '../index.js'
export default {
  name: 'ContentShow',
  data () {
    return {

    }
  },
  props: {
    fullData: Object
  },
  watch: {
    fullData: function (newvAL) {
      this.fullData = newvAL
    },
  },
  computed: {
    columnConfig: function () {
      return Object.values(column).filter(item => item.read)
    }
  }
}
</script>
