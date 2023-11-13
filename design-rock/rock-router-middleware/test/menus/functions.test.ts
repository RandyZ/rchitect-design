import { describe, test, expect } from 'vitest';
import {
  preorderTraversal,
  fetchMenusAtLevel,
  useMenusAtLevel
} from "#/menus/functions";

vi.mock("@rchitect-rock/ioc", async () => {
  const rockIoc = await vi.importActual("@rchitect-rock/ioc") as object;
  return {
    ...rockIoc
  }
});

const mockMenu = [{
  name: "首页",
  title: "首页",
  path: "home",
  children: [{
    name: "首页-1",
    title: "首页-1",
    path: "/home1",
    children: [{
      name: "首页-1-1",
      title: "首页-1-1",
      path: "/home-1-1"
    }]
  }]
}];

describe("functions", () => {

  test("preorderTraversal", () => {
    const result = preorderTraversal(mockMenu, null, 2);
    expect(result[0]).not.toBeUndefined();
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("首页-1-1");
  });

  test('fetchMenusAtLevel', () => {
    const resultAll = fetchMenusAtLevel(mockMenu, null, -1);
    expect(resultAll[0]).not.toBeUndefined();
    expect(resultAll.length).toBe(1);
    expect(resultAll[0].title).toBe("首页");
    expect(resultAll[0].children).not.toBeUndefined();
    const resultLevel = fetchMenusAtLevel(mockMenu, null, 1);
    expect(resultLevel[0]).not.toBeUndefined();
    expect(resultLevel.length).toBe(1);
    expect(resultLevel[0].title).toBe("首页-1");
  });

  test("useMenusAtLevel", () => {
    // const {  menus, currentRoute } = useMenusAtLevel(2, true);
    // console.log(menus, currentRoute, 999);
  });

});
