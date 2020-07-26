<template>
  <div>
    <dialog-page
      :title="$t('vendorList.cableComparison')"
      :modal="false"
      top="1vh"
      width="98%"
      :info="diffInfo"
    >
      <info-map @mapReady="mapReady">
        <div style="margin-top: 10px;margin-left: 40px;">
          <div>
            <select-button v-model="status.ocA">{{ diffInfo.ocA ? diffInfo.ocA.name : '' }}</select-button>

            <select-button
              v-model="status.ocB"
              style="margin-top: 8px"
            >{{ diffInfo.ocB ? diffInfo.ocB.name : '' }}</select-button>
          </div>

          <div style="display: flex; float: right; margin-top: 10px;">
            <select-button v-model="status.clash">{{$t('vendorList.routing')}}</select-button>
            <select-button v-model="show.deviceRoom">{{$t('vendorList.machineRooms')}}</select-button>
            <select-button v-model="show.device">{{$t('vendorList.netElement')}}</select-button>
            <select-button
              v-model="show.odfAndSwitch"
            >{{$t('vendorList.occ')}}/{{$t('vendorList.odf')}}</select-button>
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
import selectButton from '@/_public/filterbutton/diff'
import { SameLines } from '@/_public/map/class/SameLines'

export default {
  name: 'mapBridge',
  components: { infoMap, selectButton },
  props: {
    diffInfo: Object,
    color: Object
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
        ocA: true,
        ocB: true,
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
    },
    clash: function () {
      let clash = {}
      clash = this._.cloneDeep(this.diffInfo.clash)
      delete clash.machineRooms
      return clash
    }
  },
  methods: {
    mapReady (map) {
      this.mapDom = new SameLines(map, this, this.clash)
      this.filterData()
    },
    filterData () {
      let draw = []
      if (this.status.ocA && this.status.ocB) {
        draw = [{ ...this.diffInfo.ocA, 'mapSelectGroup': this.diffInfo.groups[0] }, { ...this.diffInfo.ocB, 'mapSelectGroup': this.diffInfo.groups[1] }]
      } else if (this.status.ocA && !this.status.ocB) {
        draw = [{ ...this.diffInfo.ocA, 'mapSelectGroup': this.diffInfo.groups[0] }]
      } else if (!this.status.ocA && this.status.ocB) {
        draw = [{ ...this.diffInfo.ocB, 'mapSelectGroup': this.diffInfo.groups[1] }]
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
        this.mapDom.render(this.clash, {
          type: 'business',
          complex: draw
        }, this.color)
      } else {
        this.mapDom.render([], {
          type: 'business',
          complex: draw
        }, this.color)
      }
    }
  }
}
</script>
