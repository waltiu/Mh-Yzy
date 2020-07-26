<template>
  <div>
    <div class="buttonlist">
      <md-button @click="zoomIn" class="md-icon-button md-primary md-raised">
        <md-icon>zoom_in</md-icon>
      </md-button>
    </div>
    <div class="buttonlist">
      <div class="inputspace">{{zoom}}</div>
    </div>
    <div class="buttonlist">
      <md-button @click="zoomOut" class="md-icon-button md-primary md-raised">
        <md-icon>zoom_out</md-icon>
      </md-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'zoomControl',
  props: {
    map: Object
  },
  computed: {
    zoom: function () {
      if (_.isEmpty(this.map)) {
        return ''
      } else {
        return parseInt(this.map.getZoom())
      }
    }
  },
  methods: {
    zoomOut () {
      if (this.map.getMinZoom() < this.zoom) {
        this.map.animateTo({
          zoom: this.zoom - 1
        })
      } else {
        this.$message.info(this.$i18n.t('alert.minimumZoom'))
      }
    },
    zoomIn () {
      if (this.map.getMaxZoom() > this.zoom) {
        this.map.animateTo({
          zoom: this.zoom + 1
        })
      } else {
        this.$message.info(this.$i18n.t('alert.maximizedZoom'))
      }
    }
  }
}
</script>

<style scoped>
.buttonlist {
  width: 100px;
  margin-bottom: 10px;
}
.inputspace {
  font-size: 18px;
  margin-left: 15px;
  height: 20px;
  width: 35px;
}
</style>
