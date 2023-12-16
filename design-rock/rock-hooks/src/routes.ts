import { diKT } from '@rchitect-rock/ioc';
import { Beans } from '@rchitect-rock/router';
/**
 * 获取路由表
 * 
 * @returns 
 */
export const useRoutesTable = () => {
  return diKT(Beans.RouteTable);
}

/**
 * 获取路由
 * 
 * @returns 
 */
export const useRouter = () => {
  return diKT(Beans.RouteTable).router;
}