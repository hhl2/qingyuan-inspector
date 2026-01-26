/**
 * InspectionStation 组件 Mock 数据
 * 用于开发测试以及 API 无数据时的兜底显示
 */

//防真数据 - 匹配实际API返回结构
export const MOCK_FAngZhen = {
    "sampleDetectionDetailRespList": [
        {
            "id": "5EF8496194D44F1BB136EF57A065B02D",
            "sampleId": "56F243D2AE5243F488CFE354E6E947CA",
            "sampleCode": "广东-202601083-D-8",
            "sampleName": "电动滑板车",
            "entityCode": null,
            "planCode": "P202601141101313884",
            "planStatus": 0,
            "planStatusName": "待下单",
            "planProcessStatus": 0,
            "planProcessStatusName": "待送检",
            "sampleDeliveryTime": null,
            "sampleDeliveryTimeStr": null,
            "actualTestStartTime": null,
            "actualTestStartTimeStr": null,
            "actualTestEndTime": null,
            "actualTestEndTimeStr": null,
            "planOrderTime": null,
            "planOrderTimeStr": null,
            "createTime": 1768359691913,
            "createTimeStr": "2026-01-14 11:01:31",
            "updateTime": 1768359691913,
            "updateTimeStr": "2026-01-14 11:01:31",
            "planProcessStatusTime": null,
            "planProcessStatusTimeStr": null,
            "testResult": null,
            "testResultName": "",
            "materialId": "210200300000014",
            "materialName": "电动滑板车",
            "standardClassifyCode": "2102003",
            "standardClassifyName": "文体娱乐用品",
            "levelOneCode": "21",
            "levelOneName": "办公类用品",
            "levelTwoCode": "02",
            "levelTwoName": "办公日用",
            "levelThreeCode": "003",
            "levelThreeName": "文体娱乐用品",
            "levelFourCode": null,
            "levelFourName": null,
            "stationId": "C2E1D440353E4DB5BE10BB201EA98BC8",
            "stationCode": "zhr测试专用",
            "stationName": "zhr测试专用",
            "lstPlanResult": [
                {
                    "id": "2bbe8778d642422ca899cfc99d2b22ef",
                    "planId": "5EF8496194D44F1BB136EF57A065B02D",
                    "detectionProjectId": "JQCZSY05",
                    "detectionProjectCode": "JQCZSY05",
                    "detectionProjectName": "10kV真空柱上断路器-机械操作试验",
                    "testResult": null,
                    "testResultName": null,
                    "lstPlanResultParam": [
                        {
                            "id": "2db9bdaaf96e42fcb106e336765dbcd1",
                            "paramCode": "JQCZSY05001",
                            "paramName": "高压线端全波电压（kV） ",
                            "standardRequirements": "-7725<=结果值<=-7275 ",
                            "standardBasis": null,
                            "testParamValue": 70,
                            "highValue": null,
                            "lowValue": null
                        },
                        {
                            "id": "2de2942dc1d149d592d722f754c2a4da",
                            "paramCode": "JQCZSY05002",
                            "paramName": "高压线端截波电压（kV） ",
                            "standardRequirements": "≤4330",
                            "standardBasis": null,
                            "testParamValue": 4233,
                            "highValue": null,
                            "lowValue": null
                        },
                        {
                            "id": "4f684446bb99406c831f4859c6b83a36",
                            "paramCode": "JQCZSY05003",
                            "paramName": "在降低电压和全电压下的波形图比较应",
                            "standardRequirements": "-77.25<=结果值<=-72.75",
                            "standardBasis": null,
                            "testParamValue": 70,
                            "highValue": null,
                            "lowValue": null
                        },

                    ]
                },
                {
                    "id": "2bbe8778d642422ca899cfc99d2b22ef",
                    "planId": "5EF8496194D44F1BB136EF57A065B02D",
                    "detectionProjectId": "JQCZSY05",
                    "detectionProjectCode": "JQCZSY05",
                    "detectionProjectName": "10kV真空柱上断路器-机械操作试验2",
                    "testResult": null,
                    "testResultName": null,
                    "lstPlanResultParam": [
                        {
                            "id": "2db9bdaaf96e42fcb106e336765dbcd1",
                            "paramCode": "JQCZSY05001",
                            "paramName": "高压线端全波电压（kV） ",
                            "standardRequirements": "-7725<=结果值<=-7275 ",
                            "standardBasis": null,
                            "testParamValue": 70,
                            "highValue": null,
                            "lowValue": null
                        },
                        {
                            "id": "2de2942dc1d149d592d722f754c2a4da",
                            "paramCode": "JQCZSY05002",
                            "paramName": "高压线端截波电压（kV） ",
                            "standardRequirements": "≤4330",
                            "standardBasis": null,
                            "testParamValue": 4233,
                            "highValue": null,
                            "lowValue": null
                        },
                        {
                            "id": "4f684446bb99406c831f4859c6b83a36",
                            "paramCode": "JQCZSY05003",
                            "paramName": "在降低电压和全电压下的波形图比较应",
                            "standardRequirements": "-77.25<=结果值<=-72.75",
                            "standardBasis": null,
                            "testParamValue": 70,
                            "highValue": null,
                            "lowValue": null
                        },

                    ]
                }
            ]
        }
    ],
    "listCount": 1
}

// 工位信息默认数据
export const DEFAULT_GCGW_DATA = {
    id: '',
    stationCode: '',
    stationName: '',
    stationIntroduction: '',
    stationStatus: null,
    stationStatusName: '',
    detectItemName: '',
    equipmentName: '',
    detectCount: 0,
    detectYearCount: 0,
    detectMonthCount: 0,
    detectDayCount: 0,
    innovativeDesign: '',
}

// 工位信息 - 兜底测试数据
export const MOCK_GCGW_DATA = [{
    id: "222",
    stationCode: "xxx",
    stationName: "批量避雷针检测工位",
    stationIntroduction: "实现对10kV避雷器工频参考电压试验、直流参考电压试验局部放电试验、0.75倍直流参考电压下泄露电流试验、持电流试验、密封试验，具备在预处理区完成外观检查、统爬电比距检查，对12支避雷器一次接线，一键启动测量。除预处理可人工辅助外，其他检测自动完成，无需人工参与",
    stationStatus: 2,
    stationStatusName: "忙碌",
    detectItemName: "外观检查、统—爬电比距检查、工频参考电压试验、直流参考电压试验、局部放电试验外观检查、统—爬电比距检查、工频参考电压试验、直流参考电压试验、局部放电试验",
    equipmentName: "仪器设备1       仪器设备2",
    detectCount: 501,
    detectYearCount: 301,
    detectMonthCount: 50,
    detectDayCount: 200,
    innovativeDesign: "",
}]

// 检测任务列表 - 兜底测试数据
export const MOCK_JCRW_LIST = [
    {
        id: "D59CF26BA7032A11B4ABC33AC5E8CF58",
        taskCode: "T25103001T25103001",
        samplingPlanCode: "T25103001-D",
        materialName: "10kV油浸变压器(不含非晶),S20-M-50kVA",
        spec: "2",
        supplierName: "XXXX有限公司",
        contractCode: "D0300002025040105FW10013",
        taskPriorityName: "紧急",
        classifyQualificationRate: "0.000%",
        detectProgressStr: "20",
        taskResultName: "合格",
        outlineContractCode: "T25103001",
    },
    {
        id: "D59CF26BA7032A11B4ABC33AC5E8CF59",
        taskCode: "T25103002",
        samplingPlanCode: "T25103002-D",
        materialName: "10kV油浸变压器(不含非晶),S20-M-50kVA",
        spec: "2",
        supplierName: "XXXX有限公司",
        contractCode: "D0300002025040105FW10013",
        taskPriorityName: "紧急",
        classifyQualificationRate: "0.000%",
        detectProgressStr: "40",
        taskResultName: "合格",
        outlineContractCode: "T25103002",
    },
    {
        id: "D59CF26BA7032A11B4ABC33AC5E8CF60",
        taskCode: "T25103003",
        samplingPlanCode: "T25103003-D",
        materialName: "10kV油浸变压器(不含非晶),S20-M-50kVA",
        spec: "2",
        supplierName: "XXXX有限公司",
        contractCode: "D0300002025040105FW10013",
        taskPriorityName: "紧急",
        classifyQualificationRate: "0.000%",
        detectProgressStr: "80",
        taskResultName: "合格",
        outlineContractCode: "T25103003",
    },
]

// 检测任务详情 - 兜底测试数据
export const MOCK_JCRWXQ_LIST = [
    {
        id: "080DFE66D79C4FBC9FA7B920532721AC",
        planCode: "P202510141455314707",
        testResult: 1,
        testResultName: "合格",
        sampleCode: "广东202510007Dms测试勿动-1",
        planProcessStatus: 60,
        planProcessStatusName: "检测完成",
        detectProgress: 100.0,
        detectProgressStr: "100.00%",
        actualTestStartTimeStr: "2025-10-14 10:00:00",
        actualTestEndTimeStr: "2025-10-23 10:00:00",
        entityCode: "ENTITY001",
        factorySerialCode: "FS001",
        originalLocation: "A区-01",
        newLocation: "B区-02",
        lstDetectPlanResult: [
            {
                id: "025b08fe09ac4652bfefb6c792eb2244",
                detectionProjectName: "电压比测量及联结组标号检定试验",
                stationName: "A13 移动检测工位",
                finalTestResultName: "合格",
            },
            {
                id: "93e66215719f4ec896735a0edf38db99",
                detectionProjectName: "短路阻抗及负载损耗试验",
                stationName: "A13 移动检测工位",
                finalTestResultName: "合格",
            },
            {
                id: "0f01c43f20da482eaa6a48aae165ec2a",
                detectionProjectName: "短时过负载试验",
                stationName: "A13 移动检测工位",
                finalTestResultName: "合格",
            },
        ],
    },
    {
        id: "D23561CEA66E0A11B4A92CAAFDC8FD6F",
        planCode: "P202510100000000000",
        testResult: 1,
        testResultName: "合格",
        sampleCode: "广东-202510001-D-hys检测勿动-1",
        planProcessStatus: 70,
        planProcessStatusName: "待回库",
        detectProgress: 100.0,
        detectProgressStr: "100.00%",
        actualTestStartTimeStr: "2025-10-11 08:00:00",
        actualTestEndTimeStr: "2025-10-16 16:00:00",
        entityCode: "ENTITY002",
        factorySerialCode: "FS002",
        originalLocation: "C区-03",
        newLocation: "D区-04",
        lstDetectPlanResult: [
            {
                id: "635489A9A66E4A11B4A9D3DA3EDE0F54",
                detectionProjectName: "电压比测量和联结组标号检定",
                stationName: "A13 移动检测工位",
                finalTestResultName: "合格",
            },
            {
                id: "644189A9A66E4A11B4AB72FA208A7576",
                detectionProjectName: "空载损耗和空载电流测量",
                stationName: "A13 移动检测工位",
                finalTestResultName: "合格",
            },
        ],
    },
]

// 视频路径映射
export const getVideoBasePath = () => {
    return process.env.NODE_ENV === 'production' ? '../external-videos/' : '/external-videos/'
}

// export const VIDEO_NAME_MAP = {
//     '变压器流水线检测工位': '变压器流水线检测工位.mp4',
//     '电缆保护管智能制样检测工位': '电缆保护管智能制样检测工位.mp4',
//     '短路承受能力试验区': '短路承受能力试验区.mp4',
//     '批量避雷器检测工位': '批量避雷器检测工位.mp4',
//     '柱上开关自动化检测工位': '柱上开关自动化检测工位.mp4',
//     '电缆工位': '电缆工位.mp4',
//     '一、二次融合设备检测工位': '一、二次融合设备检测工位.mp4',
// }


export const VIDEO_NAME_MAP = {
    '配变智能检测工位': '变压器流水线检测工位.mp4',
    '电缆智能制样检测工位': '电缆保护管智能制样检测工位.mp4',
    '大电流试验工位': '短路承受能力试验区.mp4',
    '批量避雷器检测实验室': '批量避雷器检测工位.mp4',
    '柱上开关智能检测工位': '柱上开关自动化检测工位.mp4',
    '电缆工位': '电缆工位.mp4',
    '一、二次融合检测工位': '一、二次融合设备检测工位.mp4',
}

// 状态文本映射
export const STATUS_TEXT_MAP = {
    1: '空闲',
    2: '运行中',
    3: '故障',
    4: '离线',
}

export const getStatusText = (status) => STATUS_TEXT_MAP[status] || '未知状态'
