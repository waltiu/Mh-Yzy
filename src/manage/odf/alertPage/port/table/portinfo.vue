<template>
  <div>
    <div
      style="background:#1E2C5A ;height:auto;padding:10px 0 10px 0;  border:1px solid #eee; display:flex;justify-content: center;
    align-items: center"
    >
      <div style="background:#25A7E1; height:99%;width:99%">
        <!-- 顶端数字1到12 -->
        <div style=" display:flex ;margin:5px 10px -5px 10px">
          <div
            style="width:15px; display:flex;  align-items:center; justify-content: center;flex-grow:1"
          ></div>
          <div style=" border:2px solid #25A7E1;  flex-grow:100">
            <div style="display:flex ;margin:0 10px">
              <div
                style="width:15px; background:#25A7E1; display:flex; align-items:center; justify-content: center;flex-grow:1"
              ></div>
              <div style=" border:2px solid #25A7E1; flex-grow:100">
                <div style="width:100%; display:flex; align-items:flex-start">
                  <span
                    style="align-self:center;margin:0 auto;"
                    v-for="(num,index) in [1,2,3,4,5,6,7,8,9,10,11,12]"
                    :key="index"
                  >
                    <div
                      style="color:rgba(255,255,255,1); width:20px;height:18px; border-radius:50%;font-size:17px"
                    >
                      <b>{{num}}</b>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 下面一大块 -->
        <div
          style=" display:flex ;margin:10px"
          v-for="(a, index) in drawArray"
          :key="index + 'zon'"
        >
          <!-- 左边的数字框 -->
          <div
            style="width:15px; background:#1E2C5A; display:flex; color:#FFF; align-items:center; justify-content: center;flex-grow:1;font-size:17px"
          >
            <b>{{index+1}}</b>
          </div>
          <!-- 右边的框框 -->
          <div style=" border:2px solid #1E2C5A;  flex-grow:100">
            <!-- 大块中的小块 -->
            <div
              style="display:flex ;margin:10px"
              v-for="(b, indexB) in _.chunk(a, 12)"
              :key="indexB + 'frame'"
            >
              <!-- 左边的数字框 -->
              <div
                style="width:15px; background:#F6F7F7; display:flex; align-items:center; justify-content: center;flex-grow:1"
              >{{indexB+1}}</div>
              <!-- 右边的点点 -->
              <div style=" border:2px solid rgba(255,255,255,0.4); flex-grow:100">
                <div style=" height:20px;width:100%; display:flex; align-items:flex-start">
                  <span
                    style="align-self:center;margin:0 auto "
                    v-for="(c,indexC) in b"
                    :key="indexC + 'ODFhorizontal'"
                  >
                    <div :style="portStyle(c)" :title="getTitle(c)"></div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import OdfOccPort from '@/public/OdfOccPort'
export default {
  name: 'portInfo',
  components: {
    // OdfOccPort
  },
  props: {
    info: Object
  },
  methods: {
    portStyle (info) {
      let color = '#A8DBF2'
      if (info.useId)
        color = 'red'
      else if (info.ocPortOcId)
        color = 'green'

      return `border-radius:50% ;  background:${color}; width:17px;height: 17px`
    },
    getTitle (info) {
      let title = '暂无'
      if (Object.keys(info).length) {
        let czyw = info.carryingBusiness || '-'
        let czgl = info.carryingWay || '-'
        let qx = info.ocPortOcPort || '-'
        let dk = info.strPort || '-'
        let sb = info.useName || '-'
        let gl = info.ocName || '-'
        return `
        承载业务：${czyw}
承载光路：${czgl}
纤芯：${qx}
端口：${dk}
设备：${sb}
光缆：${gl}`
      }
      return title
    }
  },
  watch: {
    info: function (newVAL) {
      return newVAL
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
      // console.log(this._.chunk(this._.chunk(tmp, 12 * this.info.rectangleRowNum)[0], 12))

      return this._.chunk(tmp, 12 * this.info.rectangleRowNum)
    }

  }

}
</script>

<style>
</style>