// 音樂播放器類
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.isPlaying = false;
        this.currentTrack = 0;
        this.volume = 0.7;
        this.tracks = [
            {
                title: '靜默退場',
                artist: 'Willwi',
                src: 'music/track1.mp3',
                cover: 'images/track1.jpg'
            },
            {
                title: '時間線',
                artist: 'Willwi',
                src: 'music/track2.mp3',
                cover: 'images/track2.jpg'
            },
            {
                title: '存在',
                artist: 'Willwi',
                src: 'music/track3.mp3',
                cover: 'images/track3.jpg'
            }
        ];
        
        this.initializePlayer();
        this.bindEvents();
    }
    
    initializePlayer() {
        // 設置初始音量
        this.audio.volume = this.volume;
        this.updateVolumeDisplay();
        
        // 載入第一首歌
        this.loadTrack(this.currentTrack);
    }
    
    bindEvents() {
        // 播放/暫停按鈕
        const playBtn = document.getElementById('playBtn');
        playBtn.addEventListener('click', () => this.togglePlay());
        
        // 上一首/下一首
        document.getElementById('prevBtn').addEventListener('click', () => this.previousTrack());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextTrack());
        
        // 進度條
        const progressBar = document.querySelector('.progress-bar');
        const progressHandle = document.getElementById('progressHandle');
        progressBar.addEventListener('click', (e) => this.seekTo(e));
        progressHandle.addEventListener('mousedown', (e) => this.startDragging(e, 'progress'));
        
        // 音量控制
        const volumeSlider = document.querySelector('.volume-slider');
        const volumeHandle = document.getElementById('volumeHandle');
        volumeSlider.addEventListener('click', (e) => this.setVolume(e));
        volumeHandle.addEventListener('mousedown', (e) => this.startDragging(e, 'volume'));
        
        // 音頻事件
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.nextTrack());
        
        // 音樂卡片點擊事件
        document.querySelectorAll('.music-card').forEach((card, index) => {
            card.addEventListener('click', () => this.playTrack(index));
        });
        
        // 卡片播放按鈕
        document.querySelectorAll('.card-play-btn').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.playTrack(index);
            });
        });
    }
    
    loadTrack(index) {
        const track = this.tracks[index];
        this.audio.src = track.src;
        document.getElementById('trackTitle').textContent = track.title;
        document.getElementById('albumArt').src = track.cover;
        this.currentTrack = index;
        
        // 更新音樂卡片的活躍狀態
        document.querySelectorAll('.music-card').forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
    }
    
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButton();
            this.startVisualizer();
        }).catch(error => {
            console.error('播放失敗:', error);
        });
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
        this.stopVisualizer();
    }
    
    updatePlayButton() {
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        
        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }
    
    previousTrack() {
        this.currentTrack = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    nextTrack() {
        this.currentTrack = (this.currentTrack + 1) % this.tracks.length;
        this.loadTrack(this.currentTrack);
        if (this.isPlaying) {
            this.play();
        }
    }
    
    playTrack(index) {
        if (index !== this.currentTrack) {
            this.loadTrack(index);
        }
        this.play();
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
            document.getElementById('progressHandle').style.left = progress + '%';
            
            // 更新時間顯示
            document.getElementById('currentTime').textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    updateDuration() {
        document.getElementById('totalTime').textContent = this.formatTime(this.audio.duration);
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    seekTo(e) {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * this.audio.duration;
        this.audio.currentTime = newTime;
    }
    
    setVolume(e) {
        const volumeSlider = e.currentTarget;
        const rect = volumeSlider.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.volume = Math.max(0, Math.min(1, percent));
        this.audio.volume = this.volume;
        this.updateVolumeDisplay();
    }
    
    updateVolumeDisplay() {
        const volumePercent = this.volume * 100;
        document.getElementById('volumeFill').style.width = volumePercent + '%';
        document.getElementById('volumeHandle').style.left = volumePercent + '%';
    }
    
    startDragging(e, type) {
        e.preventDefault();
        const mouseMoveHandler = (e) => this.handleDrag(e, type);
        const mouseUpHandler = () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
        
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }
    
    handleDrag(e, type) {
        if (type === 'progress') {
            const progressBar = document.querySelector('.progress-bar');
            const rect = progressBar.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            const newTime = percent * this.audio.duration;
            this.audio.currentTime = newTime;
        } else if (type === 'volume') {
            const volumeSlider = document.querySelector('.volume-slider');
            const rect = volumeSlider.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            this.volume = percent;
            this.audio.volume = this.volume;
            this.updateVolumeDisplay();
        }
    }
    
    startVisualizer() {
        // 簡單的視覺化效果
        const visualizerBars = document.querySelector('.visualizer-bars');
        if (visualizerBars) {
            visualizerBars.style.animation = 'visualize 1.5s ease-in-out infinite alternate';
        }
    }
    
    stopVisualizer() {
        const visualizerBars = document.querySelector('.visualizer-bars');
        if (visualizerBars) {
            visualizerBars.style.animation = 'none';
        }
    }
}

// 多語言支持
class LanguageManager {
    constructor() {
        this.currentLang = 'zh';
        this.translations = {
            zh: {
                home: '首頁',
                music: '音樂作品',
                about: '關於我',
                subtitle: '賽博音樂創作者 | Cyber Music Creator',
                latestRelease: '最新單曲《靜默退場》現已發布',
                quote: '音樂に境界はなく、夢は決して死なない...',
                aboutTitle: '關於我 | ABOUT ME',
                musicTitle: '音樂作品',
                aboutText1: '大家好，我是 Willwi（陳威兒）——一位來自台灣的獨立創作歌手，擅長融合中文、日文、韓文多語言音樂，並將 EDM 電子樂與 K-POP 流行元素交織成獨特聲響。我的音樂來自靈魂，也來自一段段不能被定義的記憶。',
                aboutText2: '我的創作風格擁有強烈個人標籤，受邀進駐 Musixmatch 國際詞庫平台，作品同步上架至 Spotify、Apple Music、YouTube Music 等串流平台，並通過 OAC 藝術家認證。'
            },
            en: {
                home: 'Home',
                music: 'Music Works',
                about: 'About Me',
                subtitle: 'Cyber Music Creator',
                latestRelease: 'Latest Single "Silent Exit" Now Available',
                quote: 'Music has no boundaries, dreams never die...',
                aboutTitle: 'ABOUT ME',
                musicTitle: 'MUSIC WORKS',
                aboutText1: 'Hello, I\'m Willwi (Chen Wei-Er) — an independent singer-songwriter from Taiwan, specializing in multilingual music that blends Chinese, Japanese, and Korean, weaving together EDM electronic music and K-POP elements into a unique sound. My music comes from the soul and from memories that cannot be defined.',
                aboutText2: 'My creative style has a strong personal signature. I\'ve been invited to join the Musixmatch international lyrics platform, with works simultaneously released on streaming platforms like Spotify, Apple Music, and YouTube Music, and certified through OAC artist verification.'
            },
            ja: {
                home: 'ホーム',
                music: '音楽作品',
                about: '私について',
                subtitle: 'サイバー音楽クリエイター',
                latestRelease: '最新シングル「静寂退場」配信中',
                quote: '音楽に境界はなく、夢は決して死なない...',
                aboutTitle: '私について',
                musicTitle: '音楽作品',
                aboutText1: 'こんにちは、私はWillwi（陳威兒）です。台湾出身の独立系シンガーソングライターで、中国語、日本語、韓国語を融合した多言語音楽を得意とし、EDMエレクトロニック音楽とK-POPポップ要素を織り交ぜた独特なサウンドを創造しています。私の音楽は魂から生まれ、定義できない記憶の断片から生まれています。',
                aboutText2: '私の創作スタイルは強い個人的な特徴を持っており、Musixmatch国際歌詞プラットフォームに招待され、作品はSpotify、Apple Music、YouTube Musicなどのストリーミングプラットフォームに同時リリースされ、OACアーティスト認証を取得しています。'
            }
        };
        
        this.bindEvents();
    }
    
    bindEvents() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }
    
    switchLanguage(lang) {
        this.currentLang = lang;
        
        // 更新按鈕狀態
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // 更新文本內容
        document.querySelectorAll('[data-lang]').forEach(element => {
            if (element.dataset.lang === lang) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });
        
        // 更新導航鏈接
        document.querySelectorAll('.nav-link').forEach(link => {
            const key = link.getAttribute('href').substring(1); // 移除 #
            if (this.translations[lang][key]) {
                link.textContent = this.translations[lang][key];
            }
        });
    }
}

// 導航功能
class Navigation {
    constructor() {
        this.bindEvents();
    }
    
    bindEvents() {
        // 平滑滾動
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 更新活躍狀態
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
        
        // 滾動時更新導航狀態
        window.addEventListener('scroll', () => this.updateActiveNav());
    }
    
    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < bottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }
}

// 動畫效果
class AnimationManager {
    constructor() {
        this.initializeAnimations();
    }
    
    initializeAnimations() {
        // 創建更多浮動粒子
        this.createFloatingParticles();
        
        // 創建視覺化條形
        this.createVisualizerBars();
        
        // 滾動動畫
        this.initScrollAnimations();
    }
    
    createFloatingParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #00ffff;
                border-radius: 50%;
                box-shadow: 0 0 10px #00ffff;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${15 + Math.random() * 10}s infinite linear;
                animation-delay: ${Math.random() * 15}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    createVisualizerBars() {
        const visualizerBars = document.querySelector('.visualizer-bars');
        
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            bar.style.cssText = `
                width: 4px;
                height: ${10 + Math.random() * 40}px;
                background: linear-gradient(to top, #00ffff, #0080ff);
                border-radius: 2px;
                margin: 0 1px;
                animation: visualize ${1 + Math.random()}s ease-in-out infinite alternate;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            visualizerBars.appendChild(bar);
        }
    }
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // 觀察需要動畫的元素
        document.querySelectorAll('.music-card, .about-content').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// 初始化應用
document.addEventListener('DOMContentLoaded', () => {
    // 初始化各個模組
    const musicPlayer = new MusicPlayer();
    const languageManager = new LanguageManager();
    const navigation = new Navigation();
    const animationManager = new AnimationManager();
    
    // 添加載入動畫
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('Willwi 網站已載入完成');
});

// 鍵盤快捷鍵
document.addEventListener('keydown', (e) => {
    // 空白鍵播放/暫停
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('playBtn').click();
    }
    
    // 左右箭頭切換歌曲
    if (e.code === 'ArrowLeft') {
        document.getElementById('prevBtn').click();
    }
    
    if (e.code === 'ArrowRight') {
        document.getElementById('nextBtn').click();
    }
});

