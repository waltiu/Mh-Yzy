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
        </el-collapse-item>
      </el-collapse>
    </public-content>
  </div>
</template>

<script>
import enumType from '../public/enumerateType'
import publicContent from '../public/content'

export default {
  name: 'odf',
  components: {
    publicContent,
    enumType
  }
}
</script>
