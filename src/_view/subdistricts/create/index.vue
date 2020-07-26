<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="create = { name: '' }"
    >{{$t('subdistricts.new')}}</el-button>

    <public-alert-page
      :info="create"
      :title="$t('subdistricts.new_infomation')"
      :width="'90vw'"
      :top="'5vh'"
    >
      <content-info :eventBus="eventBus" :request="request"></content-info>

      <template v-slot:footer="{methods: {close}}">
        <el-button
          :loading="createing"
          type="primary"
          @click="submit(close)"
        >{{$t('subdistricts.submit')}}</el-button>
        <el-button @click="close()">{{$t('subdistricts.cancel')}}</el-button>
      </template>
    </public-alert-page>
  </div>
</template>

<script>
import ContentInfo from "./content"
import { FormEventBus } from '@/_command/event'

export default {
  name: "CreateInfo",
  props: {
    request: Object
  },
  components: {
    ContentInfo
  },
  data () {
    return {
      create: {},
      createing: false
    };
  },
  computed: {
    eventBus: function () {
      return new FormEventBus(this.create)
    }
  },
  methods: {
    submit (close) {
      this.createing = true;
      this.request
        .create({ info: this.eventBus.submit() })
        .then(() => {
          this.$notify({
            title: "成功",
            message: `增加完成 ${this.eventBus.fullData.name}`,
            type: "success"
          });
          close();
        })
        .finally(() => {
          this.createing = false;
        });
    }
  }
};
</script>
