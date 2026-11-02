
/* =====================================================
   CLAWED BY KAMO - COMPLETE JAVASCRIPT
   ===================================================== */

(() => {
    "use strict";

    const BUSINESS_EMAIL = "clawedbykamo@gmail.com";
    const MAX_MESSAGE_LENGTH = 3000;

    /* ===============================
       ACTIVE NAVIGATION
       =============================== */

    function setupNavigation() {
        const page = location.pathname.split("/").pop() || "index.html";

        document.querySelectorAll("nav a[href]").forEach(link => {
            const href = link.getAttribute("href")
                .split(/[?#]/)[0]
                .replace(/^\.\//, "");

            const active = href === page;

            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    /* ===============================
       IMAGE OPTIMIZATION
       =============================== */

    function setupImages() {
        document.querySelectorAll("img").forEach((img, index) => {
            img.decoding = "async";

            if (index > 2 && !img.hasAttribute("loading")) {
                img.loading = "lazy";
            }
        });
    }

    /* ===============================
       DATE VALIDATION
       =============================== */

    function todayString() {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function setupDates() {
        const dateInput = document.querySelector('#date[type="date"]');

        if (!dateInput) return;

        dateInput.min = todayString();

        dateInput.addEventListener("change", () => {
            const invalid = dateInput.value &&
                dateInput.value < todayString();

            dateInput.setCustomValidity(
                invalid ? "Please choose a current or future date." : ""
            );

            dateInput.reportValidity();
        });
    }

    /* ===============================
       FORM HELPERS
       =============================== */

    function field(form, name) {
        const element = form.elements.namedItem(name);
        return String(element?.value || "").trim();
    }

    function showStatus(form, message, error = false) {
        let status = form.querySelector("[data-form-status]");

        if (!status) {
            status = document.createElement("p");
            status.dataset.formStatus = "";
            status.setAttribute("role", "status");
            status.setAttribute("aria-live", "polite");
            form.appendChild(status);
        }

        status.textContent = message;
        status.style.color = error ? "#a12626" : "#333";
    }

    function selectedText(select) {
        return select?.selectedOptions?.[0]?.textContent.trim() ||
            "Not specified";
    }

    /* ===============================
       CONTACT AND ENQUIRY FORMS
       =============================== */

    function setupForms() {
        document.querySelectorAll("form").forEach(form => {
            const contact = Boolean(form.querySelector("#contact-message"));
            const enquiry = Boolean(form.querySelector("#subject, #service"));

            if (!contact && !enquiry) return;

            const textarea = form.querySelector("textarea");

            if (textarea) {
                textarea.maxLength = MAX_MESSAGE_LENGTH;
            }

            form.addEventListener("submit", event => {
                event.preventDefault();

                if (!form.reportValidity()) return;

                const prefix = contact ? "contact-" : "";

                const name = field(form, prefix + "name");
                const email = field(form, prefix + "email");
                const phone = field(form, prefix + "phone");
                const message = field(form, prefix + "message");

                if (!name || !email || !message) {
                    showStatus(form, "Please complete all required fields.", true);
                    return;
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    showStatus(form, "Please enter a valid email address.", true);
                    return;
                }

                if (message.length > MAX_MESSAGE_LENGTH) {
                    showStatus(form, "Your message is too long.", true);
                    return;
                }

                const date = field(form, "date");

                if (date && date < todayString()) {
                    showStatus(form, "Please select a valid appointment date.", true);
                    return;
                }

                const subject = contact
                    ? `Website Contact - ${name}`
                    : `Nail Service Enquiry - ${name}`;

                const lines = [
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Phone: ${phone || "Not provided"}`
                ];

                if (enquiry) {
                    lines.push(
                        `Enquiry Type: ${selectedText(form.querySelector("#subject"))}`,
                        `Service: ${selectedText(form.querySelector("#service"))}`,
                        `Preferred Date: ${date || "Not specified"}`
                    );
                }

                lines.push("", "Message:", message);

                const url = `mailto:${BUSINESS_EMAIL}` +
                    `?subject=${encodeURIComponent(subject)}` +
                    `&body=${encodeURIComponent(lines.join("\n"))}`;

                showStatus(
                    form,
                    "Your email application should open. Press Send there to deliver your message. Appointments require confirmation."
                );

                window.location.href = url;
            });
        });
    }

    /* ===============================
       SERVICE GALLERY DATA
       =============================== */

    const galleries = {
        "French Manicure": [
            "french-nails.jpeg",
            "short classic.jpg",
            "white-acrylic.jpg"
        ],
        "Gel Nails": [
            "gel-nails.jpeg",
            "pink-nails.jpeg",
            "flower-nails.jpeg"
        ],
        "Acrylic Nails": [
            "white-acrylic.jpg",
            "black chrome stilletto.jpg",
            "blue-and-white-hearts.jpg"
        ],
        "Ombre Nails": [
            "ombre-nails.jpeg",
            "pink-nails.jpeg",
            "black-and-nude.jpeg"
        ],
        "Chrome Nails": [
            "chrome-nails.jpeg",
            "black chrome stilletto.jpg",
            "white-acrylic.jpg"
        ],
        "Matte Finish": [
            "matte-nails.jfif",
            "black-and-nude.jpeg",
            "black and white.jpg"
        ],
        "Pink Glam": [
            "pink-nails.jpeg",
            "rhinestone-nails.jpeg",
            "flower-nails.jpeg"
        ],
        "Nude Nails": [
            "black-and-nude.jpeg",
            "black-corporate-nails.jpeg",
            "corporate-nails.jpg"
        ],
        "Rhinestones": [
            "rhinestone-nails.jpeg",
            "pink-nails.jpeg",
            "3d-nails.jfif"
        ],
        "Hand-Drawn Flowers": [
            "flower-nails.jpeg",
            "pink-nails.jpeg",
            "french-nails.jpeg"
        ],
        "Glitter Nails": [
            "glitter-nails.jfif",
            "chrome-nails.jpeg",
            "rhinestone-nails.jpeg"
        ],
        "Marble Design": [
            "marble-nails.jfif",
            "black and white.jpg",
            "black-and-nude.jpeg"
        ],
        "Animal Print": [
            "animal-print-nails.jpeg",
            "black-and-nude.jpeg",
            "black and white.jpg"
        ],
        "3D Nail Art": [
            "3d-nails.jfif",
            "rhinestone-nails.jpeg",
            "flower-nails.jpeg"
        ],
        "Heart Designs": [
            "blue-and-white-hearts.jpg",
            "pink-nails.jpeg",
            "french-nails.jpeg"
        ],
        "Corporate Nails": [
            "corporate-nails.jpg",
            "black-corporate-nails.jpeg",
            "short classic.jpg"
        ]
    };

    /* ===============================
       GALLERY STYLES
       =============================== */

    function setupGalleryStyles() {
        if (document.getElementById("gallery-styles")) return;

        const style = document.createElement("style");
        style.id = "gallery-styles";

        style.textContent = `
            .see-more-btn {
                margin: 15px 0;
                padding: 12px 24px;
                background: #a64d79;
                color: white;
                border: 0;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
            }

            .see-more-btn:hover {
                background: #81345c;
            }

            .service-card > img {
                cursor: pointer;
            }

            .gallery-overlay {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0,0,0,.8);
                padding: 20px;
            }

            .gallery-modal {
                position: relative;
                width: 100%;
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                padding: 35px;
                border-radius: 18px;
                background: white;
                color: #333;
                text-align: center;
            }

            .gallery-modal h2 {
                color: #a64d79;
                margin-bottom: 15px;
            }

            .gallery-close {
                position: absolute;
                right: 15px;
                top: 10px;
                font-size: 32px;
                background: transparent;
                border: 0;
                cursor: pointer;
            }

            .gallery-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 18px;
                margin: 25px 0;
            }

            .gallery-item img {
                width: 100%;
                height: 230px;
                object-fit: cover;
                border-radius: 12px;
            }

            .gallery-item p {
                margin-top: 10px;
                font-size: 14px;
            }

            .gallery-book {
                display: inline-block;
                padding: 12px 25px;
                border-radius: 25px;
                background: #a64d79;
                color: white;
                text-decoration: none;
            }

            @media (max-width: 600px) {
                .gallery-grid {
                    grid-template-columns: 1fr;
                }

                .gallery-item img {
                    height: 200px;
                }

                .gallery-modal {
                    padding: 25px 15px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    /* ===============================
       OPEN GALLERY POPUP
       =============================== */

    function openGallery(name, images, description) {
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;

        const overlay = document.createElement("div");
        overlay.className = "gallery-overlay";

        const modal = document.createElement("div");
        modal.className = "gallery-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", name + " designs");

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "gallery-close";
        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Close gallery");

        const heading = document.createElement("h2");
        heading.textContent = name;

        const details = document.createElement("p");
        details.textContent = description ||
            "Explore beautiful nail designs for your next appointment.";

        const grid = document.createElement("div");
        grid.className = "gallery-grid";

        const captions = [
            "Elegant everyday nail inspiration.",
            "A stylish and modern nail design.",
            "Creative nails for a special occasion."
        ];

        images.forEach((filename, index) => {
            const item = document.createElement("div");
            item.className = "gallery-item";

            const img = document.createElement("img");
            img.src = "images/" + filename;
            img.alt = `${name} design ${index + 1}`;
            img.loading = "lazy";

            const caption = document.createElement("p");
            caption.textContent = captions[index];

            item.append(img, caption);
            grid.appendChild(item);
        });

        const book = document.createElement("a");
        book.href = "enquiries.html";
        book.className = "gallery-book";
        book.textContent = "Enquire About This Service";

        modal.append(closeButton, heading, details, grid, book);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.body.style.overflow = "hidden";
        closeButton.focus();

        function closeGallery() {
            document.removeEventListener("keydown", handleKeys);
            document.body.style.overflow = previousOverflow;
            overlay.remove();

            if (previousFocus instanceof HTMLElement) {
                previousFocus.focus();
            }
        }

        function handleKeys(event) {
            if (event.key === "Escape") {
                closeGallery();
                return;
            }

            if (event.key !== "Tab") return;

            const focusable = Array.from(
                modal.querySelectorAll("button:not([disabled]), a[href]")
            );

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        closeButton.addEventListener("click", closeGallery);

        overlay.addEventListener("click", event => {
            if (event.target === overlay) closeGallery();
        });

        document.addEventListener("keydown", handleKeys);
    }

    /* ===============================
       SERVICE CARD INTERACTIONS
       =============================== */

    function setupServiceGallery() {
        const cards = document.querySelectorAll(".service-card");

        if (!cards.length) return;

        setupGalleryStyles();

        cards.forEach(card => {
            const heading = card.querySelector("h3");
            const image = card.querySelector("img");

            if (!heading || !image) return;

            const name = heading.textContent.trim();
            const images = galleries[name];

            if (!images) return;
            if (card.querySelector(".see-more-btn")) return;

            const description =
                card.querySelector("p")?.textContent.trim() || "";

            const button = document.createElement("button");
            button.type = "button";
            button.className = "see-more-btn";
            button.textContent = "See More Designs";

            card.appendChild(button);

            function showGallery() {
                openGallery(name, images, description);
            }

            button.addEventListener("click", showGallery);

            image.tabIndex = 0;
            image.setAttribute("role", "button");
            image.setAttribute("aria-label", `View ${name} designs`);

            image.addEventListener("click", showGallery);

            image.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    showGallery();
                }
            });
        });
    }

    /* ===============================
       INITIALIZE WEBSITE
       =============================== */

    function initialize() {
        setupNavigation();
        setupImages();
        setupDates();
        setupForms();
        setupServiceGallery();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );
    } else {
        initialize();
    }

})();
