<template>
  <div>
    <public-alert-page-with-button :info="changeInfo" :modal="false" :title="$t('opticalSplitter.editInformation')" @ok="submit">
      <div class="select">
        <el-select v-model="selectType" :placeholder="$t('opticalSplitter.select')" size="medium">
          <el-option
            v-for="([key, val], index) in renderTypeList"
            :key="index"
            :label="$t(val.name)"
            :value="mappingListById[val.alert]"
          ></el-option>
        </el-select>

        <auto-complete-info
          @returnData="(info) => {selectChangeInfo = info}"
          size="medium"
          :values="selectChangeInfo"
          :disabled="!selectType"
          :placeholder="`请输入`"
          :url="computedUrlAndArgs.url"
          :preData="computedUrlAndArgs.args"
        ></auto-complete-info>
      </div>
    </public-alert-page-with-button>
  </div>
</template>

<script>
import { mappingList } from './list'
import { autoCompentedUrl } from '@/_config/urls'

export default {
  name: 'ChangeWell',
  props: {
    allowTypes: Array,
    changeInfo: Object
  },
  data () {
    return {
      selectType: null,
      selectChangeInfo: {}
    }
  },
  watch: {
    changeInfo: function (newVal) {
      this.selectChangeInfo = newVal
      this.selectType = newVal.type ? String(newVal.type) : null
    }
  },
  computed: {
    mappingListById: function () {
      let tmp = Object.entries(mappingList)
        .map(item => item.reverse())
      return Object.fromEntries(tmp)
    },
    renderTypeList: function () {
      return Object.entries(this.$store.getters.vendorNameByName)
        .filter(([, val]) => Object.values(mappingList).includes(val.alert))
        .filter(([, val]) => this.allowTypes.includes(val.alert))
    },
    computedUrlAndArgs: function () {
      if (!this.selectType) return {}
      return autoCompentedUrl[mappingList[this.selectType]]
    }
  },
  methods: {
    submit () {
      this.$emit('returnData', this.selectChangeInfo)
    }
  }
}
</script>

<style scoped>
.select {
  display: flex;
}
</style>
