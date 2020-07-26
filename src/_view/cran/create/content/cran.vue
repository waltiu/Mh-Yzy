<template>
  <div>
    <el-card>
      <div class="row">
        <div class="cicrc">
          <div class="slideCicle1"></div>
          <div class="slideCicle2"></div>
          <div v-if="moban.portNumber===18" class="other">
            <div class="slideCicle3"></div>
            <div class="slideCicle4"></div>
          </div>
        </div>
        <div class="allCard">
          <div v-for="(item,index) of mobanData" :key="index" class="item1">
            <div
              v-if="item.upPort"
              class="card"
              @click="selectPort(item,index-1)"
              style="margin-bottom:25px;text-align: center;"
            >
              <p>{{item.upPort}}</p>
              <div class="line1"></div>
              <el-card class="cardItem">
                <div class="iconItem">
                  <img-icons style="width:25px"></img-icons>
                  <div class="imgBorder">
                    <div class="crial" :style="computedStyle(item)"></div>
                  </div>
                </div>
                <div class="iconItem">
                  <img-icons></img-icons>
                  <div class="imgBorder">
                    <div class="crial" :style="computedStyle(item)"></div>
                  </div>
                </div>
              </el-card>
              <div class="line2"></div>
              <p>{{item.lowPort}}</p>
              <div class="tipsitem">
                <div v-show="item.upPort!=='COM'">
                  <p>业务侧面设备名称：</p>
                  <P>{{item.name||'_'}}</P>
                  <div>
                    <p>业务侧面设备ID：</p>
                    <P>{{item.epID||'_'}}</P>
                  </div>
                  <div>
                    <p>业务侧面设备端口：</p>
                    <P>{{item.port||'_'}}</P>
                  </div>
                  <div>
                    <p>业务使用情况：</p>
                    <P>{{computedState(item.state)}}</P>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="card">
              <p>&nbsp;</p>
              <el-card style="width:90px;text-align:center;height:110px;float:left"></el-card>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import imgIcons from '../../components/img'

export default {
  name: 'cran',
  props: {
    moban: Object
  },
  components: {
    imgIcons

  },
  data () {
    return {
      mobanData: [],
      dialogVisible: false,
      submitPortData: {},
      portDetail: {
        index: '',
        detail: {
        }
      },
      checkPort: {}
    }
  },
  methods: {
    computedStyle (item) {

      if (item.state === '0') {
        return ` background: green`
      } else if (item.state === '1') {
        return ` background: red`
      } else {
        return 'background: beige'
      }
    },
    computedState (info) {
      if (info === '1') {
        return '占用'
      } else if (info === '0') {
        return '绑定'
      } else {
        return '空闲'
      }
    },
    getPort (info) {
      this.submitPortData = { ...this.submitPortData, ...info }
      this.checkPort = info
    },
    surePort () {
      let a = Object.values(this.checkPort)
      if (a[0].state === "1" && !a[0].name) {

        this.$store.commit('setSysStatus', {
          info: {
            msg: '请输入业务侧设备名称！',
            code: '500',
            time: new Date(),
            msgEn: '请输入业务侧设备名称！'
          },
          key: 'httpErr',
        })
      } else {
        this.mobanData = { ...this.mobanData, ...this.submitPortData }
        this.$emit('submitMoban', this.submitPortData)
        this.dialogVisible = false
      }
    },
    selectPort (info, index) {
      this.dialogVisible = true
      this.portDetail.index = index + 1
      this.portDetail.detail = info
    },
    cancel () {
      this.dialogVisible = false
    }
  },
  watch: {
    mobanAllData: function (newVal) {
      this.mobanData = newVal

    },
    moban: function (newVal) {
      let a = {}
      for (let index = 0; index < newVal.portNumber; index++) {
        a[index] = {
          up: null,
          down: null
        }
      }
      this.mobanData = { ...a, ...newVal.templateInfo }
      this.submitPortData = { ...newVal.templateInfo }
    }
  },
  mounted () {
    let a = {}
    for (let index = 0; index < this.moban.portNumber; index++) {
      a[index] = {
        up: null,
        down: null
      }
    }
    this.mobanData = { ...a, ...this.moban.templateInfo }
    this.submitPortData = { ...this.moban.templateInfo }
  }
}
</script>

<style scoped>
.crial {
  width: 10px;
  height: 10px;
  /* background-color: red; */
  border-radius: 50%;
  border: #29abe2 solid 1px;
  margin: 7px;
}
.card {
  width: 80px;
  text-align: center;
  height: 400px;
  /* margin-right: 10%; */
}
.tipsitem {
  width: 150px;
  text-align: left;
  position: relative;

  margin-top: 15px;
}
.item1 {
  position: relative;
  left: 50px;
  width: 11%;
}
.allCard {
  display: flex;
  position: relative;
  left: 4%;
  flex-wrap: wrap;
  width: 90%;
}
.imgBorder {
  width: 25px;
  height: 25px;
  background-color: #0071bc;
  font-size: 14px;
}
.iconItem {
  display: flex;
  text-align: center;
  margin-bottom: 5px;
}
.row {
  border: #0071bc solid 1px;
  border-radius: 10px;
}
.line1 {
  height: 0.5%;
  width: 100%;
  background-color: #0071bc;
  position: relative;
  top: 2%;
}
.line2 {
  height: 0.5%;
  width: 100%;
  background-color: #0071bc;
  position: relative;
  top: -2%;
}
.cardItem {
  background-color: #29abe2;
}
.slideCicle1 {
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 60px;
  left: 30px;
  border: 5px solid #f0f0f0;
}
.slideCicle2 {
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 60px;
  right: 4.6%;
  border: 5px solid #f0f0f0;
}
.slideCicle3 {
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 480px;
  left: 30px;
  border: 5px solid #f0f0f0;
}
.slideCicle4 {
  width: 40px;
  height: 40px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 480px;
  right: 4.6%;

  border: 5px solid #f0f0f0;
}
.other {
  position: absolute;
  width: 100%;
}
.cicrc {
  position: absolute;
  width: 100%;
}
</style>