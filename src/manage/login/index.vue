<template>
  <div style="width: 100vw; position: relative;">
    <div :style="rowStyle"></div>
    <div class="tittle" style="padding-top:10px">
      <h1
        align="center"
        style="display: flex;justify-content:center; align-items:Center;white-space: nowrap;margin-top:25px;margin-bottom:5px"
      >{{this.$i18n.t('main.platform')}}</h1>
      <h6 align="center">{{this.$i18n.t('main.showH6')}}</h6>
    </div>
    <el-button @click="changeLanguage" style="float:right;margin-right:20px;margin-top:10px">
      <p>{{$t("main.language")}}</p>
    </el-button>
    <div class="background">
      <div style="display: flex; flex-direction: row-reverse;">
        <el-card class="login" style="z-index: 100">
          <div slot="header" class="clearfix">
            <span>{{$t('main.enterNameAndPsd')}}</span>
          </div>

          <el-form ref="loginForm" size="small">
            <el-form-item prop="userName">
              <el-input v-model="form.loginName" :placeholder="$t('main.enterUserName')">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" :placeholder="$t('main.enterPsd')">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="submit" type="primary" style="width: 100%">{{$t('main.login')}}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { setup } from '@/language'
import LangStorage from '../../language/lang'

export default {
  data () {
    return {
      form: {
        loginName: '',
        password: ''
      },
      rowStyle: {
        backgroundImage: `url('/dt.jpg')`,
        height: '70vh',
        width: '100vw',
        position: 'absolute',
        // zIndex: -1,
        backgroundSize: 'cover',
        top: '15%',
        padding: 0
      }
    }
  },
  methods: {
    changeLanguage () {
      if (this.$i18n.locale === 'en') {
        setup('zh')
        this.$moment.locale('zh-cn')
      } else {
        setup('en')
        this.$moment.locale('en-gb')
      }
      LangStorage.setLang(this.$i18n.locale)
    },
    submit () {
      // 默认MD5加密
      let tmp = { ...this.form, password: md5(this.form.password + '3r@3T^Yesd921dqpZ'), EnableEncrypt: true }
      this.$http.get('/login/api/login', {
        params: tmp
      }).then((res) => {
        if (res.status === 200) {
          this.$notify.success({
            title: this.$i18n.t('main.loginSuccess')
          })

          if (res.headers['x-auth-token']) {
            this.$store.commit('setUserInfos', res.data)
            this.$store.commit('setToken', res.headers['x-auth-token'])
          }

          setTimeout(() => {
            this.$router.push('/infoMap')
            if (this.$checkWeekPasswd(this.form.password)) {
              this.$notify({
                title: this.$i18n.t('public.warning'),
                message: this.$i18n.t('public.changePsd'),
                duration: 0,
                type: 'warning'
              })
            }
          }, 1000)
          this.$store.state.excelExport.data = res.data.sysAuthList.map((x) => x.code)
        } else {
          this.$alert(this.$i18n.t('public.loginFailed'), this.$i18n.t('public.loginMessage'), {
            confirmButtonText: this.$i18n.t('dynamic.determine'),
            type: 'error',
            center: true
          })
        }
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.$Spin.hide()
    }, 1000)
  }
}
</script>

<style>
.tittle {
  width: 230px;
  height: 100px;

  position: absolute;
  top: -81vh;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  font-size: 16px;
  margin: auto;
}
.background {
  /*background: url();*/
  padding: 20px;
  height: 100vh;
  /*background-color: #2baee9;*/
  /*position: absolute;*/
}
.login {
  margin-top: 30vh;
  width: 400px;
  margin-right: 200px;
}
#particles-js {
  position: absolute;
  background: #2d8cf0;
  left: 0;
  right: 0;
  top: -80px;
  bottom: 0;
  z-index: -1;
}
</style>
