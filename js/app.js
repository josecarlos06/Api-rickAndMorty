const result = document.querySelector('.result')
const form = document.querySelector('.formulario');
let historys = [];

form.addEventListener('submit', search);

function search(e) {
   e.preventDefault();
   const characterName = document.querySelector('#characterName').value;
   if (characterName === '') {
      return;
   }
   cargarApi(characterName.trim().toLocaleLowerCase())
}
function cargarApi(names) {
   const url = `https://rickandmortyapi.com/api/character/?name=${names}`;
   fetch(url)
      .then(res => res.json())
      .then(data => {
         form.reset();
         clear(result);

         if (data.error) {
            errorAlert();
            return
         }
         historyvalidate(names)
         viewApi(data.results)
      })

      .catch(err => console.log(err))
}

function viewApi(data) {
   data.forEach(({ name, image }) => {
      const card = document.createElement('div');

      card.classList.add('card', 'p-1')
      card.innerHTML = ` 
                <img src="${image}">
                <div class="card-body">
                    <p class="card-title">${name}</p>  
                </div>
            `
      result.appendChild(card)
   })
}

function errorAlert() {
   const error = document.createElement('p');
   error.classList.add('text-center','text-danger','bg-white','py-2','px,4');
   error.textContent = "No se encontraron registros";
   result.appendChild(error)
}

function historyvalidate(names) {
   if(!historys.includes(names)){
      historys.unshift(names);
      historys = historys.splice(0,7)
      setLocalStorage();
      renderList();
   }
}
function renderList(){
   const historyHTML = document.querySelector('.historyHTML')
   clear(historyHTML)
   historys.forEach((name)=>{
      const ul = document.createElement('ul');
      const li = document.createElement('ul');
      const button = document.createElement('button');
      button.classList.add('btn','btn-light','px-4','d-block');
      button.dataset.getAttribute = name;
      button.textContent = name;
      li.appendChild(button);
      ul.appendChild(li);
      historyHTML.appendChild(ul);

      button.onclick = function(e){
         names = e.target.dataset.getAttribute;
         cargarApi(names);
      }
   });
}

function setLocalStorage(){
   localStorage.setItem("api", JSON.stringify(historys));
}

getLocalStorage()
function getLocalStorage(){
   historys = JSON.parse(localStorage.getItem("api")) || [];
   renderList();
}
function clear(params) {
   while (params.firstChild) {
      params.removeChild(params.firstChild);
   }
}
