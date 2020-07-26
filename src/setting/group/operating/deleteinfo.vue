<template>
  <div>
    <el-popover placement="top" width="160" v-model="visible">
      <p>确定删除吗 ?</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="deleteItem">确定</el-button>
      </div>
      <el-button
        size="mini"
        type="danger"
        slot="reference"
        :loading="loading"
      >{{ !loading ? '删除' : '删除中...' }}</el-button>
    </el-popover>
  </div>
</template>

<script>
import { http } from '@/_command/http';
export default {
  name: 'deleteItem',
  props: {
    info: Object
  },
  data () {
    return {
      loading: false,
      visible: false
    }
  },
  methods: {
    deleteItem () {
      this.visible = false
      this.loading = true
      http.delete(`/api/sysRoles/${this.info.id}`)
        .then(() => {
          this.$emit('reload')
          this.$notify({
            title: '成功',
            message: `${this.info.name} 删除成功`,
            type: 'success'
          })
        })
        .finally(() => { this.loading = false })
    }
  }
}
</script>
