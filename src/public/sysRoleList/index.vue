<template>
  <!-- 在vuex中读取权限列表, 然后综合进来的数据进行选中, 当选项更改的时候动态return值 -->
  <div style="overflow-x: auto;" v-loading="loading">
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="(item, index) in groupList"
        :label="item.id"
        :key="index + 'a'"
      >{{ item.name }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import { getGroupList } from '@/_command/curd'

export default {
  name: 'sysRoleList',
  props: {
    info: Array // 接受的是  sysRoleList: [,…]
    //              0: {id: "3", name: "系统管理员", icon: null, note: "", info: {}, inputName: null, gmtCreate: "1514353933788",…}
  },
  data () {
    return {
      checkList: [],
      groupList: [],
      loading: false
    }
  },
  computed: {
    infoById: function () {
      let tmp = {}
      if (this.info) {
        for (const iterator of this.info) {
          tmp[iterator.id] = iterator
        }
      }
      return tmp
    },
    storeById: function () {
      let tmp = {}
      for (const iterator of this.groupList) {
        tmp[iterator.id] = iterator
      }
      return tmp
    }
  },
  watch: {
    info: function (newVal) {
      let tmp = []
      if (newVal) {
        for (const iterator of newVal) {
          tmp.push(iterator.id)
        }
      }
      this.checkList = [...tmp]
    },
    checkList: function (newVal) {
      if (!this.$isSame(Object.keys(this.infoById), newVal)) {
        let target = []
        let port = []
        for (const iterator of newVal) {
          target.push(this.storeById[iterator])
          port.push('sysRole/' + iterator)
        }
        this.$emit('returnData', target, port)
      }
    },
  },
  methods: {
    getList () {
      this.loading = true
      getGroupList()
        .then(res => { this.groupList = res })
        .finally(() => { this.loading = false })
    }
  },
  mounted () {
    this.getList()
  },
}
</script>