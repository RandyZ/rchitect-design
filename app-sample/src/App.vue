<script setup lang="ts">
import type { Directive, VNode, VNodeArrayChildren } from 'vue-demi'
import HelloWorld from './components/HelloWorld.vue'
import capitalize from 'lodash-es/capitalize';
import has from 'lodash-es/has';
const isVNode = (vnode: any): vnode is VNode => {
  return vnode && vnode.__v_isVNode === true
}
const vThrottleOn: Directive = {
  mounted: (el, binding, vnode, prevVnode) => {
    console.log('mounted', el, binding, vnode, prevVnode)
    const eventName = binding.arg
    const targetVnode = (vnode.children as VNodeArrayChildren)[0]
    if (eventName && isVNode(targetVnode)) {
      const props = targetVnode.props
      if (props && has(props, `on${capitalize(eventName)}`)) {
        const originalFunc = props[`on${capitalize(eventName)}`] as (...args: any[]) => Promise<any>
        const status = {
          isThrottled: false,
          originalFunc,
        }
        props['____RANDY_SET_STATUS____'] = status
        props[`on${capitalize(eventName)}`] = async (...args: any[]) => {
          if (status.isThrottled) {
            return
          }
          status.isThrottled = true
         await originalFunc(...args)
         status.isThrottled = false
        }
      }
    }
  },
  beforeUnmount(el, binding, vnode, prevVnode) {
    console.log('beforeUnmount', el, binding, vnode, prevVnode)
    if (vnode.props && vnode.props['____RANDY_SET_STATUS____']) {
      const status = vnode.props['____RANDY_SET_STATUS____']
      delete vnode.props['____RANDY_SET_STATUS____']
      vnode.props[`on${capitalize(binding.arg)}`] = status.originalFunc
    }
  }
}

const asyncCallback = async (...args: any[]) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('真正的函数执行了～～')
      resolve(true)
    }, 2000)
  })
}

</script>

<template>
  <!-- <HelloWorld v-throttle-on:custom="asyncCallback" msg="Vite + Vue" /> -->
  <div v-throttle-on:custom>
    <HelloWorld @custom="asyncCallback" msg="Vite + Vue directive" />
  </div>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
