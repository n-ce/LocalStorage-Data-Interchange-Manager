const input = document.getElementsByTagName('input');
const display = document.getElementsByTagName('article')[0];
const table = document.querySelector('tbody');

let arr = [];
let obj;

let Push = () => {
  if (input[0].value !== '' && input[1].value !== '') {
    obj = {
      val1: input[0].value,
      val2: input[1].value
    };
    table.innerHTML += `<tr><td>${obj.val1}</td><td>${obj.val2}</td></tr>`;
    arr.push(obj);
  }
}

let Export = () => {
  if (obj != '') {
    const textToBLOB = new Blob([JSON.stringify(arr)], { type: 'application/json' });
    let newLink = document.createElement("a");
    newLink.download = `data_${Math.floor(Math.random() * 999)}.json`;
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

let Import = async file => {
  arr = arr.concat(JSON.parse(await file.text()));
  for (const x of arr) {
    table.innerHTML = `<tr><td>${x.val1}</td><td>${x.val2}</td></tr>`;
  }
}