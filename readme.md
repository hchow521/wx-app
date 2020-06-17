# 广州移动合作伙伴小程序
##### uni-app框架小程序
###### 使用HBuildX编辑器运行、打包
###### 文档[https://uniapp.dcloud.net.cn]
    运行->运行到小程序->微信开发者工具
    注意事项：
    已安装新版本微信开发者工具
    微信开发者工具已开启服务端口号，设置->安全->服务端口开启
    运行失败可查看编辑器终端提示，关闭微信开发者工具并重新运行
## 目录说明
    ┌-- components 组件
    |       ├---- notice-bar 首页公告滚动封装
    |       └--- title-wrap 公共标题封装
    |
    |        ┌-- main 首页
    |        ├-- list 分类
    |        ├-- details 详情页
    ├-- pages+-- search 搜索页
    |        ├-- notice 公告页
    |        └-- user 我的
    |
    ├-- static 图片资源
    |
    ├-- store === vuex
    ├-- unpackage 打包运行生成目录
    ├-- app.vue 略
    ├-- main.js 略
    ├-- manifest.json uni-app配置 记得在微信小程序配置填写appid
    ├-- pages.json uni-app页面结构
    └-- readme.md === this
