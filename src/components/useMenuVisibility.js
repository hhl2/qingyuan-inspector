import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useMenuVisibility() {
    const route = useRoute()

    const showMenu = computed(() => {
        // 在这里定义你的显示逻辑
        const hideRoutes = ['Fullscreen', 'Login']
        return !hideRoutes.includes(route.name)

        // 或者使用元信息
        // return route.meta.showMenu !== false
    })

    return {
        showMenu
    }
}