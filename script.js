document.addEventListener('DOMContentLoaded', () => {
    const revealButton = document.getElementById('revealButton');
    const heartContainer = document.getElementById('heartContainer');
    const images = document.querySelectorAll('.image'); // Select all images

    // Use GSAP to animate the images when the page is loaded
    gsap.from(images, {
        opacity: 0, // Start with opacity 0
        y: 50, // Start with images below their final position
        stagger: 0.3, // Stagger the animations for each image
        duration: 1.5, // Duration of the animation
        ease: 'power2.out', // Smooth easing
    });

    revealButton.addEventListener('click', () => {
        for (let i = 0; i < 50; i++) {
            createHeart();
        }
    });

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';

        // SVG Heart shape (with path data)
        heart.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `;

        // Randomize position and animation duration
        const x = Math.random() * window.innerWidth; // Random x position
        const y = Math.random() * window.innerHeight; // Random y position

        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        heartContainer.appendChild(heart);

        // Animate using GSAP
        gsap.fromTo(
            heart,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 2, // Duration of the zoom-in effect
                ease: 'power2.out',
                onComplete: () => {
                    // Now fade out and scale down
                    gsap.to(heart, {
                        scale: 0,
                        opacity: 0,
                        duration: 2, // Duration of the zoom-out effect
                        ease: 'power2.in',
                        onComplete: () => heart.remove()
                    });
                }
            }
        );
    }
});
