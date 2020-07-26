<template>
  <div>
    <el-tag :size="size" :type="type" effect="dark">{{ text }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'ErrorShow',
  props: {
    text: String,
    size: String,
    type: String,
  },
  // data () {
  //   return {
  //     target: {
  //       'uncommitted': '待提交',
  //       'unreviewed': '待审核',
  //       'finish': '完成',
  //     },
  //     color: {
  //       'uncommitted': 'info',
  //       'unreviewed': '',
  //       'finish': 'success',
  //     }
  //   }
  // },
}
</script>