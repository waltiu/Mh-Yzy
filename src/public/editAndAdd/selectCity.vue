<template>
  <div>
    <el-form size="small" label-width="80px" :inline="true">
      <el-select
        clearable
        size="small"
        v-model="belongProvince"
        class="city_select"
        value-key="n"
        :placeholder="$t('infoMap.province')"
        @change="change('province')"
      >
        <el-option v-for="(item, index) in provinceList" :key="index" :label="item" :value="index"></el-option>
      </el-select>

      <el-select
        clearable
        size="small"
        v-model="belongCity"
        class="city_select"
        :placeholder="$t('infoMap.city')"
        @change="change('city')"
      >
        <el-option v-for="(item, index) in  cityList" :key="index" :label="item" :value="(index)"></el-option>
      </el-select>

      <el-select
        clearable
        size="small"
        v-model=" belongCountry"
        class="city_select"
        :placeholder="$t('infoMap.area')"
      >
        <el-option
          v-for="(item, index) in countyList"
          :key="index"
          :label="item.name"
          :value="index"
        ></el-option>
      </el-select>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'selectCity',
  props: {
    info: Object,
    tableData: Object
  },
  data () {
    return {
      belongProvince: '',
      belongCity: '',
      belongCountry: '',
      json: {},
      provinceList: {},
      cityList: {},
      countyList: {},
      cityInfo: {}
    }
  },
  methods: {
    getCityInfo (val) {
      this.cityInfo = { ...this.cityInfo, ...val }
      this.$emit('getCityInfo', this.cityInfo)

    },
    change (info) {
      if (info === 'province') {
        this.belongCity = ''
      }
      this.belongCountry = ''
    }
  },
  watch: {
    tableData: {
      handler: function (newVal) {
        this.belongProvince = newVal.belongProvince
        this.belongCity = newVal.belongCity
        this.belongCountry = newVal.belongCountry
      },
      deep: true
    },
    info: {
      handler: function (newVal) {
        this.json = newVal.cityJson
        this.provinceList = this.json.p
      },
      immediate: true
    },
    belongProvince: {
      handler: function (newVal) {
        this.cityList = this.json.c[newVal]


        this.getCityInfo({ belongProvince: newVal })

      },
      deep: true
    },
    belongCity: {
      handler: function (newVal) {
        this.countyList = this.json.d[newVal]

        this.getCityInfo({ belongCity: newVal })
      },
      deep: true
    },
    belongCountry: {
      handler: function (newVal) {
        this.getCityInfo({ belongCountry: newVal })
      },
      deep: true
    }
  }
}
</script>

<style>
</style>