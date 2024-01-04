import type { WebsiteSetting } from "@rchitect-design/types";
import { $t } from "@rchitect-rock/locale";
// github repo url
export const GITHUB_URL = 'https://github.com/RandyZ/rchitect-design'

// vue-vben-admin-next-doc
export const DOC_URL = 'https://github.com/RandyZ/rchitect-design'

// site url
export const SITE_URL = 'https://github.com/RandyZ/rchitect-design'

const def:WebsiteSetting = {
  title: 'Rchitect',
  logo: '',
  /** Web links of footer */
  links: [
    {
      label: $t('layout.footer.onlinePreview'),
      url: SITE_URL,
    },
    {
      icon: 'uim:github',
      url: GITHUB_URL,
    },
    {
      label: $t('layout.footer.onlineDocument'),
      url: DOC_URL,
    },
  ],
  /** Copyright */
  copyright: $t('sys.app.copyright'),
}
export default def