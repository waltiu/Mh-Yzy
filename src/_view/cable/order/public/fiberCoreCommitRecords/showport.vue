<template>
  <div>
    <div style="display: flex; margin-top: 10px; margin-bottom: 10px;">
      <div class="leftBorder-custom"></div>
      <h4>提交对比</h4>
      （存在 {{ Object.keys(diffPortList).length }} 处不同）
    </div>

    <el-tabs tab-position="left">
      <el-tab-pane label="提交前">
        <slot name="before-header"></slot>
        <!-- 前 -->
        <odf-occ-port :borderStyle="diffPortList" :info="oldInfo"></odf-occ-port>
      </el-tab-pane>
      <el-tab-pane label="提交后">
        <slot name="after-header"></slot>
        <!-- 后 -->
        <odf-occ-port :borderStyle="diffPortList" :info="newInfo"></odf-occ-port>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import OdfOccPort from '@/public/OdfOccPort'
import { diffPort } from '../../lib/tools';

export default {
  name: 'ShowPort',
  components: {
    OdfOccPort
  },
  props: {
    info: Object
  },
  data () {
    return {
      dataModel: [
        "carryingBusiness",
        "carryingWay",
        "strPort",
        "ocPortOcId",
        "ocPortOcPort",
        "useId",
        "userPort",
        "useName",
        "ocName",
      ]
    }
  },
  computed: {
    diffPortList: function () {
      let diff = diffPort(this.newInfo.useInfos, this.oldInfo.useInfos, this.dataModel)
      let tmp = Object.entries(diff).map(([key]) => [key, `border: 2px solid red;`])
      return Object.fromEntries(tmp)
    },
    newInfo: function () {
      return {
        rectangleRowNum: this.info.rectangleRowNumNew,
        useInfos: this.info.newPorts,
        ocSize: this.info.rectangleNumNew * this.info.rectangleRowNumNew * 12
      }
    },
    oldInfo: function () {
      return {
        rectangleRowNum: this.info.rectangleRowNumOld,
        useInfos: this.info.oldPorts,
        ocSize: this.info.rectangleNumOld * this.info.rectangleRowNumOld * 12
      }
    }
  }
}
</script>