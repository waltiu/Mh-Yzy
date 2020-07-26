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
      style="margin-left:5px"
    >{{$t('_public.delete')}}</el-button>
  </el-popover>
</template>

<script>
export default {
  name: "DeleteInfo",
  props: {
    request: Object,
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
      this.request.delete({ args: this.info })
        .then((res) => {
          if (res.status === 200) {
            this.$notify({
              title: '操作成功',
              message: `删除完成 `,
              type: 'success'
            })
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
