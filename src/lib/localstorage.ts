function saveToLocalStorage(name:string){
    const nameArr = getFromLocalStorage();

    if(!nameArr.includes(name))
    {
        nameArr.push(`${name}`);
    }

    localStorage.setItem('Cities',JSON.stringify(nameArr));
}

function getFromLocalStorage(){
    const localStorageData = localStorage.getItem('Cities');
    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name:string){
    const localStorageData = getFromLocalStorage();

    const nameArr = localStorageData.indexOf(name);

    localStorageData.splice(nameArr, 1);

    localStorage.setItem('Cities', JSON.stringify(localStorageData));
}

export{saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage}