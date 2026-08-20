const albums = {

    cars: {
        title: "МАШИНЫ",
        category: "AUTOMOTIVE",
        folder: "assets/cars",
        prefix: "cars",
        count: 49
    },

    fashion: {
        title: "ОДЕЖДА",
        category: "FASHION",
        folder: "assets/fashion",
        prefix: "fashion",
        count: 16
    },

    lifestyle: {
        title: "LIFESTYLE",
        category: "LIFESTYLE",
        folder: "assets/lifestyle",
        prefix: "lifestyle",
        count: 34
    }

};


const albumModal = document.getElementById("albumModal");
const modalGallery = document.getElementById("modalGallery");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalClose = document.getElementById("modalClose");


const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxName = document.getElementById("lightboxName");
const lightboxCount = document.getElementById("lightboxCount");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");


let currentAlbum = null;
let currentPhoto = 1;


function number(n) {
    return String(n).padStart(2, "0");
}


/* =========================
   OPEN ALBUM
========================= */

document.querySelectorAll(".album").forEach(card => {

    card.addEventListener("click", () => {

        const name = card.dataset.album;

        openAlbum(name);

    });

});


function openAlbum(name) {

    const album = albums[name];

    if (!album) return;

    currentAlbum = name;

    modalTitle.textContent = album.title;
    modalCategory.textContent = album.category;

    modalGallery.innerHTML = "";

    for (let i = 1; i <= album.count; i++) {

        const photo = document.createElement("div");

        photo.className = "modal-photo";

        const img = document.createElement("img");

        img.src =
            `${album.folder}/${album.prefix}-${number(i)}.jpg`;

        img.alt =
            `${album.title} ${i}`;

        /*
        Если файла нет —
        карточка просто удаляется.
        */

        img.onerror = () => {
            photo.remove();
        };

        photo.appendChild(img);

        photo.addEventListener("click", () => {

            openLightbox(i);

        });

        modalGallery.appendChild(photo);

    }

    albumModal.classList.add("active");

    document.body.classList.add("modal-open");

    window.scrollTo(0, 0);

}


/* =========================
   CLOSE ALBUM
========================= */

modalClose.addEventListener("click", () => {

    albumModal.classList.remove("active");

    document.body.classList.remove("modal-open");

});


/* =========================
   LIGHTBOX
========================= */

function openLightbox(photoNumber) {

    currentPhoto = photoNumber;

    updateLightbox();

    lightbox.classList.add("active");

}


function updateLightbox() {

    const album = albums[currentAlbum];

    lightboxImg.src =
        `${album.folder}/${album.prefix}-${number(currentPhoto)}.jpg`;

    lightboxName.textContent =
        album.title;

    lightboxCount.textContent =
        `${number(currentPhoto)} / ${number(album.count)}`;

}


/* =========================
   NEXT
========================= */

lightboxNext.addEventListener("click", () => {

    const album = albums[currentAlbum];

    currentPhoto++;

    if (currentPhoto > album.count) {
        currentPhoto = 1;
    }

    updateLightbox();

});


/* =========================
   PREVIOUS
========================= */

lightboxPrev.addEventListener("click", () => {

    const album = albums[currentAlbum];

    currentPhoto--;

    if (currentPhoto < 1) {
        currentPhoto = album.count;
    }

    updateLightbox();

});


/* =========================
   CLOSE LIGHTBOX
========================= */

lightboxClose.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        lightbox.classList.remove("active");

        albumModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }

    if (
        e.key === "ArrowRight" &&
        lightbox.classList.contains("active")
    ) {

        lightboxNext.click();

    }

    if (
        e.key === "ArrowLeft" &&
        lightbox.classList.contains("active")
    ) {

        lightboxPrev.click();

    }

});


/* =========================
   MOBILE MENU
========================= */

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});