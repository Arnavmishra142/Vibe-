const api = "https://saavn.dev/api";
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playPauseBtn');
const resultsArea = document.getElementById('resultsArea');
let currentSongUrl = "";

// 1. Search Function
document.getElementById('searchInput').addEventListener('input', async (e) => {
    const query = e.target.value;
    if(query.length < 2) return;

    try {
        const res = await fetch(`${api}/search/songs?query=${query}`);
        const data = await res.json();
        
        if(data.data.results) {
            renderSongs(data.data.results);
        }
    } catch(err) { console.log(err); }
});

// 2. Show Songs on Screen
function renderSongs(songs) {
    resultsArea.innerHTML = "";
    songs.forEach(song => {
        // High Quality Image & Audio find karo
        const img = song.image[2]?.url || song.image[1]?.url;
        const downloadUrl = song.downloadUrl.find(u => u.quality === '320kbps')?.url || song.downloadUrl[0].url;
        const artist = song.primaryArtists || song.artists[0].name;

        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <img src="${img}">
            <div class="song-details">
                <div class="s-title">${song.name}</div>
                <div class="s-artist">${artist}</div>
            </div>
            <div>▶</div>
        `;
        
        // Click karne pe play
        card.onclick = () => playMusic(song.name, artist, img, downloadUrl);
        resultsArea.appendChild(card);
    });
}

// 3. Play Music Logic
function playMusic(name, artist, img, url) {
    // Update Player UI
    document.getElementById('title').innerText = name;
    document.getElementById('artist').innerText = artist;
    document.getElementById('thumb').src = img;
    
    // Play Audio
    audio.src = url;
    audio.play();
    currentSongUrl = url;
    
    playBtn.innerText = "⏸";
}

// 4. Play/Pause Button
playBtn.onclick = () => {
    if(audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
};

// 5. Download Feature
document.getElementById('downloadBtn').onclick = () => {
    if(!currentSongUrl) return alert("Play a song first!");
    
    const a = document.createElement('a');
    a.href = currentSongUrl;
    a.target = '_blank';
    a.download = "song.mp3"; // Note: Browsers might just open player
    a.click();
};
