<template>
  <div>
    <!-- title:资源提交详情 -->
    <dialog-page :info="info" :title="$t('alert.resourceSubmissionDetails')">
      <show-table-info :table="columns" :info="info" :isMixins="false"></show-table-info>
      <el-tabs :tab-position="'left'">
        <el-tab-pane :label="$t('alert.beforeSubmission')">
          <port-show
            :diffstyle="{ diffInStyle, diffOutStyle }"
            :inPort="info.oldInPort"
            :outPort="info.oldOutPort"
          ></port-show>
        </el-tab-pane>
        <el-tab-pane :label="$t('alert.afterSubmission')">
          <port-show
            :diffstyle="{ diffInStyle, diffOutStyle }"
            :inPort="info.newInPort"
            :outPort="info.newOutPort"
          ></port-show>
        </el-tab-pane>
      </el-tabs>
    </dialog-page>
  </div>
</template>

<script>
import PortShow from './portshow'
import { diffPort } from '@/_view/cable/order/lib/tools';

export default {
  name: 'historyCommit',
  props: {
    info: Object,
    columns: Array,
    messigSpecial: Array

  },
  components: {
    PortShow
  },
  data () {
    return {
      myMessigSpecial: [],
      dataModel: [
        'downlinkPath',
        'equipment',
        'equipmentPort',
        'ocCore',
        'ocCoreInOs',
        'ocId',
        'ocName',
        'ocNameInOs',
        'occPort',
        'occPortStr',
        'onusn',
        'uplinkMachineRoomId',
        'uplinkMachineRoomName',
        'uplinkPath',
        'userno',
      ]
    }
  },
  computed: {
    diffInStyle: function () {
      const { newInPort, oldInPort } = this.info
      let diff = diffPort(newInPort, oldInPort, this.dataModel)
      let tmp = Object.entries(diff).map(([key]) => [key, `border: 2px solid red;`])
      return Object.fromEntries(tmp)
    },
    diffOutStyle: function () {
      const { newOutPort, oldOutPort } = this.info
      let diff = diffPort(newOutPort, oldOutPort, this.dataModel)
      let tmp = Object.entries(diff).map(([key]) => [key, `border: 2px solid red;`])
      return Object.fromEntries(tmp)
    }
  },
  methods: {
    showTheInfo () { }
  }
}
</script>

<style scoped>
</style>
