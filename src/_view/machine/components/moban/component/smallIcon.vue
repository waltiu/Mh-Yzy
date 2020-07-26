<template>
  <div class="all">
    <div class="item" v-show="portInfoDetail.upPort">
      <div class="circlList">
        <div class="circl" :style="computedStyle(portInfoDetail)"></div>
        <div class="circ2" :style="computedStyle(portInfoDetail)"></div>
      </div>
    </div>
    <div v-show="!portInfoDetail.upPort" class="itemNull"></div>
  </div>
</template>

<script>
// import imgIcons from './svg'
export default {
  name: 'smallIcon',
  props: {
    portInfoDetail: [Object, Array, String]
  },
  components: {
    // imgIcons
  },

  methods: {
    // #0071bc   #f15a24 #FFF
    computedStyle (item) {
      if (item.state === '0') {
        return ` background: #0071bc`
      } else if (item.state === '1') {
        return ` background: #f15a24`
      } else {
        return 'background: #FFF'
      }
    },
  },


}
</script>

<style scoped>
.item {
  height: 4vh;
  width: 3vw;
  background-color: #29abe2;
  margin: 0.25vh 0vh 1vh 0vh;
}
.itemNull {
  height: 4vh;
  width: 3vw;
  border: 1px solid #f8f8f8;
  box-shadow: 1px 1px 1px 1px #888888;
  background-color: #ffffff;
  margin: 0.25vh 0vh 1vh 0vh;
}
.all {
  padding: 0.1px 4px 0px 4px;
}
.circl {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  /* background-color: saddlebrown; */
  position: absolute;
  right: 0.15vw;
  border: #fff 3px solid;
}
.circ2 {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  /* background-color: saddlebrown; */
  position: absolute;
  left: 0.15vw;
  border: #fff 3px solid;
}
.circlList {
  display: flex;
  text-align: center;
  position: relative;
  top: -7px;
}
.circlItem {
  width: 7px;
  height: 7px;
  background-color: #ece8e8ad;
  border-radius: 50%;
  position: relative;
  margin: 0px auto;
  top: 3px;
}
</style>