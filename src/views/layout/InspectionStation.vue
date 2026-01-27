<template>
  <div class="scale-container">
    <div class="left" :class="{ 'panel-collapsed': !isPanelVisible }">
      <div class="panel-content">
        <div class="title">
          <img src="@/assets/title_bgs.png" alt="" />
          <div class="title_txet">{{ gcgwList?.stationName || defaultStationNames }}</div>
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

    <div v-if="showMenux" class="context-menus" ref="menuRef">
      <div class="context_tans">
        <div class="sxtmNames">
          <div class="close-popups" @click="closeSingleVideoPopup">×</div>
        </div>

        <div class="bjLists">
          <div class="bjList">
            <div class="bjList_boxs">
              <div class="bjList_box_label">样品编码：</div>
              <div>{{ lstPlanResults.sampleCode }}</div>
            </div>

            <div class="bjList_boxs">
              <div class="bjList_box_label">样品名称：</div>
              <div>{{ lstPlanResults.sampleName }}</div>
            </div>

          </div>


          <div class="bjList">
            <div class="bjList_box">
              <div class="bjList_box_label">检测开始时间：</div>
              <div>{{ lstPlanResults.actualTestStartTimeStr }}</div>
            </div>
            <div class="bjList_box">
              <div class="bjList_box_label">状态：</div>
              <div class="bjList_box_text">{{ lstPlanResults.planProcessStatusName }}</div>
            </div>
          </div>
        </div>

        <template v-for="(item, index) in lstPlanResults.lstPlanResult" :key="index">
          <div class="bjLists">

            <div class="bjLists_title">
              <el-tooltip :content="item?.detectionProjectName" effect="light">
                <span>{{ item.detectionProjectName }}</span>
              </el-tooltip>
            </div>
            <div class="auto-scroll-table param-table-wrapper">
              <el-table class="param-table" ref="tableRef" :data="item.lstPlanResultParam">
                <el-table-column prop="paramName" label="参数名称" show-overflow-tooltip />
                <el-table-column prop="standardRequirements" label="标准要求" show-overflow-tooltip />
                <el-table-column prop="testParamValue" label="实际检测值" />
              </el-table>
            </div>

          </div>
        </template>





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
import { onMounted, onUnmounted, ref, computed, inject, nextTick, watch } from "vue";
import {
  queryDetectStationInfo,
  queryDetectTaskListPage,
  queryDetectPlanInfoListPage,
  querySampleDetectionDetail
} from "@/api/user";
import { MOCK_FAngZhen, DEFAULT_GCGW_DATA, getVideoBasePath, VIDEO_NAME_MAP, MOCK_GCGW_DATA, MOCK_JCRW_LIST, MOCK_JCRWXQ_LIST } from "@/constants/inspectionMock";

// 定义事件发射器
const emit = defineEmits(['update:isPanelVisible']);

// ========== 兜底数据开关 ==========
// true = 使用兜底数据（API无数据时显示测试数据）
// false = 不使用兜底数据（API无数据时显示空）
const USE_MOCK_FALLBACK = false;
// ==================================

// 接收从 index 传入的面板状态（支持 v-model）
const props = defineProps({
  isPanelVisible: {
    type: Boolean,
    required: true
  },
})

// 视频路径计算
const videoName = ref('批量避雷器检测实验室')
const videoSrc = computed(() => {
  const fileName = VIDEO_NAME_MAP[videoName.value]
  return fileName ? `${getVideoBasePath()}${fileName}` : null
})

const setVideo = (name) => {
  if (VIDEO_NAME_MAP[name]) {
    videoName.value = name
  } else {
    console.warn(`视频 ${name} 不存在，使用默认视频`)
    videoName.value = '批量避雷器检测实验室'
  }
}

const showMenux = ref(false);


const currentUniqueCode = ref("");
const lstPlanResults = ref([]);
const querySampleDetectionDetails = async (codex, id) => {
  const res = await querySampleDetectionDetail({
    contractPartId: id || currentContractPartId.value,
    uniqueCode: codex || currentStationCode.value,
    stationCode: codex || currentUniqueCode.value
  });
  if (res?.code === 200 && res.data?.sampleDetectionDetailRespList?.length > 0) {
    // 从新的API结构中提取第一个样品的 lstPlanResults
    lstPlanResults.value = res.data.sampleDetectionDetailRespList[0] || [];
  } else {
    // 使用兜底数据
    lstPlanResults.value = MOCK_FAngZhen.sampleDetectionDetailRespList[0] || [];
  }
}

// 关闭视频弹窗
const closeMenus = () => {
  showMenus.value = false;
};

const closeSingleVideoPopup = () => {
  showMenux.value = false;
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
    if (USE_MOCK_FALLBACK) gcgwList.value = { ...MOCK_GCGW_DATA[0] };
    return;
  }
  try {
    const response = await queryDetectStationInfo({
      contractPartId: currentContractPartId.value,
      stationCode: currentStationCode.value,
    });
    if (response?.code === 200 && response.data) {

      const list = response.data.stationInfoRespDTOList;
      if (list && list.length > 0) {
        // 取第一个对象作为基础数据
        gcgwList.value = { ...list[0] };

        // 如果有多个对象，累加所有对象的统计数据
        if (list.length > 1) {
          gcgwList.value.detectCount = list.reduce((sum, item) => sum + Number(item.detectCount || 0), 0);
          gcgwList.value.detectMonthCount = list.reduce((sum, item) => sum + Number(item.detectMonthCount || 0), 0);
          gcgwList.value.detectDayCount = list.reduce((sum, item) => sum + Number(item.detectDayCount || 0), 0);
          gcgwList.value.detectYearCount = list.reduce((sum, item) => sum + Number(item.detectYearCount || 0), 0);
        }
      }
    } else if (USE_MOCK_FALLBACK) {
      gcgwList.value = { ...MOCK_GCGW_DATA[0] };
    }
  } catch (error) {
    console.error('获取工位信息失败:', error);
    if (USE_MOCK_FALLBACK) gcgwList.value = { ...MOCK_GCGW_DATA[0] };
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
  showMenux.value = false;
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


const defaultStationNames = ref(null);

/**
 * 初始化工位数据
 * @returns {boolean} 是否成功解析 roadinfo
 */
const initializeStationData = () => {
  const roadinfo = localStorage.getItem('roadinfo');
  const defaultStationName = '批量避雷器检测实验室';

  // 检查 roadinfo 是否有效
  if (!roadinfo || roadinfo === 'undefined' || roadinfo === 'null') {
    gcgwList.value.stationName = defaultStationName;
    videoName.value = defaultStationName;
    defaultStationNames.value = defaultStationName;
    setVideo(videoName.value);
    return { id: '' }; // 返回空 id 的对象
  }

  // 尝试解析 JSON
  try {
    const parsed = JSON.parse(roadinfo);
    if (!parsed) {
      throw new Error('解析结果为空');
    }

    // 设置工位数据
    gcgwList.value.stationName = parsed.name || defaultStationName;
    videoName.value = parsed.name || defaultStationName;
    defaultStationNames.value = parsed.name || defaultStationName;
    currentContractPartId.value = parsed.id || '';
    currentStationCode.value = parsed.station_code || '';

    setVideo(videoName.value);
    return parsed;
  } catch (error) {
    console.error('解析 roadinfo 失败:', error);
    console.error('roadinfo 原始值:', roadinfo);

    // 解析失败时使用默认值
    gcgwList.value.stationName = defaultStationName;
    videoName.value = defaultStationName;
    defaultStationNames.value = defaultStationName;
    setVideo(videoName.value);
    return { id: '' }; // 返回空 id 的对象
  }
};
const ueResponseData = inject('ueResponseData')
watch(ueResponseData, async (newVal, oldVal) => {
  if (newVal) {
    console.log('index页新数据:', newVal.json)

    const jsonRes = newVal?.json


    if (jsonRes.type == 'fangzhen') {

      console.log(jsonRes, 'jsonRes', currentContractPartId.value, 2222)

      showMenux.value = true

      querySampleDetectionDetails(jsonRes?.code, jsonRes?.id)



    }




  }
})

// 监听 showMenux 变化，自动控制面板显示/隐藏
watch(showMenux, (newValue) => {
  if (newValue) {
    // 当弹窗显示时，隐藏侧边面板
    emit('update:isPanelVisible', false);
  } else {
    // 当弹窗关闭时，显示侧边面板
    emit('update:isPanelVisible', true);
  }
}, { immediate: false }); // 不在初始化时执行

// 生命周期
onMounted(() => {
  // 注册全局点击事件监听器
  document.addEventListener("click", handleClickOutside);

  // 初始化工位数据并检查 id
  const parsedData = initializeStationData();

  // 根据 id 的存在与否自动设置面板显示状态
  if (parsedData && parsedData.id) {
    // 有 id：显示面板
    emit('update:isPanelVisible', true);
  } else {
    // 没有 id：隐藏面板
    emit('update:isPanelVisible', false);
  }

  // 统一调用 API（内部会根据 stationCode 决定是否使用兜底数据）
  getjcgwList();
  getjcrwList();


  // 使用新的数据结构初始化
  lstPlanResults.value = MOCK_FAngZhen.sampleDetectionDetailRespList?.[0] || [];
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

.context-menus {
  width: 706px;
  height: 523px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* background: url("@/assets/动画弹窗.png") no-repeat 0 0; */
  background: url("@/assets/模型弹窗.png") no-repeat 0 0;
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

.context_tans {
  width: 630px;
  height: 340px;
  background: transparent;
  border: none;
  margin: 60px 0px 0px 40px;
  overflow-y: auto;
  border-radius: 4px;
  /* 隐藏滚动条 */
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 和 Edge */
}

/* 隐藏 WebKit 滚动条 */
.context_tans::-webkit-scrollbar {
  display: none;
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

/* 关闭按钮 */
.close-popups {
  position: absolute;
  right: 26px;
  top: 28px;
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

.close-popups:hover {
  background: rgba(255, 60, 60, 1);
  transform: scale(1.1);
}

.bjLists {
  width: 580px;
  margin: 0px 10px;
  background: rgba(20, 59, 105, 0.5);
  border: 1px solid #218BE5;
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  border-radius: 3px;
  margin-bottom: 10px;

}

.bjLists .bjLists_title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 5px;
  height: 30px;
  background: url('@/assets/小标题33.png') no-repeat 0 0;
  background-size: 100% 100%;
  position: relative;
}

.bjLists .bjLists_title span {
  color: #E9FBFF;
  font-size: 14px;
  font-weight: bold;

}


.bjList_box {
  width: 50%;
  display: flex;
  color: #ffffff;
  font-size: 12px;
  margin: 2px 0px;
}

.bjList_boxs {
  width: 100%;
  display: flex;
  color: #459CFF;
  font-size: 12px;
  margin: 4px 0px;
}

.bjList_box_label {
  color: #FFFFFF;
  margin-right: 0px;
}

.bjList_box_text {
  color: #FFBB45;
}

.bjList {
  display: flex;
  align-items: center;
}

.bjListx {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #6bbbee;
  margin-bottom: 10px;
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

/* ========== 参数表格独立样式 ========== */
.param-table-wrapper {
  margin-top: 0px;
}

/* 表格整体样式 - 使用 :deep() 穿透 scoped 样式 */
.param-table-wrapper :deep(.param-table) {
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-header-bg-color: transparent;
  --el-table-header-text-color: #459CFF;
  --el-table-text-color: #ffffff;
  --el-table-border-color: transparent;
  --el-table-row-hover-bg-color: rgba(33, 139, 229, 0.2);
  font-size: 12px;
  border: none;
}

/* 表头样式 */
.param-table-wrapper :deep(.param-table .el-table__header-wrapper th) {
  background-color: transparent !important;
  background: transparent !important;
  color: #459CFF !important;
  font-family: Microsoft YaHei !important;
  font-weight: bold !important;
  font-size: 12px;
  padding: 8px 0;
  border: none !important;
}

/* 覆盖全局 thead tr 背景色 */
.param-table-wrapper :deep(.param-table thead tr) {
  background: transparent !important;
  background-color: transparent !important;
}

/* 表头单元格内容 */
.param-table-wrapper :deep(.param-table .el-table__header-wrapper .cell) {
  font-family: Microsoft YaHei !important;
  font-weight: bold !important;
  font-size: 12px;
  color: #459CFF !important;
}

/* 表格单元格样式 */
.param-table-wrapper :deep(.param-table .el-table__body-wrapper td) {
  background-color: transparent !important;
  color: #FFFFFF !important;
  font-family: Microsoft YaHei !important;
  font-weight: 400 !important;
  font-size: 12px;
  padding: 2px 0;
  border: none !important;
}

/* 表格单元格内容 */
.param-table-wrapper :deep(.param-table .el-table__body-wrapper .cell) {
  font-family: Microsoft YaHei !important;
  font-weight: 400 !important;
  font-size: 12px;
  color: #FFFFFF !important;
  padding: 0 8px;
  line-height: 1;
}

/* 表格行样式 */
.param-table-wrapper :deep(.param-table .el-table__body-wrapper tr) {
  background-color: transparent !important;
  height: 20px;
}

/* 覆盖全局奇偶行背景色 */
.param-table-wrapper :deep(.param-table tbody > tr:nth-child(odd)),
.param-table-wrapper :deep(.param-table tbody > tr:nth-child(even)) {
  background-color: transparent !important;
}

/* 表格行悬停效果 */
.param-table-wrapper :deep(.param-table .el-table__body-wrapper tr:hover > td) {
  background-color: rgba(33, 139, 229, 0.2) !important;
}

/* 去除表格所有边框 */
.param-table-wrapper :deep(.param-table .el-table__inner-wrapper::before),
.param-table-wrapper :deep(.param-table .el-table__inner-wrapper::after) {
  display: none;
}

.param-table-wrapper :deep(.param-table::before),
.param-table-wrapper :deep(.param-table::after) {
  display: none;
}

/* 表格滚动条样式 */
.param-table-wrapper :deep(.param-table .el-scrollbar__bar.is-vertical) {
  width: 4px;
}

.param-table-wrapper :deep(.param-table .el-scrollbar__thumb) {
  background-color: rgba(33, 139, 229, 0.5);
  border-radius: 2px;
}

/* 表格空数据提示 */
.param-table-wrapper :deep(.param-table .el-table__empty-block) {
  background-color: transparent !important;
}

.param-table-wrapper :deep(.param-table .el-table__empty-text) {
  color: #6c7a89 !important;
}
</style>