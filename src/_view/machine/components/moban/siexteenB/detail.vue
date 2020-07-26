<template>
  <div>
    <div class="all" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="showCran">
      <div class="background" v-show="coverShow&&couldOperation">
        <div class="cover">
          <div v-show="!detail.id" class="icon" @click="addCran">
            <img src="../component/img/add.png" />
          </div>
          <div v-show="detail.id" class="icon" @click="reduceCran">
            <img src="../component/img/reduce.png" />
          </div>
        </div>
      </div>
      <div class="item">
        <div class="circl"></div>
        <div class="border">
          <div class="smallIcon" v-show="detail.id">
            <small-icon
              v-for="(item,index) of cranOne"
              :key="index"
              :portInfoDetail="item"
              class="small"
            ></small-icon>
          </div>
        </div>
        <div class="circl"></div>
      </div>

      <div class="item">
        <div class="circl"></div>
        <div class="border">
          <div class="smallIcon" v-show="detail.id">
            <small-icon
              v-for="(item,index) of cranTwo"
              :key="index"
              :portInfoDetail="item"
              class="small"
            ></small-icon>
          </div>
        </div>
        <div class="circl"></div>
        <p class="index">{{Number(index)+1}}</p>
        <p class="name">{{detail.name}}</p>
      </div>
    </div>
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
import smallIcon from '../component/smallIcon'
import addCran from '../component/addCran'
import cran from '@/_view/cran/read/content'
import { ResourceApiLayer } from '@/_command/curd';


export default {
  name: 'sexteenBDetail',
  data () {
    return {
      style: {},
      cranOne: {
      },
      cranTwo: {
      },
      portInfos: {},
      coverShow: false,
      dialogVisible: false,
      modal: false,
      addCranData: {},
      submitData: {},
      cranDataShow: false
    }
  },
  inject: ['couldOperation'],
  components: {
    smallIcon,
    addCran,
    cran
  },
  props: {
    detail: Object,
    index: String,
    type: [String, Number]
  },
  computed: {
    request: function () {
      return new ResourceApiLayer('cran')
    },
  },
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
  },
  watch: {
    detail: {
      handler: function (newVal) {
        let g = {}
        for (let num = 0; num < 18; num++) {
          g[num] = {
            epId: null,
            name: null,
            lowPort: null,
            upPort: null
          }
        }
        let portInfo = { ...g, ...newVal.portInfos }
        let c = {}
        let d = {}
        let e = {}
        let f = {}
        for (let a = 0; a < 9; a++) {
          c[a] = {
            epId: null,
            name: null,
            lowPort: null,
            upPort: null
          }
          if (portInfo[a].upPort) {
            e[a] = { ...portInfo[a] }
          }
        }
        for (let b = 9; b < 18; b++) {
          d[b] = {
            epId: null,
            name: null,
            lowPort: null,
            upPort: null
          }
          if (portInfo[b].upPort) {
            f[b] = { ...portInfo[b] }
          }
        }
        this.cranOne = { ...c, ...e }
        this.cranTwo = { ...d, ...f }

      },
      immediate: true,
      deep: true
    }
  },

}
</script>

<style scoped>
.all {
  display: flex;
  margin-left: 10px;
}
.item {
  margin-right: 1vw;
  position: relative;
  top: -0.8vh;
}
.background {
  position: absolute;
  z-index: 999;
  width: 3.6vw;
  height: 47vh;
  border-radius: 5px;
  background-color: #efefef;
  display: flex;
  text-align: center;
  justify-content: center;
  position: absolute;
  margin-top: -5px;
  width: 8vw;
  top: 5vh;
}
.circl {
  width: 10px;
  height: 10px;
  /* background-color: red; */
  border-radius: 5px;
  border: #2b2b2b solid 1px;
  position: relative;
  background-color: #2b2b2b;
  left: 1.6vw;
  margin: 1.5vh 0vh 1.5vh 0vh;
}
.border {
  width: 3.6vw;
  height: 46vh;
  border-radius: 5%;
}
.smallIcon {
  position: absolute;
  top: 50px;
  height: 100%;
  width: 3.4vw;
}
.index {
  width: 16px;
  margin: 0px auto;
  position: relative;
  left: -2.2vw;
}
.cover {
  position: absolute;
  z-index: 999;
  width: 3.6vw;
  border-radius: 5%;
  background-color: #efefef;
  display: flex;
  text-align: center;
  justify-content: center;
}
.icon {
  position: relative;
  top: 20vh;
  width: 10vh;
}
.name {
  position: absolute;
  width: 7vw;
  text-align: center;
  left: -3.8vw;
  height: 2vh;
}
</style>