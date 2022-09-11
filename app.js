/*
    1. Render song 🌟
    2. Scroll top
    3. Play / pause / seek
    4. CD rotate
    5. Next / prev song
    6. Random
    7. Next / repeat when ended
    8. Active song
    9. Scroll active song into view
    Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $('.playlist');

const app = {
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
    render: function() {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
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
    start: function() {
        this.render();
    }
}

app.start();