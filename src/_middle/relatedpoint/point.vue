<template>
  <div>
    <public-svg-icons :svgType="svgType" :color="color" :height="length" :width="length"></public-svg-icons>
  </div>
</template>

<script>
import { itemColor } from '@/_config/urls'
import { mappingList } from './list'

export default {
  name: 'ShowIcon',
  props: {
    type: Number,
    length: {
      default: '60px',
      type: String
    }
  },
  computed: {
    svgType: function () {
      return mappingList[this.type] || 'unknown'
    },
    color: function () {
      return itemColor[this.svgType] ? itemColor[this.svgType].color : 'black'
    }
  }
}
</script>
