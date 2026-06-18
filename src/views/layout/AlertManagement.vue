<template>
  <!-- 全屏背景红色闪烁提醒 -->
  <div v-if="hasAlerts" class="screen-flash-container" :class="{ 'shake-active': isShaking }"></div>

  <div class="alert" :class="{ 'shake-active': isShaking }">
    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
      <div class="title">
        <img src="@/assets/title_bgs.png" alt="" />
        <div class="title_txet">告警统计</div>
      </div>

      <!-- 声光双重提醒状态 Banner -->
      <div v-if="hasAlerts" class="alert-status-banner">
        <span class="pulse-dot"></span>
        <span class="banner-text">
          {{ isMuted ? '警报运行中（已静音）' : '声光警报双重提醒运行中' }}
        </span>
        <button class="mute-toggle-btn" @click.stop="toggleMute">
          <span v-if="isMuted">🔊 恢复声音</span>
          <span v-else>🔇 静音提醒</span>
        </button>
      </div>

      <div class="gjtj">
        <template v-for="(value, index) in gjtjList" :key="index">
          <div class="sbgl_box">
            <img src="@/assets/图标.png" alt="" />
            <div class="sbgl_box_title">{{ value?.alarmTypeName }}</div>
            <div class="sbgl_box_text">{{ value?.alarmTypeCount }}</div>
          </div>
        </template>
      </div>

      <div class="auto-scroll-table">
        <el-table class="alertable" ref="tableRef" :data="gjtjdata" @mouseenter="pauseScroll"
          @mouseleave="resumeScroll">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="alarmTimeStr" label="告警时间" show-overflow-tooltip />
          <el-table-column prop="alarmContent" label="告警描述" show-overflow-tooltip />
          <el-table-column prop="alarmTypeName" label="告警类型" />
          <el-table-column prop="alarmLevelName" label="告警等级" width="80">
            <template #default="scope">
              <span>
                {{ scope.row.alarmLevelName }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

  <div v-if="showMenus" class="context-menu" ref="menuRef">
    <div class="context_tan">
    </div>
  </div>
</template>

<style scoped>
/* 告警统计卡片样式 */
.gjtj {
  flex-shrink: 0;
}

/* 表格容器填满剩余高度 */
.auto-scroll-table {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.alertable {
  width: 100%;
  height: 100%;
}

.context-menu {
  width: 584px;
  height: 246px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url("@/assets/图层弹窗.png") no-repeat 0 0;
  background-size: 100% 100%;
  z-index: 999;
}

/* 声光警报控制 Banner */
.alert-status-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 0, 0, 0.18);
  border: 1px solid rgba(255, 77, 77, 0.5);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.25) inset;
  padding: 8px 12px;
  border-radius: 4px;
  margin: 10px 8px 15px 8px;
  font-family: SimHei, sans-serif;
  color: #ff4d4d;
  font-size: 12px;
  backdrop-filter: blur(4px);
  z-index: 10;
  flex-shrink: 0;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #ff0000;
  border-radius: 50%;
  margin-right: 8px;
  box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  animation: pulse-dot-anim 1.2s infinite;
  display: inline-block;
  flex-shrink: 0;
}

@keyframes pulse-dot-anim {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(255, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}

.banner-text {
  flex-grow: 1;
  font-weight: bold;
}

.mute-toggle-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 77, 77, 0.6);
  color: #fff;
  padding: 4px 10px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s ease;
  outline: none;
}

.mute-toggle-btn:hover {
  background: rgba(255, 0, 0, 0.35);
  border-color: #ff4d4d;
}

/* 全屏背景红色闪烁提醒 */
.screen-flash-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 9998;
  background: rgba(255, 0, 0, 0.04);
  box-shadow: 0 0 60px rgba(255, 0, 0, 0.5) inset;
  animation: full-screen-flash-anim 2s infinite ease-in-out;
}

@keyframes full-screen-flash-anim {

  0%,
  100% {
    background-color: rgba(255, 0, 0, 0.02);
    box-shadow: 0 0 45px rgba(255, 0, 0, 0.35) inset;
  }

  50% {
    background-color: rgba(255, 0, 0, 0.16);
    box-shadow: 0 0 110px rgba(255, 0, 0, 0.8) inset;
  }
}

/* 抖动震动动画 */
@keyframes shake-anim {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  10% {
    transform: translate(-8px, -6px) rotate(-1.5deg);
  }

  20% {
    transform: translate(7px, 5px) rotate(1.5deg);
  }

  30% {
    transform: translate(-9px, 4px) rotate(-1deg);
  }

  40% {
    transform: translate(8px, -5px) rotate(1deg);
  }

  50% {
    transform: translate(-7px, 6px) rotate(-1.5deg);
  }

  60% {
    transform: translate(9px, -4px) rotate(1deg);
  }

  70% {
    transform: translate(-8px, 5px) rotate(-1deg);
  }

  80% {
    transform: translate(6px, -6px) rotate(1.5deg);
  }

  90% {
    transform: translate(-5px, 4px) rotate(-0.5deg);
  }
}

.shake-active {
  animation: shake-anim 0.6s ease-in-out;
}
</style>

<script>
export default {
  name: "AlertManagement",
};
</script>

<script setup>
import { onMounted, onUnmounted, ref, watch, inject, computed } from "vue";
import { queryAlarmInfoStatistics, queryAlarmInfoListPage } from "@/api/user";
import { DEFAULT_ALERT_STATS, DEFAULT_ALERT_LIST, MOCK_ALERT_STATS, MOCK_ALERT_LIST } from "@/constants/alertMock";

// ========== 兜底数据开关 ==========
// true = 使用兜底数据（API无数据时显示测试数据）
// false = 不使用兜底数据（API无数据时显示空）
const USE_MOCK_FALLBACK = false;
// ==================================

// 接收从 index 传入的面板状态
const props = defineProps({
  isPanelVisible: {
    type: Boolean,
    default: true
  },
})

const showMenus = ref(false);
const menuRef = ref(null);

// 动态存储参数（可从 roadinfo 获取）
const currentContractPartId = ref("1339149F529E4A228774E2B05FA97307");
const currentStationCode = ref("");

const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal) => {
  if (newVal?.json?.type === 'poi') {
    showMenus.value = false
    setTimeout(() => {
      showMenus.value = true
    }, 100);
  }
})

const handleClickOutside = (event) => {
  if (menuRef.value && menuRef.value.contains(event.target)) {
    showMenus.value = false;
  }
};

// 告警统计数据
const gjtjList = ref([...DEFAULT_ALERT_STATS]);

// 告警列表数据
const gjtjdata = ref([...DEFAULT_ALERT_LIST]);

// ========== 声光警报与语音提示逻辑 ==========
const isMuted = ref(false);
const hasAlerts = computed(() => gjtjdata.value && gjtjdata.value.length > 0);
const isShaking = ref(false);

let alarmAudioInterval = null;
let speechInterval = null;
let soundTimeout = null;
let isAudioUnlocked = false;

// 触发画面震动效果
const triggerShake = () => {
  isShaking.value = false;
  // 通过延时重置类来重新触发 CSS 动画
  setTimeout(() => {
    isShaking.value = true;
    setTimeout(() => {
      isShaking.value = false;
    }, 600); // 对应 shake-anim 动画时长
  }, 20);
};

// 播放合成音效警报（双音调正弦/锯齿波警报音）
const playSynthSiren = () => {
  if (isMuted.value) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioCtx = new AudioContextClass();

    // 检查并恢复可能被挂起的 AudioContext
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sine';

    const now = audioCtx.currentTime;

    // 警报声频率渐变（扫频效果）
    osc1.frequency.setValueAtTime(600, now);
    osc1.frequency.linearRampToValueAtTime(900, now + 0.4);
    osc1.frequency.linearRampToValueAtTime(600, now + 0.8);

    osc2.frequency.setValueAtTime(590, now);
    osc2.frequency.linearRampToValueAtTime(890, now + 0.4);
    osc2.frequency.linearRampToValueAtTime(590, now + 0.8);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.85);
    osc2.stop(now + 0.85);
  } catch (e) {
    console.warn('播放警报声失败，可能需要用户先交互页面:', e);
  }
};

// 播报语音报警提示
const speakAlarmMessage = () => {
  if (isMuted.value) return;
  try {
    if ('speechSynthesis' in window) {
      // 取消当前正在进行的播放，避免积压延迟
      window.speechSynthesis.cancel();

      const text = `警告！系统检测到有未处理的设备告警，请及时处理。`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.volume = 0.9;
      utterance.rate = 1.55; // 稍微快速体现紧急性
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.warn('语音报警播放失败:', e);
  }
};

// 开启定时提醒
const startAlarmReminders = () => {
  stopAlarmReminders();
  if (!hasAlerts.value) return;

  // 首次立即尝试播放与震动
  triggerShake();
  playSynthSiren();
  speakAlarmMessage();

  // 定时器：每4秒响一次警报音，并触发画面震动
  alarmAudioInterval = setInterval(() => {
    triggerShake();
    if (!isMuted.value && hasAlerts.value) {
      playSynthSiren();
    }
  }, 4000);

  // 定时器：每12秒播报一次语音
  speechInterval = setInterval(() => {
    if (!isMuted.value && hasAlerts.value) {
      speakAlarmMessage();
    }
  }, 12000);

  // 语音与音效警报响 20 秒后自动停止（足够播放 2 次语音），但全屏红闪与震动控制逻辑保持
  soundTimeout = setTimeout(() => {
    if (alarmAudioInterval) {
      clearInterval(alarmAudioInterval);
      alarmAudioInterval = null;
    }
    if (speechInterval) {
      clearInterval(speechInterval);
      speechInterval = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    console.log("声音警报已播放20秒，自动静音，红闪继续保留。");
  }, 20000);
};

// 停止定时提醒
const stopAlarmReminders = () => {
  if (alarmAudioInterval) {
    clearInterval(alarmAudioInterval);
    alarmAudioInterval = null;
  }
  if (speechInterval) {
    clearInterval(speechInterval);
    speechInterval = null;
  }
  if (soundTimeout) {
    clearTimeout(soundTimeout);
    soundTimeout = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// 切换静音状态
const toggleMute = () => {
  isMuted.value = !isMuted.value;
  if (isMuted.value) {
    stopAlarmReminders();
  } else {
    // 强制标记已解锁并开始播报
    isAudioUnlocked = true;
    startAlarmReminders();
  }
};

// 监听用户点击解锁浏览器音频限制
const handleUserInteraction = () => {
  if (!isAudioUnlocked) {
    isAudioUnlocked = true;
    if (hasAlerts.value && !isMuted.value) {
      startAlarmReminders();
    }
  }
};

// 监听告警列表变化
watch(gjtjdata, (newVal) => {
  if (newVal && newVal.length > 0) {
    // 如果已经有用户交互解锁，直接开始；否则静候第一次交互触发
    if (isAudioUnlocked) {
      startAlarmReminders();
    }
  } else {
    stopAlarmReminders();
  }
}, { deep: true, immediate: true });
// ============================================

// 告警统计
const getgjtjList = async () => {
  if (!currentStationCode.value) {
    if (USE_MOCK_FALLBACK) gjtjList.value = [...MOCK_ALERT_STATS];
    return;
  }
  try {
    const response = await queryAlarmInfoStatistics({
      contractPartId: currentContractPartId.value,
      stationCode: currentStationCode.value,
    });
    if (response?.code === 200 && response.data) {
      gjtjList.value = response.data;
    } else if (USE_MOCK_FALLBACK) {
      gjtjList.value = [...MOCK_ALERT_STATS];
    } else {
      gjtjList.value = []
    }
  } catch (error) {
    console.error('获取告警统计失败:', error);
    if (USE_MOCK_FALLBACK) gjtjList.value = [...MOCK_ALERT_STATS];
  }
};

// 告警列表
const getgjtjdataList = async () => {
  if (!currentStationCode.value) {
    if (USE_MOCK_FALLBACK) gjtjdata.value = [...MOCK_ALERT_LIST];
    return;
  }
  try {
    const response = await queryAlarmInfoListPage({
      contractPartId: currentContractPartId.value,
      stationCode: currentStationCode.value,
    });
    if (response?.code === 200 && response.data?.list) {
      gjtjdata.value = response.data.list;
    } else if (USE_MOCK_FALLBACK) {
      gjtjdata.value = [...MOCK_ALERT_LIST];
    } else {
      gjtjdata.value = [];
    }
  } catch (error) {
    console.error('获取告警列表失败:', error);
    if (USE_MOCK_FALLBACK) gjtjdata.value = [...MOCK_ALERT_LIST];
  }
};

// 滚动控制
const container = ref(null);
const offset = ref(0);
let animationFrameId = null;
let isScrolling = true;
const ROW_HEIGHT = 20;

const startScroll = () => {
  const maxOffset = gjtjdata.value.length * ROW_HEIGHT;
  const animate = () => {
    if (!isScrolling) return;
    offset.value += 0.6;
    if (offset.value >= maxOffset) {
      offset.value = 0;
    }
    animationFrameId = requestAnimationFrame(animate);
  };
  animate();
};

const pauseScroll = () => {
  isScrolling = false;
  cancelAnimationFrame(animationFrameId);
};

const resumeScroll = () => {
  if (!isScrolling) {
    isScrolling = true;
    startScroll();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("click", handleUserInteraction);

  // 自动检测浏览器是否已经在当前页（Tab）解锁了音频环境
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      const tempCtx = new AudioContextClass();
      if (tempCtx.state === 'running') {
        isAudioUnlocked = true;
      }
      tempCtx.close();
    }
  } catch (e) {
    console.warn('自动检测音频解锁失败:', e);
  }

  // 从 localStorage 获取参数
  const roadinfo = localStorage.getItem('roadinfo')
  if (roadinfo && roadinfo !== 'undefined' && roadinfo !== 'null') {
    try {
      const parsed = JSON.parse(roadinfo)
      if (parsed) {
        // currentContractPartId.value = parsed?.id || ''
        currentStationCode.value = parsed?.station_code || ''

        // 始终调用，函数内部会处理兜底逻辑
        getgjtjList()
        getgjtjdataList()
      }
    } catch (error) {
      console.error('解析 roadinfo 失败:', error)
      getgjtjList()
      getgjtjdataList()
    }
  } else {
    getgjtjList()
    getgjtjdataList()
  }

  // 如果浏览器音频已解锁，且加载了告警数据，重新进入页面时会再次响 10 秒并自动静音
  if (isAudioUnlocked && hasAlerts.value) {
    startAlarmReminders();
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("click", handleUserInteraction);
  cancelAnimationFrame(animationFrameId);
  stopAlarmReminders();
});
</script>