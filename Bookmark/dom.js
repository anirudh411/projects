/**
 * Created by ani41 on 9/27/2017.
 */
/*
var headertitle=document.getElementById('header-title');
var mainHeader=document.getElementById('main-header');
var mainConntent=document.getElementById('main-content');
headertitle.textContent='hey this isnt fun';
mainHeader.style.border='solid 2px #E0F'
mainConntent.style.border='solid 3px #0AF';
//console.log();
var a=document.getElementsByName('name');
var input=document.querySelector('input');

*/

var addForm=document.getElementById('add-form');
var itemslist=document.getElementById('items');
addForm.addEventListener('submit',addItem);
function  addItem(e) {
    e.preventDefault();

    var newItem= document.getElementById('item').value;
    //create new li
    var li=document.createElement('li');
    li.className='list-group-item';
    console.log(li);
    //add text with
    li.appendChild(document.createTextNode(newItem));

    var deleteButton=document.createElement('button');
    deleteButton.className='myclass btn btn-danger btn-sm delete';
    deleteButton.appendChild(document.createTextNode('X'));
    li.appendChild(deleteButton);
    itemslist.appendChild(li);
}