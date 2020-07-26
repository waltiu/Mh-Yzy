<template>
  <div>
    <loading-components></loading-components>
    <div
      class="unselectable layout-menu-left unscrollbar"
      :style="{'width': this.isCollapse ? 'auto' : '200px', 'overflow-y': 'auto', 'overflow-x': 'hidden'}"
    >
      <div style="text-align: center;">
        <img
          src="/linshi.png"
          @click="() => {isCollapse = !isCollapse}"
          style="margin-top: 10px;"
          width="50"
          height="50"
        />
        <!--@click="() => {isCollapse = !isCollapse}"-->
        >
      </div>

      <el-menu
        :collapse-transition="false"
        :collapse="isCollapse"
        :unique-opened="true"
        :default-active="$route.fullPath"
        background-color="#464c5b"
        text-color="#fff"
        active-text-color="#2d8cf0"
      >
        <div v-for="(a,b) in column" :key="b">
          <el-submenu v-if="computedListNum(a.children)" :index="String(b)">
            <template slot="title">
              <i :class="a.icon"></i>
              <span slot="title">{{ $t(a.name) }}</span>
            </template>

            <el-menu-item-group style="overflow-y: auto;overflow-x: hidden;">
              <div v-for="(c,d) in a.children" :key="d">
                <router-link :to="c.path">
                  <!-- v-if="$store.getters.getUserRole.includes(c.code) || !c.code" -->
                  <!--  -->
                  <el-menu-item :index="c.path">{{ $t(c.name) }}</el-menu-item>
                </router-link>
              </div>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </div>

    <div style="diaplay: flex;width: auto;line-height:auto">
      <div class="layout-header">
        <div style="float: right; margin-right: 13px;">
          <el-popover placement="top-start" trigger="hover">
            <user-logo slot="reference" :info="$store.state.userInfos"></user-logo>

            <center>
              <span>
                <b style="font-size: 10px;">{{ $store.state.userInfos.name }}</b>
              </span>
              <div style="margin-top: 5px;">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="() => {editInfo = $store.state.userInfos}"
                >{{$t("main.changePassword")}}</el-button>
              </div>

              <div>
                <el-button icon="el-icon-back" @click="exit" type="text">{{$t('main.exit')}}</el-button>
              </div>
              <div class="border_download" style="width: 132px;height: 132px">
                <h4>{{$t('main.download')}}</h4>
                <img
                  :src="$qrcode.getQrBase64(this.$store.state.settings.AppupdateUrl ? this.$store.state.settings.AppupdateUrl.value : '')"
                />
              </div>
            </center>
          </el-popover>
        </div>
        <el-button @click="changeLanguage" style="float:right;margin-right:20px;margin-top:10px">
          <p>{{$t("main.language")}}</p>
        </el-button>
      </div>
      <div class="layout-content unscrollbar">
        <div class="layout-content-main" v-if="loginStatus">
          <transition name="route-animation">
            <router-view></router-view>
          </transition>
          <div style="height: 200px; width: 100px;" v-if="$route.fullPath !== '/infoMap'"></div>
        </div>
      </div>
    </div>

    <edit-password :userInfo.sync="editInfo"></edit-password>
    <alert-page-in-map></alert-page-in-map>
  </div>
</template>

<script>
// 全局AlertPage
import alertPageInMap from '@/public/alertPageInMap'
import editPassword from '@/public/changeUserProfile/changePassword'
import { setup } from '@/language'
import userLogo from './logo'
import LangStorage from '../../language/lang'
import { initStore, recoverSession } from '@/_command/misc'
import { isLogin } from '@/_command/tools'

export default {
  data () {
    return {
      // loadingStatus: true,
      isCollapse: false,
      column: this.$routerColumn,
      editInfo: {}
    }
  },
  components: {
    editPassword, alertPageInMap, userLogo
  },
  computed: {
    loginStatus: function () {
      return isLogin()
    },
    menuWidth: function () {
      return { 'width': this.isCollapse ? 'auto' : '200px' }
    }
  },
  methods: {
    computedListNum (info) {
      if (info && info.length) {
        return info.filter(item => this.$store.getters.getUserRole.includes(item.code) || !item.code)
          .length
      } else {
        return 0
      }
    },
    exit () {
      this.$store.commit('setToken')
      this.$router.push('/')
    },
    changeLanguage () {
      if (this.$i18n.locale === 'en') {
        setup('zh')
        this.$moment.locale('zh-cn')
      } else {
        setup('en')
        this.$moment.locale('en-gb')
      }
      LangStorage.setLang(this.$i18n.locale)
    }
  },
  mounted () {
    if (this.loginStatus) {
      if (recoverSession()) {
        initStore()
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.el-menu {
  border-right: none;
}
.el-menu--horizontal {
  border-bottom: none;
}
.layout-content {
  position: relative;
  height: 89vh;
  margin: 15px;
  width: auto;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-right: 27px;
  padding-left: 27px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
}
.layout-menu-left {
  float: left;
  width: fit-content;
  background: #464c5b;
  height: 100vh;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.layout-logo-left {
  width: 20vh;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
/** Router 动画 **/
.route-animation {
  position: absolute;
  left: 0;
  right: 0;
}
.route-animation-enter-active {
  transition: all 0.6s ease;
}
.route-animation-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.route-animation-enter,
.route-animation-leave-to {
  left: 0;
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>
