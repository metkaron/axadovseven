"use strict";

/* =========================================================
   AXADOVSEVEN — SCRIPT
========================================================= */

/* =========================
   ALBUMS
========================= */

const albums = {
    cars: {
        title: "МАШИНЫ",
        category: "AUTOMOTIVE",
        folder: "assets/cars/",
        prefix: "cars",
        count: 49,
        extension: "jpg",
        type: "image"
    },

    fashion: {
        title: "ОДЕЖДА",
        category: "FASHION",
        folder: "assets/fashion/",
        prefix: "fashion",
        count: 16,
        extension: "jpg",
        type: "image"
    },

    lifestyle: {
        title: "LIFESTYLE",
        category: "LIFESTYLE",
        folder: "assets/lifestyle/",
        prefix: "lifestyle",
        count: 34,
        extension: "jpg",
        type: "image"
    },

    food: {
        title: "ЕДА",
        category: "FOOD",
        folder: "assets/food/",
        prefix: "food",
        count: 22,
        extension: "jpg",
        type: "image"
    },

    video: {
        title: "ВИДЕО",
        category: "VIDEO",
        folder: "assets/video/",
        type: "video",
       files: [
    "video-01.mp4",
    "video-02.mp4",
    "video-03.mp4",
    "video-04.mp4",
    "video-05.mp4",
    "video-06.mp4",
    "video-07.mp4",
    "video-08.mp4",
    "video-09.mp4",
    "video-10.mp4",
    "video-11.mp4",
    "video-12.mp4",
    "video-13.mp4",
    "video-14.mp4",
    "video-15.mp4",
    "video-16.mp4"
]
    }
};


/* =========================
   DOM
========================= */

const body = document.body;

const albumModal = document.getElementById("albumModal");
const modalGallery = document.getElementById("modalGallery");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalClose = document.getElementById("modalClose");

const lightbox = document.getElementById("lightbox");
const lightboxContent = document.querySelector(".lightbox-content");
const lightboxInfo = document.getElementById("lightboxInfo");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const backToTop = document.getElementById("backToTop");


/* =========================
   STATE
========================= */

let currentAlbum = null;
let currentItems = [];
let currentIndex = 0;


/* =========================
   HELPERS
========================= */

function pad(number) {
    return String(number).padStart(2, "0");
}


function getImagePath(album, number) {
    return `${album.folder}${album.prefix}-${pad(number)}.${album.extension}`;
}


function getItems(albumKey) {
    const album = albums[albumKey];

    if (!album) {
        return [];
    }

    if (album.type === "video") {
        return album.files.map(file => ({
            type: "video",
            src: `${album.folder}${file}`
        }));
    }

    const items = [];

    for (let i = 1; i <= album.count; i++) {
        items.push({
            type: "image",
            src: getImagePath(album, i)
        });
    }

    return items;
}


/* =========================
   OPEN ALBUM
========================= */

function openAlbum(albumKey) {
    const album = albums[albumKey];

    if (!album || !albumModal || !modalGallery) {
        console.error("Не удалось открыть альбом:", albumKey);
        return;
    }

    currentAlbum = albumKey;
    currentItems = getItems(albumKey);
    currentIndex = 0;

    modalGallery.innerHTML = "";

    modalTitle.textContent = album.title;
    modalCategory.textContent = album.category;

    currentItems.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "modal-photo";

        /* IMAGE */
        if (item.type === "image") {
            const img = document.createElement("img");

            img.src = item.src;
            img.alt = `${album.title} ${index + 1}`;
            img.loading = "lazy";

            img.addEventListener("error", () => {
                console.error("Фото не найдено:", item.src);
                card.remove();
            });

            card.appendChild(img);
        }

        /* VIDEO */
        if (item.type === "video") {
            const video = document.createElement("video");

            video.src = item.src;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = "metadata";
            video.controls = false;

            video.addEventListener("mouseenter", () => {
                video.play().catch(() => {});
            });

            video.addEventListener("mouseleave", () => {
                video.pause();
            });

            video.addEventListener("error", () => {
                console.error("Видео не найдено:", item.src);
                card.classList.add("file-error");
            });

            card.appendChild(video);
        }

        card.addEventListener("click", () => {
            openLightbox(index);
        });

        modalGallery.appendChild(card);
    });

    albumModal.classList.add("active");
    body.classList.add("modal-open");

    albumModal.scrollTop = 0;

    history.pushState(
        { album: albumKey },
        "",
        `#${albumKey}`
    );
}


/* =========================
   CLOSE ALBUM
========================= */

function closeAlbum() {
    if (!albumModal) {
        return;
    }

    albumModal.classList.remove("active");

    closeLightbox();

    body.classList.remove("modal-open");

    currentAlbum = null;
    currentItems = [];
    currentIndex = 0;

    history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search
    );
}


/* =========================
   OPEN LIGHTBOX
========================= */

function openLightbox(index) {
    const item = currentItems[index];

    if (!item || !lightbox || !lightboxContent) {
        return;
    }

    currentIndex = index;

    lightboxContent.innerHTML = "";

    /* IMAGE */
    if (item.type === "image") {
        const img = document.createElement("img");

        img.src = item.src;
        img.alt = albums[currentAlbum].title;

        lightboxContent.appendChild(img);
    }

    /* VIDEO */
    if (item.type === "video") {
        const video = document.createElement("video");

        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.preload = "auto";

        video.addEventListener("error", () => {
            console.error("Ошибка видео:", item.src);
        });

        lightboxContent.appendChild(video);

        video.play().catch(() => {});
    }

    const album = albums[currentAlbum];

    lightboxInfo.innerHTML = `
        <span>${pad(currentIndex + 1)}</span>
        <span>${album.title}</span>
        <span>${pad(currentItems.length)}</span>
    `;

    lightbox.classList.add("active");
    body.classList.add("modal-open");
}


/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {
    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("active");

    if (lightboxContent) {
        lightboxContent.innerHTML = "";
    }

    if (
        !albumModal ||
        !albumModal.classList.contains("active")
    ) {
        body.classList.remove("modal-open");
    }
}


/* =========================
   NEXT
========================= */

function nextItem() {
    if (!currentItems.length) {
        return;
    }

    currentIndex++;

    if (currentIndex >= currentItems.length) {
        currentIndex = 0;
    }

    openLightbox(currentIndex);
}


/* =========================
   PREVIOUS
========================= */

function prevItem() {
    if (!currentItems.length) {
        return;
    }

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentItems.length - 1;
    }

    openLightbox(currentIndex);
}


/* =========================
   ALBUM CLICK
========================= */

document.addEventListener("click", event => {
    const album = event.target.closest(".album");

    if (!album) {
        return;
    }

    const albumKey = album.dataset.album;

    if (!albumKey || !albums[albumKey]) {
        return;
    }

    openAlbum(albumKey);
});


/* =========================
   BUTTONS
========================= */

if (modalClose) {
    modalClose.addEventListener("click", closeAlbum);
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener("click", nextItem);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener("click", prevItem);
}


/* =========================
   LIGHTBOX BACKGROUND
========================= */

if (lightbox) {
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        if (lightbox?.classList.contains("active")) {
            closeLightbox();
            return;
        }

        if (albumModal?.classList.contains("active")) {
            closeAlbum();
        }
    }

    if (lightbox?.classList.contains("active")) {
        if (event.key === "ArrowRight") {
            nextItem();
        }

        if (event.key === "ArrowLeft") {
            prevItem();
        }
    }
});


/* =========================
   TOUCH SWIPE
========================= */

let touchStartX = 0;
let touchEndX = 0;

if (lightbox) {
    lightbox.addEventListener("touchstart", event => {
        touchStartX =
            event.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", event => {
        touchEndX =
            event.changedTouches[0].screenX;

        const distance =
            touchStartX - touchEndX;

        if (Math.abs(distance) < 50) {
            return;
        }

        if (distance > 0) {
            nextItem();
        } else {
            prevItem();
        }
    }, { passive: true });
}


/* =========================
   MOBILE MENU
========================= */

if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            burger.classList.remove("active");
            mobileMenu.classList.remove("active");
        });
    });
}


/* =========================
   BACK TO TOP
========================= */

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            backToTop.classList.add("active");
        } else {
            backToTop.classList.remove("active");
        }
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================
   HASH OPEN
========================= */

window.addEventListener("load", () => {
    const hash =
        window.location.hash.replace("#", "");

    if (hash && albums[hash]) {
        openAlbum(hash);
    }
});


/* =========================
   BROWSER HISTORY
========================= */

window.addEventListener("popstate", () => {
    const hash =
        window.location.hash.replace("#", "");

    if (hash && albums[hash]) {
        openAlbum(hash);
    } else {
        closeAlbum();
    }
});


/* =========================
   VIDEO STYLES
========================= */

const dynamicStyle =
    document.createElement("style");

dynamicStyle.textContent = `
    .modal-photo video {
        width: 100%;
        height: 100%;
        min-height: 300px;
        object-fit: cover;
        display: block;
        background: #000;
    }

    .lightbox-content video {
        width: auto;
        max-width: 85vw;
        max-height: 80vh;
        background: #000;
    }

    .modal-photo.file-error {
        display: none !important;
    }
`;

document.head.appendChild(dynamicStyle);


/* =========================
   READY
========================= */

console.log("AXADOVSEVEN ready");