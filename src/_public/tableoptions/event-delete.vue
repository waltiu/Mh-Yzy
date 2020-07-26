<template>
  <el-popover placement="top" width="160" v-model="visible" :title="$t('_public.sure')">
    <p>{{$t('_public.sure_to_delete')}}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">{{$t('_public.cancel')}}</el-button>
      <el-button
        class="table-inside-button"
        size="mini"
        type="danger"
        @click="deleteInfo"
      >{{$t('_public.delete')}}</el-button>
    </div>
    <el-button
      :loading="loading"
      size="mini"
      type="danger"
      slot="reference"
    >{{$t('_public.delete')}}</el-button>
  </el-popover>
</template>

<script>
export default {
  name: "DeleteInfo",
  props: {
    bus: Object,
    info: Object
  },
  data () {
    return {
      loading: false,
      visible: false
    };
  },
  methods: {
    close () {
      this.visible = false;
    },
    deleteInfo () {
      this.close();
      this.loading = true;
      this.bus.delete(this.info.id).finally(() => {
        this.bus.search()
        this.loading = false;
      });
    }
  }
};
</script>
