<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      @click="() => { read = {...info} }"
    >查看</el-button>

    <public-alert-page-with-button
      :modal="false"
      :info="read"
      :title="'业务信息'"
      :width="'50vw'"
      :top="'10vh'"
    >
      <content-info
        v-loading="loading"
        element-loading-text="重载信息..."
        :bus="formEventBus"
        :info="info"
      ></content-info>
    </public-alert-page-with-button>
  </div>
</template>

<script>
import ContentInfo from "./content";
import { FormBus } from '../../lib/formbus'

export default {
  name: "ReadJumpInfo",
  props: {
    info: Object,
    bus: Object
  },
  components: {
    ContentInfo
  },
  data () {
    return {
      read: {},
      loading: false
    };
  },
  computed: {
    formEventBus: function () {
      return new FormBus(this.read)
    }
  },
  watch: {
    bus: {
      immediate: true,
      handler: function () {
      }
    }
  },
};
</script>
