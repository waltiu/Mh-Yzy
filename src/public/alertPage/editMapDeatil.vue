<template>
  <div>
    <component
      :is="tmp.comp"
      :tableData="info"
      :editTf="true"
      :columns="$allConfig[type]"
      :type="type"
      @close="remove"
    ></component>
  </div>
</template>

<script>
export default {
  name: 'editComponent',
  props: {
    editShow: Boolean,
    infodATA: Object
  },
  data () {
    return {
      info: {},
      type: '',
      tmp: {},
      edit: false
    }
  },
  methods: {
    remove () {
      this.$store.commit('mapDetailEditChange', false)
      this.tmp = {}
      this.info = {}
      this.type = ''
    }
  },
  watch: {
    editShow: {
      handler: function (newVal) {
        this.edit = newVal
      },
    },

  },
  mounted () {
    this.$store.watch(state => state.mapDetailEdit, (newVal) => {
      if (newVal && newVal.type !== 'cran' && newVal.type !== 'machine' && newVal.type !== 'subdistricts') {
        this.info = this.$store.state.infoMapShow.alertInfo
        this.type = this.$store.state.infoMapShow.alertType
        if (this.$pathName[this.type]) {
          this.tmp.comp = require('@/manage/' + this.$pathName[this.type] + 'editAndAdd/index.vue').default
        }
      }


    })


  }
}
</script>

<style>
</style>