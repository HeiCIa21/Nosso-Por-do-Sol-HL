// ==========================================
// CONFIGURAÇÃO E ESTADO
// ==========================================
const STATE = {
    musicPlaying: false,
    videoLoaded: false,
    videoType: null // 'kapwing', 'fallback', or null
};

// ==========================================
// MUSIC PLAYER
// ==========================================
const initMusicPlayer = () => {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Carregar preferência salva
    const savedPreference = localStorage.getItem('musicPlaying');
    if (savedPreference === 'true') {
        // Tentar autoplay (só funciona após interação do usuário)
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                STATE.musicPlaying = true;
                musicToggle.classList.add('playing');
            }).catch(() => {
                // Autoplay bloqueado - usuário terá que clicar
                console.log('Autoplay bloqueado pelo navegador');
            });
        }
    }
    
    // Toggle play/pause
    musicToggle.addEventListener('click', () => {
        if (STATE.musicPlaying) {
            backgroundMusic.pause();
            STATE.musicPlaying = false;
            musicToggle.classList.remove('playing');
            localStorage.setItem('musicPlaying', 'false');
        } else {
            backgroundMusic.play();
            STATE.musicPlaying = true;
            musicToggle.classList.add('playing');
            localStorage.setItem('musicPlaying', 'true');
        }
    });
    
    // Tratar fim do áudio (loop já está no HTML, mas por garantia)
    backgroundMusic.addEventListener('ended', () => {
        if (STATE.musicPlaying) {
            backgroundMusic.currentTime = 0;
            backgroundMusic.play();
        }
    });
};

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const initNavbar = () => {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll para links
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
};

// ==========================================
// VIDEO LAZY LOADING & FALLBACK
// ==========================================
const initVideoPlayer = () => {
    const videoEmbed = document.getElementById('videoEmbed');
    const videoPoster = document.getElementById('videoPoster');
    const loadVideoBtn = document.getElementById('loadVideoBtn');
    const kapwingIframe = document.getElementById('kapwingIframe');
    const fallbackVideo = document.getElementById('fallbackVideo');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    if (!videoEmbed) return;
    
    const kapwingSrc = videoEmbed.getAttribute('data-kapwing-src');
    const videoSrc = videoEmbed.getAttribute('data-video-src');
    
    // Função para carregar o iframe do Kapwing
    const loadKapwingVideo = () => {
        if (STATE.videoLoaded) return;
        
        STATE.videoLoaded = true;
        videoPoster.classList.add('hidden');
        kapwingIframe.classList.remove('hidden');
        
        // Carregar iframe
        kapwingIframe.src = kapwingIframe.getAttribute('data-src');
        STATE.videoType = 'kapwing';
        
        // Timeout para fallback (se não carregar em 8 segundos)
        setTimeout(() => {
            // Verificar se iframe carregou (aproximação)
            if (!kapwingIframe.contentWindow || kapwingIframe.src === '') {
                loadFallbackVideo();
            }
        }, 8000);
    };
    
    // Função para carregar o vídeo fallback local
    const loadFallbackVideo = () => {
        console.log('Carregando vídeo fallback local...');
        kapwingIframe.classList.add('hidden');
        fallbackVideo.classList.remove('hidden');
        STATE.videoType = 'fallback';
        
        // Verificar se o arquivo existe
        fallbackVideo.addEventListener('error', () => {
            console.error('Vídeo local não encontrado');
            showVideoError();
        }, { once: true });
    };
    
    // Função para mostrar erro
    const showVideoError = () => {
        videoPoster.classList.remove('hidden');
        const posterOverlay = videoPoster.querySelector('.poster-overlay');
        posterOverlay.innerHTML = `
            <p style="color: white; font-size: 1.1rem; margin-bottom: 1rem;">
                ⚠️ Não foi possível carregar o vídeo
            </p>
            <a href="${kapwingSrc}" target="_blank" rel="noopener" class="button btn-external" style="display: inline-flex;">
                Abrir no Kapwing
            </a>
        `;
    };
    
    // Botão de carregar vídeo
    if (loadVideoBtn) {
        loadVideoBtn.addEventListener('click', loadKapwingVideo);
    }
    
    // IntersectionObserver para lazy load automático quando estiver próximo
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !STATE.videoLoaded) {
                // Não carrega automaticamente, apenas mostra o botão
                // Para carregar automaticamente, descomente a linha abaixo:
                // loadKapwingVideo();
            }
        });
    }, {
        rootMargin: '200px' // Começa a carregar 200px antes de entrar no viewport
    });
    
    observer.observe(videoEmbed);
    
    // Fullscreen
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const activeVideo = STATE.videoType === 'fallback' ? fallbackVideo : videoEmbed;
            
            if (activeVideo.requestFullscreen) {
                activeVideo.requestFullscreen();
            } else if (activeVideo.webkitRequestFullscreen) {
                activeVideo.webkitRequestFullscreen();
            } else if (activeVideo.mozRequestFullScreen) {
                activeVideo.mozRequestFullScreen();
            } else if (activeVideo.msRequestFullscreen) {
                activeVideo.msRequestFullscreen();
            }
        });
    }
    
    // Pausar música quando vídeo local for reproduzido
    if (fallbackVideo) {
        fallbackVideo.addEventListener('play', () => {
            const backgroundMusic = document.getElementById('backgroundMusic');
            const musicToggle = document.getElementById('musicToggle');
            if (STATE.musicPlaying) {
                backgroundMusic.pause();
                musicToggle.classList.remove('playing');
            }
        });
        
        fallbackVideo.addEventListener('pause', () => {
            // Opcionalmente, retomar música quando pausar o vídeo
            // Descomente se quiser esse comportamento
            // const backgroundMusic = document.getElementById('backgroundMusic');
            // backgroundMusic.play();
        });
    }
};

// ==========================================
// MODALS - PEDIDO DE NAMORO
// ==========================================
const initModals = () => {
    const btnAbrirPedido = document.getElementById('btnAbrirPedido');
    const modalPedido = document.getElementById('modalPedido');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const btnSim = document.getElementById('btnSim');
    const btnObvio = document.getElementById('btnObvio');
    const modalResposta = document.getElementById('modalResposta');
    
    // Função para pausar vídeo quando modal abrir
    const pauseVideoIfPlaying = () => {
        const fallbackVideo = document.getElementById('fallbackVideo');
        if (fallbackVideo && !fallbackVideo.paused) {
            fallbackVideo.pause();
        }
    };
    
    // Abrir modal do pedido
    if (btnAbrirPedido) {
        btnAbrirPedido.addEventListener('click', () => {
            modalPedido.classList.add('active');
            pauseVideoIfPlaying();
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Fechar modal do pedido
    const fecharModalPedido = () => {
        modalPedido.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (modalClose) {
        modalClose.addEventListener('click', fecharModalPedido);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', fecharModalPedido);
    }
    
    // ESC para fechar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modalPedido.classList.contains('active')) {
                fecharModalPedido();
            }
        }
    });
    
    // Resposta SIM
    const mostrarCelebracao = () => {
        modalPedido.classList.remove('active');
        modalResposta.classList.add('active');
        
        // Confetes/celebração
        createConfetti();
    };
    
    if (btnSim) {
        btnSim.addEventListener('click', mostrarCelebracao);
    }
    
    if (btnObvio) {
        btnObvio.addEventListener('click', mostrarCelebracao);
    }
};

// ==========================================
// CONFETTI ANIMATION
// ==========================================
const createConfetti = () => {
    const colors = ['#FF6F61', '#FFC371', '#FF9A8B', '#8EC5FC', '#E0C3FC'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '99999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Animar queda
        const duration = 2000 + Math.random() * 2000;
        const endLeft = parseFloat(confetti.style.left) + (Math.random() - 0.5) * 100;
        
        confetti.animate([
            { 
                top: '-10px', 
                left: confetti.style.left,
                opacity: 1,
                transform: `rotate(0deg)`
            },
            { 
                top: '100vh', 
                left: endLeft + '%',
                opacity: 0.8,
                transform: `rotate(${360 + Math.random() * 360}deg)`
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
        
        // Remover após animação
        setTimeout(() => {
            confetti.remove();
        }, duration);
    }
};

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Adicionar classe fade-in aos elementos que queremos animar
    const animateElements = document.querySelectorAll('.polaroid, .sobre-text, .section-header');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
};

// ==========================================
// POLAROID TILT EFFECT
// ==========================================
const initPolaroidTilt = () => {
    const polaroids = document.querySelectorAll('.polaroid[data-tilt]');
    
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('mousemove', (e) => {
            const rect = polaroid.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            polaroid.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        polaroid.addEventListener('mouseleave', () => {
            polaroid.style.transform = '';
        });
    });
};

// ==========================================
// LIGHTBOX PARA FOTOS (OPCIONAL)
// ==========================================
const initPhotoLightbox = () => {
    const polaroids = document.querySelectorAll('.polaroid:not(.video-card)');
    
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('click', () => {
            const img = polaroid.querySelector('img');
            if (!img) return;
            
            const lightbox = document.createElement('div');
            lightbox.className = 'modal active';
            lightbox.style.zIndex = '100000';
            lightbox.innerHTML = `
                <div class="modal-overlay"></div>
                <div style="position: relative; z-index: 1; max-width: 90vw; max-height: 90vh;">
                    <button class="modal-close" style="position: absolute; top: -50px; right: 0;" aria-label="Fechar">&times;</button>
                    <img src="${img.src}" alt="${img.alt}" style="max-width: 100%; max-height: 90vh; border-radius: 12px; box-shadow: 0 24px 64px rgba(0,0,0,0.5);">
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            const closeBtn = lightbox.querySelector('.modal-close');
            const overlay = lightbox.querySelector('.modal-overlay');
            
            const closeLightbox = () => {
                lightbox.remove();
                document.body.style.overflow = '';
            };
            
            closeBtn.addEventListener('click', closeLightbox);
            overlay.addEventListener('click', closeLightbox);
            
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });
};

// ==========================================
// PERFORMANCE - LAZY LOAD DE IMAGENS
// ==========================================
const initLazyImages = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Navegador suporta lazy loading nativo
        return;
    }
    
    // Fallback para navegadores antigos
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// ==========================================
// ERROR HANDLING
// ==========================================
const initErrorHandling = () => {
    // Tratar erros de carregamento de imagens
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.error('Erro ao carregar imagem:', this.src);
            // Opcionalmente, substituir por placeholder
            // this.src = 'assets/images/placeholder.jpg';
        });
    });
    
    // Tratar erros de áudio
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        backgroundMusic.addEventListener('error', () => {
            console.error('Erro ao carregar música');
            const musicPlayer = document.getElementById('musicPlayer');
            if (musicPlayer) {
                musicPlayer.style.display = 'none';
            }
        });
    }
};

// ==========================================
// INICIALIZAÇÃO
// ==========================================
const init = () => {
    // Garantir que DOM está carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    console.log('🌅 Site Pôr do Sol inicializado');
    
    // Inicializar módulos
    initMusicPlayer();
    initNavbar();
    initVideoPlayer();
    initModals();
    initScrollAnimations();
    initPolaroidTilt();
    initPhotoLightbox();
    initLazyImages();
    initErrorHandling();
    
    // Log para debug
    console.log('✅ Todas as funcionalidades carregadas');
};

// Executar inicialização
init();

// ==========================================
// EXPORT PARA TESTES (OPCIONAL)
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STATE,
        initMusicPlayer,
        initVideoPlayer,
        initModals
    };
}
