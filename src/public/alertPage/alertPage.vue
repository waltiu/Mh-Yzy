<template>
  <!-- 组件用来提供弹框, 被动方式通过数据的有/无来控制弹框的状态, 当弹框主动关闭时向上层提交关闭事件 -->
  <!-- props 禁止sync info信息, 所有的状态自动控制 -->
  <!--
    @returnStatus 返回 dialog 状态 Boolean
    @ok 点击成功按钮  null
    @cancel 点击取消按钮 null
  -->
  <el-dialog
    :top="top"
    :close-on-click-modal="false"
    :modal="modal"
    :visible="dialogStatus"
    :width="width ? width : '95%'"
    :before-close="handleClose"
    :append-to-body="true"
    @close="close"
  >
    <edit-map-deatil></edit-map-deatil>

    <div slot="title" style="font-size: 16px; display: flex;">
      <i style="color: #409EFF; margin-right: 5px; margin-top: 3px;" class="el-icon-info"></i>
      <h3>{{ title }}</h3>
    </div>
    <slot
      v-if="dialogStatus"
      :method="{
        ok: ok,
        close: handleClose,
        cancel: cancel
      }"
    ></slot>
    <span slot="footer" class="dialog-footer">
      <slot
        name="footer"
        :method="{
        ok: ok,
        close: handleClose,
        cancel: cancel
      }"
      >
        <div style="display: inline-flex;">
          <slot
            name="footer-add"
            :method="{
            ok: ok,
            close: handleClose,
            cancel: cancel
          }"
          ></slot>
          <el-button
            v-if="showFooter"
            :disabled="disableArray.includes('ok')"
            type="primary"
            @click="ok"
          >{{$t('opticalSplitter.determine')}}</el-button>

          <el-button @click="edit" v-if="editTf">编辑</el-button>
          <el-button type="danger" v-if="editTf" @click="del(info)">删除</el-button>
          <el-button
            v-if="showFooter"
            :disabled="disableArray.includes('cancel')"
            @click="cancel"
          >{{$t('opticalSplitter.cancel')}}</el-button>
        </div>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
import editMapDeatil from './editMapDeatil'

export default {
  name: 'singleAlertPage',
  components: {
    editMapDeatil
  },
  props: {
    // disableArray: {
    //   type: Array,
    //   default: () => []
    // },
    showFooter: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    info: null,
    title: String,
    top: {
      type: String,
      default: '5vh'
    },
    width: {
      type: String,
      default: '95%'
    },
    type: String,
    editTf: [Boolean, Object],
  },
  data () {
    return {
      ableToDo: true,
      builtinInfo: '',
      disableArray: [],
      editInfo: [],
      editShow: true,
      editDetail: false
    }
  },
  computed: {
    closeMethods: function () {
      return {
        ok: this.ok,
        close: this.handleClose,
        cancel: this.cancel
      }
    },
    editMapInfo: function () {
      return this.$store.state.mapEditInfo
    },
    dialogStatus: {
      get: function () {
        if (this.builtinInfo === true) return true
        if (!this._.isEmpty(this.builtinInfo)) return true
        // 如果builtinInfo与
        return false
      }
    }
  },
  mounted () {
  },
  watch: {

    dialogStatus: function (newVal) {
      // 向上层返回当前的Modal状态
      // 不推荐使用
      this.$emit('returnStatus', newVal)
    },
    info: {
      immediate: true,
      handler: function (newVal) {
        this.editInfo.push(newVal)
        if (newVal === 0) {
          this.builtinInfo = { add: 0 }
        } else {
          this.builtinInfo = newVal
        }
      },
      deep: true
    },
    editMapInfo: {
      handler: function (newVal) {
        if (newVal && newVal.mapType !== 'cran' && newVal.mapType !== 'machine' && newVal.mapType !== 'subdistricts') {
          this.fullData = newVal
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    close () {
      if (this.editTf) {
        this.$store.commit('mapEditInfoUpdate', null)
        this.builtinInfo = false
      }
    },
    handleClose () {
      this.builtinInfo = false
      this.changeFatherStatus()
      this.$emit('close', false)
    },
    ok () {
      this.ableToDo = this.$store.state.other.ableToDO
      this.builtinInfo = false
      this.changeFatherStatus()
      this.$emit('ok')
      this.$emit('close', true)
    },
    cancel () {
      this.builtinInfo = false
      this.changeFatherStatus()
      this.$emit('cancel')
      this.$emit('close', false)
    },
    edit () {
      this.$store.commit('mapDetailEditChange', true)
    },
    del () {
      this.editInfo = []
      this.editInfo.push(this.info)
      let tmp = this.editInfo.map(item => item.name)
      this.$confirm(this.$i18n.t('business.delete') + tmp + this.$i18n.t('business.entry'), {
        type: 'warning'
      })
        .then(() => {
          for (const iterator of this.editInfo) {
            this.$resourceOperating({
              name: this.type,
              type: 'delete',
              info: iterator
            }, () => {
              this.$store.commit('deleteFranshTf', {
                type: this.type,
                tf: true
              })
              this.builtinInfo = false
            })
          }
        })
        .catch(() => { })
    },
    changeFatherStatus () {
      let info
      switch (typeof this.info) {
        case 'number':
          info = 0
          break;

        case 'boolean':
          info = false
          break

        case 'object':
          if (Array.isArray(this.info)) {
            info = []
          } else if (_.isObject(this.info)) {
            info = {}
          }
          break;


        default:
          info = false
          break;
      }
      this.$emit('update:info', info)
    }
  },

}
</script>
