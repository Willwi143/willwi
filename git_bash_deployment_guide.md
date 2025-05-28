# Git Bash 部署指南：將優化後的網站部署到 GitHub Pages

本指南將幫助您使用 Git Bash 將優化後的網站部署到 GitHub Pages，以便您的網站能夠在 GitHub 上託管並公開訪問。

## 前置準備

1. **安裝 Git**：如果您尚未安裝 Git，請從 [git-scm.com](https://git-scm.com/) 下載並安裝
2. **GitHub 帳號**：確保您已有 GitHub 帳號，如果沒有請在 [github.com](https://github.com/) 註冊
3. **下載網站文件**：確保您已下載本次優化的所有網站文件

## 步驟一：創建 GitHub 倉庫

1. 登入您的 GitHub 帳號
2. 點擊右上角的 "+" 圖標，選擇 "New repository"
3. 倉庫名稱設為 `username.github.io`（將 `username` 替換為您的 GitHub 用戶名）
4. 選擇 "Public" 可見性
5. 不要勾選 "Initialize this repository with a README"
6. 點擊 "Create repository"

## 步驟二：使用 Git Bash 初始化本地倉庫

1. 在您的電腦上創建一個新資料夾，用於存放網站文件
2. 將所有優化後的網站文件（HTML、CSS、JavaScript、圖片等）複製到此資料夾中
3. 右鍵點擊資料夾，選擇 "Git Bash Here"
4. 在 Git Bash 中輸入以下命令初始化 Git 倉庫：

```bash
git init
```

## 步驟三：添加文件並提交

1. 添加所有文件到 Git 暫存區：

```bash
git add .
```

2. 提交更改：

```bash
git commit -m "初始網站部署"
```

## 步驟四：連接到 GitHub 倉庫

1. 將本地倉庫連接到您的 GitHub 倉庫：

```bash
git remote add origin https://github.com/username/username.github.io.git
```

（將 `username` 替換為您的 GitHub 用戶名）

2. 將主分支重命名為 `main`（GitHub 的默認分支名）：

```bash
git branch -M main
```

## 步驟五：推送到 GitHub

1. 將您的網站文件推送到 GitHub：

```bash
git push -u origin main
```

2. 系統會要求您輸入 GitHub 用戶名和密碼（或個人訪問令牌）

## 步驟六：配置 GitHub Pages

1. 在 GitHub 上打開您的倉庫
2. 點擊 "Settings"
3. 在左側菜單中點擊 "Pages"
4. 在 "Source" 部分，選擇 "main" 分支和 "/(root)" 資料夾
5. 點擊 "Save"
6. 等待幾分鐘，您的網站將在 `https://username.github.io` 上線（將 `username` 替換為您的 GitHub 用戶名）

## 步驟七：更新網站內容

當您需要更新網站內容時，請按照以下步驟操作：

1. 修改本地文件
2. 在 Git Bash 中添加更改：

```bash
git add .
```

3. 提交更改：

```bash
git commit -m "更新網站內容"
```

4. 推送到 GitHub：

```bash
git push
```

## 注意事項

1. **文件大小限制**：GitHub Pages 有文件大小限制，單個倉庫不應超過 1GB
2. **網站大小限制**：部署的網站不應超過 1GB
3. **帶寬限制**：每月有 100GB 的帶寬限制
4. **每小時構建限制**：每小時最多 10 次構建

## 故障排除

如果您在部署過程中遇到問題，請檢查以下幾點：

1. 確保 `index.html` 文件位於倉庫的根目錄
2. 確保所有文件路徑正確（使用相對路徑）
3. 檢查 GitHub 倉庫名稱是否正確（應為 `username.github.io`）
4. 等待幾分鐘，GitHub Pages 可能需要一些時間來部署您的網站

## 連接自定義域名

如果您想將 `willwi.com` 域名連接到 GitHub Pages，請參考我們的 [GoDaddy DNS 設定指南](/home/ubuntu/godaddy_dns_guide.md)。

---

如有任何問題，請隨時聯繫我們獲取支持。
