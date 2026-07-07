/* ===========================
   AFNV Grooming
   script.js
=========================== */

/* ===== ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ ===== */

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.2
});

document.querySelectorAll("section").forEach(section=>{
    section.classList.add("hidden");
    observer.observe(section);
});


/* ===== ГАЛЕРЕЯ И LIGHTBOX ===== */

const images = document.querySelectorAll(".gallery img");
const overlay = document.createElement("div");
overlay.className = "lightbox";
overlay.innerHTML = `
    <span class="close" tabindex="0" role="button" aria-label="Закрыть галерею">&times;</span>
    <img alt="Увеличенное изображение из галереи">
`;

if(document.body) {
    document.body.appendChild(overlay);
}

const lightImage = overlay.querySelector("img");
const closeBtn = overlay.querySelector(".close");
let currentImageIndex = 0;

// Открытие lightbox
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentImageIndex = index;
        overlay.classList.add("active");
        lightImage.src = img.src;
        lightImage.alt = img.alt;
        document.body.style.overflow = 'hidden';
    });
    img.addEventListener("keypress", (e) => {
        if(e.key === 'Enter') {
            currentImageIndex = index;
            overlay.classList.add("active");
            lightImage.src = img.src;
            lightImage.alt = img.alt;
            document.body.style.overflow = 'hidden';
        }
    });
});

// Закрытие lightbox (клик на фон)
overlay.addEventListener("click", (e) => {
    if(e.target === overlay) {
        overlay.classList.remove("active");
        document.body.style.overflow = 'auto';
    }
});

// Закрытие по кнопке
if(closeBtn) {
    closeBtn.addEventListener("click", () => {
        overlay.classList.remove("active");
        document.body.style.overflow = 'auto';
    });
    
    closeBtn.addEventListener("keypress", (e) => {
        if(e.key === 'Enter') {
            overlay.classList.remove("active");
            document.body.style.overflow = 'auto';
        }
    });
}

// Закрытие на ESC
document.addEventListener("keydown", (e) => {
    if(e.key === 'Escape' && overlay.classList.contains("active")) {
        overlay.classList.remove("active");
        document.body.style.overflow = 'auto';
    }
});

// Навигация по галерее (стрелки)
document.addEventListener("keydown", (e) => {
    if(overlay.classList.contains("active")) {
        if(e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lightImage.src = images[currentImageIndex].src;
            lightImage.alt = images[currentImageIndex].alt;
        }
        if(e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            lightImage.src = images[currentImageIndex].src;
            lightImage.alt = images[currentImageIndex].alt;
        }
    }
});


/* ===== ШАПКА (HEADER SHADOW) ===== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if(window.scrollY > 50){
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";
    }
    else{
        header.style.boxShadow = "none";
    }
});


/* ===== ПЛАВНАЯ ПРОКРУТКА ===== */

document.querySelectorAll("nav a, .mobile-menu a, .bottom-bar a").forEach(link => {
    link.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if(href && href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
                // Закрыть мобильное меню при клике
                const mobileMenu = document.getElementById("mobileMenu");
                if(mobileMenu && mobileMenu.classList.contains("active")) {
                    mobileMenu.classList.remove("active");
                    const burger = document.getElementById("burger");
                    if(burger) {
                        burger.classList.remove("active");
                        burger.setAttribute("aria-expanded", "false");
                    }
                }
            }
        }
    });
});


/* ===== КНОПКА "ЗАПИСАТЬСЯ" ===== */

const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
    if(button) {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.05)";
        });
        
        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    }
});


/* ===== МОБИЛЬНОЕ МЕНЮ ===== */

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

if(burger && mobileMenu) {
    burger.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        burger.classList.toggle("active");
        const isActive = burger.classList.contains("active");
        burger.setAttribute("aria-expanded", isActive);
    });
}

// Закрытие меню при клике на ссылку
if(mobileMenu) {
    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            if(burger) {
                burger.classList.remove("active");
                burger.setAttribute("aria-expanded", "false");
            }
        });
    });
}

// Закрытие меню при клике вне его
document.addEventListener("click", (e) => {
    if(burger && mobileMenu && !burger.contains(e.target) && !mobileMenu.contains(e.target)) {
        if(mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
            burger.classList.remove("active");
            burger.setAttribute("aria-expanded", "false");
        }
    }
});


/* ===== BOTTOM BAR MOBILE MENU ===== */

const bottomBar = document.getElementById("bottomBar");
if(bottomBar) {
    document.querySelectorAll(".bottom-bar a").forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if(href && href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) {
                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}
