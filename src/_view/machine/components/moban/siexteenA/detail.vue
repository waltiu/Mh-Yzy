<template>
  <div class="item" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div class="circl"></div>
    <div class="border" @click="showCran">
      <div class="smallIcon" v-show="detail.id">
        <small-icon
          v-for="(item,index) of portInfos"
          :key="index"
          :portInfoDetail="item"
          class="small"
        ></small-icon>
      </div>
      <div class="cover" v-show="coverShow&&couldOperation">
        <div v-show="!detail.id" class="icon">
          <img src="../component/img/add.png" @click="addCran" />
        </div>
        <div v-show="detail.id" class="icon">
          <img src="../component/img/reduce.png" @click="reduceCran" />
        </div>
      </div>
    </div>
    <div class="circl"></div>
    <p class="index">{{Number(index)+1}}</p>
    <p class="name">{{detail.name}}</p>
    <el-dialog title="添加分合波器" :visible.sync="dialogVisible" width="30%" :modal="modal">
      <addCran @addCranDetail="addCranDetail" :type="type" :clearValue="dialogVisible"></addCran>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCranSure">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="cranDataShow" :width="'90vw'" :top="'10vh'" :modal="modal">
      <cran :request="request" :info="detail"></cran>
    </el-dialog>
  </div>
</template>

<script>
import addCran from '../component/addCran'
import cran from '@/_view/cran/read/content'
import { ResourceApiLayer } from '@/_command/curd';

import smallIcon from '../component/smallIcon'
export default {
  name: 'sexteenBDetail',
  data () {
    return {
      style: {
      },
      portInfos: {},
      coverShow: "",
      dialogVisible: false,
      modal: false,
      addCranData: {},
      submitData: {},
      cranDataShow: false

    }
  },
  props: {
    index: String,
    detail: Object,
    type: [String, Number]

  },
  computed: {
    request: function () {
      return new ResourceApiLayer('cran')
    },
  },
  watch: {
    detail: {
      handler: function (newVal) {
        let a = {}
        for (let index = 0; index < 9; index++) {
          a[index] = {
            epId: null,
            name: null,
            lowPort: null,
            upPort: null
          }
        }
        this.portInfos = { ...a, ...newVal.portInfos }
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    smallIcon,
    addCran,
    cran
  },
  mounted () {
    this.indexShow = this.index
  },
  inject: ['couldOperation'],

  methods: {
    mouseenter () {
      this.coverShow = true
    },
    mouseleave () {
      this.coverShow = false
    },
    addCran () {
      this.dialogVisible = true

    },
    showCran () {
      if (!this.couldOperation && this.detail.id) {
        this.cranDataShow = true
      }
    },
    reduceCran () {
      this.$confirm(`确定移除${this.detail.name}分合波器从此框槽`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.submitData[this.index] = {
          id: null,
          name: null,
          portInfos: null
        }
        this.$emit('submitData', this.submitData)

      });
    },
    addCranDetail (info) {
      this.addCranData = info
    },
    addCranSure () {
      if (this.addCranData.omSN) {
        this.$confirm(`确定添加${this.addCranData.omSN}分合波器到此框槽`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let a = {
            portInfos: this.addCranData.portInfos,
            id: this.addCranData.id,
            name: this.addCranData.omSN
          }
          this.submitData[this.index] = a
          this.$emit('submitData', this.submitData)
          this.dialogVisible = false

        });
      }

    }
  }
}
</script>

<style scoped>
.item {
  margin-right: 1.5vw;
  position: relative;
  top: -1.5vh;
}
.circl {
  width: 10px;
  height: 10px;
  /* background-color: red; */
  border-radius: 50%;
  border: #2b2b2b solid 1px;
  position: relative;
  background-color: #2b2b2b;
  left: 1.35vw;
  margin: 1.5vh 0vh 1.5vh 0vh;
}
.border {
  width: 3.6vw;
  height: 46vh;
  border-radius: 5px;
}
.smallIcon {
  position: absolute;
  top: 50px;
  height: 100%;
  width: 3.4vw;
}
.index {
  width: 3.2vw;
  text-align: center;
}
.cover {
  position: absolute;
  margin-top: -5px;
  z-index: 999;
  width: 3.6vw;
  height: 47vh;
  border-radius: 5px;
  background-color: #efefef;
  display: flex;
  text-align: center;
  justify-content: center;
}
.icon {
  position: relative;
  top: 20vh;
}
.name {
  position: absolute;
  width: 3.6vw;
  text-align: center;
  height: 3.5vh;
}
</style>