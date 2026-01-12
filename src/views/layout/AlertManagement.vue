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
  /* 不允许压缩 */
}

/* 表格容器填满剩余高度 */
.auto-scroll-table {
  flex: 1;
  min-height: 0;
  /* 允许 flex 子项小于内容高度 */
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
</script>

<script setup>
import { onMounted, onUnmounted, ref, watch, computed, onBeforeUnmount, inject } from "vue";
import { queryAlarmInfoStatistics, queryAlarmInfoListPage } from "@/api/user";


// 接收从 index 传入的面板状态
const props = defineProps({
  isPanelVisible: {
    type: Boolean,
    default: true
  },

})




const showMenus = ref(false);
const menuRef = ref(null);
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
  if (newVal) {
    console.log('接收到新数据:', newVal)

    if (newVal?.json.type && newVal?.json.type == 'poi') {
      showMenus.value = false
      setTimeout(() => {
        showMenus.value = true

      }, 100);

    }

  }
})
const handleClickOutside = (event) => {
  // console.log(event, menuRef.value.contains(event.target))
  if (menuRef.value && menuRef.value.contains(event.target)) {
    showMenus.value = false;
  }
};


// 表格数据
var gjtjdata = [


];

const gjtjList = ref([
  {
    alarmTypeName: "设备故障",
    alarmTypeCount: 5,
  },
  {
    alarmTypeName: "通信异常",
    alarmTypeCount: 1,
  },
  {
    alarmTypeName: "安防异常",
    alarmTypeCount: 6,
  },
  {
    alarmTypeName: "环境故障",
    alarmTypeCount: 6,
  },
]);

//告警统计
const getgjtjList = async () => {
  const searchParams = {
    contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292", //检测机构ID
    stationCode: "A1", //工位编码
  };
  const response = await queryAlarmInfoStatistics(searchParams);
  console.log(response);
  if (response.code == 200) {
    gjtjList.value = response.data;
  }
};
//告警列表（详情从列表中获取）
const getgjtjdataList = async () => {
  const searchParams = {
    contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292", //检测机构ID
    stationCode: "A1", //工位编码
  };
  const response = await queryAlarmInfoListPage(searchParams);
  console.log(response);
  if (response.code == 200) {
    gjtjdata.value = response.data?.list;
  }
};

// 滚动控制
const container = ref(null);
const offset = ref(0);
let animationFrameId = null;
let isScrolling = true;
// 计算单行高度（需根据实际样式调整）
const ROW_HEIGHT = 20;
// 滚动动画
const startScroll = () => {
  const maxOffset = gjtjdata.length * ROW_HEIGHT;

  const animate = () => {
    if (!isScrolling) return;
    offset.value += 0.6;
    // 滚动到复制数据末尾时，重置位置
    if (offset.value >= maxOffset) {
      offset.value = 0;
    }
    animationFrameId = requestAnimationFrame(animate);
  };

  animate();
};

// 暂停滚动
const pauseScroll = () => {
  isScrolling = false;
  cancelAnimationFrame(animationFrameId);
};

// 恢复滚动
const resumeScroll = () => {
  if (!isScrolling) {
    isScrolling = true;
    startScroll();
  }
};
onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  // getgjtjList();
  // getgjtjdataList();
});
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>