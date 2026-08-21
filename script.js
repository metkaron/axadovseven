/* =========================================================
   ALBUMS
========================================================= */

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
        prefix: "video",
        count: 20,
        extension: "mp4",
        type: "video"
    }
};


/* =========================================================
   ELEMENTS
========================================================= */

const albumModal = document.getElementById("albumModal");
const modalGallery = document.getElementById("modalGallery");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalClose = document.getElementById("modalClose");

const lightbox = document.getElementById("lightbox");
const lightboxContent = document.querySelector(".lightbox-content");

const lightboxImg = document.getElementById("lightboxImg");
const lightboxInfo = document.querySelector(".lightbox-info");

const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");


/* =========================================================
   CURRENT ALBUM
========================================================= */

let currentAlbum = null;
let currentItems = [];
let currentIndex = 0;


/* =========================================================
   CREATE FILE PATH
========================================================= */

function getFilePath(album, number) {

    const formattedNumber = String(number).padStart(2, "0");

    return `${album.folder}${album.prefix}-${formattedNumber}.${album.extension}`;
}


/* =========================================================
   OPEN ALBUM
========================================================= */

function openAlbum(albumKey) {

    const album = albums[albumKey];

    if (!album) {
        console.error("Альбом не найден:", albumKey);
        return;
    }

    currentAlbum = albumKey;

    modalGallery.innerHTML = "";

    if (modalTitle) {
        modalTitle.textContent = album.title;
    }

    if (modalCategory) {
        modalCategory.textContent = album.category;
    }

    currentItems = [];


    /* =========================
       CREATE ITEMS
    ========================= */

    for (let i = 1; i <= album.count; i++) {

        const src = getFilePath(album, i);

        currentItems.push(src);


        const item = document.createElement("div");

        item.className = "modal-photo";

        item.dataset.index = i - 1;


        /* =========================
           IMAGE
        ========================= */

        if (album.type === "image") {

            const img = document.createElement("img");

            img.src = src;
            img.alt = `${album.title} ${i}`;
            img.loading = "lazy";

            img.onerror = function () {
                console.warn("Не найден файл:", src);
                item.classList.add("file-error");
            };

            item.appendChild(img);


            item.addEventListener("click", () => {
                openLightbox(i - 1);
            });

        }


        /* =========================
           VIDEO
        ========================= */

        if (album.type === "video") {

            const video = document.createElement("video");

            video.src = src;

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

            video.onerror = function () {
                console.warn("Не найдено видео:", src);
                item.classList.add("file-error");
            };

            item.appendChild(video);


            item.addEventListener("click", () => {
                openLightbox(i - 1);
            });
        }


        modalGallery.appendChild(item);
    }


    /* =========================
       OPEN MODAL
    ========================= */

    albumModal.classList.add("active");

    document.body.classList.add("modal-open");

    albumModal.scrollTop = 0;

    history.pushState(
        { album: albumKey },
        "",
        `#${albumKey}`
    );
}


/* =========================================================
   CLOSE ALBUM
========================================================= */

function closeAlbum() {

    if (!albumModal) return;

    albumModal.classList.remove("active");

    document.body.classList.remove("modal-open");

    closeLightbox();

    if (location.hash) {
        history.pushState(
            "",
            document.title,
            window.location.pathname + window.location.search
        );
    }
}


/* =========================================================
   LIGHTBOX
========================================================= */

function openLightbox(index) {

    if (!currentAlbum) return;

    const album = albums[currentAlbum];

    currentIndex = index;

    const src = currentItems[index];

    if (!src) return;


    /* Очистка */

    if (lightboxContent) {
        lightboxContent.innerHTML = "";
    }


    /* =========================
       IMAGE LIGHTBOX
    ========================= */

    if (album.type === "image") {

        const img = document.createElement("img");

        img.src = src;

        img.alt = album.title;

        img.id = "lightboxDynamicImage";

        img.style.maxWidth = "85vw";
        img.style.maxHeight = "80vh";
        img.style.width = "auto";
        img.style.height = "auto";
        img.style.objectFit = "contain";

        lightboxContent.appendChild(img);
    }


    /* =========================
       VIDEO LIGHTBOX
    ========================= */

    if (album.type === "video") {

        const video = document.createElement("video");

        video.src = src;

        video.controls = true;

        video.autoplay = true;

        video.playsInline = true;

        video.style.maxWidth = "85vw";
        video.style.maxHeight = "80vh";

        lightboxContent.appendChild(video);

        video.play().catch(() => {});
    }


    /* INFO */

    if (lightboxInfo) {

        lightboxInfo.innerHTML = `
            <span>${String(index + 1).padStart(2, "0")}</span>
            <span>${album.title}</span>
            <span>${String(album.count).padStart(2, "0")}</span>
        `;
    }


    /* OPEN */

    lightbox.classList.add("active");
}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");

    if (lightboxContent) {
        lightboxContent.innerHTML = "";
    }
}


/* =========================================================
   NEXT
========================================================= */

function nextItem() {

    if (!currentItems.length) return;

    currentIndex++;

    if (currentIndex >= currentItems.length) {
        currentIndex = 0;
    }

    openLightbox(currentIndex);
}


/* =========================================================
   PREVIOUS
========================================================= */

function prevItem() {

    if (!currentItems.length) return;

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentItems.length - 1;
    }

    openLightbox(currentIndex);
}


/* =========================================================
   ALBUM CLICK
========================================================= */

document.addEventListener("click", function (event) {

    const albumElement = event.target.closest(".album");

    if (!albumElement) return;

    const albumKey = albumElement.dataset.album;

    if (!albumKey) {
        console.warn(
            "У карточки .album нет data-album"
        );
        return;
    }

    openAlbum(albumKey);
});


/* =========================================================
   CLOSE BUTTON
========================================================= */

if (modalClose) {

    modalClose.addEventListener("click", () => {
        closeAlbum();
    });
}


/* =========================================================
   LIGHTBOX BUTTONS
========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener("click", () => {
        closeLightbox();
    });
}


if (lightboxNext) {

    lightboxNext.addEventListener("click", () => {
        nextItem();
    });
}


if (lightboxPrev) {

    lightboxPrev.addEventListener("click", () => {
        prevItem();
    });
}


/* =========================================================
   CLICK OUTSIDE LIGHTBOX
========================================================= */

if (lightbox) {

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });
}


/* =========================================================
   ESC / ARROWS
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (lightbox.classList.contains("active")) {
            closeLightbox();
            return;
        }

        if (albumModal.classList.contains("active")) {
            closeAlbum();
        }
    }


    if (
        lightbox &&
        lightbox.classList.contains("active")
    ) {

        if (event.key === "ArrowRight") {
            nextItem();
        }

        if (event.key === "ArrowLeft") {
            prevItem();
        }
    }
});


/* =========================================================
   MOBILE MENU
========================================================= */

if (burger && mobileMenu) {

    burger.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        burger.classList.toggle("active");

    });


    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            burger.classList.remove("active");

        });

    });
}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            targetId.length < 2
        ) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   HASH OPEN
========================================================= */

window.addEventListener("load", () => {

    const hash = window.location.hash.replace("#", "");

    if (albums[hash]) {
        openAlbum(hash);
    }

});


/* =========================================================
   BROWSER BACK
========================================================= */

window.addEventListener("popstate", () => {

    if (!window.location.hash) {
        closeAlbum();
        return;
    }

    const hash = window.location.hash.replace("#", "");

    if (albums[hash]) {
        openAlbum(hash);
    }
});


/* =========================================================
   DISABLE BROKEN IMAGE VISUAL
========================================================= */

const errorStyle = document.createElement("style");

errorStyle.textContent = `
    .modal-photo.file-error {
        display: none;
    }

    .modal-photo video {
        width: 100%;
        height: 100%;
        min-height: 300px;
        object-fit: cover;
        display: block;
        background: #111;
    }

    .lightbox-content video {
        display: block;
        background: #000;
    }
`;

document.head.appendChild(errorStyle);


/* =========================================================
   READY
========================================================= */

console.log("AXADOVSEVEN website loaded");
console.log("Albums:", albums);

/* =========================
   BACK TO TOP
========================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        backToTop.classList.add("active");
    } else {
        backToTop.classList.remove("active");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});