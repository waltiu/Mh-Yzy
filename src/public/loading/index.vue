<template>
  <div>
    <loading-components
      style="z-index: 10000"
      :opacity="1"
      color="white"
      background-color="#409EFF"
      :active="loadingStatus"
      :can-cancel="false"
      :is-full-page="fullPage"
    >
      <slot>
        <p style="font-size: 20px;margin-top: 20px;color: white;" slot="after">{{$t('public.loading')}}....</p>
      </slot>
    </loading-components>
  </div>
</template>

<script>
import loadingComponents from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'loadingStatus',
  components: {
    loadingComponents
  },
  props: {
    loading: Boolean,
    fullPage: Boolean
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loadingStatus = false
      }, 3000)
    })
  },
  watch: {
    loading: function (newVal) {
      this.loadingStatus = newVal
    }
  },
  data () {
    return {
      loadingStatus: true
    }
  }
}
</script>
