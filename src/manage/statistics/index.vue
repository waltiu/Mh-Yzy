<template>
  <div>
    <el-tabs v-model="activeName" >
      <el-tab-pane :label="$t('opticalSplitter.NapPortStatisticsTable')" name="sixth">
        <nap></nap>
      </el-tab-pane>
      <el-tab-pane :label="$t('statistics.statisticsByBusiness')" name="first">
        <sevice-all></sevice-all>
      </el-tab-pane>
      <el-tab-pane :label="$t('statistics.cablePathBusiness')" name="second">
        <line-road></line-road>
      </el-tab-pane>
      <el-tab-pane :label="$t('statistics.carrier')" name="third">
        <carrier></carrier>
      </el-tab-pane>
      <el-tab-pane :label="$t('statistics.equipmentResources')" name="forth">
        <eq-res></eq-res>
      </el-tab-pane>
      <el-tab-pane :label="$t('statistics.spaceResource')" name="fifth">
        <space-res></space-res>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
  import carrier from './carrier'
  import SpaceRes from './spaceRes'
  import EqRes from './eqRes'
  import LineRoad from './lineRoad'
  import SeviceAll from './seviceAll'
  import nap from './nap'
  // import supportSection from './supportSection'

  export default {
    name: 'wellManage',
    components: {
      SeviceAll,
      LineRoad,
      EqRes,
      SpaceRes,
      carrier,
      nap
    },
    data () {
      return {
        activeName: 'sixth'
      }
    }
  }
</script>
