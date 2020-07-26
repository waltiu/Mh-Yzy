<template>
  <div>
    <el-tabs :tab-position="'left'" v-model="activeName">
      <el-button size="mini" type="primary" icon="el-icon-circle-plus" @click="add">{{$t('main.increase')}}</el-button>
      <el-tab-pane
        v-for="(item, index) in $store.getters.getObjByType"
        :key="index"
        :label="index"
        :name="index"
      >
        <table-and-paging :tableData="item" :colums="columns()"></table-and-paging>
      </el-tab-pane>
    </el-tabs>
    <edit-info @reload="reload" :columns="columns()" :selectArrayShow="selectArrayShow"></edit-info>
  </div>
</template>

<script>
import editInfo from './editAndAdd/index.vue'

export default {
  name: 'dictMange',
  components: {
    editInfo
  },
  methods: {
    add () {
      let info = {
        ...this.$store.getters.getObjByType[this.activeName][0],
        name: '',
        id: '',
        code: this.$store.getters.getObjByType[this.activeName][0].code.split('.')[0] + '.',
        add: 0
      }
      this.selectArrayShow = info
    },
    reload () {
      this.$http.get('/api/ldsysDictionaries', {
        params: {
          size: 9999999,
          page: 0
        }
      }).then((res) => {
        this.$store.commit('setRowDictionaries', res.data._embedded.ldsysDictionaries)
      })
    },
    columns () {
      return [
        {
          title: 'subdistricts.name',
          editDisplay: true,
          key: 'name'
        },
        {
          title: 'dictMangeLib.codeName',
          editDisplay: true,
          disable: this.selectArrayShow.add === 0 ? false : true,
          key: 'code'
        },
        {
          title: 'subdistricts.note',
          editDisplay: true,
          inputType: 'textarea',
          key: 'note'
        },
        {
          title: 'subdistricts.operating',
          key: 'options',
          editDisplay: false,
          render: (h, params) => {
            return h('el-button', {
              props: {
                size: 'mini',
                type: 'primary'
              },
              on: {
                click: () => {
                  this.selectArrayShow = { ...params.row }
                }
              }
            }, this.$i18n.t('main.reviseInformation'))
          },
        }
      ]
    }
  },
  data () {
    return {
      selectArrayShow: {},
      activeName: '光路类型',
    }
  }
}
</script>
