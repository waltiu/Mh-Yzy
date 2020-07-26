<template>
  <div>

    <div style="display: flex;">
      <img class="userlogo" src="/icons/user/user.png" alt="" srcset="">
      <div style="margin-top: 18px">
        {{ info.name }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'userLogo',
  props: {
    info: Object
  }
}
</script>

<style lang="scss" scoped>
.userlogo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 18px;
  margin-right: 15px;
}
</style>
