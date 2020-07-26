<template>
  <div>
    <next style="width: 30vw;" :column="tableColumn" :fullData="fullData"></next>
  </div>
</template>

<script>
import next from './next'
export default {
  name:'formNext',
  props:{
    tableColumn:Array,
    fullData:Object
  },
  components:{
    next
  }

}
</script>

<style>

</style>