/* ======================================================
   PRICE TABS
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".price-tab");
    const contents = document.querySelectorAll(".price-content");

    if (!tabs.length || !contents.length) return;

    // Восстановление последней выбранной вкладки
    const savedCategory = localStorage.getItem("priceCategory");

    if (savedCategory) {

        tabs.forEach(tab => {
            tab.classList.toggle(
                "active",
                tab.dataset.category === savedCategory
            );
        });

        contents.forEach(content => {
            content.classList.toggle(
                "active",
                content.id === savedCategory
            );
        });

    }

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            if (tab.classList.contains("active")) return;

            const category = tab.dataset.category;

            // Кнопки
            tabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");

            // Блоки
            contents.forEach(content => {

                if (content.id === category) {

                    content.classList.add("active");

                    requestAnimationFrame(() => {

                        const cards =
                            content.querySelectorAll(".price-card");

                        cards.forEach((card, index) => {

                            card.classList.remove("show");

                            setTimeout(() => {

                                card.classList.add("show");

                            }, index * 120);

                        });

                    });

                } else {

                    content.classList.remove("active");

                }

            });

            localStorage.setItem("priceCategory", category);

        });

    });

});



/* ======================================================
   PRICE CARDS APPEAR
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".price-card");

    if (!cards.length) return;

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        }, {

            threshold: 0.15

        });

        cards.forEach(card => observer.observe(card));

    } else {

        cards.forEach(card => card.classList.add("show"));

    }

});



/* ======================================================
   HOVER ICON
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".price-icon").forEach(icon => {

        icon.addEventListener("mouseenter", () => {

            icon.animate([

                {
                    transform: "rotate(0deg) scale(1)"
                },

                {
                    transform: "rotate(-12deg) scale(1.18)"
                },

                {
                    transform: "rotate(0deg) scale(1)"
                }

            ], {

                duration: 500,

                easing: "ease"

            });

        });

    });

});



/* ======================================================
   PARALLAX CARD
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".price-card").forEach(card => {

        card.addEventListener("mousemove", e => {

            if (window.innerWidth < 992) return;

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = (x - rect.width / 2) / 20;
            const rotateX = -(y - rect.height / 2) / 20;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

});



/* ======================================================
   PRICE RIPPLE
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".price-tab").forEach(tab => {

        tab.addEventListener("click", function(e) {

            const ripple = document.createElement("span");

            ripple.className = "price-ripple";

            const rect = this.getBoundingClientRect();

            ripple.style.left = (e.clientX - rect.left) + "px";
            ripple.style.top = (e.clientY - rect.top) + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

});
