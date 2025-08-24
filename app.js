// Application state
let currentSection = 'portfolio';
let currentChannel = 'general';
let isAdminMode = false;

// Applications data storage (simulating database)
let applications = [
    {
        id: "APP001",
        name: "SkillzSniper",
        email: "skillz@email.com",
        rank: "Conqueror",
        tier: "Ace Dominator",
        kd: "3.8",
        experience: "2 years competitive",
        position: "Sniper",
        previousTeams: "Team Alpha, Squad Warriors",
        availability: "Evenings 7-11 PM IST",
        notes: "Specialized in long-range combat, good game sense",
        status: "Pending",
        submittedDate: "2025-08-23",
        discord: "SkillzSniper#1234"
    },
    {
        id: "APP002",
        name: "RushMaster",
        email: "rush@email.com",
        rank: "Ace",
        tier: "Crown V",
        kd: "4.1",
        experience: "18 months",
        position: "Assault Player",
        previousTeams: "Solo player, looking for first team",
        availability: "Daily 6-10 PM IST",
        notes: "Aggressive playstyle, excellent entry fragger",
        status: "Under Review",
        submittedDate: "2025-08-22",
        discord: "RushMaster#5678"
    },
    {
        id: "APP003",
        name: "SupportKing",
        email: "support@email.com",
        rank: "Diamond I",
        tier: "Diamond III",
        kd: "2.9",
        experience: "3 years",
        position: "Support Player",
        previousTeams: "Team Phoenix, Elite Squad",
        availability: "Weekends, weekday evenings",
        notes: "Great team player, excellent communication skills",
        status: "Accepted",
        submittedDate: "2025-08-21",
        discord: "SupportKing#9012"
    }
];

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

// Main navigation function - Fixed implementation
function switchSection(sectionName) {
    console.log('Switching to section:', sectionName);
    
    // Remove active class from all sections and hide them
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Activated section:', targetSection.id);
    } else {
        console.error('Section not found:', `${sectionName}-section`);
    }
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    currentSection = sectionName;
    
    // Initialize section-specific functionality
    if (sectionName === 'chat') {
        setTimeout(() => {
            loadChatMessages();
        }, 100);
    } else if (sectionName === 'applications') {
        setTimeout(() => {
            loadApplications();
            updateDashboardStats();
        }, 100);
    }
}

// Admin mode toggle
function toggleAdminMode() {
    const adminCheckbox = document.getElementById('admin-mode');
    isAdminMode = adminCheckbox.checked;
    
    if (isAdminMode) {
        document.body.classList.add('admin-mode');
        console.log('Admin mode enabled');
    } else {
        document.body.classList.remove('admin-mode');
        console.log('Admin mode disabled');
    }
    
    // Refresh applications if on that section
    if (currentSection === 'applications') {
        loadApplications();
    }
}

// Applications Dashboard Functions
function updateDashboardStats() {
    const totalApps = applications.length;
    const pendingApps = applications.filter(app => app.status === 'Pending').length;
    const acceptedApps = applications.filter(app => app.status === 'Accepted').length;
    
    const totalEl = document.getElementById('total-applications');
    const pendingEl = document.getElementById('pending-applications');
    const acceptedEl = document.getElementById('accepted-applications');
    
    if (totalEl) totalEl.textContent = totalApps;
    if (pendingEl) pendingEl.textContent = pendingApps;
    if (acceptedEl) acceptedEl.textContent = acceptedApps;
}

function loadApplications() {
    const applicationsList = document.getElementById('applications-list');
    if (!applicationsList) return;
    
    // Get filter values
    const searchTerm = document.getElementById('search-applications')?.value.toLowerCase() || '';
    const positionFilter = document.getElementById('filter-position')?.value || '';
    const statusFilter = document.getElementById('filter-status')?.value || '';
    
    // Filter applications
    let filteredApps = applications.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchTerm) || 
                            app.email.toLowerCase().includes(searchTerm) ||
                            app.position.toLowerCase().includes(searchTerm);
        const matchesPosition = !positionFilter || app.position === positionFilter;
        const matchesStatus = !statusFilter || app.status === statusFilter;
        
        return matchesSearch && matchesPosition && matchesStatus;
    });
    
    // Sort by submission date (newest first)
    filteredApps.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate));
    
    applicationsList.innerHTML = '';
    
    if (filteredApps.length === 0) {
        applicationsList.innerHTML = `
            <div class="card" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                <h3>No applications found</h3>
                <p>No applications match your current filters.</p>
            </div>
        `;
        return;
    }
    
    filteredApps.forEach(app => {
        const applicationCard = createApplicationCard(app);
        applicationsList.appendChild(applicationCard);
    });
}

function createApplicationCard(app) {
    const card = document.createElement('div');
    card.className = 'application-card';
    card.onclick = () => viewApplicationDetails(app.id);
    
    const statusClass = app.status.toLowerCase().replace(' ', '-');
    const formattedDate = new Date(app.submittedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="application-header">
            <div class="application-info">
                <div class="applicant-name">${app.name}</div>
                <div class="application-id">ID: ${app.id}</div>
                <div class="application-position">${app.position}</div>
                <div class="application-meta">
                    <span class="application-status ${statusClass}">${app.status}</span>
                    <span class="application-date">Applied: ${formattedDate}</span>
                </div>
            </div>
        </div>
        
        <div class="application-details">
            <div class="detail-item">
                <div class="detail-label">Rank</div>
                <div class="detail-value">${app.rank}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">K/D Ratio</div>
                <div class="detail-value">${app.kd}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Experience</div>
                <div class="detail-value">${app.experience}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Availability</div>
                <div class="detail-value">${app.availability}</div>
            </div>
        </div>
        
        <div class="application-actions admin-only">
            <button class="action-btn view" onclick="event.stopPropagation(); viewApplicationDetails('${app.id}')">👁️ View</button>
            ${app.status !== 'Accepted' ? `<button class="action-btn accept" onclick="event.stopPropagation(); updateApplicationStatus('${app.id}', 'Accepted')">✅ Accept</button>` : ''}
            ${app.status !== 'Rejected' ? `<button class="action-btn reject" onclick="event.stopPropagation(); updateApplicationStatus('${app.id}', 'Rejected')">❌ Reject</button>` : ''}
            ${app.status !== 'Under Review' ? `<button class="action-btn review" onclick="event.stopPropagation(); updateApplicationStatus('${app.id}', 'Under Review')">📋 Review</button>` : ''}
        </div>
    `;
    
    return card;
}

function updateApplicationStatus(appId, newStatus) {
    const appIndex = applications.findIndex(app => app.id === appId);
    if (appIndex !== -1) {
        applications[appIndex].status = newStatus;
        loadApplications();
        updateDashboardStats();
        
        // Add message to recruitment channel
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        const app = applications[appIndex];
        chatMessages.recruitment.push({
            author: 'System',
            time: timeString,
            content: `Application ${appId} (${app.name}) status updated to: ${newStatus}`
        });
        
        console.log(`Application ${appId} status updated to: ${newStatus}`);
    }
}

function viewApplicationDetails(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    
    const modal = document.getElementById('application-detail-modal');
    const modalBody = document.getElementById('application-detail-body');
    
    if (!modal || !modalBody) return;
    
    const formattedDate = new Date(app.submittedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const statusClass = app.status.toLowerCase().replace(' ', '-');
    
    modalBody.innerHTML = `
        <div class="application-detail-header" style="margin-bottom: 2rem;">
            <h3 style="color: var(--color-gaming-primary); margin-bottom: 0.5rem;">${app.name}</h3>
            <p style="color: var(--color-text-secondary); margin-bottom: 1rem;">Application ID: ${app.id}</p>
            <span class="application-status ${statusClass}" style="margin-bottom: 1rem; display: inline-block;">${app.status}</span>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div class="card__body">
                <h4 style="color: var(--color-gaming-primary); margin-bottom: 1rem;">Contact Information</h4>
                <p><strong>Email:</strong> ${app.email}</p>
                <p><strong>Discord:</strong> ${app.discord || 'Not provided'}</p>
                <p><strong>Applied:</strong> ${formattedDate}</p>
            </div>
            
            <div class="card__body">
                <h4 style="color: var(--color-gaming-primary); margin-bottom: 1rem;">Game Statistics</h4>
                <p><strong>Position:</strong> ${app.position}</p>
                <p><strong>Current Rank:</strong> ${app.rank}</p>
                <p><strong>Tier:</strong> ${app.tier || 'Not specified'}</p>
                <p><strong>K/D Ratio:</strong> ${app.kd}</p>
            </div>
        </div>
        
        <div class="card__body" style="margin-bottom: 2rem;">
            <h4 style="color: var(--color-gaming-primary); margin-bottom: 1rem;">Experience & Background</h4>
            <p><strong>Gaming Experience:</strong> ${app.experience}</p>
            <p><strong>Previous Teams:</strong> ${app.previousTeams || 'Not specified'}</p>
            <p><strong>Availability:</strong> ${app.availability}</p>
        </div>
        
        <div class="card__body">
            <h4 style="color: var(--color-gaming-primary); margin-bottom: 1rem;">Application Notes</h4>
            <p style="line-height: 1.6; background: var(--color-gaming-darker); padding: 1rem; border-radius: var(--radius-base); border: 1px solid var(--color-gaming-border);">${app.notes}</p>
        </div>
        
        <div class="application-actions admin-only" style="margin-top: 2rem; justify-content: center;">
            ${app.status !== 'Accepted' ? `<button class="action-btn accept" onclick="updateApplicationStatus('${app.id}', 'Accepted'); closeApplicationDetailModal();">✅ Accept Application</button>` : ''}
            ${app.status !== 'Rejected' ? `<button class="action-btn reject" onclick="updateApplicationStatus('${app.id}', 'Rejected'); closeApplicationDetailModal();">❌ Reject Application</button>` : ''}
            ${app.status !== 'Under Review' ? `<button class="action-btn review" onclick="updateApplicationStatus('${app.id}', 'Under Review'); closeApplicationDetailModal();">📋 Mark for Review</button>` : ''}
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeApplicationDetailModal() {
    const modal = document.getElementById('application-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function exportApplications() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        "ID,Name,Email,Position,Rank,KD,Experience,Status,Date\n" +
        applications.map(app => 
            `"${app.id}","${app.name}","${app.email}","${app.position}","${app.rank}","${app.kd}","${app.experience}","${app.status}","${app.submittedDate}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `team_thunder_applications_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Applications exported successfully!');
}

function generateApplicationId() {
    const nextId = applications.length + 1;
    return `APP${String(nextId).padStart(3, '0')}`;
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
/team - Show team member status
/applications - Show application statistics`;
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
            
        case '/applications':
            const totalApps = applications.length;
            const pendingApps = applications.filter(app => app.status === 'Pending').length;
            const acceptedApps = applications.filter(app => app.status === 'Accepted').length;
            const underReviewApps = applications.filter(app => app.status === 'Under Review').length;
            
            responseMessage = `Application Statistics:
📊 Total Applications: ${totalApps}
⏳ Pending Review: ${pendingApps}
📋 Under Review: ${underReviewApps}
✅ Accepted: ${acceptedApps}

Visit the Applications Dashboard for detailed management.`;
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
    
    // Generate new application ID
    const newAppId = generateApplicationId();
    
    // Create new application object
    const newApplication = {
        id: newAppId,
        name: applicationData.playerName,
        email: applicationData.email,
        rank: applicationData.rank,
        tier: applicationData.tier || '',
        kd: applicationData.kd,
        experience: applicationData.experience,
        position: modalPosition ? modalPosition.textContent : 'Unknown',
        previousTeams: applicationData.previousTeams || 'Not specified',
        availability: applicationData.availability,
        notes: applicationData.notes,
        status: 'Pending',
        submittedDate: new Date().toISOString().split('T')[0],
        discord: applicationData.discord || ''
    };
    
    // Add to applications array
    applications.push(newApplication);
    
    console.log('Application submitted:', newApplication);
    
    alert(`Thank you for your application! Your application ID is ${newAppId}. We'll review your application and get back to you within 24-48 hours.`);
    
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
        content: `New application received! ID: ${newAppId} - ${newApplication.name} applied for ${newApplication.position}`
    });
    
    // Update dashboard stats if on applications section
    if (currentSection === 'applications') {
        updateDashboardStats();
        loadApplications();
    }
}

// Search and filter functions
function setupApplicationFilters() {
    const searchInput = document.getElementById('search-applications');
    const positionFilter = document.getElementById('filter-position');
    const statusFilter = document.getElementById('filter-status');
    
    if (searchInput) {
        searchInput.addEventListener('input', loadApplications);
    }
    
    if (positionFilter) {
        positionFilter.addEventListener('change', loadApplications);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', loadApplications);
    }
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Enhanced BGMI Portfolio App...');
    
    // Set up navigation - Fixed event handling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionName = this.getAttribute('data-section');
            console.log('Navigation clicked:', sectionName);
            switchSection(sectionName);
        });
    });
    
    // Set up admin mode toggle
    const adminCheckbox = document.getElementById('admin-mode');
    if (adminCheckbox) {
        adminCheckbox.addEventListener('change', toggleAdminMode);
    }
    
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
        btn.addEventListener('click', function() {
            if (this.closest('#application-detail-modal')) {
                closeApplicationDetailModal();
            } else {
                closeModal();
            }
        });
    });
    
    // Set up modal background click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                if (modal.id === 'application-detail-modal') {
                    closeApplicationDetailModal();
                } else {
                    closeModal();
                }
            }
        });
    });
    
    // Set up form submission
    const form = document.getElementById('application-form');
    if (form) {
        form.addEventListener('submit', submitApplication);
    }
    
    // Set up applications dashboard controls
    setupApplicationFilters();
    
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportApplications);
    }
    
    const bulkReviewBtn = document.getElementById('bulk-review-btn');
    if (bulkReviewBtn) {
        bulkReviewBtn.addEventListener('click', function() {
            const pendingApps = applications.filter(app => app.status === 'Pending');
            if (pendingApps.length === 0) {
                alert('No pending applications to review.');
                return;
            }
            
            const confirmMsg = `Mark all ${pendingApps.length} pending applications for review?`;
            if (confirm(confirmMsg)) {
                pendingApps.forEach(app => {
                    app.status = 'Under Review';
                });
                loadApplications();
                updateDashboardStats();
                alert(`${pendingApps.length} applications marked for review.`);
            }
        });
    }
    
    // Set up escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const applicationModal = document.getElementById('application-modal');
            const detailModal = document.getElementById('application-detail-modal');
            
            if (applicationModal && !applicationModal.classList.contains('hidden')) {
                closeModal();
            } else if (detailModal && !detailModal.classList.contains('hidden')) {
                closeApplicationDetailModal();
            }
        }
    });
    
    // Initialize default section
    switchSection('portfolio');
    
    // Initialize animations after a delay
    setTimeout(() => {
        initializeAnimations();
    }, 500);
    
    console.log('Enhanced App initialized successfully!');
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
window.updateApplicationStatus = updateApplicationStatus;
window.viewApplicationDetails = viewApplicationDetails;
window.closeApplicationDetailModal = closeApplicationDetailModal;