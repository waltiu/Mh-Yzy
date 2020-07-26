<template>
  <div style="margin-right: 10px">
    <el-button type="primary" size="mini" @click="change">{{$t('main.reviseInformation')}}</el-button>

    <public-alert-page-with-button :info="form" :modal="false" :title="$t('opticalSplitter.editInformation')" @ok="submit">
      <el-form>
        <el-form-item :label="$t('tableSearch.name')">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item :label="$t('tableSearch.remarks')">
          <el-input v-model="form.note"></el-input>
        </el-form-item>
      </el-form>
    </public-alert-page-with-button>
  </div>
</template>

<script>
import { http } from '@/_command/http';

export default {
  name: 'modfiyInfo',
  props: {
    info: Object
  },
  data () {
    return {
      form: {}
    }
  },
  methods: {
    change () {
      this.form = { ...this.info }
    },
    submit () {
      http.patch(`/api/sysRoles/${this.info.id}`, this.form)
        .then(() => {
          this.$emit('reload')
          this.$notify({
            title: '成功',
            message: `${this.form.name} 更新成功`,
            type: 'success'
          })
        })
    }
  },
}
</script>
