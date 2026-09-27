/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("preloader")
            .classList.add("hide");

    }, 800);

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });

/* =====================================================
   REVEAL ON SCROLL
===================================================== */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("active");

                }

            });

        },

        {
            threshold: .12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });


/* =====================================================
   COUNTER
===================================================== */

const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !entry.target.dataset.started
                ) {

                    entry.target.dataset.started =
                        "true";

                    animateCounter(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: .8
        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


function animateCounter(element) {

    const target =
        Number(element.dataset.target);

    let current = 0;

    const duration = 1500;

    const start =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - start) / duration,
                1
            );


        current =
            Math.floor(
                progress * target
            );


        element.textContent =
            current;


        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent =
                target;

        }

    }


    requestAnimationFrame(update);

}


/* =====================================================
   3D TILT
===================================================== */

document
    .querySelectorAll(".tilt")
    .forEach(card => {


        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) /
                    15;

                const rotateY =
                    (centerX - x) /
                    15;


                card.style.transform =

                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }

        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }

        );

    });


/* =====================================================
   PARTICLES
===================================================== */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


function createParticles() {

    particles = [];


    const amount =
        window.innerWidth < 600
            ? 35
            : 75;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() * 1.5 + .3,

            speed:
                Math.random() * .25 + .05,

            opacity:
                Math.random() * .5 + .1

        });

    }

}


createParticles();


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(p => {

        p.y -= p.speed;


        if (p.y < 0) {

            p.y =
                canvas.height;

        }


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                100,
                190,
                255,
                ${p.opacity}
            )`;


        ctx.fill();

    });


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


/* =====================================================
   PRODUCT DATABASE
===================================================== */

const productContainer =
    document.getElementById(
        "productContainer"
    );


async function loadProducts() {

    try {

        const response =
            await fetch(
                "backend/products.php"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load products"
            );

        }


        const products =
            await response.json();


        renderProducts(products);


    } catch (error) {

        console.error(error);


        /*
           Fallback sementara jika database
           belum aktif.
        */

        const fallbackProducts = [
            {
                id: 1,
                category: "PT. Mitra Grafika Indonesia",
                name: "SPARE PART PISAU INDUSTRI",
                description:"PT. Mitra Grafika Indonesia berkomitmen dalam penyediaan berbagai bentuh knife, sesuai kebutuhan industri",
                image:"produk-pisau.jpg"
            },
            {
                id: 2,
                category: "PT. Mitra Grafika Indonesia",
                name: "FABRIKASI RUBBER ROLL",
                description: "PT. Mitra Grafika Indonesia menyediakan NEW produk Rubber Roll dengan kualitas terbaik dan harga bersaing.",
                image:"produk-rubber.jpg"      
            },

            {
                id: 3,
                category: "PT. Mitra Grafika Indonesia",
                name: "FABRIKASI AIR SHAFT",
                description: "PT. Mitra Grafika Indonesia menyediakan new produk air shaft dengan berbagai bentuk sesuai spesifikasi mesin.",
                image:"gambar 3.jpg"
            },

             {
                id: 4,
                category: "PT. Mitra Grafika Indonesia",
                name: "PART CUSTOM AIR SHAFT",
                description: "PT. Mitra Grafika Indonesia dapat memproduksi spare part air shaft sesuai dengan kebutuhan costumers.",
                image:"gambar 4.jpg"
            },

            {
                id: 5,
                category: "PT. Mitra Grafika Indonesia",
                name: "POWER GEAR BOX",
                description: "PT. Mitra Grafika Indonesia menyediakan solusi terbaik dalam pembuatan berbagai macam gear.",
                image:"gambar 5.jpg"
            },
            {
                id: 6,
                category: "PT. Mitra Grafika Indonesia",
                name: "ROLLER BRUSH",
                description:"PT. Mitra Grafika Indonesia menyediakan berbagai macam kebutuhan industri.",
                image:"gambar 6.jpg"
            }
        ];


        renderProducts(
            fallbackProducts
        );

    }

}


function renderProducts(products) {

    productContainer.innerHTML = "";


    products.forEach(product => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "product-card tilt reveal";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-overlay"></div>

            <div class="product-arrow">
                ↗
            </div>

            <div class="product-content">

                <span>
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

            </div>

        `;


        card.addEventListener(
            "click",
            () => {

                openProductModal(
                    product
                );

            }
        );


        productContainer.appendChild(
            card
        );

    });


    /*
       Jalankan kembali reveal observer
       untuk produk yang baru dibuat.
    */

    productContainer
        .querySelectorAll(".reveal")
        .forEach(element => {

            revealObserver.observe(
                element
            );

        });


    /*
       Aktifkan 3D tilt pada produk.
    */

    productContainer
        .querySelectorAll(".tilt")
        .forEach(card => {

            setupTilt(card);

        });

}


function setupTilt(card) {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;


            const rotateY =
                ((x / rect.width) - .5)
                * 12;


            const rotateX =
                -((y / rect.height) - .5)
                * 12;


            card.style.transform =

                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

}


/* =====================================================
   PRODUCT MODAL
===================================================== */

const modal =
    document.getElementById(
        "productModal"
    );


const modalImage =
    document.getElementById(
        "modalImage"
    );


const modalCategory =
    document.getElementById(
        "modalCategory"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


function openProductModal(product) {

    modalImage.src =
        product.image;

    modalImage.alt =
        product.name;

    modalCategory.textContent =
        product.category;

    modalTitle.textContent =
        product.name;

    modalDescription.textContent =
        product.description;


    modal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


function closeProductModal() {

    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeProductModal
    );


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeProductModal();

        }

    }
);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formStatus =
    document.getElementById(
        "formStatus"
    );


contactForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const submitButton =
            contactForm.querySelector(
                "button"
            );


        submitButton.disabled =
            true;


        submitButton.innerHTML =
            "Sending...";


        formStatus.textContent =
            "";


        try {

            const formData =
                new FormData(
                    contactForm
                );


            const response =
                await fetch(
                    "backend/contact.php",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const result =
                await response.json();


            if (result.success) {

                formStatus.textContent =
                    "Pesan berhasil dikirim.";

                contactForm.reset();

            } else {

                formStatus.textContent =
                    result.message ||
                    "Pesan gagal dikirim.";

            }


        } catch (error) {

            console.error(error);

            formStatus.textContent =
                "Terjadi kesalahan koneksi.";

        }


        submitButton.disabled =
            false;

        submitButton.innerHTML =
            `
            Send Message
            <span>↗</span>
            `;

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

loadProducts();