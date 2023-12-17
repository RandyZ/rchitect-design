<script lang="ts" setup>
import { computed } from 'vue'
// import { resolveContextOptions } from '#/../bridge'
import headerImg from '@/assets/images/header.jpg'
import { useAppState, useUserGetter } from "#/hooks";
// import { useAppStatus } from '@rchitect-rock/hooks';

// const { stores } = resolveContextOptions();
const userGetters = useUserGetter()
const appStatus = useAppState()

const getUserInfo = computed(() => {
  const { realName = '用户Randy', avatar, desc } = userGetters.getUserInfo || {}
  return { realName, avatar: avatar || headerImg, desc }
})
</script>
<template>
  <div class="flex cursor-pointer">
    <img :src="getUserInfo.avatar" class="avatar w-6 h-6 mr-3" alt="avatar" />
    <span v-if="!appStatus.mobile">{{ getUserInfo.realName }}</span>
  </div>
</template>
<style scoped>
.avatar {
  border-radius: 50%;
}
</style>
