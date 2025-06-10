# GitHub Pages 部署指南 - Willwi 網站

## 概述

本指南將協助您將 Willwi 賽博音樂創作者網站部署到 GitHub Pages，並設定 willwi.com 自定義域名。

## 前置準備

- GitHub 帳號
- GoDaddy 域名管理權限
- 網站檔案（已準備完成）

## 步驟一：創建 GitHub 倉庫

### 1.1 登入 GitHub
1. 前往 [GitHub.com](https://github.com)
2. 登入您的帳號

### 1.2 創建新倉庫
1. 點擊右上角的 "+" 按鈕
2. 選擇 "New repository"
3. 倉庫名稱：`willwi-website`（或您喜歡的名稱）
4. 設為 **Public**（GitHub Pages 免費版需要公開倉庫）
5. 勾選 "Add a README file"
6. 點擊 "Create repository"

## 步驟二：上傳網站檔案

### 2.1 方法一：使用 GitHub 網頁界面
1. 在倉庫頁面點擊 "uploading an existing file"
2. 將以下檔案拖拽上傳：
   ```
   index.html
   CNAME
   README.md
   css/style.css
   js/main.js
   images/avatar.jpg
   images/track1.jpg
   images/track2.jpg
   images/track3.jpg
   music/track1.mp3
   music/track2.mp3
   music/track3.mp3
   ```
3. 在 Commit 訊息中輸入："Initial website upload"
4. 點擊 "Commit changes"

### 2.2 方法二：使用 Git 命令行
```bash
git clone https://github.com/yourusername/willwi-website.git
cd willwi-website
# 複製所有網站檔案到此資料夾
git add .
git commit -m "Initial website upload"
git push origin main
```

## 步驟三：啟用 GitHub Pages

### 3.1 進入倉庫設定
1. 在倉庫頁面點擊 "Settings" 標籤
2. 滾動到左側選單的 "Pages" 部分

### 3.2 配置 Pages 設定
1. 在 "Source" 部分選擇 "Deploy from a branch"
2. 選擇分支：**main**
3. 選擇資料夾：**/ (root)**
4. 點擊 "Save"

### 3.3 等待部署
- GitHub 會自動開始部署程序
- 通常需要 5-10 分鐘
- 部署完成後會顯示網站 URL：`https://yourusername.github.io/willwi-website`

## 步驟四：設定自定義域名（willwi.com）

### 4.1 在 GitHub 設定自定義域名
1. 在 Pages 設定頁面的 "Custom domain" 欄位
2. 輸入：`www.willwi.com`
3. 點擊 "Save"
4. 等待 DNS 檢查完成

### 4.2 配置 GoDaddy DNS 設定

#### 重要提醒
根據您之前的經驗，GoDaddy DNS 設定可能會遇到問題。請按照以下步驟仔細操作：

#### 4.2.1 登入 GoDaddy
1. 前往 [GoDaddy.com](https://godaddy.com)
2. 登入您的帳號
3. 進入 "My Products" > "Domains"
4. 點擊 willwi.com 旁的 "DNS" 按鈕

#### 4.2.2 設定 CNAME 記錄
1. 找到現有的 CNAME 記錄（如果有）
2. 編輯或新增 CNAME 記錄：
   - **類型**：CNAME
   - **名稱**：www
   - **值**：yourusername.github.io
   - **TTL**：1 Hour（預設）

#### 4.2.3 設定 A 記錄（用於根域名）
新增以下四個 A 記錄：

**記錄 1：**
- 類型：A
- 名稱：@
- 值：185.199.108.153
- TTL：1 Hour

**記錄 2：**
- 類型：A
- 名稱：@
- 值：185.199.109.153
- TTL：1 Hour

**記錄 3：**
- 類型：A
- 名稱：@
- 值：185.199.110.153
- TTL：1 Hour

**記錄 4：**
- 類型：A
- 名稱：@
- 值：185.199.111.153
- TTL：1 Hour

#### 4.2.4 刪除衝突記錄
- 刪除任何指向其他 IP 的 A 記錄
- 刪除可能衝突的 CNAME 記錄

## 步驟五：驗證部署

### 5.1 等待 DNS 傳播
- DNS 變更可能需要 24-48 小時才能完全生效
- 可以使用 [DNS Checker](https://dnschecker.org) 檢查傳播狀態

### 5.2 測試網站
1. 訪問 `https://www.willwi.com`
2. 檢查所有功能是否正常：
   - 多語言切換
   - 音樂播放器
   - 響應式設計
   - 導航功能

### 5.3 啟用 HTTPS
1. 回到 GitHub Pages 設定
2. 勾選 "Enforce HTTPS"
3. 等待 SSL 證書生成

## 故障排除

### 問題 1：DNS 設定無法保存
**解決方案：**
1. 清除瀏覽器快取
2. 嘗試使用無痕模式
3. 聯絡 GoDaddy 客服確認帳號權限

### 問題 2：網站顯示 404 錯誤
**解決方案：**
1. 確認 `index.html` 在倉庫根目錄
2. 檢查 GitHub Pages 是否已啟用
3. 等待部署完成（可能需要幾分鐘）

### 問題 3：自定義域名無法連接
**解決方案：**
1. 檢查 `CNAME` 檔案內容是否正確
2. 驗證 DNS 記錄設定
3. 等待 DNS 傳播完成
4. 使用 `dig` 或線上工具檢查 DNS 解析

### 問題 4：音樂檔案無法播放
**解決方案：**
1. 確認音樂檔案已正確上傳
2. 檢查檔案路徑和名稱
3. 確認瀏覽器支援 MP3 格式

## 替代方案

如果 GitHub Pages + GoDaddy DNS 設定持續有問題，可以考慮：

### 方案 1：直接使用 GoDaddy 主機
1. 將網站檔案上傳到 GoDaddy 主機空間
2. 設定根域名指向主機

### 方案 2：使用其他 DNS 服務
1. 將域名 DNS 指向 Cloudflare
2. 在 Cloudflare 設定 CNAME 記錄

### 方案 3：使用 GitHub 子域名
暫時使用 `yourusername.github.io/willwi-website` 作為網站地址

## 維護和更新

### 更新網站內容
1. 修改本地檔案
2. 上傳到 GitHub 倉庫
3. GitHub Pages 會自動重新部署

### 添加新音樂
1. 將新的 MP3 檔案上傳到 `music/` 資料夾
2. 在 `js/main.js` 中更新 `tracks` 陣列
3. 添加對應的專輯封面到 `images/` 資料夾
4. 在 `index.html` 中添加新的音樂卡片

## 聯絡支援

如果遇到技術問題，可以：
1. 查看 GitHub Pages 文檔
2. 聯絡 GoDaddy 客服
3. 在 GitHub 社群尋求幫助

---

**祝您部署順利！** 🚀

音樂無界，夢想不滅 🎵

