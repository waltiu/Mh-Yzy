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

          <filter-by-dict
            :icon="$options.name"
            :dictName="'产权'"
            :dictName1="'tableSearch.property'"
            dictKey="equity"
            @returnData="(e) => {$set(info, 'equity', e)}"
          ></filter-by-dict>

          <filter-by-dict
            :icon="$options.name"
            :dictName="'电杆类型'"
            :dictName1="'tableSearch.poleType'"
            dictKey="wellType"
            @returnData="(e) => {$set(info, 'wellType', e)}"
          ></filter-by-dict>
        </el-collapse-item>
      </el-collapse>
    </public-content>
    <el-switch v-model="status"></el-switch>{{$t('infoMap.filter')}}
  </div>
</template>

<script>
import enumType from '../public/enumerateType'
import publicContent from '../public/content'
import filterByDict from '../public/filterByDict'

export default {
  name: 'pole',
  components: {
    publicContent,
    enumType,
    filterByDict
  },
  data () {
    return {
      status: false,
      info: {}
    }
  },
  watch: {
    status: function (newVal) {
      this.$store.commit('setInputSelect', {
        keys: 'pole',
        name: 'pole',
        val: {
          onlyPointWithOc: newVal
        }
      })
    },
    info: {
      handler: function (newVal) {
        this.$store.commit('updateDisplayListConfig', {
          name: this.$options.name,
          val: newVal
        })
      },
      deep: true
    }
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
