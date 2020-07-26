<template>
  <div style="display: flex;">
    <div style="width: 30%" v-if="$store.getters.getUserRole.includes('bmgl')">
      <div class="leftBorder-font">
        <div class="leftBorder-custom"></div>
        <p>{{$t('OS.departmentId')}}:</p>
      </div>

      <departments-show style="margin-top: 10px;"></departments-show>
    </div>

    <div style="width: 70%; margin-left: 20px;">
      <div class="leftBorder-font">
        <div class="leftBorder-custom"></div>
        <p>{{$t('user.userManagement')}}:</p>
      </div>

      <user-show style="margin-top: 10px;"></user-show>
    </div>
  </div>
</template>

<script>
import departmentsShow from '../departments'
import userShow from './user'

export default {
  name: 'userBridge',
  components: {
    departmentsShow, userShow
  },

}
</script>
