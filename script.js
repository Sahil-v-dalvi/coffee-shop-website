document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update direct cursor immediately
        if(cursor) {
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }
    });
    
    // Smooth follower loop
    function animateCursor() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        if(follower) {
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add hover states to interactive elements
    const interactables = document.querySelectorAll('a, button, .menu-toggle, input, textarea, .gallery-item');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if(cursor && follower) {
                cursor.classList.add('hovered');
                follower.classList.add('hovered');
            }
        });
        el.addEventListener('mouseleave', () => {
            if(cursor && follower) {
                cursor.classList.remove('hovered');
                follower.classList.remove('hovered');
            }
        });
    });

    // --- Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        fullscreenMenu.classList.toggle('active');
        
        // Stagger nav links
        if(fullscreenMenu.classList.contains('active')) {
            navLinks.forEach((link, index) => {
                link.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
            });
        } else {
            navLinks.forEach(link => {
                link.style.transitionDelay = `0s`;
            });
        }
    }

    if(menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(fullscreenMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Scroll Revel Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-fade');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Parallax Hero Effect ---
    const heroBg = document.getElementById('hero-bg');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // max 20px move
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        if(heroBg) {
            heroBg.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // Run observer once for hero elements in viewport on load
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('.hero .reveal-text, .hero .reveal-fade');
        heroReveals.forEach(el => el.classList.add('active'));
    }, 100);

    // Form Submissions (Prevent Default for Demo)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sent Successfully!';
            btn.style.background = 'var(--accent)';
            btn.style.color = 'var(--bg-color)';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = 'transparent';
                btn.style.color = 'var(--accent)';
                form.reset();
            }, 3000);
        });
    });
});
