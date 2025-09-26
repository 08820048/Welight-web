<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
    <!-- Hero Section -->
    <section class="section-padding">
      <div class="container-custom text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          下载您的应用
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          选择适合您操作系统的版本，开始智能高效的文档编辑体验
        </p>
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div class="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            最新版本：v2.4.2
          </div>
          <div class="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            总下载量：{{ totalDownloads.toLocaleString() }}次
          </div>
        </div>
      </div>
    </section>

    <!-- Download Options -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Windows -->
          <div class="card p-8 text-center hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0,0V11.408H11.408V0ZM12.594,0V11.408H24V0ZM0,12.594V24H11.408V12.594ZM12.594,12.594V24H24V12.594Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Windows</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">适用于 Windows 10/11</p>
            <div class="space-y-3">
              <button class="btn-primary w-full" @click="downloadFile('windows-installer')">
                下载安装包 (.exe)
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button class="btn-primary w-full" @click="downloadFile('windows-msi')">
                MSI 安装包 (.msi)
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">EXE: 5.84 MB | MSI: 8.34 MB</p>
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>EXE: {{ downloadStats['windows-installer'].toLocaleString() }} 次</span>
                <span>MSI: {{ downloadStats['windows-msi'].toLocaleString() }} 次</span>
              </div>
            </div>
          </div>

          <!-- macOS -->
          <div class="card p-8 text-center hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">macOS</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">适用于 macOS 10.15+</p>
            <div class="space-y-3">
              <button class="btn-secondary w-full" @click="downloadFile('macos-intel')">
                Intel 芯片 (.dmg)
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button class="btn-primary w-full" @click="downloadFile('macos-apple')">
                Apple Silicon (.dmg)
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">Intel: 13.2 MB | Apple Silicon: 13 MB</p>
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Intel: {{ downloadStats['macos-intel'].toLocaleString() }} 次</span>
                <span>Apple Silicon: {{ downloadStats['macos-apple'].toLocaleString() }} 次</span>
              </div>
            </div>
          </div>

          <!-- Linux -->
          <div class="card p-8 text-center hover:scale-105 transition-transform duration-300">
            <div class="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-orange-600 dark:text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.066c-.297.168-.623.336-.995.268-.4-.051-.811-.03-1.206-.125-.365-.086-.718-.224-1.05-.479-.297-.239-.543-.527-.708-.815-.194-.328-.353-.66-.401-1.058-.035-.31-.008-.579.15-.849.135-.23.355-.406.608-.523.404-.187.818-.131 1.259-.199v-.016h-.073zm-2.452 7.407h.016c.442.02.72.199 1.004.284.336.099.672.198 1.062.201.435-.006.81-.118 1.18-.284.06-.03.135-.044.195-.09.225-.136.405-.334.558-.538.404-.534.67-1.126.972-1.67.17-.3.346-.3.521-.06.299.404.413.842.477 1.314.037.279.017.558-.031.818-.064.434-.23.747-.475 1.005-.154.15-.346.3-.504.465-.225.24-.42.48-.668.671-.537.434-1.108.747-1.764.925-.612.15-1.238.12-1.854.06-.292-.03-.584-.06-.87-.135-.255-.06-.51-.135-.725-.27-.154-.09-.293-.225-.417-.375-.109-.135-.199-.284-.25-.465-.047-.181-.016-.378.031-.553.064-.24.209-.464.403-.629.226-.181.478-.284.751-.329.399-.06.818.044 1.207-.105.06-.023.12-.06.18-.104h-.011z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Linux</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">适用于主流 Linux 发行版</p>
            <div class="space-y-3">
              <button class="btn-primary w-full" @click="downloadFile('linux-appimage')">
                AppImage (84 MB)
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button class="btn-secondary w-full" @click="downloadFile('linux-deb')">
                Debian (.deb) - 9.8 MB
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button class="btn-secondary w-full" @click="downloadFile('linux-rpm')">
                RPM (.rpm) - 9.8 MB
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-4">支持多种 Linux 发行版</p>
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div class="text-xs text-gray-500 dark:text-gray-400 text-center">
                <span>AppImage: {{ downloadStats['linux-appimage'].toLocaleString() }} 次 | DEB: {{ downloadStats['linux-deb'].toLocaleString() }} 次</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- System Requirements -->
    <section class="section-padding bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            系统要求
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            确保您的系统满足以下最低要求
          </p>
        </div>

        <div class="max-w-2xl mx-auto">
          <div class="bg-white dark:bg-gray-700 p-8 rounded-lg text-center">
            <div class="text-gray-600 dark:text-gray-300">
              <p class="text-lg">• Windows 10+ / macOS 10.13+ / Ubuntu 18.04+</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Installation Guide -->
    <section class="section-padding bg-white dark:bg-gray-900">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            安装指南
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            详细的安装说明和故障排除指南
          </p>
        </div>

        <div class="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
          <!-- macOS 安装指南 -->
          <div class="mb-12">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg class="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
              </svg>
              macOS 安装指南
            </h3>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
              <h4 class="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">⚠️ 常见问题：安全警告</h4>
              <p class="text-yellow-700 dark:text-yellow-300 mb-3">在 macOS 上首次安装时，您可能会看到以下安全警告：</p>
              <div class="bg-gray-100 dark:bg-gray-800 rounded p-3 mb-3 font-mono text-sm">
                "Welight" 已损坏，无法打开。你应该将它移到废纸篓。
              </div>
              <p class="text-yellow-700 dark:text-yellow-300 font-semibold">这是正常现象！这是因为我们的应用没有经过 Apple 的代码签名和公证服务。</p>
            </div>

            <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">解决方案</h4>

            <div class="space-y-6">
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h5 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">方法一：系统偏好设置（推荐）</h5>
                <ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>打开系统偏好设置 → 安全性与隐私</li>
                  <li>在"通用"选项卡中，您会看到被阻止的应用信息</li>
                  <li>点击 <strong>"仍要打开"</strong> 按钮</li>
                  <li>输入管理员密码确认</li>
                </ol>
              </div>

              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h5 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">方法二：右键菜单打开</h5>
                <ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>在 Finder 中找到 Welight 应用</li>
                  <li>按住 Control 键点击应用图标（或右键点击）</li>
                  <li>在弹出菜单中选择"打开"</li>
                  <li>在安全对话框中点击"打开"</li>
                </ol>
              </div>

              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h5 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">方法三：终端命令（高级用户）</h5>
                <p class="text-gray-600 dark:text-gray-300 mb-3">如果上述方法无效，可以使用终端命令移除隔离属性：</p>
                <div class="bg-gray-900 rounded-lg p-4 mb-3">
                  <code class="text-green-400 text-sm font-mono">
                    sudo xattr -rd com.apple.quarantine /Applications/Welight.app
                  </code>
                </div>
                <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
                  <p class="text-yellow-700 dark:text-yellow-300 text-sm">
                    <strong>⚠️ 注意：</strong>请确保您信任此应用再执行此命令。此命令会移除 macOS 的隔离保护。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Windows 安装指南 -->
          <div class="mb-12">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg class="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M0,0V11.408H11.408V0ZM12.594,0V11.408H24V0ZM0,12.594V24H11.408V12.594ZM12.594,12.594V24H24V12.594Z"/>
              </svg>
              Windows 安装指南
            </h3>

            <div class="space-y-6">
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">从 EXE 安装包安装</h4>
                <ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>下载 <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Welight-x.x.x.exe</code> 文件</li>
                  <li>双击 <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">.exe</code> 文件启动安装向导</li>
                  <li>选择安装位置，确认安装选项</li>
                  <li>完成安装，从开始菜单或桌面快捷方式启动</li>
                </ol>
              </div>

              <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Windows 安全警告</h4>
                <p class="text-blue-700 dark:text-blue-300">如果 Windows Defender 提示警告：</p>
                <ol class="list-decimal list-inside space-y-1 text-blue-700 dark:text-blue-300 mt-2">
                  <li>点击"更多信息"</li>
                  <li>选择"仍要运行"</li>
                  <li>添加到信任列表（可选）</li>
                </ol>
              </div>
            </div>
          </div>

          <!-- 安全说明 -->
          <div class="mb-12">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛡️ 安全说明</h3>

            <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">✅ 应用完全安全</h4>
              <ul class="list-disc list-inside space-y-2 text-green-700 dark:text-green-300">
                <li><strong>正规软件</strong>：由专业团队开发的正规应用程序</li>
                <li><strong>无恶意代码</strong>：不包含任何恶意或间谍软件</li>
                <li><strong>本地运行</strong>：应用完全在本地运行，不上传用户数据</li>
                <li><strong>隐私保护</strong>：严格保护用户隐私，不收集个人信息</li>
              </ul>
            </div>
          </div>

          <!-- 故障排除 -->
          <div class="mb-12">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔧 故障排除</h3>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">macOS 常见问题</h4>
                <div class="space-y-3">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">问题：应用无法启动</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">确保已按照上述方法允许应用运行</p>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">问题：提示"应用已损坏"</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">重新下载安装包或使用终端命令移除隔离属性</p>
                  </div>
                </div>
              </div>

              <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Windows 常见问题</h4>
                <div class="space-y-3">
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">问题：安装程序无法运行</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">以管理员身份运行安装程序</p>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">问题：应用启动缓慢</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">将应用添加到杀毒软件白名单</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 快速开始 -->
          <div class="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">🎯 快速开始</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">安装完成后，您可以：</p>
            <ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong>选择主题</strong>：从多种精美主题中选择</li>
              <li><strong>开始编辑</strong>：直接在左侧编辑器中输入 Markdown</li>
              <li><strong>实时预览</strong>：右侧实时查看排版效果</li>
              <li><strong>一键复制</strong>：点击复制按钮，粘贴到微信公众号</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- Support Section -->
    <section class="section-padding bg-gray-50 dark:bg-gray-800">
      <div class="container-custom text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          需要帮助？
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          如果您在安装或使用过程中遇到问题，我们随时为您提供支持
        </p>
        <div class="flex justify-center">
          <button @click="showQQGroup" class="btn-primary">
            联系支持
          </button>
        </div>

        <!-- QQ群信息弹窗 -->
        <div v-if="showQQModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeQQModal">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-4 shadow-2xl" @click.stop>
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Welight 交流反馈群</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">遇到问题或需要帮助？欢迎加入我们的QQ群</p>

              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">QQ群号</p>
                <div class="flex items-center justify-center space-x-2">
                  <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">474919458</span>
                  <button @click="copyQQGroup" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <p v-if="copied" class="text-green-600 text-sm mt-2">群号已复制到剪贴板</p>
              </div>

              <div class="flex space-x-3">
                <button @click="closeQQModal" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  关闭
                </button>
                <a href="https://qm.qq.com/q/Q7CbqSNmUY" target="_blank" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center">
                  直接加群
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 反馈链接区域 -->
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container-custom">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            帮助我们改进 Welight
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
            您的反馈对我们非常重要，让我们一起打造更好的产品
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <a href="https://docs.qq.com/sheet/DS1RITFdUR1BQSURY?tdsourcetag=nt-grpaio-file"
               target="_blank"
               class="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>问题反馈</span>
            </a>
            <a href="https://docs.qq.com/sheet/DS3NVaFhQeVZTSG11?tdsourcetag=nt-grpaio-file"
               target="_blank"
               class="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>功能诉求</span>
            </a>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400 mt-6">
            点击上方按钮将在新窗口中打开腾讯文档，您可以直接填写反馈信息
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { handleDownload, initializeDownloadStats, startStatsSync, getDownloadStats } from '@/services/downloadStats'
import { useSEO, seoConfigs } from '@/composables/useSEO'

// SEO配置
useSEO(seoConfigs.download)

// 下载统计数据 - 从后端API获取真实统计
const downloadStats = ref({
  'windows-installer': 0,
  'windows-msi': 0,
  'macos-apple': 0,
  'macos-intel': 0,
  'linux-appimage': 0,
  'linux-deb': 0,
  'linux-rpm': 0
})

// 后端原始统计数据
const backendStats = ref(null)

// 计算总下载量 - 优先使用后端数据
const totalDownloads = computed(() => {
  if (backendStats.value && backendStats.value.totalDownloads) {
    return backendStats.value.totalDownloads
  }
  return Object.values(downloadStats.value).reduce((total, count) => total + count, 0)
})

// QQ群弹窗相关
const showQQModal = ref(false)
const copied = ref(false)

// 显示QQ群信息
const showQQGroup = () => {
  showQQModal.value = true
}

// 关闭QQ群弹窗
const closeQQModal = () => {
  showQQModal.value = false
  copied.value = false
}

// 复制QQ群号
const copyQQGroup = async () => {
  try {
    await navigator.clipboard.writeText('474919458')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    // 如果浏览器不支持clipboard API，使用传统方法
    const textArea = document.createElement('textarea')
    textArea.value = '474919458'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// 下载文件函数
const downloadFile = async (platform) => {
  // 实际下载链接映射
  const downloadUrls = {
    // Windows
    'windows-installer': 'https://waer.ltd/downloads/windows/Welight_2.4.2_x64-setup.exe',
    'windows-msi': 'https://waer.ltd/downloads/windows/Welight_2.4.2_x64_en-US.msi',
    // macOS
    'macos-apple': 'https://waer.ltd/downloads/mac/Welight_2.4.2_aarch64.dmg',
    'macos-intel': 'https://waer.ltd/downloads/mac/Welight_2.4.2_x64.dmg',
    // Linux
    'linux-appimage': 'https://waer.ltd/downloads/linux/Welight_2.4.2_amd64.AppImage',
    'linux-deb': 'https://waer.ltd/downloads/linux/Welight_2.4.2_amd64.deb',
    'linux-rpm': 'https://waer.ltd/downloads/linux/Welight-2.4.2-1.x86_64.rpm'
  }

  const downloadUrl = downloadUrls[platform]

  if (downloadUrl) {
    // 使用新的下载处理服务，传入更新本地统计的回调
    const updateLocalStats = async (downloadedPlatform) => {
      try {
        // 更新本地统计数据
        const currentStats = { ...downloadStats.value }
        if (currentStats[downloadedPlatform] !== undefined) {
          currentStats[downloadedPlatform] += 1
        }
        downloadStats.value = currentStats

        // 同时刷新后端原始数据
        const rawData = await getDownloadStats()
        if (rawData) {
          backendStats.value = rawData
        }
        console.log('本地统计已更新:', currentStats, '后端数据:', rawData)
      } catch (error) {
        console.error('更新本地统计失败:', error)
      }
    }

    await handleDownload(platform, downloadUrl, updateLocalStats)
  } else {
    console.log(`${platform} 版本暂不可用`)
    alert(`${platform} 版本即将推出，敬请期待！`)
  }
}

// 初始化下载统计数据
const loadDownloadStats = async () => {
  try {
    // 先获取后端原始数据
    const rawData = await getDownloadStats()
    if (rawData) {
      backendStats.value = rawData
      console.log('后端原始数据:', rawData)
    }

    // 再获取映射后的数据
    const stats = await initializeDownloadStats()
    downloadStats.value = stats
    console.log('映射后的统计数据:', stats)
  } catch (error) {
    console.error('初始化下载统计数据失败:', error)
  }
}

// 统计数据同步清理函数
let statsCleanup = null

// 组件挂载时加载数据
onMounted(async () => {
  // 初始化下载统计数据
  await loadDownloadStats()

  // 启动统计数据同步（每5分钟同步一次）
  statsCleanup = startStatsSync(async (newStats) => {
    downloadStats.value = newStats
    // 同时更新后端原始数据
    const rawData = await getDownloadStats()
    if (rawData) {
      backendStats.value = rawData
    }
  }, 5 * 60 * 1000)
})

// 组件卸载时清理
onUnmounted(() => {
  if (statsCleanup) {
    statsCleanup()
  }
})
</script>
