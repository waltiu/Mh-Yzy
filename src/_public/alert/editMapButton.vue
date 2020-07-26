<template>
  <div class="com">
    <component
      :is="tmp"
      :info="info"
      :editMap="false"
      :type="type"
      :request="request"
      :editTf="editTf"
      @close="remove"
    ></component>
  </div>
</template>

<script>
export default {
  name: 'editComponent',
  props: {
    type: String,
    request: Object
  },
  data () {
    return {
      tmp: {},
      edit: false,
      editTf: true,
      info: {}
    }
  },
  methods: {
    remove () {
      this.$store.commit('mapDetailEditChange', false)
      this.tmp = {}
      this.info = {}
      this.type = ''
      this.$emit('close')
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
      if (newVal) {
        this.tmp = require('@/_view/' + newVal.type + '/' + 'edit/index.vue').default
        this.info = newVal.info
      }


    })


  }
}
</script>

<style>
.com {
  position: absolute;
}
</style>