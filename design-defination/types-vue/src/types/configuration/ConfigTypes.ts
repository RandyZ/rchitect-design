export interface StaticConfig {
  /**
   * Permission Type:
   * frontend: indicates that permissions are controlled by the front end
   * backend: indicates that the permissions are controlled by the backend
   */
  authType: 'frontend' | 'backend'

  // Display a progress bar at the top when switching pages
  enableProgress: boolean
}

export interface DynamicConfig {
  __: string
}