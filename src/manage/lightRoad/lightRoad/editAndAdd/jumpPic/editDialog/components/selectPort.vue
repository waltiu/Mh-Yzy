<template>
  <!-- 选择ODF, 光交可用端口, 传入useInfos后自动识别信息, 完成分片, 分型号的传递 -->
  <dialog-page :info="rowInfo" :modal="false" :title="$t('opticalSplitter.selectPort')">
    <div v-loading="loading">
      <show-port :info="rawUseInfo" @selectPort="selectPort" @changeArray="changeArray">
        <template slot="tips">
          <div v-if="this.fullData.coreNum === '双芯' && this.type.jumpType === 'room'">
            <p>
              共需要选择
              <span>2</span>个端口，包含跳纤端口
              <span>0</span>个
            </p>
          </div>
          <div v-else-if="this.fullData.coreNum === '双芯' && this.type.jumpType === 'inner'">
            <p>
              共需要选择
              <span>4</span>个端口，包含跳纤端口
              <span>2</span>个
            </p>
          </div>
          <div v-else-if="this.fullData.coreNum === '单芯' && this.type.jumpType === 'inner'">
            <p>
              共需要选择
              <span>2</span>个端口，包含跳纤端口
              <span>1</span>个
            </p>
          </div>
          <div v-else>
            <p>
              共需要选择
              <span>1</span>个端口，包含跳纤端口
              <span>0</span>个
            </p>
          </div>
        </template>
        <template slot="clear">
          <el-button type="warning" plain @click="clear">重新选择端口</el-button>
        </template>
      </show-port>
    </div>

    <div slot="footer"></div>
  </dialog-page>
</template>

<script>
import showPort from '@/public/OdfOccPort/lightRoad.vue'

export default {
  name: 'selectPort',
  props: {
    info: Object,
    fullData: Object,
    type: Object,
    chooseStaus: Boolean

  },
  components: {
    showPort
  },
  data () {
    return {
      rowInfo: {},
      loading: true,
      rawUseInfo: {},
      ports: [],
      port: "",
      sum: {
        number: "",
        devilceNumber: ""
      }
    }
  },
  mounted () {
    this.type.jumpType = "room"
    this.ports = []
    if (this.fullData.coreNum === "双芯" && this.type.jumpType === "room") {
      this.sum.number = 2
      this.sum.devilceNumber = 0
    } else if (this.fullData.coreNum === "单芯" && this.type.jumpType === "room") {
      this.sum.number = 1
      this.sum.devilceNumber = 0


    } else if (this.fullData.coreNum === "双芯" && this.type.jumpType === "inner") {
      this.sum.number = 4
      this.sum.devilceNumber = 2

    } else {
      this.sum.number = 2
      this.sum.devilceNumber = 1


    }
  },
  methods: {
    clear () {
      this.ports = []
      this.$emit('selectPort', this.ports)
      this.$store.commit('changeDrawArray', null)

      this.$getTableFullInfo('switchY', this.info, (e) => {
        this.loading = false
        this.rawUseInfo = { ...e.data }
      })

    },
    changeArray (newVal) {
      this.rowInfo = newVal
    },
    selectPort (args) {
      let a = this.ports.some(item => {
        return item === args.show
      })
      if (a) {

        this.$message({
          message: '请不要重复选择端口',
          type: 'warning'
        });
      } else {

        this.ports.push(args.show)

      }

      this.port = args.show
      // if (this.fullData.coreNum === "双芯" && this.ports.length === '2') {
      //   console.log('1')
      // } else {
      //   console.log('2')
      // }
      // console.log(this.fullData.coreNum)
      // if (args.type === 'use') {
      // }
    },
    computedArray (num) {
      if (num) {
        return [...Array(Number(num)).keys()]
      } return []
    },
    getFullInfo () {
      if (!this._.isEmpty(this.info)) {
        this.loading = true
        this.$getTableFullInfo('switchY', this.info, (e) => {
          this.loading = false
          this.rawUseInfo = { ...e.data }
        })
      }
    }
  },

  watch: {
    info: {
      handler: function (newVal) {
        this.rowInfo = { ...newVal }
        this.getFullInfo()
      },
      deep: true
    },
    chooseStaus: {
      handler: function () {
        this.ports = []
        this.$emit('selectPort', this.ports)

      }
    },
    sum: function (newVal) {
      return newVal
    },
    port: function () {
      let length = this.ports.length
      if (this.fullData.coreNum === "双芯" && this.type.jumpType === "room") {
        if (length < 2) {
          this.$message({
            message: '由于你的选择的芯数为双芯，请再选择一个端口',
            type: 'warning'
          });
        } else if (length === 2) {
          this.$emit('selectPort', this.ports)
          this.rowInfo = {}
          this.$message({
            message: '端口选择完毕',
            type: 'success'
          });
        }
        else {
          this.$message({
            message: '您的端口选择完毕，如需更改，点击右侧的重新选择按钮',
            type: 'warning'
          });

        }
      } else if (this.fullData.coreNum === "单芯" && this.type.jumpType === "room") {

        if (length === 1) {
          this.$emit('selectPort', this.ports)
          this.rowInfo = {}
          this.$message({
            message: '端口选择完毕',
            type: 'success'
          });
        } else {
          this.$message({
            message: '您的端口选择完毕，如需更改，点击右侧的重新选择按钮',
            type: 'warning'
          });
        }

      } else if (this.fullData.coreNum === "双芯" && this.type.jumpType === "inner") {

        if (length < 4 && length !== 2 && length !== 3) {
          this.$message({
            message: '由于你的选择的芯数为双芯，请再选择一个端口',
            type: 'warning'
          });
        } else if (length === 2) {
          this.$message.warning('由于你的选择了二次跳纤，请再选择一组端口');
        } else if (length === 3) {
          this.$message({
            message: '请再选择一个二次跳纤端口',
            type: 'warning'
          });

        } else if (length === 4) {
          this.$emit('selectPort', this.ports)
          this.rowInfo = {}
          this.$message({
            message: '端口选择完毕',
            type: 'success'
          });

        }
        else {
          this.$message({
            message: '您的端口选择完毕，如需更改，点击右侧的重新选择按钮',
            type: 'warning'
          });
        }
      } else {

        if (length < 2) {
          this.$message.warning('请再选择一个二次跳纤端口');

        } else {
          if (length === 2) {
            this.$emit('selectPort', this.ports)
            this.$message({
              message: '端口选择完毕',
              type: 'success'
            })
            this.rowInfo = {}
          } else {
            this.$message({
              message: '您的端口选择完毕，如需更改，点击右侧的重新选择按钮',
              type: 'warning'
            });
          }

        }
      }

    }
  }
}
</script>
