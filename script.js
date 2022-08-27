const input = document.getElementsByTagName('input');
const display = document.getElementsByTagName('article')[0];
const table = document.querySelector('tbody');


let n = 0;
let arr = [];
let obj;

let update = (v1, v2, v3) => {
  if (n == arr.length) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.innerText = v1;
    td2.innerText = v2;
    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr)
    arr.push(v3);
    localStorage.setItem('data', JSON.stringify(arr))
  }
}

let Push = (m, n) => {
  if (m != '') {
    obj = { val1: m, val2: n };
    n = 0;
    arr.forEach((e, i) => {
      e.val1 == obj.val1 ?
        document.getElementsByTagName('td')[(i * 2) + 1].innerText = e.val2 = obj.val2 :
        n++;
    });
    update(obj.val1, obj.val2, obj);
  }
}

let Export = () => {
  if (obj != '') {
    const textToBLOB = new Blob([JSON.stringify(arr)], { type: 'application/json' });
    let newLink = document.createElement("a");
    newLink.download = `LSDI_${Math.floor(Math.random() * 999)}.json`;
    if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
      newLink.href = window.URL.createObjectURL(textToBLOB);
      newLink.style.display = "none";
      document.body.appendChild(newLink);
    }
    newLink.click();
  }
}

let load = () => {
  n = arr.length;
  for (const x of arr) {
    table.innerHTML += `<tr><td>${x.val1}</td><td>${x.val2}</td></tr>`;
  }
}
let Import = async file => {
  arr = arr.concat(JSON.parse(await file.text()));
  load();
}

if (localStorage.getItem('data') != null) {
  arr = JSON.parse(localStorage.getItem('data'));
  load();
}