<template>
  <div>
    <el-card
      class="box-card"
      style="padding: 0px 8px 10px 0px; margin-top: 10px;margin-left: 15px;"
    >
      <el-form size="small" label-width="80px" :inline="true">
        <el-select
          clearable
          size="small"
          v-model="province"
          class="city_select"
          value-key="n"
          :placeholder="$t('infoMap.province')"
        >
          <el-option
            v-for="(item, index) in provinceList"
            :key="index"
            :label="item.n"
            :value="JSON.stringify(item)"
          ></el-option>
        </el-select>

        <el-select
          clearable
          size="small"
          v-model="city"
          class="city_select"
          :placeholder="$t('infoMap.city')"
        >
          <el-option
            v-for="(item, index) in JSON.parse(province || '{}').cities || []"
            :key="index"
            :label="item.n"
            :value="JSON.stringify(item)"
          ></el-option>
        </el-select>

        <el-select
          clearable
          size="small"
          v-model="county"
          class="city_select"
          :placeholder="$t('infoMap.area')"
        >
          <el-option
            v-for="(item, index) in JSON.parse(city || '{}').e || []"
            :key="index"
            :label="item.n"
            :value="JSON.stringify(item)"
          ></el-option>
        </el-select>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'selectCity',
  data () {
    return {
      province: '',
      city: '',
      county: ''
    }
  },
  watch: {
    province: function (newVal) {
      this.setMapCenter(newVal)
      this.city = ''
    },
    city: function (newVal) {
      this.setMapCenter(newVal)
      this.county = ''
    },
    county: function (newVal) {
      this.setMapCenter(newVal)
    }
  },
  methods: {
    setMapCenter (newVal) {
      if (!newVal) return
      let info = JSON.parse(newVal)
      this.$setMapCenter({
        ...info,
        lat: info.latitude,
        lng: info.longitude
      })
    },  },
  computed: {
    provinceList: function () {
      if (this.$store.state.settings && this.$store.state.settings.city) {
        return this.$store.state.settings.city.valueJson.provinces
      }

      return {}
    }
  },

}

</script>

<style scoped>
.city_select {
  width: 32%;
}
</style>
