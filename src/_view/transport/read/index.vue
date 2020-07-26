<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      @click="() => { read = {...info} }"
    >{{$t('alert.view')}}</el-button>

    <public-alert-page-with-button :info="read" title="传输系统查看" :width="'90vw'" :top="'5vh'">
      <content-info :request="request" :info="info"></content-info>
    </public-alert-page-with-button>
  </div>
</template>

<script>
import ContentInfo from './content'

export default {
  name: 'readIndex',
  props: {
    info: Object,
    request: Object
  },
  components: {
    ContentInfo
  },
  watch: {
    info: function () {
      // console.log(newVAL)
    }
  },
  data () {
    return {
      read: {}
    }
  },

}
</script>
