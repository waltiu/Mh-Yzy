<template>
  <div>
    <public-alert-page-with-button :title="$t('opticalSplitter.editInformation')" :info="tableData" :width="'90%'" @ok="submit">
      <el-form v-loading="loading" ref="form" :model="form" label-width="90px" size="mini">
        <el-form-item :label="$t('tableSearch.name')">
          <el-input :placeholder="$t('tableSearch.name')" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item :label="$t('dynamic.faultCableName')">
          <middle-search-info
            v-if="!loading"
            :request="cableRequest"
            :defaultValue="cableInfo"
            @returnData="(info) => { form.troubleOpticalCableId = info.id }"
          ></middle-search-info>
        </el-form-item>
        <el-form-item :label="$t('cable.endPointDistance')">
          <el-input
            type="number"
            :disabled="!!form.fontDistance || !form.troubleOpticalCableId"
            v-model="form.footDistance"
            @change="computedLang"
          ></el-input>
        </el-form-item>

        <el-form-item :label="$t('cable.startPointDistance')">
          <el-input
            type="number"
            :disabled="!!form.footDistance || !form.troubleOpticalCableId"
            v-model="form.fontDistance"
            @change="computedLang"
          ></el-input>
        </el-form-item>

        <el-form-item :label="$t('cable.latitudeAndLongitude')">
          <public-form-select-point
            :coor="form"
            @returnData="({lng, lat}) => { form.lng = lng ; form.lat = lat }"
          ></public-form-select-point>
        </el-form-item>

        <el-form-item :label="$t('tableSearch.remarks')">
          <el-input v-model="form.note"></el-input>
        </el-form-item>
      </el-form>
    </public-alert-page-with-button>
  </div>
</template>

<script>
import { ResourceApiLayer } from '@/_command/curd';
import { http } from '@/_command/http';

export default {
  name: 'ErrorEditAndAdd',
  props: {
    tableData: Object
  },
  data () {
    return {
      loading: false,
      cableInfo: null,
      form: {
        "footDistance": "",
        "name": "",
        "fontDistance": "",
        "lng": "",
        "lat": "",
        "troubleOpticalCableId": "",
        "note": ""
      }
    }
  },
  watch: {
    tableData: {
      immediate: true,
      handler: function (newVal) {
        if (newVal.id) {
          this.loading = true
          this.fetchAllData(newVal)
            .then(res => this.form = { ...this.form, ...res })
            .then(() => this.form.troubleOpticalCableId ? this.fetchCableInfoData() : this.cableInfo = {})
            .finally(() => this.loading = false)
        } else {
          this.form = {
            "footDistance": "",
            "name": "",
            "fontDistance": "",
            "lng": "",
            "lat": "",
            "troubleOpticalCableId": "",
            "note": ""
          }
          this.cableInfo = null
        }
      }
    }
  },
  computed: {
    cableRequest: function () {
      return new ResourceApiLayer('cable')
    }
  },
  methods: {
    fetchAllData (val) {
      return new ResourceApiLayer('error')
        .readOneTable({ info: val })
        .then(res => res.data)
    },
    computedLang () {
      this.$message(this.$i18n.t('alert.calculating'))
      http.get('/api/ldsysTroubles/search/troubleXY', {
        params: {
          fontDistance: this.form.fontDistance,
          footDistance: this.form.footDistance,
          opticalCableId: this.form.troubleOpticalCableId
        }
      })
        .then(res => res.data)
        .then(res => { this.form.lng = res.lng, this.form.lat = res.lat })
        .then(() => this.$message.success(`${this.$i18n.t('alert.calculated')}: ${this.form.lat}, ${this.form.lng}`))
        .catch(this.$message)
    },
    fetchCableInfoData () {
      this.cableRequest
        .readOneTable({ info: this.form })
        .then(res => res.data)
        .then(res => this.cableInfo = res)
        .catch(() => this.cableInfo = {})
    },
    submit () {
      if (this.tableData.id) {
        new ResourceApiLayer('error')
          .update({ info: this.form })
          .then(() => this.$notify.success({ message: `${this.form.name}`, title: '更新成功' }))
          .then(() => this.$emit('updated'))
      } else {
        new ResourceApiLayer('error')
          .create({ info: this.form })
          .then(() => this.$notify.success({ message: `${this.form.name}`, title: '创建成功' }))
          .then(() => this.$emit('updated'))
      }
    }
  }
}
</script>
