// ===================================
// Main JavaScript File
// Hope & Strength - Breast Cancer Awareness
// ===================================

(function() {
    'use strict';

    // ===================================
    // DOM Elements
    // ===================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const fadeInElements = document.querySelectorAll('.fade-in');
    const statNumbers = document.querySelectorAll('.stat-number');
    const contactForm = document.getElementById('contactForm');
    const donateButtons = document.querySelectorAll('.donate-btn');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const floatingShapes = document.querySelectorAll('.shape');

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===================================
    // Mobile Menu Toggle (3 Lines) - Additional Functionality
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            // Add animation to the 3 lines
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    }

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (navbar) {
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (optional)
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===================================
    // Intersection Observer for Fade-in Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Animate FAQ items on scroll
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        const faqItemsList = faqContainer.querySelectorAll('.faq-item');
        
        // Set initial state for FAQ items
        faqItemsList.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        const faqObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    faqItemsList.forEach((item, idx) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, idx * 50);
                    });
                    faqObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        faqObserver.observe(faqContainer);
    }

    // ===================================
    // Counter Animation for Statistics
    // ===================================
    const animateCounter = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                // Format number based on target
                if (target % 1 === 0) {
                    element.textContent = Math.floor(current);
                } else {
                    element.textContent = current.toFixed(1);
                }
                requestAnimationFrame(updateCounter);
            } else {
                // Final value
                if (target % 1 === 0) {
                    element.textContent = target;
                } else {
                    element.textContent = target.toFixed(1);
                }
            }
        };

        updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (!element.classList.contains('counted')) {
                    element.classList.add('counted', 'animate');
                    animateCounter(element);
                    statsObserver.unobserve(element);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Animate key fact numbers on scroll
    const keyFactCards = document.querySelectorAll('.key-fact-card');
    const factNumbersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const factNumber = card.querySelector('.fact-number');
                if (factNumber) {
                    // Trigger animation
                    factNumber.style.animation = 'none';
                    setTimeout(() => {
                        factNumber.style.animation = 'countUp 1s ease-out';
                    }, 10);
                }
                factNumbersObserver.unobserve(card);
            }
        });
    }, { threshold: 0.3 });

    keyFactCards.forEach(card => {
        factNumbersObserver.observe(card);
    });

    // Animate overview stat cards on scroll
    const overviewStatCards = document.querySelectorAll('.overview-stat-card, .breast-stat-card, .survival-card');
    const overviewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                overviewObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    overviewStatCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        overviewObserver.observe(card);
    });

    // ===================================
    // Enhanced Card Animations
    // ===================================
    const cards = document.querySelectorAll('.awareness-card, .stat-card, .type-card, .prevention-card, .symptom-card, .support-card, .story-card, .key-fact-card, .info-card, .message-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cardObserver.observe(card);

        // Add 3D tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(0) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });

    // ===================================
    // Floating Shapes Animation
    // ===================================
    floatingShapes.forEach((shape, index) => {
        // Random movement animation
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = (Math.random() - 0.5) * 100;
        const duration = 10 + Math.random() * 10;

        shape.style.animation = `float ${duration}s ease-in-out infinite`;
        shape.style.animationDelay = `${index * 0.5}s`;

        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * (0.3 + index * 0.1);
            shape.style.transform = `translateY(${rate}px)`;
        });
    });

    // ===================================
    // Scroll Indicator Animation
    // ===================================
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });

        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // Contact Form Handling
    // ===================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const formSuccess = document.getElementById('formSuccess');

            // Simulate form submission (replace with actual API call)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API delay
            setTimeout(() => {
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;

                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    formSuccess.style.animation = 'fadeInUp 0.5s ease';
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                    // Hide after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.animation = 'fadeOut 0.5s ease';
                        setTimeout(() => {
                            formSuccess.style.display = 'none';
                        }, 500);
                    }, 5000);
                }

                // Show notification
                showNotification('Thank you! Your message has been sent successfully.', 'success');
            }, 1500);
        });
    }

    // ===================================
    // Donate Button Interactions
    // ===================================
    donateButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            donateButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===================================
    // Timeline Animation
    // ===================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });

    // ===================================
    // FAQ Accordion Functionality
    // ===================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    // Smooth scroll to the active FAQ item
                    setTimeout(() => {
                        const rect = item.getBoundingClientRect();
                        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        const targetY = rect.top + scrollTop - 100;
                        window.scrollTo({
                            top: targetY,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            });

            // Add keyboard support
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        }
    });

    // Update aria-expanded when FAQ items are toggled
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const observer = new MutationObserver(() => {
            if (question) {
                question.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
            }
        });
        observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });

    // ===================================
    // Myth/Fact Card Flip Animation
    // ===================================
    const mythFactCards = document.querySelectorAll('.myth-fact-card');
    mythFactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0)';
        });
    });

    // ===================================
    // Symptom Card Stagger Animation
    // ===================================
    const symptomCards = document.querySelectorAll('.symptom-card');
    symptomCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // ===================================
    // Prevention Card Number Animation
    // ===================================
    const preventionCards = document.querySelectorAll('.prevention-card');
    preventionCards.forEach((card, index) => {
        const number = card.querySelector('.prevention-number');
        if (number) {
            const preventionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        number.style.animation = 'countUp 0.8s ease-out';
                        number.style.animationDelay = `${index * 0.1}s`;
                        preventionObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            preventionObserver.observe(card);
        }
    });

    // ===================================
    // Parallax Effect for Page Hero
    // ===================================
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = pageHero.querySelector('.page-hero-content');
            if (heroContent && scrolled < pageHero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / pageHero.offsetHeight);
            }
        });
    }

    // ===================================
    // Smooth Page Transitions
    // ===================================
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });

    // ===================================
    // Button Ripple Effect
    // ===================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ===================================
    // Scroll to Top Button
    // ===================================
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2196F3 0%, #64B5F6 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(33, 150, 243, 0.4);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(33, 150, 243, 0.6)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(33, 150, 243, 0.4)';
    });

    // ===================================
    // Add CSS Animations Dynamically
    // ===================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }

        .donate-btn.active {
            background: var(--blue-primary);
            color: white;
            transform: scale(1.1);
        }

        .navbar {
            transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Logo Click Animation
    // ===================================
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }

    // ===================================
    // Enhanced Hover Effects for Links
    // ===================================
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===================================
    // Lazy Loading for Images (if any)
    // ===================================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===================================
    // Table Row Animations
    // ===================================
    const tableRows = document.querySelectorAll('.facilities-table tbody tr');
    const tableObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 50);
                tableObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        tableObserver.observe(row);
    });

    // Theme functionality removed - using blue theme only

    // ===================================
    // Console Message
    // ===================================
    console.log('%cHope & Strength', 'color: #2196F3; font-size: 20px; font-weight: bold;');
    console.log('%cBreast Cancer Awareness Website', 'color: #1976D2; font-size: 14px;');
    console.log('%cTogether we can make a difference! 💙', 'color: #666; font-size: 12px;');

})();

