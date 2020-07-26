<template>
  <!-- 选择ODF, 光交可用端口, 传入useInfos后自动识别信息, 完成分片, 分型号的传递 -->

  <div>
    <div class="ODFborder" v-for="(a, index) in drawArray" :key="index + 'zon'">
      <span>{{ $t('alert.the') + (index + 1 ) + $t('alert.frame') }}</span>

      <div>
        <div
          class="ODFframe"
          v-for="(b, indexB) in _.chunk(a, 12)"
          :key="indexB + 'frame'"
          style="display: flex;"
        >
          <span>{{ (indexB + 1) }}</span>
          <div
            class="ODFhorizontal"
            v-for="(c, indexC) in b"
            :key="indexC + 'ODFhorizontal'"
            :style="`width: ${100 / 12}%; height: 'auto'; 'margin-top': '5px'; ${borderStyle ? borderStyle[index * info.rectangleRowNum + indexB * 12 + indexC] : ''}`"
          >
            <!-- {{ borderStyle ? borderStyle[index * info.rectangleRowNum + indexB * 12 + indexC] : '' }} -->
            <div>
              <img
                @click="selectPort(index + 1, indexB + 1, indexC + 1, computedUrl(c).type, c)"
                :src="computedUrl(c).url"
                style="width: 40px; height: 40px; cursor:pointer;"
              />
              <span>{{ indexC + 1 }}</span>
            </div>
            <!-- 附加信息 -->
            <div v-if="showLabel && !_.isEmpty(c) && c.ocPortOcPort">
              <div v-for="(z, indexZ) in c" :key="indexZ + 'ports'" class="text">
                <span v-if="em[indexZ] !== undefined">
                  <p>
                    <b>{{$t(em[indexZ])}}</b>
                  </p>
                  <small>{{ (z || '-') }}</small>
                </span>
                <!-- 是否占用 -->
                <span
                  v-if="indexZ === 'useId'"
                >{{$t('alert.status')}}: {{ z ? $t('alert.hold') : $t('alert.unused') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'selectPort',
  props: {
    info: Object,
    picture: {
      type: String,
      default: 'odf'
    },
    borderStyle: Object,
    showLabel: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      em: {
        ocName: 'alert.cable', // 光缆
        ocPortOcPort: 'alert.core', // 纤芯
        useName: 'alert.device', // 设备
        userPort: 'alert.ports1', // 端口
        carryingWay: 'alert.carryingLightPath', // 承载光路
        carryingBusiness: 'alert.carryingBusiness' // 承载业务
      }
    }
  },
  methods: {
    computedUrl (e) {
      let url = ''
      let type = ''
      // TODO 使用 useId 进行占用判断
      if (e.useId) {
        url = this.$useInfoPic[this.picture].full
        type = 'full'
      } else if (e.ocPortOcId) {
        url = this.$useInfoPic[this.picture].use
        type = 'use'
      } else {
        url = this.$useInfoPic[this.picture].unuse
        type = 'unuse'
      }

      return {
        url: url,
        type: type
      }
    },
    selectPort (border, frame, num, type, info) {
      this.$emit('selectPort', {
        show: border + '-' + frame + '-' + num,
        type: type,
        num: this.$showToPortNum({ show: border + '-' + frame + '-' + num, frame: this.info.rectangleRowNum, dist: 12 }),
        info: info
      })
    }
  },
  computed: {
    drawArray: function () {
      let tmp = []
      let info = this.info.occSize || this.info.ocSize
      // 防止增加时候侧漏
      let useInfos = this.info.useInfos || {}
      if (!this._.isEmpty(this.info)) {
        for (let i = 0; i < Number(info); i++) {
          tmp[i] = useInfos[i] || {}
        }
      }
      // console.log(tmp)
      // console.log(this._.chunk(this._.chunk(tmp, 12 * this.info.rectangleRowNum)[0], 12))
      return this._.chunk(tmp, 12 * this.info.rectangleRowNum)
    }
  }
}
</script>

<style scoped>
.text {
  word-wrap: break-word;
}
</style>
