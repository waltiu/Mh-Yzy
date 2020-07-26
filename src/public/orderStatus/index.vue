<template>
  <div>
    <div style="display: flex">
      <el-tag
        v-if="!_.isEmpty(info)"
        :size="size"
        :type="status[info.state].type"
      >{{ $t(status[info.state].name) }}</el-tag>

      <el-button
        v-if="showHandle"
        @click="changeStatus"
        type="text"
        :size="'mini'"
        style="margin-left: 10px; height: 2px;"
      >{{ $t('public.changeStatus') }}</el-button>

      <el-button
        v-if="showHandle && Object.keys(recall).includes(info.state)"
        @click="recallStatus(info.state)"
        type="text"
        :size="'mini'"
        style="margin-left: 10px; height: 2px;"
      >
        <div>{{ $t(recall[info.state]) }}</div>
      </el-button>
    </div>

    <div>
      <change-order-status
        @returnData="(info) => {$emit('returnData', info.state)}"
        :info="changeInfo"
      ></change-order-status>
    </div>
  </div>
</template>

<script>
import changeOrderStatus from './changeStatus'

export default {
  name: 'orderStatus',
  components: {
    changeOrderStatus
  },
  props: {
    info: Object,
    size: {
      default: 'small',
      type: String
    },
    showHandle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selectVal: '',
      changeInfo: {},
      recall: {
        unreviewed: 'user.submission',
        finish: 'user.review'
      },
      status: {
        uncommitted: {
          name: 'OS.toBeSubmitted',
          type: 'info'
        },
        unreviewed: {
          name: 'OS.toBeAudited',
          type: 'warning'
        },
        finish: {
          name: 'OS.complete',
          type: 'success'
        }
      },
      default: {
        name: 'OS.unknownState',
        type: 'info'
      }
    }
  },
  computed: {
  },
  methods: {
    changeStatus () {
      this.changeInfo = { ...this.info }
      this.selectVal = this.changeInfo.state
    },
    recallStatus (state) {
      this.$confirm(this.$i18n.t('public.determine') + this.$i18n.t(this.recall[state]) + '?', this.$i18n.t('public.payAttention'), {
        customClass: 'alertdialog',
        confirmButtonText: this.$i18n.t('dynamic.determine'),
        cancelButtonText: this.$i18n.t('user.cancel'),
        type: 'warning'
      })
        .then(() => this.requestRecall())
        .catch(() => { })
    },
    requestRecall () {
      let url
      switch (this.info.state) {
        case 'unreviewed':
          url = '/api/ldsysOpticalSplitterOrders/orderCommitRollback/'
          break

        case 'finish':
          url = '/api/ldsysOpticalSplitterOrders/orderCheckRollback/'
          break
      }
      this.$http.post(url + this.info.id)
        .then(res => {
          if (this.$checkStatus(res)) {
            this.$emit('returnData', res.data.state)
          }
        })
    }
  }
}
</script>
