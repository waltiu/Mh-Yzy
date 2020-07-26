<template>
  <div>
    <dialog-page :info="itemData" :title="$t('cable.editPortInformation')" width="40%" @ok="submit">
      <el-form label-width="80px">
        <el-form-item :label="$t('cable.carryingLightPath')">
          <el-input v-model="info.carryingWay"></el-input>
        </el-form-item>

        <el-form-item :label="$t('cable.carryingBusiness')">
          <el-input v-model="info.carryingBusiness"></el-input>
        </el-form-item>

        <el-form-item :label="$t('infoMap.transmissionSystem')">
          <big-select-down
            :config="table"
            :selected="info.transferSystem"
            :list="table.bigSelectDown()"
            @returnData="bindData"
          ></big-select-down>
        </el-form-item>
      </el-form>
    </dialog-page>
  </div>
</template>

<script>
export default {
  name: 'editCablePort',
  props: {
    itemData: Object
  },
  data () {
    return {
      info: {
        carryingBusiness: '',
        carryingWay: '',
        transferSystem: ''
      },
      table: {
        title: '传输系统',
        bigSelectDown: () => this.$store.getters.getObjByType['传输系统'],
        // 取得数据 item 为一个 Array
        result: (item) => {
          return item
        },
        // 使用display方法转化成 Array
        display: (item) => {
          if (item[0]) {
            return [item]
          } else {
            return []
          }
        }
      }
    }
  },
  watch: {
    itemData: function (newVal) {
      this.info = { ...newVal, transferSystem: '' }
    }
  },
  computed: {
  },
  methods: {
    bindData (info) {
      this.info.transferSystem = info[0]
    },
    submit () {
      this.$alert('如需修改纤芯端口信息，请先确定是否已绑定成端，否则将信息更改失败！', '信息修改提示！', {
        confirmButtonText: '已绑定，确认修改',
        callback: () => {
          this.$emit('returnData', this.info)
        }
      });
    }
  }
}
</script>
