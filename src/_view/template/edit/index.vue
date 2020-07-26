<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      @click="edit = { ...info }"
    >{{$t('subdistricts.edit')}}</el-button>

    <public-alert-page
      :info="edit"
      :title="$t('opticalSplitter.editInformation')"
      :width="'90vw'"
      :top="'5vh'"
    >
      <edit-content
        :request="request"
        :info="info"
        @returnChangeData="(info) => { fullData = info }"
      ></edit-content>

      <template v-slot:footer="{methods: {close}}">
        <el-button
          :loading="patching"
          :disabled="!fullData.id"
          type="primary"
          @click="submit(close)"
        >{{$t('subdistricts.submit')}}</el-button>
        <el-button @click="close()">{{$t('subdistricts.cancel')}}</el-button>
      </template>
    </public-alert-page>
  </div>
</template>

<script>
import EditContent from './content'

export default {
  name: 'EditInfo',
  props: {
    info: Object,
    request: Object
  },
  components: {
    EditContent
  },
  data () {
    return {
      edit: {},
      fullData: {},
      patching: false
    }
  },
  methods: {
    submit (close) {
      this.patching = true
      this.request
        .update({ info: this.fullData })
        .then(() => {
          this.$notify({
            title: '更新成功',
            message: this.fullData.name,
            type: 'success'
          })
        })
        .finally(() => {
          this.patching = false
          this.fullData = {}
          close()
        })
    },
  },
}
</script>
