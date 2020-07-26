<template>
  <div>
    <div class="leftBorder-font">
      <div class="leftBorder-custom"></div>
      <p>{{$t('public.allPermissions')}}:</p>
    </div>

    <el-collapse v-model="activeName" accordion style="margin-top: 10px;">
      <el-collapse-item
        v-for="(item, index) in info.sysRoleList"
        :title="$t(item.name)"
        :name="index"
        :key="index"
      >
        <!-- {{ item.sysAuthList }} -->
        <div v-for="(a, b) in item.sysAuthList" :key="'z' + b" style="margin-top: 10px;">
          <el-card v-if="!a.code.includes('.')">
            <div slot="header" class="clearfix">
              <span>
                <b>{{ a.name }}</b>
                <small>{{$t('user.sidebar')}}</small>
              </span>
            </div>

            <div v-for="(c,d) in item.sysAuthList" :key="d" style="margin-top: 3px;">
              <md-chip
                v-if="c.code.includes(a.code) && c.code !== a.code"
                class="md-primary"
                md-clickable
              >{{ c.name }}</md-chip>
            </div>
          </el-card>
        </div>

        <p v-if="!item.sysAuthList.length">{{$t("tableSearch.noData")}}</p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'sysRoleList',
  props: {
    info: Object // 要渲染的数据
  },
  data () {
    return {
      activeName: ''
    }
  }
}
</script>
