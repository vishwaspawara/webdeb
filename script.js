let zCounter = 10;
let windowCount = 0;
let windows = {};
let minimizedWindows = [];

const apps = [
	"calci.html",
	"notes.html",
	"music.html",
	"galary.html"
];

document.getElementById('appSearchBtn').addEventListener('click', showAppList);
document.getElementById('showWindowsBtn').addEventListener('click', showWindowsList);

function showAppList() {
	const list = document.getElementById('appList');

	list.innerHTML = "";
	apps.forEach(app => { let b = document.createElement("button");
			b.textContent = app.replace(".html", "");
			b.onclick = () => {
			createAppWindow(app);
			list.style.display = "none";
			};
			list.appendChild(b);
			});

	list.style.display = list.style.display === "block" ? "none" : "block";
	list.style.zIndex = ++zCounter;
}

function createAppWindow(appFile) {
	windowCount++;
	const id = 'win_' + windowCount;

	const win = document.createElement('div');
	win.className = 'window';
	win.dataset.id = id;

	// Start in quarter mode
	win.style.width = window.innerWidth / 2 + 'px';
	win.style.height = window.innerHeight / 2 + 'px';
	win.style.left = 50 + windowCount * 20 + 'px';
	win.style.top = 50 + windowCount * 20 + 'px';
	win.style.zIndex = zCounter++;

	win.innerHTML = `
		<div class="titlebar">
		<span>${appFile}</span> <div class="buttons">
		<button class="minimize">—</button>
		<button class="toggleSize">▢</button>
		<button class="close">❌</button>
		</div>
		</div>

		<div class="content">
		<iframe src="app/${appFile}" style="width:100%;height:100%;border:none;"></iframe>
		</div>
		`;

	document.body.appendChild(win);

	windows[id] = { 
element: win, 
	 title: appFile,
	 minimized: false,
	 mode: 'quarter'
	};

	makeWindowInteractive(win);
}

function makeWindowInteractive(win) {
	const title = win.querySelector('.titlebar');
	const minimize = win.querySelector('.minimize');
	const toggleSize = win.querySelector('.toggleSize');
	const closeBtn = win.querySelector('.close');
	const id = win.dataset.id;

	win.addEventListener('mousedown', () => win.style.zIndex = ++zCounter);

	// --- Dragging logic ---
	let offsetX, offsetY, isDragging = false;
	title.addEventListener('mousedown', e => {
			isDragging = true;
			offsetX = e.clientX - win.offsetLeft;
			offsetY = e.clientY - win.offsetTop;
			win.style.zIndex = ++zCounter;
			});
	document.addEventListener('mouseup', () => isDragging = false);
	document.addEventListener('mousemove', e => {
			if (!isDragging) return;
			let newLeft = e.clientX - offsetX;
			let newTop = e.clientY - offsetY;
			const maxLeft = window.innerWidth - win.offsetWidth;
			const maxTop = window.innerHeight - win.offsetHeight;
			win.style.left = Math.min(Math.max(newLeft, 0), maxLeft) + 'px';
			win.style.top = Math.min(Math.max(newTop, 0), maxTop) + 'px';
			});

	// --- Toggle fullscreen/quarter ---
	toggleSize.onclick = () => {
		const state = windows[id];
		if (state.mode === 'quarter') {
			win.style.width = window.innerWidth + 'px';
			win.style.height = window.innerHeight + 'px';
			win.style.left = '0px';
			win.style.top = '0px';
			state.mode = 'fullscreen';
			toggleSize.textContent = '▢';
		} else {
			win.style.width = window.innerWidth / 2 + 'px';
			win.style.height = window.innerHeight / 2 + 'px';
			win.style.left = '50px';
			win.style.top = '50px';
			state.mode = 'quarter';
			toggleSize.textContent = '▢';
		}
	};

	// --- Minimize hides window ---
	minimize.onclick = () => {
		win.style.display = 'none';
		windows[id].minimized = true;
		if (!minimizedWindows.includes(id)) minimizedWindows.push(id);
	};

	// --- Close deletes the window entirely ---
	closeBtn.onclick = () => {
		delete windows[id];
		minimizedWindows = minimizedWindows.filter(w => w !== id);
		win.remove();
	};
}

// 🪟 Show window list
function showWindowsList() {
	const listDiv = document.getElementById('windowList');
	listDiv.innerHTML = '';

	const allWindows = Object.entries(windows);
	if (allWindows.length === 0) {
		listDiv.textContent = 'No windows open.';
		listDiv.style.display = 'block';
		listDiv.style.zIndex = ++zCounter;
		return;
	}

	const sorted = [
		...minimizedWindows.map(id => [id, windows[id]]),
		...allWindows.filter(([id, w]) => !w.minimized)
	];

	sorted.forEach(([id, info]) => {
			if (!info) return; // skip deleted
			const btn = document.createElement('button');
			btn.textContent = info.title + (info.minimized ? ' (hidden)' : '');
			btn.onclick = () => {
			info.element.style.display = 'block';
			info.element.style.zIndex = ++zCounter;
			info.minimized = false;
			minimizedWindows = minimizedWindows.filter(w => w !== id);
			listDiv.style.display = 'none';
			};
			listDiv.appendChild(btn);
			});

	listDiv.style.display = listDiv.style.display === 'block' ? 'none' : 'block';
	listDiv.style.zIndex = ++zCounter;
}

function updateDateTime() {
			const now = new Date();

			// Extract individual parts
			const day = String(now.getDate()).padStart(2, '0');
			const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-11
			const year = now.getFullYear();

			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			const seconds = String(now.getSeconds()).padStart(2, '0');

			// Build the final string in dd-mm-yyyy hh:mm:ss format
			const formatted = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

			document.getElementById('datetime').textContent = formatted;
		}

		// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);
