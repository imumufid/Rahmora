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

    // --- CORRECTED HERO SLIDER LOGIC ---
    const slidesContainer = document.getElementById("slides");
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");

    // Check if slider elements exist on the page to prevent errors
    if (slidesContainer && prevBtn && nextBtn) {
        let currentIndex = 0;
        // Correctly gets the number of slides (children elements)
        const totalSlides = slidesContainer.children.length;
        let slideInterval;

        // This function moves the slides container
        function goToSlide(index) {
            // This math trick makes the slider loop from the last slide back to the first, and vice-versa
            currentIndex = (index + totalSlides) % totalSlides;
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // This function starts the automatic slide transition
        function startSlideShow() {
            slideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000); // Change slide every 5 seconds
        }

        // This function resets the timer whenever the user clicks an arrow
        function resetInterval() {
            clearInterval(slideInterval); // Stop the current timer
            startSlideShow(); // Start a new one
        }

        // Event listener for the "next" button
        nextBtn.addEventListener("click", () => {
            goToSlide(currentIndex + 1);
            resetInterval(); // Reset timer on manual click
        });

        // Event listener for the "previous" button
        prevBtn.addEventListener("click", () => {
            goToSlide(currentIndex - 1);
            resetInterval(); // Reset timer on manual click
        });

        // Start the slideshow automatically when the page loads
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
});
