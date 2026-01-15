/**
 * DeviceManagement 组件 Mock 数据
 * 用于开发测试以及 API 无数据时的兜底显示
 */

// 设备统计默认数据
export const DEFAULT_DEVICE_STATS = []

// 设备统计 - 兜底测试数据
export const MOCK_DEVICE_STATS = [
    { equipmentKind: 1, equipmentKindCount: 4 },
    { equipmentKind: 2, equipmentKindCount: 6 },
    { equipmentKind: 3, equipmentKindCount: 4 },
]

// 设备列表默认数据
export const DEFAULT_DEVICE_LIST = []

// 设备列表 - 兜底测试数据
export const MOCK_DEVICE_LIST = [
    {
        id: "device001",
        equipmentName: "摄像头1",
        equipmentKindName: "安防监控",
        equipmentMonitoringPoint: "工位1号检测点",
        countName: "正常",
    },
    {
        id: "device002",
        equipmentName: "摄像头2",
        equipmentKindName: "安防监控",
        equipmentMonitoringPoint: "工位2号检测点",
        countName: "正常",
    },
]

// 设备详情默认数据
export const DEFAULT_DEVICE_DETAIL = {
    id: '',
    equipmentCode: '',
    equipmentName: '',
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
    stationId: '',
    stationCode: null,
    stationName: null,
    responsibilityDepartment: null,
    factoryCode: null,
    stationEquipmentId: null,
    productionDate: null,
    productionDateStr: null,
    playingUrl: null,
}

// 送检信息默认数据
export const DEFAULT_DELIVERY_LIST = []

// 送检信息 - 兜底测试数据
export const MOCK_DELIVERY_LIST = [
    {
        id: "delivery001",
        detectDepartment: "检测中心",
        nextDeliveryDateStr: "2025-10-30",
    },
]

// 维修记录默认数据
export const DEFAULT_MAINTENANCE_LIST = []

// 维修记录 - 兜底测试数据
export const MOCK_MAINTENANCE_LIST = [
    {
        equipmentMaintenanceContent: "设备日常维护",
        equipmentMaintenanceDateStr: "2025-09-25",
        maintenanceDepartment: "维修部",
        maintenancePerson: "张工",
        contact: "13800138000",
    },
]

// 设备类型映射
export const EQUIPMENT_KIND_MAP = {
    1: "检测设备",
    2: "环境设备",
    3: "安防设备",
}

export const getEquipmentKindName = (kind) => EQUIPMENT_KIND_MAP[kind] || "未知设备"
