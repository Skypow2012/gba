const keyMaps = {
	'ArrowUp': '↑',
	'ArrowDown': '↓',
	'ArrowLeft': '←',
	'ArrowRight': '→',
	' ': 'Space',
}

const ctls = [
	'Start',
	'Select',
	'A',
	'B',
	'L',
	'R',
	'↑',
	'→',
	'↓',
	'←',
	'加速',
]

let ctlTars;
if (window.utools) {
	window.utools.onPluginReady(function() {
		if (window.utools.db.get('ctlTars')) {
			ctlTars = JSON.parse(window.utools.db.get('ctlTars').data);
			renderCtlList()
		}
	})
} else if (localStorage) {
	if (localStorage.ctlTars) ctlTars = JSON.parse(localStorage.ctlTars)
}
if (!ctlTars) {
	ctlTars = [
		'Enter|13',
		'\\|220',
		'z|90',
		'x|88',
		'a|65',
		's|83',
		'ArrowUp|38',
		'ArrowRight|39',
		'ArrowDown|40',
		'ArrowLeft|37',
		'Space|32'
	]
}

function startSetCtl(idx) {
	window.ctlIdx = idx;
	let user = '';
	if (idx < 8) user = 'P1'
	else if (idx < 16) user = 'P2'
}

function addCtl(ctl, idx, box) {
	const tr = document.createElement('tr');
	let ctlTar = (ctlTars[idx] || '').split('|')[0];
	ctlTar = keyMaps[ctlTar] || ctlTar;
	tr.innerHTML = `<td>${ctl}</td><td class="ctlSet" onmouseover={startSetCtl(${idx})}>${ctlTar}</td>`
	if (ctlTar === '双击') {
		tr.ondblclick = changeScreen;
	}
	box.appendChild(tr)
}

function renderCtlList() {
	const boxId = 'mapping'
	const box = document.getElementById(boxId);
	box.innerHTML = '';
	box.onmouseleave = () => {
		delete window.ctlIdx;
	}
	ctls.map((ctl, idx) => addCtl(ctl, idx, box))
	ctlTars[-1] = '双击'
	addCtl('全屏', -1, box);
}
