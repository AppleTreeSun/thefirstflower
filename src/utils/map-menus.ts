import type { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  const routes: RouteRecordRaw[] = []
  // 1.获取所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('@/router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('@/router/main' + key.split('.')[1]).default
    allRoutes.push(route)
  })

  // 2.根据菜单获取需要添加的route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function mapPathToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumds?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumds?.push({ name: menu.name })
        breadcrumds?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapPathToBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumds: IBreadcrumb[] = []
  mapPathToMenu(userMenus, currentPath, breadcrumds)
  return breadcrumds
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)

  return permissions
}

export { firstMenu }
