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
    "https://gist.githubusercontent.com/Migue04fuentes/0e9ec5b98468e55c64e814314a8dd5ba/raw/cb40e0681936f31a1a09f8a9fd6dc94fd1190281/Alldepartamentos"
  )
    .then((response) => response.json())
    .then((data) => (countries = data));

  resultsElem = document.getElementById("listdepartamentos");
  inputElem = document.getElementById("departamentos");

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


/* --MUNICIPIOS-- */

//Variables para municipios
let filteredMunicipio = [];
indexmcpio = 0;
let resultsMcpio = document.getElementById("listmunicipios");
let inputmunicipio = document.getElementById('municipios');
inputmunicipio.addEventListener('input', () => {
  cargarmunicipios();
});

// Cargar los municipios del departamento seleccinado
function cargarmunicipios() {
  let dpto = inputElem.value;
  let municipio = countries.filter((dptos) => dptos.departamento == dpto);
  autocompletemcpio(municipio);
};

// Autocompletado de municipios
function autocompletemcpio(municipio) {
  let valor = inputmunicipio.value;
  if (!valor) {
    hideResultsMcpio();
    inputmunicipio.value = "";
    return;
  }
  filteredMunicipio = municipio.filter((municipios) => {
    return municipios.municipio.toLowerCase().startsWith(valor.toLowerCase());
  });
}


inputmunicipio.addEventListener("keyup", (event) => {
  handleresultkeymcpio(event);
});

function handleresultkeymcpio(event) {
  const { key } = event;
  const activeItemcpio = this.getItemAt(indexmcpio);
  if (activeItemcpio) {
    activeItemcpio.classList.remove("selected");
    activeItemcpio.setAttribute("aria-selected", "false");
  }
  if (filteredMunicipio.length != 0) {
    switch (key) {
      case "ArrowRight":
        return;
      case "ArrowLeft":
        return;
      case "Backspace":
        return;
      case "Backspace":
        return;
      case "Escape":
        hideResultsMcpio();
        inputmunicipio.value = "";
        return;
      case "ArrowUp": {
        if (indexmcpio === 0) {
          indexmcpio = filteredMunicipio.length - 1;
        }
        indexmcpio--;
        break;
      }
      case "ArrowDown": {
        if (indexmcpio === filteredMunicipio.length - 1) {
          indexmcpio = 0;
        }
        indexmcpio++;
        break;
      }
      case "Enter": {
        inputmunicipio.value = document.activeElement.value;
        hideResultsMcpio();
        break;
      }
      default:
        selectFirstResultmcpio();
    }
    selectResultMcpio();
  }
}
// Ocultar y eliminar lista
function hideResultsMcpio(){
  this.resultsMcpio.innerHTML = "";
  this.resultsMcpio.classList.add('hidden');
  filteredMunicipio = [];
}

  // Inicializar el index
  function selectFirstResultmcpio(){
    indexmcpio = 0;
  }

// Selección del elemento de la lista
function selectResultMcpio() {
  try {
    const value = inputmunicipio.value;
    const autocompleteValue = filteredResults[indexmcpio].municipio;
    const activeItemcpio = this.getItemAt(indexmcpio);
    if (activeItemcpio) {
      activeItemcpio.classList.add("selected");
      activeItemcpio.setAttribute("aria-selected", "true");
    }
    if (!value || !autocompleteValue) {
      return;
    }
    if (value !== autocompleteValue) {
      inputmunicipio.value = autocompleteValue;
      inputmunicipio.setSelectionRange(value.length, autocompleteValue.length);
    }
  } catch (error) { }
}