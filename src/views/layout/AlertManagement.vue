<template>
  <div class="alert">
    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
      <div class="title">
        <img src="@/assets/title_bgs.png" alt="" />
        <div class="title_txet">告警统计</div>
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
</style>

<script>
export default {
  name: "AlertManagement",
};
</script>

<script setup>
import { onMounted, onUnmounted, ref, watch, inject } from "vue";
import { queryAlarmInfoStatistics, queryAlarmInfoListPage } from "@/api/user";
import { DEFAULT_ALERT_STATS, DEFAULT_ALERT_LIST, MOCK_ALERT_STATS, MOCK_ALERT_LIST } from "@/constants/alertMock";

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

const showMenus = ref(false);
const menuRef = ref(null);

// 动态存储参数（可从 roadinfo 获取）
const currentContractPartId = ref("");
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

  // 从 localStorage 获取参数
  const roadinfo = localStorage.getItem('roadinfo')
  if (roadinfo && roadinfo !== 'undefined' && roadinfo !== 'null') {
    try {
      const parsed = JSON.parse(roadinfo)
      if (parsed) {
        currentContractPartId.value = parsed?.id || ''
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
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  cancelAnimationFrame(animationFrameId);
});
</script>