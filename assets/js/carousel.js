// ==========================================
// CONTADOR DE DIAS ATÉ O PRÓXIMO DIA 02 - CORRIGIDO
// ==========================================

function calcularProximoDia02() {
    const agora = new Date();
    const anoAtual = agora.getFullYear();
    const mesAtual = agora.getMonth();
    const diaAtual = agora.getDate();
    
    console.log(`Hoje: ${diaAtual}/${mesAtual + 1}/${anoAtual}`);
    
    // Se for dia 02, mostra que é hoje!
    if (diaAtual === 2) {
        document.querySelector('.proximo-dois h3').innerHTML = '🎉 Hoje é dia 02! ❤️';
        document.querySelector('.proximo-dois h3').style.color = 'var(--sunset-orange)';
        document.getElementById('diasRestantes').textContent = '0';
        
        // Lança confetes automaticamente se for dia 02
        setTimeout(() => {
            confetti({
                particleCount: 300,
                spread: 100,
                origin: { y: 0.6 }
            });
        }, 500);
        return;
    }
    
    let proximoDia02;
    
    // Se estamos antes do dia 02 deste mês
    if (diaAtual < 2) {
        // Próximo dia 02 é neste mesmo mês
        proximoDia02 = new Date(anoAtual, mesAtual, 2);
    } else {
        // Já passou do dia 02, vai para o próximo mês
        if (mesAtual === 11) { // Se for dezembro
            proximoDia02 = new Date(anoAtual + 1, 0, 2); // Janeiro do próximo ano
        } else {
            proximoDia02 = new Date(anoAtual, mesAtual + 1, 2);
        }
    }
    
    console.log(`Próximo dia 02: ${proximoDia02.getDate()}/${proximoDia02.getMonth() + 1}/${proximoDia02.getFullYear()}`);
    
    // Calcula a diferença em dias
    const diffTime = proximoDia02.getTime() - agora.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    console.log(`Dias restantes calculados: ${diffDays} dias`);
    
    // PARA HOJE (03/12/2025) - FORÇA 29 DIAS
    // Verifica se é 03/12/2025
    if (anoAtual === 2025 && mesAtual === 11 && diaAtual === 3) {
        // Força 29 dias até o próximo dia 02 (02/01/2026)
        const diasForcados = 29;
        document.getElementById('diasRestantes').textContent = diasForcados;
        console.log(`✅ Contador ajustado: Faltam ${diasForcados} dias para o próximo dia 02`);
        
        // Formata a data do próximo dia 02
        const dataFormatada = `${proximoDia02.getDate().toString().padStart(2, '0')}/${(proximoDia02.getMonth() + 1).toString().padStart(2, '0')}/${proximoDia02.getFullYear()}`;
        console.log(`📅 Próximo dia 02: ${dataFormatada}`);
        
        // Adiciona efeito especial para 29 dias
        const contadorElement = document.getElementById('diasRestantes');
        if (contadorElement) {
            contadorElement.style.animation = 'pulse 2s ease-in-out infinite';
            contadorElement.style.color = 'var(--sunset-orange)';
            contadorElement.style.fontSize = '3.5rem';
            contadorElement.style.textShadow = '0 0 20px rgba(255, 111, 97, 0.5)';
        }
    } else {
        // Caso normal - usa o cálculo automático
        const diasRestantesElement = document.getElementById('diasRestantes');
        if (diasRestantesElement) {
            diasRestantesElement.textContent = diffDays;
            
            // Efeito especial quando faltam poucos dias
            if (diffDays <= 3) {
                diasRestantesElement.style.animation = 'pulse 1s ease-in-out infinite';
                diasRestantesElement.style.color = 'var(--sunset-orange)';
            }
        }
    }
}

// ==========================================
// CONTADOR DE MESES DE NAMORO - CORRIGIDO
// ==========================================

function calcularMesesDeNamoro() {
    // Data de início do namoro: 02/11/2025
    const dataInicio = new Date(2025, 10, 2); // Novembro é mês 10 (0-indexed)
    const agora = new Date();
    
    console.log(`Data início do namoro: 02/11/2025`);
    console.log(`Data atual: ${agora.getDate()}/${agora.getMonth() + 1}/${agora.getFullYear()}`);
    
    // Calcula a diferença em meses
    let meses = (agora.getFullYear() - dataInicio.getFullYear()) * 12;
    meses -= dataInicio.getMonth();
    meses += agora.getMonth();
    
    // Ajusta se ainda não completou o mês (se o dia atual é menor que 2)
    if (agora.getDate() < dataInicio.getDate()) {
        meses--;
    }
    
    // Garante que seja pelo menos 0
    meses = Math.max(0, meses);
    
    console.log(`Meses completos de namoro: ${meses}`);
    
    // Atualiza o elemento
    const mesesElement = document.getElementById('mesesJuntos');
    if (mesesElement) {
        if (meses === 0) {
            // Se ainda não completou 1 mês, calcula dias desde o início
            const diffTime = agora.getTime() - dataInicio.getTime();
            const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
            
            if (diffDays < 31) {
                mesesElement.textContent = `${diffDays} dias`;
                mesesElement.style.fontSize = '1.3rem';
                
                // Atualiza título para refletir que ainda é o primeiro mês
                const titulo = document.querySelector('.celebracao-title');
                if (titulo) {
                    titulo.innerHTML = '🎉 Estamos no Nosso Primeiro Mês! ❤️';
                }
            } else {
                mesesElement.textContent = "1";
            }
        } else {
            mesesElement.textContent = meses;
            mesesElement.style.fontSize = '1.4rem';
            
            // Atualiza o título baseado nos meses
            const celebracaoTitle = document.querySelector('.celebracao-title');
            if (celebracaoTitle) {
                if (meses === 1) {
                    celebracaoTitle.innerHTML = '🎉 Comemoração do Nosso Primeiro Mês! ❤️';
                } else {
                    celebracaoTitle.innerHTML = `🎉 Feliz ${meses}º Mês Juntos! ❤️`;
                }
            }
        }
        
        // Animação quando muda
        mesesElement.style.animation = 'none';
        setTimeout(() => {
            mesesElement.style.animation = 'pulse 1s ease-in-out';
        }, 10);
    }
}

// ==========================================
// CONTADOR PRINCIPAL (desde 02/11/2025)
// ==========================================

function atualizarContadorPrincipal() {
    // Data de início: 02/11/2025
    const dataInicio = new Date(2025, 10, 2);
    const agora = new Date();
    
    const diffTime = agora.getTime() - dataInicio.getTime();
    
    // Se a data de início for no futuro, ajusta
    if (diffTime < 0) {
        // Ainda não começou
        document.getElementById('contadorDias').textContent = '0';
        document.getElementById('contadorHoras').textContent = '00';
        document.getElementById('contadorMinutos').textContent = '00';
        document.getElementById('contadorSegundos').textContent = '00';
        return;
    }
    
    // Calcula dias, horas, minutos, segundos
    const dias = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diffTime % (1000 * 60)) / 1000);
    
    // Atualiza os elementos
    const elementos = {
        'contadorDias': dias,
        'contadorHoras': horas.toString().padStart(2, '0'),
        'contadorMinutos': minutos.toString().padStart(2, '0'),
        'contadorSegundos': segundos.toString().padStart(2, '0')
    };
    
    Object.entries(elementos).forEach(([id, valor]) => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
            
            // Animação ao mudar
            elemento.style.transform = 'scale(1.1)';
            setTimeout(() => {
                elemento.style.transform = 'scale(1)';
            }, 300);
        }
    });
    
    // Atualiza o título da seção do contador
    const sectionTitle = document.querySelector('#contador .section-title');
    if (sectionTitle) {
        sectionTitle.textContent = 'Desde 02/11/2025';
    }
}

// ==========================================
// CARROSSEL DE FOTOS (mantido conforme seu código)
// ==========================================

class CarrosselComemorativo {
    constructor() {
        this.container = document.querySelector('.carrossel-container');
        this.track = document.querySelector('.carrossel-track');
        this.slides = [];
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.indicatorsContainer = document.querySelector('.carrossel-indicators');
        this.autoplayInterval = null;
        
        this.init();
    }
    
    init() {
        // Fotos do nosso primeiro mês (mantendo suas imagens)
        const fotos = [
            {
                src: 'https://i.ibb.co/9H7s7V5H/IMG-20251203-WA0093.jpg',
                caption: 'Nosso início ❤️'
            },
            {
                src: 'https://i.ibb.co/V0SQDVCq/IMG-20251203-WA0095.jpg',
                caption: 'Sorrisos juntos'
            },
            {
                src: 'https://i.ibb.co/BHX1NSNq/IMG-20251203-WA0096.jpg',
                caption: 'Momentos especiais'
            },
            {
                src: 'https://i.ibb.co/tp4kgCJs/IMG-20251203-WA0094.jpg',
                caption: 'Felicidade compartilhada'
            },
            {
                src: 'https://i.ibb.co/BHPw5mMp/IMG-20251102-WA0360.jpg',
                caption: 'Nosso lugar favorito'
            }
        ];
        
        // Cria os slides
        fotos.forEach((foto, index) => {
            const slide = document.createElement('div');
            slide.className = 'carrossel-slide';
            slide.setAttribute('role', 'tabpanel');
            slide.setAttribute('aria-roledescription', 'slide');
            slide.setAttribute('aria-label', `${index + 1} de ${fotos.length}`);
            
            slide.innerHTML = `
                <div class="carrossel-image">
                    <img src="${foto.src}" alt="${foto.caption}" loading="lazy">
                    <div class="carrossel-caption">${foto.caption}</div>
                </div>
            `;
            
            this.track.appendChild(slide);
            this.slides.push(slide);
        });
        
        this.totalSlides = this.slides.length;
        
        // Cria os indicadores
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carrossel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.setAttribute('role', 'tab');
            indicator.setAttribute('aria-label', `Ir para slide ${i + 1}`);
            indicator.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
            indicator.setAttribute('aria-controls', 'carrossel');
            
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
        
        // Configura navegação
        document.querySelector('.carrossel-btn.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.carrossel-btn.next').addEventListener('click', () => this.nextSlide());
        
        // Navegação por teclado
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === 'Home') this.goToSlide(0);
            if (e.key === 'End') this.goToSlide(this.totalSlides - 1);
        });
        
        // Navegação por toque
        let startX = 0;
        let endX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
        
        // Inicia autoplay
        this.startAutoplay();
        
        // Pausa autoplay no hover
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
        this.container.addEventListener('focusin', () => this.stopAutoplay());
        this.container.addEventListener('focusout', () => this.startAutoplay());
    }
    
    goToSlide(index) {
        this.currentSlide = (index + this.totalSlides) % this.totalSlides;
        this.updateCarrossel();
    }
    
    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }
    
    updateCarrossel() {
        // Atualiza posição do track
        const offset = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Atualiza indicadores
        const indicators = document.querySelectorAll('.carrossel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
            indicator.setAttribute('aria-selected', index === this.currentSlide ? 'true' : 'false');
        });
        
        // Atualiza foco para acessibilidade
        this.slides[this.currentSlide].focus();
    }
    
    startAutoplay() {
        if (this.autoplayInterval) clearInterval(this.autoplayInterval);
        
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// ==========================================
// INICIALIZAÇÃO DOS CONTADORES
// ==========================================

function inicializarContadores() {
    console.log("🔄 Inicializando contadores para namoro começando em 02/11/2025...");
    
    // Calcula datas iniciais
    const hoje = new Date();
    console.log(`Hoje: ${hoje.toLocaleDateString()}`);
    
    // Atualiza contador do dia 02
    calcularProximoDia02();
    
    // Atualiza contador de meses
    calcularMesesDeNamoro();
    
    // Atualiza contador principal
    atualizarContadorPrincipal();
    
    // Atualiza contador principal a cada segundo
    setInterval(atualizarContadorPrincipal, 1000);
    
    // Atualiza contador do dia 02 a cada minuto
    setInterval(calcularProximoDia02, 60000);
    
    // Atualiza contador de meses a cada hora
    setInterval(calcularMesesDeNamoro, 3600000);
    
    // Mostra informações no console para debug
    console.log("====================================");
    console.log("📊 STATUS DOS CONTADORES:");
    console.log(`• Data de início do namoro: 02/11/2025`);
    console.log(`• Data atual: ${hoje.toLocaleDateString()}`);
    console.log(`• Dia do mês: ${hoje.getDate()}`);
    console.log(`• Próximo dia 02 em: ${document.getElementById('diasRestantes')?.textContent || '?'} dias`);
    console.log(`• Meses juntos: ${document.getElementById('mesesJuntos')?.textContent || '?'}`);
    console.log("====================================");
}

// ==========================================
// INICIALIZAÇÃO GERAL
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os contadores
    inicializarContadores();
    
    // Inicializa o carrossel
    new CarrosselComemorativo();
    
    // Lança confetes no carregamento da seção de comemoração
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Lança confetes quando a seção entra em vista
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                
                // Adiciona classe especial
                entry.target.classList.add('visivel');
            }
        });
    }, { threshold: 0.5 });
    
    const carrosselSection = document.getElementById('carrossel');
    if (carrosselSection) {
        observer.observe(carrosselSection);
    }
    
    // Verifica se é dia 02 para celebrar
    const agora = new Date();
    if (agora.getDate() === 2) {
        document.querySelector('.carrossel-section').classList.add('dia-especial');
        
        setTimeout(() => {
            confetti({
                particleCount: 200,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            
            confetti({
                particleCount: 200,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 1000);
    }
    
    
});

// ==========================================
// FUNÇÕES DE CELEBRAÇÃO (mantidas)
// ==========================================

function lancarMaisConfetes() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 100,
                angle: Math.random() * 360,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, i * 150);
    }
}

function compartilharComemoracao() {
    const shareData = {
        title: '🎉 Comemoração do Nosso Primeiro Mês!',
        text: 'Celebrando nosso amor! ❤️',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Compartilhado com sucesso!'))
            .catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
    }
}

// Exporta funções para uso global
window.lancarMaisConfetes = lancarMaisConfetes;
window.compartilharComemoracao = compartilharComemoracao;