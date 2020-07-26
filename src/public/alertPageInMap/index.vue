<template>
  <div>
    <!-- 存在多个model情况 -->
    <div v-for="(item, key) of listObject" :key="item.name">
      <component
        :is="item.comp"
        :select-array-show="{...item.args}"
        :request="request"
        :editTf="true"
        :columns="$allConfig[item.urlType]"
        :type="item.urlType"
        @close="remove(key)"
        :info="{...item.args}"
      ></component>
    </div>
    <el-dialog :visible.sync="show" :width="'90vw'" :top="'10vh'" :modal="modal" @close="close">
      <content-info v-if="show" :request="request" :info="info"></content-info>
    </el-dialog>
  </div>
</template>

<script>
import { ResourceApiLayer } from '@/_command/curd';
import ContentInfo from '@/_view/cran/read/content'


export default {
  name: 'mapAlertPage',
  data () {
    return {
      listObject: {},
      info: {},
      type: '',
      modal: false,
      show: false
    }
  },
  components: {
    ContentInfo
  },
  methods: {
    remove (key) {
      delete this.listObject[key]
    },
    close () {
      this.listObject = {}
    }
  },
  computed: {
    request: function () {
      return new ResourceApiLayer('cran')
    },
    // editMapInfo: function () {
    //   return this.$store.state.mapEditInfo
    // }
  },
  // watch: {
  //   editMapInfo: {
  //     handler: function (newVal) {
  //       if (newVal) {
  //         this.$set(this.listObject, 0, newVal)
  //       }
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // },
  mounted () {
    this.$store.watch(state => state.infoMapShow.alertInfo, (newVal) => {
      // 打开dialog 并赋值
      let tmp = {}
      if (!this._.isEmpty(newVal)) {
        tmp.urlType = this.$store.state.infoMapShow.alertType
        tmp.args = { ...newVal }
        this.info = { ...newVal }
        this.type = tmp.urlType

        if (this.$pathName[tmp.urlType]) {
          tmp.comp = require('@/manage/' + this.$pathName[tmp.urlType] + 'alertPage/index.vue').default
          this.$set(this.listObject, 0, tmp)
          console.log(tmp.urlType)

        } else {
          tmp.comp = require('@/_view/' + 'cran/' + 'read/content.vue').default
          this.show = true
          this.listObject = {}
        }
      }
    })
  }
}
</script>
