<template>
  <div style="display:flex">
    <div style="text-align: center;">
      <div class="detailCard">
        <p>{{portDetail.detail.upPort}}</p>
        <div class="line1"></div>

        <el-card style="background:#29abe2">
          <div class="iconItem">
            <img-icons></img-icons>
            <div class="imgBorder">
              <div class="crial" :style="style"></div>
            </div>
          </div>
          <div class="iconItem">
            <img-icons></img-icons>
            <div class="imgBorder">
              <div class="crial" :style="style"></div>
            </div>
          </div>
        </el-card>
        <div class="line2"></div>

        <p>{{portDetail.detail.lowPort}}</p>
      </div>
    </div>
    <div style="margin-left: 10px;">
      <el-form label-position="top">
        <el-form-item label="业务口使用情况：">
          <div class="buttonList">
            <el-button type @click="occr">占用</el-button>
            <el-button type @click="stay">不可用</el-button>
            <el-button type @click="free">空闲</el-button>
          </div>
        </el-form-item>
        <el-form-item label="业务侧设备名称：">
          <el-input v-model="submitPortDetail.name" placeholder :disabled="inputState"></el-input>
        </el-form-item>
        <el-form-item label="业务侧设备ID：">
          <el-input v-model="submitPortDetail.epId" placeholder :disabled="inputState"></el-input>
        </el-form-item>

        <el-form-item label="业务侧设备端口：">
          <el-input v-model="submitPortDetail.port" placeholder :disabled="inputState"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import imgIcons from '../../components/img'
export default {
  name: 'detail',
  data () {
    return {
      submitPortDetail: {
        state: '-1'
      },
      style: 'background: beige',
      inputState: false
    }
  },
  components: {
    imgIcons
  },
  props: {
    portDetail: Object
  },
  methods: {
    occr () {
      this.style = 'background:#f15a24'
      this.submitPortDetail.state = '1'
      this.inputState = false
    },
    stay () {
      this.style = 'background: #0071bc'
      this.submitPortDetail.state = '0'
      this.inputState = true
      this.submitPortDetail.name = null
      this.submitPortDetail.epId = null
      this.submitPortDetail.port = null
    },
    free () {
      this.$confirm('修改为空闲状态将清空数据', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.inputState = false
        this.style = 'background: #FFF'
        this.submitPortDetail.state = '-1'
        this.submitPortDetail.name = null
        this.submitPortDetail.epId = null
        this.submitPortDetail.port = null
      })
    }
  },
  watch: {
    submitPortDetail: {
      handler: function (newVal) {
        let a = newVal
        if (newVal.name || newVal.epId || newVal.port) {
          a.state = '1'
          this.style = 'background:#f15a24'

        }
        let subData = {}
        subData[this.portDetail.index] = { ...this.portDetail.detail, ...a }
        this.$emit('getPort', subData)
      },
      deep: true
    },
    portDetail: {
      handler: function (newVal) {
        if (newVal.detail.state === '1') {
          this.style = 'background: #f15a24'
        } else if (newVal.detail.state === '0') {
          this.style = 'background: #0071bc'
        } else {
          this.style = 'background: #FFF'
        }
        this.submitPortDetail = { ...this.submitPortDetail, ...newVal.detail }
      },
      deep: true,
      immediate: true
    },

  }

}
</script>

<style>
.detailCard {
  width: 80px;
}
.crial {
  width: 10px;
  height: 10px;
  /* background-color: red; */
  border-radius: 50%;
  border: #29abe2 solid 1px;
  margin: 7px;
}
.buttonlist {
  position: absolute;
  top: 100px;
}
.line1 {
  height: 2px;
  width: 100%;
  background-color: #0071bc;
  position: relative;
  top: 10px;
}
.line2 {
  height: 2px;
  width: 100%;
  background-color: #0071bc;
  position: relative;
  top: -10px;
}
.iconItem {
  display: flex;
  margin-bottom: 5px;
}
.imgBorder {
  width: 25px;
  height: 25px;
  background-color: #0071bc;
  font-size: 14px;
}
</style>