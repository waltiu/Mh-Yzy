<template>
  <div>
    <dialog-page :title="$t('router.CN_CER')" :modal="false" top="3vh" width="95%" :info="diffInfo">
      <info-map @mapReady="mapReady">
        <div style="margin-top: 10px;margin-left: 40px;">
          <div>
            <select-button v-model="status.wa">{{ diffInfo.wa ? diffInfo.wa.name : '' }}</select-button>

            <select-button
              v-model="status.wb"
              style="margin-top: 8px"
            >{{ diffInfo.wb ? diffInfo.wb.name : '' }}</select-button>
          </div>

          <div style="display: flex; float: right; margin-top: 10px;">
            <select-button v-model="status.clash">{{$t('vendorList.routing')}}</select-button>
            <select-button v-model="show.deviceRoom">{{$t('vendorList.machineRooms')}}</select-button>
            <select-button v-model="show.device">{{$t('vendorList.netElement')}}</select-button>
            <select-button v-model="show.odfAndSwitch">{{$t('vendorList.occ')}}/ODF</select-button>
            <select-button v-model="show.cable">{{$t('vendorList.oc')}}</select-button>
            <select-button v-model="show.bearing">{{$t('vendorList.carrier')}}</select-button>
          </div>
        </div>
      </info-map>
    </dialog-page>
  </div>
</template>

<script>
import infoMap from '@/manage/infoMap/mapLibrary.vue'
import selectButton from '@/_public/filterbutton/index.vue'
import { SameRouter } from '@/_public/map/class/SameRouter'

export default {
  name: 'mapBridge',
  components: { infoMap, selectButton },
  props: {
    diffInfo: Object
  },
  data () {
    return {
      mapDom: {},
      class: {
        odfAndSwitch: ['odf', 'switchY'],
        device: ['device'], // 网元111
        cable: ['cable'],
        deviceRoom: ['deviceRoom'],
        bearing: ['station', 'pipeSection', 'poleSection', 'well', 'pole', 'lightRoad', 'support', 'supportSection', 'cited', 'citedSection']
      },
      show: {
        odfAndSwitch: true,
        device: true,
        cable: true,
        deviceRoom: false,
        bearing: false
      },
      status: {
        wa: true,
        wb: true,
        clash: false
      },
      map: {
        timer: false,
        timerObj: {},
        markerPoint: [],
        lines: []
      }
    }
  },
  watch: {
    show: {
      handler: function () {
        this.filterData()
      },
      deep: true
    },
    status: {
      handler: function () {
        this.filterData()
      },
      deep: true
    }
  },
  computed: {
    disableList: function () {
      let frontList = Object.entries(this.show).reduce((res, [key, val]) => {
        res = {
          ...res,
          ...this.class[key].reduce((classRes, classVal) => {
            classRes[classVal] = val
            return classRes
          }, {})
        }
        return res
      }, {})
      return Object.entries(frontList).reduce((res, [key, val]) => {
        res[this.$store.getters.vendorNameByTypeArray[key].vendor] = val
        return res
      }, {})
    }
  },
  methods: {
    mapReady (map) {
      this.mapDom = new SameRouter(map, this, this.diffInfo.clash)
      this.filterData()
    },
    filterData () {
      let draw = []
      if (this.status.wa && this.status.wb) {
        draw = [{ ...this.diffInfo.wa, 'maptalksType': 'wa' }, { ...this.diffInfo.wb, maptalksType: 'wb' }]
      } else if (this.status.wa && !this.status.wb) {
        draw = [{ ...this.diffInfo.wa, 'maptalksType': 'wa' }]
      } else if (!this.status.wa && this.status.wb) {
        draw = [{ ...this.diffInfo.wb, 'maptalksType': 'wb' }]
      }
      draw = draw.map(item => {
        return {
          ...item,
          mapInfo: Object.entries(item.mapInfo).reduce((res, [key, val]) => {
            if (this.disableList[key]) {
              res[key] = val
            } else if (this.disableList[key] !== undefined) {
              res[key] = []
            }
            return res
          }, {})
        }
      })

      if (this.status.clash) {
        this.mapDom.render(this.diffInfo.clash, {
          type: 'business',
          complex: draw
        })
      } else {
        this.mapDom.render([], {
          type: 'business',
          complex: draw
        })
      }
    }
  }
}
</script>
