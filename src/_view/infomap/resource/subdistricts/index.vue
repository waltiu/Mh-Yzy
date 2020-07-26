<template>
  <div>
    <el-card>
      <el-tabs type="card">
        <el-tab-pane label="小区">
          <el-switch style="float: right" v-model="buttonStatus" @change="changestatus"></el-switch>
        </el-tab-pane>
      </el-tabs>
    </el-card>

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
      <content-info :request="request" :eventBus="eventBus" :info="click"></content-info>
    </public-alert-page-with-button>
  </div>
</template>

<script>
import { ResourceApiLayer } from '@/_command/curd'
import { Subdistricts } from '@/_middle/map/class/handle/subdistricts'
import { Delay } from '@/_command/tools'
import ContentInfo from '@/_view/subdistricts/read/content'
import { FormEventBus } from '@/_command/event'

export default {
  name: 'SubdistrictsCard',
  props: {
    map: Object
  },
  components: {
    ContentInfo
  },
  data () {
    return {
      buttonStatus: false,
      subdistrictsDom: null,
      click: null,
      editTf: true,
      type: 'subdistricts',
      editData: null,
      edit: false,
      editMap: false
    }
  },
  watch: {
    map: {
      handler: function () {
        this.subdistrictsDom = this.subdistrictsDom || new Subdistricts(this.map)
        this.bindEvent()
      }
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
        if (newVal && newVal.mapType === 'subdistricts') {
          this.changestatus()
          this.click = { ...newVal }
        } else {
          this.click = null
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    request: function () {
      return new ResourceApiLayer('subdistricts', 'MainSubdistrictsLayer')
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
        this.fetchData()
      } else {
        if (this.subdistrictsDom) {
          this.subdistrictsDom.clear()
        }
      }
    },
    fetchData () {
      return this.request
        .fecthDataInMap({
          lng: this.map.getCenter().x,
          lat: this.map.getCenter().y,
          zoom: this.map.getZoom().toFixed()
        })
        .then(res => res.data._embedded)
        .then((result) => {
          this.subdistrictsDom.show(result)
        })
    },
    bindEvent () {
      this.map
        .on('moveend dragrotateend baselayerload', () => this.dely.callback(this.changestatus))

      this.subdistrictsDom
        .listenItemEvent('click', info => { this.click = { ...info } })
    }
  },
  mounted () {
    this.changestatus()
    this.dely = new Delay(2000)
  }
}
</script>