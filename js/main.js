// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 背景影片控制
    const desktopVideo = document.getElementById('desktop-video');
    const mobileVideo = document.getElementById('mobile-video');
    const videoToggle = document.getElementById('video-toggle');
    const videoToggleIcon = videoToggle.querySelector('i');
    
    // 檢查是否為移動設備
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // 取得當前活動的影片元素
    function getActiveVideo() {
        if (isMobile) {
            return mobileVideo;
        } else {
            return desktopVideo;
        }
    }
    
    // 背景影片播放/暫停功能
    videoToggle.addEventListener('click', function() {
        const activeVideo = getActiveVideo();
        
        if (activeVideo.paused) {
            activeVideo.play();
            videoToggleIcon.classList.remove('fa-play');
            videoToggleIcon.classList.add('fa-pause');
        } else {
            activeVideo.pause();
            videoToggleIcon.classList.remove('fa-pause');
            videoToggleIcon.classList.add('fa-play');
        }
    });
    
    // 移動設備自動播放設定
    if (isMobile) {
        mobileVideo.setAttribute('autoplay', '');
        mobileVideo.setAttribute('playsinline', '');
        mobileVideo.setAttribute('muted', '');
        mobileVideo.muted = true;
        mobileVideo.play().catch(error => {
            console.log('自動播放失敗:', error);
        });
    } else {
        desktopVideo.setAttribute('autoplay', '');
        desktopVideo.setAttribute('playsinline', '');
        desktopVideo.setAttribute('muted', '');
        desktopVideo.muted = true;
        desktopVideo.play().catch(error => {
            console.log('自動播放失敗:', error);
        });
    }
    
    // 導航欄滾動效果
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        // 導航欄背景變化
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 滾動顯示動畫
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                // 更新導航欄活動項目
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // 添加顯示動畫
                const reveals = section.querySelectorAll('.reveal');
                reveals.forEach(item => {
                    item.classList.add('active');
                });
            }
        });
    });
    
    // 滾動顯示元素
    const revealElements = document.querySelectorAll('.reveal');
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // 初始檢查
    
    // 移動菜單功能
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    
    const mobileOverlay = document.createElement('div');
    mobileOverlay.classList.add('mobile-overlay');
    
    // 創建移動菜單內容
    mobileMenu.innerHTML = `
        <div class="mobile-menu-close"><i class="fas fa-times"></i></div>
        <ul>
            <li><a href="#home">首頁</a></li>
            <li><a href="#music">音樂</a></li>
            <li><a href="#videos">影音</a></li>
            <li><a href="#about">關於</a></li>
            <li><a href="#contact">聯絡</a></li>
        </ul>
    `;
    
    document.body.appendChild(mobileMenu);
    document.body.appendChild(mobileOverlay);
    
    // 移動菜單開關
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // 關閉移動菜單
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 移動菜單項目點擊
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // 音樂播放器功能模擬
    const playButton = document.getElementById('play');
    const playButtonIcon = playButton.querySelector('i');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progressBar = document.getElementById('progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const volumeLevel = document.getElementById('volume-level');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    let isPlaying = false;
    
    // 播放/暫停按鈕
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            isPlaying = false;
            playButtonIcon.classList.remove('fa-pause');
            playButtonIcon.classList.add('fa-play');
        } else {
            isPlaying = true;
            playButtonIcon.classList.remove('fa-play');
            playButtonIcon.classList.add('fa-pause');
        }
    });
    
    // 播放列表項目點擊
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            playlistItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // 更新播放器信息
            const trackName = this.querySelector('.track-name').textContent;
            document.getElementById('track-title').textContent = trackName;
            
            // 模擬播放
            isPlaying = true;
            playButtonIcon.classList.remove('fa-play');
            playButtonIcon.classList.add('fa-pause');
        });
    });
    
    // 模擬進度條更新
    let progressWidth = 30;
    let progressInterval;
    
    function startProgressSimulation() {
        progressInterval = setInterval(() => {
            progressWidth = (progressWidth + 1) % 100;
            progressBar.style.width = `${progressWidth}%`;
            
            // 更新時間顯示
            const currentMinutes = Math.floor(progressWidth * 4 / 100);
            const currentSeconds = Math.floor((progressWidth * 4 / 100 - currentMinutes) * 60);
            currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    function stopProgressSimulation() {
        clearInterval(progressInterval);
    }
    
    // 播放按鈕控制進度條模擬
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            startProgressSimulation();
        } else {
            stopProgressSimulation();
        }
    });
    
    // 初始化時間顯示
    currentTimeDisplay.textContent = '0:00';
    durationDisplay.textContent = '4:00';
    
    // 音量控制模擬
    volumeLevel.addEventListener('click', function(e) {
        const volumeBar = this.parentElement;
        const clickPosition = e.offsetX;
        const volumeWidth = volumeBar.offsetWidth;
        const newVolume = clickPosition / volumeWidth * 100;
        
        volumeLevel.style.width = `${newVolume}%`;
    });
    
    // Instagram 動態模擬
    const instagramFeed = document.getElementById('instagram-feed');
    
    // 如果有 Instagram 動態容器
    if (instagramFeed) {
        // 清除佔位符
        instagramFeed.innerHTML = '';
        
        // 創建模擬的 Instagram 貼文
        const posts = [
            { image: 'images/instagram-1.jpg', likes: 245, comments: 18 },
            { image: 'images/instagram-2.jpg', likes: 312, comments: 24 },
            { image: 'images/instagram-3.jpg', likes: 189, comments: 12 },
            { image: 'images/instagram-4.jpg', likes: 276, comments: 31 }
        ];
        
        // 使用佔位圖片
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('instagram-post');
            postElement.innerHTML = `
                <a href="https://www.instagram.com/willchean_0709/" target="_blank">
                    <div class="instagram-post-image" style="background-color: rgba(30, 42, 69, 0.7); height: 150px; display: flex; align-items: center; justify-content: center;">
                        <i class="fab fa-instagram" style="font-size: 2rem;"></i>
                    </div>
                    <div class="instagram-post-info">
                        <div class="instagram-post-likes">
                            <i class="fas fa-heart"></i> ${post.likes}
                        </div>
                        <div class="instagram-post-comments">
                            <i class="fas fa-comment"></i> ${post.comments}
                        </div>
                    </div>
                </a>
            `;
            instagramFeed.appendChild(postElement);
        });
    }
    
    // 添加滾動顯示類到各區塊元素
    document.querySelectorAll('.music-player-container, .music-list, .streaming-platforms, .featured-video, .video-item, .about-content, .release-container, .contact-info, .instagram-feed').forEach(element => {
        element.classList.add('reveal');
    });
    
    // 初始檢查滾動顯示
    checkReveal();
});
