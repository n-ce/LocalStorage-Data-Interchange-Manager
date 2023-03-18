const inputKey = document.getElementById('inputKey');
const inputVal = document.getElementById('inputVal');
const table = document.getElementById('table');
const data = new Map();
const lsData = JSON.parse(localStorage.getItem('data'));

const insert = (key, val) => {
	const eraseBtn = document.createElement('a'),
		newRow = table.insertRow(-1),
		newKey = newRow.insertCell(0),
		newVal = newRow.insertCell(1),
		newBtn = newRow.insertCell(2);

	newKey.textContent = key;
	newVal.textContent = val;

	eraseBtn.textContent = 'x';
	eraseBtn.href = '#';
	eraseBtn.setAttribute('role', 'button');
	eraseBtn.addEventListener('click', (event) => {
		data.delete(key);
		// table.deleteRow(event.target.parentNode.parentNode.rowIndex);
		table.deleteRow(lsData.findIndex(e => e[0] === key));
		localStorage.setItem('data', JSON.stringify([...data]));
	});

	newBtn.appendChild(eraseBtn);
}
const update = (key, value) => {
	data.has(key) ?
		table.rows[lsData.findIndex(k => k[0] === key)].cells[1].textContent = value :
		insert(key, value);

	data.set(key, value);
	localStorage.setItem('data', JSON.stringify([...data]));
}

if (lsData)
	for (const [k, v] of lsData)
		update(k, v);

document.forms[0].addEventListener('submit', (event) => {
	event.preventDefault();
	update(inputKey.value, inputVal.value);
})

document.getElementById('eraseAllBtn').addEventListener('click', () => {
	data.clear();
	localStorage.clear();
	while (table.rows.length > 0)
		table.deleteRow(0)
});

const importBtn = document.getElementById('importBtn');

importBtn.addEventListener('change', async () => {
	const imported_data = JSON.parse(await importBtn.files[0].text());
	for (const [k, v] of imported_data)
		update(k, v);
});

document.getElementById('exportBtn').addEventListener('click', () => {
	if (data.size) {
		const textToBLOB = new Blob([localStorage.getItem('data')], { type: 'application/json' });
		let newLink = document.createElement("a");
		newLink.download = 'LSJD.json';
		if (window.webkitURL)
			newLink.href = window.webkitURL.createObjectURL(textToBLOB);
		else {
			newLink.href = window.URL.createObjectURL(textToBLOB);
			newLink.style.display = "none";
			document.body.appendChild(newLink);
		}
		newLink.click();
	}
})