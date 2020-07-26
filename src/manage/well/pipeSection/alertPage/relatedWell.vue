<template>
  <div style="display: flex; justify-content:space-between; margin-left: 50px; margin-right: 50px;">
    <div @click="show(0)">
      <div style="text-align:center;">
        <public-svg-icons
          :svgType="list[(infos[0] ? infos[0].type : '1')]"
          :color="$itemColor[list[(infos[0] ? infos[0].type : '1')]].color"
          width="60px"
          height="60px"
        ></public-svg-icons>
        {{ infos[0] ? infos[0].name : $t('main.empty') }}
      </div>
    </div>

    <div>
      <div style="text-align:center;">
        <div style="border: 2px solid black; height:1px; width: 40vw; margin-top: 20px;"></div>
        {{ tableData.name }}
      </div>
    </div>

    <div @click="show(1)">
      <div style="text-align:center;">
        <public-svg-icons
          :svgType="list[(infos[1] ? infos[1].type : '1')]"
          :color="$itemColor[list[(infos[1] ? infos[1].type : '1')]].color"
          width="60px"
          height="60px"
        ></public-svg-icons>
        {{ infos[1] ? infos[1].name : $t('main.empty') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'relatedWell',
  props: {
    tableData: Object
  },
  data () {
    return {
      list: {
        1: 'well',
        2: 'pole',
        3: 'cited',
        5: 'deviceRoom',
        6: 'station',
        7: 'switchY',
        8: 'odf',
        9: 'support'
      }
    }
  },
  computed: {
    infos: function () {
      return this.tableData.ldsysPoints || []
    }
  },
  methods: {
    show (info) {
      if (this.tableData.ldsysPoints && this.tableData.ldsysPoints[info]) {
        this.$store.commit('setMapStatus', {
          key: 'alertInfo',
          status: { ...this.tableData.ldsysPoints[info] }
        })

        this.$store.commit('setMapStatus', {
          key: 'alertType',
          status: this.list[this.tableData.ldsysPoints[info].type]
        })
      }
    }
  }
}
</script>
