import Vue from "vue";
import Router from "vue-router";

import businessnet from "@/_view/businessnet/index.vue";
import subdistricts from "@/_view/subdistricts/index.vue";

// V2
import business from "@/manage/business";
import cable from "@/manage/cable";
import infoMap from "@/_view/infomap/tmp.vue";
import station from "@/manage/station";
import well from "@/manage/well";
import diffRoute from "@/manage/diffRoute";
import login from "@/manage/login";
import frame from "@/manage/main";
import server from "@/manage/deviceRoom";
import statistics from "@/manage/statistics";
import device from "@/manage/device";

import user from "@/manage/user";
import odf from "@/manage/odf";
import pole from "@/manage/pole";
import support from "@/manage/support";
import cited from "@/manage/cited";
import opticalSplitter from "@/manage/opticalSplitter";
import switchY from "@/manage/switchY";
import lightRoad from "@/manage/lightRoad";
import cran from '@/_view/cran/index.vue'
import machine from '@/_view/machine/index.vue'
import geoFences from "@/manage/geoFences";
import error from "@/manage/error";

import update from "@/setting/update";
import dict from "@/setting/dict";
import group from "@/setting/group";


import opticalSplitterOrder from '@/manage/orders/index.vue'
import cableOrder from '@/_view/cable/order/index.vue'

import transport from '@/_view/transport/index.vue'
import occwRecommend from '@/_view/occw/recommend/index.vue'
Vue.use(Router);

const column = [{
        path: "/main",
        name: "router.resourceData",
        icon: "el-icon-s-data",
        children: [{
                path: "/infoMap",
                name: "router.CN_R_MAP",
                code: false,
                component: infoMap
            },
            {
                path: "/statistics",
                name: "router.resourceStatistics",
                code: "ywgl",
                component: statistics
            },
            {
                path: "/geoFences",
                name: "router.CN_GG_F",
                code: false,
                component: geoFences
            }
        ]
    },
    {
        path: "/main",
        name: "智能决策",
        icon: "el-icon-s-opportunity",
        children: [{
                path: "/diffRoute",
                name: "router.CN_CER",
                code: "ywgl.r",
                component: diffRoute
            },
            {
                path: "/occwRecommend",
                name: "光路推荐",
                code: "fgqgdgl",
                component: occwRecommend
            },
            {
                path: "/error",
                name: "router.CN_FI",
                code: "gzgl",
                component: error
            }
        ]
    },
    {
        path: "/main",
        name: "动态管理",
        icon: "el-icon-s-order",
        children: [{
                path: "/opticalSplitterOrder",
                name: "分光器动态管理",
                code: "fgqgdgl",
                component: opticalSplitterOrder
            },
            {
                path: "/cableOrder",
                name: "纤芯动态管理",
                code: "xxgdgl",
                component: cableOrder
            }
        ]
    },
    {
        path: "/main",
        name: "网络管理",
        icon: "el-icon-coin",
        children: [{
                path: "/transport",
                name: "传输系统",
                code: 'tsxt',
                component: transport
            },
            //传输系统  放置于此
            {
                path: "/businessnet",
                name: "业务网",
                code: "ywgl", // TODO
                component: businessnet
            },
            {
                path: "/business",
                name: "router.CN_BR",
                code: "ywgl",
                component: business
            },
            {
                path: "/lightRoad",
                name: "router.CN_OPR",
                code: "guangluguanli",
                component: lightRoad
            },
            {
                path: "/device",
                name: "router.networkDevice",
                code: "sbgl",
                component: device // 原设备管理
            },
        ]
    },
    {
        path: "/main",
        name: "光缆网管理",
        icon: "el-icon-share",
        children: [{
                path: "/cable",
                name: "router.CN_OCR",
                code: "glgl",
                component: cable
            },
            {
                path: "/odf",
                name: "router.CN_ODF_R",
                code: "odfgl",
                component: odf
            },
            {
                path: "/switchY",
                name: "router.CN_OI",
                code: "gjgl",
                component: switchY
            },
            {
                path: "/cran",
                name: "CRAN",
                code: "cran",
                component: cran
            },
            {
                path: "/machine",
                name: "机框",
                code: "machine",
                component: machine
            },
            {
                path: "/opticalSplitter",
                name: "router.CN_OS",
                code: "fgq",
                component: opticalSplitter
            }
        ]
    },
    {
        path: "/main",
        name: "router.carrierResource",
        icon: "el-icon-location",
        children: [{
                path: "/well",
                name: "router.CN_TWR",
                code: "jgdgl",
                component: well
            },
            {
                path: "/pole",
                name: "router.CN_RARR",
                code: "dgglgl",
                component: pole
            },
            {
                path: "/support",
                name: "router.CN_SP_R",
                code: "cdgqdgl",
                component: support
            },
            {
                path: "/cited",
                name: "router.CN_AR",
                code: "ysysdgl",
                component: cited
            }
        ]
    },
    // {
    //   path: "/main",
    //   name: "router.lineManagement",
    //   icon: "el-icon-share",
    //   children: [

    //   ]
    // },
    {
        path: "/main",
        name: "router.spaceResource",
        icon: "el-icon-house",
        children: [{
                path: "/subdistricts",
                name: "router.CN_CR",
                code: "jzgl", // TODO
                component: subdistricts
            },
            {
                path: "/station",
                name: "router.CN_SR",
                code: "jzgl",
                component: station
            },
            {
                path: "/server",
                name: "router.CN_CRR",
                code: "jfgl",
                component: server
            }
        ]
    },
    {
        path: "/main",
        name: "router.CN_SM",
        icon: "el-icon-setting",
        children: [{
                path: "/group",
                name: "router.CN_UG",
                code: "yhzgl",
                component: group
            },
            {
                path: "/user",
                name: "router.CN_USER",
                code: "yhgl",
                component: user
            },
            {
                path: "/dict",
                name: "router.CN_DTRS",
                code: "zdgl",
                component: dict
            },
            {
                path: "/zoneSetting",
                name: "router.CN_RIM",
                code: "xtpzgl"
                    // component: zoneSetting
            },
            {
                path: "/update",
                name: "router.CN_AUS",
                code: "xtpzgl",
                component: update
            }
        ]
    }
];

Vue.prototype.$routerColumn = column;

// Check Route info
const routeinfo = [];
for (var a in column) {
    routeinfo.push.apply(routeinfo, column[a].children);
}
// End

export default new Router({
    routes: [{
            path: "/",
            name: "login",
            component: login
        },
        {
            path: "/main",
            name: "frame",
            component: frame,
            children: routeinfo
        }
    ]
});