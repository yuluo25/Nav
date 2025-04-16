# 精美导航页

这是一个美观的导航页面，使用配置文件来管理导航链接和网站信息。

## 功能特点

- 响应式设计，在各种设备上都有良好的显示效果
- 暗黑/明亮主题切换
- 搜索功能，快速查找链接
- 平滑的过渡动画
- 基于配置文件的链接管理

## 配置说明

所有导航链接都存储在 `config.json` 文件中，您可以通过编辑该文件来自定义导航页：

### 网站基本信息

在 `siteInfo` 部分中配置网站标题、页脚文本和社交媒体链接：

```json
"siteInfo": {
  "title": "我的导航",
  "footerText": "© 2023 我的导航页 | 使用 ❤️ 制作",
  "socialLinks": [
    {
      "icon": "fab fa-weixin",
      "url": "#"
    },
    ...
  ]
}
```

### 分类和链接

在 `categories` 部分中配置导航分类和链接：

```json
"categories": [
  {
    "name": "开发工具",
    "icon": "fas fa-code",
    "links": [
      {
        "title": "GitHub",
        "url": "https://github.com",
        "icon": "fab fa-github",
        "description": "代码托管平台"
      },
      ...
    ]
  },
  ...
]
```

每个链接需要提供以下信息：
- `title`: 链接标题
- `url`: 链接地址
- `icon`: 链接图标（使用 Font Awesome 图标类名）
- `description`: 链接描述

## 图标说明

本项目使用 [Font Awesome](https://fontawesome.com/) 图标。你可以在配置文件中使用任何 Font Awesome 提供的图标类名。

## 使用方法

1. 克隆或下载此项目到本地
2. 编辑 `config.json` 文件自定义您的导航链接
3. 部署到任何静态网站托管服务（如 GitHub Pages、Vercel 等）

## 浏览器兼容性

支持所有现代浏览器（Chrome、Firefox、Safari、Edge 等）。
