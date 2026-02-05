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
            albumsRes.ok ? albumsRes.json() : { success: false },
            artistsRes.ok ? artistsRes.json() : { success: false },
            playlistsRes.ok ? playlistsRes.json() : { success: false }
        ]);
        
        return {
            songs: songs.success ? songs.data?.results || [] : [],
            albums: albums.success ? albums.data?.results || [] : [],
            artists: artists.success ? artists.data?.results || [] : [],
            playlists: playlists.success ? playlists.data?.results || [] : []
        };
    } catch (error) {
        console.error('Search all error:', error);
        // Return fallback data
        return {
            songs: fallbackSongs.filter(s => 
                s.name.toLowerCase().includes(query.toLowerCase()) || 
                s.primaryArtists.toLowerCase().includes(query.toLowerCase())
            ),
            albums: [],
            artists: [],
            playlists: []
        };
    }
}

async function getSongDetails(id) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(`${API_BASE}/songs/${id}`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('Failed to get song details');
        
        const data = await response.json();
        return data.success ? data.data?.[0] : null;
    } catch (error) {
        console.error('Get song error:', error);
        return fallbackSongs.find(s => s.id === id) || null;
    }
}

async function getTrending() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(`${API_BASE}/search/songs?query=trending&limit=20`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('Failed to get trending');
        
        const data = await response.json();
        
        if (data.success && data.data?.results && data.data.results.length > 0) {
            return data.data.results;
        }
        return fallbackSongs;
    } catch (error) {
        console.error('Get trending error:', error);
        return fallbackSongs;
    }
}

async function getNewReleases() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(`${API_BASE}/search/songs?query=new+hindi&limit=20`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('Failed to get new releases');
        
        const data = await response.json();
        
        if (data.success && data.data?.results && data.data.results.length > 0) {
            return data.data.results;
        }
        return fallbackSongs.slice().reverse();
    } catch (error) {
        console.error('Get new releases error:', error);
        return fallbackSongs.slice().reverse();
    }
}

async function getSongsByQuery(query, limit = 10) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(`${API_BASE}/search/songs?query=${encodeURIComponent(query)}&limit=${limit}`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('Search failed');
        
        const data = await response.json();
        
        if (data.success && data.data?.results && data.data.results.length > 0) {
            return data.data.results;
        }
        return fallbackSongs.slice(0, limit);
    } catch (error) {
        console.error('Query search error:', error);
        return fallbackSongs.slice(0, limit);
    }
}

// ============================================
// AUDIO PLAYER
// ============================================
function initPlayer() {
    state.audioElement = elements.audioPlayer;
    state.audioElement.volume = state.volume;
    
    state.audioElement.addEventListener('loadedmetadata', () => {
        state.duration = state.audioElement.duration;
        elements.totalTime.textContent = formatDuration(state.duration);
    });
    
    state.audioElement.addEventListener('timeupdate', () => {
        state.currentTime = state.audioElement.currentTime;
        updateProgressUI();
    });
    
    state.audioElement.addEventListener('ended', handleSongEnd);
    
    state.audioElement.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        showToast('Error playing song - trying next', 'error');
        state.isPlaying = false;
        updatePlayPauseUI();
        // Try to play next song
        setTimeout(() => playNext(), 2000);
    });
}

function getHighQualityUrl(downloadUrls) {
    if (!downloadUrls || !Array.isArray(downloadUrls)) return null;
    
    const qualityOrder = ['320kbps', '160kbps', '96kbps', '48kbps', '12kbps'];
    
    // Apply quality setting
    let maxQuality = '320kbps';
    if (state.settings.quality === 'low') maxQuality = '96kbps';
    else if (state.settings.quality === 'normal') maxQuality = '160kbps';
    
    const allowedQualities = qualityOrder.slice(qualityOrder.indexOf(maxQuality));
    
    for (const quality of allowedQualities) {
        const urlObj = downloadUrls.find(u => u.quality === quality);
        if (urlObj?.url) return urlObj.url;
    }
    
    return downloadUrls[0]?.url || null;
}

async function playSong(songOrId, addToQueue = true) {
    let song;
    
    if (typeof songOrId === 'string') {
        song = state.searchResults.find(s => s.id === songOrId);
        if (!song) {
            song = state.likedSongs.find(s => s.id === songOrId);
        }
        if (!song) {
            const details = await getSongDetails(songOrId);
            if (details) song = details;
        }
    } else {
        song = songOrId;
    }
    
    if (!song) {
        showToast('Song not found', 'error');
        return;
    }
    
    // Get audio URL
    let audioUrl = null;
    
    if (song.downloadUrl && Array.isArray(song.downloadUrl)) {
        audioUrl = getHighQualityUrl(song.downloadUrl);
    } else if (song.url) {
        audioUrl = song.url;
    }
    
    // For fallback songs, use a demo audio URL
    if (!audioUrl && fallbackSongs.some(s => s.id === song.id)) {
        // Use a sample audio URL for demo purposes
        audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    }
    
    if (!audioUrl) {
        showToast('Audio not available', 'error');
        return;
    }
    
    state.currentSong = {
        id: song.id,
        name: song.name,
        artist: song.primaryArtists || song.artists?.map(a => a.name).join(', ') || 'Unknown Artist',
        image: song.image?.[2]?.url || song.image?.[1]?.url || song.image?.[0]?.url || '',
        url: audioUrl,
        duration: song.duration
    };
    
    // Update queue
    if (addToQueue) {
        const existingIndex = state.queue.findIndex(s => s.id === song.id);
        if (existingIndex === -1) {
            state.queue.unshift(state.currentSong);
            state.queueIndex = 0;
        } else {
            state.queueIndex = existingIndex;
        }
    }
    
    updatePlayerUI();
    updateQueueUI();
    
    state.audioElement.src = audioUrl;
    state.audioElement.load();
    
    try {
        await state.audioElement.play();
        state.isPlaying = true;
        updatePlayPauseUI();
        
        // Update like button
        const isLiked = state.likedSongs.some(s => s.id === song.id);
        elements.playerLikeBtn.classList.toggle('active', isLiked);
        
        // Load lyrics
        loadLyrics(song);
    } catch (error) {
        console.error('Play error:', error);
        showToast('Failed to play song', 'error');
    }
}

function updatePlayerUI() {
    if (!state.currentSong) return;
    
    elements.playerTitle.textContent = state.currentSong.name;
    elements.playerArtist.textContent = state.currentSong.artist;
    elements.playerThumbnail.src = state.currentSong.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23282828" width="64" height="64"/%3E%3Ccircle cx="32" cy="32" r="16" fill="%231DB954"/%3E%3C/svg%3E';
    
    // Update page title
    document.title = `${state.currentSong.name} • ${state.currentSong.artist} - Vibe`;
}

function togglePlayPause() {
    if (!state.currentSong) {
        showToast('Select a song to play');
        return;
    }
    
    if (state.isPlaying) {
        state.audioElement.pause();
        state.isPlaying = false;
    } else {
        state.audioElement.play().catch(err => {
            showToast('Failed to play', 'error');
        });
        state.isPlaying = true;
    }
    
    updatePlayPauseUI();
}

function updatePlayPauseUI() {
    elements.playIcon.style.display = state.isPlaying ? 'none' : 'block';
    elements.pauseIcon.style.display = state.isPlaying ? 'block' : 'none';
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
    state.audioElement.currentTime = (percent / 100) * state.duration;
}

function handleSongEnd() {
    if (state.repeat === 'one') {
        state.audioElement.currentTime = 0;
        state.audioElement.play();
    } else if (state.queue.length > 0 && state.queueIndex < state.queue.length - 1) {
        state.queueIndex++;
        playSong(state.queue[state.queueIndex].id, false);
    } else if (state.repeat === 'all' && state.queue.length > 0) {
        state.queueIndex = 0;
        playSong(state.queue[0].id, false);
    } else {
        state.isPlaying = false;
        updatePlayPauseUI();
        
        if (state.settings.autoplay) {
            playRandomSong();
        }
    }
}

async function playRandomSong() {
    try {
        const trending = await getTrending();
        if (trending.length > 0) {
            const random = trending[Math.floor(Math.random() * trending.length)];
            playSong(random);
        }
    } catch (error) {
        console.error('Play random error:', error);
    }
}

function playNext() {
    if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.queueIndex = randomIndex;
        playSong(state.queue[randomIndex].id, false);
    } else if (state.queueIndex < state.queue.length - 1) {
        state.queueIndex++;
        playSong(state.queue[state.queueIndex].id, false);
    }
}

function playPrevious() {
    if (state.currentTime > 3) {
        state.audioElement.currentTime = 0;
    } else if (state.queueIndex > 0) {
        state.queueIndex--;
        playSong(state.queue[state.queueIndex].id, false);
    }
}

function toggleShuffle() {
    state.shuffle = !state.shuffle;
    elements.shuffleBtn.classList.toggle('active', state.shuffle);
    showToast(state.shuffle ? 'Shuffle on' : 'Shuffle off');
}

function toggleRepeat() {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(state.repeat);
    state.repeat = modes[(currentIndex + 1) % modes.length];
    
    elements.repeatBtn.classList.remove('active', 'one');
    if (state.repeat === 'all') elements.repeatBtn.classList.add('active');
    else if (state.repeat === 'one') elements.repeatBtn.classList.add('active', 'one');
    
    const labels = { off: 'Repeat off', all: 'Repeat all', one: 'Repeat one' };
    showToast(labels[state.repeat]);
}

// ============================================
// VOLUME
// ============================================
function setVolume(percent) {
    state.volume = percent / 100;
    state.audioElement.volume = state.volume;
    elements.volumeFill.style.width = `${percent}%`;
    
    if (state.volume > 0 && state.isMuted) {
        state.isMuted = false;
    }
}

function toggleMute() {
    state.isMuted = !state.isMuted;
    state.audioElement.volume = state.isMuted ? 0 : state.volume;
    elements.volumeBtn.classList.toggle('muted', state.isMuted);
          }
// ============================================
// QUEUE
// ============================================
function toggleQueue() {
    elements.queuePanel.classList.toggle('hidden');
    elements.lyricsPanel.classList.add('hidden');
}

function updateQueueUI() {
    if (!state.currentSong) {
        elements.queueNowPlaying.innerHTML = '<span class="queue-empty">No song playing</span>';
    } else {
        elements.queueNowPlaying.innerHTML = `
            <div class="queue-song">
                <img src="${state.currentSong.image}" alt="" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 40 40%27%3E%3Crect fill=%27%23282828%27 width=%2740%27 height=%2740%27/%3E%3Ccircle cx=%2720%27 cy=%2720%27 r=%2710%27 fill=%27%231DB954%27/%3E%3C/svg%3E'">
                <div class="queue-song-info">
                    <span class="queue-song-title">${state.currentSong.name}</span>
                    <span class="queue-song-artist">${state.currentSong.artist}</span>
                </div>
            </div>
        `;
    }
    
    if (state.queue.length === 0 || (state.queue.length === 1 && state.currentSong)) {
        elements.queueList.innerHTML = '<span class="queue-empty">Queue is empty</span>';
    } else {
        const upcoming = state.queue.filter((s, i) => i !== state.queueIndex);
        elements.queueList.innerHTML = upcoming.map((song, index) => `
            <div class="queue-song" data-index="${index}">
                <img src="${song.image}" alt="" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 40 40%27%3E%3Crect fill=%27%23282828%27 width=%2740%27 height=%2740%27/%3E%3Ccircle cx=%2720%27 cy=%2720%27 r=%2710%27 fill=%27%231DB954%27/%3E%3C/svg%3E'">
                <div class="queue-song-info">
                    <span class="queue-song-title">${song.name}</span>
                    <span class="queue-song-artist">${song.artist}</span>
                </div>
                <button class="queue-remove" data-index="${index}">×</button>
            </div>
        `).join('');
    }
}

function addToQueue(song) {
    state.queue.push(song);
    updateQueueUI();
    showToast('Added to queue');
}

function removeFromQueue(index) {
    state.queue.splice(index, 1);
    updateQueueUI();
}

// ============================================
// LIKED SONGS
// ============================================
function initLikedSongs() {
    const liked = Storage.get(Storage.keys.LIKED_SONGS);
    if (liked) {
        state.likedSongs = liked;
    }
    updateLikedSongsUI();
}

function toggleLikeSong(song = state.currentSong) {
    if (!song) return;
    
    const index = state.likedSongs.findIndex(s => s.id === song.id);
    
    if (index === -1) {
        state.likedSongs.push(song);
        elements.playerLikeBtn.classList.add('active');
        showToast('Added to Liked Songs');
    } else {
        state.likedSongs.splice(index, 1);
        elements.playerLikeBtn.classList.remove('active');
        showToast('Removed from Liked Songs');
    }
    
    Storage.set(Storage.keys.LIKED_SONGS, state.likedSongs);
    updateLikedSongsUI();
}

function updateLikedSongsUI() {
    elements.likedSongsCount.textContent = `${state.likedSongs.length} songs`;
    
    if (state.likedSongs.length === 0) {
        elements.likedSongsList.innerHTML = '<div class="empty-state"><p>No liked songs yet</p><p style="font-size: 13px; margin-top: 8px;">Tap the heart icon while playing to add songs</p></div>';
    } else {
        elements.likedSongsList.innerHTML = state.likedSongs.map((song, index) => `
            <div class="song-row" data-id="${song.id}">
                <span class="song-number">${index + 1}</span>
                <img src="${song.image}" alt="" class="song-thumb" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 40 40%27%3E%3Crect fill=%27%23282828%27 width=%2740%27 height=%2740%27/%3E%3Ccircle cx=%2720%27 cy=%2720%27 r=%2710%27 fill=%27%231DB954%27/%3E%3C/svg%3E'">
                <div class="song-info">
                    <span class="song-name">${song.name}</span>
                    <span class="song-artist">${song.artist}</span>
                </div>
                <button class="song-like active" data-id="${song.id}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <button class="song-more" data-id="${song.id}">⋮</button>
            </div>
        `).join('');
    }
}

// ============================================
// PLAYLISTS
// ============================================
function initPlaylists() {
    const playlists = Storage.get(Storage.keys.PLAYLISTS);
    if (playlists) {
        state.playlists = playlists;
    } else {
        // Default playlists
        state.playlists = [
            { id: 'chill', name: 'Chill Vibes', description: 'Relax and unwind', songs: [], cover: null },
            { id: 'workout', name: 'Workout Pump', description: 'Get energized', songs: [], cover: null },
            { id: 'drive', name: 'Late Night Drive', description: 'Perfect for the road', songs: [], cover: null },
            { id: 'focus', name: 'Focus Flow', description: 'Stay productive', songs: [], cover: null },
            { id: 'indie', name: 'Indie Mix', description: 'Discover new sounds', songs: [], cover: null },
            { id: 'throwback', name: 'Throwback Hits', description: 'Nostalgic favorites', songs: [], cover: null }
        ];
        Storage.set(Storage.keys.PLAYLISTS, state.playlists);
    }
    updatePlaylistsUI();
}

function updatePlaylistsUI() {
    const container = document.getElementById('userPlaylists');
    if (container) {
        container.innerHTML = state.playlists.map(p => `
            <a href="#" class="playlist-item" data-playlist="${p.id}">${p.name}</a>
        `).join('');
    }
    
    // Update library
    updateLibraryUI();
}

function createPlaylist(name, description, isPublic) {
    const playlist = {
        id: 'playlist_' + Date.now(),
        name,
        description: description || '',
        public: isPublic,
        songs: [],
        cover: null,
        createdAt: new Date().toISOString(),
        owner: state.user?.name || 'Guest User'
    };
    
    state.playlists.push(playlist);
    Storage.set(Storage.keys.PLAYLISTS, state.playlists);
    updatePlaylistsUI();
    showToast('Playlist created');
}

function addSongToPlaylist(playlistId, song) {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (playlist) {
        if (!playlist.songs.find(s => s.id === song.id)) {
            playlist.songs.push(song);
            Storage.set(Storage.keys.PLAYLISTS, state.playlists);
            showToast(`Added to ${playlist.name}`);
        } else {
            showToast('Song already in playlist');
        }
    }
}

function openPlaylist(playlistId) {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    elements.playlistTitle.textContent = playlist.name;
    elements.playlistDescription.textContent = playlist.description || '';
    elements.playlistOwner.textContent = playlist.owner || 'Vibe User';
    elements.playlistSongs.textContent = `${playlist.songs.length} songs`;
    
    const totalDuration = playlist.songs.reduce((acc, s) => acc + (parseInt(s.duration) || 0), 0);
    elements.playlistDuration.textContent = formatDuration(totalDuration);
    
    if (playlist.songs.length === 0) {
        elements.playlistSongsList.innerHTML = '<div class="empty-state"><p>This playlist is empty</p><p style="font-size: 13px; margin-top: 8px;">Add songs from search or home</p></div>';
    } else {
        elements.playlistSongsList.innerHTML = playlist.songs.map((song, index) => `
            <div class="song-row" data-id="${song.id}">
                <span class="song-number">${index + 1}</span>
                <button class="song-play" data-id="${song.id}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
                <img src="${song.image}" alt="" class="song-thumb" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 40 40%27%3E%3Crect fill=%27%23282828%27 width=%2740%27 height=%2740%27/%3E%3Ccircle cx=%2720%27 cy=%2720%27 r=%2710%27 fill=%27%231DB954%27/%3E%3C/svg%3E'">
                <div class="song-info">
                    <span class="song-name">${song.name}</span>
                    <span class="song-artist">${song.artist}</span>
                </div>
                <button class="song-like ${state.likedSongs.some(s => s.id === song.id) ? 'active' : ''}" data-id="${song.id}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <button class="song-more" data-id="${song.id}">⋮</button>
            </div>
        `).join('');
    }
    
    navigateTo('playlist');
}

// ============================================
// LIBRARY
// ============================================
function updateLibraryUI(filter = 'all') {
    let items = [];
    
    if (filter === 'all' || filter === 'playlists') {
        items = items.concat(state.playlists.map(p => ({ ...p, type: 'playlist' })));
    }
    
    if (items.length === 0) {
        elements.libraryGrid.innerHTML = '<div class="empty-state"><p>No items found</p></div>';
    } else {
        elements.libraryGrid.innerHTML = items.map(item => `
            <div class="library-item" data-type="${item.type}" data-id="${item.id}">
                <div class="library-item-cover">
                    ${item.cover ? `<img src="${item.cover}" alt="">` : `
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                    `}
                </div>
                <span class="library-item-name">${item.name}</span>
                <span class="library-item-meta">${item.type === 'playlist' ? `Playlist • ${item.songs?.length || 0} songs` : item.type}</span>
            </div>
        `).join('');
    }
}

// ============================================
// SEARCH
// ============================================
async function handleSearch() {
    const query = elements.searchInput.value.trim();
    
    if (query.length < 2) {
        elements.searchResultsSection.classList.add('hidden');
        elements.browseCategories.classList.remove('hidden');
        elements.searchClear.classList.add('hidden');
        return;
    }
    
    elements.searchClear.classList.remove('hidden');
    
    showToast('Searching...');
    
    const results = await searchAll(query);
    if (!results) {
        showToast('Search failed', 'error');
        return;
    }
    
    // Store search results for later use
    state.searchResults = results.songs;
    
    // Display songs
    if (results.songs.length > 0) {
        elements.songsResults.innerHTML = results.songs.map(song => `
            <div class="song-row" data-id="${song.id}">
                <button class="song-play" data-id="${song.id}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
                <img src="${song.image?.[0]?.url || song.image?.[1]?.url || ''}" alt="" class="song-thumb" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 40 40%27%3E%3Crect fill=%27%23282828%27 width=%2740%27 height=%2740%27/%3E%3Ccircle cx=%2720%27 cy=%2720%27 r=%2710%27 fill=%27%231DB954%27/%3E%3C/svg%3E'">
                <div class="song-info">
                    <span class="song-name">${song.name}</span>
                    <span class="song-artist">${song.primaryArtists || 'Unknown Artist'}</span>
                </div>
                <button class="song-like ${state.likedSongs.some(s => s.id === song.id) ? 'active' : ''}" data-id="${song.id}">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <span class="song-duration">${formatDuration(song.duration)}</span>
                <button class="song-more" data-id="${song.id}">⋮</button>
            </div>
        `).join('');
    } else {
        elements.songsResults.innerHTML = '<p class="no-results">No songs found</p>';
    }
    
    // Display artists
    if (results.artists.length > 0) {
        elements.artistsResults.innerHTML = results.artists.map(artist => `
            <div class="card artist-card" data-id="${artist.id}">
                <div class="card-image round">
                    <img src="${artist.image?.[2]?.url || artist.image?.[0]?.url || ''}" alt="${artist.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 180 180%27%3E%3Crect fill=%27%23282828%27 width=%27180%27 height=%27180%27/%3E%3Ccircle cx=%2790%27 cy=%2790%27 r=%2745%27 fill=%27%231DB954%27/%3E%3C/svg%3E'">
                </div>
                <h3 class="card-title">${artist.name}</h3>
                <p class="card-subtitle">Artist</p>
            </div>
        `).join('');
    } else {
        elements.artistsResults.innerHTML = '<p class="no-results">No artists found</p>';
    }
    
    // Display albums
    if (results.albums.length > 0) {
        elements.albumsResults.innerHTML = results.albums.map(album => `
            <div class="card" data-id="${album.id}">
                <div class="card-image">
                    <img src="${album.image?.[2]?.url || album.image?.[0]?.url || ''}" alt="${album.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 180 180%27%3E%3Crect fill=%27%23282828%27 width=%27180%27 height=%27180%27/%3E%3Ccircle cx=%2790%27 cy=%2790%27 r=%2745%27 fill=%27%231DB954%27/%3E%3C/svg%3E'">
                </div>
                <h3 class="card-title">${album.name}</h3>
                <p class="card-subtitle">${album.year || ''} • ${album.primaryArtists || ''}</p>
            </div>
        `).join('');
    } else {
        elements.albumsResults.innerHTML = '<p class="no-results">No albums found</p>';
    }
    
    // Display playlists
    if (results.playlists.length > 0) {
        elements.playlistsResults.innerHTML = results.playlists.map(playlist => `
            <div class="card" data-id="${playlist.id}">
                <div class="card-image">
                    <img src="${playlist.image?.[2]?.url || playlist.image?.[0]?.url || ''}" alt="${playlist.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 180 180%27%3E%3Crect fill=%27%23282828%27 width=%27180%27 height=%27180%27/%3E%3Ccircle cx=%2790%27 cy=%2790%27 r=%2745%27 fill=%27%231DB954%27/%3E%3C/svg%3E'">
                </div>
                <h3 class="card-title">${playlist.name}</h3>
                <p class="card-subtitle">By ${playlist.userName || 'Unknown'}</p>
            </div>
        `).join('');
    } else {
        elements.playlistsResults.innerHTML = '<p class="no-results">No playlists found</p>';
    }
    
    elements.searchResultsSection.classList.remove('hidden');
    elements.browseCategories.classList.add('hidden');
}

function clearSearch() {
    elements.searchInput.value = '';
    elements.searchResultsSection.classList.add('hidden');
    elements.browseCategories.classList.remove('hidden');
    elements.searchClear.classList.add('hidden');
    state.searchResults = [];
}

// ============================================
// SHARE
// ============================================
function toggleShare() {
    openModal(elements.shareModal);
}

function copyLink() {
    if (!state.currentSong) {
        showToast('No song to share');
        return;
    }
    
    const link = `https://vibe.music/song/${state.currentSong.id}`;
    navigator.clipboard.writeText(link).then(() => {
        showToast('Link copied to clipboard');
        closeModal(elements.shareModal);
    }).catch(() => {
        showToast('Failed to copy link', 'error');
    });
}

function shareOn(platform) {
    if (!state.currentSong) {
        showToast('No song to share');
        return;
    }
    
    const text = `Listening to ${state.currentSong.name} by ${state.currentSong.artist} on Vibe`;
    const url = `https://vibe.music/song/${state.currentSong.id}`;
    
    let shareUrl;
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank');
        closeModal(elements.shareModal);
    }
}

// ============================================
// LYRICS
// ============================================
function toggleLyrics() {
    elements.lyricsPanel.classList.toggle('hidden');
    elements.queuePanel.classList.add('hidden');
}

function loadLyrics(song) {
    elements.lyricsContent.innerHTML = `
        <div class="lyrics-song-info">
            <h4>${song.name}</h4>
            <p>${song.primaryArtists || song.artists?.map(a => a.name).join(', ') || 'Unknown Artist'}</p>
        </div>
        <div class="lyrics-text">
            <p class="lyrics-placeholder">Lyrics not available for this song.</p>
            <p class="lyrics-hint">We're working on adding lyrics for more songs!</p>
        </div>
    `;
}

// ============================================
// SETTINGS
// ============================================
function initSettings() {
    const settings = Storage.get(Storage.keys.SETTINGS);
    if (settings) {
        state.settings = { ...state.settings, ...settings };
    }
    
    // Apply settings to UI
    elements.crossfadeToggle.checked = state.settings.crossfade;
    elements.autoplayToggle.checked = state.settings.autoplay;
    elements.qualitySelect.value = state.settings.quality;
    elements.explicitToggle.checked = state.settings.explicit;
    elements.privateSessionToggle.checked = state.settings.privateSession;
    elements.shareActivityToggle.checked = state.settings.shareActivity;
    elements.newReleasesToggle.checked = state.settings.newReleases;
    elements.playlistUpdatesToggle.checked = state.settings.playlistUpdates;
}

function saveSettings() {
    state.settings = {
        crossfade: elements.crossfadeToggle.checked,
        autoplay: elements.autoplayToggle.checked,
        quality: elements.qualitySelect.value,
        explicit: elements.explicitToggle.checked,
        privateSession: elements.privateSessionToggle.checked,
        shareActivity: elements.shareActivityToggle.checked,
        newReleases: elements.newReleasesToggle.checked,
        playlistUpdates: elements.playlistUpdatesToggle.checked
    };
    
    Storage.set(Storage.keys.SETTINGS, state.settings);
    showToast('Settings saved');
}

// ============================================
// CONTEXT MENU
// ============================================
function showContextMenu(e, song) {
    e.preventDefault();
    
    const x = Math.min(e.pageX, window.innerWidth - 200);
    const y =
// ============================================
// HOME PAGE CONTENT
// ============================================
async function loadHomeContent() {
    showToast('Loading music...');
    
    // Trending Now
    const trending = await getTrending();
    renderCardGrid('trendingGrid', trending.slice(0, 6));
    
    // Recently Played - Use trending
    renderCardGrid('recentlyPlayedGrid', trending.slice(2, 8));
    
    // Made For You - Mix of songs
    const romantic = await getSongsByQuery('romantic hindi songs', 6);
    renderCardGrid('madeForYouGrid', romantic);
    
    // Top Mixes
    const party = await getSongsByQuery('party songs', 6);
    renderCardGrid('topMixesGrid', party);
    
    // New Releases
    const newReleases = await getNewReleases();
    renderCardGrid('newReleasesGrid', newReleases.slice(0, 6));
    
    // Featured Charts
    renderCardGrid('featuredChartsGrid', trending.slice(6, 12));
    
    // Mood
    const mood = await getSongsByQuery('melody songs', 6);
    renderCardGrid('moodGrid', mood);
    
    // Focus
    const focus = await getSongsByQuery('instrumental', 6);
    renderCardGrid('focusGrid', focus);
    
    // Party
    renderCardGrid('partyGrid', party.slice(0, 6));
}

function renderCardGrid(gridId, songs) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    if (!songs || songs.length === 0) {
        grid.innerHTML = '<p class="no-results">No songs available</p>';
        return;
    }
    
    grid.innerHTML = songs.map(song => `
        <div class="card" data-id="${song.id}" onclick="playSong('${song.id}')">
            <div class="card-image">
                <img src="${song.image?.[2]?.url || song.image?.[1]?.url || song.image?.[0]?.url || ''}" alt="${song.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 180 180%27%3E%3Crect fill=%27%23282828%27 width=%27180%27 height=%27180%27/%3E%3Ccircle cx=%2790%27 cy=%2790%27 r=%2745%27 fill=%27%231DB954%27/%3E%3C/svg%3E'">
                <button class="play-overlay" onclick="event.stopPropagation(); playSong('${song.id}')">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
            </div>
            <h3 class="card-title">${song.name}</h3>
            <p class="card-subtitle">${song.primaryArtists || 'Various Artists'}</p>
        </div>
    `).join('');
}

// ============================================
// BROWSE CATEGORIES
// ============================================
const categories = [
    { name: 'Podcasts', color: '#27856a' },
    { name: 'Made For You', color: '#1e3264' },
    { name: 'New Releases', color: '#e8115b' },
    { name: 'Hindi', color: '#e13300' },
    { name: 'Punjabi', color: '#bc5900' },
    { name: 'Tamil', color: '#d84000' },
    { name: 'Telugu', color: '#8c1932' },
    { name: 'Charts', color: '#8d67ab' },
    { name: 'Pop', color: '#148a08' },
    { name: 'Indie', color: '#8c1932' },
    { name: 'Trending', color: '#b02897' },
    { name: 'Love', color: '#e8115b' },
    { name: 'Discover', color: '#8d67ab' },
    { name: 'Radio', color: '#133e1e' },
    { name: 'Mood', color: '#e1118c' },
    { name: 'Party', color: '#509bf5' },
    { name: 'Devotional', color: '#c39687' },
    { name: 'Decades', color: '#1e3264' },
    { name: 'Hip-Hop', color: '#bc5900' },
    { name: 'Dance/Electronic', color: '#d84000' },
    { name: 'Student', color: '#af2896' },
    { name: 'Sleep', color: '#1e3264' },
    { name: 'Chill', color: '#d84000' },
    { name: 'Focus', color: '#503750' },
    { name: 'Workout', color: '#777777' },
    { name: 'Commute', color: '#537aa1' },
    { name: 'Romance', color: '#8c1932' },
    { name: 'Sad', color: '#8c1932' }
];

function loadCategories() {
    elements.categoryGrid.innerHTML = categories.map(cat => `
        <div class="category-card" style="background-color: ${cat.color}" data-category="${cat.name}">
            <span class="category-name">${cat.name}</span>
        </div>
    `).join('');
}

// ============================================
// EVENT LISTENERS
// ============================================
function initEventListeners() {
    // Navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            if (page) navigateTo(page);
        });
    });
    
    elements.backBtn?.addEventListener('click', goBack);
    
    // Profile
    elements.profileBtn?.addEventListener('click', handleProfileBtn);
    elements.loginForm?.addEventListener('submit', handleLoginSubmit);
    elements.loginModalClose?.addEventListener('click', () => closeModal(elements.loginModal));
    
    // Create Playlist
    elements.createPlaylistBtn?.addEventListener('click', () => openModal(elements.createPlaylistModal));
    elements.createPlaylistClose?.addEventListener('click', () => closeModal(elements.createPlaylistModal));
    elements.createPlaylistForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        createPlaylist(
            elements.playlistName.value,
            elements.playlistDesc.value,
            elements.playlistPublic.checked
        );
        closeModal(elements.createPlaylistModal);
        elements.createPlaylistForm.reset();
    });
    
    // Liked Songs
    elements.likedSongsBtn?.addEventListener('click', () => {
        updateLikedSongsUI();
        navigateTo('likedSongs');
    });
    
    // Share
    elements.shareBtn?.addEventListener('click', toggleShare);
    elements.shareModalClose?.addEventListener('click', () => closeModal(elements.shareModal));
    document.getElementById('shareCopyLink')?.addEventListener('click', copyLink);
    document.getElementById('shareTwitter')?.addEventListener('click', () => shareOn('twitter'));
    document.getElementById('shareWhatsApp')?.addEventListener('click', () => shareOn('whatsapp'));
    
    // Search
    elements.searchInput?.addEventListener('input', debounce(handleSearch, 500));
    elements.searchClear?.addEventListener('click', clearSearch);
    
    // Player
    elements.playPauseBtn?.addEventListener('click', togglePlayPause);
    elements.prevBtn?.addEventListener('click', playPrevious);
    elements.nextBtn?.addEventListener('click', playNext);
    elements.shuffleBtn?.addEventListener('click', toggleShuffle);
    elements.repeatBtn?.addEventListener('click', toggleRepeat);
    elements.playerLikeBtn?.addEventListener('click', () => toggleLikeSong());
    
    // Progress
    elements.progressBar?.addEventListener('click', (e) => {
        const rect = elements.progressBar.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        seekTo(percent);
    });
    
    // Volume
    elements.volumeSlider?.addEventListener('click', (e) => {
        const rect = elements.volumeSlider.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        setVolume(percent);
    });
    elements.volumeBtn?.addEventListener('click', toggleMute);
    
    // Panels
    elements.queueBtn?.addEventListener('click', toggleQueue);
    elements.queueClose?.addEventListener('click', () => elements.queuePanel.classList.add('hidden'));
    elements.lyricsBtn?.addEventListener('click', toggleLyrics);
    elements.lyricsClose?.addEventListener('click', () => elements.lyricsPanel.classList.add('hidden'));
    
    // Library filters
    elements.filterBtns?.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateLibraryUI(btn.dataset.filter);
        });
    });
    
    // Settings
    elements.settingsLink?.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('settings');
        elements.userDropdown?.classList.add('hidden');
    });
    
    elements.logoutLink?.addEventListener('click', (e) => {
        e.preventDefault();
        handleProfileBtn();
        elements.userDropdown?.classList.add('hidden');
    });
    
    // Settings toggles
    [elements.crossfadeToggle, elements.autoplayToggle, elements.explicitToggle,
     elements.privateSessionToggle, elements.shareActivityToggle, 
     elements.newReleasesToggle, elements.playlistUpdatesToggle].forEach(toggle => {
        toggle?.addEventListener('change', saveSettings);
    });
    
    elements.qualitySelect?.addEventListener('change', saveSettings);
    
    // User menu
    elements.userMenuBtn?.addEventListener('click', () => {
        elements.userDropdown?.classList.toggle('hidden');
    });
    
    // Explore button
    elements.exploreBtn?.addEventListener('click', () => {
        navigateTo('search');
    });
    
    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-menu')) {
            elements.userDropdown?.classList.add('hidden');
        }
        hideContextMenu();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowLeft':
                if (e.ctrlKey || e.metaKey) playPrevious();
                break;
            case 'ArrowRight':
                if (e.ctrlKey || e.metaKey) playNext();
                break;
            case 'ArrowUp':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    setVolume(Math.min(100, (state.volume * 100) + 5));
                }
                break;
            case 'ArrowDown':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    setVolume(Math.max(0, (state.volume * 100) - 5));
                }
                break;
            case 'KeyL':
                toggleLikeSong();
                break;
            case 'KeyQ':
                toggleQueue();
                break;
            case 'Escape':
                closeAllModals();
                elements.queuePanel?.classList.add('hidden');
                elements.lyricsPanel?.classList.add('hidden');
                break;
        }
    });
    
    // Playlist items
    document.addEventListener('click', (e) => {
        const playlistItem = e.target.closest('.playlist-item');
        if (playlistItem) {
            e.preventDefault();
            const playlistId = playlistItem.dataset.playlist;
            if (playlistId) openPlaylist(playlistId);
        }
        
        const libraryItem = e.target.closest('.library-item');
        if (libraryItem) {
            const type = libraryItem.dataset.type;
            const id = libraryItem.dataset.id;
            if (type === 'playlist') openPlaylist(id);
        }
        
        const songRow = e.target.closest('.song-row');
        if (songRow) {
            const songId = songRow.dataset.id;
            const playBtn = e.target.closest('.song-play');
            const likeBtn = e.target.closest('.song-like');
            const moreBtn = e.target.closest('.song-more');
            
            if (playBtn) {
                e.stopPropagation();
                playSong(songId);
            } else if (likeBtn) {
                e.stopPropagation();
                const song = state.searchResults.find(s => s.id === songId) || 
                            state.likedSongs.find(s => s.id === songId) ||
                            state.queue.find(s => s.id === songId);
                if (song) toggleLikeSong(song);
            } else if (moreBtn) {
                e.stopPropagation();
                const song = state.searchResults.find(s => s.id === songId) || 
                            state.likedSongs.find(s => s.id === songId) ||
                            state.queue.find(s => s.id === songId);
                if (song) showContextMenu(e, song);
            }
        }
        
        // Category cards
        const categoryCard = e.target.closest('.category-card');
        if (categoryCard) {
            const category = categoryCard.dataset.category;
            if (category && elements.searchInput) {
                elements.searchInput.value = category;
                handleSearch();
                navigateTo('search');
            }
        }
    });
    
    // Context menu actions
    document.querySelectorAll('.context-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            const songId = elements.contextMenu.dataset.songId;
            const song = state.searchResults.find(s => s.id === songId) ||
                        state.likedSongs.find(s => s.id === songId) ||
                        state.queue.find(s => s.id === songId);
            
            switch (action) {
                case 'addToQueue':
                    if (song) addToQueue(song);
                    break;
                case 'saveToLiked':
                    if (song) toggleLikeSong(song);
                    break;
                case 'share':
                    toggleShare();
                    break;
                case 'addToPlaylist':
                    if (song) {
                        const list = document.getElementById('playlistSelectList');
                        list.innerHTML = state.playlists.map(p => `
                            <div class="playlist-select-item" data-id="${p.id}">${p.name}</div>
                        `).join('');
                        openModal(elements.addToPlaylistModal);
                    }
                    break;
            }
            hideContextMenu();
        });
    });
    
    // Add to playlist from modal
    document.getElementById('playlistSelectList')?.addEventListener('click', (e) => {
        const item = e.target.closest('.playlist-select-item');
        if (item) {
            const playlistId = item.dataset.id;
            const songId = elements.contextMenu.dataset.songId;
            const song = state.searchResults.find(s => s.id === songId) ||
                        state.likedSongs.find(s => s.id === songId) ||
                        state.queue.find(s => s.id === songId);
            if (song) {
                addSongToPlaylist(playlistId, song);
                closeModal(elements.addToPlaylistModal);
            }
        }
    });
    
    document.getElementById('newPlaylistFromModal')?.addEventListener('click', () => {
        closeModal(elements.addToPlaylistModal);
        openModal(elements.createPlaylistModal);
    });
    
    document.getElementById('addToPlaylistClose')?.addEventListener('click', () => {
        closeModal(elements.addToPlaylistModal);
    });
    
    // Touch swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 100;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next song
                playNext();
            } else {
                // Swipe right - previous song
                playPrevious();
            }
        }
    }
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    initElements();
    initPWA();
    initUser();
    initPlaylists();
    initLikedSongs();
    initSettings();
    initPlayer();
    initEventListeners();
    loadHomeContent();
    loadCategories();
    
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    }
    
    console.log('🎵 Vibe Music App - Mobile Friendly');
    console.log('✅ All features loaded');
}

// Start
document.addEventListener('DOMContentLoaded', init);

// Expose functions globally
window.playSong = playSong;
window.togglePlayPause = togglePlayPause;
window.toggleLikeSong = toggleLikeSong;
      
  
