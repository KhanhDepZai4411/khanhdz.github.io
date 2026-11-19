
// Tạo sao trên bầu trời
const stars = document.getElementById("stars");

for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";

    stars.appendChild(star);
}

// Nhạc nền
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0.3;

async function playMusic() {
    try {
        await music.play();
        musicBtn.textContent = "♫ Tắt nhạc";
    } catch (error) {
        musicBtn.textContent = "♫ Bật nhạc";
    }
}

musicBtn.addEventListener("click", async () => {
    if (music.paused) {
        await playMusic();
    } else {
        music.pause();
        musicBtn.textContent = "♫ Bật nhạc";
    }
});

// Thử tự phát nhạc khi mở trang
window.addEventListener("load", () => {
    playMusic();
});

// Nội dung câu chuyện
const messages = [
    "Hôm nay cũng sắp kết thúc rồi nhỉ...",
    "Không biết hôm nay Linh có vui không?",
    "Dù ngày hôm nay thế nào, mong Linh vẫn luôn giữ được nụ cười nhé.",
    "Khánh có chuẩn bị một điều nho nhỏ dành cho Linh.",
    "Nhưng mà... chưa đến lúc bật mí đâu :>"
];

const startBtn = document.getElementById("startBtn");
const story = document.getElementById("story");
const ending = document.getElementById("ending");

const lines = document.querySelectorAll(".story-line");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Hiệu ứng chữ xuất hiện từng ký tự
async function typeText(element, text) {
    element.textContent = "";

    for (const char of text) {
        element.textContent += char;
        await sleep(40);
    }
}

startBtn.addEventListener("click", async () => {
    startBtn.disabled = true;
    startBtn.style.display = "none";

    story.classList.remove("hidden");

    for (let i = 0; i < messages.length; i++) {
        await typeText(lines[i], messages[i]);
        await sleep(700);
    }

    await sleep(1000);

    ending.classList.remove("hidden");

    ending.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    // Thêm trái tim bay
    for (let i = 0; i < 12; i++) {
        createHeart();
        await sleep(250);
    }
});

// Trái tim bay
function createHeart() {
    const heart = document.createElement("div");

    heart.textContent = "♡";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-30px";
    heart.style.fontSize = "25px";
    heart.style.color = "#ffd5e7";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "5";

    document.body.appendChild(heart);

    heart.animate([
        {
            transform: "translateY(0) rotate(0deg)",
            opacity: 1
        },
        {
            transform: "translateY(-100vh) rotate(40deg)",
            opacity: 0
        }
    ], {
        duration: 5000,
        easing: "ease-out"
    });

    setTimeout(() => heart.remove(), 5000);
}
