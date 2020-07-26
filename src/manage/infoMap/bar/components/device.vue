<template>
  <div>
    <public-content :name="$options.name">
      <enum-type :name="$options.name" :enumerateArray="$allConfig[$options.name]"></enum-type>
    </public-content>

  </div>
</template>

<script>
import enumType from '../public/enumerateType'
import publicContent from '../public/content'

export default {
  name: 'device',
  components: {
    publicContent,
    enumType
  }
}
</script>
