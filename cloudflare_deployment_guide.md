# Cloudflare Pages 部署與網域設定指南

本指南將幫助您將動態網站部署到 Cloudflare Pages，並將其連接到您的 willwi.com 網域。

## 第一部分：Cloudflare Pages 部署

### 步驟 1：註冊/登入 Cloudflare 帳戶

1. 前往 [Cloudflare 官網](https://www.cloudflare.com/)
2. 如果您還沒有帳戶，請點擊「註冊」；如果已有帳戶，請直接登入

### 步驟 2：創建新的 Pages 專案

1. 在 Cloudflare 儀表板中，點擊左側導航欄的「Pages」
2. 點擊「創建應用程式」按鈕
3. 選擇「直接上傳」選項（Direct Upload）

### 步驟 3：上傳網站文件

1. 將您收到的 `willwi_dynamic_website.zip` 解壓縮到本地電腦
2. 在 Cloudflare Pages 上傳頁面，將解壓後的 `website_project` 文件夾中的所有文件拖放到上傳區域
   - 確保上傳的是文件夾內的文件，而不是整個文件夾
   - 必須包含 index.html、css 文件夾、js 文件夾、images 文件夾和 videos 文件夾
3. 點擊「部署網站」按鈕

### 步驟 4：配置專案設置

1. 輸入專案名稱，例如 `willwi-official`
   - 這將決定您的臨時網址，例如 `willwi-official.pages.dev`
2. 選擇最近的生產分支（通常是 `main` 或 `production`）
3. 點擊「保存並部署」按鈕

### 步驟 5：等待部署完成

1. Cloudflare 將開始部署您的網站，這可能需要幾分鐘時間
2. 部署完成後，您將看到一個成功消息和您的臨時網址
3. 點擊該網址以確認您的網站已正確部署

## 第二部分：將網站連接到 willwi.com 網域

### 步驟 1：將網域添加到 Cloudflare（如果尚未添加）

1. 在 Cloudflare 儀表板中，點擊「添加網站」
2. 輸入您的網域 `willwi.com`
3. 選擇免費計劃（或您想要的任何計劃）
4. Cloudflare 將掃描您現有的 DNS 記錄
5. 確認記錄無誤後，點擊「繼續」

### 步驟 2：更新您的域名服務器

1. Cloudflare 將提供新的域名服務器（NS）記錄
2. 登錄到您的 GoDaddy 帳戶
3. 前往域名管理頁面
4. 找到 willwi.com 並點擊「管理」
5. 點擊「域名服務器」或「DNS」選項
6. 將 GoDaddy 的域名服務器替換為 Cloudflare 提供的域名服務器
7. 保存更改

### 步驟 3：等待 DNS 傳播

1. 域名服務器更改可能需要 24-48 小時才能完全傳播
2. 您可以使用 [DNS Checker](https://dnschecker.org/) 檢查傳播狀態
3. 當 Cloudflare 確認您的域名已成功添加時，您將收到電子郵件通知

### 步驟 4：將 Pages 專案連接到您的自定義域名

1. 在 Cloudflare 儀表板中，前往「Pages」
2. 選擇您剛才創建的專案（例如 `willwi-official`）
3. 點擊「自定義域」選項卡
4. 點擊「設置自定義域」按鈕
5. 輸入 `willwi.com`
6. 點擊「繼續」並確認設置

### 步驟 5：配置 DNS 記錄

Cloudflare 將自動為您創建必要的 DNS 記錄，但您可以驗證以下記錄是否存在：

1. 在 Cloudflare 儀表板中，前往「DNS」選項卡
2. 確認有一條指向您 Pages 專案的 CNAME 記錄：
   - 類型：CNAME
   - 名稱：www
   - 目標：您的 Pages 網址（例如 `willwi-official.pages.dev`）
3. 確認有一條根域名的 A 記錄或 CNAME 記錄

### 步驟 6：啟用 HTTPS

1. 在 Cloudflare 儀表板中，前往「SSL/TLS」選項卡
2. 確保 SSL 模式設置為「完全」或「完全（嚴格）」
3. Cloudflare 將自動為您的網站提供 SSL 證書

## 第三部分：測試與故障排除

### 測試您的網站

1. 在瀏覽器中訪問 `https://willwi.com`
2. 確認網站正確加載，包括所有圖像、視頻和樣式
3. 測試網站在不同設備（桌面、平板、手機）上的響應式設計

### 常見問題排除

#### 如果網站無法訪問：

1. 檢查 DNS 傳播是否完成（可能需要 24-48 小時）
2. 確認 Cloudflare 的 DNS 記錄設置正確
3. 檢查 SSL/TLS 設置是否正確

#### 如果網站樣式或媒體文件丟失：

1. 確認所有文件都已正確上傳到 Cloudflare Pages
2. 檢查網站控制台是否有 404 錯誤
3. 如有必要，重新上傳缺失的文件

#### 如果視頻背景無法播放：

1. 確認 videos 文件夾中的 background.mp4 已正確上傳
2. 檢查瀏覽器控制台是否有相關錯誤
3. 某些移動設備可能會限制自動播放，這是正常的行為

## 第四部分：維護與更新

### 更新網站內容

1. 對本地文件進行必要的更改
2. 登錄到 Cloudflare Pages
3. 選擇您的專案
4. 點擊「部署」選項卡
5. 點擊「上傳新版本」
6. 上傳更新後的文件
7. 點擊「部署」按鈕

### 監控網站性能

1. 使用 Cloudflare 的分析工具監控網站流量和性能
2. 定期檢查網站是否有任何錯誤或問題
3. 根據需要優化網站內容和媒體文件

## 結論

恭喜！您的動態網站現在應該已成功部署到 Cloudflare Pages，並連接到您的 willwi.com 域名。如果您在任何步驟中遇到困難，請參考 [Cloudflare 的官方文檔](https://developers.cloudflare.com/pages/)或聯繫 Cloudflare 支持。
