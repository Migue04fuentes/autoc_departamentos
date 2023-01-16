//Variable que contendrá el listado del json
var countries;
//Input de los Departamentos
var inputElem = null;
//Variable de la lista
var resultsElem = null;
//index de la lista
var activeIndex = 0;
// Variable donde se guardan los resultados filtrados
var filteredResults = [];


function init() {
  fetch(
    "https://gist.githubusercontent.com/Migue04fuentes/4dac4f408823eb71c9f3863d8960272c/raw/8673f617d5a772216991128c3792c3e802ed7fb7/municipios.json"
  )
    .then((response) => response.json())
    .then((data) => (countries = data));

  resultsElem = document.querySelector("ul");
  inputElem = document.querySelector("input");

  //Al hacer click en alguno de los elementos de la lista
  resultsElem.addEventListener("click", (event) => {
    handleResultClick(event);
  });
  //Ejecutar evento en el input
  inputElem.addEventListener("input", (event) => {
    autocomplete(event);
  });
  // Recorrer la list con el teclado
  inputElem.addEventListener("keyup", (event) => {
    handleResultKeyDown(event);
  });
}

// Función de autocompletado
function autocomplete(event) {
  const value = inputElem.value;
  if (!value) {
    hideResults();
    inputElem.value = "";
    return;
  }
  
  filteredResults = countries.filter((country) => {
    return country.departamento.toLowerCase().startsWith(value.toLowerCase());
  });
  
 
  // resultsElem.innerHTML = result
  //   .map((result, index) => {
  //     const isSelected = index ===0;
  //     return `
  //       <li
  //         id='autocomplete-result-${index}'
  //         class='autocomplete-result${isSelected ? " selected" : ""}'
  //         role='option'
  //         ${isSelected ? "aria-selected='true'" : ""}
  //       >
  //         ${result.departamento}
  //       </li>
  //     `;
  //   })
  //   .join("");
  // resultsElem.classList.remove("hidden");
}

// Al seleccionar item de la lista
function handleResultClick(event) {
  if (event.target && event.target.nodeName === "LI") {
    selectItem(event.target);
  }
}

// Desplazamiento por la lista
function handleResultKeyDown(event) {
  const { key } = event;
  const activeItem = this.getItemAt(activeIndex);
  if (activeItem) {
    activeItem.classList.remove("selected");
    activeItem.setAttribute("aria-selected", "false");
  }
  if (filteredResults.length != 0) {
    switch (key) {
      case "ArrowRight":
        return;
      case "ArrowLeft":
        return;
      case "Backspace":
        return;
      case "Escape":
        hideResults();
        inputElem.value = "";
        return;
      case "ArrowUp": {
        if (activeIndex === 0) {
          activeIndex = filteredResults.length - 1;
        }
        activeIndex--;
        break;
      }
      case "ArrowDown": {
        if (activeIndex === filteredResults.length - 1) {
          activeIndex = 0;
        }
        activeIndex++;
        break;
      }
      case "Enter": {
        inputElem.value = document.activeElement.value;
        hideResults();
        cargarmunicipios();
        break;
      }
      default:
        selectFirstResult();
    }
    selectResult();
  }
}

// Inicializar el index
function selectFirstResult() {
  activeIndex = 0;
}

// Selección del elemento de la lista
function selectResult() {
  try {
    const value = inputElem.value;
    const autocompleteValue = filteredResults[activeIndex].departamento;
    const activeItem = this.getItemAt(activeIndex);
    if (activeItem) {
      activeItem.classList.add("selected");
      activeItem.setAttribute("aria-selected", "true");
    }
    if (!value || !autocompleteValue) {
      return;
    }
    if (value !== autocompleteValue) {
      inputElem.value = autocompleteValue;
      inputElem.setSelectionRange(value.length, autocompleteValue.length);
    }
  } catch (error) { }
}

// Función al seleccionar un item de la lista
function selectItem(node) {
  if (node) {
    inputElem.value = node.innerText;
    hideResults();
    cargarmunicipios();
  }
}

// Ocultar y eliminar lista
function hideResults() {
  this.resultsElem.innerHTML = "";
  this.resultsElem.classList.add("hidden");
  filteredResults = [];
}

// Devuelve todo el elemento
function getItemAt(index) {
  return this.resultsElem.querySelector(`#autocomplete-result-${index}`);
}

init();


//Variables para municipios
let filteredMunicipio = [];

function cargarmunicipios() {
  let dpto = inputElem.value;
  for (const municipios of countries[0].ciudades){
      console.log(municipios);    
  }
  console.log(filteredMunicipio);
};