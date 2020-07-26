<template>
  <div>
    <el-button
      class="table-inside-button"
      size="mini"
      type="primary"
      icon="el-icon-circle-plus-outline"
      @click="create = { name: '' }"
    >新建工程</el-button>

    <public-alert-page :info="create" :title="'新建工程'" :width="'50vw'" :top="'5vh'">
      <content-info :bus="FormBus"></content-info>

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
import { FormBus } from '../lib/formbus';


export default {
  name: "CreateInfo",
  props: {
    bus: Object
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
    FormBus: function () {
      return new FormBus(this.create)
    }
  },
  methods: {
    submit (close) {
      this.createing = true;

      let { formData, create } = this.FormBus

      create(formData)
        .then(() =>
          this.$notify({
            title: "成功",
            message: `增加完成 ${formData.name}`,
            type: "success"
          })
        )
        .then(close)
        .then(this.bus.search)
        .finally(() => this.createing = false)
    }
  }
};
</script>
