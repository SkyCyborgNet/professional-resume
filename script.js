/**
 * ================================================================
 * SCRIPT - Cuadro Comparativo de Algoritmos Criptográficos
 * Funcionalidades:
 *   - Navegación suave
 *   - Menú hamburguesa (responsive)
 *   - Botón "Volver arriba"
 *   - Animaciones al hacer scroll (fade-in)
 *   - Resaltado de enlace activo en el menú
 * ================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================================
    // 1. MENÚ HAMBURGUESA (responsive)
    // ============================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });
    }

    // ============================================================
    // 2. BOTÓN "VOLVER ARRIBA"
    // ============================================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================================
    // 3. RESALTADO DE ENLACE ACTIVO EN EL MENÚ
    // ============================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPos = window.scrollY + 120;

            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ============================================================
    // 4. ANIMACIONES AL HACER SCROLL (fade-in)
    // ============================================================
    // Seleccionar elementos que tendrán animación
    const animatedElements = document.querySelectorAll(
        '.section, .introduccion-grid, .table-responsive, .conclusion-grid, .video-wrapper'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(el) {
            el.classList.add('animate-hidden');
            observer.observe(el);
        });
    }

    // ============================================================
    // 5. ESTILOS PARA LAS ANIMACIONES (se inyectan dinámicamente)
    // ============================================================
    const styleAnimations = document.createElement('style');
    styleAnimations.textContent = `
        .animate-hidden {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        /* Pequeño retraso para elementos dentro de grids */
        .animate-hidden .introduccion-text,
        .animate-hidden .introduccion-image,
        .animate-hidden .conclusion-text,
        .animate-hidden .conclusion-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-in .introduccion-text,
        .animate-in .introduccion-image,
        .animate-in .conclusion-text,
        .animate-in .conclusion-image {
            opacity: 1;
            transform: translateY(0);
        }
        .animate-in .introduccion-image {
            transition-delay: 0.2s;
        }
        .animate-in .conclusion-image {
            transition-delay: 0.2s;
        }
    `;
    document.head.appendChild(styleAnimations);

    // ============================================================
    // 6. CIERRE DEL MENÚ AL REDIMENSIONAR LA VENTANA
    // ============================================================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('open');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });

    console.log('🔐 Página de Criptografía cargada exitosamente');
});