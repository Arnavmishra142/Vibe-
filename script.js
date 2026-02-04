/**
 * VIBE MUSIC APP - FULL WORKING SCRIPT
 * Local Profile + JioSaavn API + Audio Player + Download
 */

const API_BASE = "https://saavn.dev/api";

/* ---------------- GLOBAL STATE ---------------- */
const state = {
  user: null,
  currentSong: null,
  isPlaying: false,
  searchResults: [],
};

/* ---------------- DOM ELEMENTS ---------------- */
const elements = {
  // Profile
  profileLabel: document.getElementById("profileLabel"),
  profileName: document.getElementById("profileName"),
  profileBtn: document.getElementById("profileBtn"),

  // Modal
  loginModal: document.getElementById("loginModal"),
  modalClose: document.getElementById("modalClose"),
  loginForm: document.getElementById("loginForm"),
  userName: document.getElementById("userName"),
  userEmail: document.getElementById("userEmail"),

  // Search
  searchInput: document.getElementById("searchInput"),
  searchClear: document.getElementById("searchClear"),
  searchResultsSection: document.getElementById("searchResultsSection"),
  searchResultsGrid: document.getElementById("searchResultsGrid"),
  recentlyPlayedSection: document.getElementById("recentlyPlayedSection"),
  madeForYouSection: document.getElementById("madeForYouSection"),

  // Player
  audioPlayer: document.getElementById("audioPlayer"),
  playPauseBtn: document.getElementById("playPauseBtn"),
  playIcon: document.getElementById("playIcon"),
  pauseIcon: document.getElementById("pauseIcon"),
  playerThumbnail: document.getElementById("playerThumbnail"),
  playerTitle: document.getElementById("playerTitle"),
  playerArtist: document.getElementById("playerArtist"),

  // Download
  downloadBtn: document.getElementById("downloadBtn"),
};

/* ---------------- LOCAL STORAGE ---------------- */
const Storage = {
  KEY: "vibe_user",

  get() {
    return JSON.parse(localStorage.getItem(this.KEY));
  },

  save(user) {
    localStorage.setItem(this.KEY, JSON.stringify(user));
  },

  clear() {
    localStorage.removeItem(this.KEY);
  },
};

/* ---------------- PROFILE SYSTEM ---------------- */
function initUser() {
  const saved = Storage.get();
  if (saved) {
    state.user = saved;
    updateProfileUI();
  }
}

function updateProfileUI() {
  if (state.user) {
    elements.profileLabel.textContent = "Hi,";
    elements.profileName.textContent = state.user.name;
    elements.profileBtn.textContent = "Logout";
  } else {
    elements.profileLabel.textContent = "Guest User";
    elements.profileName.textContent = "";
    elements.profileBtn.textContent = "Login / Create Profile";
  }
}

function openModal() {
  elements.loginModal.classList.add("active");
}

function closeModal() {
  elements.loginModal.classList.remove("active");
  elements.loginForm.reset();
}

elements.profileBtn.addEventListener("click", () => {
  if (state.user) {
    Storage.clear();
    state.user = null;
    updateProfileUI();
  } else {
    openModal();
  }
});

elements.modalClose.addEventListener("click", closeModal);

elements.loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = elements.userName.value.trim();
  const email = elements.userEmail.value.trim();

  if (!name || !email) return alert("Enter name + email");

  state.user = { name, email };
  Storage.save(state.user);

  updateProfileUI();
  closeModal();
});

/* ---------------- SONG SEARCH ---------------- */
async function searchSongs(query) {
  const res = await fetch(
    `${API_BASE}/search/songs?query=${encodeURIComponent(query)}`
  );

  const data = await res.json();

  if (data.success) return data.data.results;
  return [];
}

async function handleSearch() {
  const query = elements.searchInput.value.trim();

  if (query.length < 2) return;

  elements.searchClear.classList.add("visible");

  const results = await searchSongs(query);
  state.searchResults = results;

  displayResults(results);
}

function displayResults(results) {
  elements.searchResultsSection.style.display = "block";
  elements.recentlyPlayedSection.style.display = "none";
  elements.madeForYouSection.style.display = "none";

  elements.searchResultsGrid.innerHTML = results
    .map(
      (song) => `
    <div class="card" onclick="playSong('${song.id}')">
      <div class="card-image">
        <img src="${
          song.image?.[2]?.url ||
          "https://via.placeholder.com/300"
        }" />
      </div>
      <h3 class="card-title">${song.name}</h3>
      <p class="card-subtitle">${song.primaryArtists}</p>
    </div>
  `
    )
    .join("");
}

elements.searchInput.addEventListener("input", debounce(handleSearch, 500));

elements.searchClear.addEventListener("click", () => {
  elements.searchInput.value = "";
  elements.searchResultsSection.style.display = "none";
  elements.recentlyPlayedSection.style.display = "block";
  elements.madeForYouSection.style.display = "block";
});

/* ---------------- FIXED PLAY FUNCTION ---------------- */

/**
 * Search endpoint does NOT provide downloadUrl.
 * We must fetch song details first.
 */
async function getSongDetails(songId) {
  const res = await fetch(`${API_BASE}/songs/${songId}`);
  const data = await res.json();

  if (data.success && data.data.length > 0) {
    return data.data[0];
  }
  return null;
}

function getBestDownloadUrl(downloadUrls) {
  if (!downloadUrls) return null;

  return (
    downloadUrls.find((u) => u.quality === "320kbps")?.url ||
    downloadUrls[0]?.url
  );
}

async function playSong(songId) {
  const fullSong = await getSongDetails(songId);

  if (!fullSong) return alert("Song not found");

  const audioUrl = getBestDownloadUrl(fullSong.downloadUrl);

  if (!audioUrl) return alert("Audio not available");

  state.currentSong = {
    name: fullSong.name,
    artist: fullSong.primaryArtists,
    image: fullSong.image?.[2]?.url,
    url: audioUrl,
  };

  // Update Player UI
  elements.playerTitle.textContent = state.currentSong.name;
  elements.playerArtist.textContent = state.currentSong.artist;
  elements.playerThumbnail.src = state.currentSong.image;

  // Play Audio
  elements.audioPlayer.src = audioUrl;

  try {
    await elements.audioPlayer.play();
    state.isPlaying = true;
    updatePlayPauseUI();
  } catch (err) {
    alert("Tap Play button once. Autoplay is blocked.");
  }
}

/* ---------------- PLAY PAUSE BUTTON ---------------- */
function updatePlayPauseUI() {
  if (state.isPlaying) {
    elements.playIcon.style.display = "none";
    elements.pauseIcon.style.display = "block";
  } else {
    elements.playIcon.style.display = "block";
    elements.pauseIcon.style.display = "none";
  }
}

elements.playPauseBtn.addEventListener("click", () => {
  if (!state.currentSong) return;

  if (state.isPlaying) {
    elements.audioPlayer.pause();
    state.isPlaying = false;
  } else {
    elements.audioPlayer.play();
    state.isPlaying = true;
  }

  updatePlayPauseUI();
});

/* ---------------- DOWNLOAD BUTTON ---------------- */
elements.downloadBtn.addEventListener("click", async () => {
  if (!state.currentSong) return alert("No song playing");

  const res = await fetch(state.currentSong.url);
  const blob = await res.blob();

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.currentSong.name}.mp3`;
  link.click();
});

/* ---------------- UTIL ---------------- */
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

/* ---------------- INIT ---------------- */
function init() {
  initUser();
  updateProfileUI();
  console.log("✅ Vibe Music App Ready");
}

document.addEventListener("DOMContentLoaded", init);

/* Expose playSong globally */
window.playSong = playSong;
