/**
 * Created by ani41 on 10/17/2017.
 */
//function getInputByuser() {

let a = document.querySelector('#search').addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        filterImages(e);
    }

});
function filterImages(event) {
    event.preventDefault();
    let input, searchArray = [], imageRow, items = [], itemsArray = [], itemName = [];
    input = event.target.value;
    input = input.toLowerCase(input);
    imageRow = document.querySelector('#image-collection');
    items = imageRow.children;
    itemsArray = Array.from(items);
    for (let index = 0; index < items.length; index++) {
        itemName = itemsArray[index].querySelector('[name]').getAttribute('name');
        if (input === itemName) {
            searchArray.push(items[index]);
        }
    }
    dispalyImages(searchArray, itemsArray ,input);
}
function dispalyImages(searchArray, itemsArray,input) {
    let c, s, images = [];
    if (searchArray.length < 1&&input!=='') {
        changeDisplayProperty(itemsArray, 'none');
    }
    else if(input!==''){
        changeDisplayProperty(itemsArray, 'none');
    changeDisplayProperty(searchArray, 'flex');
}else{
        changeDisplayProperty(itemsArray, 'flex');

    }
}
function changeDisplayProperty(array, value) {
    array.forEach(function (item) {
        item.style.display = value
    });
}