<template>
  <div style="margin-right: 10px">
    <el-button @click="modify" type="primary" size="mini">{{$t('alert.modifyPermissions')}}</el-button>

    <public-alert-page-with-button
      top="5vh"
      width="80%"
      :info="changeInfo"
      :modal="false"
      :title="$t('opticalSplitter.editInformation')"
      @ok="submit"
    >
      <div v-loading="authListLoading || RoleListLoading">
        <div v-for="(classList, index) in RoleList" :key="index">
          <el-card class="box-card">
            <div slot="header">
              <el-checkbox
                v-model="enableList[classList[0].pId]"
                @change="(status) => {checkBoxChange(status, classList[0].pId)}"
              >{{ classList[0].name.split('-')[0] }}</el-checkbox>
            </div>
            <div class="card-content">
              <div v-for="(role, roleIndex) in classList" :key="roleIndex">
                <el-checkbox
                  :disabled="!enableList[role.pId]"
                  v-model="enableList[role.id]"
                >{{ role.name }}</el-checkbox>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </public-alert-page-with-button>
  </div>
</template>

<script>
import { getGroupAuthListById } from '@/_command/curd'
import { getRoleList } from '@/_command/misc';
import { http } from '@/_command/http';

export default {
  name: 'ModifyPermissions',
  props: {
    info: Object
  },
  data () {
    return {
      changeInfo: null,
      authListLoading: false,
      RoleListLoading: false,
      rowRoleList: [],
      RoleList: {},
      enableList: {}
    }
  },
  methods: {
    modify () {
      this.changeInfo = { ...this.info }
      this.authListLoading = true
      getGroupAuthListById(this.info.id)
        .then(res => {
          this.enableList = res.reduce((res, val) => {
            res[val.id] = true
            return res
          }, {})
        })
        .finally(() => { this.authListLoading = false })

      this.RoleListLoading = true
      getRoleList()
        .then(res => {
          this.rowRoleList = res
          return res
        })
        .then(res => {
          // 检出0系master
          let masterList = res.reduce((res, val) => {
            if (val.pId === '0') res[val.id] = val.name
            return res
          }, {})

          // 初始值
          let initVal = Object.values(masterList).reduce((res, val) => {
            res[val] = []
            return res
          }, {})

          // 通过 0 系 master 检出儿子
          return res.reduce((res, val) => {
            if (Object.keys(masterList).includes(val.pId)) res[masterList[val.pId]].push(val)
            return res
          }, initVal)

        })
        .then(res => this.RoleList = res)
        .finally(() => { this.RoleListLoading = false })

    },
    checkBoxChange (status, id) {
      this.rowRoleList.map(item => {
        if (item.pId === id) {
          this.$set(this.enableList, item.id, status)
        }
      })
    },
    submit () {
      let target = Object.entries(this.enableList)
        .filter(([, val]) => val)
        .map(([key,]) => key)
        .map(item => `sysAuths/${item}`)

      http.patch(`/api/sysRoles/${this.changeInfo.id}`, {
        sysAuthList: target
      })
        .then(() => {
          this.$emit('reload')
          this.$notify({
            title: '成功',
            message: `${this.changeInfo.name} 更新成功`,
            type: 'success'
          })
        })
    }
  }
}
</script>

<style>
.box-card {
  margin: 10px;
}
.card-content {
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
}
</style>
