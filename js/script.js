// 等待DOM加載完成
document.addEventListener('DOMContentLoaded', function() {
    // 載入畫面
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);

    // 音頻元素
    const bgMusic = document.getElementById('bg-music');
    const casperLogo = document.getElementById('casper-logo');
    const visualizer = document.getElementById('visualizer');
    const visualizerContainer = document.querySelector('.audio-visualizer');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress-bar');
    const currentTime = document.querySelector('.current-time');
    const totalTime = document.querySelector('.total-time');

    // 音頻上下文
    let audioContext;
    let analyser;
    let source;
    let isPlaying = false;
    let animationFrame;

    // 粒子動畫
    const particlesCanvas = document.getElementById('particles');
    const particlesCtx = particlesCanvas.getContext('2d');
    let particles = [];
    const particlesCount = 100;
    
    // 設置畫布大小
    function resizeCanvas() {
        if (particlesCanvas) {
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
        }
        if (visualizer) {
            visualizer.width = visualizerContainer.offsetWidth;
            visualizer.height = visualizerContainer.offsetHeight;
        }
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 初始化粒子
    function initParticles() {
        particles = [];
        for (let i = 0; i < particlesCount; i++) {
            particles.push({
                x: Math.random() * particlesCanvas.width,
                y: Math.random() * particlesCanvas.height,
                radius: Math.random() * 3 + 1,
                color: getRandomColor(),
                velocity: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2
                },
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }

    // 獲取隨機顏色
    function getRandomColor() {
        const colors = ['#00c2ff', '#ff00e6', '#7b00ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 繪製粒子
    function drawParticles() {
        particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        
        particles.forEach(particle => {
            particlesCtx.beginPath();
            particlesCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            particlesCtx.fillStyle = particle.color;
            particlesCtx.globalAlpha = particle.opacity;
            particlesCtx.fill();
            
            // 更新位置
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            
            // 邊界檢查
            if (particle.x < 0 || particle.x > particlesCanvas.width) {
                particle.velocity.x = -particle.velocity.x;
            }
            
            if (particle.y < 0 || particle.y > particlesCanvas.height) {
                particle.velocity.y = -particle.velocity.y;
            }
        });
        
        requestAnimationFrame(drawParticles);
    }

    // 初始化音頻視覺化
    function initAudioVisualizer() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            source = audioContext.createMediaElementSource(bgMusic);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 256;
        }
    }

    // 繪製音頻視覺化
    function drawVisualizer() {
        if (!analyser) return;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);
        
        const ctx = visualizer.getContext('2d');
        ctx.clearRect(0, 0, visualizer.width, visualizer.height);
        
        const centerX = visualizer.width / 2;
        const centerY = visualizer.height / 2;
        const radius = Math.min(centerX, centerY) - 50;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        for (let i = 0; i < bufferLength; i++) {
            const value = dataArray[i];
            const percent = value / 255;
            const barHeight = radius * percent;
            const barWidth = (Math.PI * 2) / bufferLength;
            const barAngle = i * barWidth;
            
            const x1 = centerX + Math.cos(barAngle) * radius;
            const y1 = centerY + Math.sin(barAngle) * radius;
            const x2 = centerX + Math.cos(barAngle) * (radius - barHeight);
            const y2 = centerY + Math.sin(barAngle) * (radius - barHeight);
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            
            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, 'rgba(0, 194, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(123, 0, 255, 0.8)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        
        animationFrame = requestAnimationFrame(drawVisualizer);
    }

    // 播放/暫停音樂
    function togglePlay() {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        if (isPlaying) {
            bgMusic.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            cancelAnimationFrame(animationFrame);
            visualizerContainer.style.opacity = '0';
        } else {
            initAudioVisualizer();
            bgMusic.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            drawVisualizer();
            visualizerContainer.style.opacity = '1';
        }
        
        isPlaying = !isPlaying;
    }

    // 更新進度條
    function updateProgress() {
        const percent = (bgMusic.currentTime / bgMusic.duration) * 100;
        progress.style.width = `${percent}%`;
        
        // 更新時間
        const currentMinutes = Math.floor(bgMusic.currentTime / 60);
        const currentSeconds = Math.floor(bgMusic.currentTime % 60);
        const totalMinutes = Math.floor(bgMusic.duration / 60) || 0;
        const totalSeconds = Math.floor(bgMusic.duration % 60) || 0;
        
        currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        totalTime.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    }

    // 設置進度
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = bgMusic.duration;
        bgMusic.currentTime = (clickX / width) * duration;
    }

    // 點擊 Casper 頭像播放音樂
    casperLogo.addEventListener('click', function() {
        togglePlay();
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 1000);
    });

    // 播放按鈕事件
    playBtn.addEventListener('click', togglePlay);

    // 進度條事件
    progressBar.addEventListener('click', setProgress);

    // 音頻事件
    bgMusic.addEventListener('timeupdate', updateProgress);
    bgMusic.addEventListener('ended', function() {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        cancelAnimationFrame(animationFrame);
        visualizerContainer.style.opacity = '0';
    });

    // 影片項目點擊事件
    const videoItems = document.querySelectorAll('.video-item');
    const featuredVideo = document.getElementById('featured-video');
    
    videoItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const videoSource = this.querySelector('video source').getAttribute('src');
            const videoType = this.querySelector('video source').getAttribute('type');
            
            featuredVideo.innerHTML = `<source src="${videoSource}" type="${videoType}">`;
            featuredVideo.load();
            featuredVideo.play();
            
            // 滾動到特色影片
            document.querySelector('.video-container.featured').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 導航欄滾動效果
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 100) {
            header.style.padding = '10px 50px';
            header.style.background = 'rgba(5, 5, 16, 0.9)';
        } else {
            header.style.padding = '20px 50px';
            header.style.background = 'rgba(5, 5, 16, 0.8)';
        }
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 平滑滾動
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // 初始化粒子動畫
    if (particlesCanvas) {
        initParticles();
        drawParticles();
    }

    // 表單提交事件
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 這裡可以添加表單提交邏輯
            alert('感謝您的訊息！我們會盡快回覆您。');
            this.reset();
        });
    }
});
