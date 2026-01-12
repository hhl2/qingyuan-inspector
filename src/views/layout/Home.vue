<template>
    <div></div>
</template>

<style scoped>
.context-menu {
    position: fixed;
    background: transparent;
    border-radius: 8px;
    padding: 8px 0;
    min-width: 180px;
    z-index: 100;

}

.context_tan {
    width: 584px;
    height: 246px;
    background: url('@/assets/告警弹窗.png') no-repeat 0 0;
    background-size: 100% 100%;
    z-index: 99999;
}

.context_tan .context_tan_title {
    font-family: SimHei;
    font-weight: 400;
    font-size: 22px;
    color: #FFFFFF;
    background: linear-gradient(0deg, #77B9FF 0%, #FFFFFF 100%);
    -webkit-text-fill-color: transparent;
    margin-left: 32px;
    padding-top: 20px;
}
</style>


<script setup>
import { onMounted, onUnmounted, ref, computed, onBeforeUnmount, inject, watch, nextTick } from 'vue'
const showMenus = ref(false)
const menuRef = ref(null)
const menuPosition = ref({ x: 0, y: 0 })
// 菜单样式
const menuStyle = ref({
    left: '0px',
    top: '0px'
})


/* 触发ue5 */
// 注入父组件提供的方法
const playerMethods = inject('playerMethods')
// 封装调用逻辑
const callParentMethod = (message) => {
    if (playerMethods?.getUeData) {
        console.log(message)
    }
    if (playerMethods?.sendMessage) {
        playerMethods.sendMessage(message)
    } else {
        console.error('方法未成功注入')
    }
}

const ue5click = (index) => {
    console.log('点击触发', { "code": 1, "type": "btn", "data": { "id": index } });
    callParentMethod({ "code": 1, "type": "btn", "data": { "id": index } });
}



// 点击外部关闭菜单
const handleClickOutside = (event) => {
    if (menuRef.value && !menuRef.value.contains(event.target)) {
        showMenus.value = false
    }
}
// 监听窗口大小变化
const handleResize = () => {
    if (showMenus.value) {
        adjustMenuPosition()
    }
}
//调整位置
const adjustMenuPosition = () => {
    if (!menuRef.value) {
        console.warn('menuRef 未找到')
        return
    }

    try {
        const menuRect = menuRef.value.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        let { x, y } = menuPosition.value

        // 水平边界检测
        if (x + menuRect.width > viewportWidth) {
            x = viewportWidth - menuRect.width - 10
        }

        // 垂直边界检测
        if (y + menuRect.height > viewportHeight) {
            y = viewportHeight - menuRect.height - 10
        }

        // 确保位置不为负数
        x = Math.max(10, x)
        y = Math.max(10, y)

        menuStyle.value = {
            left: `${x}px`,
            top: `${y}px`
        }
    } catch (error) {
        console.error('调整菜单位置时出错:', error)
    }
}



// 生命周期
onMounted(() => {

})

onUnmounted(() => {


})

</script>