document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu && menuClose) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
        });
        menuClose.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
        });
    }

    // --- Hero Slider Logic ---
    const slidesContainer = document.getElementById("slides");
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");

    if (slidesContainer && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalSlides = slidesContainer.children.length;
        let slideInterval;

        function goToSlide(index) {
            currentIndex = (index + totalSlides) % totalSlides;
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function startSlideShow() {
            slideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startSlideShow();
        }

        nextBtn.addEventListener("click", () => {
            goToSlide(currentIndex + 1);
            resetInterval();
        });

        prevBtn.addEventListener("click", () => {
            goToSlide(currentIndex - 1);
            resetInterval();
        });

        startSlideShow();
    }

    // --- Cart & Wishlist Logic ---
    const cartCountEl = document.getElementById('cart-count');
    const wishlistCountEl = document.getElementById('wishlist-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
    const toast = document.getElementById('toast');

    if (cartCountEl && addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                let currentCount = parseInt(cartCountEl.textContent);
                cartCountEl.textContent = currentCount + 1;

                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000);
                }
            });
        });
    }

    if (wishlistCountEl && addToWishlistButtons.length > 0) {
        addToWishlistButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                if (!button.disabled) {
                    let currentCount = parseInt(wishlistCountEl.textContent);
                    wishlistCountEl.textContent = currentCount + 1;

                    const icon = button.querySelector('i');
                    if (icon) {
                        icon.classList.toggle('far');
                        icon.classList.toggle('fas');
                        icon.classList.toggle('text-red-500');
                    }

                    button.disabled = true;
                }
            });
        });
    }

    // --- REVISED: Pagination Logic ---
    const paginationContainer = document.getElementById('pagination-container');

    if (paginationContainer) {
        const pageLinks = paginationContainer.querySelectorAll('.pagination-link');

        pageLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault(); // Stop the link from trying to navigate

                // Remove active styles from all page links
                pageLinks.forEach(item => {
                    item.classList.remove('bg-yellow-400', 'text-black', 'font-bold');
                    item.classList.add('text-gray-500', 'hover:text-black', 'hover:bg-gray-200');
                });

                // Add active styles to the clicked link
                this.classList.add('bg-yellow-400', 'text-black', 'font-bold');
                this.classList.remove('text-gray-500', 'hover:text-black', 'hover:bg-gray-200');

                console.log("Active page is now:", this.textContent);
            });
        });
    }
});

