function saveToLocalStorage(name:string){
    let nameArr = getFromLocalStorage();

    if(!nameArr.includes(name))
    {
        nameArr.push(`${name}`);
    }

    localStorage.setItem('Cities',JSON.stringify(nameArr));
}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem('Cities');
    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name:string){
    let localStorageData = getFromLocalStorage();

    let nameArr = localStorageData.indexOf(name);

    localStorageData.splice(nameArr, 1);

    localStorage.setItem('Cities', JSON.stringify(localStorageData));
}

export{saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage}