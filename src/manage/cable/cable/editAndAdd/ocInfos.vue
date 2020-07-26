<template>
  <div>

    <oc-port
      :info="fullData"
      @selectPoint="(point) => {select = point}"
    >

      <div
        slot="addText"
        slot-scope="data"
      >
        <div v-if="fullData.ocCoreInfo[data.data.index] ? fullData.ocCoreInfo[data.data.index].transferSystem : false ">
          <b>{{$t('infoMap.transmissionSystem')}}:</b>
          {{ fullData.ocCoreInfo[data.data.index] ? fullData.ocCoreInfo[data.data.index].transferSystem : '' }}
        </div>

      </div>

    </oc-port>

    <edit-cable-port :itemData="select" @returnData="bindData"></edit-cable-port>

  </div>
</template>

<script>
import ocPort from '@/public/ocPort'
import editCablePort from './editCablePort'

export default {
  name: 'ocInfos',
  props: {
    fullData: Object
  },
  data () {
    return {
      select: {},
      table: {
        title: '传输系统',
        bigSelectDown: () => this.$store.getters.getObjByType['传输系统'],
        // 取得数据 item 为一个 Array
        result: (item) => {
          return item
        },
        // 使用display方法转化成 Array
        display: (item) => {
          if (item[0]) {
            return item
          } else {
            return []
          }
        }
      }
    }
  },
  components: {
    ocPort, editCablePort
  },
  methods: {
    bindData (info) {
      let data = {
        ...this.fullData.ocCoreInfo,
        [this.select.info]: {
          ...info
        }
      }
      this.$emit('returnData', { ...this.fullData, 'ocCoreInfo': data })
    }
  }
}
</script>
