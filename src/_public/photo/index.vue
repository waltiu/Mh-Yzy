<template>
  <div style="width: 100%;overflow-x: auto;">
    <div class="leftBorder-font">
      <div class="leftBorder-custom"></div>
      <b>{{$t("alert.images")}}:</b>
    </div>

    <viewer style="margin-top: 10px;" :images="images" v-if="!_.isEmpty(images)">
      <el-carousel :interval="4000" arrow="always" type="card">
        <el-carousel-item v-for="(src, index) in images" :key="index">
          <center>
            <img :src="src" />
          </center>
          <!-- <h3 class="medium">{{ item }}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </viewer>
    <div v-else style="height: 200px; margin-left: 10px;">
      <center style="margin-top: 20px;">暂无图片</center>
    </div>
  </div>
</template>

<script>
import { photoUrl } from '../../command/globalConfig';

export default {
  name: 'photoViewer',
  props: {
    info: Array
  },
  data () {
    return {
      mini: []
    }
  },
  computed: {
    images: function () {
      return this.info.map((item) => photoUrl + item.hash)
    }
  }
}
</script>
