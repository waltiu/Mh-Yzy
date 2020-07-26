<template>
  <div>
    <img src="/CRAN.png" />
    <el-switch style="float: right" v-model="buttonStatus" @change="changestatus"></el-switch>
    <public-alert-page-with-button
      :appendToBody="true"
      :info="click"
      :editTf="editTf"
      :title="$t('subdistricts.read_information')"
      :width="'90vw'"
      :top="'10vh'"
      :type="type"
      :tableData="click"
      :request="request"
      @delete="deleteInfo"
    >
      <content-info :request="request" :eventBus="eventBus"></content-info>
    </public-alert-page-with-button>
  </div>
</template>

<script>
import { Cran } from '@/_middle/map/class/handle/cran'
import { FormEventBus } from '@/_command/event'
import ContentInfo from '@/_view/cran/read/content'
import { Delay } from '@/_command/tools'

import { ResourceApiLayer } from '@/_command/curd'



export default {
  name: 'cran',
  props: {
    mapDom: Object
  },
  components: {
    ContentInfo,
  },
  data () {
    return {
      buttonStatus: false,
      cranDom: null,
      click: null,
      editTf: true,
      type: 'cran',
      editData: null,
      edit: false,
      editMap: false
    }
  },
  watch: {
    mapDom: {
      handler: function () {
        this.cranDom = this.cranDom || new Cran(this.mapDom)
        this.bindEvent()
      },
    },
    mapEdit: {
      handler: function (newVal) {
        if (newVal) {
          this.editData = this.click
          this.edit = true
        }
      },
      immediate: true,
      deep: true
    },
    mapInfoUpdata: {
      handler: function (newVal) {
        if (newVal && newVal.mapType === 'cran') {
          this.changestatus()
          this.click = newVal
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    request: function () {
      return new ResourceApiLayer('cran')
    },
    eventBus: function () {
      return new FormEventBus(this.click)
    },
    mapEdit: function () {
      return this.$store.state.mapDetailEdit
    },
    mapInfoUpdata: function () {
      return this.$store.state.mapEditInfo
    },
  },
  methods: {
    deleteInfo () {
      this.changestatus()
      this.click = null
    },
    changestatus () {
      if (this.buttonStatus) {
        this.$http.get('api/ldsysOpticalMultiplexers/search/listLdsysOpticalMultiplexer', {
          params: {
            lng: this.mapDom.getCenter().x,
            lat: this.mapDom.getCenter().y,
            zoom: this.mapDom.getZoom().toFixed()
          }
        }).then(res => {
          this.cranDom.show(res.data._embedded)
        })
      } else {
        if (this.cranDom) {
          this.cranDom.clear()
        }
      }

    },
    bindEvent () {
      this.mapDom
        .on('moveend dragrotateend baselayerload', () => this.dely.callback(this.changestatus))

      this.cranDom
        .listenItemEvent('click', info => { this.click = { ...info } })
    }
  },
  mounted () {
    this.dely = new Delay(2000)

  }
}
</script>

<style>
</style>
 