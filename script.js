/* =========================================================
   ALEX FILM
   Основной JavaScript
========================================================= */

"use strict";


/* =========================================================
   DOM
========================================================= */

const body = document.body;
const navbar = document.getElementById("navbar");

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

const revealElements = document.querySelectorAll(".reveal");

const serviceItems = document.querySelectorAll(".service-item");
const serviceImage = document.getElementById("serviceImage");

const counters = document.querySelectorAll("[data-count]");

const form = document.getElementById("inquiry");
const formStatus = document.querySelector(".form-status");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lbImage");
const lightboxVideo = document.getElementById("lbVideo");

const lightboxTitle = document.getElementById("lbTitle");
const lightboxCategory = document.getElementById("lbCategory");
const lightboxCounter = document.getElementById("lbCounter");

const lightboxClose = document.querySelector(".lb-close");
const lightboxPrev = document.querySelector(".lb-prev");
const lightboxNext = document.querySelector(".lb-next");

const cursorDot = document.querySelector(".cursor-dot");
const cursorLabel = document.querySelector(".cursor-label");

const reviewText = document.getElementById("reviewText");
const reviewName = document.getElementById("reviewName");
const reviewCompany = document.getElementById("reviewCompany");
const reviewCounter = document.getElementById("reviewCounter");

const prevReview = document.getElementById("prevReview");
const nextReview = document.getElementById("nextReview");


/* =========================================================
   NAVBAR
========================================================= */

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");

        menuBtn.classList.toggle(
            "active",
            isOpen
        );

        body.classList.toggle(
            "no-scroll",
            isOpen
        );

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            menuBtn.classList.remove("active");

            body.classList.remove("no-scroll");

        });

    });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const navbarHeight =
            navbar
                ? navbar.offsetHeight
                : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                revealObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   FILTERS
========================================================= */

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        const category =
            filter.dataset.filter;


        filters.forEach(item => {

            item.classList.remove("active");

        });


        filter.classList.add("active");


        projects.forEach(project => {

            const projectCategory =
                project.dataset.category;


            const shouldShow =
                category === "all" ||
                projectCategory === category;


            if (shouldShow) {

                project.style.display = "";

                requestAnimationFrame(() => {

                    project.style.opacity = "1";

                    project.style.transform =
                        "translateY(0)";

                });

            } else {

                project.style.opacity = "0";

                project.style.transform =
                    "translateY(20px)";

                setTimeout(() => {

                    project.style.display =
                        "none";

                }, 350);

            }

        });

    });

});


/* =========================================================
   VIDEO PREVIEW
========================================================= */

const videoCards =
    document.querySelectorAll(
        ".video-media"
    );


videoCards.forEach(container => {

    const video =
        container.querySelector("video");

    if (!video) return;


    const playVideo = () => {

        video.muted = true;

        const promise =
            video.play();

        if (
            promise &&
            typeof promise.catch === "function"
        ) {

            promise.catch(() => {});

        }

    };


    const pauseVideo = () => {

        video.pause();

    };


    container.addEventListener(
        "mouseenter",
        playVideo
    );

    container.addEventListener(
        "mouseleave",
        pauseVideo
    );


    /*
       Для телефонов hover отсутствует,
       поэтому видео можно запустить
       при тапе.
    */

    container.addEventListener(
        "touchstart",
        () => {

            if (video.paused) {
                playVideo();
            } else {
                pauseVideo();
            }

        },
        {
            passive: true
        }
    );

});


/* =========================================================
   LIGHTBOX DATA
========================================================= */

const lightboxItems = [

    {
        type: "image",

        src:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=90",

        title:
            "НОЧНОЙ ЗАЕЗД",

        category:
            "АВТОМОБИЛИ"
    },


    {
        type: "image",

        src:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=90",

        title:
            "ДВИЖЕНИЕ",

        category:
            "РЕКЛАМА"
    },


    {
        type: "image",

        src:
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2200&q=90",

        title:
            "ПОСЛЕ ЗАКАТА",

        category:
            "МЕРОПРИЯТИЯ"
    },


    {
        type: "video",

        src:
            "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",

        title:
            "ДВИЖЕНИЕ",

        category:
            "СОЦИАЛЬНЫЕ СЕТИ"
    },


    {
        type: "image",

        src:
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2200&q=90",

        title:
            "СИНИЙ ЧАС",

        category:
            "ЛИЧНЫЙ ПРОЕКТ"
    },


    {
        type: "image",

        src:
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=90",

        title:
            "ДЕТАЛЬ",

        category:
            "РЕКЛАМА"
    },


    {
        type: "image",

        src:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=90",

        title:
            "ОБ АВТОРЕ",

        category:
            "ПОРТРЕТ"
    }

];


let currentLightboxIndex = 0;


/* =========================================================
   OPEN LIGHTBOX
========================================================= */

function openLightbox(index) {

    if (
        index < 0 ||
        index >= lightboxItems.length
    ) {
        return;
    }


    currentLightboxIndex = index;


    const item =
        lightboxItems[index];


    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add("no-scroll");


    /*
       IMAGE
    */

    if (item.type === "image") {

        lightboxImage.src =
            item.src;

        lightboxImage.alt =
            item.title;

        lightboxImage.style.display =
            "block";


        lightboxVideo.pause();

        lightboxVideo.removeAttribute(
            "src"
        );

        lightboxVideo.style.display =
            "none";

    }


    /*
       VIDEO
    */

    if (item.type === "video") {

        lightboxImage.removeAttribute(
            "src"
        );

        lightboxImage.style.display =
            "none";


        lightboxVideo.src =
            item.src;

        lightboxVideo.style.display =
            "block";


        lightboxVideo.currentTime = 0;

        const playPromise =
            lightboxVideo.play();


        if (
            playPromise &&
            typeof playPromise.catch ===
                "function"
        ) {

            playPromise.catch(() => {});

        }

    }


    lightboxTitle.textContent =
        item.title;

    lightboxCategory.textContent =
        item.category;


    lightboxCounter.textContent =
        String(index + 1).padStart(2, "0") +
        " / " +
        String(lightboxItems.length)
            .padStart(2, "0");

}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightbox() {

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove("no-scroll");


    lightboxVideo.pause();

    lightboxVideo.removeAttribute(
        "src"
    );

    lightboxImage.removeAttribute(
        "src"
    );

}


/* =========================================================
   NEXT
========================================================= */

function nextLightbox() {

    currentLightboxIndex++;

    if (
        currentLightboxIndex >=
        lightboxItems.length
    ) {

        currentLightboxIndex = 0;

    }


    openLightbox(
        currentLightboxIndex
    );

}


/* =========================================================
   PREVIOUS
========================================================= */

function previousLightbox() {

    currentLightboxIndex--;

    if (
        currentLightboxIndex < 0
    ) {

        currentLightboxIndex =
            lightboxItems.length - 1;

    }


    openLightbox(
        currentLightboxIndex
    );

}


/* =========================================================
   LIGHTBOX BUTTONS
========================================================= */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        nextLightbox
    );

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        previousLightbox
    );

}


/* =========================================================
   PORTFOLIO CLICK
========================================================= */

projects.forEach(project => {

    project.addEventListener("click", event => {

        /*
           Если внутри карточки
           была нажата кнопка —
           всё равно открываем проект.
        */

        const index =
            Number(project.dataset.index);


        if (
            Number.isInteger(index)
        ) {

            openLightbox(index);

        }

    });

});


/* =========================================================
   PORTRAIT / SOCIAL LIGHTBOX
========================================================= */

document
    .querySelectorAll(".lightbox-trigger")
    .forEach(element => {

        element.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const index =
                    Number(
                        element.dataset.index
                    );

                openLightbox(index);

            }
        );

    });


/* =========================================================
   FEATURED PROJECTS
========================================================= */

document
    .querySelectorAll(".feature-project")
    .forEach(project => {

        project.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        ".feature-open"
                    );

                const index =
                    Number(
                        project.dataset.index
                    );


                if (
                    button ||
                    !event.target.closest(
                        "a"
                    )
                ) {

                    openLightbox(index);

                }

            }
        );

    });


/* =========================================================
   LIGHTBOX BACKDROP
========================================================= */

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "open"
            )
        ) {
            return;
        }


        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextLightbox();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousLightbox();

        }

    }
);


/* =========================================================
   MOBILE SWIPE
========================================================= */

let touchStartX = 0;
let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


lightbox.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        const difference =
            touchStartX - touchEndX;


        if (
            Math.abs(difference) < 50
        ) {
            return;
        }


        if (difference > 0) {

            nextLightbox();

        } else {

            previousLightbox();

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   SERVICE PREVIEW
========================================================= */

serviceItems.forEach(item => {

    item.addEventListener(
        "mouseenter",
        () => {

            serviceItems.forEach(
                service => {

                    service.classList.remove(
                        "active"
                    );

                }
            );


            item.classList.add("active");


            const image =
                item.dataset.image;


            if (!image) {
                return;
            }


            if (serviceImage) {

                serviceImage.style.opacity =
                    "0";

                serviceImage.style.transform =
                    "scale(1.04)";


                setTimeout(() => {

                    serviceImage.src =
                        image;

                    serviceImage.style.opacity =
                        "1";

                    serviceImage.style.transform =
                        "scale(1)";

                }, 180);

            }

        }
    );


    /*
       Mobile
    */

    item.addEventListener(
        "click",
        () => {

            serviceItems.forEach(
                service => {

                    service.classList.remove(
                        "active"
                    );

                }
            );


            item.classList.add(
                "active"
            );


            const image =
                item.dataset.image;


            if (
                serviceImage &&
                image
            ) {

                serviceImage.src =
                    image;

            }

        }
    );

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

function animateCounter(element) {

    const target =
        Number(
            element.dataset.count
        );


    if (
        !Number.isFinite(target)
    ) {
        return;
    }


    let start = 0;

    const duration = 1500;

    const startTime =
        performance.now();


    function updateCounter(
        currentTime
    ) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        /*
           Плавное ускорение/замедление
        */

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                eased * target
            );


        element.textContent =
            value;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }


                animateCounter(
                    entry.target
                );


                counterObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.45
        }

    );


counters.forEach(counter => {

    counterObserver.observe(
        counter
    );

});


/* =========================================================
   REVIEWS
========================================================= */

const reviews = [

    {
        text:
            "Работа выглядит дороже, чем мы представляли. Кадры, монтаж и внимание к деталям сделали проект действительно запоминающимся.",

        name:
            "DAVID K.",

        company:
            "ЧАСТНЫЙ КЛИЕНТ"
    },


    {
        text:
            "Мы получили именно то настроение, которое хотели передать. Очень сильная картинка и отличный монтаж.",

        name:
            "АМИР Р.",

        company:
            "КОММЕРЧЕСКИЙ ПРОЕКТ"
    },


    {
        text:
            "Профессиональный подход от первой идеи до финального ролика. Результат полностью превзошёл ожидания.",

        name:
            "МАРИЯ С.",

        company:
            "БРЕНД / EVENT"
    }

];


let currentReview = 0;


function showReview(index) {

    if (!reviews[index]) {
        return;
    }


    reviewText.style.opacity =
        "0";

    reviewName.style.opacity =
        "0";

    reviewCompany.style.opacity =
        "0";


    setTimeout(() => {

        reviewText.textContent =
            reviews[index].text;

        reviewName.textContent =
            reviews[index].name;

        reviewCompany.textContent =
            reviews[index].company;


        reviewCounter.textContent =
            String(index + 1).padStart(
                2,
                "0"
            ) +
            " / " +
            String(reviews.length)
                .padStart(2, "0");


        reviewText.style.opacity =
            "1";

        reviewName.style.opacity =
            "1";

        reviewCompany.style.opacity =
            "1";

    }, 250);

}


if (nextReview) {

    nextReview.addEventListener(
        "click",
        () => {

            currentReview++;

            if (
                currentReview >=
                reviews.length
            ) {

                currentReview = 0;

            }

            showReview(
                currentReview
            );

        }
    );

}


if (prevReview) {

    prevReview.addEventListener(
        "click",
        () => {

            currentReview--;

            if (
                currentReview < 0
            ) {

                currentReview =
                    reviews.length - 1;

            }

            showReview(
                currentReview
            );

        }
    );

}


/* =========================================================
   FORM
========================================================= */

if (form) {

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(form);


            const name =
                String(
                    formData.get("name") || ""
                ).trim();


            const contact =
                String(
                    formData.get("contact") || ""
                ).trim();


            const type =
                String(
                    formData.get("type") || ""
                ).trim();


            const budget =
                String(
                    formData.get("budget") || ""
                ).trim();


            const message =
                String(
                    formData.get("message") || ""
                ).trim();


            /*
               Валидация
            */

            if (
                name.length < 2
            ) {

                showFormMessage(
                    "Введите ваше имя."
                );

                return;

            }


            if (
                contact.length < 3
            ) {

                showFormMessage(
                    "Введите Email или Telegram."
                );

                return;

            }


            if (!type) {

                showFormMessage(
                    "Выберите тип проекта."
                );

                return;

            }


            if (!budget) {

                showFormMessage(
                    "Выберите бюджет."
                );

                return;

            }


            if (
                message.length < 10
            ) {

                showFormMessage(
                    "Расскажите немного подробнее о проекте."
                );

                return;

            }


            /*
               Успешная отправка
            */

            showFormMessage(
                "СПАСИБО. Я СВЯЖУСЬ С ВАМИ В БЛИЖАЙШЕЕ ВРЕМЯ."
            );


            form.reset();


            /*
               Здесь можно подключить
               Telegram / Email / Backend API.
            */

            console.log(
                "Новая заявка:",
                {
                    name,
                    contact,
                    type,
                    budget,
                    message
                }
            );

        }
    );

}


function showFormMessage(message) {

    if (!formStatus) {
        return;
    }


    formStatus.textContent =
        message;


    formStatus.style.opacity =
        "0";


    requestAnimationFrame(() => {

        formStatus.style.transition =
            "opacity 0.4s ease";

        formStatus.style.opacity =
            "1";

    });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;


const cursorEnabled =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


if (
    cursorEnabled &&
    cursorDot &&
    cursorLabel
) {

    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            cursorDot.style.opacity =
                "1";

            cursorLabel.style.opacity =
                "1";

        }
    );


    function animateCursor() {

        cursorX +=
            (mouseX - cursorX) *
            0.18;

        cursorY +=
            (mouseY - cursorY) *
            0.18;


        cursorDot.style.left =
            `${cursorX}px`;

        cursorDot.style.top =
            `${cursorY}px`;


        cursorLabel.style.left =
            `${cursorX}px`;

        cursorLabel.style.top =
            `${cursorY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .project-card, .feature-project, .social-photo, .portrait"
        );


    interactiveElements.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorLabel.style.opacity =
                        "1";

                    cursorDot.style.opacity =
                        "0";

                    cursorLabel.textContent =
                        "ОТКРЫТЬ";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorLabel.style.opacity =
                        "0";

                    cursorDot.style.opacity =
                        "1";

                }
            );

        }
    );


    document
        .querySelectorAll(
            ".project-card, .feature-project, .social-photo"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorLabel.textContent =
                        "СМОТРЕТЬ";

                }
            );

        });


    document
        .querySelectorAll(
            ".video-media"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorLabel.textContent =
                        "PLAY";

                }
            );

        });

}


/* =========================================================
   PARALLAX HERO
========================================================= */

const heroVideo =
    document.querySelector(
        ".hero-video"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            !heroVideo ||
            window.innerWidth < 700
        ) {
            return;
        }


        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight) {

            heroVideo.style.transform =
                `scale(1.02) translateY(${scroll * 0.08}px)`;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   VIDEO LIGHTBOX
========================================================= */

lightboxVideo.addEventListener(
    "ended",
    () => {

        /*
           После окончания видео
           можно автоматически перейти
           к следующему проекту.

           Здесь оставляем видео на последнем кадре.
        */

    }
);


/* =========================================================
   PREVENT IMAGE DRAG
========================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    });


/* =========================================================
   ESC — CLOSE MOBILE MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        if (
            mobileMenu &&
            mobileMenu.classList.contains(
                "open"
            )
        ) {

            mobileMenu.classList.remove(
                "open"
            );

            menuBtn.classList.remove(
                "active"
            );

            body.classList.remove(
                "no-scroll"
            );

        }

    }
);


/* =========================================================
   REDUCE MOTION
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    reducedMotion.matches
) {

    document.documentElement.style.scrollBehavior =
        "auto";


    document
        .querySelectorAll(
            ".reveal"
        )
        .forEach(element => {

            element.classList.add(
                "visible"
            );

        });

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
           Запускаем navbar
        */

        updateNavbar();


        /*
           Автоматически показываем
           первый отзыв
        */

        showReview(0);


        /*
           Hero video
        */

        if (heroVideo) {

            heroVideo.muted = true;

            const playPromise =
                heroVideo.play();

            if (
                playPromise &&
                typeof playPromise.catch ===
                    "function"
            ) {

                playPromise.catch(() => {});

            }

        }

    }
);