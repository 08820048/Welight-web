# ApexBlog 下载统计API使用文档

## 概述

为ApexBlog项目添加了应用下载统计功能，支持Mac、Windows、Linux三个平台的下载量统计。该功能提供了记录下载和获取统计数据的REST API接口。

## API接口

### 基础URL

- **生产环境**: `https://ilikexff.cn/api`

### 1. 记录下载

**接口**: `POST /download-stats/record`

**描述**: 记录应用下载事件

**参数**:
- `platform` (可选): 平台类型，支持 `MAC`、`WINDOWS`、`LINUX`
- `referer` (可选): 来源页面URL

**示例请求**:
```javascript
// 方式1: 指定平台
fetch('https://ilikexff.cn/api/download-stats/record', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'platform=MAC&referer=https://waer.ltd/download'
});

// 方式2: 自动检测平台（推荐）
fetch('https://ilikexff.cn/api/download-stats/record', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'referer=https://waer.ltd/download'
});
```

**响应示例**:
```json
{
    "code": 200,
    "message": "下载记录成功",
    "data": null,
    "timestamp": 1693276800000
}
```

### 2. 获取下载统计

**接口**: `GET /download-stats/stats`

**描述**: 获取应用下载统计信息

**参数**:
- `includeStats` (可选): 是否包含查询统计信息，默认false

**示例请求**:
```javascript
fetch('https://ilikexff.cn/api/download-stats/stats')
    .then(response => response.json())
    .then(data => {
        console.log('下载统计:', data.data);
    });
```

**响应示例**:
```json
{
    "code": 200,
    "message": "操作成功",
    "data": {
        "macDownloads": 150,
        "windowsDownloads": 320,
        "linuxDownloads": 80,
        "totalDownloads": 550,
        "todayMacDownloads": 5,
        "todayWindowsDownloads": 12,
        "todayLinuxDownloads": 3,
        "todayTotalDownloads": 20,
        "statisticsDate": "2024-08-29"
    },
    "timestamp": 1693276800000
}
```

### 3. 获取总下载量

**接口**: `GET /download-stats/total`

**描述**: 获取应用总下载量

**示例请求**:
```javascript
fetch('https://ilikexff.cn/api/download-stats/total')
    .then(response => response.json())
    .then(data => {
        console.log('总下载量:', data.data);
    });
```

### 4. 获取指定平台下载量

**接口**: `GET /download-stats/total/{platform}`

**描述**: 获取指定平台的总下载量

**路径参数**:
- `platform`: 平台类型，支持 `MAC`、`WINDOWS`、`LINUX`

**示例请求**:
```javascript
fetch('https://ilikexff.cn/api/download-stats/total/MAC')
    .then(response => response.json())
    .then(data => {
        console.log('Mac平台下载量:', data.data);
    });
```

## 前端集成示例

### HTML + JavaScript 示例

```html
<!DOCTYPE html>
<html>
<head>
    <title>应用下载页面</title>
</head>
<body>
    <div class="download-section">
        <h2>下载我的应用</h2>
        <div class="download-buttons">
            <button onclick="downloadApp('MAC')">下载 Mac 版本</button>
            <button onclick="downloadApp('WINDOWS')">下载 Windows 版本</button>
            <button onclick="downloadApp('LINUX')">下载 Linux 版本</button>
        </div>
        
        <div class="stats-section">
            <h3>下载统计</h3>
            <div id="download-stats">加载中...</div>
        </div>
    </div>

    <script>
        // 记录下载
        function downloadApp(platform) {
            // 记录下载统计
            fetch('https://ilikexff.cn/api/download-stats/record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `platform=${platform}&referer=${encodeURIComponent(window.location.href)}`
            }).then(() => {
                // 刷新统计数据
                loadDownloadStats();
            }).catch(error => {
                console.error('记录下载失败:', error);
            });

            // 触发实际下载
            const downloadUrls = {
                'MAC': '/downloads/myapp-mac.dmg',
                'WINDOWS': '/downloads/myapp-windows.exe',
                'LINUX': '/downloads/myapp-linux.AppImage'
            };
            
            const link = document.createElement('a');
            link.href = downloadUrls[platform];
            link.download = '';
            link.click();
        }

        // 加载下载统计
        function loadDownloadStats() {
            fetch('https://ilikexff.cn/api/download-stats/stats')
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        const stats = data.data;
                        document.getElementById('download-stats').innerHTML = `
                            <p>总下载量: ${stats.totalDownloads}</p>
                            <p>Mac: ${stats.macDownloads} | Windows: ${stats.windowsDownloads} | Linux: ${stats.linuxDownloads}</p>
                            <p>今日下载: ${stats.todayTotalDownloads}</p>
                        `;
                    }
                })
                .catch(error => {
                    console.error('加载统计失败:', error);
                    document.getElementById('download-stats').innerHTML = '加载失败';
                });
        }

        // 页面加载时获取统计数据
        window.onload = function() {
            loadDownloadStats();
        };
    </script>
</body>
</html>
```

### React 示例

```jsx
import React, { useState, useEffect } from 'react';

const DownloadPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE = 'https://ilikexff.cn/api';

    useEffect(() => {
        loadDownloadStats();
    }, []);

    const loadDownloadStats = async () => {
        try {
            const response = await fetch(`${API_BASE}/download-stats/stats`);
            const data = await response.json();
            if (data.code === 200) {
                setStats(data.data);
            }
        } catch (error) {
            console.error('加载统计失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (platform) => {
        try {
            // 记录下载
            await fetch(`${API_BASE}/download-stats/record`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `platform=${platform}&referer=${encodeURIComponent(window.location.href)}`
            });

            // 刷新统计
            loadDownloadStats();

            // 触发下载
            const downloadUrls = {
                'MAC': '/downloads/myapp-mac.dmg',
                'WINDOWS': '/downloads/myapp-windows.exe',
                'LINUX': '/downloads/myapp-linux.AppImage'
            };

            const link = document.createElement('a');
            link.href = downloadUrls[platform];
            link.download = '';
            link.click();
        } catch (error) {
            console.error('下载失败:', error);
        }
    };

    return (
        <div className="download-page">
            <h2>下载我的应用</h2>
            
            <div className="download-buttons">
                <button onClick={() => handleDownload('MAC')}>
                    下载 Mac 版本
                </button>
                <button onClick={() => handleDownload('WINDOWS')}>
                    下载 Windows 版本
                </button>
                <button onClick={() => handleDownload('LINUX')}>
                    下载 Linux 版本
                </button>
            </div>

            <div className="stats-section">
                <h3>下载统计</h3>
                {loading ? (
                    <p>加载中...</p>
                ) : stats ? (
                    <div>
                        <p>总下载量: {stats.totalDownloads}</p>
                        <p>Mac: {stats.macDownloads} | Windows: {stats.windowsDownloads} | Linux: {stats.linuxDownloads}</p>
                        <p>今日下载: {stats.todayTotalDownloads}</p>
                    </div>
                ) : (
                    <p>加载失败</p>
                )}
            </div>
        </div>
    );
};

export default DownloadPage;
```

## 部署说明

### 1. 数据库迁移

在生产环境执行数据库迁移脚本：

```bash
mysql -u root -p apex_blog < download_stats_migration.sql
```

### 2. 应用部署

重新构建并部署应用：

```bash
./gradlew clean bootJar
# 上传并重启应用服务
```

### 3. 验证部署

```bash
# 测试API接口
curl -X POST "https://ilikexff.cn/api/download-stats/record" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "platform=MAC&referer=https://waer.ltd"

curl "https://ilikexff.cn/api/download-stats/stats"
```

## 特性说明

1. **自动平台检测**: 如果不指定平台，系统会根据User-Agent自动判断
2. **IP去重**: 同一IP同一天同一平台只记录一次下载
3. **跨域支持**: 已配置允许waer.ltd域名访问
4. **统计信息**: 提供总下载量和今日下载量统计
5. **性能优化**: 使用数据库索引优化查询性能

## 注意事项

1. 确保waer.ltd域名已在CORS配置中允许
2. 生产环境需要HTTPS协议
3. 建议在前端添加错误处理和重试机制
4. 可以根据需要添加更多统计维度（如地理位置、时间段等）
