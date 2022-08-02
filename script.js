const input = document.getElementsByTagName('input');
const btn = document.getElementsByTagName('button')[0];
const p = document.getElementsByTagName('p');

let obj = [];

btn.addEventListener('click', () => {
  
  if (input[0].value !== '' && input[1].value !== '') {
    
    obj = [{ "id": "1", "key": `${input[0].value}`, "pair": `${input[1].value}` }];
    
    const textToBLOB = new Blob([obj], { type: 'text/json' });

    let newLink = document.createElement("a");

    newLink.download = 'Note.json';

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
});

async function loadFile(file) {
  obj.value = await file.text();
  p[0].innerText = 'key: ' + obj[0].key;
  p[1].innerText = 'pair: ' + obj[0].pair;
}