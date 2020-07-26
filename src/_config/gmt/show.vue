<template>
  <div>
    <el-collapse>
          <el-collapse-item name="1" style="margin-left:-10px">
            <template slot="title">
              <i style="font-size: 18px; color: #409EFF; margin-right: 7px;" class="el-icon-edit"></i>
              创建信息
            </template>
            <div v-if="value" style="width:50vw">
                创建时间：{{unixms2date(value.gmtCreate)}}
                <hr style="margin: 5px" />
                创建人：{{value.gmtCreator}}
                <hr style="margin: 5px" />
                修改时间：{{unixms2date(value.gmtModified)}}
                <hr style="margin: 5px" />
                修改人：{{value.gmtModifier}}
                <hr style="margin: 5px" />
            </div>
          </el-collapse-item>
        </el-collapse>
  </div>
</template>

<script>
import { unixms2date } from '@/_command/tools'

export default {
  name: 'GmtShow',
  props: {
    value: Object,
  },
  methods:{
    unixms2date
  },
}
</script>