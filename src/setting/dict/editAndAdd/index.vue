<template>
  <div>
    <dialog-page :title="$t('main.reviseInformation')" :info="selectArrayShow" width="500px" @ok="submit">
      <edit-add-info
        @returnData="(item) => {fullDataBase = item}"
        :columns="columns"
        :tableData="selectArrayShow"
      ></edit-add-info>
    </dialog-page>
  </div>
</template>

<script>
export default {
  name: 'dictEditAndAdd',
  props: {
    columns: Array,
    selectArrayShow: Object
  },
  data () {
    return {
      fullDataBase: {}
    }
  },
  computed: {
    fullData: function () {
      if (this.selectArrayShow.add === 0) {
        return {}
      } else {
        return this.selectArrayShow
      }
    }
  },
  methods: {
    submit () {
      this.$http({
        method: this.selectArrayShow.add === 0 ? 'post' : 'patch',
        url: this.selectArrayShow.add === 0 ? '/api/ldsysDictionaries' : '/api/ldsysDictionaries/' + this.fullDataBase.id,
        data: this.fullDataBase
      })
        .then(res => {
          this.$checkStatus(res)
          this.$emit('reload')
        })
    }
  },
}
</script>
