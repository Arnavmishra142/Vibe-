/**
 * VIBE MUSIC APP - Mobile Friendly with JioSaavn API
 * Features: PWA Install, Working JioSaavn API, Mobile Optimized
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
    duration: 0,
    volume: 0.7,
    isMuted: false,
    queue: [],
    queueIndex: -1,
    likedSongs: [],
    playlists: [],
    history: [],
    currentPage: 'home',
    shuffle: false,
    repeat: 'off',
    settings: {
        crossfade: false,
        autoplay: true,
        quality: 'auto',
        explicit: true,
        privateSession: false,
        shareActivity: true,
        newReleases: true,
        playlistUpdates: true
    },
    deferredPrompt: null,
    isInstalled: false
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {};

function initElements() {
    // Profile
    elements.profileLabel = document.getElementById('profileLabel');
    elements.profileName = document.getElementById('profileName');
    elements.profileBtn = document.getElementById('profileBtn');
    elements.profileAvatar = document.getElementById('profileAvatar');
    
    // Navigation
    elements.navItems = document.querySelectorAll('.nav-item, .bottom-nav-item');
    elements.pages = document.querySelectorAll('.page');
    elements.backBtn = document.getElementById('backBtn');
    elements.forwardBtn = document.getElementById('forwardBtn');
    
    // Install
    elements.installAppBtn = document.getElementById('installAppBtn');
    elements.installBanner = document.getElementById('installBanner');
    elements.installBtnBanner = document.getElementById('installBtnBanner');
    elements.dismissInstall = document.getElementById('dismissInstall');
    
    // Modals
    elements.loginModal = document.getElementById('loginModal');
    elements.loginModalClose = document.getElementById('loginModalClose');
    elements.loginForm = document.getElementById('loginForm');
    elements.userName = document.getElementById('userName');
    elements.userEmail = document.getElementById('userEmail');
    
    elements.createPlaylistModal = document.getElementById('createPlaylistModal');
    elements.createPlaylistClose = document.getElementById('createPlaylistClose');
    elements.createPlaylistForm = document.getElementById('createPlaylistForm');
    elements.playlistName = document.getElementById('playlistName');
    elements.playlistDesc = document.getElementById('playlistDesc');
    elements.playlistPublic = document.getElementById('playlistPublic');
    
    elements.shareModal = document.getElementById('shareModal');
    elements.shareModalClose = document.getElementById('shareModalClose');
    
    elements.addToPlaylistModal = document.getElementById('addToPlaylistModal');
    elements.addToPlaylistClose = document.getElementById('addToPlaylistClose');
    
    // Search
    elements.searchInput = document.getElementById('searchInput');
    elements.searchClear = document.getElementById('searchClear');
    elements.searchResultsSection = document.getElementById('searchResultsSection');
    elements.browseCategories = document.getElementById('browseCategories');
    elements.songsResults = document.getElementById('songsResults');
    elements.artistsResults = document.getElementById('artistsResults');
    elements.albumsResults = document.getElementById('albumsResults');
    elements.playlistsResults = document.getElementById('playlistsResults');
    elements.categoryGrid = document.getElementById('categoryGrid');
    
    // Player
    elements.audioPlayer = document.getElementById('audioPlayer');
    elements.playPauseBtn = document.getElementById('playPauseBtn');
    elements.playIcon = document.getElementById('playIcon');
    elements.pauseIcon = document.getElementById('pauseIcon');
    elements.prevBtn = document.getElementById('prevBtn');
    elements.nextBtn = document.getElementById('nextBtn');
    elements.shuffleBtn = document.getElementById('shuffleBtn');
    elements.repeatBtn = document.getElementById('repeatBtn');
    elements.progressBar = document.getElementById('progressBar');
    elements.progressFill = document.getElementById('progressFill');
    elements.progressHandle = document.getElementById('progressHandle');
    elements.currentTime = document.getElementById('currentTime');
    elements.totalTime = document.getElementById('totalTime');
    elements.playerThumbnail = document.getElementById('playerThumbnail');
    elements.playerTitle = document.getElementById('playerTitle');
    elements.playerArtist = document.getElementById('playerArtist');
    elements.playerLikeBtn = document.getElementById('playerLikeBtn');
    elements.volumeSlider = document.getElementById('volumeSlider');
    elements.volumeFill = document.getElementById('volumeFill');
    elements.volumeBtn = document.getElementById('volumeBtn');
    
    // Panels
    elements.queuePanel = document.getElementById('queuePanel');
    elements.queueClose = document.getElementById('queueClose');
    elements.queueBtn = document.getElementById('queueBtn');
    elements.queueList = document.getElementById('queueList');
    elements.queueNowPlaying = document.getElementById('queueNowPlaying');
    
    elements.lyricsPanel = document.getElementById('lyricsPanel');
    elements.lyricsClose = document.getElementById('lyricsClose');
    elements.lyricsBtn = document.getElementById('lyricsBtn');
    elements.lyricsContent = document.getElementById('lyricsContent');
    
    // Library
    elements.libraryGrid = document.getElementById('libraryGrid');
    elements.filterBtns = document.querySelectorAll('.filter-btn');
    
    // Playlist
    elements.playlistPage = document.getElementById('playlistPage');
    elements.playlistTitle = document.getElementById('playlistTitle');
    elements.playlistDescription = document.getElementById('playlistDescription');
    elements.playlistOwner = document.getElementById('playlistOwner');
    elements.playlistSongs = document.getElementById('playlistSongs');
    elements.playlistDuration = document.getElementById('playlistDuration');
    elements.playlistSongsList = document.getElementById('playlistSongsList');
    elements.playlistCover = document.getElementById('playlistCover');
    elements.playlistPlayBtn = document.getElementById('playlistPlayBtn');
    
    // Liked Songs
    elements.likedSongsPage = document.getElementById('likedSongsPage');
    elements.likedSongsOwner = document.getElementById('likedSongsOwner');
    elements.likedSongsCount = document.getElementById('likedSongsCount');
    elements.likedSongsList = document.getElementById('likedSongsList');
    elements.likedPlayBtn = document.getElementById('likedPlayBtn');
    
    // Settings
    elements.settingsPage = document.getElementById('settingsPage');
    elements.settingsEmail = document.getElementById('settingsEmail');
    elements.settingsUsername = document.getElementById('settingsUsername');
    elements.crossfadeToggle = document.getElementById('crossfadeToggle');
    elements.autoplayToggle = document.getElementById('autoplayToggle');
    elements.qualitySelect = document.getElementById('qualitySelect');
    elements.explicitToggle = document.getElementById('explicitToggle');
    elements.privateSessionToggle = document.getElementById('privateSessionToggle');
    elements.shareActivityToggle = document.getElementById('shareActivityToggle');
    elements.newReleasesToggle = document.getElementById('newReleasesToggle');
    elements.playlistUpdatesToggle = document.getElementById('playlistUpdatesToggle');
    
    // User Menu
    elements.userMenuBtn = document.getElementById('userMenuBtn');
    elements.userDropdown = document.getElementById('userDropdown');
    elements.settingsLink = document.getElementById('settingsLink');
    elements.logoutLink = document.getElementById('logoutLink');
    
    // Context Menu
    elements.contextMenu = document.getElementById('contextMenu');
    
    // Toast
    elements.toast = document.getElementById('toast');
    
    // Buttons
    elements.createPlaylistBtn = document.getElementById('createPlaylistBtn');
    elements.likedSongsBtn = document.getElementById('likedSongsBtn');
    elements.shareBtn = document.getElementById('shareBtn');
    elements.exploreBtn = document.getElementById('exploreBtn');
}

// ============================================
// STORAGE FUNCTIONS
// ============================================
const Storage = {
    keys: {
        USER: 'vibe_user',
        LIKED_SONGS: 'vibe_liked_songs',
        PLAYLISTS: 'vibe_playlists',
        SETTINGS: 'vibe_settings',
        QUEUE: 'vibe_queue',
        HISTORY: 'vibe_history',
        INSTALL_DISMISSED: 'vibe_install_dismissed'
    },
    
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error(`Error reading ${key}:`, e);
            return null;
        }
    },
    
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`Error saving ${key}:`, e);
            return false;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error(`Error removing ${key}:`, e);
            return false;
        }
    }
};

// ============================================
// PWA INSTALL FUNCTIONALITY
// ============================================
function initPWA() {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
        state.isInstalled = true;
        hideInstallElements();
        return;
    }
    
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        state.deferredPrompt = e;
        
        // Show install banner if not dismissed before
        const dismissed = Storage.get(Storage.keys.INSTALL_DISMISSED);
        if (!dismissed && elements.installBanner) {
            elements.installBanner.classList.remove('hidden');
        }
        
        // Enable install button in sidebar
        if (elements.installAppBtn) {
            elements.installAppBtn.style.display = 'flex';
        }
    });
    
    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
        state.deferredPrompt = null;
        state.isInstalled = true;
        hideInstallElements();
        showToast('Vibe installed successfully!');
    });
    
    // Setup install button click handlers
    if (elements.installAppBtn) {
        elements.installAppBtn.addEventListener('click', handleInstallClick);
    }
    
    if (elements.installBtnBanner) {
        elements.installBtnBanner.addEventListener('click', handleInstallClick);
    }
    
    if (elements.dismissInstall) {
        elements.dismissInstall.addEventListener('click', () => {
            Storage.set(Storage.keys.INSTALL_DISMISSED, true);
            elements.installBanner.classList.add('hidden');
        });
    }
}

function hideInstallElements() {
    if (elements.installBanner) {
        elements.installBanner.classList.add('hidden');
    }
    if (elements.installAppBtn) {
        elements.installAppBtn.style.display = 'none';
    }
}

async function handleInstallClick() {
    if (!state.deferredPrompt) {
        showToast('App is already installed or install not available');
        return;
    }
    
    state.deferredPrompt.prompt();
    
    const { outcome } = await state.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        showToast('Installing Vibe...');
    } else {
        showToast('Installation cancelled');
    }
    
    state.deferredPrompt = null;
}

// ============================================
// USER PROFILE
// ============================================
function initUser() {
    const user = Storage.get(Storage.keys.USER);
    if (user) {
        state.user = user;
    }
    updateProfileUI();
}

function updateProfileUI() {
    if (state.user) {
        elements.profileLabel.textContent = 'Hi,';
        elements.profileName.textContent = state.user.name;
        elements.profileBtn.textContent = 'Logout';
        elements.settingsEmail.textContent = state.user.email;
        elements.settingsUsername.textContent = state.user.name;
        elements.likedSongsOwner.textContent = state.user.name;
    } else {
        elements.profileLabel.textContent = 'Guest User';
        elements.profileName.textContent = '';
        elements.profileBtn.textContent = 'Login / Create Profile';
        elements.settingsEmail.textContent = 'Not logged in';
        elements.settingsUsername.textContent = 'Guest';
        elements.likedSongsOwner.textContent = 'Guest User';
    }
}

function handleProfileBtn() {
    if (state.user) {
        if (confirm('Are you sure you want to logout?')) {
            Storage.remove(Storage.keys.USER);
            state.user = null;
            updateProfileUI();
            showToast('Logged out successfully');
        }
    } else {
        openModal(elements.loginModal);
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const name = elements.userName.value.trim();
    const email = elements.userEmail.value.trim();
    
    if (!name || !email) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (!email.includes('@')) {
        showToast('Please enter a valid email', 'error');
        return;
    }
    
    const user = {
        name,
        email,
        createdAt: new Date().toISOString()
    };
    
    if (Storage.set(Storage.keys.USER, user)) {
        state.user = user;
        updateProfileUI();
        closeModal(elements.loginModal);
        elements.loginForm.reset();
        showToast(`Welcome, ${name}!`);
    }
}

// ============================================
// NAVIGATION
// ============================================
function navigateTo(page) {
    state.history.push(state.currentPage);
    state.currentPage = page;
    
    // Update active nav
    elements.navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
    
    // Show page
    elements.pages.forEach(p => {
        p.classList.toggle('hidden', p.id !== page + 'Page');
    });
    
    // Update nav arrows
    elements.backBtn.disabled = state.history.length === 0;
    
    // Scroll to top
    if (elements.mainContent) {
        elements.mainContent.scrollTo(0, 0);
    }
    
    // Close panels on mobile
    elements.queuePanel?.classList.add('hidden');
    elements.lyricsPanel?.classList.add('hidden');
}

function goBack() {
    if (state.history.length > 0) {
        const prevPage = state.history.pop();
        state.currentPage = prevPage;
        
        elements.navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.page === prevPage);
        });
        
        elements.pages.forEach(p => {
            p.classList.toggle('hidden', p.id !== prevPage + 'Page');
        });
        
        elements.backBtn.disabled = state.history.length === 0;
    }
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function openModal(modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
    document.body.style.overflow = '';
}

// ============================================
// JIOSAAVN API - WORKING IMPLEMENTATION
// ============================================
const API_BASE = 'https://saavn.dev/api';

// Fallback songs for when API fails
const fallbackSongs = [
    { id: '1', name: 'Tum Hi Ho', primaryArtists: 'Arijit Singh', image: [{ url: 'https://c.saavncdn.com/430/Tum-Hi-Ho-Hindi-2013-150x150.jpg' }, { url: 'https://c.saavncdn.com/430/Tum-Hi-Ho-Hindi-2013-500x500.jpg' }] },
    { id: '2', name: 'Kesariya', primaryArtists: 'Arijit Singh', image: [{ url: 'https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220715032810-150x150.jpg' }, { url: 'https://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220715032810-500x500.jpg' }] },
    { id: '3', name: 'Raataan Lambiyan', primaryArtists: 'Jubin Nautiyal', image: [{ url: 'https://c.saavncdn.com/238/Raataan-Lambiyan-From-Shershaah--Hindi-2021-20210729181007-150x150.jpg' }, { url: 'https://c.saavncdn.com/238/Raataan-Lambiyan-From-Shershaah--Hindi-2021-20210729181007-500x500.jpg' }] },
    { id: '4', name: 'Apna Bana Le', primaryArtists: 'Arijit Singh', image: [{ url: 'https://c.saavncdn.com/815/Apna-Bana-Le-From-Bhediya-Hindi-2022-20221105200532-150x150.jpg' }, { url: 'https://c.saavncdn.com/815/Apna-Bana-Le-From-Bhediya-Hindi-2022-20221105200532-500x500.jpg' }] },
    { id: '5', name: 'Chaiyya Chaiyya', primaryArtists: 'Sapna Awasthi', image: [{ url: 'https://c.saavncdn.com/560/Dil-Se-Hindi-1998-20190329132245-150x150.jpg' }, { url: 'https://c.saavncdn.com/560/Dil-Se-Hindi-1998-20190329132245-500x500.jpg' }] },
    { id: '6', name: 'Tujh Mein Rab Dikhta Hai', primaryArtists: 'Roopkumar Rathod', image: [{ url: 'https://c.saavncdn.com/593/Rab-Ne-Bana-Di-Jodi-Hindi-2008-20190329150809-150x150.jpg' }, { url: 'https://c.saavncdn.com/593/Rab-Ne-Bana-Di-Jodi-Hindi-2008-20190329150809-500x500.jpg' }] }
];

async function searchSongs(query) {
    if (!query || query.trim().length < 2) return [];
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(`${API_BASE}/search/songs?query=${encodeURIComponent(query)}&limit=20`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('Search failed');
        
        const data = await response.json();
        
        if (data.success && data.data?.results && data.data.results.length > 0) {
            return data.data.results;
        }
        return [];
    } catch (error) {
        console.error('Search error:', error);
        // Return filtered fallback songs
        return fallbackSongs.filter(s => 
            s.name.toLowerCase().includes(query.toLowerCase()) || 
            s.primaryArtists.toLowerCase().includes(query.toLowerCase())
        );
    }
}

async function searchAll(query) {
    if (!query || query.trim().length < 2) return null;
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        const [songsRes, albumsRes, artistsRes, playlistsRes] = await Promise.all([
            fetch(`${API_BASE}/search/songs?query=${encodeURIComponent(query)}&limit=10`, { signal: controller.signal }),
            fetch(`${API_BASE}/search/albums?query=${encodeURIComponent(query)}&limit=10`, { signal: controller.signal }),
            fetch(`${API_BASE}/search/artists?query=${encodeURIComponent(query)}&limit=10`, { signal: controller.signal }),
            fetch(`${API_BASE}/search/playlists?query=${encodeURIComponent(query)}&limit=10`, { signal: controller.signal })
        ]);
        
        clearTimeout(timeoutId);
        
        const [songs, albums, artists, playlists] = await Promise.all([
            songsRes.ok ? songsRes.json() : { success: false },
            al
