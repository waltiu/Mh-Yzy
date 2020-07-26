<template>
  <div>
    <zz-info-map v-if="!debug"></zz-info-map>

    <next-info-map-lib v-if="debug"></next-info-map-lib>
  </div>
</template>


<script>
import ZzInfoMap from '@/manage/infoMap'
import NextInfoMapLib from './next';

export default {
  name: 'BlackDoor',
  data () {
    return {
      key: []
    }
  },
  components: {
    ZzInfoMap,
    NextInfoMapLib
  },
  computed: {
    debug: function () {
      return this.key.join('') === 'debug'
    }
  },
  mounted () {
    document.addEventListener('keydown', () => {
      const keyName = event.key
      this.key.push(keyName)
    })
  }
}
</script>