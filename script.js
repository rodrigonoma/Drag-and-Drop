var container = document.querySelectorAll('.container');
var dropzone = document.querySelectorAll('.dropzone');
var closeButton;

adjustContainer();

dropzone.forEach(drop =>{
    drop.addEventListener('dragstart',dragstart);

    drop.addEventListener('drag', drag);

    drop.addEventListener('dragend', dragend);

    drop.addEventListener('mouseover', onmouseover);

    drop.addEventListener('mouseout', onmouseout);
})

function onmouseover(){
    dropzone.forEach(over =>{
        //Esse 'this' abaixo é referente ao dropzone
        closeButton = this.querySelectorAll('.close');

        closeButton.forEach(botao =>{            
            botao.classList.add('close-blur');
            
            var dropSelected = this;
            
            botao.onclick = function(){
                if(dropSelected.querySelector('.green') || dropSelected.querySelector('.red')){
                    dropSelected.remove();
                    toogleAdd();
                }
                else
                {
                    var error = document.querySelector('.error p');
                    var divError = document.querySelector('.error');
                    divError.style.display = 'block';
                    error.innerHTML = 'Não é permitido deletar tarefas em processamento!';
                    
                    const divCloseError = document.querySelector('.closeError');
                    divCloseError.onclick = function(){
                        divError.style.display = 'none';
                    }
                }
            }
        })
    })
}

function onmouseout(){
    dropzone.forEach(over =>{        
        var closeButton = this.querySelectorAll('.close');
        
        closeButton.forEach(botao=>{
            botao.classList.remove('close-blur');
        })
    })
}

function dragstart(){
    dropzone.forEach(drop =>{
        drop.classList.add('geral-blur');
    })

    this.classList.add('is-dragging');
}

function drag(){}

function dragend(){
    dropzone.forEach(drop =>{
        drop.classList.remove('geral-blur');
    })

    this.classList.remove('is-dragging');
}

container.forEach(zone => {
    zone.addEventListener('dragenter',dragenter);
    zone.addEventListener('dragover',dragover);
    zone.addEventListener('dragleave',dragleave);
    zone.addEventListener('drop', drop);
})

function dragenter(){}

function dragover(){

    this.classList.add('over');
    var containerOrigin = this.querySelector('.over');
    
    const cardSelected = document.querySelector('.is-dragging');

    this.appendChild(cardSelected);

    //<div class="legend green"></div>
    const legenda = this.querySelector('.legend');
    
    //Pegar todo o estilo carregado da linha acima(no caso, pega a class e assim o backcolor)
    const style = window.getComputedStyle(legenda);
    
    /*
    Pega todo o elemento HTML onde esta a class status
    <div class="status green">
        <p>Sprint Meet</p>
    </div>
    */
    const status = cardSelected.querySelector('.status');  
    
    //Dependendo do background encontrado, seta a cor atual e remove as outras.
    if(style.backgroundColor == 'rgb(0, 128, 0)'){
        status.classList.remove('red');
        status.classList.remove('yellow');
        status.classList.add('green');
    }
    else if(style.backgroundColor == 'rgb(255, 255, 0)'){        
        status.classList.remove('red');
        status.classList.remove('green');
        status.classList.add('yellow');
    }
    else if(style.backgroundColor == 'rgb(255, 0, 0)'){
        status.classList.remove('green');
        status.classList.remove('yellow');
        status.classList.add('red');    
    }    

    adjustContainer();
    toogleAdd();
}

function dragleave(){    
    this.classList.remove('over');  
    adjustContainer();
}

function drop(){}

function hiddenAdd(container){
    var adicionar = container.querySelector('.adicionar');
    adicionar.classList.add('adicionar-hidden');    
    adicionar.classList.remove('adicionar-visible'); 
}

function showAdd(container){
    var adicionar = container.querySelector('.adicionar');
    adicionar.classList.remove('adicionar-hidden');
    adicionar.classList.add('adicionar-visible');
}

function toogleAdd(){   
    var allContainers = document.querySelectorAll('.container');

    allContainers.forEach(container =>{
        var quantidadeDropzone = container.querySelectorAll('.dropzone').length;
        const height = 5;

        if(quantidadeDropzone > 0){
            hiddenAdd(container);
        }
        else{
            showAdd(container);
        }
    })
}

function adjustContainer(){
    var allContainers = document.querySelectorAll('.container');
    allContainers.forEach(container =>{
        var quantidadeDropzone = container.querySelectorAll('.dropzone').length;
        const height = 5;

        if(quantidadeDropzone >= 1){
            container.classList.add('increaseContainer');       
            container.style.height = quantidadeDropzone * height + '%';
        }
        else
        {
            container.classList.remove('increaseContainer');       
            container.style.height = height + '%';
        }
    })
}

//Evento click do botão ADD TASK - INICIO
var btnClick = document.querySelector('.btn');

btnClick.onclick = function(){
    event.preventDefault();
    const textoDigitado = document.querySelector('input[type=text]');    
    var texto = document.createTextNode(textoDigitado.value);    
    var pElement = document.createElement('p');
    
    pElement.appendChild(texto);

    var divStatus = document.createElement('div');
    divStatus.setAttribute('class','status red');
    divStatus.appendChild(pElement);

    var divError = document.createElement('div');
    divError.setAttribute('class','close');
    
    var divDropzone = document.createElement('div');
    
    divDropzone.setAttribute('class','dropzone');    
    divDropzone.setAttribute('draggable','true');
    
    divDropzone.appendChild(divError);        
    divDropzone.appendChild(divStatus);        

    document.getElementById('div1').appendChild(divDropzone);

    var containerSelected = document.getElementById('div1');
    
    //atualiza a quantidade de dropzones
    dropzone = document.querySelectorAll('.dropzone');

    dropzone.forEach(drop =>{
        drop.addEventListener('dragstart',dragstart);    
        drop.addEventListener('drag', drag);    
        drop.addEventListener('dragend', dragend);    
        drop.addEventListener('mouseover', onmouseover);    
        drop.addEventListener('mouseout', onmouseout);
    })
    
    adjustContainer();
    toogleAdd();

    fieldsEmpty();
}
//Evento click do botão ADD TASK - FIM

//Function para limpar campo texto e dar foco
function fieldsEmpty(){
    var campoText = document.querySelector('.texto');
    campoText.value = '';
    campoText.focus();
}