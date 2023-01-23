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


/* --MUNICIPIOS-- */
var municipio;
//Variables para municipios
var filteredMunicipio = [];
var indexmcpio = 0;
var inputmunicipio = null;
var resultsMcpio = null;

function init() {
  fetch(
    "https://gist.githubusercontent.com/Migue04fuentes/0e9ec5b98468e55c64e814314a8dd5ba/raw/cb40e0681936f31a1a09f8a9fd6dc94fd1190281/Alldepartamentos"
  )
    .then((response) => response.json())
    .then((data) => (countries = data));

  resultsElem = document.getElementById("listdepartamentos");
  inputElem = document.getElementById("departamentos");


  resultsMcpio = document.getElementById("listmunicipios");
  inputmunicipio = document.getElementById('municipios');

  //Ejecutar evento en el input
  inputElem.addEventListener("input", (event) => {
    autocomplete(event);
  });
  // Recorrer la list con el teclado
  inputElem.addEventListener("keyup", (event) => {
    handleResultKeyDown(event);
  });


  inputmunicipio.addEventListener('focus', () => {
    cargarmunicipios();
  });

  inputmunicipio.addEventListener('input', (event) => {
    autocompletemcpio(event);
  });

  inputmunicipio.addEventListener("keyup", (event) => {
    handleresultkeymcpio(event);
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


/* --MUNICIPIOS-- */


// Cargar los municipios del departamento seleccinado
function cargarmunicipios() {
  let dpto = inputElem.value;
  municipio = countries.filter((dptos) => dptos.departamento == dpto);
  console.log(municipio);
};

// Autocompletado de municipios
function autocompletemcpio(event) {
  const valor = inputmunicipio.value;
  if (!valor) {
    hideResultsMcpio();
    inputmunicipio.value = "";
    return;
  }
  filteredMunicipio = municipio.filter((municipios) => {
    return municipios.municipio.toLowerCase().startsWith(valor.toLowerCase());
  });
}




function handleresultkeymcpio(event) {
  const { key } = event;
  const activeItemcpio = this.getItemAtm(indexmcpio);
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
    const valor = inputmunicipio.value;
    const autocompleteValor = filteredMunicipio[indexmcpio].municipio;
    const activeItemcpio = this.getItemAtm(indexmcpio);
    
    if (activeItemcpio) {
      activeItemcpio.classList.add("selected");
      activeItemcpio.setAttribute("aria-selected", "true");
    }
    if (!valor || !autocompleteValor) {
      return;
    }
    if (valor !== autocompleteValor) {
      inputmunicipio.value = autocompleteValor;
      inputmunicipio.setSelectionRange(valor.length, autocompleteValor.length);
    }
  } catch (error) { }
}

function getItemAtm(index){
  return this.resultsMcpio.querySelector(`#autocomplete-result-${index}`);
}

init();