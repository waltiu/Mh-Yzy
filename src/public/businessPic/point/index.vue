<template>
  <center>
    <div @click="returnData" :style="{width: width}">
      <Icon type="ios-grid-view" :size="80"></Icon>
    </div>
    <p>
      {{$t('tableSearch.name')}}: {{ info.name }}
    </p>
    <hr>
    <p>
      OUT: {{ info.portOut || $t('main.empty') }}
    </p>
    <hr>
    <p>
      IN: {{ info.portIn || $t('main.empty')}}
    </p>
    <hr>
    <p>
      <!-- {{ info }} -->
    </p>
  </center>
</template>

<script>
export default {
  name: 'point',
  props: {
    info: Object
  },
  computed: {
    width: function () {
      let length = 0
      Object.entries(this.info).forEach(([, value]) => {
        if (String(value).length > length) {
          length = String(value).length
        }
      })
      return (length * 15) + 'px'
    }
  },
  methods: {
    returnData () {
    }
  }
}
</script>
