<template>
  <div>
    <el-tag :size="size" :type="color[status]" effect="dark">{{ target[status] }}</el-tag>
  </div>
</template>

<script>
export default {
  name: 'OrderShow',
  props: {
    status: String,
    size: String
  },
  data () {
    return {
      target: {
        'uncommitted': '待提交',
        'unreviewed': '待审核',
        'finish': '完成',
      },
      color: {
        'uncommitted': 'info',
        'unreviewed': '',
        'finish': 'success',
      }
    }
  },
}
</script>