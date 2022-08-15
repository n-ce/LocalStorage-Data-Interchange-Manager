const input = document.getElementsByTagName('input');
const display = document.getElementsByTagName('article')[0];
let obj = [];


let Push = () => {
  if (input[0].value !== '' && input[1].value !== '') {

    obj.push(`{ "val1": "${input[0].value}", "val2": "${input[1].value}"}`);
    display.innerHTML = obj;
  }
}

let Export = () => {
  if (obj != '') {
    const textToBLOB = new Blob(['[' + obj + ']'], { type: 'application/json' });

    let newLink = document.createElement("a");

    newLink.download = `data_${Math.pow(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))}.json`;

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

async function loadFile(file) {
  obj.push(JSON.parse(await file.text()));
  display.innerHTML = obj;
}