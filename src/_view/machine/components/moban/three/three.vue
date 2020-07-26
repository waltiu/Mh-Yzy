<template>
  <div>
    <div style="height:20vh" class="border">
      <div>
        <div class="border-left">
          <div class="circl" id="leftcircl"></div>
          <div class="circl"></div>
        </div>
        <div class="border-right">
          <div class="rightCiclALL">
            <div class="circl" id="rifhtcircl"></div>
            <div class="circl"></div>
          </div>
        </div>
        <div style="display:flex;marginLeft:6.5vw" class="itemCard">
          <three-detail
            v-for="(item,index) of submitDataMchineFrameUseInfos"
            :key="index"
            :index="index"
            :detail="item"
            :type="type"
            @submitData="submitData"
          ></three-detail>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import threeDetail from './detail'
export default {
  name: 'three',
  components: {
    threeDetail
  },
  data () {
    return {
      submitDataMchineFrameUseInfos: {}
    }
  },
  props: {
    fullData: Object,
    type: [String, Number]
  },
  provide () {
    return {
      nowData: this
    }
  },
  methods: {
    submitData (info) {
      this.submitDataMchineFrameUseInfos = { ...this.submitDataMchineFrameUseInfos, ...info }


    }
  },
  watch: {
    fullData: {
      handler: function (newVal) {
        let a = {}
        for (let index = 0; index < 3; index++) {
          a[index] = {
            id: null,
            name: null,
            portInfos: null

          }
        }
        this.submitDataMchineFrameUseInfos = { ...a, ...newVal }
      },
      immediate: true
    },
    submitDataMchineFrameUseInfos: {
      handler: function (newVal) {
        this.dateail = newVal
        this.$emit('submitData', newVal)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style scoped>
.border {
  border-radius: 5px;
  border: slategray solid 2px;
}
.circl {
  width: 10px;
  height: 10px;
  /* background-color: red; */
  border-radius: 50%;
  border: #29abe2 solid 1px;
}
.border-left {
  position: absolute;
  height: 100%;
  width: 2vw;
  border-right: teal solid 1px;
  margin-left: 10px;
}
#leftcircl {
  margin: 5vh 0vh 5vh 0vh;
}
.border-right {
  position: absolute;
  right: 0px;
  height: 100%;
  width: 2vw;
  margin-right: 10px;
  border-left: teal solid 1px;
}
#rifhtcircl {
  margin: 5vh 0vh 5vh 0vh;
}
.rightCiclALL {
  position: absolute;
  right: 0px;
}
</style>