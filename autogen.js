
const base = {
  "id": "2",
  "name": "test2",
  "orderNumber": "002",
  "departmentId": null,
  "endDate": "1566901782000",
  "note": null,
  "gmtCreate": "1566986708000",
  "gmtModified": "1566986708000",
  "gmtModifier": null,
  "gmtCreator": null,
  "state": "uncommitted",
  "allowCommit": null,
  "allowCheck": null,
  "failNote": null,
  "lastCommitTime": null,
  "lastCheckTime": null,
  "finishTime": null,
  "locationErrorMsg": null,
  "locationError": null,
  "locationOffsetMax": null,
  "ldsysJumpFibers": [
    {
      "id": "4",
      "serviceName": "test2",
      "note": "no",
      "ldsysFormedJumpFibers": [
        {
          "id": "3",
          "type": 1,
          "name": "test2",
          "lng": "123.4414919289",
          "lat": "41.8270180718",
          "note": "no",
          "photos": null,
          "locationErrorMsg": null,
          "locationError": null,
          "locationOffsetMax": null,
          "gmtCreate": "1566990252000",
          "gmtModified": "1566990252000",
          "gmtModifier": null,
          "gmtCreator": null
        }
      ],
      "fiberCoreCommitRecords": {
        "info": [
          {
            "jumpFiberId": 4,
            "serviceName": "test2",
            "createDate": "1566961452211",
            "timestamp": "2019-08-28T11:04:12.210+08:00[Asia/Shanghai]",
            "type": 1,
            "name": "test2",
            "lng": 123.4414919289,
            "lat": 41.8270180718,
            "note": "no",
            "photos": null,
            "locationErrorMsg": null,
            "locationError": null,
            "oldPorts": {
              "0": {
                "carryingBusiness": "111",
                "carryingWay": "111",
                "strPort": null,
                "ocPortOcId": "13088",
                "ocPortOcPort": "1",
                "useId": "-1",
                "userPort": "-1",
                "useName": null,
                "ocName": "test-yb"
              },
              "1": {
                "carryingBusiness": null,
                "carryingWay": null,
                "strPort": null,
                "ocPortOcId": "13088",
                "ocPortOcPort": "3",
                "useId": null,
                "userPort": "",
                "useName": null,
                "ocName": "test-yb"
              },
              "2": {
                "carryingBusiness": "333",
                "carryingWay": "333",
                "strPort": null,
                "ocPortOcId": "13088",
                "ocPortOcPort": "3",
                "useId": null,
                "userPort": "",
                "useName": null,
                "ocName": "test-yb"
              },
              "3": {
                "carryingBusiness": "",
                "carryingWay": null,
                "strPort": null,
                "ocPortOcId": "13088",
                "ocPortOcPort": "6",
                "useId": "0",
                "userPort": "",
                "useName": null,
                "ocName": "test-yb"
              },
              "4": {
                "carryingBusiness": "",
                "carryingWay": null,
                "strPort": null,
                "ocPortOcId": "13088",
                "ocPortOcPort": "7",
                "useId": "0",
                "userPort": "",
                "useName": null,
                "ocName": "test-yb"
              }
            },
            "newPorts": {
              "0": {
                "carryingBusiness": "111",
                "carryingWay": "111",
                "strPort": null,
                "ocPortOcId": "13088",
                "ocPortOcPort": "1",
                "useId": "-1",
                "userPort": "-1",
                "useName": null,
                "ocName": "test-yb"
              },
              "1": {
                "carryingBusiness": null,
                "carryingWay": null,
                "strPort": null,
                "ocPortOcId": "13088",
                "ocPortOcPort": "3",
                "useId": null,
                "userPort": "",
                "useName": null,
                "ocName": "test-yb"
              },
              "2": {
                "carryingBusiness": "333",
                "carryingWay": "333",
                "strPort": null,
                "ocPortOcId": "13088",
                "ocPortOcPort": "3",
                "useId": null,
                "userPort": "",
                "useName": null,
                "ocName": "test-yb"
              },
              "3": {
                "carryingBusiness": "888",
                "carryingWay": null,
                "strPort": null,
                "ocPortOcId": "13088",
                "ocPortOcPort": "6",
                "useId": "0",
                "userPort": "",
                "useName": null,
                "ocName": "test-yb"
              },
              "4": {
                "carryingBusiness": "999",
                "carryingWay": null,
                "strPort": null,
                "ocPortOcId": "13088",
                "ocPortOcPort": "7",
                "useId": "0",
                "userPort": "",
                "useName": null,
                "ocName": "test-yb"
              }
            }
          }
        ]
      },
      "locationErrorMsg": null,
      "locationError": null,
      "locationOffsetMax": null
    },
    {
      "id": "6",
      "serviceName": "xuweijian",
      "note": "ceshi",
      "ldsysFormedJumpFibers": [],
      "fiberCoreCommitRecords": {
        "info": []
      },
      "locationErrorMsg": null,
      "locationError": null,
      "locationOffsetMax": null
    }
  ],
  "departmentName": null,
  "isExpire": false
}


const data = Object.keys(base)


let target = data.reduce((res, key) => {
  res[key] = {
    title: "title",
    key: key,
    table: {
      config: {},
      display: '() => true'
    },
    read: {
      config: {},
      display: '() => true'
    },
    create: {
      display: '() => true',
    },
    edit: {
      display: '() => true',
    },
    map: {}
  }
  return res
}, {})

