# 快速部署指南 - Willwi 網站

## 🚀 5 分鐘快速部署

### 1. 創建 GitHub 倉庫
- 登入 GitHub
- 創建新的 Public 倉庫：`willwi-website`

### 2. 上傳檔案
將整個 `willwi-website` 資料夾的所有檔案上傳到倉庫根目錄

### 3. 啟用 GitHub Pages
- 進入倉庫 Settings > Pages
- Source: Deploy from a branch
- Branch: main, Folder: / (root)
- Save

### 4. 設定域名（可選）
- 在 Pages 設定中輸入：`www.willwi.com`
- 在 GoDaddy DNS 中設定：
  - CNAME: www → yourusername.github.io
  - A 記錄: @ → 185.199.108.153 (及其他三個 IP)

### 5. 等待生效
- GitHub Pages 部署：5-10 分鐘
- DNS 傳播：24-48 小時

## 📁 必要檔案清單

```
✅ index.html
✅ CNAME
✅ README.md
✅ DEPLOYMENT_GUIDE.md
✅ css/style.css
✅ js/main.js
✅ images/avatar.jpg
✅ images/track1.jpg
✅ images/track2.jpg
✅ images/track3.jpg
✅ music/track1.mp3 (需要替換為真實音樂檔案)
✅ music/track2.mp3 (需要替換為真實音樂檔案)
✅ music/track3.mp3 (需要替換為真實音樂檔案)
```

## 🎵 添加真實音樂檔案

1. 將您的 MP3 檔案重新命名：
   - `track1.mp3` → 《靜默退場》
   - `track2.mp3` → 《時間線》
   - `track3.mp3` → 《存在》

2. 替換 `music/` 資料夾中的檔案

3. 提交變更到 GitHub

## 🔧 自定義設定

### 更新個人資訊
編輯 `index.html` 中的：
- 關於我的文字
- 社交媒體連結
- 音樂平台連結

### 更換頭像
替換 `images/avatar.jpg`

### 修改顏色主題
編輯 `css/style.css` 中的顏色變數

## 📞 需要幫助？

詳細說明請參考 `DEPLOYMENT_GUIDE.md`

---

**音樂無界，夢想不滅** 🎵

