# 共用组件库

## 自动补全

### @/public/autoComplete

```<FormItem label="名称">
        <auto-complete-info :values="info" :placeholder="infos.name" @returnData="(e) => {selectInfo = e}" :url="$autoCompentedUrl['switchY'].url" :preData="{gmttype: infos.type}"></auto-complete-info>
      </div>
```
