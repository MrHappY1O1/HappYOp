// Application state
let currentSection = 'portfolio';
let currentChannel = 'general';

// Chat messages data
const chatMessages = {
    general: [
        {
            author: 'Captain Alpha',
            time: '2:45 PM',
            content: 'Great scrims today everyone! We\'re really improving our rotations.'
        },
        {
            author: 'Assault Gamma',
            time: '2:46 PM',
            content: 'Yeah that last clutch was insane! Our coordination is getting better.'
        },
        {
            author: 'Support Delta',
            time: '2:48 PM',
            content: 'Practice makes perfect. Ready for the tournament next week?'
        },
        {
            author: 'ProGamer',
            time: '2:50 PM',
            content: 'Definitely! Let\'s review the VODs tomorrow and work on our weak spots.'
        }
    ],
    recruitment: [
        {
            author: 'Captain Alpha',
            time: '1:30 PM',
            content: 'Looking for skilled players to join our roster. Check the recruitment page!'
        },
        {
            author: 'SkillzPlayer',
            time: '1:45 PM',
            content: 'Hi! I\'m interested in the sniper position. Conqueror rank with 3.8 KD.'
        },
        {
            author: 'ProGamer',
            time: '1:47 PM',
            content: '@SkillzPlayer That sounds promising! Please fill out the application form.'
        }
    ],
    scrims: [
        {
            author: 'Captain Alpha',
            time: '11:00 AM',
            content: 'Scrims scheduled for today at 7 PM IST. Everyone be online!'
        },
        {
            author: 'Support Delta',
            time: '11:05 AM',
            content: 'Which maps are we practicing today?'
        },
        {
            author: 'ProGamer',
            time: '11:07 AM',
            content: 'Erangel and Sanhok. We need to work on our early game rotations.'
        }
    ],
    tournaments: [
        {
            author: 'Captain Alpha',
            time: '10:00 AM',
            content: 'BGMI Pro League registrations are open! Let\'s aim for top 3 this season.'
        },
        {
            author: 'ProGamer',
            time: '10:15 AM',
            content: 'I\'ll handle the registration. What\'s our strategy for the qualifiers?'
        }
    ]
};

// Main navigation function
function switchSection(sectionName) {
    console.log('Switching to section:', sectionName);
    
    // Hide all sections
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        console.log('Showed section:', targetSection.id);
    }
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    currentSection = sectionName;
    
    // Initialize chat if switching to chat section
    if (sectionName === 'chat') {
        setTimeout(loadChatMessages, 100);
    }
}

// Chat functionality
function switchChannel(channelName) {
    console.log('Switching to channel:', channelName);
    
    const channels = document.querySelectorAll('.channel');
    channels.forEach(channel => channel.classList.remove('active'));
    
    const activeChannel = document.querySelector(`[data-channel="${channelName}"]`);
    if (activeChannel) {
        activeChannel.classList.add('active');
    }
    
    currentChannel = channelName;
    loadChatMessages();
}

function loadChatMessages() {
    const chatMessagesEl = document.getElementById('chat-messages');
    if (!chatMessagesEl) return;
    
    const messages = chatMessages[currentChannel] || [];
    chatMessagesEl.innerHTML = '';
    
    messages.forEach(message => {
        const messageEl = document.createElement('div');
        messageEl.className = 'message';
        messageEl.innerHTML = `
            <div class="message-header">
                <span class="message-author">${message.author}</span>
                <span class="message-time">${message.time}</span>
            </div>
            <div class="message-content">${message.content}</div>
        `;
        chatMessagesEl.appendChild(messageEl);
    });
    
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    if (!chatInput) return;
    
    const messageText = chatInput.value.trim();
    if (!messageText) return;
    
    // Handle chat commands
    if (messageText.startsWith('/')) {
        handleChatCommand(messageText);
        chatInput.value = '';
        return;
    }
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    const newMessage = {
        author: 'You',
        time: timeString,
        content: messageText
    };
    
    chatMessages[currentChannel].push(newMessage);
    chatInput.value = '';
    loadChatMessages();
    
    // Simulate response
    setTimeout(() => {
        const responses = [
            'Great point! Thanks for sharing.',
            'Agreed! Our team coordination is improving.',
            'That\'s exactly what we needed to discuss.',
            'Nice suggestion! Let\'s implement that.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseTime = new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        chatMessages[currentChannel].push({
            author: 'Captain Alpha',
            time: responseTime,
            content: randomResponse
        });
        
        loadChatMessages();
    }, 1000 + Math.random() * 2000);
}

function handleChatCommand(command) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    let responseMessage = '';
    
    switch (command.toLowerCase()) {
        case '/help':
            responseMessage = `Available commands:
/help - Show this help message
/stats - Show ProGamer's current stats
/recruitment - Show available positions
/team - Show team member status`;
            break;
            
        case '/stats':
            responseMessage = `ProGamer's Current Stats:
🏆 Rank: Conqueror (Ace Dominator)
⚔️ K/D Ratio: 4.2
🎯 Win Rate: 85%
📊 Total Matches: 1,250
💥 Avg Damage: 850
🎯 Headshot Rate: 32%`;
            break;
            
        case '/recruitment':
            responseMessage = `Current Open Positions:
🎯 Sniper (1 slot) - Conqueror rank required
⚔️ Assault Player (2 slots) - Ace+ rank required  
🛡️ Support Player (1 slot) - Diamond+ rank required

Visit the Recruitment page to apply!`;
            break;
            
        case '/team':
            responseMessage = `Team Thunder Status:
🟢 Captain Alpha (IGL/Fragger) - Online
🔴 Sniper Beta (Sniper/Support) - Offline  
🟢 Assault Gamma (Assault/Entry) - Online
🟢 Support Delta (Support/Medic) - Online
🟢 ProGamer (Entry Fragger) - Online`;
            break;
            
        default:
            responseMessage = `Unknown command: ${command}. Type /help for available commands.`;
    }
    
    const systemMessage = {
        author: 'System',
        time: timeString,
        content: responseMessage
    };
    
    chatMessages[currentChannel].push(systemMessage);
    loadChatMessages();
}

// Modal functionality
function openModal(position) {
    const modal = document.getElementById('application-modal');
    const modalPosition = document.getElementById('modal-position');
    
    if (modal && modalPosition) {
        modalPosition.textContent = position;
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('application-modal');
    const form = document.getElementById('application-form');
    
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (form) {
        form.reset();
    }
}

function submitApplication(e) {
    e.preventDefault();
    
    const form = document.getElementById('application-form');
    const modalPosition = document.getElementById('modal-position');
    
    if (!form) return;
    
    const formData = new FormData(form);
    const applicationData = Object.fromEntries(formData);
    
    console.log('Application submitted:', applicationData);
    
    alert(`Thank you for your application for the ${modalPosition ? modalPosition.textContent : 'position'}! We'll review your application and get back to you within 24-48 hours.`);
    
    closeModal();
    
    // Add message to recruitment channel
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    chatMessages.recruitment.push({
        author: 'System',
        time: timeString,
        content: `New application received for ${modalPosition ? modalPosition.textContent : 'position'} from ${applicationData.playerName || 'Unknown Player'}`
    });
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing BGMI Portfolio App...');
    
    // Set up navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionName = this.getAttribute('data-section');
            console.log('Navigation clicked:', sectionName);
            switchSection(sectionName);
        });
    });
    
    // Set up chat channels
    const channels = document.querySelectorAll('.channel');
    channels.forEach(channel => {
        channel.addEventListener('click', function() {
            const channelName = this.getAttribute('data-channel');
            switchChannel(channelName);
        });
    });
    
    // Set up chat input
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Set up application buttons
    const applyBtns = document.querySelectorAll('.apply-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const position = this.getAttribute('data-position');
            console.log('Apply button clicked for:', position);
            openModal(position);
        });
    });
    
    // Set up modal close buttons
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Set up modal background click
    const modal = document.getElementById('application-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Set up form submission
    const form = document.getElementById('application-form');
    if (form) {
        form.addEventListener('submit', submitApplication);
    }
    
    // Set up escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
    
    // Initialize default section
    switchSection('portfolio');
    
    // Initialize animations
    setTimeout(() => {
        initializeAnimations();
    }, 500);
    
    console.log('App initialized successfully!');
});

// Animation functions
function initializeAnimations() {
    // Animate weapon bars
    const weaponBars = document.querySelectorAll('.weapon-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    });
    
    weaponBars.forEach(bar => observer.observe(bar));
    
    // Animate cards
    const cards = document.querySelectorAll('.stat-card, .achievement-card, .team-member, .position-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}

// Make functions globally available
window.switchSection = switchSection;
window.openModal = openModal;
window.closeModal = closeModal;