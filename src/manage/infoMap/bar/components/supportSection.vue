<template>
  <div>
    <public-content :name="$options.name">
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <img src="/icons/filtrate.png" width="20px" height="20px">
            {{$t('infoMap.high-levelScreening')}}
          </template>
      <enum-type :name="$options.name" :enumerateArray="$allConfig[$options.name]"></enum-type>

      <filter-by-dict :line="true" :dictName="'产权'" :dictName1="'tableSearch.property'" dictKey="equity"  @returnData="(e) => {$set(info, 'equity', e)}"></filter-by-dict>
        </el-collapse-item>
      </el-collapse>
    </public-content>

  </div>
</template>

<script>
import enumType from '../public/enumerateType'
import publicContent from '../public/content'
import filterByDict from '../public/filterByDict'

export default {
  name: 'supportSection',
  components: {
    publicContent,
    enumType,
    filterByDict
  },
  data () {
    return {
      info: {}
    }
  },
  watch: {
    info: {
      handler: function (newVal) {


        this.$store.commit('updateDisplayListConfig', {
          name: this.$options.name,
          val: newVal
        })
      },
      deep: true
    }
  }
}
</script>
