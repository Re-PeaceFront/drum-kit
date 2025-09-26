// --- Futuristic UI/UX Enhancements ---
// Inject Google Font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Apply gradient background
document.body.style.background = 'linear-gradient(135deg, #1e1e2f 0%, #121212 100%)';

// Neon button colors
const neonColors = ['#00ffe7', '#ff4081', '#00ff99', '#fffd38', '#ff00c8', '#00bfff', '#ff6f00'];
const drumButtons = document.querySelectorAll('.drum');
drumButtons.forEach((btn, i) => {
	btn.style.background = '#2a2a40';
	btn.style.borderRadius = '50%';
	btn.style.boxShadow = `0 0 20px ${neonColors[i % neonColors.length]}`;
	btn.style.color = neonColors[i % neonColors.length];
	btn.style.fontFamily = 'Orbitron, Arial, sans-serif';
	btn.style.transition = 'box-shadow 0.2s, transform 0.2s';
});

// --- Sound Mapping ---
const soundMap = {
	'w': { file: 'sounds/tom-1.mp3', label: 'Tom 1' },
	'a': { file: 'sounds/tom-2.mp3', label: 'Tom 2' },
	's': { file: 'sounds/tom-3.mp3', label: 'Tom 3' },
	'd': { file: 'sounds/tom-4.mp3', label: 'Tom 4' },
	'j': { file: 'sounds/snare.mp3', label: 'Snare' },
	'k': { file: 'sounds/crash.mp3', label: 'Crash' },
	'l': { file: 'sounds/kick-bass.mp3', label: 'Kick' }
};

// --- Responsive Controls Container ---
const controlsContainer = document.createElement('div');
controlsContainer.style.position = 'fixed';
controlsContainer.style.bottom = '20px';
controlsContainer.style.left = '50%';
controlsContainer.style.transform = 'translateX(-50%)';
controlsContainer.style.display = 'flex';
controlsContainer.style.flexWrap = 'wrap';
controlsContainer.style.gap = '18px';
controlsContainer.style.zIndex = '1000';
controlsContainer.style.justifyContent = 'center';
controlsContainer.style.alignItems = 'center';
controlsContainer.style.width = 'min(95vw, 600px)';
document.body.appendChild(controlsContainer);

// --- Volume Control ---
let volume = Number(localStorage.getItem('drumkit-volume')) || 0.7;
const volumeSlider = document.createElement('input');
volumeSlider.type = 'range';
volumeSlider.min = '0';
volumeSlider.max = '1';
volumeSlider.step = '0.01';
volumeSlider.value = volume;
volumeSlider.style.width = '120px';
volumeSlider.style.background = '#222';
volumeSlider.style.borderRadius = '8px';
volumeSlider.title = 'Volume';
controlsContainer.appendChild(volumeSlider);
volumeSlider.addEventListener('input', e => {
	volume = Number(e.target.value);
	localStorage.setItem('drumkit-volume', volume);
});

// --- Floating Sound Label ---
const soundLabel = document.createElement('div');
soundLabel.style.position = 'fixed';
soundLabel.style.left = '50%';
soundLabel.style.top = '10%';
soundLabel.style.transform = 'translate(-50%, 0)';
soundLabel.style.fontSize = '2.5rem';
soundLabel.style.fontFamily = 'Orbitron, Arial, sans-serif';
soundLabel.style.color = '#00ffe7';
soundLabel.style.textShadow = '0 0 20px #00ffe7';
soundLabel.style.opacity = '0';
soundLabel.style.pointerEvents = 'none';
soundLabel.style.transition = 'opacity 0.3s';
document.body.appendChild(soundLabel);

function showSoundLabel(label) {
	soundLabel.textContent = label;
	soundLabel.style.opacity = '1';
	setTimeout(() => {
		soundLabel.style.opacity = '0';
	}, 400);
}

// --- Ripple Effect ---
function rippleEffect(button) {
	const ripple = document.createElement('span');
	ripple.style.position = 'absolute';
	ripple.style.left = '50%';
	ripple.style.top = '50%';
	ripple.style.transform = 'translate(-50%, -50%)';
	ripple.style.width = '120px';
	ripple.style.height = '120px';
	ripple.style.borderRadius = '50%';
	ripple.style.background = 'rgba(0,255,231,0.3)';
	ripple.style.boxShadow = '0 0 30px #00ffe7';
	ripple.style.pointerEvents = 'none';
	ripple.style.animation = 'ripple 0.4s linear';
	ripple.style.zIndex = '10';
	button.style.position = 'relative';
	button.appendChild(ripple);
	setTimeout(() => ripple.remove(), 400);
}

// --- Play Sound ---
function playSound(key) {
	const soundObj = soundMap[key];
	if (soundObj) {
		const audio = new Audio(soundObj.file);
		audio.volume = volume;
		audio.play();
		showSoundLabel(soundObj.label);
	}
}

// --- Animate Button ---
function animateButton(key) {
	const button = document.querySelector('.' + key);
	if (button) {
		button.classList.add('pressed');
		rippleEffect(button);
		button.style.boxShadow = `0 0 40px #ff4081, 0 0 80px #00ffe7`;
		button.style.transform = 'scale(1.08)';
		setTimeout(() => {
			button.classList.remove('pressed');
			button.style.boxShadow = `0 0 20px ${neonColors[Array.from(drumButtons).indexOf(button) % neonColors.length]}`;
			button.style.transform = 'scale(1)';
		}, 170);
	}
}

// --- Recording & Playback ---
let isRecording = false;
let recordedSequence = [];
let recordStart = 0;

const recordBtn = document.createElement('button');
recordBtn.textContent = '● Record';
recordBtn.style.background = '#ff4081';
recordBtn.style.color = '#fff';
recordBtn.style.fontFamily = 'Orbitron, Arial, sans-serif';
recordBtn.style.fontSize = '1.2rem';
recordBtn.style.border = 'none';
recordBtn.style.borderRadius = '8px';
recordBtn.style.padding = '10px 24px';
recordBtn.style.boxShadow = '0 0 10px #ff4081';
recordBtn.style.cursor = 'pointer';
controlsContainer.appendChild(recordBtn);

const playBtn = document.createElement('button');
playBtn.textContent = '▶ Play';
playBtn.style.background = '#00ffe7';
playBtn.style.color = '#222';
playBtn.style.fontFamily = 'Orbitron, Arial, sans-serif';
playBtn.style.fontSize = '1.2rem';
playBtn.style.border = 'none';
playBtn.style.borderRadius = '8px';
playBtn.style.padding = '10px 24px';
playBtn.style.boxShadow = '0 0 10px #00ffe7';
playBtn.style.cursor = 'pointer';
controlsContainer.appendChild(playBtn);

recordBtn.addEventListener('click', () => {
	isRecording = !isRecording;
	recordedSequence = [];
	recordStart = Date.now();
	recordBtn.textContent = isRecording ? '■ Stop' : '● Record';
	recordBtn.style.background = isRecording ? '#fffd38' : '#ff4081';
});

playBtn.addEventListener('click', () => {
	if (recordedSequence.length === 0) return;
	let start = Date.now();
	recordedSequence.forEach(item => {
		setTimeout(() => {
			playSound(item.key);
			animateButton(item.key);
		}, item.time);
	});
});

function recordHit(key) {
	if (isRecording && soundMap[key]) {
		recordedSequence.push({ key, time: Date.now() - recordStart });
	}
}

// --- Metronome ---
let metronomeInterval = null;
let bpm = 120;
const metronomeBtn = document.createElement('button');
metronomeBtn.textContent = '⏱ Metronome';
metronomeBtn.style.background = '#00ff99';
metronomeBtn.style.color = '#222';
metronomeBtn.style.fontFamily = 'Orbitron, Arial, sans-serif';
metronomeBtn.style.fontSize = '1.2rem';
metronomeBtn.style.border = 'none';
metronomeBtn.style.borderRadius = '8px';
metronomeBtn.style.padding = '10px 24px';
metronomeBtn.style.boxShadow = '0 0 10px #00ff99';
metronomeBtn.style.cursor = 'pointer';
controlsContainer.appendChild(metronomeBtn);

const bpmInput = document.createElement('input');
bpmInput.type = 'number';
bpmInput.value = bpm;
bpmInput.min = '40';
bpmInput.max = '240';
bpmInput.style.width = '70px';
bpmInput.style.fontFamily = 'Orbitron, Arial, sans-serif';
bpmInput.style.fontSize = '1.2rem';
bpmInput.style.borderRadius = '8px';
bpmInput.style.border = 'none';
bpmInput.style.padding = '10px 8px';
controlsContainer.appendChild(bpmInput);

metronomeBtn.addEventListener('click', () => {
	if (metronomeInterval) {
		clearInterval(metronomeInterval);
		metronomeInterval = null;
		metronomeBtn.textContent = '⏱ Metronome';
		return;
	}
	metronomeBtn.textContent = '■ Stop Metronome';
	metronomeInterval = setInterval(() => {
		const tick = new Audio('sounds/snare.mp3');
		tick.volume = 0.3;
		tick.play();
		showSoundLabel('Metronome');
	}, 60000 / bpm);
});

bpmInput.addEventListener('input', e => {
	bpm = Math.max(40, Math.min(240, Number(e.target.value)));
	if (metronomeInterval) {
		clearInterval(metronomeInterval);
		metronomeInterval = setInterval(() => {
			const tick = new Audio('sounds/snare.mp3');
			tick.volume = 0.3;
			tick.play();
			showSoundLabel('Metronome');
		}, 60000 / bpm);
	}
});

// --- Key Remapping (Optional, basic UI) ---
// (Not implemented for brevity, but can be added with a modal and localStorage)

// --- Event Handlers ---
drumButtons.forEach(button => {
	button.addEventListener('click', function(e) {
		const key = this.textContent.trim().toLowerCase();
		playSound(key);
		animateButton(key);
		recordHit(key);
	});
});

document.addEventListener('keydown', function(event) {
	const key = event.key.toLowerCase();
	if (soundMap[key]) {
		playSound(key);
		animateButton(key);
		recordHit(key);
	}
	// Ignore all other keys, including 'i'
});
