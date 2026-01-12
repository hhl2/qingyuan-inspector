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

          <!-- <div class="controls">
                    <button @click="toggleIcon(0)">切换点1</button>
                    <button @click="toggleIcon(1)">切换点2</button>
                    <button @click="toggleIcon(2)">切换点3</button>
                    <button @click="resetAll">全部重置</button>
                </div> -->
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
import DragFloatBall from '@/components/DragFloatBall.vue';
import {
  onMounted,
  onUnmounted,
  ref,
  computed,
  onBeforeUnmount,
  inject,
} from "vue";
import {
  queryDetectStationInfo,
  queryDetectTaskListPage,
  queryDetectPlanInfoListPage,
} from "@/api/user";


// 接收从 index 传入的面板状态
const props = defineProps({
  isPanelVisible: {
    type: Boolean,
    default: true
  },

})



// 动态路径 - 根据环境使用不同路径
// 生产环境: dist 和 external-videos 在同一目录下，需要向上一级访问
const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '../external-videos/' : '/external-videos/'
}

const VIDEO_MAP = {
  '变压器流水线检测工位': `${getBasePath()}变压器流水线检测工位.mp4`,
  '电缆保护管智能制样检测工位': `${getBasePath()}电缆保护管智能制样检测工位.mp4`,
  '短路承受能力试验区': `${getBasePath()}短路承受能力试验区.mp4`,
  '批量避雷器检测工位': `${getBasePath()}批量避雷器检测工位.mp4`,
  '柱上开关自动化检测工位': `${getBasePath()}柱上开关自动化检测工位.mp4`,
  '电缆工位': `${getBasePath()}电缆工位.mp4`,
  '一、二次融合设备检测工位': `${getBasePath()}一、二次融合设备检测工位.mp4`,
}

// const videoSrc = ref(videoUrl);

const videoName = ref('批量避雷器检测工位') // 默认视频

// 根据名称计算视频路径
const videoSrc = computed(() => VIDEO_MAP[videoName.value])
// 设置视频函数
const setVideo = (name) => {
  if (VIDEO_MAP[name]) {
    videoName.value = name
  } else {
    console.warn(`视频 ${name} 不存在，使用默认视频`)
    videoName.value = 'transformer'
  }
}

// 关闭视频弹窗
const closeMenus = () => {
  showMenus.value = false;
};

const videoPlayer = ref(null);
const iconStates = ref([true, true, true]);

// 计算每个图标的样式类
const icon1Class = computed(() =>
  iconStates.value[0] ? "blue_icon" : "red_icon"
);

const icon2Class = computed(() =>
  iconStates.value[1] ? "blue_icon" : "red_icon"
);

const icon3Class = computed(() =>
  iconStates.value[2] ? "blue_icon" : "red_icon"
);

// 切换图标状态
const toggleIcon = (index) => {
  iconStates.value[index] = !iconStates.value[index];
};

// 重置所有图标状态
const resetAll = () => {
  iconStates.value = [true, true, true];
};

const gcgwList = ref({
  id: "222", //工位id
  stationCode: "xxx", //工位编号
  stationName: "批量避雷针检测工位", //工位名称
  stationIntroduction:
    "实现对10kV避雷器工频参考电压试验、直流参考电压试验局部放电试验、0.75倍直流参考电压下泄露电流试验、持电流试验、密封试验，具备在预处理区完成外观检查、统爬电比距检查，对12支避雷器一次接线，一键启动测量。除预处理可人工辅助外，其他检测自动完成，无需人工参与", //工位描述
  stationStatus: 2, //工位状态 1=空闲，2=使用中，3=故障，4=离线，
  stationStatusName: "忙碌",
  detectItemName:
    "外观检查、统—爬电比距检查、工频参考电压试验、直流参考电压试验、局部放电试验外观检查、统—爬电比距检查、工频参考电压试验、直流参考电压试验、局部放电试验", //工作检测能力
  equipmentName: "仪器设备1       仪器设备2", //仪器设备名称
  detectCount: 501, //总样品检测量
  detectYearCount: 301, //本年样品检测量
  detectMonthCount: 50, //本月样品检测量
  detectDayCount: 200, //日样品检测量
  innovativeDesign: "", //创新设计
  QueryEquipmentListRespDTO: {},
}); //检测工位-工位信息

// 动态存储从roadinfo解析的参数
const currentContractPartId = ref(""); // 检测机构ID (对应parsed.id)
const currentStationCode = ref(""); // 工位编码 (对应parsed.station_code)

// 状态文本转换函数
const getStatusTexts = (status) => {
  const statusMap = {
    1: "空闲",
    2: "运行中",
    3: "故障",
    4: "离线",
  };
  return statusMap[status] || "未知状态";
};

//获取检测工位-工位信息
const getjcgwList = async () => {
  // 如果没有获取到参数，则不调用接口
  if (!currentContractPartId.value || !currentStationCode.value) {
    console.warn('缺少contractPartId或stationCode参数');
    return;
  }
  const searchParams = {
    contractPartId: currentContractPartId.value, //检测机构ID
    stationCode: currentStationCode.value, //工位编码
  };
  const response = await queryDetectStationInfo(searchParams);
  console.log(response);
  if (response?.code == 200) {
    gcgwList.value = response?.data;
  }
};
const jcrwxqList = ref([{
  id: "080DFE66D79C4FBC9FA7B920532721AC",
  planCode: "P202510141455314707",
  testResult: 1,
  testResultName: "合格",
  sampleId: "B61CEA6E7452466A843F99820DFC0825",
  sampleCode: "广东202510007Dms测试勿动-1",
  taskId: "2EC8351F5F0F457E859F8F8A79243AE1",
  planProcessStatus: 60,
  planProcessStatusName: "检测完成",
  detectProgress: 100.0,
  detectProgressStr: "100.00%",
  actualTestStartTime: 1760400000000,
  actualTestEndTime: 1761177600000,
  lstDetectPlanResult: [
    {
      id: "025b08fe09ac4652bfefb6c792eb2244",
      planId: "080DFE66D79C4FBC9FA7B920532721AC",
      planCode: "P202510141455314707",
      taskId: "2EC8351F5F0F457E859F8F8A79243AE1",
      samplingPlanId: "4A8F2D807338418EA90BCFF4B8D3B786",
      sampleId: "B61CEA6E7452466A843F99820DFC0825",
      sampleCode: "广东-202510007-D-ms测试勿动-1",
      detectionProjectId: "04D2E7ADA3DFB311FEBF4330A89B9813",
      detectionProjectCode: "YQSBYQ0001",
      detectionProjectName: "电压比测量及联结组标号检定试验",
      detectionStandardValue: null,
      detectionResultValue: null,
      testResult: 1,
      testResultName: "合格",
      finalTestResult: 1,
      finalTestResultName: "合格",
      updaterId: "SuperAdmin",
      updaterName: "超级管理员",
      isOptional: 1,
      defectLevel: 1,
      testDate: 1760400000000,
      resultDerscription: null,
      detectPerson: null,
      techStandardId: null,
      techStandardItemId: null,
      defectId: null,
      unqualifiedReason: "",
      isRecheck: null,
      testTaskCode: null,
      testTaskType: 1,
      isAppoint: null,
      planResultHisId: null,
      batchNo: null,
      actualTestStartTime: 1760400000000,
      actualTestEndTime: 1760400000000,
      testItemType: null,
      detectionParameterName: null,
      parameterUnit: null,
      fieldType: null,
      leftTemplateValue: null,
      leftTemplateRule: null,
      rightTemplateValue: null,
      rightTemplateRule: null,
      contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292",
      laboratoryCode: null,
      contractPartName: "泗水xxx服务中心",
      laboratoryId: null,
      contractPartCode: null,
      laboratoryName: null,
      planResultParamId: null,
      planResultParamTestResult: null,
      planResultParamFinalTestResult: null,
      dataFrom: "3",
      provinceCode: "03",
      bureauCode: "0300",
      optimisticLockVersion: 1,
      createTime: 1760424933179,
      updateTime: 1760427375533,
    },
    {
      id: "93e66215719f4ec896735a0edf38db99",
      planId: "080DFE66D79C4FBC9FA7B920532721AC",
      planCode: "P202510141455314707",
      taskId: "2EC8351F5F0F457E859F8F8A79243AE1",
      samplingPlanId: "4A8F2D807338418EA90BCFF4B8D3B786",
      sampleId: "B61CEA6E7452466A843F99820DFC0825",
      sampleCode: "广东-202510007-D-ms测试勿动-1",
      detectionProjectId: "9B1329B1A3DFB311AE869C44848A572D",
      detectionProjectCode: "YQSBYQ0002",
      detectionProjectName: "短路阻抗及负载损耗试验",
      detectionStandardValue: null,
      detectionResultValue: null,
      testResult: 1,
      testResultName: "合格",
      finalTestResult: 1,
      finalTestResultName: "合格",
      stationId: null,
      stationCode: null,
      stationName: null,
      part: null,
      remark: null,
      creatorId: null,
      updaterId: "SuperAdmin",
      creatorName: null,
      lstId: null,
      lstPlanId: null,
      lstPlanCode: null,
      lstTaskId: null,
      lstSamplingPlanId: null,
      lstSampleId: null,
      lstSampleCode: null,
      lstDetectionProjectId: null,
      lstDetectionProjectCode: null,
      lstStationId: null,
      lstStationCode: null,
      updaterName: "超级管理员",
      stationDetectItemId: null,
      stationDetectItemName: null,
      standardRequirement: null,
      standardBasis: null,
      isOptional: 1,
      defectLevel: 1,
      testDate: 1760400000000,
      resultDerscription: null,
      detectPerson: null,
      techStandardId: null,
      techStandardItemId: null,
      defectId: null,
      unqualifiedReason: "",
      isRecheck: null,
      testTaskCode: null,
      testTaskType: 1,
      isAppoint: null,
      planResultHisId: null,
      batchNo: null,
      actualTestStartTime: 1760400000000,
      actualTestEndTime: 1760400000000,
      testItemType: null,
      detectionParameterName: null,
      parameterUnit: null,
      fieldType: null,
      leftTemplateValue: null,
      leftTemplateRule: null,
      rightTemplateValue: null,
      rightTemplateRule: null,
      contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292",
      laboratoryCode: null,
      contractPartName: "泗水xxx服务中心",
      laboratoryId: null,
      contractPartCode: null,
      laboratoryName: null,
      planResultParamId: null,
      planResultParamTestResult: null,
      planResultParamFinalTestResult: null,
      dataFrom: "3",
      provinceCode: "03",
      bureauCode: "0300",
      optimisticLockVersion: 1,
      createTime: 1760424933179,
      updateTime: 1760427340201,
    },
    {
      id: "0f01c43f20da482eaa6a48aae165ec2a",
      planId: "080DFE66D79C4FBC9FA7B920532721AC",
      planCode: "P202510141455314707",
      taskId: "2EC8351F5F0F457E859F8F8A79243AE1",
      samplingPlanId: "4A8F2D807338418EA90BCFF4B8D3B786",
      sampleId: "B61CEA6E7452466A843F99820DFC0825",
      sampleCode: "广东-202510007-D-ms测试勿动-1",
      detectionProjectId: "05AD29B1A3DFB31150B07EBBD2EA1C55",
      detectionProjectCode: "YQSBYQ0003",
      detectionProjectName: "短时过负载试验",
      detectionStandardValue: null,
      detectionResultValue: null,
      testResult: 1,
      testResultName: "合格",
      finalTestResult: 1,
      finalTestResultName: "合格",
      stationId: null,
      stationCode: null,
      stationName: null,
      part: null,
      remark: null,
      creatorId: null,
      updaterId: "SuperAdmin",
      creatorName: null,
      lstId: null,
      lstPlanId: null,
      lstPlanCode: null,
      lstTaskId: null,
      lstSamplingPlanId: null,
      lstSampleId: null,
      lstSampleCode: null,
      lstDetectionProjectId: null,
      lstDetectionProjectCode: null,
      lstStationId: null,
      lstStationCode: null,
      updaterName: "超级管理员",
      stationDetectItemId: null,
      stationDetectItemName: null,
      standardRequirement: null,
      standardBasis: null,
      isOptional: 2,
      defectLevel: 1,
      testDate: 1760400000000,
      resultDerscription: null,
      detectPerson: null,
      techStandardId: null,
      techStandardItemId: null,
      defectId: null,
      unqualifiedReason: "",
      isRecheck: null,
      testTaskCode: null,
      testTaskType: 1,
      isAppoint: null,
      planResultHisId: null,
      batchNo: null,
      actualTestStartTime: 1761177600000,
      actualTestEndTime: 1761177600000,
      testItemType: null,
      detectionParameterName: null,
      parameterUnit: null,
      fieldType: null,
      leftTemplateValue: null,
      leftTemplateRule: null,
      rightTemplateValue: null,
      rightTemplateRule: null,
      contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292",
      laboratoryCode: null,
      contractPartName: "泗水xxx服务中心",
      laboratoryId: null,
      contractPartCode: null,
      laboratoryName: null,
      planResultParamId: null,
      planResultParamTestResult: null,
      planResultParamFinalTestResult: null,
      dataFrom: "3",
      provinceCode: "03",
      bureauCode: "0300",
      optimisticLockVersion: 1,
      createTime: 1760424933179,
      updateTime: 1760427375533,
    },
  ],
},
{
  id: "D23561CEA66E0A11B4A92CAAFDC8FD6F",
  planCode: "P202510100000000000",
  testResult: 1,
  testResultName: "合格",
  sampleId: "AA72F1CDA66DFA11B4AB71BA5905CE94",
  sampleCode: "广东-202510001-D-hys检测勿动-1",
  taskId: "0D5F414AA66DFA11B4AB682A3CEE085C",
  entityCode: null,
  factorySerialCode: null,
  planStatus: null,
  planStatusName: null,
  planProcessStatus: 70,
  planProcessStatusName: "待回库",
  originalLocation: null,
  newLocation: null,
  detectProgress: 100.0,
  detectProgressStr: "100.00%",
  actualTestStartTime: 1760177554274,
  actualTestEndTime: 1760662515745,
  actualTestStartTimeStr: null,
  actualTestEndTimeStr: null,
  lstDetectPlanResult: [
    {
      id: "635489A9A66E4A11B4A9D3DA3EDE0F54",
      planId: "D23561CEA66E0A11B4A92CAAFDC8FD6F",
      planCode: "P202510100000000000",
      taskId: "0D5F414AA66DFA11B4AB682A3CEE085C",
      samplingPlanId: "7632D655A66DEA11B4A8727A83E4F3F7",
      sampleId: "AA72F1CDA66DFA11B4AB71BA5905CE94",
      sampleCode: "广东-202510001-D-hys检测勿动-1",
      detectionProjectId: "E14DB397A66D0A11B4AB510A75881809",
      detectionProjectCode: "DYBCLHLJZBHJD01",
      detectionProjectName: "电压比测量和联结组标号检定",
      detectionStandardValue: null,
      detectionResultValue: null,
      testResult: 1,
      testResultName: "合格",
      finalTestResult: 1,
      finalTestResultName: "合格",
      stationId: "C1A502A811114184BCF74499F8EC899d",
      stationCode: "A13",
      stationName: "A13 移动检测工位",
      part: null,
      remark: null,
      creatorId: null,
      updaterId: null,
      creatorName: null,
      lstId: null,
      lstPlanId: null,
      lstPlanCode: null,
      lstTaskId: null,
      lstSamplingPlanId: null,
      lstSampleId: null,
      lstSampleCode: null,
      lstDetectionProjectId: null,
      lstDetectionProjectCode: null,
      lstStationId: null,
      lstStationCode: null,
      updaterName: null,
      stationDetectItemId: "DYBCLHLJZBHJD01",
      stationDetectItemName: "电压比测量和联结组标号检定",
      standardRequirement: null,
      standardBasis: null,
      isOptional: 1,
      defectLevel: 1,
      testDate: 1760197076000,
      resultDerscription: null,
      detectPerson: null,
      techStandardId: null,
      techStandardItemId: null,
      defectId: null,
      unqualifiedReason: null,
      isRecheck: null,
      testTaskCode: "cb192ffcbcb348418e21e4d70858f629",
      testTaskType: null,
      isAppoint: 1,
      planResultHisId: "8EA09B4647F64EFFB91382DAB908B41E",
      batchNo: "20251011183515-15",
      actualTestStartTime: 1760197016000,
      actualTestEndTime: 1760197076000,
      testItemType: null,
      detectionParameterName: null,
      parameterUnit: null,
      fieldType: null,
      leftTemplateValue: null,
      leftTemplateRule: null,
      rightTemplateValue: null,
      rightTemplateRule: null,
      contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292",
      laboratoryCode: null,
      contractPartName: "泗水xxx服务中心",
      laboratoryId: null,
      contractPartCode: null,
      laboratoryName: null,
      planResultParamId: null,
      planResultParamTestResult: null,
      planResultParamFinalTestResult: null,
      dataFrom: "3",
      provinceCode: "03",
      bureauCode: "0300",
      optimisticLockVersion: 1,
      createTime: 1760083529567,
      updateTime: 1760178925688,
    },
    {
      id: "644189A9A66E4A11B4AB72FA208A7576",
      planId: "D23561CEA66E0A11B4A92CAAFDC8FD6F",
      planCode: "P202510100000000000",
      taskId: "0D5F414AA66DFA11B4AB682A3CEE085C",
      samplingPlanId: "7632D655A66DEA11B4A8727A83E4F3F7",
      sampleId: "AA72F1CDA66DFA11B4AB71BA5905CE94",
      sampleCode: "广东-202510001-D-hys检测勿动-1",
      detectionProjectId: "E24AB397A66D0A11B4ABFC1A5FE9584D",
      detectionProjectCode: "KZXHHKZDLCL01",
      detectionProjectName: "空载损耗和空载电流测量",
      detectionStandardValue: null,
      detectionResultValue: null,
      testResult: 1,
      testResultName: "合格",
      finalTestResult: 1,
      finalTestResultName: "合格",
      stationId: "C1A502A811114184BCF74499F8EC899d",
      stationCode: "A13",
      stationName: "A13 移动检测工位",
      part: null,
      remark: null,
      creatorId: null,
      updaterId: null,
      creatorName: null,
      lstId: null,
      lstPlanId: null,
      lstPlanCode: null,
      lstTaskId: null,
      lstSamplingPlanId: null,
      lstSampleId: null,
      lstSampleCode: null,
      lstDetectionProjectId: null,
      lstDetectionProjectCode: null,
      lstStationId: null,
      lstStationCode: null,
      updaterName: null,
      stationDetectItemId: "KZXHHKZDLCL01",
      stationDetectItemName: "空载损耗和空载电流测量",
      standardRequirement: null,
      standardBasis: null,
      isOptional: 2,
      defectLevel: 1,
      testDate: -62135769600000,
      resultDerscription: null,
      detectPerson: null,
      techStandardId: null,
      techStandardItemId: null,
      defectId: null,
      unqualifiedReason: null,
      isRecheck: null,
      testTaskCode: "cb192ffcbcb348418e21e4d70858f629",
      testTaskType: null,
      isAppoint: 1,
      planResultHisId: "7F50BC6142C8490EBACA95ABD8DB8BC8",
      batchNo: "20251013173209-09",
      actualTestStartTime: -62135769600000,
      actualTestEndTime: -62135769600000,
      testItemType: null,
      detectionParameterName: null,
      parameterUnit: null,
      fieldType: null,
      leftTemplateValue: null,
      leftTemplateRule: null,
      rightTemplateValue: null,
      rightTemplateRule: null,
      contractPartId: "2AF2BC0D2DBB43159CAAA14C98696292",
      laboratoryCode: null,
      contractPartName: "泗水xxx服务中心",
      laboratoryId: null,
      contractPartCode: null,
      laboratoryName: null,
      planResultParamId: null,
      planResultParamTestResult: null,
      planResultParamFinalTestResult: null,
      dataFrom: "3",
      provinceCode: "03",
      bureauCode: "0300",
      optimisticLockVersion: 1,
      createTime: 1760083529567,
      updateTime: 1760347959266,
    },
  ],
},


]);
const getjcgwxqList = async (id) => {
  // 如果没有获取到参数，则不调用接口
  if (!currentContractPartId.value || !currentStationCode.value) {
    console.warn('缺少contractPartId或stationCode参数');
    return;
  }
  const searchParams = {
    taskId: id ? id : "",
    contractPartId: currentContractPartId.value, //检测机构ID
    stationCode: currentStationCode.value, //工位编码
    queryType: changpd.value,
  };
  const response = await queryDetectPlanInfoListPage(searchParams);

  if (response?.code == 200) {
    jcrwxqList.value = response.data?.list;
  }
};

const jcrwLists = ref([
  {
    id: "D59CF26BA7032A11B4ABC33AC5E8CF58",
    taskCode: "T25103001T25103001",
    samplingPlanId: "D533F26BA7032A11B4AB06EA671285F5",
    samplingPlanCode: "T25103001-D",
    materialId: "040100100010001",
    materialName: "10kV油浸变压器(不含非晶),S20-M-50kVA",
    spec: "2",
    supplierId: "c348b9fd5e32471eb6f69480ca37ba7d",
    supplierName: "XXXX有限公司",
    contractId: "4E999C7BC9A741C79221000DD4F4EADD",
    contractName: "2022XXXXXX检储配物资标签普通目录货物框架采购合同XXXX同",
    contractCode: "D0300002025040105FW10013",
    taskPriority: 1,
    taskPriorityName: "紧急",
    standardClassifyId: "0401001KP202504220498",
    classifyQualificationRate: 0,
    classifyQualificationRateStr: "0.000%",
    detectProgressStr: 20,
    taskResultName: "合格",
  },
  {
    id: "D59CF26BA7032A11B4ABC33AC5E8CF58",
    taskCode: "T25103001",
    samplingPlanId: "D533F26BA7032A11B4AB06EA671285F5",
    samplingPlanCode: "T25103001-D",
    materialId: "040100100010001",
    materialName: "10kV油浸变压器(不含非晶),S20-M-50kVA",
    spec: "2",
    supplierId: "c348b9fd5e32471eb6f69480ca37ba7d",
    supplierName: "XXXX有限公司",
    contractId: "4E999C7BC9A741C79221000DD4F4EADD",
    contractName: "2022XXXXXX检储配物资标签普通目录货物框架采购合同XXXX同",
    contractCode: "D0300002025040105FW10013",
    taskPriorityName: "紧急",
    standardClassifyId: "0401001KP202504220498",
    classifyQualificationRate: 0,
    classifyQualificationRateStr: "0.000%",
    detectProgressStr: 40,
    taskResultName: "合格",
  },
  {
    id: "D59CF26BA7032A11B4ABC33AC5E8CF58",
    taskCode: "T25103001",
    samplingPlanId: "D533F26BA7032A11B4AB06EA671285F5",
    samplingPlanCode: "T25103001-D",
    materialId: "040100100010001",
    materialName: "10kV油浸变压器(不含非晶),S20-M-50kVA",
    spec: "2",
    supplierId: "c348b9fd5e32471eb6f69480ca37ba7d",
    supplierName: "XXXX有限公司",
    sampleName: null,
    outlineContractId: null,
    outlineContractCode: "T25103001",
    contractId: "4E999C7BC9A741C79221000DD4F4EADD",
    contractName: "2022XXXXXX检储配物资标签普通目录货物框架采购合同XXXX同",
    contractCode: "D0300002025040105FW10013",
    taskPriority: 1,
    taskPriorityName: "紧急",
    standardClassifyId: "0401001KP202504220498",
    classifyQualificationRate: 0,
    classifyQualificationRateStr: "0.000%",
    detectProgressStr: 80,
    taskResultName: "合格",
  },
]);

//获取检测任务列表
const getjcrwList = async () => {
  // 如果没有获取到参数，则不调用接口
  if (!currentContractPartId.value || !currentStationCode.value) {
    console.warn('缺少contractPartId或stationCode参数');
    return;
  }
  const searchParams = {
    contractPartId: currentContractPartId.value,
    stationCode: currentStationCode.value,
    queryType: changpd.value,
  };
  const response = await queryDetectTaskListPage(searchParams);
  console.log(response, 'response')
  if (response?.code == 200) {
    jcrwLists.value = response.data?.list;
    console.log("处理后的数据:", jcrwLists.value);
  }
};

// 根据状态获取文字
const getStatusText = (isover) => {
  switch (isover) {
    case 1:
      return "已完成";
    case 2:
      return "进行中";
    case 3:
      return "已通过";
  }
};

// 根据状态获取图片
const getStatusImage = (isover) => {
  switch (isover) {
    case 1:
      return new URL("@/assets/图标黄.png", import.meta.url).href;
    case 2:
      return new URL("@/assets/图标蓝.png", import.meta.url).href;
    case 3:
      return new URL("@/assets/图标绿.png", import.meta.url).href;
  }
};

// 根据状态获取文字颜色类
const getTextClass = (isover) => {
  switch (isover) {
    case 1:
      return "jctext-yellow";
    case 2:
      return "jctext-blue";
    case 3:
      return "jctext-green";
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
const changeXqback = (value) => {
  showxq.value = false;

  console.log(showxq.value, 1111);
};

const showMenus = ref(false);

const menuRef = ref(null);

const showMenusbox = () => {
  // if (gcgwList.value?.stationVideoPlayingUrl) {
  //   videoSrc.value = gcgwList.value.stationVideoPlayingUrl;
  //   setTimeout(() => {
  //     showMenus.value = true;
  //   }, 50);
  // }
  showMenus.value = true;


};

// 点击外部关闭菜单
const handleClickOutside = (event) => {

  if (menuRef.value && menuRef.value.contains(event.target)) {
    showMenus.value = false;
  }
};

/* 触发ue5 */
// 注入父组件提供的方法
const playerMethods = inject("playerMethods");
// 封装调用逻辑
const callParentMethod = (message) => {
  if (playerMethods?.getUeData) {
    console.log(message);
  }
  if (playerMethods?.sendMessage) {
    playerMethods.sendMessage(message);
  } else {
    console.error("方法未成功注入");
  }
};

// 生命周期
onMounted(() => {
  document.addEventListener("click", handleClickOutside);


  const roadinfo = localStorage.getItem('roadinfo')
  // 检查 roadinfo 是否为有效的 JSON 字符串（排除 "undefined"、空字符串等无效值）
  // parsed 结构: {"type":"JCGW","name":"中文名","id":"工位id","station_code":"A1"}
  if (roadinfo && roadinfo !== 'undefined' && roadinfo !== 'null') {
    const parsed = JSON.parse(roadinfo)
    console.log('解析的roadinfo数据:', parsed)
    if (parsed) {
      gcgwList.value.stationName = parsed?.name || '批量避雷器检测工位'
      videoName.value = parsed?.name || '批量避雷器检测工位'

      // 保存接口需要的参数
      currentContractPartId.value = parsed?.id || ''
      currentStationCode.value = parsed?.station_code || ''

      console.log('视频名称:', videoName.value)
      console.log('contractPartId:', currentContractPartId.value)
      console.log('stationCode:', currentStationCode.value)

      setVideo(videoName.value)

      // 调用接口获取数据
      if (currentContractPartId.value && currentStationCode.value) {
        getjcgwList()  // 获取工位信息
        getjcrwList()  // 获取检测任务列表
      }
    }
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