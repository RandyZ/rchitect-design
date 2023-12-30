/**
 * Used to monitor routing changes to change the status of menus and tabs. There is no need to monitor the route, because the route status change is affected by the page rendering time, which will be slow
 */

import type { RouteLocationNormalized } from 'vue-router';
import { useEventbus } from '@rchitect-rock/events';
import { getRawRoute } from '#/utils/router';

const key = Symbol.for('RouterChange');

let lastChangeTab: RouteLocationNormalized;

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute);
  useEventbus().$emit(key, { data: r });
  lastChangeTab = r;
}

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true
) {
  useEventbus().$on(key, (event) => {
    callback(event.data);
  });
  immediate && lastChangeTab && callback(lastChangeTab);
}

export function removeTabChangeListener() {
  useEventbus().$clear();
}
