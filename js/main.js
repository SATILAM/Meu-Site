document.addEventListener('DOMContentLoaded', function() {
    const openChat = document.getElementById('openChat');
    const closeChat = document.getElementById('closeChat');
    const chatWindow = document.getElementById('chatWindow');
    const messageInput = document.getElementById('messageInput');
    const sendMessage = document.getElementById('sendMessage');
    const serviceButtons = document.querySelectorAll('.service-btn');
    const scrollToTop = document.getElementById('scrollToTop');
    const hourglass = scrollToTop.querySelector('i');
    const percentageElement = scrollToTop.querySelector('.scroll-percentage');
    let scrollTimeout;
    
    const WHATSAPP_NUMBER = "5562991986868";
    
    // Pré-carregando os sons
    const messageSound = new Audio();
    messageSound.src = 'sounds/message.mp3';
    messageSound.load();
    
    const notificationSound = new Audio();
    notificationSound.src = 'sounds/notification.mp3';
    notificationSound.load();

    // Abrir/Fechar chat
    openChat.addEventListener('click', function() {
        chatWindow.style.display = 'block';
        playSound(notificationSound);
    });

    closeChat.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        chatWindow.style.display = 'none';
        playSound(messageSound);
    });

    // Função auxiliar para tocar sons
    function playSound(sound) {
        if (sound && sound.readyState >= 2) { // Verifica se o som está carregado
            sound.currentTime = 0;
            sound.volume = 1.0;
            
            const playPromise = sound.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Som reproduzido com sucesso
                    })
                    .catch(error => {
                        console.log("Erro ao reproduzir som:", error);
                    });
            }
        }
    }

    // Função para redirecionar para WhatsApp
    function redirectToWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        messageSound.play();
    }

    // Função para mostrar mensagem de confirmação no chat
    function addConfirmationMessage(service) {
        const chatContent = document.querySelector('.chat-content');
        const message = document.createElement('p');
        message.className = 'chat-message';
        message.style.backgroundColor = '#9333ea';
        message.style.color = '#ffffff';
        message.style.padding = '0.75rem 1rem';
        message.style.borderRadius = '0.5rem';
        message.style.marginTop = '0.75rem';
        message.style.marginBottom = '0.75rem';
        message.style.maxWidth = '80%';
        message.style.alignSelf = 'flex-end';
        
        // Textos personalizados para cada serviço
        const messages = {
            'Desenvolvimento da Landing Page': 'Olá! Gostaria de informações sobre desenvolvimento de Landing Page personalizada para meu negócio.',
            'Desenvolvimento de Sites': 'Olá! Gostaria de informações sobre desenvolvimento de Sites.',
            'Desenvolvimento de Sistemas': 'Olá! Gostaria de informações sobre desenvolvimento de Sistemas.',
            'Desenvolvimento App': 'Olá! Gostaria de informações sobre desenvolvimento de App.',
            'Desenvolvimento E-Commerce': 'Olá! Gostaria de informações sobre desenvolvimento de E-Commerce.',
            'Tráfego Pago': 'Olá! Gostaria de informações sobre Tráfego Pago.',
            'Serviços Técnicos em Eletrônica': 'Olá! Gostaria de informações sobre Serviços Técnicos em Eletrônica.',
            'Suporte Técnico em Informática': 'Olá! Gostaria de informações sobre Suporte Técnico em Informática.'
        };

        message.textContent = messages[service];
        chatContent.appendChild(message);
        chatContent.scrollTop = chatContent.scrollHeight;
        
        // Toca o som select.mp3
        const selectSound = new Audio('sounds/select.mp3');
        selectSound.play().catch(error => console.log("Erro ao reproduzir som:", error));
    }

    // Botões de serviço
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const service = button.textContent;
            addConfirmationMessage(service);
            
            // Voltando o delay para 3 segundos antes de redirecionar para o WhatsApp
            setTimeout(() => {
                const message = `Olá! Gostaria de informações sobre ${service}.`;
                redirectToWhatsApp(message);
            }, 3000); // 3000ms = 5 segundos
        });
    });

    // Enviar mensagem personalizada
    function sendCustomMessage() {
        const message = messageInput.value.trim();
        if (message) {
            redirectToWhatsApp(message);
            messageInput.value = '';
        }
    }

    sendMessage.addEventListener('click', sendCustomMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendCustomMessage();
        }
    });

    // ScrollToTop Functionality
    // Função para atualizar a porcentagem e visibilidade
    function updateScroll() {
        const scrollPercentage = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        // Atualiza a porcentagem
        percentageElement.textContent = `${scrollPercentage}%`;
        
        // Mostra/esconde o botão baseado na porcentagem
        if (scrollPercentage > 13) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }

        // Adiciona a animação de rotação
        hourglass.classList.add('rotating');
        
        // Remove a animação após parar de rolar
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            hourglass.classList.remove('rotating');
        }, 150);
    }

    // Listener para o scroll
    window.addEventListener('scroll', updateScroll);

    // Scroll suave ao topo
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll suave para as âncoras
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
}); 
