const table = document.querySelector('tbody');

let n = 0;
let arr = [];
let obj;

let Push = (l, m) => {
  if (l != '') {
    obj = { val1: l, val2: m };
    n = 0;
    arr.forEach((e, i) => {
      e.val1 == obj.val1 ?
        document.getElementsByTagName('td')[(i * 2) + 1].innerText = e.val2 = obj.val2 :
        n++;
    });
    if (n == arr.length) {
      table.innerHTML += `<tr><td>${obj.val1}</td><td>${obj.val2}</td></tr>`;
      arr.push(obj);
    }
    localStorage.setItem('data', JSON.stringify(arr));
  }
}

let Export = () => {
  if (obj != '') {
    const textToBLOB = new Blob([JSON.stringify(arr)], { type: 'application/json' });
    let newLink = document.createElement("a");
    newLink.download = `LSJDI_${Math.floor(Math.random() * 999)}.json`;
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

let Import = (val) => {
  arr = arr.concat(JSON.parse(val));
  table.innerHTML = null;
  for (const x of arr)
    table.innerHTML += `<tr><td>${x.val1}</td><td>${x.val2}</td></tr>`;
}

if (localStorage.getItem('data') != null) {
  Import(localStorage.getItem('data'));
}

