<script lang="ts" setup>
import { array, number, bool } from 'vue-types';
import { computed } from "vue-demi";
// import { useAppTheme } from '@rchitect-rock/hooks'
// import { ref } from 'vue';
// const { isDark, toggleTheme } = useAppTheme()
// const darkRef = ref(false)
// const testRandy = (vvv) => {
//   darkRef.value = vvv
//   console.log('Randy test', vvv);
//   toggleTheme(vvv);
// }

const emit = defineEmits(['handle'])

const props = defineProps({
  def:  bool().isRequired,
})

const isDark = computed(() => {
  return props.def;
});

const toggleTheme = (value: boolean) => {
  emit('handle', value);
}
</script>

<template>
  <WmqSpace justify="center">
    <WmqSwitch :value="isDark" @update:value="toggleTheme">
      <template #checked-icon>
        <WmqIconify icon="emojione:crescent-moon" hoverPointer />
      </template>
      <template #unchecked-icon>
        <WmqIconify icon="emojione:sun-with-face" hoverPointer />
      </template>
    </WmqSwitch>
  </WmqSpace>
</template>
