<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
const emit = defineEmits<{
  custom: [id: number, data:string]
}>()
const onClick = () => {
  count.value++
  emit('custom', count.value, `count is ${count.value}`)
}
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>

    <div class="card">
      <WmqButton type="primary" @click="onClick">count is {{ count }}</WmqButton>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        >create-vue</a
      >, the official Vue + Vite starter
    </p>
    <p>
      Install
      <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
