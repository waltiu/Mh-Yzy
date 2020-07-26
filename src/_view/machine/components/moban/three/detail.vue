<template>
  <div style="display:flex" class="crad" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div class="circl" id="circlLeft"></div>
    <div class="border" style="width:22vw;height:12vh" @click="showCran">
      <div v-show="detail.id">
        <div class="smallIcon">
          <small-icon
            v-for="(item,index) of portInfos"
            :type="type"
            :key="index"
            :portInfoDetail="item"
            class="small"
          ></small-icon>
        </div>
      </div>
    </div>
    <div class="cover" v-show="coverShow&&couldOperation">
      <div v-show="!detail.id" class="icon">
        <img src="../component/img/add.png" @click="addCran" />
      </div>
      <div v-show="detail.id" class="icon">
        <img src="../component/img/reduce.png" @click="reduceCran" />
      </div>
    </div>
    <div class="circl" id="circlRight"></div>
    <div class="name">{{detail.name}}</div>

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
import smallIcon from '../component/smallIconThree'
import cran from '@/_view/cran/read/content'
import { ResourceApiLayer } from '@/_command/curd';
export default {
  name: 'threeDetail',
  data () {
    return {
      portInfos: [],
      coverShow: false,
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
  inject: ['couldOperation'],
  mounted () {
  },
  components: {
    smallIcon,
    addCran,
    cran
  },
  methods: {
    addCran () {
      this.dialogVisible = true
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
    mouseenter () {
      this.coverShow = true
    },
    mouseleave () {
      this.coverShow = false
    },
    addCranDetail (info) {
      this.addCranData = info
    },
    showCran () {
      if (!this.couldOperation && this.detail.id) {
        this.cranDataShow = true
      }
    },
    close () {
      this.cranDataShow = false
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
      immediate: true,
      deep: true
    }
  },

}
</script>

<style scoped>
.cover {
  position: absolute;
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: #efefef;
  width: 22.9vw;
  height: 13vh;
  top: 1.5vh;
  border-radius: 5px;
}
.icon {
  z-index: 999;
  width: 50px;
  height: 50px;
  position: relative;
  margin-top: 4vh;
}
.border {
  border-radius: 5px;
  border: #171414 1px solid;
  margin-top: 20px;
  margin-right: 2vw;
  height: 30vh;
}
.name {
  position: absolute;
  font-size: 18px;
  top: 15.1vh;
  width: 22.9vw;
  text-align: center;
}
.circl {
  width: 10px;
  height: 10px;
  /* background-color: red; */
  border-radius: 50%;
  background-color: #171414;
  border: #171414 solid 1px;
}
#circlLeft {
  position: relative;
  top: 7vh;
  right: 10px;
}
#circlRight {
  position: relative;
  left: -1.4vw;
  top: 7vh;
}
.smallIcon {
  position: absolute;
  display: flex;
}
.small {
  position: relative;
  top: 1vh;
  left: 2px;
}
</style>