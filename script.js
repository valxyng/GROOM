/* ===========================
   AFNV Grooming
   script.js
=========================== */

/* Плавное появление секций */

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


/* --------------------------
   Галерея
--------------------------- */

const images=document.querySelectorAll(".gallery img");

const overlay=document.createElement("div");

overlay.className="lightbox";

overlay.innerHTML=`
    <span class="close">&times;</span>
    <img>
`;

document.body.appendChild(overlay);

const lightImage=overlay.querySelector("img");

images.forEach(img=>{

    img.addEventListener("click",()=>{

        overlay.classList.add("active");

        lightImage.src=img.src;

    });

});

overlay.addEventListener("click",()=>{

    overlay.classList.remove("active");

});


/* --------------------------
   Шапка
--------------------------- */

window.addEventListener("scroll",()=>{

    const header=document.querySelector("header");

    if(window.scrollY>50){

        header.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

    }

    else{

        header.style.boxShadow="none";

    }

});


/* --------------------------
   Плавная прокрутка
--------------------------- */

document.querySelectorAll("nav a").forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});


/* --------------------------
   Кнопка "Записаться"
--------------------------- */

const button=document.querySelector(".button");

button.addEventListener("mouseenter",()=>{

    button.style.transform="scale(1.05)";

});

button.addEventListener("mouseleave",()=>{

    button.style.transform="scale(1)";

});
