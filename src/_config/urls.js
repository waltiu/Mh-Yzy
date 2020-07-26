// 新项目必须配置 pageUrl baseCURD userPermission
// 选择配置 fileUploadAndDownload autoCompentedUrl useInfoPic itemColor
// 必须配置如果不进行配置，将无法使用默认模板进行初始化渲染。选择配置按需求进行配置.

// 全局补全的配置URL, 没有zoom, lng, lat
export const autoCompentedUrl = {
    subdistricts: { url: '/api/ldsysSubdistricts/search/findByNameLike', args: {}, name: '小区', filling: '%' },
    businessnet: { url: '/api/ldsysOpticaleCableWorkNets/search/adv', args: {}, name: window.i18n.t('router.serviceNetwork'), filling: '%' }, // 业务网
    transPort: { url: '/api/ldsysTransferSystems/search/findPage', args: {}, name: window.i18n.t('router.serviceNetwork'), filling: '%' }, // 传输系统
    cran: { url: 'api/ldsysOpticalMultiplexers/search/findPage', args: {}, name: 'cran', filling: '%' },
    opticalMultiplexer: { url: 'api/ldsysOpticalMultiplexers/search/findPage', args: {}, name: 'opticalMultiplexer', filling: '%' },
    geoFences: { url: '/api/ldsysGeofences', args: {}, name: window.i18n.t('router.CN_GG_F'), filling: '' }, // 地理围栏
    business: { url: '/api/ldsysOpticaleCableWorks/search/findByNameAndEqAndServiceTypeAndMf', args: {}, name: window.i18n.t('vendorList.business'), filling: '%' }, // 业务
    opticalSplitter: { url: '/api/ldsysOpticalSplitters/', args: {}, name: window.i18n.t('vendorList.opticalSplitter'), filling: '%' }, // 分光器
    machine: { url: '/api/ldsysMachineFrames/search/findPage/', args: {}, name: window.i18n.t('vendorList.opticalSplitter'), filling: '%' }, // 分光器
    device: { url: '/api/ldsysEquipments/search/findByNameLike', args: {}, name: window.i18n.t('vendorList.equipment'), filling: '%' }, // 网元 设备
    well: { url: '/api/ldsysPoints/search/findByNameLikeIgnoreCaseAndType', args: { type: 1 }, name: window.i18n.t('vendorList.well'), filling: '%' }, // 井
    pipe: { url: '/api/ldsysLines/search/findByNameLikeIgnoreCaseAndType', args: { type: 1 }, name: window.i18n.t('vendorList.pipe'), filling: '%' }, // 管道
    pipeSection: { url: '/api/ldsysLineSections/search/findByNameLikeIgnoreCaseAndType', args: { type: 1 }, name: window.i18n.t('vendorList.wellLineSection'), filling: '%' }, // 管道段
    pole: { url: '/api/ldsysPoints/search/findByNameLikeIgnoreCaseAndType?type=2', args: { type: 2 }, name: window.i18n.t('vendorList.pole'), filling: '%' }, // 电杆
    poleRoad: { url: '/api/ldsysLines/search/findByNameLikeIgnoreCaseAndType', args: { type: 2 }, name: window.i18n.t('vendorList.poleRoad'), filling: '%' }, // 杆路
    poleSection: { url: '/api/ldsysLineSections/search/findByNameLikeIgnoreCaseAndType', args: { type: 2 }, name: window.i18n.t('vendorList.poleLineSection'), filling: '%' }, // 杆路段
    cited: { url: '/api/ldsysPoints/search/findByNameLikeIgnoreCaseAndType', args: { type: 3 }, name: window.i18n.t('vendorList.ledUp'), filling: '%' }, // 引上
    citedSection: { url: '/api/ldsysLineSections/search/findByNameLikeIgnoreCaseAndType', args: { type: 3 }, name: window.i18n.t('vendorList.ledUpLineSection'), filling: '%' }, // 引入段
    deviceRoom: { url: '/api/ldsysMachineRooms/search/findByNameLikeAndStationAndLevelAndservice', args: {}, name: window.i18n.t('vendorList.machineRooms'), filling: '%' }, // 机房
    station: { url: '/api/ldsysStations/search/findByNameLikeAndServiceArea', args: {}, name: window.i18n.t('vendorList.station'), filling: '%' }, // 局站
    switchY: { url: '/api/ldsysOpticalCrossConnects/search/findByNameLikeAndLevelAndService', args: {}, name: window.i18n.t('infoMap.cableBox'), filling: '%' }, // 光交
    odf: { url: '/api/ldsysOpticalCrossConnects/search/findByNameLikeIgnoreCaseAndGmtTypeAndLdsysMachineRoomAndOcId', args: {}, name: 'ODF', filling: '%' },
    support: { url: '/api/ldsysPoints/search/findByNameLikeIgnoreCaseAndType', args: { type: 9 }, name: window.i18n.t('vendorList.support'), filling: '%' }, // 撑点
    supportSection: { url: '/api/ldsysLineSections/search/findByNameLikeIgnoreCaseAndType', args: { type: 4 }, name: window.i18n.t('vendorList.supportLineSection'), filling: '%' }, // 挂墙段
    cable: { url: '/api/ldsysOpticalCables/search/findByNameLikeAndLevel', args: {}, name: window.i18n.t('vendorList.oc'), filling: '%' }, // 光缆
    error: { url: '/api/ldsysTroubles/search/findByNameLikeIgnoreCaseAndIsFixAndIsFixConfirm', args: {}, name: window.i18n.t('vendorList.error'), filling: '%' }, // 故障
    lightRoad: { url: '/api/ldsysOpticalCableWays/search/findByNameLikeAndEpAndM', args: {}, name: window.i18n.t('vendorList.lightPath'), filling: '%' } // 光路
}

// 使用信息的图片
export const useInfoPic = {
    opticalSplitter: { use: '/icons/switch/use.png', unuse: '/icons/switch/unuse.png', full: '/icons/switch/full.png' },
    odf: { use: '/icons/switch/use.png', unuse: '/icons/switch/unuse.png', full: '/icons/switch/full.png' },
    cable: { use: '/icons/cable/use.png', unuse: '/icons/cable/unuse.png' }
}

// 用来分页的 URL
export const pageUrl = {
    subdistricts: { url: '/api/ldsysSubdistricts/search/findByNameLike', args: {}, name: '小区', filling: '%' },
    businessnet: { url: '/api/ldsysOpticaleCableWorkNets/search/findPage', args: {}, name: 'router.serviceNetwork', filling: '%' }, // 业务网
    // 用户
    machine: { url: '/api/ldsysMachineFrames/search/findPage/', args: {}, name: window.i18n.t('vendorList.opticalSplitter'), filling: '%' }, // 分光器

    transPort: { url: '/api/ldsysTransferSystems/search/adv', args: {}, name: 'router.serviceNetwork', filling: '%' }, // 业务网
    cran: { url: 'api/ldsysOpticalMultiplexers/search/findPage', args: {}, name: 'cran', filling: '%' },
    user: { url: '/api/sysUsers/search/findByDepartmentId/', args: { departmentId: '0', loginName: '%%' }, name: 'globalConfig.user' }, // 用户
    // 施工单位
    departments: { url: '/api/departments/all', args: {}, name: 'OS.departmentId' }, // 工程单位

    // 资源
    error: { url: '/api/ldsysTroubles/search/findByNameLikeIgnoreCaseAndIsFixAndIsFixConfirm', name: 'globalConfig.malfunction' }, // 故障
    geoFences: { url: '/api/ldsysGeofences', name: 'router.CN_GG_F' }, // 地理围栏
    business: { url: '/api/ldsysOpticaleCableWorks/search/findByNameAndEqAndServiceTypeAndMf', args: {}, name: 'BResources.business' }, // 业务
    opticalSplitter: { url: '/api/ldsysOpticalSplitters/', args: {}, name: 'globalConfig.spectrometer' }, // 分光器
    lightRoad: { url: '/api/ldsysOpticalCableWays/search/findByNameLikeAndEpAndM', args: {}, name: 'globalConfig.opticalPath' }, // 光路

    // 点
    well: { url: '/api/ldsysPoints/search/findByNameLikeIgnoreCaseAndType', args: { type: 1 }, name: 'infoMap.well' }, // 井
    pole: { url: '/api/ldsysPoints/search/findByNameLikeIgnoreCaseAndType', args: { type: 2 }, name: 'infoMap.pole' }, // 电杆
    cited: { url: '/api/ldsysPoints/search/findByNameLikeIgnoreCaseAndType', args: { type: 3 }, name: 'infoMap.cited' }, // 引上
    support: { url: '/api/ldsysPoints/search/findByNameLikeIgnoreCaseAndType', args: { type: 9 }, name: 'infoMap.support' }, // 撑点

    // 线
    pipe: { url: '/api/ldsysLines/search/findByNameLikeIgnoreCaseAndType', args: { type: 1 }, name: 'infoMap.pipe' }, // 管道
    poleRoad: { url: '/api/ldsysLines/search/findByNameLikeIgnoreCaseAndType', args: { type: 2 }, name: 'vendorList.poleRoad' }, // 杆路

    // 线段
    pipeSection: { url: '/api/ldsysLineSections/search/findByNameLikeIgnoreCaseAndType', args: { type: 1 }, name: 'vendorList.wellLineSection' }, // 管道段
    poleSection: { url: '/api/ldsysLineSections/search/findByNameLikeIgnoreCaseAndType', args: { type: 2 }, name: 'vendorList.poleLineSection' }, // 杆路段
    citedSection: { url: '/api/ldsysLineSections/search/findByNameLikeIgnoreCaseAndType', args: { type: 3 }, name: 'vendorList.ledUpLineSection' }, // 引入段
    supportSection: { url: '/api/ldsysLineSections/search/findByNameLikeIgnoreCaseAndType', args: { type: 4 }, name: 'vendorList.supportLineSection' }, // 挂墙段

    // 一期
    device: { url: '/api/ldsysEquipments/search/findByNameLike', args: {}, name: 'infoMap.equipment' }, // 设备
    deviceRoom: { url: '/api/ldsysMachineRooms/search/findByNameLikeAndStationAndLevelAndservice', args: {}, name: 'infoMap.motorRoom' }, // 机房
    station: { url: '/api/ldsysStations/search/findByNameLikeAndServiceArea', args: {}, name: 'infoMap.station' }, // 局站
    switchY: { url: '/api/ldsysOpticalCrossConnects/search/findByNameLikeAndLevelAndService', args: {}, name: 'infoMap.cableBox' }, // 光交
    odf: { url: '/api/ldsysOpticalCrossConnects/search/findByNameLikeIgnoreCaseAndGmtTypeAndLdsysMachineRoomAndOcId', args: {}, name: 'ODF' },
    cable: { url: '/api/ldsysOpticalCables/search/findByNameLikeAndLevel', args: {}, name: 'globalConfig.cable' } // 光缆
}

// 文件操作, 用来导入导出文件
export const fileUploadAndDownload = {
    subdistricts: { download: { url: '/api/ldsysSubdistricts/excel', args: {} }, upload: { url: '/api/ldsysSubdistricts/excel', args: {} } },

    businessnet: { download: { url: '', args: {} }, upload: { url: '', args: {} } },
    business: { download: { url: '', args: {} }, upload: { url: '/api/ldsysOpticaleCableWorks/excel', args: {} } },
    opticalSplitter: { download: { url: '/api/ldsysOpticalSplitters/excel', args: {} }, upload: { url: '/api/ldsysOpticalSplitters/excel', args: {} } },
    lightRoad: { download: { url: '/api/ldsysOpticalCableWays/excel', args: {} }, upload: { url: '/api/ldsysOpticalCableWays/excel', args: {} } },

    // 点
    well: { download: { url: '/api/ldsysPoints/excel', args: { pointType: 1 } }, upload: { url: '/api/ldsysPoints/excel', args: { pointType: 1 } } },
    pole: { download: { url: '/api/ldsysPoints/excel', args: { pointType: 2 } }, upload: { url: '/api/ldsysPoints/excel', args: { pointType: 2 } } },
    cited: { download: { url: '/api/ldsysPoints/excel', args: { pointType: 3 } }, upload: { url: '/api/ldsysPoints/excel', args: { pointType: 3 } } },
    support: { download: { url: '/api/ldsysPoints/excel', args: { pointType: 9 } }, upload: { url: '/api/ldsysPoints/excel', args: { pointType: 9 } } },

    // 线
    pipe: { download: { url: '/api/ldsysLines/excel', args: { lineType: 1 } }, upload: { url: '/api/ldsysLines/excel', args: { lineType: 1 } } },
    poleRoad: { download: { url: '/api/ldsysLines/excel', args: { lineType: 2 } }, upload: { url: '/api/ldsysLines/excel', args: { lineType: 2 } } },

    // 线段
    pipeSection: { download: { url: '/api/ldsysLineSections/excel', args: { lineSectionType: 1 } }, upload: { url: '/api/ldsysLineSections/excel', args: { lineSectionType: 1 } } },
    poleSection: { download: { url: '/api/ldsysLineSections/excel', args: { lineSectionType: 2 } }, upload: { url: '/api/ldsysLineSections/excel', args: { lineSectionType: 2 } } },
    citedSection: { download: { url: '/api/ldsysLineSections/excel', args: { lineSectionType: 3 } }, upload: { url: '/api/ldsysLineSections/excel', args: { lineSectionType: 3 } } },
    supportSection: { download: { url: '/api/ldsysLineSections/excel', args: { lineSectionType: 4 } }, upload: { url: '/api/ldsysLineSections/excel', args: { lineSectionType: 4 } } },

    // 一期
    device: { download: { url: '/api/ldsysEquipments/excel', args: {} }, upload: { url: '/api/ldsysEquipments/excel', args: {} } },
    deviceRoom: { download: { url: '/api/ldsysMachineRooms/excel', args: {} }, upload: { url: '/api/ldsysMachineRooms/excel', args: {} } },
    station: { download: { url: '/api/ldsysStations/excel', args: {} }, upload: { url: '/api/ldsysStations/excel', args: {} } },
    switchY: { download: { url: '/api/ldsysOpticalCrossConnects/excel', args: { occType: 1 } }, upload: { url: '/api/ldsysOpticalCrossConnects/excel', args: { occType: 1 } } },
    odf: { download: { url: '/api/ldsysOpticalCrossConnects/excel', args: { occType: 2 } }, upload: { url: '/api/ldsysOpticalCrossConnects/excel', args: { occType: 2 } } },
    cable: { download: { url: '/api/ldsysOpticalCables/excel', args: {} }, upload: { url: '/api/ldsysOpticalCables/excel', args: {} } }
}

// 用来作为CURD的base。
export const baseCURD = {
    'subdistricts': { url: '/api/ldsysSubdistricts/', args: {}, name: '小区' },
    'businessnet': { url: '/api/ldsysOpticaleCableWorkNets/', args: {}, name: '业务网' },
    'transPort': { url: '/api/ldsysTransferSystems/', args: {}, name: '业务网' },
    'machine': { url: '/api/ldsysMachineFrames', args: {}, }, // 分光器
    'cran': { url: 'api/ldsysOpticalMultiplexers', args: {}, name: 'cran', filling: '%' },
    'group': { url: '/api/sysRoles/', args: {}, name: '用户组' },
    'geoFences': { url: '/api/ldsysGeofences/', args: {}, name: '地理围栏' },
    'departments': { url: '/api/departments/', args: {}, name: '工程单位' },
    'user': { url: '/api/sysUsers/', args: {}, name: '用户' },
    'opticalSplitter': { url: '/api/ldsysOpticalSplitters/', args: {} },
    'poleSection': { url: '/api/ldsysLineSections/', args: { type: 2 } },
    'lightRoad': { url: '/api/ldsysOpticalCableWays/', args: {} },
    'citedSection': { url: '/api/ldsysLineSections/', args: { type: 3 } },
    'supportSection': { url: '/api/ldsysLineSections/', args: { type: 4 } },
    'error': { url: '/api/ldsysTroubles/', args: {} },
    'device': { url: '/api/ldsysEquipments/', args: {} },
    'deviceRoom': { url: '/api/ldsysMachineRooms/', args: {} },
    'business': { url: '/api/ldsysOpticaleCableWorks/', args: {} },
    'poleRoad': { url: '/api/ldsysLines/', args: { type: 2 } },
    'pipe': { url: '/api/ldsysLines/', args: { type: 1 } },
    'pipeSection': { url: '/api/ldsysLineSections/', args: { type: 1 } },
    'well': { url: '/api/ldsysPoints/', args: { type: 1 } }, // 分页
    'pole': { url: '/api/ldsysPoints/', args: { type: 2 } },
    'cited': { url: '/api/ldsysPoints/', args: { type: 3 } },
    'support': { url: '/api/ldsysPoints/', args: { type: 9 } },
    'cable': { url: '/api/ldsysOpticalCables/', args: {} },
    'switchY': { url: '/api/ldsysOpticalCrossConnects/', args: {} },
    'odf': { url: '/api/ldsysOpticalCrossConnects/', create: '/api/ldsysOdfs/', args: {} },
    'station': { url: '/api/ldsysStations/', args: {} }
}

// 权限字段
// key 为内部使用的
export const userPermission = {

    // TODO
    // subdistricts

    // TODO
    // businessnet: { key: '' },

    // TODO 
    // geoFences

    error: { key: 'gzgl', name: '故障管理' },
    geoFences: { key: 'bmgl', name: '地理围栏' },
    departments: { key: 'bmgl', name: '部门管理' },
    user: { key: 'yhgl', name: '用户管理' },
    business: { key: 'ywgl', name: '业务管理' },
    opticalSplitter: { key: 'fgq', name: '分光器管理' }, // 暂无
    lightRoad: { key: 'guangluguanli', name: '光路管理' },

    // 点
    well: { key: 'jgdgl', name: '井管道管理' },
    pole: { key: 'dgglgl', name: '电杆杆路管理' },
    cited: { key: 'ysysdgl', name: '引上引上段管理' },
    support: { key: 'cdgqdgl', name: '撑点挂墙段管理' },

    // 线
    pipe: { key: 'jgdgl', name: '井管道管理' },
    poleRoad: { key: 'dgglgl', name: '电杆杆路管理' },

    // 线段
    pipeSection: { key: 'jgdgl', name: '井管道管理' },
    poleSection: { key: 'dgglgl', name: '电杆杆路管理' },
    citedSection: { key: 'ysysdgl', name: '引上引上段管理' },
    supportSection: { key: 'cdgqdgl', name: '撑点挂墙段管理' },

    // 一期
    device: { key: 'sbgl', name: '设备管理' },
    deviceRoom: { key: 'jfgl', name: '机房管理' },
    station: { key: 'jzgl', name: '局站管理' },
    switchY: { key: 'gjgl', name: '光交管理' },
    odf: { key: 'odfgl', name: 'ODF管理' },
    cable: { key: 'glgl', name: '光缆管理' }
}

export const searchMapOneUrl = {
    'subdistricts': { url: '/api/ldsysSubdistricts/', args: {}, name: '小区' },
    'businessnet': { url: '/api/ldsysOpticaleCableWorkNets/', args: {}, name: '业务网' },
    'transPort': { url: '/api/ldsysTransferSystems/', args: {}, name: '传输系统' },
    'cran': { url: 'api/ldsysOpticalMultiplexers', args: {}, name: 'cran', filling: '%' },
    'machine': { url: '/api/ldsysMachineFrames/', args: {}, },
    'geoFences': { url: '/api/ldsysGeofences/', args: {} },
    'opticalSplitter': { url: '/api/ldsysOpticalSplitters/', args: {} }, // true
    'poleSection': { url: '/api/ldsysLineSections/search/mapOne/', args: { projection: 'ldsysLineSectionALL' } }, // true
    'lightRoad': { url: '/api/ldsysOpticalCableWays/', args: {} }, // true
    'citedSection': { url: '/api/ldsysLineSections/search/mapOne/', args: { projection: 'ldsysLineSectionALL' } }, // true
    'supportSection': { url: '/api/ldsysLineSections/search/mapOne/', args: { projection: 'ldsysLineSectionALL' } }, // true
    'error': { url: '/api/ldsysTroubles/', args: {} },
    'device': { url: '/api/ldsysEquipments/', args: {} }, // true
    'deviceRoom': { url: '/api/ldsysMachineRooms/', args: {} }, // true
    'business': { url: '/api/ldsysOpticaleCableWorks/map/', args: {} }, // true
    'poleRoad': { url: '/api/ldsysLines/', args: { type: 2 } }, // true
    'pipe': { url: '/api/ldsysLines/', args: { type: 1 } }, // true
    'pipeSection': { url: '/api/ldsysLineSections/search/mapOne/', args: { projection: 'ldsysLineSectionALL' } }, // true
    // 'poleSection': {url: '/api/ldsysLineSections/search/mapOne/', args: {}},
    'well': { url: '/api/ldsysPoints/', args: {} }, // true
    'pole': { url: '/api/ldsysPoints/', args: {} }, // true
    'cited': { url: '/api/ldsysPoints/', args: {} }, // true
    'support': { url: '/api/ldsysPoints/', args: {} }, // true
    'cable': { url: '/api/ldsysOpticalCables/search/findOne/', create: '/api/ldsysOpticalCables/', update: '/api/ldsysOpticalCables/', args: {} }, // true
    'switchY': { url: '/api/ldsysOpticalCrossConnects/', args: {} }, // true
    'odf': { url: '/api/ldsysOpticalCrossConnects/', create: '/api/ldsysOdfs/', update: '/api/ldsysOpticalCrossConnects/', args: {} }, // true
    'station': { url: '/api/ldsysStations/', args: { projection: 'ldsysStationALL' } } // true
}

export const itemColor = {
    business: { color: '', name: '业务' },
    opticalSplitter: { color: '#ea5413', name: '分光器' },
    lightRoad: { color: '', name: '光路' },

    // 点
    well: { color: '#6ba657', name: '井' },
    pole: { color: '#28a7e1', name: '电杆' },
    cited: { color: '#f39800', name: '引上' },
    support: { color: '#de79ad', name: '撑点' },

    // 线
    pipe: { color: 'green', name: '管道' },
    poleRoad: { color: '#0000ff', name: '杆路' },

    // 线段
    pipeSection: { color: 'green', name: '管道' },
    poleSection: { color: '#0000ff', name: '杆路段' },
    citedSection: { color: '#cc9933', name: '引入段' },
    supportSection: { color: '#ff00ff', name: '挂墙段' },

    // 一期
    device: { color: '#601986', name: '设备' },
    deviceRoom: { color: '#f39e74', name: '机房' },
    station: { color: '#122a88', name: '局站' },
    switchY: { color: '#e4007f', name: '光交' },
    odf: { color: '#28a7e1', name: 'ODF' },
    cable: { color: 'red', name: '光缆' }
}

/**
 * 
 */
export const exportExcelByArray = {

    // businessnet
    // business: { url: '', args: {} },
    // opticalSplitter: { url: '', args: {} },
    // lightRoad: { url: '', args: {} },
    // subdistricts: { url: '/api/ldsysSubdistricts/excel', args: {} },

    well: { url: '/api/ldsysPoints/excelByIdArray', args: { pointType: '1' } },
    pole: { url: '/api/ldsysPoints/excelByIdArray', args: { pointType: '2' } },
    cited: { url: '/api/ldsysPoints/excelByIdArray', args: { pointType: '3' } },
    support: { url: '/api/ldsysPoints/excelByIdArray', args: { pointType: '4' } },

    pipe: { url: '/api/ldsysLines/excelByIdArray', args: { lineType: '1' } },
    poleRoad: { url: '/api/ldsysLines/excelByIdArray', args: { lineType: '2' } },

    pipeSection: { url: '/api/ldsysLineSections/excelByIdArray', args: { lineSectionType: '1' } },
    poleSection: { url: '/api/ldsysLineSections/excelByIdArray', args: { lineSectionType: '2' } },
    citedSection: { url: '/api/ldsysLineSections/excelByIdArray', args: { lineSectionType: '3' } },
    supportSection: { url: '/api/ldsysLineSections/excelByIdArray', args: { lineSectionType: '4' } },

    device: { url: '/api/ldsysEquipments/excelByIdArray', args: {} },
    deviceRoom: { url: '/api/ldsysMachineRooms/excelByIdArray', args: {} },
    station: { url: '/api/ldsysStations/excelByIdArray', args: {} },
    switchY: { url: '/api/ldsysOpticalCrossConnects/excelByIdArray', args: { occType: 1 } },
    odf: { url: '/api/ldsysOpticalCrossConnects/excelByIdArray', args: { occType: 2 } },
    cable: { url: '/api/ldsysOpticalCables/excelByIdArray', args: {} },
}

export const fetchMapDataUrls = {
    subdistricts: { url: '/api/ldsysSubdistricts/search/listLdsysSubdistrict', args: {} }
}