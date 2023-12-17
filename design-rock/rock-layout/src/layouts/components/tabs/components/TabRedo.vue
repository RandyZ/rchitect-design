<script setup lang="ts">
import TYPES from '#/../beankeys'
// import { resolveContextOptions } from '#/../bridge'
import { diKT } from '@rchitect-rock/ioc';
// const { usePromise } = resolveContextOptions();
const multipleTabOperator = diKT(TYPES.MultipleTabOperator)

function reload() {
  return new Promise(async (resolve) => {
    await multipleTabOperator.refreshPage()
    setTimeout(() => {
      resolve({})
    }, 1200)
  })
}

const { loading, handleFn: handleRedo } = usePromise(reload, {
  immediate: false,
})
</script>

<template>
  <div @click="handleRedo"
    class="h-full w-32px border-l flex-center border-[var(--n-border-color)] cursor-pointer">
    <WmqIconify
      icon="ant-design:redo-outlined"
      :infinite="loading"
    />
  </div>
</template>

<style scoped lang="css"></style>
