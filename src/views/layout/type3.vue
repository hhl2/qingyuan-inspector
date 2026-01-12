<template>

    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_txet">视频监控</div>
        </div>
        <div class="spjkLists">
            <template v-for="(value, index) in sorces" :key="index">
                <div class="spjkList" @click="handleRowClick(value)">
                    <div class="spjkListbox">
                        <img :src="value.url" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
                    </div>
                    <div class="spjkList_label">{{ value.countNums1 || '摄像头' + (index + 1) }}</div>
                </div>
            </template>
        </div>

    </div>
    <div class="testmians" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="testmian">
            <div class="changewidth">
                <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
            </div>
            <div class="changleft">
                <el-table class="my-spacing-table" ref="tableRef" :data="data" @row-click="handleRowClick">
                    <el-table-column prop="countNums1" label="设备名称" show-overflow-tooltip />
                    <el-table-column prop="countNums2" label="设备类型" />
                    <el-table-column prop="countNums3" label="检测点位置" show-overflow-tooltip />
                    <el-table-column prop="countNams6" label="状态" width="50">
                        <template #default="scope">
                            <span :class="[scope.row.countNums6 === '在线' ? 'status-normal' : '.status-important']">
                                {{ scope.row.countNums6 === '在线' ? '在线' : '离线' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="countNums5" label="告警时间" show-overflow-tooltip />

                    <el-table-column prop="" label="告警等级">
                        <template #default="scope">
                            <span :class="['status-badge', statusClassMap[scope.row.countNums7]]">
                                {{ scope.row.countNums7 }}
                            </span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="countNums8" label="告警信息" show-overflow-tooltip>

                    </el-table-column>
                    <el-table-column prop="" label="关键应急预案" show-overflow-tooltip>
                        <template #default="scope">
                            <img src="" alt="">

                        </template>
                    </el-table-column>




                </el-table>


            </div>
        </div>
    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
        <div class="title">
            <img src="@/assets/title_bgs.png" alt="">
            <div class="title_text_box">
                <div class="title_txets">立体仓库</div>
                <div class="title_txets">平置仓库</div>
                <div class="title_txets">堆场</div>
            </div>
        </div>


        <div class="inputbox">
            <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search" />
            <div class="yylf_search_box">查询</div>
        </div>

        <div class="changleft2">
            <el-table class="my-spacing-table2" ref="tableRef" :data="data2" @row-click="handleRowClick">
                <el-table-column prop="countNums1" label="设备名称" show-overflow-tooltip />
                <el-table-column prop="countNums2" label="设备类型" />
                <el-table-column prop="countNums3" label="检测点位置" show-overflow-tooltip />
                <el-table-column prop="countNams6" label="状态" width="50">
                    <template #default="scope">
                        <span :class="[scope.row.countNums6 === '在线' ? 'status-normal' : '.status-important']">
                            {{ scope.row.countNums6 === '在线' ? '在线' : '离线' }}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>


    <!-- 弹窗（遮罩层已禁用） -->
    <Transition name="fade">
        <!-- 如需启用遮罩层，取消下面注释并注释掉再下面的 context-menus -->
        <!-- <div v-if="showSingleVideoPopup" class="popup-overlay" @click.self="closeSingleVideoPopup"> -->
        <div v-if="showSingleVideoPopup" class="context-menus" ref="menuRefSingle">
            <div class="sxtmName">
                <span>{{ currentCamera.name || '摄像头' }}</span>
                <span class="camera-status-single" :class="currentCamera.status || 'online'">●</span>
                <div class="close-popup" @click="closeSingleVideoPopup">×</div>
            </div>
            <div class="context_tans">
                <!-- 加载中状态 -->
                <div v-if="isLoadingVideo" class="loading-container">
                    <div class="spinner"></div>
                    <span class="loading-text">加载中...</span>
                </div>
                <!-- 视频播放 -->
                <video v-else-if="currentCamera.videoUrl" ref="videoElementSingle" style="width: 100%; height: 100%"
                    controls autoplay muted playsinline class="animated-video"></video>
                <!-- 无视频信号 -->
                <div v-else class="no-video">
                    <span>暂无视频信号</span>
                </div>
            </div>
        </div>
        <!-- </div> -->
    </Transition>


    <div>

    </div>
</template>

<style scoped>
/* 背景遮罩层（已禁用，如需启用请取消注释） */
/*
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
*/

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active .context-menus,
.fade-leave-active .context-menus {
    transition: transform 0.3s ease;
}

.fade-enter-from .context-menus {
    transform: translate(-50%, -20px);
}

.fade-leave-to .context-menus {
    transform: translate(-50%, -20px);
}

.context-menus {
    width: 675px;
    height: 433px;
    position: absolute;
    left: 50%;
    top: 80px;
    transform: translate(-50%);
    background: url("@/assets/动画弹窗.png") no-repeat 0 0;
    background-size: 100% 100%;
    z-index: 999;

}

.context_tans {
    width: 615px;
    height: 340px;
    background: transparent;
    border: none;
    margin: 5px 0px 0px 30px;
    overflow: hidden;
    border-radius: 4px;
}

.sxtmName {
    font-family: "Microsoft YaHei", sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: #FFFFFF;

    background: #61B3FF;
    background: -webkit-linear-gradient(0deg, #61B3FF 0.4150390625%, rgba(255, 255, 255, 0.11) 100%);
    background: linear-gradient(0deg, #61B3FF 0.4150390625%, rgba(255, 255, 255, 0.11) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 45px;
    position: relative;
    cursor: pointer;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 45px;
}

/* 单画面状态指示器 */
.camera-status-single {
    font-size: 12px;
    margin-left: 10px;
    /* 覆盖父元素的透明文字填充，确保状态指示器可见 */
    -webkit-text-fill-color: currentColor;
}

.camera-status-single.online {
    color: #52c41a;
    animation: blink 2s infinite;
}

.camera-status-single.offline {
    color: #ff4d4f;
}

/* 闪烁动画 */
@keyframes blink {

    0%,
    50%,
    100% {
        opacity: 1;
    }

    25%,
    75% {
        opacity: 0.5;
    }
}

/* 关闭按钮 */
.close-popup {
    position: absolute;
    right: 5px;
    top: -10px;
    width: 34px;
    height: 34px;
    line-height: 20px;
    border-radius: 50%;
    background: rgba(255, 100, 100, 0.8);
    color: #fff;
    /* 覆盖父元素的透明文字填充，确保关闭按钮文字可见 */
    -webkit-text-fill-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
}

.close-popup:hover {
    background: rgba(255, 60, 60, 1);
    transform: scale(1.1);
}

/* 无视频占位 */
.no-video {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #6c7a89;
    font-size: 16px;
}

/* 加载中容器 */
.loading-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

/* 加载动画 - 旋转圆环 */
.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(97, 179, 255, 0.2);
    border-top-color: #61B3FF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* 加载文字 */
.loading-text {
    margin-top: 20px;
    color: #61B3FF;
    font-size: 16px;
    font-weight: 500;
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}


.testmian {
    padding: 20px 15px;
    background: url('@/assets/框中间.png') no-repeat 0 0;
    background-size: 100% 100%;
    width: 875px;
    height: 330px;
    position: fixed;
    left: 50%;
    bottom: 65px;
    transform: translateX(-50%);
    z-index: 999;
}

.inputbox {
    margin: 10px 20px;
    display: flex;
    justify-content: space-between;
}

.yylf_search_box {
    width: 50px;
    color: #E6F2FF;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    font-size: 15px;
    height: 25px;
    line-height: 25px;
    width: 45px;
    background-color: #10A8FD;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
}

.spjkLists {
    margin: 10px 25px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

}


.spjkLists .spjkList {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0px;
    cursor: pointer;
}

.spjkLists .spjkListbox {
    width: 200px;
    height: 160px;
    background: #fff;
}

.spjkList_label {
    margin-top: 10px;
    color: #fff;
    font-size: 18px;

}


.inputwidth {
    width: 240px;
}

.imgbox2 {
    width: 410px;
    height: 380px;
    background-color: #fff;
    margin-left: 25px;
    margin-top: 20px;
    margin-bottom: 10px;

}

.imgbox {
    width: 390px;
    height: 360px;
    background-color: #fff;
    margin-left: 25px;
    margin-top: 20px;
    margin-bottom: 30px;
}

.title_text_box {
    position: absolute;
    top: -5px;
    left: 10px;
    width: 95%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
}

.title_text_box .title_txets {
    font-size: 22px;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #FFFFFF;
    background: linear-gradient(0deg, #6CB0FD 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

}



.changewidth {
    margin: 5px 15px 10px 10px;

}

.changleft {
    margin-left: 10px;

}

.changleft2 {
    margin-left: 20px;
    margin-right: 5px;
    flex: 1;
    overflow: hidden;
}


.context-menu {
    width: 584px;
    height: 246px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url("@/assets/try/图层弹窗.png") no-repeat 0 0;
    background-size: 100% 100%;
    z-index: 999;
}


.my-spacing-table {
    height: 288px;
}

.my-spacing-table2 {
    height: 100%;
}
</style>

<script setup>
// 接收从 index 传入的面板状态
const props = defineProps({
    isPanelVisible: {
        type: Boolean,
        default: true
    },

})
import { Search } from '@element-plus/icons-vue'
import { reactive, ref, inject, watch, onMounted, onUnmounted } from 'vue'
import request from '@/utils/request'

const showMenus = ref(false);
const menuRef = ref(null);
const showSingleVideoPopup = ref(false);
const isLoadingVideo = ref(false); // 视频加载状态


const currentCamera = ref({
    id: 'cam001',
    name: '变压器检测工位摄像头',
    videoUrl: 'http://10.145.223.230:8080/live/camera01.flv',
    location: '变压器流水线检测工位',
    status: 'online'
});



// 通用函数：根据摄像头ID获取视频URL并打开弹窗
const fetchCameraVideoAndOpenPopup = async (cameraId, cameraName = '摄像头', cameraStatus = 'online') => {
    // 更新摄像头名称和状态
    currentCamera.value.name = cameraName;
    currentCamera.value.status = cameraStatus;

    // 先清空视频URL
    currentCamera.value.videoUrl = '';

    // 判空：检查cameraId是否有效
    if (!cameraId) {
        console.warn('摄像头ID为空，无法调用API');
        // 即使没有ID，也打开弹窗显示"暂无视频信号"
        isLoadingVideo.value = false;
        showSingleVideoPopup.value = true;
        return;
    }

    // 立即打开弹窗并显示加载状态
    isLoadingVideo.value = true;
    showSingleVideoPopup.value = true;

    // 异步加载视频URL（不阻塞UI）
    try {
        // 调用API获取视频预览URL（使用代理避免跨域）
        const response = await request({
            url: '/api/qydigital-park-service/qyVideoPoint/previewURLs',
            method: 'get',
            params: {
                cameraIndexCode: cameraId
            }
        });

        // 检查响应是否成功
        if (response && response.code === '0' && response.data && response.data.url) {
            // 将返回的URL赋值给currentCamera.videoUrl
            currentCamera.value.videoUrl = response.data.url;
            console.log('成功获取视频URL:', response.data.url);
        } else {
            console.warn('获取视频URL失败或返回数据为空:', response);
            // videoUrl保持为空，弹窗会显示"暂无视频信号"
        }
    } catch (error) {
        console.error('调用视频预览接口失败:', error);
        // videoUrl保持为空，弹窗会显示"暂无视频信号"
    } finally {
        // 无论成功或失败，都关闭加载状态
        isLoadingVideo.value = false;
    }
}

const handleRowClick = async (row) => {
    // 调用通用函数，传入行数据中的id、名称和状态
    await fetchCameraVideoAndOpenPopup(
        row.id,
        row.countNums1,
        row.countNums6 === '在线' ? 'online' : 'offline'
    );
}

const closeSingleVideoPopup = () => {
    showSingleVideoPopup.value = false;
    isLoadingVideo.value = false; // 重置加载状态
    currentCamera.value = {
        id: '',
        name: '',
        videoUrl: '',
        location: '',
        status: 'online'
    };
};
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
    if (newVal) {
        console.log('接收到新数据:', newVal)

        if (newVal?.json.type == 'afjc' || newVal?.json.type == 'poi') {
            showMenus.value = true
        }

        // 如果接收到的数据包含id，调用API获取视频URL并打开弹窗
        if (newVal?.json?.id) {
            await fetchCameraVideoAndOpenPopup(
                newVal.json.id,
                newVal.json.name || '摄像头',
                'online'
            );
        }
    }
})

const handleClickOutside = (event) => {
    // console.log(event, menuRef.value.contains(event.target))
    if (menuRef.value && menuRef.value.contains(event.target)) {
        showMenus.value = false;
    }
};

const sorces =
    [
        {
            countNums1: "摄像头#1",
            id: 'ee0febb859a541f1bca7515db0e5a41a',
            url: require("@/assets/camera/图1.png"),
        },
        {
            countNums1: "摄像头#2",
            id: 'dafe004a0d264b18ac12564fefc9dcd6',
            url: require("@/assets/camera/图2.png"),
        },
        {
            countNums1: "摄像头#3",
            id: 'b9877ba9b8d94041a8a448eb178d8163',
            url: require("@/assets/camera/图3.png"),
        },
        {
            countNums1: "摄像头#4",
            id: 'ee0febb859a541f1bca7515db0e5a41a',
            url: require("@/assets/camera/图4.png"),
        },
        {
            countNums1: "摄像头#5",
            id: 'dafe004a0d264b18ac12564fefc9dcd6',
            url: require("@/assets/camera/图5.png"),
        },
        {
            countNums1: "摄像头#6",
            id: 'b9877ba9b8d94041a8a448eb178d8163',
            url: require("@/assets/camera/图6.png"),
        },
        {
            countNums1: "摄像头#7",
            id: 'ee0febb859a541f1bca7515db0e5a41a',
            url: require("@/assets/camera/图7.png"),
        },
        {
            countNums1: "摄像头#8",
            id: 'dafe004a0d264b18ac12564fefc9dcd6',
            url: require("@/assets/camera/图.png"),
        }
    ]




const statusClassMap = reactive({
    '紧急告警': 'status-urgent',
    '重要告警': 'status-important',
    '一般告警': 'status-normal'
})

const statusClassMaps = reactive({
    '1': 'status-urgent',
    '2': 'status-important',
    '3': 'status-normal'
})

var data = [
    {
        countNums1: "摄像头#1",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },
    {
        countNums1: "摄像头#2",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },

    {
        countNums1: "摄像头#3",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "紧急告警",
        countNums8: "1号检测点温度过高",
        type: 1,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        countNums1: "摄像头#4",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },

    {
        countNums1: "摄像头#5",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },

    {
        countNums1: "摄像头#6",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        countNums1: "摄像头#7",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },

    {
        countNums1: "摄像头#8",
        countNums2: "安防监控",
        countNums3: "室内1号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },




];

var data2 = [
    {
        countNums1: "摄像头#1",
        countNums2: "安防监控",
        countNums3: "大厅1号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },
    {
        countNums1: "摄像头#2",
        countNums2: "安防监控",
        countNums3: "大厅2号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },

    {
        countNums1: "摄像头#3",
        countNums2: "安防监控",
        countNums3: "大厅3号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "紧急告警",
        countNums8: "1号检测人员入侵",
        type: 1,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },

    {
        countNums1: "摄像头#4",
        countNums2: "安防监控",
        countNums3: "大厅4号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },
    {
        countNums1: "摄像头#5",
        countNums2: "安防监控",
        countNums3: "大厅5号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },

    {
        countNums1: "摄像头#6",
        countNums2: "安防监控",
        countNums3: "大厅6号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },

    {
        countNums1: "摄像头#7",
        countNums2: "安防监控",
        countNums3: "室内7号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        countNums1: "摄像头#8",
        countNums2: "安防监控",
        countNums3: "室内8号检测点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },
    {
        countNums1: "摄像头#7",
        countNums2: "",
        countNums3: "",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },
    {
        countNums1: "摄像头#7",
        countNums2: "",
        countNums3: "",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        countNums1: "摄像头#7",
        countNums2: "",
        countNums3: "",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },
    {
        countNums1: "摄像头#1",
        countNums2: "安防监控",
        countNums3: "大厅1号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },
    {
        countNums1: "摄像头#2",
        countNums2: "安防监控",
        countNums3: "大厅2号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        countNums1: "摄像头#3",
        countNums2: "安防监控",
        countNums3: "大厅3号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "紧急告警",
        countNums8: "1号检测人员入侵",
        type: 1,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },

    {
        countNums1: "摄像头#4",
        countNums2: "安防监控",
        countNums3: "大厅4号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 3,
        id: 'b9877ba9b8d94041a8a448eb178d8163'

    },
    {
        countNums1: "摄像头#5",
        countNums2: "安防监控",
        countNums3: "大厅5号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 1,
        id: 'ee0febb859a541f1bca7515db0e5a41a'

    },

    {
        countNums1: "摄像头#6",
        countNums2: "安防监控",
        countNums3: "大厅6号监控点",
        countNums4: "65°C",
        countNums5: "2025-04-12 10:24:15",
        countNums6: "在线",
        countNums7: "",
        countNums8: "",
        type: 2,
        id: 'dafe004a0d264b18ac12564fefc9dcd6'

    },




];
// 生命周期
onMounted(() => {
    document.addEventListener("click", handleClickOutside);

});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

</script>