<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      @click="() => { read = { ...info } }"
    >查看</el-button>

    <public-alert-page-with-button
      :modal="false"
      :info="read"
      :title="'成端详情'"
      :width="'90vw'"
      :top="'10vh'"
    >
      <content-info :bus="formEventBus" :info="read"></content-info>
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
