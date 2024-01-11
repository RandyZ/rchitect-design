import type { AppHeader } from "#/app/header-state";
import { type ComputedRef, computed } from "vue-demi";
import { Bean } from "@rchitect-rock/ioc";

@Bean()
export class AppHeaderGetters implements AppHeader.Getters {

  showBreadcrumb:ComputedRef<boolean>;
  showFullScreen:ComputedRef<boolean>;
  getHeaderBgColor:ComputedRef<string>;

  constructor() {
    this.showBreadcrumb = computed(() => true);
    this.showFullScreen = computed(() => true);
    this.getHeaderBgColor = computed(() => '#fff');
  }
}