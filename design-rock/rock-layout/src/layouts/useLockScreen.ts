import { computed, onUnmounted, unref, watch, watchEffect } from 'vue-demi'
import type { ComputedRef } from 'vue-demi'
import { useThrottleFn } from '@rchitect-rock/tools'
import type { PromisifyFn } from '@rchitect-rock/tools'
import { Beans as settingBeans } from '@rchitect-rock/settings'
import { default as Beans } from '#/../beankeys'
import { Route } from '@rchitect-design/constants'
import { diKT } from '@rchitect-rock/ioc'
import { useRoute } from '#/hooks'

const LOCK_PATH = Route.BASIC_LOCK_PATH

const router = () => useRoute().router;

export function useLockScreen():ComputedRef<{
  onKeyup:PromisifyFn<() => void> | undefined
  onMousemove:PromisifyFn<() => void> | undefined
}> {
  const lockActions = diKT(Beans.AppLockActions)
  const lockState = diKT(Beans.AppLockState)
  const userStore = diKT(Beans.UserState)
  const appConfig = diKT(settingBeans.AppConfigState);

  let timeId:TimeoutHandle

  function clear():void {
    window.clearTimeout(timeId)
  }

  function resetCalcLockTimeout():void {
    // not login
    if (!userStore.getAccessToken) {
      clear()
      return
    }
    const lockTime = appConfig.sporadicSetting.value?.lockTime
    if (!lockTime || lockTime < 1) {
      clear()
      return
    }
    clear()

    timeId = setTimeout(() => {
      lockPage()
    }, lockTime * 60 * 1000)
  }

  function lockPage():void {
    lockActions.setLockInfo({
      isLock: true,
      pwd: undefined,
    })
  }

  watchEffect((onClean) => {
    if (userStore.getAccessToken) {
      resetCalcLockTimeout()
    } else {
      clear()
    }
    onClean(() => {
      clear()
    })
  })

  watch(
    () => unref(lockState.lockInfo)?.isLock,
    (newValue) => {
      if (newValue) {
        router().replace({
          path: LOCK_PATH,
          query: { redirect: unref(router().currentRoute).path },
        })
      }
    },
    { deep: true },
  )

  onUnmounted(() => {
    clear()
  })

  return computed(() => {
    let keyupFn:PromisifyFn<() => void> | undefined = undefined
    if (unref(appConfig.sporadicSetting).lockTime > 0) {
      keyupFn = useThrottleFn(resetCalcLockTimeout, 2000)
    } else {
      clear()
    }
    return { onKeyup: keyupFn, onMousemove: keyupFn }
  })
}
