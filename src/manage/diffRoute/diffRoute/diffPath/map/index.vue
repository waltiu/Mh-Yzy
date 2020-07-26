<template>
  <div>
    <!-- 同路由对比 -->
    <dialog-page
      :title="$t('router.CN_CER')"
      :modal="false"
      top="3vh"
      width="98%"
      :info="diffInfoBase"
    >
      <info-map
        v-loading="switchloading"
        element-loading-text="正在重新加载数据..."
        @mapReady="mapReady"
        @layer-change="change"
      >
        <div style="margin-top: 10px;margin-left: 40px;">
          <div>
            <select-button v-model="status.wa">{{ diffInfoBase.wa ? diffInfoBase.wa.name : '' }}</select-button>

            <select-button
              v-model="status.wb"
              style="margin-top: 8px"
            >{{ diffInfoBase.wb ? diffInfoBase.wb.name : '' }}</select-button>
          </div>

          <div style="display: flex; float: left; margin-top: 10px;">
            <select-button v-model="status.clash">{{$t('vendorList.routing')}}</select-button>
            <select-button v-model="show.deviceRoom">{{$t('infoMap.motorRoom')}}</select-button>
            <select-button v-model="show.device">{{$t('tableSearch.networkElement')}}</select-button>
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
import { http } from '../../../../../_command/http';

export default {
  name: 'mapBridge',
  components: { infoMap, selectButton },
  props: {
    diffInfo: Object
  },
  data () {
    return {
      diffInfoBase: {},
      switchloading: false,
      mapDom: {},
      class: {
        odfAndSwitch: ['odf', 'switchY'],
        device: ['device'], // 网元
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
    diffInfo: {
      immediate: true,
      handler: function (newVal) {
        this.diffInfoBase = newVal
      },
      deep: true
    },
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
    change (skey, list, coortype) {
      this.switchloading = true
      http({
        method: 'post',
        url: '/api/ldsysOpticaleCableWorks/compareOcWork',
        headers: {
          coordinate: coortype
        },
        data: [[this.diffInfoBase.wa.id, this.diffInfoBase.wb.id]]
      })
        .then(res => res.data[0])
        .then(res => this.diffInfoBase = res)
        .then(this.filterData)
        .finally(() => this.switchloading = false)
    },
    mapReady (map) {
      this.mapDom = new SameRouter(map, this, this.diffInfoBase.clash)
      this.filterData()
    },
    filterData () {
      let draw = []
      if (this.status.wa && this.status.wb) {
        draw = [{ ...this.diffInfoBase.wa, maptalksType: 'wa' }, { ...this.diffInfoBase.wb, maptalksType: 'wb' }]
      } else if (this.status.wa && !this.status.wb) {
        draw = [{ ...this.diffInfoBase.wa, maptalksType: 'wa' }]
      } else if (!this.status.wa && this.status.wb) {
        draw = [{ ...this.diffInfoBase.wb, maptalksType: 'wb' }]
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
        this.mapDom.render(this.diffInfoBase.clash, {
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
