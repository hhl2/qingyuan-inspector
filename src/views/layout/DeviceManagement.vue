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
import { onMounted, onUnmounted, watch, inject, ref, computed, onBeforeUnmount, nextTick } from "vue";
import flvjs from "flv.js";
import request from '@/utils/request';
import {
  queryEquipmentStatistics,
  queryEquipmentListPage,
  queryEquipmentDeliveryListPage,
  queryEquipmentDetail,
  queryEquipmentMaintenanceListPage,
} from "@/api/user";

// 接收从 index 传入的面板状态
const props = defineProps({
  isPanelVisible: {
    type: Boolean,
    default: true
  },

})



const showMenus = ref(false);
// const showVideoPopup = ref(false);  // 多画面弹窗
const showSingleVideoPopup = ref(false);  // 单画面弹窗
const isLoadingVideo = ref(false); // 视频加载状态
const menuRef = ref(null);
const menuRefSingle = ref(null);
const input3 = ref("");

// FLV 播放器相关引用
// 多画面播放器（动态数组）
// const videoElements = ref([]);
// const flvPlayers = ref([]);

// 单画面播放器（1个）
const videoElementSingle = ref(null);
const flvPlayerSingle = ref(null);

// 设置video元素引用
// const setVideoRef = (el, index) => {
//   if (el) {
//     videoElements.value[index] = el;
//   }
// };

// 当前要显示的摄像头（显示所有在线摄像头）
// const displayCameras = ref([]);

// 初始化要显示的摄像头
// const initDisplayCameras = () => {
//   // 显示所有在线摄像头
//   const onlineCameras = cameraList.value.filter(cam => cam.status === 'online');
//   displayCameras.value = onlineCameras;
//   // 初始化播放器数组
//   videoElements.value = [];
//   flvPlayers.value = new Array(onlineCameras.length).fill(null);
// };

// 当前选中的摄像头信息（初始化为第一个 FLV 摄像头）
const currentCamera = ref({
  id: 'cam001',
  name: '变压器检测工位摄像头',
  videoUrl: 'http://10.145.223.230:8080/live/camera01.flv',
  location: '变压器流水线检测工位',
  status: 'online'
});

// 摄像头列表模拟数据（实际项目中从后端获取）
// 使用内网 FLV 流服务器：10.145.223.230
const cameraList = ref([
  {
    id: 'cam001',
    name: '变压器检测工位摄像头',
    // 内网 FLV 流地址 - 摄像头1
    videoUrl: 'http://10.145.223.230:8080/live/camera01.flv',
    location: '变压器流水线检测工位',
    status: 'online',
    type: 'flv',
    description: 'FLV 格式实时监控流'
  },
  {
    id: 'cam002',
    name: '电缆工位摄像头',
    // 内网 FLV 流地址 - 摄像头2
    videoUrl: 'http://10.145.223.230:8080/live/camera02.flv',
    location: '电缆保护管智能制样检测工位',
    status: 'online',
    type: 'flv',
    description: 'FLV 格式实时监控流'
  },
  {
    id: 'cam003',
    name: '批量避雷器工位摄像头',
    // 内网 FLV 流地址 - 摄像头3
    videoUrl: 'http://10.145.223.230:8080/live/camera03.flv',
    location: '批量避雷器检测工位',
    status: 'online',
    type: 'flv',
    description: 'FLV 格式实时监控流'
  },
  {
    id: 'cam004',
    name: '柱上开关工位摄像头',
    // 内网 FLV 流地址 - 摄像头4
    videoUrl: 'http://10.145.223.230:8080/live/camera04.flv',
    location: '柱上开关自动化检测工位',
    status: 'online',
    type: 'flv',
    description: 'FLV 格式实时监控流'
  },
  {
    id: 'cam005',
    name: '短路试验区摄像头',
    // 内网 FLV 流地址 - 摄像头5
    videoUrl: 'http://10.145.223.230:8080/live/camera05.flv',
    location: '短路承受能力试验区',
    status: 'online',
    type: 'flv',
    description: 'FLV 格式实时监控流'
  },
  {
    id: 'cam006',
    name: '一二次融合工位摄像头',
    // 内网 FLV 流地址 - 摄像头6
    videoUrl: 'http://10.145.223.230:8080/live/camera06.flv',
    location: '一、二次融合设备检测工位',
    status: 'online',
    type: 'flv',
    description: 'FLV 格式实时监控流'
  },
  {
    id: 'cam007',
    name: '厂区入口安防摄像头',
    // 内网 FLV 流地址 - 安防摄像头
    videoUrl: 'http://10.145.223.230:8080/live/security01.flv',
    location: '厂区主入口',
    status: 'online',
    type: 'flv',
    description: 'FLV 格式安防监控流'
  },
  {
    id: 'cam008',
    name: '环境监测摄像头',
    videoUrl: '', // 模拟离线状态
    location: '环境监测站',
    status: 'offline',
    type: 'unknown',
    description: '摄像头离线'
  },
  {
    id: 'cam009',
    name: '仓库区域摄像头',
    // 内网 FLV 流地址 - 仓库摄像头
    videoUrl: 'http://10.145.223.230:8080/live/warehouse.flv',
    location: '样品仓库区',
    status: 'online',
    type: 'flv',
    description: 'FLV 格式实时监控流'
  },
  {
    id: 'cam010',
    name: '检测大厅全景摄像头',
    // 内网 FLV 流地址 - 大厅摄像头
    videoUrl: 'http://10.145.223.230:8080/live/hall.flv',
    location: '检测大厅中央',
    status: 'online',
    type: 'flv',
    description: 'FLV 格式全景监控流'
  }
]);

// 初始化所有 FLV 播放器（动态数量）
/* const initFlvPlayers = async () => {
  //销毁旧的播放器实例
  destroyFlvPlayers();

  // 等待 DOM 更新
  await nextTick();

  // 检查浏览器是否支持 FLV
  if (!flvjs.isSupported()) {
    console.error('您的浏览器不支持 FLV 播放');
    return;
  }

  // 为每个摄像头初始化播放器
  for (let i = 0; i < displayCameras.value.length; i++) {
    const camera = displayCameras.value[i];
    const videoElement = videoElements.value[i];

    if (!camera || !camera.videoUrl || !videoElement) {
      console.warn(`摄像头${i + 1}无效或video元素不存在`);
      continue;
    }

    try {
      const videoUrl = camera.videoUrl;
      const isFlv = videoUrl.toLowerCase().includes('.flv') || videoUrl.toLowerCase().includes('flv');

      if (isFlv) {
        // 创建 FLV 播放器
        flvPlayers.value[i] = flvjs.createPlayer({
          type: 'flv',
          url: videoUrl,
          isLive: true,
          hasAudio: true,
          hasVideo: true,
          cors: true,
          enableWorker: true,
          enableStashBuffer: false,
          stashInitialSize: 128
        }, {
          enableWorker: true,
          enableStashBuffer: false,
          lazyLoadMaxDuration: 3 * 60,
          seekType: 'range',
        });

        // 绑定到 video 元素
        flvPlayers.value[i].attachMediaElement(videoElement);

        // 添加错误监听
        flvPlayers.value[i].on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
          console.error(`摄像头${i + 1} FLV 播放错误:`, errorType, errorDetail, errorInfo);
        });

        // 加载并播放
        flvPlayers.value[i].load();
        flvPlayers.value[i].play().catch(err => {
          console.error(`摄像头${i + 1}播放失败:`, err);
        });

        console.log(`摄像头${i + 1} FLV 播放器初始化成功`);
      } else {
        // 非 FLV 格式，使用原生 video 播放
        console.log(`摄像头${i + 1}使用原生 video 播放`);
        videoElement.src = videoUrl;
        videoElement.play().catch(err => {
          console.error(`摄像头${i + 1}原生视频播放失败:`, err);
        });
      }
    } catch (error) {
      console.error(`摄像头${i + 1}初始化失败:`, error);
    }
  }
}; */

// 销毁所有 FLV 播放器
/* const destroyFlvPlayers = () => {
  for (let i = 0; i < flvPlayers.value.length; i++) {
    if (flvPlayers.value[i]) {
      try {
        flvPlayers.value[i].pause();
        flvPlayers.value[i].unload();
        flvPlayers.value[i].detachMediaElement();
        flvPlayers.value[i].destroy();
        flvPlayers.value[i] = null;
      } catch (error) {
        console.error(`销毁播放器${i + 1}时出错:`, error);
        flvPlayers.value[i] = null;
      }
    }
  }
  console.log('所有 FLV 播放器已销毁');
}; */

// 初始化单画面 FLV 播放器
const initSingleFlvPlayer = async () => {
  // 销毁旧的播放器
  destroySingleFlvPlayer();

  await nextTick();

  if (!videoElementSingle.value || !currentCamera.value.videoUrl) {
    console.warn('单画面视频元素或 URL 不存在');
    return;
  }

  if (!flvjs.isSupported()) {
    console.error('您的浏览器不支持 FLV 播放');
    return;
  }

  try {
    const videoUrl = currentCamera.value.videoUrl;
    const isFlv = videoUrl.toLowerCase().includes('.flv') || videoUrl.toLowerCase().includes('flv');

    if (isFlv) {
      flvPlayerSingle.value = flvjs.createPlayer({
        type: 'flv',
        url: videoUrl,
        isLive: true,
        hasAudio: true,
        hasVideo: true,
        cors: true,
        enableWorker: true,
        enableStashBuffer: false,
        stashInitialSize: 128
      }, {
        enableWorker: true,
        enableStashBuffer: false,
        lazyLoadMaxDuration: 3 * 60,
        seekType: 'range',
      });

      flvPlayerSingle.value.attachMediaElement(videoElementSingle.value);

      flvPlayerSingle.value.on(flvjs.Events.ERROR, (errorType, errorDetail, errorInfo) => {
        console.error('单画面 FLV 播放错误:', errorType, errorDetail, errorInfo);
      });

      flvPlayerSingle.value.load();
      flvPlayerSingle.value.play().catch(err => {
        console.error('单画面播放失败:', err);
      });

      console.log('单画面 FLV 播放器初始化成功');
    } else {
      console.log('单画面使用原生 video 播放');
      videoElementSingle.value.src = videoUrl;
      videoElementSingle.value.play().catch(err => {
        console.error('单画面原生视频播放失败:', err);
      });
    }
  } catch (error) {
    console.error('单画面初始化失败:', error);
  }
};

// 销毁单画面 FLV 播放器
const destroySingleFlvPlayer = () => {
  if (flvPlayerSingle.value) {
    try {
      flvPlayerSingle.value.pause();
      flvPlayerSingle.value.unload();
      flvPlayerSingle.value.detachMediaElement();
      flvPlayerSingle.value.destroy();
      flvPlayerSingle.value = null;
      console.log('单画面 FLV 播放器已销毁');
    } catch (error) {
      console.error('销毁单画面播放器时出错:', error);
      flvPlayerSingle.value = null;
    }
  }
};

// 打开多画面监控（按钮点击）
/* const openMultiView = async () => {
  showVideoPopup.value = true;
  initDisplayCameras();
  await nextTick();
  initFlvPlayers();
}; */

// 关闭多画面弹窗
/* const closeVideoPopup = () => {
  destroyFlvPlayers();
  showVideoPopup.value = false;
  currentCamera.value = {
    id: '',
    name: '',
    videoUrl: '',
    location: '',
    status: 'online'
  };
}; */

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
const menuRef2 = ref(null);
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
  if (newVal) {
    console.log('设备管理接收到UE数据:', newVal)

    // 处理摄像头/设备点击事件
    if (newVal?.json?.type === 'sbgl' || newVal?.json?.type === 'camera') {
      const id = newVal?.json?.id;
      if (id) {
        openCameraVideo(id);
      }
    }
  }
})
const handleClickOutside = (event) => {
  if (menuRef2.value && menuRef2.value.contains(event.target)) {
    // showVideoPopup.value = false;
  }
};


// 设备类型转换函数
const getStatusTexts = (status) => {
  const statusMap = {
    1: "检测设备",
    2: "环境设备",
    3: "安防设备",
  };
  return statusMap[status] || "未知设备";
};
const sblist = ref([
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    index: 1,
    equipmentName: "摄像头1",
    equipmentKindName: "安防监控",
    equipmentMonitoringPoint: "工位1号检测点",
    countName: "正常",
  },
]);
const gjtjList = ref([
  {
    equipmentKind: 1,
    equipmentKindCount: 4,
  },
  {
    equipmentKind: 2,
    equipmentKindCount: 6,
  },
  {
    equipmentKind: 3,
    equipmentKindCount: 4,
  },
]);

//设备统计
const getgjtjList = async () => {
  const searchParams = {
    contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292", //检测机构ID
    stationCode: "A1", //工位编码
  };
  const res = await queryEquipmentStatistics(searchParams);
  console.log(res);
  if (res?.code == 200) {
    gjtjList.value = res.data;

  }

};

//设备列表
const getsbList = async () => {
  const searchParams = {
    contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292", //检测机构ID
    stationCode: "A1", //工位编码
    pageNo: 1,
    pageSize: 999,
    keyword: input3.value ? input3.value : ''
  };
  const res = await queryEquipmentListPage(searchParams);
  console.log(res);
  if (res?.code == 200) {
    sblist.value = res.data?.list ? res.data?.list : [];


  }
};

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
};

const handleRowClick = async (row) => {
  console.log(row, "设备详情");

  // 调用通用函数，传入行数据中的id、名称和状态
  await fetchCameraVideoAndOpenPopup(
    row.id,
    row.equipmentName || row.countName || '摄像头',
    'online'
  );
};
//设备列表详情
const sbxqList = ref({
  id: "08D502EA849745FA8E0B8D4EAEFBA3C9",
  equipmentCode: "YQUPSDY007",
  equipmentName: "直流源",
  equipmentStatus: null,
  equipmentStatusName: null,
  equipmentKind: null,
  equipmentKindName: null,
  equipmentMonitoringPoint: null,
  supplier: null,
  responsibilityPerson: null,
  responsibilityPersonPhone: null,
  equipmentType: null,
  equipmentFunction: null,
  mainParam: null,
  stationId: "7A37A22941F54811B01511CAFBFB827D",
  stationCode: null,
  stationName: null,
  responsibilityDepartment: null,
  factoryCode: null,
  stationEquipmentId: null,
  productionDate: null,
  playingUrl: null,
});
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const getsbxqList = async (id) => {
  const searchParams = {
    contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292",
    stationCode: "A1",
    id: id,
  };
  const res = await queryEquipmentDetail(searchParams);
  console.log(res.data, "res");
  if (res?.code == 200) {
    sbxqList.value = res.data;

  }

  console.log(sbxqList.value);
};
//查询送检信息

const sjxx = ref([
  {
    id: "08D502EA849745FA8E0B8D4EAEFBA3C91",
    equipmentId: "08D502EA849745FA8E0B8D4EAEFBA3C9",
    detectDepartment: "XXXX",
    nextDeliveryDateStr: "2025-10-30 12:00:00",
  },
]);

const getsjxxList = async (id) => {
  const searchParams = {
    contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292",
    stationCode: "A1",
    equipmentId: id,
  };
  const res = await queryEquipmentDeliveryListPage(searchParams);
  console.log(res);
  if (res?.code == 200) {

    sjxx.value = res.data?.list ? res.data?.list : [];
  }

};

const wxxxList = ref([
  {
    equipmentMaintenanceContent: "",
    equipmentMaintenanceDateStr: "2025-09-25",
    maintenanceDepartment: "",
    maintenancePerson: "张玉树",
    contact: "19120618464",
  },
]);

const getwxxxList = async (id) => {
  const searchParams = {
    contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292",
    stationCode: "A1",
    equipmentId: id,
  };
  const res = await queryEquipmentMaintenanceListPage(searchParams);
  console.log(res);
  if (res?.code == 200) {
    wxxxList.value = res.data?.list ? res.data?.list : [];

  }

};
onUnmounted(() => {
  // 清理所有 FLV 播放器
  // destroyFlvPlayers();
  destroySingleFlvPlayer();
  // document.removeEventListener("click", handleClickOutside);
});
onMounted(() => {
  // 初始化要显示的摄像头列表
  // initDisplayCameras();
  // getgjtjList();
  // getsbList();
  // document.addEventListener("click", handleClickOutside);
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