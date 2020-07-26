<template>
  <div>
    <public-content :name="$options.name" @status-change="change">
      <enum-type :name="$options.name" :enumerateArray="$allConfig[$options.name]"></enum-type>
    </public-content>
    <el-switch v-model="status"></el-switch>{{$t('infoMap.filter')}}
  </div>
</template>

<script>
import enumType from '../public/enumerateType'
import publicContent from '../public/content'

export default {
  name: 'station',
  components: {
    publicContent,
    enumType
  },
  data () {
    return {
      status: false,
    }
  },
  watch: {
    status: function (newVal) {
      this.$store.commit('setInputSelect', {
        keys: 'station',
        name: 'station',
        val: {
          onlyPointWithOc: newVal
        }
      })
    },
  },
  methods: {
    change (status) {
      if (!status) {
        this.status = status
      }
    }
  }
}
</script>
