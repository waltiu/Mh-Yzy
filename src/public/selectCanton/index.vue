<template>
  <div>
    <!-- 归属关系 省 (province) => 市(city) => 县/区(country) -->
    <el-select size="small" v-model="provinceVal" :placeholder="$t('infoMap.province')">
      <el-option
        v-for="(item, index) in list.province"
        :key="index"
        :label="item.n"
        :value="item.n"
      ></el-option>
    </el-select>

    <el-select size="small" v-model="cityVal" :placeholder="$t('infoMap.city')">
      <el-option v-for="(item, index) in list.city" :key="index" :label="item.n" :value="item.n"></el-option>
    </el-select>

    <el-select size="small" v-model="countryVal" :placeholder="$t('infoMap.area')">
      <el-option v-for="(item, index) in list.country" :key="index" :label="item.n" :value="item.n"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'selectCanton',
  props: {
    city: String,
    country: String,
    province: String
  },
  data () {
    return {
      list: {
        city: [],
        country: [],
        province: []
      }
    }
  },
  computed: {
    cityVal: {
      set: function (newVal) {
        this.$emit('update:city', newVal)
        // 初始化 country LIST
        this.initCountry(newVal)
        // 置空
        this.$emit('update:country', '')
      },
      get: function () {
        return this.city
      }
    },
    countryVal: {
      set: function (newVal) {
        this.$emit('update:country', newVal)
      },
      get: function () {
        return this.country
      }
    },
    provinceVal: {
      set: function (newVal) {
        this.$emit('update:province', newVal)
        // 初始化 city LIST
        this.initCity(newVal)
        // 置空
        this.$emit('update:city', '')
        this.$emit('update:country', '')
      },
      get: function () {
        return this.province
      }
    }
  },
  methods: {
    initProvince () {
      this.list.province = this.$store.getters.getCityList
    },
    initCity (val = this.province) {
      // 生成 city LIST
      let city = this.list.province.find(item => item.n === val)
      city = (city && city.cities) ? city.cities : []
      this.list = { ...this.list, city }
    },
    initCountry (val = this.city) {
      // 生成 country LIST
      let country = this.list.city.find(item => item.n === val)
      country = (country && country.e) ? country.e : []
      this.list = { ...this.list, country }
    }
  },
  watch: {
    province: {
      immediate: true,
      handler: function () {
        this.initProvince()
        this.initCity()
      }
    },
    city: {
      immediate: true,
      handler: function () {
        this.initCountry()
      }
    }
  }
}
</script>
