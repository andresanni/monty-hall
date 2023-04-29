const doorElements = document.querySelectorAll('.door');
const tableroElement = document.getElementById('tablero');

//Elementos html
let  selectedDoorElement;
let openedDoorElement;
let prizeDoorElement;

//Objetos js
let selectedDoorObject;
let openedDoorObject;
let prizeDoorObject;


const doors=[];

assignDoorContent();
assignDoorListeners();


function assignDoorContent(){
    
    const randomNumber=Math.floor((Math.random()*3)+1);
    

    for(let i=0;i<=2;i++){        
        let hasPrize = false;

        if(i===randomNumber){
            hasPrize=true;
            prizeDoorElement = document.querySelector(`[data-door="${i}"]`);
        }                
        const door = {number : i, 
                     opened:false,
                     selected:false, 
                     prize:hasPrize, 
                     avaiable:true} 

        doors.push(door);        
    }       
        
}

function assignDoorListeners(){
    
    doorElements.forEach((doorElement=>{
            doorElement.addEventListener('click',()=>{

                const doorIndex = parseInt(doorElement.dataset.door); //Capturo el numero de puerta del html                
                selectedDoorObject = doors[doorIndex]; //Capturo el objeto js de la puerta

                selectedDoorObject.selected=true;
                selectedDoorObject.avaiable=false;

                doorElement.classList.add('selected');               
                selectedDoorElement=doorElement;

                const p = document.createElement("p");
                p.innerText="Puerta seleccionada : " + (selectedDoorObject.number +1);
                tableroElement.appendChild(p);

                secondInstance(selectedDoorObject);
                
            }//end of event listener
            )//end of forEach
    }))    
}


function secondInstance(selectedDoor){//Le damos la puerta que eligio el participante y nos devuelve la puerta que le podemos abrir
    
        const openableDoors = doors.filter(door=>door.number!==selectedDoor.number);
        let openableDoorIndex;

        const noPrizeDoors = openableDoors.every(door => !door.prize); //Evaluo el caso en el que no hayan premios
        
        if (noPrizeDoors) {
            openableDoorIndex = Math.floor((Math.random() * 2)); //Si no hay premio, ambas son seleccionables , por lo que selecciono una al azar
        } else {
            openableDoorIndex = openableDoors.findIndex(door => !door.prize); //Si hay premio, selecciono la puerta que no tiene premio
        }
        
        openedDoorElement = document.querySelector(`[data-door="${openableDoors[openableDoorIndex].number}"]`);
        openedDoorObject = openableDoors[openableDoorIndex];
        
        
        let p = document.createElement("p");
        p.innerText= "El Presentador a continuacion abre la puerta numero : " + (openableDoors[openableDoorIndex].number + 1) ;
        tableroElement.appendChild(p);

        p = document.createElement("p");
        p.innerText= "Quieres cambiar la puerta o mantienes la elegida?";

        const changeButton = document.createElement("button");
        changeButton.innerText="Cambiar";
        const keepButton = document.createElement("button");
        keepButton.innerText="Mantener";

        tableroElement.appendChild(p);
        
        tableroElement.appendChild(changeButton);
        changeButton.addEventListener('click',()=>thirdInstance(true));

        tableroElement.appendChild(keepButton);
        keepButton.addEventListener('click',()=>thirdInstance(false));        
}


function thirdInstance(withChange){

    if(withChange){

        const targetDoorToChange = doors.find(door =>door.avaiable);
        selectedDoorElement =  document.querySelector(`[data-door="${targetDoorToChange.number}"]`);
        selectedDoorObject = targetDoorToChange;

        if(selectedDoorObject.prize){

            let p = document.createElement("p");
            p.innerText="Has Ganado!"
            tableroElement.appendChild(p);
        }
        else{
            let p = document.createElement("p");
            p.innerText="Has Perdido!"
            tableroElement.appendChild(p);
        
        }

    }
        

    
}






