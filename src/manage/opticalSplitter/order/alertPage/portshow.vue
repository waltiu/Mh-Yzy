<template>
  <div>
    <div>In端口</div>
    <optical-splitter-ports
      :borderStyle="diffstyle.diffInStyle"
      position="up"
      :ports="inPort"
      :num="inPortLength"
      place="ODF"
    ></optical-splitter-ports>

    <div>Out端口</div>
    <optical-splitter-ports
      :borderStyle="diffstyle.diffOutStyle"
      position="down"
      :ports="outPort"
      :num="outPortLength"
      place="ODF"
    ></optical-splitter-ports>
  </div>
</template>

<script>
import opticalSplitterPorts from '@/public/opticalSplitter'

export default {
  name: 'DiffInfo',
  components: {
    opticalSplitterPorts
  },
  props: {
    diffstyle: Object,
    inPort: Object,
    outPort: Object
  },
  computed: {
    inPortLength: function () {
      return Object.keys(this.inPort).length
    },
    outPortLength: function () {
      return Object.keys(this.outPort).length
    }
  }
}
</script>