        // Element 1: Loader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 3000);
        });


        // Navigation with smooth scrolling
        function navigateTo(section) {
            document.getElementById(section).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }

        // Element 8: Ripple Effect on Review Cards
        document.querySelectorAll('.review-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = card.getBoundingClientRect();
                const size = 60;
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
               
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
               
                card.appendChild(ripple);
               
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Element 9: Scroll-based Text Animation
        const heroTitle = document.getElementById('heroTitle');
        let baseSize = 4;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.008;
            const newSize = Math.max(2, Math.min(6, baseSize + rate));
            heroTitle.style.fontSize = `${newSize}rem`;
        });

        // Element 11: Floating Spice Particles
        function createSpiceParticle() {
            const particle = document.createElement('div');
            particle.classList.add('spice-particle');
           
            const startX = Math.random() * window.innerWidth;
            const delay = Math.random() * 20;
           
            particle.style.left = startX + 'px';
            particle.style.animationDelay = delay + 's';
           
            document.getElementById('spiceParticles').appendChild(particle);
           
            setTimeout(() => {
                particle.remove();
            }, 20000 + delay * 1000);
        }

        // Create spice particles continuously
        setInterval(createSpiceParticle, 1200);

        // Element 2: Enhanced Image Hover Effect (for review cards)
        document.querySelectorAll('.review-card').forEach((card, index) => {
            const originalBg = card.style.background;
            const hoverColors = [
                'linear-gradient(135deg, #F4E4BC 0%, #E6D3A3 100%)',
                'linear-gradient(135deg, #F0D0A0 0%, #E8C547 100%)',
                'linear-gradient(135deg, #F5E6D3 0%, #DFB77D 100%)',
                'linear-gradient(135deg, #F2E6D0 0%, #D2B48C 100%)'
            ];
           
            card.addEventListener('mouseenter', () => {
                card.style.background = hoverColors[index % hoverColors.length];
            });
           
            card.addEventListener('mouseleave', () => {
                card.style.background = originalBg || 'linear-gradient(135deg, #F5E6D3 0%, var(--cream-white) 100%)';
            });
        });

        // Element 3: Custom Cursor for Reviews Grid
        const reviewsGrid = document.getElementById('reviewsGrid');
        

        function createCustomCursor() {
            customCursor = document.createElement('div');
            customCursor.style.cssText = `
                position: fixed;
                width: 25px;
                height: 25px;
                background: var(--warm-orange);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                display: none;
                box-shadow: 0 4px 15px rgba(210, 105, 30, 0.4);
            `;
            document.body.appendChild(customCursor);
        }

        createCustomCursor();
        if(reviewsGrid){
                   reviewsGrid.addEventListener('mouseenter', () => {
    customCursor.style.display = 'block';
    reviewsGrid.style.cursor = 'none';
});
        }
 

reviewsGrid.addEventListener('mouseleave', () => {
    customCursor.style.display = 'none';
    reviewsGrid.style.cursor = 'default';
        });

        reviewsGrid.addEventListener('mousemove', (e) => {
            if (customCursor) {
                customCursor.style.left = e.clientX - 12.5 + 'px';
                customCursor.style.top = e.clientY - 12.5 + 'px';
            }
        });

        reviewsGrid.querySelectorAll('.review-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (customCursor) {
                    customCursor.style.transform = 'scale(1.5)';
                    customCursor.style.background = 'var(--golden-yellow)';
                }
            });
           
            card.addEventListener('mouseleave', () => {
                if (customCursor) {
                    customCursor.style.transform = 'scale(1)';
                    customCursor.style.background = 'var(--warm-orange)';
                }
            });
        });

        // Element 5: Page Transition Effect
        function createPageTransition() {
            const transition = document.createElement('div');
            transition.style.cssText = `
                position: fixed;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, var(--warm-orange) 0%, var(--deep-terracotta) 100%);
                z-index: 9998;
                transition: left 0.5s ease;
            `;
            document.body.appendChild(transition);
            return transition;
        }

        const pageTransition = createPageTransition();

        // Enhanced navigation with page transition
        function navigateToWithTransition(section) {
            pageTransition.style.left = '0';
           
            setTimeout(() => {
                document.getElementById(section).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
               
                setTimeout(() => {
                    pageTransition.style.left = '100%';
                    setTimeout(() => {
                        pageTransition.style.left = '-100%';
                    }, 500);
                }, 300);
            }, 250);
        }

        // Update navigation function
        window.navigateTo = navigateToWithTransition;

        // Element 10: Mystery Element - Interactive Spice Trail
        function createSpiceTrail(e) {
            for (let i = 0; i < 3; i++) {
                const spice = document.createElement('div');
                spice.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: ${['var(--turmeric)', 'var(--warm-orange)', 'var(--spice-red)'][i]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                    left: ${e.clientX - 4}px;
                    top: ${e.clientY - 4}px;
                    animation: spiceTrail 1s ease-out forwards;
                `;
               
                document.body.appendChild(spice);
               
                setTimeout(() => spice.remove(), 1000);
            }
        }

        // Add spice trail animation
        const spiceTrailStyle = document.createElement('style');
        spiceTrailStyle.textContent = `
            @keyframes spiceTrail {
                0% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.5) translateY(-30px);
                }
            }
        `;
        document.head.appendChild(spiceTrailStyle);

        // Add spice trail to CTA button
        document.querySelector('.cta-button').addEventListener('mousemove', createSpiceTrail);

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.transform = 'scale(0.9)';
            } else {
                navbar.style.transform = 'scale(1)';
            }
        });

        // Add breathing animation to loader pot
        const loaderPot = document.querySelector('.loader-pot');
        if (loaderPot) {
            setInterval(() => {
                loaderPot.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    loaderPot.style.transform = 'scale(1)';
                }, 300);
            }, 1000);
        }
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
  });


  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    grid: { rows: 2 },
    spaceBetween: 10,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  });
  
  
  
  // Smooth scroll behavior for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
  

// Custom Cursor for #reviewsGrid
const customCursor = document.getElementById('customCursor');

document.addEventListener('mousemove', (e) => {
  if (!customCursor) return;
  customCursor.style.display = 'block';
  customCursor.style.top = `${e.clientY}px`;
  customCursor.style.left = `${e.clientX}px`;
});

document.addEventListener('mouseleave', () => {
  if (customCursor) customCursor.style.display = 'none';
});

if (reviewsGrid) {
  reviewsGrid.addEventListener('mouseenter', () => {
    customCursor.style.display = 'block';
    reviewsGrid.style.cursor = 'none';
  });

  reviewsGrid.addEventListener('mouseleave', () => {
    customCursor.style.display = 'none';
    reviewsGrid.style.cursor = 'default';
  });

  reviewsGrid.addEventListener('mousemove', (e) => {
    customCursor.style.top = `${e.clientY}px`;
    customCursor.style.left = `${e.clientX}px`;
  });

  reviewsGrid.querySelectorAll('.review-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      customCursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      customCursor.style.background = '#ffa500'; // warm-orange
    });

    card.addEventListener('mouseleave', () => {
      customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
      customCursor.style.background = '#ffd700'; // back to golden
    });
  });
}
