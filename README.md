# Willwi 賽博音樂創作者網站

這是一個為音樂創作者 Willwi（陳威兒）設計的賽博風格個人網站，具有完整的音樂播放器功能和多語言支持。

## 功能特色

- 🎵 **音樂播放器**：完整的音樂播放控制，包括播放/暫停、上一首/下一首、進度條和音量控制
- 🌐 **多語言支持**：支援中文、英文、日文三種語言
- 🎨 **賽博風格設計**：藍色霓虹燈效果、網格背景、動畫效果
- 📱 **響應式設計**：完美適配桌面和移動設備
- ⌨️ **鍵盤快捷鍵**：空白鍵播放/暫停，左右箭頭切換歌曲
- 🎭 **視覺效果**：浮動粒子、音頻視覺化、平滑動畫

## 文件結構

```
willwi-website/
├── index.html          # 主頁面
├── css/
│   └── style.css       # 樣式文件
├── js/
│   └── main.js         # JavaScript 功能
├── images/
│   ├── avatar.jpg      # 頭像圖片
│   ├── track1.jpg      # 《靜默退場》專輯封面
│   ├── track2.jpg      # 《時間線》專輯封面
│   └── track3.jpg      # 《存在》專輯封面
├── music/
│   ├── track1.mp3      # 《靜默退場》音樂檔案（需要添加）
│   ├── track2.mp3      # 《時間線》音樂檔案（需要添加）
│   └── track3.mp3      # 《存在》音樂檔案（需要添加）
└── assets/             # 其他資源文件
```

## 如何添加音樂檔案

1. 將您的 .mp3 音樂檔案重新命名為：
   - `track1.mp3` - 對應《靜默退場》
   - `track2.mp3` - 對應《時間線》
   - `track3.mp3` - 對應《存在》

2. 將這些檔案放入 `music/` 資料夾中，替換現有的佔位符檔案

3. 如果需要添加更多歌曲，請：
   - 在 `js/main.js` 中的 `tracks` 陣列添加新的歌曲資訊
   - 在 `index.html` 中添加對應的音樂卡片
   - 添加對應的專輯封面圖片到 `images/` 資料夾

## 如何自定義

### 更換頭像
將您的頭像圖片重新命名為 `avatar.jpg` 並放入 `images/` 資料夾

### 修改個人資訊
編輯 `index.html` 中的以下部分：
- 關於我的文字內容
- 社交媒體連結
- 音樂平台連結

### 調整顏色主題
在 `css/style.css` 中修改 CSS 變數來改變顏色主題

## GitHub Pages 部署指南

### 1. 創建 GitHub 倉庫
1. 登入 GitHub
2. 創建新倉庫，命名為 `willwi-website` 或您喜歡的名稱
3. 設為 Public（GitHub Pages 免費版需要公開倉庫）

### 2. 上傳網站檔案
1. 將整個 `willwi-website` 資料夾的內容上傳到倉庫
2. 確保 `index.html` 在倉庫根目錄

### 3. 啟用 GitHub Pages
1. 進入倉庫設定 (Settings)
2. 滾動到 "Pages" 部分
3. 在 "Source" 下選擇 "Deploy from a branch"
4. 選擇 "main" 分支和 "/ (root)" 資料夾
5. 點擊 "Save"

### 4. 設定自定義域名 (willwi.com)
1. 在倉庫根目錄創建 `CNAME` 檔案
2. 在檔案中輸入：`www.willwi.com`
3. 提交變更

### 5. 配置 DNS 設定
在您的 GoDaddy 域名管理中：

1. **添加 CNAME 記錄**：
   - 類型：CNAME
   - 名稱：www
   - 值：yourusername.github.io

2. **添加 A 記錄**（用於根域名）：
   - 類型：A
   - 名稱：@
   - 值：185.199.108.153
   - 值：185.199.109.153
   - 值：185.199.110.153
   - 值：185.199.111.153

### 6. 等待生效
DNS 變更可能需要 24-48 小時才能完全生效。

## 技術規格

- **前端技術**：HTML5, CSS3, JavaScript (ES6+)
- **字體**：Google Fonts (Orbitron, Noto Sans TC)
- **瀏覽器支援**：現代瀏覽器 (Chrome, Firefox, Safari, Edge)
- **響應式斷點**：768px (平板), 480px (手機)

## 瀏覽器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 授權

此網站為 Willwi（陳威兒）專用，請勿未經授權使用。

## 聯絡資訊

- 官方網站：https://www.willwi.com
- 商業合作：contact@willwi.com

---

**音樂無界，夢想不滅** 🎵

