# Willwi 網站部署與維護指南

## 一、部署前準備

### 文件結構
請確保您的網站文件結構如下：
```
willwi-website/
├── index.html          # 主網頁文件
├── images/             # 圖片與音樂資料夾
│   ├── willwi-profile.jpg
│   ├── 證書.jpeg
│   ├── caspar_logo.png.png
│   ├── facebook.png
│   ├── instagram.png
│   ├── twitter.png
│   ├── spotify-logo.png
│   ├── apple-music-logo.png
│   ├── youtube-music-logo.png
│   └── 說不出的再見 發行.mp3  # 背景音樂
└── background-video.mp4  # 背景影片
```

### 檔案檢查清單
在部署前，請確認以下事項：

1. **index.html** 文件是否完整無誤
2. **images/** 資料夾中是否包含所有必要的圖片與音樂檔案
3. **background-video.mp4** 是否存在於根目錄

## 二、GitHub Pages 部署步驟

### 1. 創建 GitHub 倉庫
1. 登入您的 GitHub 帳號
2. 創建新倉庫，命名為 `您的用戶名.github.io`
3. 選擇 Public 可見性

### 2. 使用 Git Bash 上傳文件
1. 在您的網站資料夾中右鍵點擊，選擇 "Git Bash Here"
2. 執行以下命令：

```bash
# 初始化 Git 倉庫
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始網站部署"

# 連接到 GitHub 倉庫
git remote add origin https://github.com/您的用戶名/您的用戶名.github.io.git

# 設置主分支名稱
git branch -M main

# 推送到 GitHub
git push -u origin main
```

### 3. 配置 GitHub Pages
1. 在 GitHub 倉庫頁面點擊 "Settings"
2. 在左側菜單中點擊 "Pages"
3. 在 "Source" 部分，選擇 "main" 分支和 "/(root)" 資料夾
4. 點擊 "Save"
5. 等待幾分鐘，您的網站將在 `https://您的用戶名.github.io` 上線

## 三、連接到自定義域名 (willwi.com)

### GoDaddy DNS 設定
1. 登入您的 GoDaddy 帳號
2. 進入 Domain 管理頁面，選擇 willwi.com
3. 點擊 "DNS" 或 "Manage DNS"
4. 添加以下 DNS 記錄：

   **A 記錄**：
   - 主機：@
   - 指向：185.199.108.153
   - 指向：185.199.109.153
   - 指向：185.199.110.153
   - 指向：185.199.111.153
   - TTL：1 小時

   **CNAME 記錄**：
   - 主機：www
   - 指向：您的用戶名.github.io
   - TTL：1 小時

5. 保存更改，DNS 生效可能需要 24-48 小時

### GitHub Pages 自定義域名設定
1. 在您的 GitHub 倉庫中創建一個名為 `CNAME` 的文件（無副檔名）
2. 在文件中只寫入您的域名：`willwi.com`
3. 提交並推送此文件到 GitHub
4. 在 GitHub Pages 設定頁面，在 "Custom domain" 欄位中輸入 `willwi.com`
5. 勾選 "Enforce HTTPS" 選項（如果可用）

## 四、網站維護指南

### 更新內容
要更新網站內容，請按照以下步驟：

1. 在本地修改 `index.html` 文件
2. 使用 Git Bash 提交並推送更改：
```bash
git add .
git commit -m "更新網站內容"
git push
```

### 添加新影片
要添加新的 YouTube 影片，請在 `index.html` 文件中找到以下代碼段：

```javascript
// YouTube 影片資料
const videos = [
  {
    id: 'GuxLiC-yx3Y',
    title: '🌈《等愛》｜獻給永遠的李玟 Coco Lee',
    duration: '7:05'
  },
  // ... 其他影片
];
```

按照相同格式添加新影片，確保提供正確的 YouTube 影片 ID、標題和時長。

### 更新社群媒體連結
要更新社群媒體連結，請在 `index.html` 文件中找到以下代碼段：

```html
<div class="social-icons">
  <a href="https://facebook.com/WillwiChen" target="_blank" class="social-icon" title="Facebook">
    <img src="images/facebook.png" alt="Facebook" />
  </a>
  <!-- ... 其他社群媒體連結 -->
</div>
```

修改 `href` 屬性以更新連結。

### 更新音樂平台連結
要更新音樂平台連結，請在 `index.html` 文件中找到以下代碼段：

```html
<div class="music-platforms">
  <a href="https://music.youtube.com/channel/UC3Jj31PziWsxhgiHyDGlpAg" target="_blank" title="YouTube Music">
    <img src="images/youtube-music-logo.png" alt="YouTube Music" class="platform-icon" />
  </a>
  <!-- ... 其他音樂平台連結 -->
</div>
```

修改 `href` 屬性以更新連結。

### 更新背景音樂
要更新背景音樂，請替換 `images/` 資料夾中的 `說不出的再見 發行.mp3` 文件，或修改 `index.html` 文件中的以下代碼：

```html
<audio id="bg-music" src="說不出的再見 發行.mp3" loop></audio>
```

將 `src` 屬性更改為新音樂文件的路徑。

## 五、常見問題與故障排除

### 圖片無法顯示
- 確保所有圖片文件都位於 `images/` 資料夾中
- 檢查 HTML 中的圖片路徑是否正確
- 確保圖片文件名稱與 HTML 中引用的名稱完全一致（區分大小寫）

### 背景音樂無法播放
- 確保音樂文件位於正確位置
- 檢查瀏覽器是否允許自動播放音頻
- 嘗試點擊頁面上的音頻控制按鈕手動播放

### 社群媒體或音樂平台連結無效
- 檢查連結是否正確
- 確保目標網站或頁面仍然存在
- 更新為最新的連結

### GitHub Pages 部署問題
- 確保倉庫名稱格式為 `您的用戶名.github.io`
- 檢查 `index.html` 文件是否位於倉庫根目錄
- 查看 GitHub Pages 設定是否正確配置

### DNS 設定問題
- 確保 DNS 記錄設定正確
- 等待 DNS 生效（可能需要 24-48 小時）
- 使用 [DNS Checker](https://dnschecker.org/) 檢查 DNS 傳播情況

## 六、聯絡支援

如果您在部署或維護過程中遇到任何問題，請隨時聯絡我們獲取支援：

- 郵箱：will@willwi.com

我們將盡快回覆並協助您解決問題。
