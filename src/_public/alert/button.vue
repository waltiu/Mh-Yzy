<template>
  <div>
    <public-alert-page v-on="$listeners" v-bind="$attrs" @close="close">
      <div>
        <slot></slot>
        <map-edit :type="type" :info="tableData" :request="request"></map-edit>
      </div>
      <div slot-scope="self" slot="footer">
        <el-button @click="ok(self.methods.close)" type="primary">{{$t('_public.confirm')}}</el-button>
        <el-button @click="edit" v-if="editTf">编辑</el-button>
        <el-button type="danger" v-if="editTf" @click="del()">删除</el-button>
        <el-button @click="no(self.methods.close)" type="primary">{{$t('_public.cancel')}}</el-button>
      </div>
    </public-alert-page>
  </div>
</template>

<script>
import mapEdit from './editMapButton'
export default {
  name: "NextAlertPageWithButton",
  components: {
    mapEdit
  },
  data () {
    return {
      detail: {},
      editShow: false
    }
  },
  props: {
    editTf: [Boolean, Object],
    type: String,
    tableData: Object,
    request: Object
  },
  methods: {
    ok (close) {
      close();
      this.$emit("ok");
      this.$store.commit('mapDetailEditChange', false)
    },
    no (close) {
      close();
      this.$emit("no");
      this.$store.commit('mapDetailEditChange', false)


    },
    edit () {
      this.editShow = true
      this.$store.commit('mapDetailEditChange', {
        type: this.type,
        info: this.tableData
      })

    },
    close () {
      this.$store.commit('mapEditInfoUpdate', null)
    },
    del () {
      this.request.delete({ args: this.tableData })
        .then((res) => {
          if (res.status === 200) {
            this.$notify({
              title: '操作成功',
              message: `删除完成 `,
              type: 'success'
            })
            this.$emit('delete')
          }
        })

    }
  }
};
</script>
<style  scoped>
</style>
