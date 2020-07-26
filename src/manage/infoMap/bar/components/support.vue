<template>
  <div>
    <public-content :name="$options.name" @status-change="change">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <img src="/icons/filtrate.png" width="20px" height="20px" />
            {{$t('infoMap.high-levelScreening')}}
          </template>
          <enum-type :name="$options.name" :enumerateArray="$allConfig[$options.name]"></enum-type>
        </el-collapse-item>
      </el-collapse>
    </public-content>
    <el-switch v-model="status"></el-switch>{{$t('infoMap.filter')}}
  </div>
</template>

<script>
import enumType from '../public/enumerateType'
import publicContent from '../public/content'

export default {
  name: 'support',
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
        keys: 'support',
        name: 'support',
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
