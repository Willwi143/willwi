// 音訊播放器修正
document.addEventListener('DOMContentLoaded', function() {
    // 創建音訊元素
    const audioPlayer = new Audio();
    audioPlayer.src = 'https://p.scdn.co/mp3-preview/3f5d3a6d7a1cff3c06e1873c4b3ca8f9c9a6c1a2'; // 替換為實際音樂檔案路徑
    audioPlayer.preload = 'auto';
    
    // 播放器控制元素
    const playButton = document.getElementById('play');
    const playButtonIcon = playButton.querySelector('i');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progressBar = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');
    const volumeLevel = document.getElementById('volume-level');
    const volumeContainer = document.getElementById('volume-container');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const trackTitle = document.getElementById('track-title');
    
    // 音樂播放列表
    const playlist = [
        {
            title: '星星不熄滅',
            artist: 'Willwi 陳威兒',
            duration: '3:45',
            src: 'https://p.scdn.co/mp3-preview/3f5d3a6d7a1cff3c06e1873c4b3ca8f9c9a6c1a2'
        },
        {
            title: '時差遺憾',
            artist: 'Willwi 陳威兒',
            duration: '4:12',
            src: 'https://p.scdn.co/mp3-preview/3f5d3a6d7a1cff3c06e1873c4b3ca8f9c9a6c1a2'
        }
    ];
    
    let currentTrack = 0;
    let isPlaying = false;
    
    // 初始化播放器
    function initPlayer() {
        // 設置初始音量
        audioPlayer.volume = 0.7;
        volumeLevel.style.width = '70%';
        
        // 設置初始曲目
        loadTrack(currentTrack);
        
        // 更新時間顯示
        audioPlayer.addEventListener('loadedmetadata', function() {
            const duration = formatTime(audioPlayer.duration);
            durationDisplay.textContent = duration;
        });
        
        // 更新進度條
        audioPlayer.addEventListener('timeupdate', updateProgress);
        
        // 播放結束時
        audioPlayer.addEventListener('ended', function() {
            nextTrack();
        });
    }
    
    // 載入曲目
    function loadTrack(index) {
        if (index >= 0 && index < playlist.length) {
            currentTrack = index;
            audioPlayer.src = playlist[index].src;
            trackTitle.textContent = playlist[index].title;
            currentTimeDisplay.textContent = '0:00';
            durationDisplay.textContent = playlist[index].duration;
            
            // 更新播放列表高亮
            playlistItems.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }
    
    // 播放/暫停
    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            isPlaying = true;
            playButtonIcon.classList.remove('fa-play');
            playButtonIcon.classList.add('fa-pause');
        } else {
            audioPlayer.pause();
            isPlaying = false;
            playButtonIcon.classList.remove('fa-pause');
            playButtonIcon.classList.add('fa-play');
        }
    }
    
    // 上一首
    function prevTrack() {
        let prev = currentTrack - 1;
        if (prev < 0) {
            prev = playlist.length - 1;
        }
        loadTrack(prev);
        if (isPlaying) {
            audioPlayer.play();
        }
    }
    
    // 下一首
    function nextTrack() {
        let next = currentTrack + 1;
        if (next >= playlist.length) {
            next = 0;
        }
        loadTrack(next);
        if (isPlaying) {
            audioPlayer.play();
        }
    }
    
    // 更新進度條
    function updateProgress() {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            currentTimeDisplay.textContent = formatTime(currentTime);
        }
    }
    
    // 設置進度
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        audioPlayer.currentTime = (clickX / width) * duration;
    }
    
    // 設置音量
    function setVolume(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const volume = clickX / width;
        
        audioPlayer.volume = volume;
        volumeLevel.style.width = `${volume * 100}%`;
    }
    
    // 格式化時間
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    }
    
    // 事件監聽
    playButton.addEventListener('click', togglePlay);
    prevButton.addEventListener('click', prevTrack);
    nextButton.addEventListener('click', nextTrack);
    progressContainer.addEventListener('click', setProgress);
    volumeContainer.addEventListener('click', setVolume);
    
    // 播放列表項目點擊
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            loadTrack(index);
            togglePlay();
        });
    });
    
    // 初始化播放器
    initPlayer();
});
