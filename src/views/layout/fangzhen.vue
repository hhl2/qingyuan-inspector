<template>
    <div v-if="showMenux" class="context-menu" ref="menuRef">
        <div class="context_tan">
            <div class="sxtmName">
                <div class="close-popup" @click="closeSingleVideoPopup">×</div>
            </div>

            <div class="bjLists">
                <div class="bjList">
                    <div class="bjList_box">
                        <div class="bjList_box_label">样品编码：</div>
                        <div>686572CB43BF4C31AF25119286D07A09</div>
                    </div>
                    <div class="bjList_box">
                        <div class="bjList_box_label">样品名称：</div>
                        <div>12米加强杆装配式基础组合件设备成套装置</div>
                    </div>
                </div>

                <div class="bjList">
                    <div class="bjList_box">
                        <div class="bjList_box_label">检测开始时间：</div>
                        <div>2026-01-20</div>
                    </div>
                    <div class="bjList_box">
                        <div class="bjList_box_label">状态：</div>
                        <div>预处理</div>
                    </div>
                </div>
            </div>

            <template v-for="(item, index) in lstPlanResult" :key="index">
                <div class="bjLists">
                    <div class="bjListx">
                        <div>{{ item.detectionProjectName }}</div>
                        <div>{{ item.testResultName }}</div>
                    </div>

                    <div class="auto-scroll-table">
                        <el-table class="alertable" ref="tableRef" :data="item.lstPlanResultParam">
                            <el-table-column prop="paramName" label="参数名称" show-overflow-tooltip />
                            <el-table-column prop="standardRequirements" label="标准要求" show-overflow-tooltip />
                            <el-table-column prop="testParamValue" label="实际检测值" />

                        </el-table>
                    </div>

                </div>
            </template>





        </div>
    </div>
</template>


<script setup>
import { onMounted, onUnmounted, watch, inject, ref, nextTick } from "vue";
import { querySampleDetectionDetail } from "@/api/user";
import {
    MOCK_FAngZhen

} from "@/constants/inspectionMock";
const showMenux = ref(true);


const currentContractPartId = ref("");
const currentStationCode = ref("");
const currentUniqueCode = ref("");
const gjtjList = ref([]);
const querySampleDetectionDetails = async () => {
    const res = await querySampleDetectionDetail({
        contractPartId: currentContractPartId.value,
        uniqueCode: currentStationCode.value,
        stationCode: currentUniqueCode.value
    });
    if (res?.code === 200 && res.data) {
        lstPlanResult.value = res.data;
    } else {
        lstPlanResult.value = [...MOCK_FAngZhen];
    }
}



const lstPlanResult = ref([
    {
        "id": "e1e8493f06154a899232c5a3ac1ffebe",
        "detectionProjectId": "2BBEB16660534D83B3DCE217963D217A",
        "detectionProjectCode": "KZSHHKZDLCL01",
        "detectionProjectName": "空载损耗和空载电流测量",
        "testResult": 1,
        "testResultName": "合格",
        "lstPlanResultParam": [
            {
                "id": "987d6b9a2bb34bdd870a3141d060caf7",
                "paramCode": "KZSHHKZDLCL01001",
                "paramName": "施加电压平均值",
                "standardRequirements": "1 <= 结果值 <= 5",
                "standardBasis": null,
                "testParamValue": "2",
                "highValue": "5",
                "lowValue": "1"
            },
            {
                "id": "424cfa4d715749b3b38dba37dbbe8a69",
                "paramCode": "KZSHHKZDLCL01002",
                "paramName": "施加电压有效值",
                "standardRequirements": "1 <= 结果值 <= 5",
                "standardBasis": null,
                "testParamValue": "1",
                "highValue": "5",
                "lowValue": "1"
            }
        ]
    },
    {
        "id": "b6f26784fdf04c1d923ed76ffdddd508",
        "detectionProjectId": "9076EDF8A60A409ABE85313C4898836C",
        "detectionProjectCode": "DYBCLHLJZBHJD01",
        "detectionProjectName": "电压比测量和联结组标号检定",
        "testResult": 1,
        "testResultName": "合格",
        "lstPlanResultParam": [
            {
                "id": "fa572e1025094ea6a75f6fca9543d7cf",
                "paramCode": "DYBCLHLJZBHJD01001",
                "paramName": "试验结果",
                "standardRequirements": "1 <= 结果值 <= 5",
                "standardBasis": null,
                "testParamValue": "2",
                "highValue": "5",
                "lowValue": "1"
            },
            {
                "id": "efd2a92445d84882ba03d35c308582c4",
                "paramCode": "DYBCLHLJZBHJD01002",
                "paramName": "分接档位",
                "standardRequirements": "1 <= 结果值 <= 5",
                "standardBasis": null,
                "testParamValue": "3",
                "highValue": "5",
                "lowValue": "1"
            },
            {
                "id": "e9740cde9e0d4f06bb7791dce91f8dbf",
                "paramCode": "DYBCLHLJZBHJD01003",
                "paramName": "分接档位AB/ab误差值",
                "standardRequirements": "1 <= 结果值 <= 5",
                "standardBasis": null,
                "testParamValue": "4",
                "highValue": "5",
                "lowValue": "1"
            }
        ]
    }]);




const closeSingleVideoPopup = () => {
    showMenux.value = false;
};

onMounted(() => {
    // querySampleDetectionDetails()

})
</script>


<style scoped>
.context-menu {
    width: 680px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: url("@/assets/弹窗.png") no-repeat 0 0;
    background-size: 100% 100%;
    z-index: 32;
    overflow-y: auto;
    overflow-x: hidden;
}


.context_tan {
    margin: 45px 0px 0px 30px;
    height: 455px;
    overflow-y: auto;

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
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 45px;
    z-index: 9999;
}

/* 关闭按钮 */
.close-popup {
    position: absolute;
    right: 25px;
    top: -5px;
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


.bjLists {
    width: 550px;
    margin: 10px 20px;
    background: #2a61a0;
    border: 1px solid #6dbdf1;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    border-radius: 3px;
    margin-top: 20px;
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

.bjListx {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #6bbbee;
}
</style>