document.addEventListener('DOMContentLoaded', () => {

    // 1. PARTICLE NETWORK ANIMATION (tsParticles)
    if (document.getElementById('tsparticles')) {
        tsParticles.load('tsparticles', {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: 'repulse' },
                    resize: true,
                },
                modes: { repulse: { distance: 100, duration: 0.4 } },
            },
            particles: {
                color: { value: '#ffffff' },
                links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.2, width: 1 },
                move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: false, speed: 1, straight: false },
                number: { density: { enable: true, area: 800 }, value: 80 },
                opacity: { value: 0.2 },
                shape: { type: 'circle' },
                size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
        });
    }

// 2. BLUEPRINT SCAN - INTERACTIVE HEADING (FINAL PROFESSIONAL EFFECT)
document.querySelectorAll('.interactive-heading').forEach(heading => {
    const text = heading.textContent.trim();
    heading.innerHTML = ''; // Clear existing text
    const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.textContent = char;
        // Ensure spaces don't collapse but remain non-interactive
        if (char === ' ') {
            span.style.display = 'inline'; 
        } else {
            span.dataset.originalColor = "#B0B0B0"; // Store original inactive color
        }
        heading.appendChild(span);
        return span;
    });

    // We get the final active color directly from your CSS variables for consistency
    const activeColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-bold').trim();

    const scanEffect = (e) => {
        chars.forEach(char => {
            if (char.textContent === ' ') return; // Skip spaces

            const rect = char.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            // The 'force' is a value from 0 (far) to 1 (close)
            const force = Math.max(0, 1 - (distance / 120)); // 120 is the radius of influence

            // Animate based on force
            if (force > 0.1) {
                // As the mouse gets closer, move towards the active color and lift up
                char.style.color = activeColor;
                char.style.transform = `translateY(${force * -5}px) scale(${1 + force * 0.05})`;
            } else {
                // Return to original state if mouse is far
                char.style.color = char.dataset.originalColor;
                char.style.transform = 'translateY(0px) scale(1)';
            }
        });
    };
    
    // Smoothly reset all characters when the mouse leaves the heading area
    const resetEffect = () => {
        chars.forEach(char => {
            if (char.textContent !== ' ') {
                char.style.color = char.dataset.originalColor;
                char.style.transform = 'translateY(0px) scale(1)';
            }
        });
    };

    heading.addEventListener('mousemove', scanEffect);
    heading.addEventListener('mouseleave', resetEffect);
});

    // 3. MOBILE MENU TOGGLE
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

// 4. SCROLL REVEAL ANIMATIONS - REFINED
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '80px',
    duration: 1200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false // Set to false for a better user experience on re-visit
});

// Staggered reveals for lists and grids
sr.reveal('.service-item, .project-card, .value-item, .team-member-card', { interval: 150 });

// Content reveals with a slide-in effect
sr.reveal('.about-text, .contact-form-container', { origin: 'left' });
sr.reveal('.about-image, .contact-details-container', { origin: 'right' });

// Simple fade-in for headers and footers
sr.reveal('.page-header h1, .page-header p, .section-intro, .footer-col', {
    distance: '0px',
    opacity: 0,
    interval: 100
});
    
    // 5. VANILLA TILT 3D EFFECT
    if (document.querySelector('.project-card')) {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 15, speed: 400, glare: true, "max-glare": 0.4
        });
    }

});