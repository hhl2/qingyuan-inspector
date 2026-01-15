<template>
  <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
    <div class="title">
      <img src="@/assets/title_bgs.png" alt="" />
      <div class="title_txet">设备管理</div>
    </div>
    <div class="sbgl">
      <template v-for="(value, index) in gjtjList" :key="index">
        <div class="sbgl_box">
          <img src="@/assets/摄像头图标.png" alt="" />
          <div class="sbgl_box_title">
            {{ getStatusTexts(value?.equipmentKind) }}
          </div>
          <div class="sbgl_box_text">{{ value?.equipmentKindCount }}台</div>
        </div>
      </template>
    </div>
    <div class="inputBox">
      <el-input v-model="input3" class="inputwidth" placeholder="请输入关键字" :prefix-icon="Search"
        @keyup.enter="getsbList()" />
    </div>



    <div class="table-container">
      <el-table class="my-spacing-table" ref="tableRef" :data="sblist" @mouseenter="pauseScroll"
        @mouseleave="resumeScroll" @row-click="handleRowClick">
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="equipmentName" label="设备名称" />
        <el-table-column prop="equipmentKindName" label="设备类型" />
        <el-table-column prop="equipmentMonitoringPoint" label="监测点位置" class="setwidth" show-overflow-tooltip />
        <el-table-column prop="countName" label="状态" width="50">
          <template #default="scope">
            <span>

              {{ scope.row.countName }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div v-if="showMenus" class="context-menu" ref="menuRef">
    <div class="context_tan">
      <div class="yiqiName" @click="closeMenus()">
        仪器名称
        <div class="bjBack">
          <img src="@/assets/圆角矩形.png" alt="" />
        </div>
      </div>
      <div class="xbts">
        <img src="@/assets/xbt.png" />
        <div class="xbts_text">基本信息</div>
      </div>
      <div class="bjLists">
        <div class="bjList mbbox">
          <div class="bjList_box">
            <div class="bjList_box_label">设备名称</div>
            <div>{{ sbxqList?.equipmentName }}</div>
          </div>
          <div class="bjList_box">
            <div class="bjList_box_label">设备编号</div>
            <div>{{ sbxqList?.equipmentCode }}</div>
          </div>
          <div class="bjList_box">
            <div class="bjList_box_label">制造商</div>
            <div>{{ sbxqList?.supplier }}</div>
          </div>
        </div>

        <div class="bjList mbbox">
          <div class="bjList_box">
            <div class="bjList_box_label">责任人</div>
            <div>{{ sbxqList?.responsibilityPerson }}</div>
          </div>
          <div class="bjList_box">
            <div class="bjList_box_label">工位</div>
            <div>{{ sbxqList?.stationName }}</div>
          </div>
          <div class="bjList_box">
            <div class="bjList_box_label">型号</div>
            <div>{{ sbxqList?.equipmentType }}</div>
          </div>
        </div>

        <div class="bjList">
          <div class="bjList_box">
            <div class="bjList_box_label">功能</div>
            <div>{{ sbxqList?.equipmentFunction }}</div>
          </div>
          <div class="bjList_box">
            <div class="bjList_box_label">主要参数</div>
            <div>{{ sbxqList?.mainParam }}</div>
          </div>
          <div class="bjList_box">
            <div class="bjList_box_label">生产日期</div>
            <div>{{ sbxqList?.productionDateStr }}</div>
          </div>
        </div>
      </div>

      <div class="xbts">
        <img src="@/assets/xbt.png" />
        <div class="xbts_text">送检信息</div>
      </div>
      <div class="bjLists">
        <template v-for="(value, index) in sjxx" :key="index">
          <div class="bjList">
            <div class="bjList_box">
              <div class="bjList_box_label">检定单位</div>
              <div>{{ value?.detectDepartment }}</div>
            </div>
            <div class="bjList_box">
              <div class="bjList_box_label">下次送检时间</div>
              <div>{{ value?.nextDeliveryDateStr }}</div>
            </div>
          </div>
        </template>
      </div>

      <div class="xbts">
        <img src="@/assets/xbt.png" />
        <div class="xbts_text">维修记录</div>
      </div>

      <template v-for="(value, index) in wxxxList" :key="index">
        <div>
          <div class="bjLists">
            <div class="bjList mbbox">
              <div class="bjList_box">
                <div class="bjList_box_label">故障维修内容</div>
                <div>{{ value?.equipmentMaintenanceContent }}</div>
              </div>
              <div class="bjList_box">
                <div class="bjList_box_label">维护时间</div>
                <div>{{ value?.equipmentMaintenanceDateStr }}</div>
              </div>
            </div>
            <div class="bjList">
              <div class="bjList_box" style="width: 430px">
                <div class="bjList_box_label">维修单位</div>
                <div>{{ value?.maintenanceDepartment }}</div>
              </div>
              <div class="bjList_box" style="width: 210px">
                <div class="bjList_box_label">维修人员</div>
                <div>{{ value?.maintenancePerson }}</div>
              </div>
              <div class="bjList_box" style="width: 220px">
                <div class="bjList_box_label">联系方式</div>
                <div>{{ value?.contact }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!-- 多画面监控按钮 -->
  <!-- <div v-if="!showVideoPopup" class="multi-view-btn-container">
    <button class="multi-view-btn" @click="openMultiView">
      <span class="btn-icon">📹</span>
      <span class="btn-text">多画面监控</span>
    </button>
  </div> -->

  <!-- 蒙层 -->
  <div v-if="showSingleVideoPopup" class="video-overlay" @click="closeSingleVideoPopup"></div>

  <!-- 单画面视频弹窗 -->
  <div v-if="showSingleVideoPopup" class="context-menus" ref="menuRefSingle" @click.stop>
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
      <video v-else-if="currentCamera.videoUrl" ref="videoElementSingle" style="width: 100%; height: 100%" controls
        autoplay muted playsinline class="animated-video"></video>
      <!-- 无视频信号 -->
      <div v-else class="no-video">
        <span>暂无视频信号</span>
      </div>
    </div>
  </div>

  <!-- 多画面视频弹窗 -->
  <!-- <div v-if="showVideoPopup" class="context-menus-multi" ref="menuRef2">
    <div class="sxtmName">
      多画面监控
      <div class="close-popup" @click="closeVideoPopup">×</div>
    </div>
    <div class="video-grid-container">
      
      <div class="video-grid">
        
        <div v-for="(camera, index) in displayCameras" :key="camera.id || index" class="video-cell">
          <div class="video-header">
            <span class="camera-name">{{ camera.name || `摄像头${index + 1}` }}</span>
            <span class="camera-status" :class="camera.status">●</span>
          </div>
          <video v-if="camera.videoUrl" :ref="el => setVideoRef(el, index)" class="video-player" controls autoplay muted
            playsinline>
          </video>
          <div v-else class="no-video-small">
            <span>暂无信号</span>
          </div>
        </div>
      </div>
    </div>
  </div> -->





</template>

<style scoped>
.sbgl {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  justify-content: center;

}

.sbgl .sbgl_box {
  width: 48%;
  position: relative;
  margin: 15px 0px;
  display: flex;
  justify-content: center;
}

.sbgl .sbgl_box img {
  width: 180px;
  height: 75px;
}

.sbgl .sbgl_box .sbgl_box_title {
  position: absolute;
  top: 18px;
  left: 80px;
  color: #fff;
  font-size: 14px;
}

.sbgl .sbgl_box .sbgl_box_text {
  position: absolute;
  top: 45px;
  left: 85px;
  font-size: 20px;
  background: linear-gradient(to bottom, #FFFFFF, #FDD26C);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-weight: bold;
}



.context-menu {
  width: 680px;
  height: 600px;
  position: absolute;
  left: 45%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url("@/assets/弹窗.png") no-repeat 0 0;
  background-size: 100% 100%;
  z-index: 32;
  overflow-y: auto;
  overflow-x: hidden;
}


.context_tan {
  margin: 60px 0px 0px 30px;
  height: 455px;
  overflow-y: auto;

}


.yiqiName {
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  font-size: 16px;
  color: #61b3ff;
  margin-left: 55px;
  position: relative;
  cursor: pointer;
}

.yiqiName .bjBack {
  position: absolute;
  left: -30px;
  top: 2px;
}


.xbts {
  width: 100%;
  height: 25px;
  position: relative;
}

.xbts img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.xbts .xbts_text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -60%);
  color: #e9fbff;
  font-size: 12px;
  font-style: italic;
  font-weight: bold;
  letter-spacing: 2px;
}


.bjLists {
  width: 550px;
  margin: 10px 20px;
  background: #2a61a0;
  border: 1px solid #6dbdf1;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border-radius: 3px;
}

.bjList_box {
  width: 50%;
  display: flex;
  color: #ffffff;
  font-size: 10px;
}

.bjList_box_label {
  color: #6bbbee;
  margin-right: 16px;
}

.bjList {
  display: flex;
  align-items: center;
}

.context-menus {
  width: 606px;
  height: 423px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-60%, -50%);
  background: url("@/assets/动画弹窗.png") no-repeat 0 0;
  background-size: 100% 100%;
  z-index: 999;
}

.context_tans {
  width: 545px;
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

/* 蒙层样式 */
.video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 998;
  cursor: pointer;
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


/* ========== 多画面视频监控样式 ========== */
/* 多画面弹窗容器 */
/* .context-menus-multi {
  width: 1200px;
  height: 720px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, rgba(26, 39, 62, 0.95) 0%, rgba(31, 45, 71, 0.95) 100%);
  border: 2px solid rgba(97, 179, 255, 0.3);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  z-index: 10000;
  overflow: hidden;
}

.video-grid-container {
  width: 100%;
  height: calc(100% - 60px);
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}

.video-grid-container::-webkit-scrollbar {
  width: 8px;
}

.video-grid-container::-webkit-scrollbar-track {
  background: rgba(97, 179, 255, 0.1);
  border-radius: 4px;
}

.video-grid-container::-webkit-scrollbar-thumb {
  background: rgba(97, 179, 255, 0.3);
  border-radius: 4px;
}

.video-grid-container::-webkit-scrollbar-thumb:hover {
  background: rgba(97, 179, 255, 0.5);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(300px, auto);
  gap: 12px;
  width: 100%;
}

.video-cell {
  background: rgba(20, 30, 48, 0.6);
  border: 1px solid rgba(97, 179, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
}

.video-cell:hover {
  border-color: rgba(97, 179, 255, 0.5);
  box-shadow: 0 4px 16px rgba(97, 179, 255, 0.2);
  transform: translateY(-2px);
}

.video-header {
  background: linear-gradient(90deg, rgba(97, 179, 255, 0.15) 0%, rgba(97, 179, 255, 0.05) 100%);
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(97, 179, 255, 0.1);
}

.camera-name {
  color: #e0f2ff;
  font-size: 13px;
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
}

.camera-status {
  font-size: 10px;
  margin-left: 8px;
}

.camera-status.online {
  color: #52c41a;
  animation: blink 2s infinite;
}

.camera-status.offline {
  color: #ff4d4f;
}

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

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}

.no-video-small {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #6c7a89;
  font-size: 14px;
}

.camera-info {
  padding: 8px 30px;
  color: #a0d2ff;
  font-size: 12px;
}

.camera-info .info-label {
  color: #6bbbee;
}

.camera-info .info-value {
  color: #fff;
} */

/* .context-menus {
  width: 560px;
  height: 246px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-60%, -50%);
  background: url("@/assets/图层弹窗.png") no-repeat 0 0;
  background-size: 100% 100%;
  z-index: 999;
}

.context_tans .context_tan_title {
  font-family: SimHei;
  font-weight: 400;
  font-size: 22px;
  color: #FFFFFF;
  background: linear-gradient(0deg, #77B9FF 0%, #FFFFFF 100%);
  -webkit-text-fill-color: transparent;
  margin-left: 32px;
  padding-top: 20px;
} */

.inputBox {
  margin: 10px 0px;
  flex-shrink: 0;
  /* 不允许压缩 */
}

/* 多画面监控按钮容器 */
/* .multi-view-btn-container {
  position: fixed;
  left: 10px;
  top: 100px;
  z-index: 9999;
}

.multi-view-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: linear-gradient(135deg, rgba(97, 179, 255, 0.2) 0%, rgba(97, 179, 255, 0.1) 100%);
  border: 2px solid rgba(97, 179, 255, 0.4);
  border-radius: 8px;
  color: #e0f2ff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(97, 179, 255, 0.1);
}

.multi-view-btn:hover {
  background: linear-gradient(135deg, rgba(97, 179, 255, 0.3) 0%, rgba(97, 179, 255, 0.2) 100%);
  border-color: rgba(97, 179, 255, 0.6);
  box-shadow: 0 4px 16px rgba(97, 179, 255, 0.3);
  transform: translateY(-2px);
}

.multi-view-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(97, 179, 255, 0.2);
}

.multi-view-btn .btn-icon {
  font-size: 18px;
}

.multi-view-btn .btn-text {
  letter-spacing: 0.5px;
} */

/* 表格容器填满剩余高度 */
.table-container {
  flex: 1;
  min-height: 0;
  /* 重要：允许 flex 子项小于内容高度 */
  overflow: hidden;
}

.my-spacing-table {
  width: 100%;
  height: 100%;
}

/* el-input 自定义样式 */
::v-deep(.el-input__wrapper) {
  background-color: rgba(64, 105, 161, 0.7);
  /* #4069A1 70%透明度 */
  box-shadow: 0 0 0 1px rgba(67, 139, 232, 0.7) inset;
  /* #438BE8 边框 70%透明度 */
  border-radius: 4px;
}

::v-deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px rgba(67, 139, 232, 0.9) inset;
}

::v-deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px rgba(67, 139, 232, 1) inset;
}

::v-deep(.el-input__inner) {
  color: rgba(255, 255, 255, 0.7);
  /* #fff 70%透明度 */
}

::v-deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.5);
}

::v-deep(.el-input) {
  --el-input-placeholder-color: rgba(255, 255, 255, 0.5);
}

::v-deep(.el-input__icon),
::v-deep(.el-input__prefix-inner .el-icon) {
  color: rgba(82, 140, 183, 0.7);
  /* #528CB7 70%透明度 */
}
</style>



<script setup>
import { Search } from "@element-plus/icons-vue";
import { onMounted, onUnmounted, watch, inject, ref, nextTick } from "vue";
import request from '@/utils/request';
import {
  queryEquipmentStatistics,
  queryEquipmentListPage,
  queryEquipmentDeliveryListPage,
  queryEquipmentDetail,
  queryEquipmentMaintenanceListPage,
} from "@/api/user";
import {
  DEFAULT_DEVICE_STATS,
  DEFAULT_DEVICE_LIST,
  MOCK_DEVICE_STATS,
  MOCK_DEVICE_LIST,
  DEFAULT_DEVICE_DETAIL,
  DEFAULT_DELIVERY_LIST,
  MOCK_DELIVERY_LIST,
  DEFAULT_MAINTENANCE_LIST,
  MOCK_MAINTENANCE_LIST,
  getEquipmentKindName,
} from "@/constants/deviceMock";

// ========== 兜底数据开关 ==========
// true = 使用兜底数据（API无数据时显示测试数据）
// false = 不使用兜底数据（API无数据时显示空）
const USE_MOCK_FALLBACK = true;
// ==================================

// 接收从 index 传入的面板状态
const props = defineProps({
  isPanelVisible: {
    type: Boolean,
    default: true
  },
})

// 动态存储参数（从 localStorage 获取）
const currentContractPartId = ref("");
const currentStationCode = ref("");


const showMenus = ref(false);
const showSingleVideoPopup = ref(false);  // 单画面弹窗
const isLoadingVideo = ref(false); // 视频加载状态
const menuRef = ref(null);
const menuRefSingle = ref(null);
const input3 = ref("");

// EasyPlayer 播放器相关引用（与 type3.vue 一致）
const videoElementSingle = ref(null);
const easyPlayerInstance = ref(null);

// 当前选中的摄像头信息
const currentCamera = ref({
  id: '',
  name: '',
  videoUrl: '',
  location: '',
  status: 'online'
});


// 初始化单画面播放器 (使用 EasyPlayer，与 type3.vue 一致)
const initSingleFlvPlayer = async () => {
  console.log('🚀 开始初始化 EasyPlayer 播放器...');

  // 销毁旧的播放器
  destroySingleFlvPlayer();

  await nextTick();

  // 检查元素和URL是否存在
  console.log('🎬 检查:', {
    hasVideoElement: !!videoElementSingle.value,
    hasVideoUrl: !!currentCamera.value.videoUrl,
    videoUrl: currentCamera.value.videoUrl,
    popupVisible: showSingleVideoPopup.value
  });

  if (!videoElementSingle.value || !currentCamera.value.videoUrl) {
    console.warn('⚠️ 视频元素或 URL 不存在');

    // 如果有URL但元素还没准备好，可能是DOM还在渲染，等待后重试
    if (currentCamera.value.videoUrl && showSingleVideoPopup.value && !videoElementSingle.value) {
      console.log('🔄 video元素未就绪，200ms后重试...');
      setTimeout(() => {
        initSingleFlvPlayer();
      }, 200);
    }
    return;
  }

  try {
    const videoUrl = currentCamera.value.videoUrl;
    console.log('📹 视频URL:', videoUrl);
    console.log('🎬 使用 EasyPlayer 播放器');

    // 检查 EasyPlayer 是否已加载
    if (!window.EasyPlayerPro) {
      console.error('❌ EasyPlayer 库未加载，请检查 index.html 中的脚本引用');
      return;
    }

    // 直接初始化播放器
    initEasyPlayer(videoUrl);
  } catch (error) {
    console.error('❌ 播放器初始化失败:', error);
  }
};

// 初始化 EasyPlayer
const initEasyPlayer = (videoUrl) => {
  try {
    console.log('🎬 初始化 EasyPlayer，URL:', videoUrl);

    // 如果是相对路径，转换为绝对URL
    let absoluteUrl = videoUrl;
    if (videoUrl && !videoUrl.match(/^(http|https|ws|wss|webrtc|wt|artc):/)) {
      absoluteUrl = window.location.origin + videoUrl;
      console.log('🔄 转换相对路径为绝对URL:', absoluteUrl);
    }

    // 创建播放器实例
    easyPlayerInstance.value = new window.EasyPlayerPro(videoElementSingle.value, {
      stretch: true,
      hasAudio: true,
      autoplay: true,
      live: false
    });

    // 播放视频
    easyPlayerInstance.value.play(absoluteUrl).then(() => {
      console.log('✅ EasyPlayer 播放成功');
    }).catch((error) => {
      if (error.message && error.message.includes('Maximum call stack size exceeded')) {
        console.warn('⚠️ EasyPlayer 内部警告（不影响播放）:', error.message);
      } else {
        console.error('❌ EasyPlayer 播放失败:', error);
      }
    });

  } catch (error) {
    console.error('❌ EasyPlayer 初始化失败:', error);
  }
};

// 销毁播放器
const destroySingleFlvPlayer = () => {
  if (easyPlayerInstance.value) {
    try {
      easyPlayerInstance.value.destroy();
      easyPlayerInstance.value = null;
      console.log('✅ EasyPlayer 播放器已销毁');
    } catch (error) {
      console.error('销毁 EasyPlayer 播放器时出错:', error);
      easyPlayerInstance.value = null;
    }
  }
};

// 关闭单画面弹窗
const closeSingleVideoPopup = () => {
  destroySingleFlvPlayer();
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

// 打开摄像头视频（根据设备ID匹配摄像头）
const openCameraVideo = async (equipmentId) => {
  if (!equipmentId) return;

  // 调用详情接口获取视频地址
  // await getsbxqList(equipmentId);

  currentCamera.value = {
    name: sbxqList.value?.equipmentName || '未知设备',
    videoUrl: sbxqList.value?.playingUrl || '',
    status: 'online'
  };

  showSingleVideoPopup.value = true;

  // 等待 DOM 更新后初始化播放器
  await nextTick();
  if (currentCamera.value.videoUrl) {
    initSingleFlvPlayer();
  }
};

const closeMenus = () => {
  showMenus.value = false;
};

const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
  if (newVal) {
    const jsonRes = newVal?.json

    // 1. 处理工位/中心切换逻辑 (同步 index.vue 的参数更新)
    if (jsonRes && (jsonRes.id === 'JCZX' || jsonRes.id === 'JCGW')) {
      console.log('设备管理：收到工位切换数据', jsonRes)
      currentContractPartId.value = jsonRes.id || ''
      currentStationCode.value = jsonRes.station_code || ''

      // 参数更新后重新获取数据
      getgjtjList()
      getsbList()
    }

    // 2. 处理摄像头/设备点击事件
    if (jsonRes?.type === 'sbgl' || jsonRes?.type === 'camera') {
      const id = jsonRes?.id;
      if (id) {
        openCameraVideo(id);
      }
    }
  }
})


// 设备类型转换函数（使用 mock 文件中的函数）
const getStatusTexts = getEquipmentKindName;

// 设备列表 - 初始化为空数组
const sblist = ref([...DEFAULT_DEVICE_LIST]);

// 设备统计 - 初始化为空数组
const gjtjList = ref([...DEFAULT_DEVICE_STATS]);

// 设备统计
const getgjtjList = async () => {
  if (!currentStationCode.value) {
    if (USE_MOCK_FALLBACK) gjtjList.value = [...MOCK_DEVICE_STATS];
    return;
  }
  try {
    const res = await queryEquipmentStatistics({
      contractPartId: currentContractPartId.value,
      stationCode: currentStationCode.value,
    });
    if (res?.code === 200 && res.data) {
      gjtjList.value = res.data;
    } else if (USE_MOCK_FALLBACK) {
      gjtjList.value = [...MOCK_DEVICE_STATS];
    }
  } catch (error) {
    console.error('获取设备统计失败:', error);
    if (USE_MOCK_FALLBACK) gjtjList.value = [...MOCK_DEVICE_STATS];
  }
};

// 设备列表
const getsbList = async () => {
  if (!currentStationCode.value) {
    if (USE_MOCK_FALLBACK) sblist.value = [...MOCK_DEVICE_LIST];
    return;
  }
  try {
    const res = await queryEquipmentListPage({
      contractPartId: currentContractPartId.value,
      stationCode: currentStationCode.value,
      pageNo: 1,
      pageSize: 999,
      keyword: input3.value || ''
    });
    if (res?.code === 200 && res.data?.list?.length > 0) {
      sblist.value = res.data.list;
    } else if (USE_MOCK_FALLBACK) {
      sblist.value = [...MOCK_DEVICE_LIST];
    }
  } catch (error) {
    console.error('获取设备列表失败:', error);
    if (USE_MOCK_FALLBACK) sblist.value = [...MOCK_DEVICE_LIST];
  }
};


// 通用函数：根据摄像头ID获取视频URL并打开弹窗（与 type3.vue 一致）
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
    // 使用 typeof 检查变量是否存在，避免 ReferenceError
    const safeCameraId = typeof cameraId !== 'undefined' && cameraId ? String(cameraId) : '';

    console.log('📹 准备请求视频URL，cameraId:', safeCameraId);

    // 调用API获取视频预览URL（使用 POST 方法，与 type3.vue 一致）
    const response = await request({
      url: '/api/qydigital-park-service/qyVideoPoint/previewURLs',
      method: 'post',
      data: {
        cameraIndexCode: safeCameraId
      }
    });

    // 检查响应是否成功
    if (response && response.code === '0' && response.data && response.data.url) {
      // 将返回的URL赋值给currentCamera.videoUrl
      currentCamera.value.videoUrl = response.data.url;
      console.log('✅ 成功获取视频URL:', response.data.url);
      console.log('📊 URL类型:', response.data.url.match(/^(http|https|ws|wss):/)?.[0] || '未知协议');

      // 等待 DOM 更新后初始化播放器
      await nextTick();
      if (currentCamera.value.videoUrl) {
        initSingleFlvPlayer();
      }
    } else {
      console.warn('⚠️ 获取视频URL失败或返回数据为空:', response);
      // videoUrl保持为空，弹窗会显示"暂无视频信号"
    }
  } catch (error) {
    console.error('调用视频预览接口失败:', error);
    // videoUrl保持为空，弹窗会显示"暂无视频信号"
  } finally {
    // 无论成功或失败，都关闭加载状态
    isLoadingVideo.value = false;
  }
};


const handleRowClick = async (row) => {
  console.log(row, "设备详情");

  // 1. 打开视频弹窗 (与 type3.vue 一致)
  await fetchCameraVideoAndOpenPopup(
    row.id,
    row.equipmentName || row.countName || '摄像头',
    'online'
  );

  // 2. 获取设备详细信息并在侧边详情面板显示
  if (row.id) {
    getsbxqList(row.id);
    getsjxxList(row.id);
    getwxxxList(row.id);
    showMenus.value = true;
  }
};
// 设备列表详情 - 使用 mock 文件中的默认数据
const sbxqList = ref({ ...DEFAULT_DEVICE_DETAIL });
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const getsbxqList = async (id) => {
  if (!id) return;
  const searchParams = {
    contractPartId: currentContractPartId.value,
    stationCode: currentStationCode.value,
    id: id,
  };
  try {
    const res = await queryEquipmentDetail(searchParams);
    if (res?.code == 200) {
      sbxqList.value = res.data;
    }
  } catch (error) {
    console.error('获取设备详情失败:', error);
  }
};
//查询送检信息
const sjxx = ref([...DEFAULT_DELIVERY_LIST]);

const getsjxxList = async (id) => {
  if (!id) return;
  const searchParams = {
    contractPartId: currentContractPartId.value,
    stationCode: currentStationCode.value,
    equipmentId: id,
  };
  try {
    const res = await queryEquipmentDeliveryListPage(searchParams);
    if (res?.code == 200) {
      sjxx.value = res.data?.list || [];
    }
  } catch (error) {
    console.error('获取送检信息失败:', error);
  }
};

// 维修记录 - 使用默认 Mock 数据
const wxxxList = ref([...DEFAULT_MAINTENANCE_LIST]);

const getwxxxList = async (id) => {
  if (!id) return;
  const searchParams = {
    contractPartId: currentContractPartId.value,
    stationCode: currentStationCode.value,
    equipmentId: id,
  };
  try {
    const res = await queryEquipmentMaintenanceListPage(searchParams);
    if (res?.code == 200) {
      wxxxList.value = res.data?.list || [];
    }
  } catch (error) {
    console.error('获取维修记录失败:', error);
  }
};
onUnmounted(() => {
  // 清理所有 FLV 播放器
  // destroyFlvPlayers();
  destroySingleFlvPlayer();
  // document.removeEventListener("click", handleClickOutside);
});
onMounted(() => {
  // 从 localStorage 获取参数
  const roadinfo = localStorage.getItem('roadinfo')
  if (roadinfo && roadinfo !== 'undefined' && roadinfo !== 'null') {
    try {
      const parsed = JSON.parse(roadinfo)
      if (parsed) {
        currentContractPartId.value = parsed?.id || ''
        currentStationCode.value = parsed?.station_code || ''
      }
    } catch (error) {
      console.error('解析 roadinfo 失败:', error)
    }
  }

  // 始终调用，函数内部会处理兜底逻辑
  getgjtjList()
  getsbList()
});

let scrollInterval = null;
let isScrolling = true;
const scrollSpeed = 1;
// 获取表格body的滚动容器
const getTableBodyWrapper = () => {
  return document.querySelector(".my-spacing-table .el-table__body-wrapper");
};
// 获取正确的滚动容器
const getTableScrollContainer = () => {
  // 尝试多种可能的容器选择器
  const selectors = [
    ".el-table__body-wrapper",
    ".el-scrollbar__wrap",
    ".my-spacing-table .el-table__body-wrapper",
  ];

  for (const selector of selectors) {
    const container = document.querySelector(selector);
    if (container && container.scrollHeight > container.clientHeight) {
      return container;
    }
  }

  // 如果上述选择器都没找到，尝试从表格实例获取
  if (tableRef.value && tableRef.value.$el) {
    const bodyWrapper = tableRef.value.$el.querySelector(
      ".el-table__body-wrapper"
    );
    if (bodyWrapper) return bodyWrapper;
  }

  return null;
};
const startAutoScroll = () => {
  const tableBody = getTableScrollContainer();
  console.log(tableBody);
  if (!tableBody) {
    console.warn("未找到滚动容器，延迟重试...");
    setTimeout(startAutoScroll, 100);
    return;
  }

  // 确保容器有滚动空间
  if (tableBody.scrollHeight <= tableBody.clientHeight) {
    console.warn("表格内容不足以产生滚动");
    return;
  }

  scrollInterval = setInterval(() => {
    if (!isScrolling) return;

    const tableBody = getTableScrollContainer();
    if (!tableBody) return;

    // 如果滚动到底部，回到顶部
    if (
      tableBody.scrollTop >=
      tableBody.scrollHeight - tableBody.clientHeight - 2
    ) {
      tableBody.scrollTop = 0;
    } else {
      tableBody.scrollTop += scrollSpeed;
    }
  }, 30); // 调整间隔时间控制滚动速度
};

const pauseScroll = () => {
  isScrolling = false;
};

const resumeScroll = () => {
  isScrolling = true;
};
</script>