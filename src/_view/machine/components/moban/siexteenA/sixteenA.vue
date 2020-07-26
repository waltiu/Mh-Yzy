<template>
  <div>
    <!-- <div class="table">
      <table-cran :submitDataMchineFrameUseInfos="submitDataMchineFrameUseInfos"></table-cran>
    </div>-->

    <div style="height:68vh" class="border">
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
      </div>
      <div style="display:flex;marginLeft:3.6vw">
        <sixteen-a-detail
          v-for="(item,index) of this.submitDataMchineFrameUseInfos"
          :key="index"
          :index="index"
          :detail="item"
          :type="type"
          @submitData="submitData"
        ></sixteen-a-detail>
      </div>
    </div>
  </div>
</template>

<script>
// import tableCran from '../component/table'
import sixteenADetail from './detail'
export default {
  name: 'sixteenA',
  components: {
    sixteenADetail,
    // tableCran
  },
  data () {
    return {
      submitDataMchineFrameUseInfos: {}
    }
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
  props: {
    fullData: Object,
    type: [String, Number]

  },
  watch: {
    fullData: {
      handler: function (newVal) {
        let a = {}
        for (let index = 0; index < 16; index++) {
          a[index] = {
            id: null,
            name: null,
            portInfos: null

          }
        }
        this.submitDataMchineFrameUseInfos = { ...a, ...newVal }
      },
      immediate: true,
      deep: true
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
  margin: 16vh 0vh 5vh 0vh;
  margin-bottom: 20vh;
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
  margin: 16vh 0vh 5vh 0vh;
  margin-bottom: 20vh;
}
.rightCiclALL {
  position: absolute;
  right: 0px;
}
.table {
  position: relative;
}
</style>