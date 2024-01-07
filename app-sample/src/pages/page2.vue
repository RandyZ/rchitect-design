<script setup lang="ts">
defineOptions({
  name: "TestPage1",
})
const testButton = (e) => {
  console.info('RandyTestButton', e)
  alert('Change to Driver Dialog')
}

</script>

<template>
  <WmqButton @click="testButton">Test</WmqButton>
</template>

<style scoped>

</style>