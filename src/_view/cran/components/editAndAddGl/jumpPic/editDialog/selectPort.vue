<template>
  <div>
    <dialog-page :info="fullData" :title="$t('opticalSplitter.selectPort')" @close="$emit('close')">
      <div slot-scope="dialogEvent">
        <div>
          IN {{$t('opticalSplitter.ports')}}:
          {{ fullData.inNum }}
          <optical-splitter-ports
            @selectPort="(a) => {selectPoint(a, 'IN', dialogEvent.method)}"
            :ports="inPort"
            position="up"
            :num="fullData.inNum"
          ></optical-splitter-ports>
        </div>

        <hr />

        <div>
          OUT {{$t('opticalSplitter.ports')}}:
          {{ fullData.outNum }}
          <optical-splitter-ports
            @selectPort="(a) => {selectPoint(a, 'OUT', dialogEvent.method)}"
            :ports="outPort"
            position="down"
            :num="fullData.outNum"
          ></optical-splitter-ports>
        </div>
      </div>

      <div slot="footer"></div>
    </dialog-page>
  </div>
</template>

<script>
import opticalSplitterPorts from '@/public/opticalSplitter'

export default {
  name: 'selectPort',
  props: {
    fullData: Object
  },
  components: {
    opticalSplitterPorts
  },
  computed: {
    outPort: function () {
      return this.fullData.outPort
    },
    inPort: function () {
      return this.fullData.inPort
    }
  },
  methods: {
    selectPoint (info, type, event) {
      this.$emit('returnData', type + ':' + info.show)
      event.close()
    }
  }
}
</script>
