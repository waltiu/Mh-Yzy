<template>
  <div id="app">
    <router-view />
    <global-warning></global-warning>
  </div>
</template>

<script>
// 全局 Dialog 警告
import globalWarning from '@/public/globalWarning'

export default {
  name: 'app',
  components: {
    globalWarning
  },
  mounted () {
    // 进度条操作
    this.$Loading.config({
      color: '#2d8cf0',
      failedColor: 'red',
      height: 5
    })
    if (window.sessionStorage.getItem('other')) {
      this.$store.commit('setUserInfos', JSON.parse(window.sessionStorage.getItem('other')))
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(blue, A200),
    // The primary color of your application
      accent: md-get-palette-color(red, A200) // The accent or secondary color
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>

<style>
::-webkit-scrollbar-track {
  border-radius: 6px;
}
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
  border-radius: 0px;
  background-color: #f1f1f1;
}
::-webkit-scrollbar:hover {
  background: #dce1e4;
}
::-webkit-scrollbar-thumb {
  background-color: #c1c8cc;
  border: solid 1px #b5bbbf;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #6c7073;
  border-color: #5f6366;
}
::-webkit-scrollbar-arrow {
  color: #f00;
  background: #0f0;
}
::-webkit-scrollbar-button {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 4px;
  border: 1px solid #b5bbbf;
  display: none;
}
::-webkit-scrollbar-button:hover {
  border-color: #5f6366;
}
::-webkit-scrollbar-button:vertical:start:increment,
::-webkit-scrollbar-button:vertical:end:decrement {
  display: none;
}
/* left Border 提示 */
.leftBorder-custom {
  width: 0px;
  height: 25px;
  margin-right: 10px;
  border: 1px solid #2d8cf0;
}
.leftBorder-font {
  margin-top: 10px;
  display: flex;
  font-size: 15px;
}
.ivu-tabs {
  overflow: visible !important;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
.ivu-spin-fix {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  width: 100%;
  height: 100%;
}
.ivu-spin-fix {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
  width: 100%;
  height: 100%;
}
.ivu-spin-fullscreen {
  z-index: 2010;
  background-color: rgba(45, 140, 240, 10) !important;
  color: white !important;
  vertical-align: middle;
  text-align: center;
}
.el-card__body {
  padding: 16px;
}
</style>
