<template>
    <div class="xm_title">
        <img src="@/assets/xm_title.png" />
        <div class="xm_titles">清远地级数字孪生智能检测平台</div>
    </div>
    <div class="xm_date">
        {{ formattedTime }}&nbsp;&nbsp; |&nbsp; {{ formattedDate }} &nbsp;&nbsp;{{ weekDay }}
    </div>


    <!-- 主要内容区域 -->
    <main class="main-content">
        <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
                <div :key="route.name" class="page-wrapper">
                    <component :is="Component" v-model:isPanelVisible="isPanelsVisible" />
                </div>
            </transition>
        </router-view>
    </main>

    <div class="menu_box" v-show="showMenu">
        <div class="menu_box_ul">
            <div v-for="(item, index) in menuList" :key="item.id" class="menu_box_li"
                :class="{ active: changli === item.id }" @click.stop="changelist(item)">
                <img :src="getImagePath(item.id)" :alt="item.name">
                <div class="menu_box_text">{{ item.name }}</div>
            </div>
        </div>
    </div>
    <div class="xm_foot">
        <img style="height: 21px;" src="@/assets/xm_foot.png" />
    </div>

    <div v-show="showball && isPaneClose">
        <DragFloatBall v-model="isPanelsVisible" default-position="right" :size="60" :snap-distance="20"
            :edge-margin="30" :enable-snap="true" :enable-drag="true" @toggle="handleToggle" @close="handleClose"
            @drag-start="handleDragStart" @drag-end="handleDragEnd" @position-change="handlePositionChange">
            <!-- 自定义内容 -->
            <template #default="{ isVisible }">
                <div class="custom-content">
                    <svg class="eye-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path v-if="isVisible"
                            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                            fill="currentColor" />
                        <path v-else
                            d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"
                            fill="currentColor" />
                    </svg>
                    <div class="text">{{ isVisible ? '隐藏' : '显示' }}</div>
                </div>
            </template>
        </DragFloatBall>

    </div>




</template>

<style scoped>
.menu_box_text1 {
    position: absolute;
    top: 13px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: YouSheBiaoTiHei;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    font-weight: bold;
    opacity: 1;
    z-index: 9999;

}

.menu_box_texts {
    position: absolute;
    top: 13px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: YouSheBiaoTiHei;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    font-weight: bold;
    opacity: 1;
    z-index: 9999;
    background: linear-gradient(to bottom, #DAEDFF, #12B7FD, #04A6FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

}

.menu_boxs {
    position: fixed;
    top: 15px;
    z-index: 999;
    width: 100%;
    background-size: 100% 100%;
    left: 40px;
    height: 38px;
}

.menu_box_uls {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
}

.menu_box_uls .menu_box_lis {
    width: 135px;
    position: relative;
    margin-left: -22px;
}

.menu_box_uls .menu_box_lis img {
    width: 100%;
    height: 30px;
}

.xm_title {
    position: fixed;
    top: 0;
    z-index: 32;
    left: 50%;
    transform: translateX(-50%);
    /* height: 88px; */
    height: 60px;
    display: inline-block;
}

.xm_title img {
    height: 60px;
    width: auto;
    display: block;
}

.xm_titles {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 2px;
    font-size: 22px;
    font-weight: bold;
    white-space: nowrap;
    pointer-events: none;
    background: linear-gradient(to top, #FFFFFF, #6CB0FD);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}

.xm_foot {
    position: fixed;
    bottom: 0;
    z-index: 32;
    left: 50%;
    transform: translateX(-50%);
    height: 14px;

}

.xm_date {
    position: fixed;
    right: 20px;
    color: #fff;
    z-index: 33;
    top: 28px;
    font-size: 13px;
    font-weight: 400;
}

.menu_box {
    position: fixed;
    bottom: 24px;
    z-index: 32;
    width: 45%;
    background-size: 100% 100%;
    left: 50%;
    transform: translateX(-50%);
    height: 28px;
}

.menu_box_ul {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
}

.menu_box_ul .menu_box_li {
    width: 120px;
    position: relative;
}

.menu_box_ul .menu_box_li img {
    width: 100%;
    height: 28px;
}

.menu_box_ul .menu_box_li .menu_box_text {
    position: absolute;
    top: 4px;
    left: 30px;
    font-size: 15px;
    color: #fff;
}

/* 悬浮球自定义内容样式 */
.custom-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
}

.custom-content .eye-icon {
    width: 22px;
    height: 22px;
    color: white;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.custom-content .text {
    font-size: 11px;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style>

<script>
export default {
    name: 'LayoutIndex'
}
</script>
<script setup>
import activeButton from '@/assets/activeButton.png'
import defaultButton from '@/assets/defaultButton.png'
import { useRouter, useRoute } from 'vue-router'
import DragFloatBall from '@/components/DragFloatBall.vue';

import { onMounted, onUnmounted, ref, computed, onBeforeUnmount, inject, nextTick, watch } from 'vue'
// 获取路由实例和当前路由对象
const router = useRouter();
const route = useRoute();

const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
    if (newVal) {
        console.log('index页新数据:', newVal.json)

        const jsonRes = newVal?.json

        if (jsonRes && jsonRes.id === 'JCZX') {
            console.log('打开检测中心:', jsonRes)
            localStorage.setItem('roadinfo', JSON.stringify(jsonRes))

            nextTick(() => {
                changli.value = 0
                router.push('/kb')
            })
        }
        if (jsonRes && jsonRes.id === 'JCGW') {
            console.log('打开检测工位:', jsonRes)
            localStorage.setItem('roadinfo', JSON.stringify(jsonRes))
            nextTick(() => {
                changli.value = 1
                router.push('/inspection')
            })
        }



    }
})


// 面板状态
const isPanelsVisible = ref(true);
const isPaneClose = ref(true);

const handleClose = () => {
    console.log("确认关闭悬浮球")
    isPaneClose.value = false
}
const handleToggle = (isVisible) => {
    console.log('面板状态:', isPanelsVisible, isVisible ? '显示' : '隐藏');
};

const handleDragStart = (position) => {
    console.log('开始拖拽:', position);
};

const handleDragEnd = (position) => {
    console.log('结束拖拽:', position);
};

const handlePositionChange = (position) => {
    console.log('位置变化:', position);
};
const showball = computed(() => {
    // 如果路由有 meta.showMenu 配置，就使用配置的值
    return route.meta.showball !== false
})

// 计算属性：根据路由元信息决定是否显示菜单
const showMenu = computed(() => {
    // 如果路由有 meta.showMenu 配置，就使用配置的值
    return route.meta.showMenu !== false
})
const menuList = ref([
    { id: 0, name: '工位总览', routeName: 'kb' },
    { id: 1, name: '检测工位', routeName: 'Inspection' },
    { id: 2, name: '告警管理', routeName: 'Alerts' },
    { id: 3, name: '设备管理', routeName: 'Devices' },

    // 可以继续添加更多菜单项
]);
// 图片映射
const imageMap = {
    active: activeButton,
    default: defaultButton
};
const changli = ref(1)
const changelist = (item) => {
    changli.value = item.id;
    router.push({ name: item.routeName })
    ue5click(item.id)
};
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

    // callParentMethod({ "code": 1, "type": "btn", "data": { "id": "1050523395", "state": "wuliao" } });

}
const getImagePath = (id) => {
    return changli.value === id ? imageMap.active : imageMap.default;
}





// 定义响应式时间对象
const now = ref(new Date());
let timer = null;

// 补零函数（确保两位数显示）
const complement = (value) => {
    return value < 10 ? `0${value}` : value;
};

// 时间格式化
const formatDateTime = () => {
    const date = now.value;
    return {
        year: date.getFullYear(),
        month: complement(date.getMonth() + 1),
        day: complement(date.getDate()),
        hour: complement(date.getHours()),
        minute: complement(date.getMinutes()),
        second: complement(date.getSeconds()),
        week: date.getDay()  // 返回 0-6（0=星期日）
    };
};

// 计算属性式输出
const formattedDate = computed(() => {
    const { year, month, day } = formatDateTime();
    return `${year}年${month}月${day}日`;
});

const formattedTime = computed(() => {
    const { hour, minute, second } = formatDateTime();
    return `${hour}:${minute}:${second}`;
});

const weekDay = computed(() => {
    const weekMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return weekMap[formatDateTime().week];
});




// 清除定时器
onBeforeUnmount(() => {
    clearInterval(timer);
});
onUnmounted(() => {

})

onMounted(async () => {
    timer = setInterval(() => {
        now.value = new Date();
    }, 1000);




})

</script>