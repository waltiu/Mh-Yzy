<template>
  <div>
    <Header :fullData="fullData"></Header>
    <odf-read-table :fullData="fullData"></odf-read-table>
  </div>
</template>

<script>
import Header from './header'
import odfReadTable from './table'
export default {
  name: 'baseData',
  components: {
    Header,
    odfReadTable
  },
  props: {
    fullData: Object
  },
  watch: {
    fullData: function (newVAL) {
      return newVAL
    }
  }

}
</script>

<style>
</style>