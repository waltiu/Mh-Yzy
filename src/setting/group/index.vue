<template>
  <div>
    <!-- 新建按钮 -->
    <div>
      <div>
        <CreateInfo @reload="reload"></CreateInfo>
      </div>
    </div>
    <public-table-view :load="instanceInterface" :columns="colunm"></public-table-view>
  </div>
</template>

<script>
import table from './table.js'
import { http } from '@/_command/http'
import { checkOutData } from '@/_command/tools'
import ModifyPermissions from './operating/modifypermissions'
import ModifyInfo from './operating/modifyinfo'
import DeleteInfo from './operating/deleteinfo'
import CreateInfo from './operating/create'


export default {
  name: 'GroupManage',
  components: {
    CreateInfo
  },
  computed: {
    colunm () {
      return [...table, this.operating]
    },
    instanceInterface: {
      get: function () {
        return this.instance || this.loadData()
      },
      set: function (newVal) {
        this.instance = newVal
      }
    }
  },
  data () {
    return {
      instance: null,
      operating: {
        title: this.$i18n.t('tableSearch.operation'),
        tableDisplay: true,
        editDisplay: true,
        key: 'operating',

        render: (h, params) => {
          return h('div', {
            style: 'display: flex'
          },
            [
              h(ModifyPermissions, {
                props: {
                  info: params.row
                },
                on: {
                  reload: this.reload
                }
              }),
              h(ModifyInfo, {
                props: {
                  info: params.row
                },
                on: {
                  reload: this.reload
                }
              }),
              h(DeleteInfo, {
                props: {
                  info: params.row
                },
                on: {
                  reload: this.reload
                }
              })
            ])
        }
      },
    }
  },
  methods: {
    reload () {
      this.instanceInterface = this.loadData()
    },
    loadData () {
      return http
        .get('/api/sysRoles')
        .then(checkOutData)
    }
  },
}
</script>
