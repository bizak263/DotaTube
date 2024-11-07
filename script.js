class VideoManager {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.searchButton = document.querySelector('.search-button');
        this.videosGrid = document.querySelector('.videos-grid');
        this.pagination = document.querySelector('.pagination');
        this.currentPage = 1;
        this.videosPerPage = 10;
        
        // Загружаем все видео и проверяем их наличие
        this.allVideos = [];
        
        // Проверяем наличие каждого файла с видео
        if (typeof videosPage1 !== 'undefined') {
            console.log('Loading Page 1:', videosPage1.length, 'videos');
            this.allVideos = [...videosPage1];
        }
        if (typeof videosPage2 !== 'undefined') {
            console.log('Loading Page 2:', videosPage2.length, 'videos');
            this.allVideos = [...this.allVideos, ...videosPage2];
        }
        if (typeof videosPage3 !== 'undefined') {
            console.log('Loading Page 3:', videosPage3.length, 'videos');
            this.allVideos = [...this.allVideos, ...videosPage3];
        }
        
        console.log('Total videos loaded:', this.allVideos.length);
        
        this.init();
    }

    init() {
        // Добавляем обработчики событий
        this.searchButton.addEventListener('click', () => this.searchVideos());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchVideos();
        });

        // Обработчики для пагинации
        document.querySelectorAll('.page-button').forEach(button => {
            button.addEventListener('click', () => {
                this.currentPage = parseInt(button.dataset.page);
                this.displayCurrentPage();
                this.updatePaginationButtons();
            });
        });

        // Отображаем первую страницу сразу после загрузки
        setTimeout(() => {
            this.displayCurrentPage();
            this.updatePaginationButtons();
        }, 100);

        // Обработчики для модального окна
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('video-modal')) {
                e.target.remove();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.video-modal');
                if (modal) modal.remove();
            }
        });
    }

    displayCurrentPage() {
        const start = (this.currentPage - 1) * this.videosPerPage;
        const end = start + this.videosPerPage;
        const currentVideos = this.allVideos.slice(start, end);
        
        console.log(`Displaying page ${this.currentPage}, videos ${start} to ${end}`);
        console.log('Videos on current page:', currentVideos.length);
        
        this.displayVideos(currentVideos);
    }

    updatePaginationButtons() {
        document.querySelectorAll('.page-button').forEach(button => {
            const pageNum = parseInt(button.dataset.page);
            if (pageNum === this.currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    searchVideos() {
        const query = this.searchInput.value.toLowerCase();
        const filteredVideos = this.allVideos.filter(video => 
            video.title.toLowerCase().includes(query) || 
            video.channelTitle.toLowerCase().includes(query)
        );
        this.displayVideos(filteredVideos);
    }

    displayVideos(videos) {
        this.videosGrid.innerHTML = '';
        videos.forEach(video => {
            const videoElement = this.createVideoElement(video);
            this.videosGrid.appendChild(videoElement);
        });
    }

    createVideoElement(video) {
        const div = document.createElement('div');
        div.className = 'video-card';
        
        let thumbnailText;
        let textClass;
        
        if (video.channelTitle.includes('Папич')) {
            thumbnailText = 'ПАПЫЧ';
            textClass = 'papich-text';
        } else if (video.channelTitle.includes('Серега Пират')) {
            thumbnailText = 'СЕРЕЖА ПИРАТ';
            textClass = 'pirat-text';
        } else {
            thumbnailText = 'ТРАВОМАНЫЧ';
            textClass = 'travoman-text';
        }
        
        div.innerHTML = `
            <div class="video-thumbnail">
                <span class="thumbnail-text ${textClass}">${thumbnailText}</span>
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p class="channel-title">${video.channelTitle}</p>
                <p class="video-views">${video.views}</p>
            </div>
        `;
        
        div.addEventListener('click', () => {
            this.openVideoModal(video);
        });
        
        return div;
    }

    openVideoModal(video) {
        const existingModal = document.querySelector('.video-modal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <iframe 
                    width="860" 
                    height="515" 
                    src="${video.embedUrl}" 
                    frameborder="0" 
                    allow="${video.allow}"
                    allowfullscreen
                ></iframe>
                <div class="modal-video-info">
                    <h2>${video.title}</h2>
                    <p>${video.channelTitle}</p>
                    <p>${video.views}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', (e) => {
            e.stopPropagation();
            modal.remove();
        });

        modal.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    handleImageError(img) {
        img.onerror = () => {
            img.src = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png';
        };
    }
}

// Ждем полной загрузки всех скриптов перед инициализацией
window.addEventListener('load', () => {
    new VideoManager();
});

function createSnowflakes() {
    const container = document.body;
    const snowflakesCount = 30;

    for (let i = 0; i < snowflakesCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.opacity = Math.random() * 0.2;
        snowflake.style.animationDuration = `${Math.random() * 3 + 5}s`;
        container.appendChild(snowflake);

        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            createSingleSnowflake();
        });
    }
}

function createSingleSnowflake() {
    const container = document.body;
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.opacity = Math.random() * 0.2;
    snowflake.style.animationDuration = `${Math.random() * 3 + 5}s`;
    container.appendChild(snowflake);

    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        createSingleSnowflake();
    });
}

// Добавляем боковые границы со льдом
function createIceBorders() {
    const leftBorder = document.createElement('div');
    leftBorder.className = 'ice-border-left';
    document.body.appendChild(leftBorder);

    const rightBorder = document.createElement('div');
    rightBorder.className = 'ice-border-right';
    document.body.appendChild(rightBorder);
}

// Вызываем функции при загрузке страницы
window.addEventListener('load', () => {
    createSnowflakes();
    createIceBorders();
}); 