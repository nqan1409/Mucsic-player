/*
    1. Render song 🌟
    2. Scroll top 🌟
    3. Play / pause / seek 🌟
    4. CD rotate 🌟
    5. Next / prev song 🌟
    6. Random 🌟
    7. Next / repeat when ended 🌟
    8. Active song 🌟
    9. Scroll active song into view
    Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $('.playlist');
const cdElement = $('.cd');
const header = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
console.log([repeatBtn]);

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    arrayPlayed: [false, false, false, false, false, false, false, false],
    songs: [
        {
            name: 'Cưới thôi',
            singer: 'Bray ft TAP',
            path: './assets/music/song1.mp3',
            image: './assets/img/song1.jpg'
        },
        {
            name: 'Here I Am Again',
            singer: 'Yerin Baek',
            path: './assets/music/song2.mp3',
            image: './assets/img/song2.jpg'
        },
        {
            name: 'Liệu Giờ',
            singer: '2T',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.jpg'
        },
        {
            name: 'Mình Yêu Nhau Đi',
            singer: 'Bích Phương',
            path: './assets/music/song4.mp3',
            image: './assets/img/song4.jpg'
        },
        {
            name: 'Muộn Rồi Mà Sao Còn',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/song5.mp3',
            image: './assets/img/song5.jpg'
        },
        {
            name: 'My Everything',
            singer: 'Tiên Tiên',
            path: './assets/music/song6.mp3',
            image: './assets/img/song6.jpg'
        },
        {
            name: 'Năm Ấy',
            singer: 'Đức Phúc',
            path: './assets/music/song7.mp3',
            image: './assets/img/song7.jpg'
        },
        {
            name: 'Say You Do',
            singer: 'Tiên Tiên',
            path: './assets/music/song8.mp3',
            image: './assets/img/song8.jpg'
        }
    ],
    defineProoerties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${this.currentIndex === index ? 'active' : ''}">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        });
        playList.innerHTML = htmls.join('\n');
    },
    handleEven: function () {
        _this = this;
        // Xử lý scroll play list
        const cdWidth = cdElement.offsetWidth;

        // Xử lý quay / dừng CD ( CD rotate )
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        document.onscroll = function () {
            const scrolTop = window.scrollY | document.documentElement.scrollTop;
            const newCDWidth = cdWidth - scrolTop;

            cdElement.style.width = newCDWidth > 0 ? newCDWidth + 'px' : 0;
            cdElement.style.opacity = newCDWidth / cdWidth;
        };

        // Xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            };

            // Khi bài hát play
            audio.onplay = function () {
                _this.isPlaying = !_this.isPlaying;
                player.classList.toggle('playing', _this.isPlaying);
                cdThumbAnimate.play();
            }
            // Khi bài hát pause
            audio.onpause = function () {
                _this.isPlaying = !_this.isPlaying;
                player.classList.toggle('playing', _this.isPlaying);
                cdThumbAnimate.pause();
            }
        };

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercentage = Math.floor((audio.currentTime / audio.duration) * 100);
                progress.value = progressPercentage;
            }
        }

        // Xử lý khi tua bài hát
        progress.onchange = function () {
            const seekTime = audio.duration * (this.value / 100);
            audio.currentTime = seekTime;
        }

        // Xử lý khi netx bài hát
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
                audio.play();
            }
            else {
                _this.netxSong();
                audio.play();
            }
            _this.render();
        }
        // Xử lý khi prev bài hát
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
                audio.play();
            }
            else {
                _this.prevSong();
                audio.play();
            }
            _this.render();
        }

        // Xử lý khi random bài hát
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            // Nếu _this.isRandom = true thì sẽ thêm class="active" và ngược lại
            this.classList.toggle('active', _this.isRandom);
        }

        // Xử lý lập lại 1 bài hát
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            // Nếu _this.isRepeat = true thì sẽ thêm class="active" và ngược lại
            this.classList.toggle('active', _this.isRepeat);
        }

        // Xử lý next / previous khi ended bài hát
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            }
            else {
                nextBtn.click();
            }
        }
    },
    loadCurrentSong: function () {
        header.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
        audio.src = this.currentSong.path;
    },
    netxSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let newIndex;
        this.arrayPlayed[this.currentIndex] = true;
        do {
            // Tối ưu phát ngẫu nhiên
            // Không phát lại bài đã phát trước đó khi random mode on
            this.handleArrPlayed();
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (this.arrayPlayed[newIndex]);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    handleArrPlayed: function() {
        let isFull = false;
        // Ban đầu mảng this.arrayPlayed được đánh dấu tất cả là false
        // Sau khi đã phát bài đó ở random mode thì sẽ đáng dấu bài đó là true
        // Kiểm tra xem toàn bộ mảng đã là true hết hay chưa
        // Nếu rồi thì sẽ reset lại toàn bộ là false và tiếp tục vòng lập
        isFull = this.arrayPlayed.every(song => song === true);
        if (isFull) {
            this.arrayPlayed.forEach(function(song, index, arr) {
                arr[index] = false;
            })
        }
    },
    start: function () {
        // Định nghĩa các thuộc tính cho object
        this.defineProoerties();
        // Lắng nghe / xử lý các sự kiện (DOM event handler)
        this.handleEven();
        // Tải thông tin bài hát đầu tiên bào UI khi chạy ứng dụng
        this.loadCurrentSong();
        // Render playList
        this.render();
    }
}

app.start();