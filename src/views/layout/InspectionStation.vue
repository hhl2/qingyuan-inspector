<template>
  <div class="scale-container">
    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
      <div class="panel-content">
        <div class="title">
          <img src="@/assets/title_bgs.png" alt="" />
          <div class="title_txet">{{ gcgwList?.stationName }}</div>
        </div>
        <div class="xbt">
          <img src="@/assets/xbt.png" />
          <div class="xbt_text">工位简介</div>
          <div class="play-button" @click="showMenusbox()">
            <div class="play-icon"></div>
          </div>
        </div>
        <div class="jcgw">
          <span>{{ gcgwList?.stationIntroduction }}</span>
        </div>
        <div class="xbt">
          <img src="@/assets/xbt.png" />
          <div class="xbt_text">工位状态</div>
        </div>

        <div class="gwxx">
          <div class="gwxx_box">
            <span class="gwxx_label">工&nbsp;位&nbsp;状&nbsp;态&nbsp;:&nbsp;&nbsp;</span>
            <div class="gwxx_text changeLabelColor">
              {{ gcgwList?.stationStatusName }}
            </div>
          </div>
          <div class="gwxx_box">
            <span class="gwxx_label">仪&nbsp;器&nbsp;设&nbsp;备&nbsp;:&nbsp;</span>
            <div class="gwxx_text">
              {{ gcgwList?.equipmentName }}
            </div>
          </div>
        </div>

        <div class="xbt">
          <img src="@/assets/xbt.png" />
          <div class="xbt_text">检测能力</div>
        </div>

        <el-tooltip :content="gcgwList?.detectItemName" effect="light">
          <div class="jcnl"> {{ gcgwList?.detectItemName }}</div>
        </el-tooltip>

        <div class="data-cards">
          <div class="data-card">
            <img src="@/assets/icon.png" alt="图标" />
            <div class="card-content">
              <div class="card-value total">{{ gcgwList?.detectCount }}</div>
              <div class="card-label">总样品检测量</div>
            </div>
          </div>

          <div class="data-card">
            <img src="@/assets/icon.png" alt="图标" />
            <div class="card-content">
              <div class="card-value month">{{ gcgwList?.detectMonthCount }}</div>
              <div class="card-label">本月样品检测量</div>
            </div>
          </div>

          <div class="data-card">
            <img src="@/assets/icon.png" alt="图标" />
            <div class="card-content">
              <div class="card-value year">{{ gcgwList?.detectYearCount }}</div>
              <div class="card-label">本年样品检测量</div>
            </div>
          </div>

          <div class="data-card">
            <img src="@/assets/icon.png" alt="图标" />
            <div class="card-content">
              <div class="card-value Day">{{ gcgwList?.detectDayCount }}</div>
              <div class="card-label">&nbsp;&nbsp;日样品检测量&nbsp;&nbsp;</div>
            </div>
          </div>
        </div>

        <div class="xbt">
          <img src="@/assets/xbt.png" />
          <div class="xbt_text">创新设计</div>
        </div>
        <div class="cxsj">
          <span> {{ gcgwList?.innovativeDesign }}</span>
        </div>
        <div class="xbt">
          <img src="@/assets/xbt.png" />
          <div class="xbt_text">数据同步</div>
        </div>
        <div class="sjtbs">
          <div class="sjtb">
            <div class="sjtb_icon1" :class="icon1Class"></div>
            <div class="sjtb_icon2" :class="icon2Class"></div>
            <div class="sjtb_icon3" :class="icon3Class"></div>
          </div>

          <div class="sjtb_boxs">
            <span>检测工位</span>
            <span>检测平台</span>
            <span>数字孪生</span>
          </div>

          <div class="tb_box">
            <div class="tb_box_label">
              <div class="red_icon_small"></div>
              <span>未同步</span>
            </div>
            <div class="tb_box_label">
              <div class="blue_icon_small"></div>
              <span>已同步</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right" :class="{ 'panel-collapsed': !isPanelVisible }">
      <div class="panel-content">
        <div class="title">
          <img src="@/assets/title_bgs.png" alt="" />
          <div class="title_txet">检测任务</div>
        </div>
        <div v-show="!showxq">
          <div class="jcrw">
            <div class="jcrw_box_li" :class="{ active: changpd == 'ing' }" @click="changepdlist('ing')">
              <img :src="imageMap2[changpd == 'ing' ? 'active' : 'default']" alt="" />
              <div class="jcrw_box_text">排队中</div>
            </div>

            <div class="jcrw_box_li" :class="{ active: changpd == 'wait' }" @click="changepdlist('wait')">
              <img :src="imageMap2[changpd === 'wait' ? 'active' : 'default']" alt="" />
              <div class="jcrw_box_text">进行中</div>
            </div>

            <div class="jcrw_box_li" :class="{ active: changpd == 'finish' }" @click="changepdlist('finish')">
              <img :src="imageMap2[changpd == 'finish' ? 'active' : 'default']" alt="" />
              <div class="jcrw_box_text">已完成</div>
            </div>
          </div>
          <div class="jcrw_list" v-for="(value, index) in jcrwLists" :key="index">
            <div class="jcrwright">
              <div class="jcrw_title">
                <span>检测任务编号：</span>
                <el-tooltip :content="value?.taskCode" effect="light">
                  <span class="jcrw_title_num">{{ value.taskCode }}</span>
                </el-tooltip>
              </div>
              <div class="jcrws_box">
                <span class="jcrws_label">抽检单号：</span>
                <el-tooltip :content="value?.samplingPlanCode" effect="light">
                  <div class="jcrws_text">{{ value.samplingPlanCode }}</div>
                </el-tooltip>

                <span class="jcrws_label">采购合同编码：</span>
                <el-tooltip :content="value?.contractCode" effect="light">
                  <div class="jcrws_text">
                    {{ value.contractCode }}
                  </div>
                </el-tooltip>
              </div>
              <div class="jcrws_box">
                <span class="jcrws_label">任务优先级：</span>
                <div class="jcrws_text">
                  {{ value.taskPriorityName }}
                </div>
                <span class="jcrws_label">框架合同编码：</span>
                <div class="jcrws_text">
                  {{ value.outlineContractCode }}
                </div>
              </div>
              <div class="jcrws_box">
                <span class="jcrws_label">供应商名称：</span>
                <div class="jcrws_text">
                  {{ value.supplierName }}
                </div>
              </div>
              <div class="jcrws_box">
                <span class="jcrws_label">品类合格率：</span>
                <div class="changbigcolor">
                  {{ value.classifyQualificationRate }}
                </div>
                <span class="jcrws_label">规格型号：</span>
                <div class="jcrws_text">
                  {{ value.spec }}
                </div>
              </div>
              <div class="jcrws_box">
                <span class="jcrws_label">物资名称：</span>
                <el-tooltip :content="value?.materialName" effect="light">
                  <div class="jcrws_text">
                    {{ value.materialName }}
                  </div>
                </el-tooltip>

                <span class="jcrws_label">检测结果：</span>
                <div class="changbigcolor">
                  {{ value.taskResultName }}
                </div>
              </div>
              <div class="jcrws_bottom">
                <div class="jcrws_bottom_box">
                  <div class="jcrws_bottom_label">检测进度</div>
                  <div class="progress-container">
                    <div class="progress-bar" :style="{ width: value.detectProgressStr ? value.detectProgressStr : 0 }">
                    </div>
                  </div>
                  <div class="jcrws_bottom_text">
                    {{ value.detectProgressStr ? value.detectProgressStr : 0 }}%
                  </div>
                </div>
                <div class="jcrws_bottom_button" @click.stop="changeXqList(value)">
                  检测详情
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="jcrwright_box" v-if="showxq">
          <div class="jcrw_title_back" @click.stop="changeXqback()">返回</div>
          <template v-for="(value, index) in jcrwxqList" :key="index">
            <div class="jcrwright" style="margin-bottom: 5px">
              <div class="jcrw_title">
                <span>检测单计划单号：</span>
                <el-tooltip :content="value?.planCode" effect="light">
                  <span class="jcrw_title_num">{{ value.planCode }}</span>
                </el-tooltip>
              </div>
              <div class="jcrws_boxs">
                <span class="jcrws_label">检测结果：</span>
                <div class="changbigcolor">{{ value.testResultName }}</div>
                <span class="jcrws_label">样品编码：</span>
                <el-tooltip :content="value?.sampleCode" effect="light">
                  <div class="jcrws_text">
                    {{ value.sampleCode }}
                  </div>
                </el-tooltip>
              </div>
              <div class="jcrws_boxs">
                <span class="jcrws_label">样品名称：</span>
                <div class="jcrws_text">
                  {{ value.planCode }}
                </div>
                <span class="jcrws_label">实物编码：</span>
                <div class="jcrws_text">
                  {{ value.entityCode }}
                </div>
              </div>

              <div class="jcrws_boxs">
                <span class="jcrws_label">出厂编码：</span>
                <div class="jcrws_text">
                  {{ value?.factorySerialCode }}
                </div>
                <span class="jcrws_label">计划状态：</span>
                <div class="changbigcolor">
                  {{ value?.planProcessStatusName }}
                </div>
              </div>
              <div class="jcrws_boxs">
                <span class="jcrws_label">原库位：</span>
                <div class="jcrws_text">
                  {{ value?.originalLocation }}
                </div>
                <span class="jcrws_label">新库位：</span>
                <div class="jcrws_text">
                  {{ value?.newLocation }}
                </div>
              </div>
              <div class="jcrws_bottom">
                <div class="jcrws_bottom_box">
                  <div class="jcrws_bottom_label">检测进度</div>
                  <div class="progress-container">
                    <div class="progress-bar" :style="{ width: value.detectProgressStr }"></div>
                  </div>
                  <div class="jcrws_bottom_text">
                    {{ value.detectProgressStr }}
                  </div>
                </div>
              </div>

              <div class="jcrws_boxs">
                <span class="jcrws_label">实际开始时间：</span>
                <div class="jcrws_texts">
                  {{ value.actualTestStartTimeStr }}
                </div>
              </div>

              <div class="jcrws_boxs">
                <span class="jcrws_label">实际结束时间：</span>
                <div class="jcrws_texts">
                  {{ value.actualTestEndTimeStr }}
                </div>
              </div>

              <div class="auto-scroll-table">
                <el-table class="my-spacing-table" ref="tableRef" :data="value?.lstDetectPlanResult" height="140"
                  style="width: 410px; margin: 5px 0px">
                  <el-table-column type="index" label="序号" width="60" />
                  <el-table-column prop="detectionProjectName" label="检测项目" show-overflow-tooltip />
                  <el-table-column prop="stationName" label="检测工位" show-overflow-tooltip />
                  <el-table-column prop="finalTestResultName" label="检测结果">
                    <template #default="scope">
                      <span :class="[
                        'status-badge',
                        scope.row.finalTestResultName == '合格'
                          ? 'status-normal'
                          : 'status-abnormal',
                      ]">
                        {{ scope.row.finalTestResultName }}
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div v-if="showMenus" class="context-menu" ref="menuRef">
      <div class="sxtmName">
        <div class="close-popup" @click="closeMenus">×</div>
      </div>
      <div class="context_tan">
        <!-- 视频播放 -->
        <video v-if="videoSrc" ref="videoPlayer" style="width: 100%; height: 100%" :src="videoSrc" controls autoplay
          muted loop playsinline class="animated-video"></video>
        <!-- 无视频时显示占位 -->
        <div v-else class="no-video">
          <span>暂无视频信号</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Inspection", // 检测工位
};
</script>

<script setup>
import jcrw from "@/assets/jcrw.png";
import njcrw from "@/assets/njcrw.png";
import { onMounted, onUnmounted, ref, computed, inject } from "vue";
import {
  queryDetectStationInfo,
  queryDetectTaskListPage,
  queryDetectPlanInfoListPage,
} from "@/api/user";
import { DEFAULT_GCGW_DATA, getVideoBasePath, VIDEO_NAME_MAP, MOCK_GCGW_DATA, MOCK_JCRW_LIST, MOCK_JCRWXQ_LIST } from "@/constants/inspectionMock";

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

// 视频路径计算
const videoName = ref('批量避雷器检测工位')
const videoSrc = computed(() => {
  const fileName = VIDEO_NAME_MAP[videoName.value]
  return fileName ? `${getVideoBasePath()}${fileName}` : null
})

const setVideo = (name) => {
  if (VIDEO_NAME_MAP[name]) {
    videoName.value = name
  } else {
    console.warn(`视频 ${name} 不存在，使用默认视频`)
    videoName.value = '批量避雷器检测工位'
  }
}

// 关闭视频弹窗
const closeMenus = () => {
  showMenus.value = false;
};

const videoPlayer = ref(null);
const iconStates = ref([true, true, true]);

// 计算每个图标的样式类
const icon1Class = computed(() => iconStates.value[0] ? "blue_icon" : "red_icon");
const icon2Class = computed(() => iconStates.value[1] ? "blue_icon" : "red_icon");
const icon3Class = computed(() => iconStates.value[2] ? "blue_icon" : "red_icon");

// 工位信息 - 初始化为空对象
const gcgwList = ref({ ...DEFAULT_GCGW_DATA });

// 动态存储从roadinfo解析的参数
const currentContractPartId = ref("");
const currentStationCode = ref("");

// 获取检测工位-工位信息
const getjcgwList = async () => {
  if (!currentStationCode.value) {
    if (USE_MOCK_FALLBACK) gcgwList.value = { ...MOCK_GCGW_DATA };
    return;
  }
  try {
    const response = await queryDetectStationInfo({
      contractPartId: currentContractPartId.value,
      stationCode: currentStationCode.value,
    });
    if (response?.code === 200 && response.data) {
      gcgwList.value = response.data;
    } else if (USE_MOCK_FALLBACK) {
      gcgwList.value = { ...MOCK_GCGW_DATA };
    }
  } catch (error) {
    console.error('获取工位信息失败:', error);
    if (USE_MOCK_FALLBACK) gcgwList.value = { ...MOCK_GCGW_DATA };
  }
};

// 检测任务详情列表 - 初始化为空数组
const jcrwxqList = ref([]);

const getjcgwxqList = async (id) => {
  if (!currentStationCode.value) {
    if (USE_MOCK_FALLBACK) jcrwxqList.value = [...MOCK_JCRWXQ_LIST];
    return;
  }
  try {
    const response = await queryDetectPlanInfoListPage({
      taskId: id || "",
      contractPartId: currentContractPartId.value,
      stationCode: currentStationCode.value,
      queryType: changpd.value,
    });
    if (response?.code === 200 && response.data?.list?.length > 0) {
      jcrwxqList.value = response.data.list;
    } else if (USE_MOCK_FALLBACK) {
      jcrwxqList.value = [...MOCK_JCRWXQ_LIST];
    }
  } catch (error) {
    console.error('获取检测计划详情失败:', error);
    if (USE_MOCK_FALLBACK) jcrwxqList.value = [...MOCK_JCRWXQ_LIST];
  }
};

// 检测任务列表 - 初始化为空数组
const jcrwLists = ref([]);

const getjcrwList = async () => {
  if (!currentStationCode.value) {
    if (USE_MOCK_FALLBACK) jcrwLists.value = [...MOCK_JCRW_LIST];
    return;
  }
  try {
    const response = await queryDetectTaskListPage({
      contractPartId: currentContractPartId.value,
      stationCode: currentStationCode.value,
      queryType: changpd.value,
    });
    if (response?.code === 200 && response.data?.list?.length > 0) {
      jcrwLists.value = response.data.list;
    } else if (USE_MOCK_FALLBACK) {
      jcrwLists.value = [...MOCK_JCRW_LIST];
    }
  } catch (error) {
    console.error('获取检测任务列表失败:', error);
    if (USE_MOCK_FALLBACK) jcrwLists.value = [...MOCK_JCRW_LIST];
  }
};


const imageMap2 = {
  active: njcrw,
  default: jcrw,
};

const changpd = ref("finish");

const changepdlist = (value) => {
  changpd.value = value;
  getjcrwList();
};

const showxq = ref(false);

const changeXqList = (value) => {
  showxq.value = true;
  getjcgwxqList(value?.id);
};

const changeXqback = () => {
  showxq.value = false;
};

const showMenus = ref(false);
const menuRef = ref(null);

const showMenusbox = () => {
  showMenus.value = true;
};

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  if (menuRef.value && menuRef.value.contains(event.target)) {
    showMenus.value = false;
  }
};

/* 触发ue5 */
const playerMethods = inject("playerMethods");

const callParentMethod = (message) => {
  if (playerMethods?.sendMessage) {
    playerMethods.sendMessage(message);
  }
};

// 生命周期
onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  const roadinfo = localStorage.getItem('roadinfo')
  if (roadinfo && roadinfo !== 'undefined' && roadinfo !== 'null') {
    try {
      const parsed = JSON.parse(roadinfo)
      if (parsed) {
        gcgwList.value.stationName = parsed?.name || '批量避雷器检测工位'
        videoName.value = parsed?.name || '批量避雷器检测工位'
        currentContractPartId.value = parsed?.id || ''
        currentStationCode.value = parsed?.station_code || ''

        setVideo(videoName.value)

        // 只要求 stationCode 存在即可调用 API
        if (currentStationCode.value) {
          getjcgwList()
          getjcrwList()
        } else {
          // stationCode 不存在，使用兜底数据
          getjcgwList()
          getjcrwList()
        }
      }
    } catch (error) {
      console.error('解析 roadinfo 失败:', error)
      console.error('roadinfo 原始值:', roadinfo)
      // 可能是非标准 JSON，尝试清理后再解析
      // 解析失败，调用 API（会使用兜底逻辑）
      getjcgwList()
      getjcrwList()
    }
  } else {
    // 没有 roadinfo，使用兜底数据
    getjcgwList()
    getjcrwList()
  }
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.custom-content {
  font-size: 12px;
}

.context-menu {
  width: 606px;
  height: 423px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url("@/assets/动画弹窗.png") no-repeat 0 0;
  background-size: 100% 100%;
  z-index: 999;
}

.context_tan {
  width: 545px;
  height: 340px;
  background: transparent;
  border: none;
  margin: 50px 0px 0px 30px;
  overflow: hidden;
  border-radius: 4px;
}

/* 关闭按钮 */
.close-popup {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 34px;
  height: 34px;
  line-height: 20px;
  border-radius: 50%;
  background: rgba(255, 100, 100, 0.8);
  color: #fff;
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
</style>