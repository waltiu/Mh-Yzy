<template>
  <div>
    <!-- <p>
      <span>名称:</span>
      {{fullData.name}}
    </p> -->
    <div class="total" style="display: flex;justify-content: flex-end;">
      <!-- <p>
        <span>标称容量:</span>
        {{'暂无数据'||fullData.name}}
      </p>
      <p>
        <span>已使用:</span>
        {{'暂无数据'||fullData.name}}
      </p>
      <p>
        <span>空闲:</span>
        {{'暂无数据'||fullData.name}}
      </p> -->
      <!-- <p>
        <span>损坏:</span>
        {{'0'||fullData.name}}
      </p>-->
      <div>
        <div class="color" style="display: flex;">
          <p style="border-left:20px solid #717171">&nbsp;&nbsp;未使用</p>
          <p style="border-left:20px solid #e60e13">&nbsp;&nbsp;占用</p>
          <p style="border-left:20px solid #24ab39">&nbsp;&nbsp;空闲</p>
          <!-- <p style="border-left:20px solid #f39700">&nbsp;&nbsp;损坏</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',

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
.total {
  margin-top: 6px;
}
.color {
  /* margin-left: 1000px; */
  margin-right: 50px
}
.color p {
  margin-left: 15px;
}
</style>