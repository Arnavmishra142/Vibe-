/**
 * VIBE MUSIC APP - JavaScript
 * Features: Local User Profile, JioSaavn API Integration, Audio Player, Download
 */

// ============================================
// GLOBAL STATE
// ============================================
const state = {
    user: null,
    currentSong: null,
    isPlaying: false,
    searchResults: [],
    audioElement: null,
    currentTime: 0,
    duration: 0
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    // Profile
    profileLabel: document.getElementById('profileLabel'),
    profileName: document.getElementById('profileName'),
    profileBtn: document.getElementById('profileBtn'),
    
    // Modal
    loginModal: document.getElementById('loginModal'),
    modalClose: document.getElementById('modalClose'),
    loginForm: document.getElementById('loginForm'),
    userName: document.getElementById('userName'),
    userEmail: document.getElementById('userEmail'),
    userPassword: document.getElementById('userPassword'),
    
    // Search
    searchInput: document.getElementById('searchInput'),
    searchClear: document.getElementById('searchClear'),
    searchResultsSection: document.getElementById('searchResultsSection'),
    searchResultsGrid: document.getElementById('searchResultsGrid'),
    recentlyPlayedSection: document.getElementById('recentlyPlayedSection'),
    madeForYouSection: document.getElementById('madeForYouSection'),
    
    // Player
    audioPlayer: document.getElementById('audioPlayer'),
    playPauseBtn: document.getElementById('playPauseBtn'),
    playIcon: document.getElementById('playIcon'),
    pauseIcon: document.getElementById('pauseIcon'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    progressBar: document.getElementById('progressBar'),
    progressFill: document.getElementById('progressFill'),
    progressHandle: document.getElementById('progressHandle'),
    currentTime: document.getElementById('currentTime'),
    totalTime: document.getElementById('totalTime'),
    playerThumbnail: document.getElementById('playerThumbnail'),
    playerTitle: document.getElementById('playerTitle'),
    playerArtist: document.getElementById('playerArtist'),
    downloadBtn: document.getElementById('downloadBtn')
};

// ============================================
// LOCAL STORAGE FUNCTIONS
// ============================================
const Storage = {
    USER_KEY: 'vibe_user',
    
    getUser() {
        try {
            const userData = localStorage.getItem(this.USER_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (e) {
            console.error('Error reading user from localStorage:', e);
            return null;
        }
    },
    
    saveUser(user) {
        try {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
            return true;
        } catch (e) {
            console.error('Error saving user to localStorage:', e);
            return false;
        }
    },
    
    clearUser() {
        try {
            localStorage.removeItem(this.USER_KEY);
            return true;
        } catch (e) {
            console.error('Error clearing user from localStorage:', e);
            return false;
        }
    }
};

// ============================================
// USER PROFILE FUNCTIONS
// ============================================
function initUserProfile() {
    const savedUser = Storage.getUser();
    if (savedUser) {
        state.user = savedUser;
        updateProfileUI();
    }
}

function updateProfileUI() {
    if (state.user) {
        elements.profileLabel.textContent = 'Hi,';
        elements.profileName.textContent = state.user.name;
        elements.profileBtn.textContent = 'Logout';
    } else {
        elements.profileLabel.textContent = 'Guest User';
        elements.profileName.textContent = '';
        elements.profileBtn.textContent = 'Login / Create Profile';
    }
}

function handleProfileBtnClick() {
    if (state.user) {
        // Logout
        if (confirm('Are you sure you want to logout?')) {
            Storage.clearUser();
            state.user = null;
            updateProfileUI();
        }
    } else {
        // Open login modal
        openModal();
    }
}

function openModal() {
    elements.loginModal.classList.add('active');
    elements.userName.focus();
}

function closeModal() {
    elements.loginModal.classList.remove('active');
    elements.loginForm.reset();
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const name = elements.userName.value.trim();
    const email = elements.userEmail.value.trim();
    const password = elements.userPassword.value;
    
    if (!name || !email) {
        alert('Please enter both name and email');
        return;
    }
    
    // Simple email validation
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address');
        return;
    }
    
    const user = {
        name,
        email,
        password: password || null, // Optional
        createdAt: new Date().toISOString()
    };
    
    if (Storage.saveUser(user)) {
        state.user = user;
        updateProfileUI();
        closeModal();
        showNotification(`Welcome, ${name}!`);
    } else {
        alert('Failed to save profile. Please try again.');
    }
}

// ============================================
// JIOSAAVN API FUNCTIONS
// ============================================
const API_BASE = 'https://saavn.dev/api';

async function searchSongs(query) {
    if (!query || query.trim().length < 2) {
        return [];
    }
    
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE}/search/songs?query=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.data && data.data.results) {
            return data.data.results;
        }
        
        return [];
    } catch (error) {
        console.error('Error searching songs:', error);
        showNotification('Failed to search songs. Please try again.', 'error');
        return [];
    } finally {
        showLoading(false);
    }
}

function getHighQualityUrl(downloadUrls) {
    if (!downloadUrls || !Array.isArray(downloadUrls) || downloadUrls.length === 0) {
        return null;
    }
    
    // Sort by quality (highest first)
    const qualityOrder = ['320kbps', '160kbps', '96kbps', '48kbps', '12kbps'];
    
    for (const quality of qualityOrder) {
        const urlObj = downloadUrls.find(u => u.quality === quality);
        if (urlObj && urlObj.url) {
            return urlObj.url;
        }
    }
    
    // Fallback to first available URL
    return downloadUrls[0]?.url || null;
}

function formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// SEARCH UI FUNCTIONS
// ============================================
async function handleSearch() {
    const query = elements.searchInput.value.trim();
    
    if (query.length < 2) {
        hideSearchResults();
        return;
    }
    
    elements.searchClear.classList.add('visible');
    
    const results = await searchSongs(query);
    state.searchResults = results;
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    if (results.length === 0) {
        elements.searchResultsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1;">
                <p>No songs found. Try a different search term.</p>
            </div>
        `;
    } else {
        elements.searchResultsGrid.innerHTML = results.map(song => `
            <div class="card" data-song-id="${song.id}" onclick="playSong('${song.id}')">
                <div class="card-image">
                    <img src="${song.image?.[2]?.url || song.image?.[1]?.url || song.image?.[0]?.url || 'https://via.placeholder.com/300'}" alt="${song.name}">
                    <button class="play-overlay" onclick="event.stopPropagation(); playSong('${song.id}')">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                </div>
                <h3 class="card-title">${song.name}</h3>
                <p class="card-subtitle">${song.primaryArtists || song.artists?.map(a => a.name).join(', ') || 'Unknown Artist'}</p>
            </div>
        `).join('');
    }
    
    // Show search results, hide other sections
    elements.searchResultsSection.style.display = 'block';
    elements.recentlyPlayedSection.style.display = 'none';
    elements.madeForYouSection.style.display = 'none';
}

function hideSearchResults() {
    elements.searchResultsSection.style.display = 'none';
    elements.recentlyPlayedSection.style.display = 'block';
    elements.madeForYouSection.style.display = 'block';
    elements.searchClear.classList.remove('visible');
}

function clearSearch() {
    elements.searchInput.value = '';
    hideSearchResults();
    elements.searchInput.focus();
}

// ============================================
// AUDIO PLAYER FUNCTIONS
// ============================================
function initAudioPlayer() {
    state.audioElement = elements.audioPlayer;
    
    // Audio event listeners
    state.audioElement.addEventListener('loadedmetadata', () => {
        state.duration = state.audioElement.duration;
        elements.totalTime.textContent = formatDuration(state.duration);
    });
    
    state.audioElement.addEventListener('timeupdate', () => {
        state.currentTime = state.audioElement.currentTime;
        updateProgressUI();
    });
    
    state.audioElement.addEventListener('ended', () => {
        state.isPlaying = false;
        updatePlayPauseUI();
    });
    
    state.audioElement.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        showNotification('Error playing song. Please try again.', 'error');
        state.isPlaying = false;
        updatePlayPauseUI();
    });
}

async function playSong(songId) {
    const song = state.searchResults.find(s => s.id === songId);
    if (!song) {
        showNotification('Song not found', 'error');
        return;
    }
    
    const audioUrl = getHighQualityUrl(song.downloadUrl);
    if (!audioUrl) {
        showNotification('Audio not available for this song', 'error');
        return;
    }
    
    // Update current song
    state.currentSong = {
        id: song.id,
        name: song.name,
        artist: song.primaryArtists || song.artists?.map(a => a.name).join(', ') || 'Unknown Artist',
        image: song.image?.[2]?.url || song.image?.[1]?.url || song.image?.[0]?.url,
        url: audioUrl,
        duration: song.duration
    };
    
    // Update player UI
    updatePlayerUI();
    
    // Play audio
    state.audioElement.src = audioUrl;
    state.audioElement.load();
    
    try {
        await state.audioElement.play();
        state.isPlaying = true;
        updatePlayPauseUI();
    } catch (error) {
        console.error('Error playing audio:', error);
        showNotification('Failed to play song. Please try again.', 'error');
    }
}

function updatePlayerUI() {
    if (!state.currentSong) return;
    
    elements.playerTitle.textContent = state.currentSong.name;
    elements.playerArtist.textContent = state.currentSong.artist;
    elements.playerThumbnail.src = state.currentSong.image || 'https://via.placeholder.com/64';
}

function togglePlayPause() {
    if (!state.currentSong) {
        showNotification('Please search and select a song first');
        return;
    }
    
    if (state.isPlaying) {
        state.audioElement.pause();
        state.isPlaying = false;
    } else {
        state.audioElement.play().catch(error => {
            console.error('Error playing audio:', error);
            showNotification('Failed to play song', 'error');
        });
        state.isPlaying = true;
    }
    
    updatePlayPauseUI();
}

function updatePlayPauseUI() {
    if (state.isPlaying) {
        elements.playIcon.style.display = 'none';
        elements.pauseIcon.style.display = 'block';
    } else {
        elements.playIcon.style.display = 'block';
        elements.pauseIcon.style.display = 'none';
    }
}

function updateProgressUI() {
    if (!state.duration) return;
    
    const progress = (state.currentTime / state.duration) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.progressHandle.style.left = `${progress}%`;
    elements.currentTime.textContent = formatDuration(state.currentTime);
}

function seekTo(percent) {
    if (!state.duration) return;
    
    const time = (percent / 100) * state.duration;
    state.audioElement.currentTime = time;
}

// ============================================
// DOWNLOAD FUNCTION
// ============================================
async function downloadCurrentSong() {
    if (!state.currentSong) {
        showNotification('No song is currently playing');
        return;
    }
    
    if (!state.currentSong.url) {
        showNotification('Download URL not available', 'error');
        return;
    }
    
    try {
        showNotification('Starting download...');
        
        // Fetch the audio file
        const response = await fetch(state.currentSong.url);
        if (!response.ok) {
            throw new Error('Failed to fetch audio file');
        }
        
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${state.currentSong.name} - ${state.currentSong.artist}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showNotification('Download completed!');
    } catch (error) {
        console.error('Download error:', error);
        showNotification('Download failed. Please try again.', 'error');
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'error' ? '#ff4444' : 'var(--accent)'};
        color: ${type === 'error' ? '#fff' : 'var(--bg-secondary)'};
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showLoading(show) {
    if (show) {
        document.body.classList.add('loading');
    } else {
        document.body.classList.remove('loading');
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// EVENT LISTENERS
// ============================================
function initEventListeners() {
    // Profile
    elements.profileBtn.addEventListener('click', handleProfileBtnClick);
    elements.modalClose.addEventListener('click', closeModal);
    elements.loginForm.addEventListener('submit', handleLoginSubmit);
    
    // Close modal on overlay click
    elements.loginModal.addEventListener('click', (e) => {
        if (e.target === elements.loginModal) {
            closeModal();
        }
    });
    
    // Search
    elements.searchInput.addEventListener('input', debounce(handleSearch, 500));
    elements.searchClear.addEventListener('click', clearSearch);
    
    // Player controls
    elements.playPauseBtn.addEventListener('click', togglePlayPause);
    elements.downloadBtn.addEventListener('click', downloadCurrentSong);
    
    // Progress bar
    elements.progressBar.addEventListener('click', (e) => {
        const rect = elements.progressBar.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        seekTo(percent);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Space bar - play/pause
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            togglePlayPause();
        }
        
        // Escape - close modal
        if (e.code === 'Escape' && elements.loginModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    initUserProfile();
    initAudioPlayer();
    initEventListeners();
    
    console.log('🎵 Vibe Music App initialized');
    console.log('📍 JioSaavn API connected');
    console.log('👤 User profile system ready');
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Expose functions globally for HTML onclick handlers
window.playSong = playSong;
  
