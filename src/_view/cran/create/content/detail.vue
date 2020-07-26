<template>
  <div style="display:flex">
    <div style="text-align: center;">
      <div class="detailCard">
        <p>{{portDetail.detail.upPort}}</p>
        <el-card>
          <div class="crial" :style="style"></div>
          <div class="crial" :style="style"></div>
        </el-card>
        <p>{{portDetail.detail.lowPort}}</p>
      </div>
    </div>
    <div style="margin-left: 10px;">
      <el-form label-position="top">
        <el-form-item label="业务口使用情况：">
          <div class="buttonList">
            <el-button type @click="occr">占用</el-button>
            <el-button type @click="stay">绑定</el-button>
          </div>
        </el-form-item>
        <el-form-item label="业务侧设备名称：">
          <el-input v-model="submitPortDetail.name" placeholder></el-input>
        </el-form-item>
        <el-form-item label="业务侧设备ID：">
          <el-input v-model="submitPortDetail.epId" placeholder></el-input>
        </el-form-item>

        <el-form-item label="业务侧设备端口：">
          <el-input v-model="submitPortDetail.port" placeholder></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      submitPortDetail: {
        state: '-1'
      },
      style: 'background: beige'
    }
  },
  props: {
    portDetail: Object
  },
  methods: {
    occr () {
      this.style = 'background: red'
      this.submitPortDetail.state = '1'
    },
    stay () {
      this.style = 'background: green'
      this.submitPortDetail.state = '0'
    }
  },
  watch: {
    submitPortDetail: {
      handler: function (newVal) {
        let subData = {}
        subData[this.portDetail.index] = { ...this.portDetail.detail, ...newVal }
        this.$emit('getPort', subData)
      },
      deep: true
    },
    portDetail: {
      handler: function (newVal) {
        if (newVal.detail.state === '1') {
          this.style = 'background: red'
        } else if (newVal.detail.state === '0') {
          this.style = 'background: green'
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
  width: 20px;
  height: 20px;
  /* background-color: red; */
  border-radius: 50%;
  margin: 10px;
}
.buttonlist {
  position: absolute;
  top: 100px;
}
</style>