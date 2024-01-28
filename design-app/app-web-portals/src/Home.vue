<template>
  <div class="about">
    <h1>This is @rchitect-app/web-portals</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/** About Component */
export default defineComponent({
  name: 'WebPortalHome',
  setup() {
    return {

    }
  }
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
