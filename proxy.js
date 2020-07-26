// let url = 'http://218.25.36.147' // 营口
// let url = 'http://47.104.14.161'
// xurl为本地api测试
let xurl = 'http://39.105.134.59' // 本地测试
// let url = 'http://39.105.134.59' // 测试
let url = "http://39.105.134.59"; // 测试

let product = false;
let productPort = "9081";

const serverConfig = {
  "/login": {
    target: url + ":8080/",
    changeOrigin: true,
    pathRewrite: {
      "^/login": "/user/"
    }
  },
  // File Service
  "/file": {
    target: url + ":8080/",
    changeOrigin: true,
    pathRewrite: {
      "^/file": "/file/"
    }
  },
  // user, usergroup redirection
  "/api/sysUsers": {
    target: url + ":8080/",
    changeOrigin: true,
    pathRewrite: {
      "^/api/sysUsers": "/user/api/sysUsers/"
    }
  },
  "/api/sysAuths": {
    target: url + ":8080/",
    changeOrigin: true,
    pathRewrite: {
      "^/api/sysAuths": "/user/api/sysAuths/"
    }
  },
  "/api/sysRoles": {
    target: url + ":8080/",
    changeOrigin: true,
    pathRewrite: {
      "^/api/sysRoles": "/user/api/sysRoles/"
    }
  },
  "/api/departments": {
    target: url + ":8080/",
    changeOrigin: true,
    pathRewrite: {
      "^/api/departments": "/user/api/departments"
    }
  },
  "/api": {
    target: xurl,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api/"
    }
  },

  "/searchLocaltion": {
    target: "http://api.map.baidu.com/",
    changeOrigin: true,
    pathRewrite: {
      "^/searchLocaltion": "/place/v2/search"
    }
  },
  "/getLocation": {
    target: "http://api.map.baidu.com/",
    changeOrigin: true,
    pathRewrite: {
      "^/getLocation": ""
    }
  },
  "/searchLocation/": {
    target: "http://api.map.baidu.com",
    changeOrigin: true,
    pathRewrite: {
      "^/searchLocation/": "/"
    }
  }
};

// let forProductEnable = true
let forProductEnable = false;
let forProductUrl = "http://123.57.82.183/";
// let forProductUrl = "http://218.25.36.147";
let forProductPort = "9081";

let forProduct = () => {
  return {
    "/": {
      target: forProductUrl + ":" + forProductPort,
      changeOrigin: true,
      pathRewrite: {
        "^/": "/"
      }
    }
  };
};

let rejectConfig = () => {
  if (!product) return serverConfig;
  let tmp = {};
  Object.entries(serverConfig).forEach(([key, val]) => {
    tmp[key] = {
      ...val,
      target: val.target.replace(/(:\d.*)/g, ":" + productPort)
    };
  });
  return tmp;
};

let all = forProductEnable ? forProduct() : rejectConfig();

module.exports = all;
