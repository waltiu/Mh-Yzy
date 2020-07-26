<template>
  <div>
    <div v-if="!info.ocSize">
      <el-alert :title="$t('alert.wrong')" type="error" show-icon></el-alert>

      <el-collapse style="margin-top: 5px;">
        <el-collapse-item :title="$t('alert.details')">{{ JSON.stringify(info, null, 4) }}</el-collapse-item>
      </el-collapse>
    </div>

    <div v-for="(a, index) in _.chunk(drawArray, 12)" :key="index + 'a'" style="display: flex;;">
      <div
        v-for="(b, indexb) in a"
        :key="indexb + 'b'"
        :style="{'width': 100 / 12 + '%', height: 'auto', 'margin-top': '5px'}"
      >
        <div>
          <img
            :src="computedUrl(b).url"
            style="width: 40px; height: 40px; cursor:pointer;"
            @click="selectPoint({info: index * 12 + indexb + 1 ,type: computedUrl(b).type})"
          />
          {{ index * 12 + indexb + 1 }}
          <div v-if="!_.isEmpty(b)" style="display: flex;">
            <p>{{ _.isEmpty(b) ? $t('alert.unused') : $t('alert.hold') }}</p>
          </div>

          <slot name="text">
            <div v-for="(i, k) in emz" :key="i + 'd'">
              <div v-if="b[k]" class="text">
                <p>
                  <b>{{ $t(i) }}</b>
                </p>
                <p>
                  <small>{{ $t(b[k]) }}</small>
                </p>
              </div>
            </div>

            <div v-for="(e,f) in b.info" :key="f + 'c'">
              <div v-for="(c,d) in em" :key="c + 'd'" class="text">
                <p>
                  <b>{{ $t(c) }}</b>
                </p>
                <p>
                  <small>{{ e[d] }}</small>
                </p>
              </div>
            </div>
          </slot>

          <slot name="addText" :data="{index: index * 12 + indexb + 1 ,type: computedUrl(b).type}"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ocPort',
  props: {
    info: Object,
    picture: {
      type: String,
      default: 'cable'
    },
    showLabel: {
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      em: {
        port: 'alert.ports1',
        name: 'alert.name1'
      },
      emz: {
        carryingWay: 'alert.carryingLightPath',
        carryingBusiness: 'alert.carryingBusiness'
      }
    }
  },
  computed: {
    drawArray: function () {
      let tmp = []
      let info = this.info.ocSize
      // 防止增加时候侧漏
      if (!this._.isEmpty(this.info)) {
        for (let i = 0; i < Number(info); i++) {
          tmp[i] = this.info.ocUseInfo.find((e => {
            return i === (Number(e.id) - 1)
          })) || {}
        }
      }

      return tmp
    }
  },
  methods: {
    computedUrl (e) {
      let url = ''
      let type = ''
      if (this._.isEmpty(e)) {
        url = this.$useInfoPic[this.picture].unuse
        type = 'unuse'
      }
      if (!this._.isEmpty(e)) {
        url = this.$useInfoPic[this.picture].use
        type = 'use'
      }
      return {
        url: url,
        type: type
      }
    },
    selectPoint (e) {
      this.$emit('selectPoint', e)
    }
  }
}
</script>

<style scoped>
.text {
  word-wrap: break-word;
}
</style>
