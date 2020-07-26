<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      @click="() => { read = {...info} }"
    >查看 | 审核</el-button>

    <public-alert-page-with-button :info="read" :title="'纤芯工程'" :width="'50vw'" :top="'10vh'">
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
import { FormBus } from '../lib/formbus'

export default {
  name: "ReadInfo",
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
    formEventBus: function () {
      const { setFull, read } = this.formEventBus

        .on('reloadTable', (full) => {

          this.loading = true
          read(full.id)
            .then(res => res.data)
            .then(setFull)
            .finally(() => this.loading = false)

          this.bus.search()
            .then(res => res.data)

        })
    }
  },
};
</script>
