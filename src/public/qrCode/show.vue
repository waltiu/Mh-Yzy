<template>
  <div class="showqrcode">
    <h4>{{$t('main.download')}}</h4>
    <Row type="flex">
      <img :src="$qrcode.getQrBase64(this.$store.state.settings.AppupdateUrl.value)"
           style="width:132px;height:132px">
    </Row>
  </div>
</template>
