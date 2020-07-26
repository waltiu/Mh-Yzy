<template>
  <div>
    <div class="search" style="display: flex;justify-content: flex-end;">
      <!-- <div style="display: flex;margin-right:40px">
        <span class="searchName">光缆</span>
        <el-input v-model="query.cable" placeholder="请输入内容" size="small"></el-input>
      </div>
      <div style="display: flex;">
        <span class="searchName">端口</span>
        <el-input v-model="query.port" placeholder="请输入内容" size="small"></el-input>
      </div>-->
      <div class="radios">
        <el-button style="margin-right:20px" size="medium " @click="showList">列表显示</el-button>
        <el-button size="medium " @click="portInfo">端口面板</el-button>
        <el-button style="margin-left:20px" size="medium " @click="showPort">端口信息</el-button>
      </div>
    </div>
    <div class="showData">
      <list v-show="listShow" :fullData="fullData"></list>
      <port v-show="portShow1" :fullData="fullData"></port>
      <port-info v-show="portShow2" :info="fullData"></port-info>
    </div>
  </div>
</template>

<script>
import port from './port'
import list from './list'
import portInfo from './portInfo'
export default {
  name: 'odfReadTable',
  components: {
    port,
    list,
    portInfo
  },
  data () {
    return {
      query: {
        cable: '',
        port: ''
      },
      listShow: true,
      portShow1: false,
      portShow2: false,
      preData: {}
    }
  },
  props: {
    fullData: Object
  },
  watch: {
    fullData: function (newVAL) {
      this.preData = newVAL
      return newVAL
    }
  },
  methods: {
    showList () {
      this.fullData = this.preData
      this.portShow1 = false
      this.portShow2 = false
      this.listShow = true
    },
    showPort () {
      this.fullData = this.preData
      this.portShow2 = false
      this.listShow = false
      this.portShow1 = true
    },
    portInfo () {
      this.fullData = this.preData
      this.listShow = false
      this.portShow1 = false
      this.portShow2 = true
    }
  },
  mounted () {
    this.changeShow = true
  }

}
</script>

<style>
.searchName {
  display: block;
  background: #f4f4f4;
  color: #333;
  font-size: 14px;
  -webkit-border-radius: 20px;
  border-radius: 5px;
  text-align: center;
  height: 32px;
  line-height: 32px;

  width: 100px;
}
.radios {
  margin-right: 48px;
  margin-bottom: 24px;
}
.search {
  margin-top: 30px;
}
</style>