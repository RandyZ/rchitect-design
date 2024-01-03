import type { LocaleSetting } from "@rchitect-design/types";
import { LOCALE } from "@rchitect-rock/locale";
const def:LocaleSetting = {
  // Locale
  locale: LOCALE.zh,
  // Default locale
  fallback: LOCALE.zh,
  // available Locales
  availableLocales: [LOCALE.zh, LOCALE.en]
}
export default def;