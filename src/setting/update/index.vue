<template>
  <div>
    <div style="margin: 50px 50px;">
      <h1>{{$t('manage.webVersion')}}</h1>

      <div style="margin: 20px;">
        <p>
          <b>{{$t('manage.GitVersion')}}:</b>
          {{ $version.buildGit }}
        </p>
        <p>
          <b>当前Git分支:</b>
          {{ $version.currentBranch }}
        </p>
        <p>
          <b>{{$t('manage.createData')}}:</b>
          {{ $version.buildData }}
        </p>
        <p>
          <b>{{$t('manage.createType')}}:</b>
          {{ $version.buildType }}
        </p>
      </div>
    </div>
    <div style="margin: 50px 50px;">
      <h1>{{$t('manage.AppUpdate')}}</h1>

      <div style="margin: 20px;">
        <p>
          <b>{{$t('manage.AppVersion')}}:</b>
          {{ $store.state.settings.AppVersion.value }}
        </p>
        <p>
          <b>{{$t('manage.AppDownLoad')}}:</b>
          <a :href="$store.state.settings.AppupdateUrl.value">{{$t('manage.clickToDownload')}}</a>
        </p>
        <p>
          <b>{{$t('manage.QRcodeDownload')}}:</b>
        </p>
        <p style="color:red">微信无法识别，请使用其他扫码工具！</p>
        <img
          style="margin-top: 10px;margin-left: -10px;width: 180px;height: 180px"
          :src="$qrcode.getQrBase64($store.state.settings.AppupdateUrl.value,'请用浏览器打开')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'showVersion'
}
</script>
