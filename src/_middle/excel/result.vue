<template>
  <public-alert-page
    :modal="false"
    :info="info"
    top="10vh"
    :title="$t('globalWarning.payAttention')"
    width="70%"
  >
    <p>{{$t('public.amountOfExcelData')}}: {{ returnData('excelDataRow') }}</p>
    <p>{{$t('public.successImport')}}: {{ returnData('success') }}</p>
    <p>{{$t('public.failedImport')}}: {{ returnData('dbInsertedBad') }}</p>
    <p>{{$t('OS.timeCost')}}: {{ returnData('useTimeMs') / 1000 }} {{$t('OS.seconds')}}</p>
    <br />

    <div style="display: flow-root;">
      <table-show :tableData="returnData('dbHadRow')" :colums="colums"></table-show>
    </div>
  </public-alert-page>
</template>

<script>
import tableShow from '@/public/tableAndPaging'

export default {
  components: {
    tableShow
  },
  name: 'tableAlertPage',
  props: {
    info: {
      default: null,
      type: Object
    }
  },
  data () {
    return {
      colums: [{
        title: 'public.databaseID',
        key: 'dbId'
      }, {
        title: 'tableSearch.name',
        key: 'name'
      }, {
        title: 'globalWarning.errorType',
        key: 'errorType'
      }, {
        title: 'globalWarning.msg',
        key: 'message'
      }]
    }
  },
  methods: {
    returnData (key) {
      if (!this._.isEmpty(this.info)) {
        return this.info[key]
      } else {
        return []
      }
    }
  }
}
</script>
