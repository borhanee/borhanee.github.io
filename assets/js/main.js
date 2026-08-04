/*!
=========================================================
Borhan Portfolio Website
File: assets/js/main.js
Version: 1.0
GitHub Pages Compatible
=========================================================
*/

document.addEventListener("DOMContentLoaded", () => {
    /* ==========================
       Elements
    ========================== */
    const body = document.body;
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
    }

    const mobileMenu = document.querySelector(".mobile-menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-menu a");
    const currentYear = document.getElementById("current-year");

    /* ==========================
       Current Year
    ========================== */
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* ==========================
       Sticky Header
    ========================== */
    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 15) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader);

    /* ==========================
       Mobile Menu
    ========================== */
    function openMenu() {
        if (!mobileMenu) return;

        mobileMenu.classList.add("active");
        menuOverlay?.classList.add("active");
        body.classList.add("menu-open");
        menuToggle?.setAttribute("aria-expanded", "true");
        menuToggle?.classList.add("active");
    }

    function closeMenu() {
        if (!mobileMenu) return;

        mobileMenu.classList.remove("active");
        menuOverlay?.classList.remove("active");
        body.classList.remove("menu-open");
        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.classList.remove("active");
    }

    menuToggle?.addEventListener("click", () => {
        if (mobileMenu?.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    menuOverlay?.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    /* ==========================
       Active Navigation
    ========================== */
    const path = window.location.pathname
        .replace(/\/$/, "")
        .split("/")
        .pop()
        .toLowerCase();

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        const target = href
            .replace(/\/$/, "")
            .split("/")
            .pop()
            .toLowerCase();

        if ((path === "" && target === "index.html") || path === target) {
            link.classList.add("active");
        }
    });

    /* ==========================
       Fade Animation
    ========================== */
    const items = document.querySelectorAll(".fade-up");

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

        items.forEach(item => observer.observe(item));
    } else {
        items.forEach(item => item.classList.add("show"));
    }

    /* ==========================
       Hero Typing Animation
    ========================== */
    const typingElement = document.getElementById("typing-text");
    const typingWords = [
        "Wikimedian",
        "Entrepreneur",
        "Civil Engineer",
        "Internet Activist",
        "Open Source Contributor"
    ];

    if (typingElement) {
        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeLoop() {
            const word = typingWords[wordIndex];

            if (!deleting) {
                typingElement.textContent = word.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === word.length) {
                    deleting = true;
                    setTimeout(typeLoop, 1800);
                    return;
                }
            } else {
                typingElement.textContent = word.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % typingWords.length;
                }
            }

            setTimeout(typeLoop, deleting ? 45 : 90);
        }

        typeLoop();
    }

    /* ==========================
       Contact Form Success Message
    ========================== */
    const params = new URLSearchParams(window.location.search);

    if (params.get("success") === "1") {
        const successBox = document.getElementById("contact-success");

        if (successBox) {
            successBox.style.display = "flex";
        }
    }
});
