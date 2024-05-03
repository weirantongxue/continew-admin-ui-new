## [v3.0.1](https://github.com/Charles7c/continew-admin-ui/compare/v3.0.0...v3.0.1) (2024-05-03)

### ✨ 新特性

* 新增表格全屏、尺寸工具 ([b8a84a3](https://github.com/Charles7c/continew-admin-ui/commit/b8a84a3a0890d4f6d0e39ecbe50c4f645bd0f106))
* 新增验证码超时显示效果，超时后显示已过期请刷新 (GitHub#14) ([f99c8f1](https://github.com/Charles7c/continew-admin-ui/commit/f99c8f1b5a521f987b2822352f976fb0b1dc93b3))
* 文件管理增加资源统计，统计总存储量、各类型文件存储占用 (GitHub#15) ([c70d1ad](https://github.com/Charles7c/continew-admin-ui/commit/c70d1adbf922d28853bf4e6cf8cc4e14ad5b0ac7))

### 💎 功能优化

- 统一性别约束/统一上级部门为必填 ([5264cf2](https://github.com/Charles7c/continew-admin-ui/commit/5264cf226fa3acd1398d9309e6a97d4d45b64850))
- 一级部门不能修改上级部门 ([b2a1658](https://github.com/Charles7c/continew-admin-ui/commit/b2a1658e3730078cf2fbeb3032c23c0922544594))
- 优化根据选中部门查询用户的点击效果 ([ca25285](https://github.com/Charles7c/continew-admin-ui/commit/ca252852373840b000c1f65ab925d18335a71fcb)) ([99c37d7](https://github.com/Charles7c/continew-admin-ui/commit/99c37d7de4a245836f89c29cf4b638032efae31f))
- 登录页面，H5 端排版更换 ([05ab89d](https://github.com/Charles7c/continew-admin-ui/commit/05ab89d03fe6401994698ad9ecdeb8540ec49553))
- 优化 queryForm 的 Query 类型使用 ([5b71369](https://github.com/Charles7c/continew-admin-ui/commit/5b713692516db586f2d401a163192c62a963137a))


### 🐛 问题修复

- 修复 Markdown 样式加载错误，改为全局统一加载 (GitHub#9) ([64648d0](https://github.com/Charles7c/continew-admin-ui/commit/64648d0c1d897d6e426199e7924ede9dfb40e8b8))
- 修复由于文件组件名称错误导致的侧边栏筛选功能失效 ([81dbea8](https://github.com/Charles7c/continew-admin-ui/commit/81dbea879377054e3646c2d07b51c3352501bbce))
- 修复文件管理数据不刷新和批量操作选中问题 (GitHub#13) ([724f60e](https://github.com/Charles7c/continew-admin-ui/commit/724f60eaf6b076cfb165ca0b1028c461146495ad))
- 修复文件重命名时不能回显原值的问题 ([3dfa97e](https://github.com/Charles7c/continew-admin-ui/commit/3dfa97e785acb42edd3798117f7e8eea326b4b64))
- 修复修改公告时保存按钮点击无效的问题 ([c0a5c2d](https://github.com/Charles7c/continew-admin-ui/commit/c0a5c2dffe50905b8610fbd066b8eecd5a4cbe89))
- 修复账号管理、安全设置路由处理错误 ([c0c5ba8](https://github.com/Charles7c/continew-admin-ui/commit/c0c5ba8efdab009e7e38ad9a8f68a655aba28718))
- 修复首页卡片显示问题 ([39465dc](https://github.com/Charles7c/continew-admin-ui/commit/39465dcaa38c9d79c820583a1dd82978e5588dec))
- 修复 H5 下登录页面错位显示 ([9d570a8](https://github.com/Charles7c/continew-admin-ui/commit/9d570a808ce1a15a1513eac0e9ec355d683febef))

## v3.0.0 (2024-04-27)

### ✨ 新特性

* 基于 Gi-Demo 前端模板开发的全新 3.0 前端，重新定义新 UI，提供更为舒适的前端开发体验
- 个人中心：支持基础信息修改、安全设置（密码修改、邮箱绑定、手机号绑定（并提供行为验证码、短信限流等安全处理）、第三方账号绑定/解绑）、头像裁剪上传等能力
- 用户管理：提供系统用户的新增维护，支持禁用登录及重置指定用户密码
- 角色管理：对权限与菜单进行分配，可根据部门设置角色的数据权限
- 菜单管理：已实现菜单动态路由，后端可配置化，支持多级菜单
- 部门管理：可配置系统组织架构，以树形表格展示
- 公告管理：提供公告的发布、查看和删除等功能。管理员可以在后台发布公告，并可以设置公告的生效时间、终止时间，以 markdown-it 为内核渲染 Markdown 格式内容显示
- 消息管理：提供消息查看、标记已读、全部已读、删除等功能（适配对接导航栏站内信功能）（v3.1 重构，v2.5 版可用）
- 字典管理：提供对系统公用数据字典的维护，例如：公告类型，支持字典标签背景色和排序等配置
- 文件管理：提供文件上传、下载、预览（目前支持图片、音视频）、重命名、切换视图（列表、网格）等功能
- 存储管理：提供文件存储库新增、编辑、删除等功能，支持本地存储、兼容 S3 协议存储
- 系统配置：提供修改系统标题、Logo、favicon 等基础配置功能，以方便用户系统与其自身品牌形象保持一致（v3.1 支持邮件配置）
- 代码生成：提供根据数据库表自动生成相应的前后端 CRUD 代码的功能
- 在线用户：管理当前登录用户，可一键踢下线
- 系统日志：提供登录日志、操作日志管理功能，可查看指定日志的详细请求及响应信息

