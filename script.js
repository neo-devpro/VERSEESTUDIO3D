// Script para a landing page de modelagem e impressão 3D

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validação do formulário de contato
    const formContato = document.getElementById('form-contato');
    
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            let isValid = true;
            const requiredFields = formContato.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validação de email
            const emailField = document.getElementById('email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            // Se o formulário for válido, enviar os dados
            if (isValid) {
                // Aqui você pode adicionar o código para enviar os dados do formulário
                // via AJAX ou outra técnica
                
                // Simulação de envio bem-sucedido
                const formData = new FormData(formContato);
                const formObject = {};
                
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Log dos dados do formulário (apenas para demonstração)
                console.log('Dados do formulário:', formObject);
                
                // Feedback visual para o usuário
                formContato.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Obrigado pelo contato!</h3>
                        <p>Recebemos sua solicitação de orçamento e entraremos em contato em até 24 horas úteis.</p>
                    </div>
                `;
                
                // Rolar para mostrar a mensagem de sucesso
                window.scrollTo({
                    top: formContato.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Adicionar classe de erro quando o campo perde o foco e está vazio
    const requiredInputs = document.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value.trim() && this.hasAttribute('required')) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
        
        // Remover classe de erro quando o usuário começa a digitar
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
    
    // Animação para elementos quando entram na viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.cliente-card, .servico-card, .beneficio-card, .industria-card, .portfolio-item, .depoimento');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Executar animação no carregamento e no scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Adicionar máscara para o campo de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                // Formato: (XX) XXXXX-XXXX
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                } else if (value.length <= 11) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
                } else {
                    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Adicionar funcionalidade para o slider de depoimentos
    let currentSlide = 0;
    const depoimentos = document.querySelectorAll('.depoimento');
    
    // Função para mostrar apenas o slide atual
    const showSlide = (index) => {
        depoimentos.forEach((depoimento, i) => {
            if (i === index) {
                depoimento.style.display = 'block';
            } else {
                depoimento.style.display = 'none';
            }
        });
    };
    
    // Inicializar o slider apenas se houver mais de um depoimento
    if (depoimentos.length > 1) {
        // Criar botões de navegação
        const sliderContainer = document.querySelector('.depoimentos-slider');
        
        if (sliderContainer) {
            const navButtons = document.createElement('div');
            navButtons.className = 'slider-nav';
            
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.className = 'slider-prev';
            prevButton.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + depoimentos.length) % depoimentos.length;
                showSlide(currentSlide);
            });
            
            const nextButton = document.createElement('button');
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.className = 'slider-next';
            nextButton.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % depoimentos.length;
                showSlide(currentSlide);
            });
            
            navButtons.appendChild(prevButton);
            navButtons.appendChild(nextButton);
            sliderContainer.appendChild(navButtons);
            
            // Mostrar o primeiro slide
            showSlide(currentSlide);
            
            // Alternar slides automaticamente a cada 5 segundos
            setInterval(() => {
                currentSlide = (currentSlide + 1) % depoimentos.length;
                showSlide(currentSlide);
            }, 5000);
        }
    }
    
    // Adicionar funcionalidade para o menu mobile
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        
        if (header) {
            const mobileMenuButton = document.createElement('button');
            mobileMenuButton.className = 'mobile-menu-button';
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            
            const nav = document.querySelector('nav');
            
            mobileMenuButton.addEventListener('click', () => {
                nav.classList.toggle('active');
                
                if (nav.classList.contains('active')) {
                    mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
            
            header.querySelector('.container').insertBefore(mobileMenuButton, nav);
        }
    };
    
    // Criar menu mobile apenas em telas menores
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    // Recriar menu mobile quando a janela for redimensionada
    window.addEventListener('resize', () => {
        const existingButton = document.querySelector('.mobile-menu-button');
        
        if (window.innerWidth < 768 && !existingButton) {
            createMobileMenu();
        } else if (window.innerWidth >= 768 && existingButton) {
            existingButton.remove();
            document.querySelector('nav').classList.remove('active');
        }
    });
});
