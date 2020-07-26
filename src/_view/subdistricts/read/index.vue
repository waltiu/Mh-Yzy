<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      @click="() => { read = {...info} }"
    >{{$t('subdistricts.view')}}</el-button>

    <public-alert-page-with-button :info="read" :title="'小区资源查看'" :width="'96vw'" :top="'2vh'">
      <content-info :request="request" :eventBus="eventBus" :info="info"></content-info>
    </public-alert-page-with-button>
  </div>
</template>

<script>
import ContentInfo from "./content";
import { FormEventBus } from '@/_command/event'

export default {
  name: "ReadInfo",
  props: {
    info: Object,
    request: Object
  },
  components: {
    ContentInfo
  },
  data () {
    return {
      read: {}
    };
  },
  computed: {
    eventBus: function () {
      return new FormEventBus(this.read)
    }
  },
};
</script>
