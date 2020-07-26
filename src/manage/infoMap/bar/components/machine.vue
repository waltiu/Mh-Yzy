<template>
  <div>
    <img src="/machine.png" />
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
import { Machine } from '@/_middle/map/class/handle/machine'
import { FormEventBus } from '@/_command/event'
import ContentInfo from '@/_view/machine/read/content'
import { Delay } from '@/_command/tools'

import { ResourceApiLayer } from '@/_command/curd'



export default {
  name: 'machine',
  props: {
    mapDom: Object
  },
  components: {
    ContentInfo
  },
  data () {
    return {
      buttonStatus: false,
      machineDom: null,
      click: null,
      editTf: true,
      type: 'machine',
      editData: null,
      edit: false,
      editMap: false
    }
  },
  watch: {
    mapDom: {
      handler: function () {
        this.machineDom = this.machineDom || new Machine(this.mapDom)
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
        if (newVal && newVal.mapType === 'machine') {
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
      return new ResourceApiLayer('machine')
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
        this.$http.get('api/ldsysMachineFrames/search/listLdsysMachineFrame', {
          params: {
            lng: this.mapDom.getCenter().x,
            lat: this.mapDom.getCenter().y,
            zoom: this.mapDom.getZoom().toFixed()
          }
        }).then(res => {

          this.machineDom.show(res.data._embedded)
        })
      } else {
        if (this.machineDom) {
          this.machineDom.clear()
        }
      }

    },
    bindEvent () {
      this.mapDom
        .on('moveend dragrotateend baselayerload', () => this.dely.callback(this.changestatus))

      this.machineDom
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
 