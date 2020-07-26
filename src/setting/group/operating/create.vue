<template>
  <div>
    <!-- 增加按钮 -->
    <button
      type="button"
      class="el-button el-icon-plus el-button--primary el-button--small"
      style="margin-bottom: 10px;"
      @click="create = { name: '' }"
    >
      <span> {{$t('addZone.add')}}</span>
    </button>
    <!-- 弹出页面 -->
    <public-alert-page :info="create" style="width:1300px" :top="'5vh'">
      <div style="font-size: 16px; display: flex;">
        <i
          class="el-icon-info"
          style="color: rgb(64, 158, 255); margin-right: 5px; margin-top: 3px;"
        ></i>
        <h3>{{$t('user.add')}}</h3>
      </div>
      <div style="color:#409EFF;border-bottom:2px solid #e4e7ed; padding-top:20px">
        <div style="color:#409EFF;border-bottom:2px solid #409EFF ;width:66px;">
          <p style="padding-bottom:13px;white-space: nowrap">{{$t('main.basicInformation')}}</p>
        </div>
      </div>
      <!-- 表单详情 -->
      <el-form :model="form" :rules="rules" label-position="right" style="margin-top: 30px;white-space: nowrap">
        <el-form-item :label="$t('alert.userGroupName')+':'" prop="name" label-width="60px" >
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableSearch.remarks')+':'" prop=":note" label-width="60px">
          <el-input v-model="form.note" clearable></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部按钮 -->
      <template v-slot:footer="{methods: {close}}">
        <el-button :loading="createing" type="primary" @click="submit(close())">{{$t('dictMangeLib.submit')}}</el-button>
        <el-button @click="close()">{{$t('subdistricts.cancel')}}</el-button>
      </template>
    </public-alert-page>
  </div>
</template>

<script>
import { http } from '@/_command/http';

export default {
  name: 'CreateInfo',
  props: {
    info: Object,
    request: Object,
  },

  data () {
    return {
      create: {},
      fullData: {},
      createing: false,
      form: {
        name: '',
        note: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: '用户组名不能为空'
          }
        ]      }
    }  },
  methods: {

    submit () {
      http.post(`/api/sysRoles/`, this.form)
        .then(() => {
          this.$notify({
            title: '成功',
            message: '增加成功',
            type: 'success'
          })
          this.form = {}
          this.$emit("reload")
        })
    },
  }

}
</script>
