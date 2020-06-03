const axios = require('axios').default;

const form = document.querySelector('.cerca-cocktail');
const input = document.querySelector('.cerca_input');
const opzioni = document.querySelector('.cerca_opzioni');

let URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

console.log(input.value);


form.addEventListener('submit',(e) => {
  e.preventDefault();

  let nome = input.value || '';

  let parametro =
  {
    params: {
      s:nome
    }
  }


  let option = opzioni.value;

  switch (option.toString()) {
    case 'NomeCocktail':
      parametro =
      {
        params: {
          s:nome
        }
      };
      URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
      break;

    case 'NomeIngrediente':
      parametro =
      {
        params: {
          i:nome
        }
      }
      URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
      break;

    case 'Iniziale':
      parametro =
      {
        params: {
          f:nome
        }
      }
      URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
      break;

    default:
      break;

  }

  axios.get(URL, parametro)
  .then((response) => {

    let arrayDrinks = response.data.drinks;

    document.body.innerHTML = '';

    let divForm = document.createElement('div');
    divForm.style.display = 'flex';
    divForm.style.background = 'linear-gradient(to bottom, #f1e767 0%,#feb645 100%)';
    divForm.style.borderRadius = '15px';
    divForm.style.width = 'auto';
    divForm.style.height = '15vw';
    divForm.style.marginTop = '4vh';
    divForm.style.overflow = 'auto';

    form.style.flexDirection = 'row';

    divForm.appendChild(form);

    document.body.style.justifyContent = 'flex-start';
    document.body.appendChild(divForm);

    divContenitore = document.createElement('div');
    divContenitore.style.display = 'block';
    divContenitore.style.background = 'lightblue';
    divContenitore.style.width = '90vw';
    divContenitore.style.height = '82vh';
    divContenitore.style.marginTop = '3vh';
    //divContenitore.style.border = '2px solid blue';
    divContenitore.style.overflow = 'auto';
    divContenitore.style.marginBottom = '3vh';
    divContenitore.style.borderRadius = '15px';
    divContenitore.style.background = 'linear-gradient(to bottom, #f1e767 0%,#feb645 100%)';

     if (arrayDrinks != null) {

       console.log(arrayDrinks);

        arrayDrinks.forEach((item) => {

        let div = document.createElement('div');
        div.style.display = 'inline-block';
        div.style.background = 'white';
        div.style.width = '90%';
        div.style.height = 'auto';
        div.style.margin = '10px 5% 10px 5%';
        div.style.borderRadius = '15px';
        //div.style.border = '2px solid blue';

        let strFoto = item.strDrinkThumb;

        let foto = document.createElement('img');
        foto.src = strFoto;
        foto.style.width = '25vw';
        foto.style.height = 'auto';
        foto.style.margin = '10px';
        foto.style.float = 'left';
        foto.style.borderRadius = '15px';
        div.appendChild(foto);

        let nome = document.createElement('h2');
        nome.innerHTML = item.strDrink;
        nome.style.display = 'block';
        nome.style.textAlign = 'center';
        div.appendChild(nome);

        let ingredienti = document.createElement('ul');
        ingredienti.style.display = 'block';
        ingredienti.style.float = 'left';
        ingredienti.style.marginLeft = '10px';

        for (let i = 1; i < 16; i++) {
          let stringa = 'strIngredient'+i.toString();
          if (item[stringa]!=null) {
            console.log(item[stringa]);
            let elemento = document.createElement('li');
            elemento.innerHTML = item[stringa];
            ingredienti.appendChild(elemento);
          }

        }

        console.log('--------');



        div.appendChild(ingredienti);

        divContenitore.appendChild(div);

        document.body.appendChild(divContenitore);

      });

    }

  })


});
