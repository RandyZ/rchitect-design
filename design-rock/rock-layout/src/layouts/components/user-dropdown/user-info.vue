<script lang="ts" setup>
import { computed } from 'vue'
import { resolveContextOptions } from '#/../bridge'
import headerImg from '@/assets/images/header.jpg'
import { useAppStatus } from '@rchitect-rock/hooks';

const { stores } = resolveContextOptions();
const userStore = stores.useUserStore()
const appStatus = useAppStatus().toRefs()

const getUserInfo = computed(() => {
  const { realName = '未名企鹅用户', avatar, desc } = userStore.getUserInfo || {}
  return { realName, avatar: avatar || headerImg, desc }
})
</script>
<template>
  <div class="flex cursor-pointer">
    <img :src="getUserInfo.avatar" class="avatar w-6 h-6 mr-3" alt="avatar" />
    <span v-if="!appStatus.isMobile">{{ getUserInfo.realName }}</span>
  </div>
</template>
<style scoped>
.avatar {
  border-radius: 50%;
}
</style>
