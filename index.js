import { grab, grabM } from "./utils.js";

/****************************************************
 1. create local storage call
 2. link to input
 3. add display of storage call
 4. add modal for modification of memo
 5. deletion of memo
 6. button and deletion of all todo memos
 ***************************************************/

let memotray = [];
let updating = false;
let transitID = '';

const memoInput = grab('.list-form');
const addItemBtn = grab('.add-item');
const updateItemBtn = grab('.update-item');

document.addEventListener('DOMContentLoaded', () => {
    displayMemos();
})

addItemBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let val = grab('.list-form input').value;
    if (val !== '') {
        let newMemo = { [randomSerial()]: val }
        memotray = getLocalStorage();
        memotray.push(newMemo);
        localStorage.setItem('memos', JSON.stringify(memotray));

        resetMemo();
        displayMemos();
    }

});
updateItemBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // let inheritValue = memotray.find((itm) => Object.keys(itm) == transitID)
    let val = grab('.list-form input').value;
    // val = Object.values(inheritValue);

    if (val !== '') {
        memotray = getLocalStorage();
        let newTray = memotray.reduce((bucket, itm) => {
            if (Object.keys(itm) == transitID) {
                itm = { [transitID]: val }
                bucket.push(itm);
                return bucket
            }
            bucket.push(itm);
            return bucket
        }, [])
        console.log(newTray);

        // let newMemo = { [randomSerial()]: val }
        // memotray = getLocalStorage();
        // memotray.push(newMemo);
        localStorage.setItem('memos', JSON.stringify(newTray));

        resetMemo();
        updating = false;
        displayMemos();

    }
})

const getLocalStorage = () => {
    memotray = JSON.parse(localStorage.getItem('memos'));
    if (memotray) {
        return memotray
    } else {
        return []
    }
};

const randomSerial = () => {
    return Math.ceil(Math.random() * 100000000);
};

const resetMemo = () => {
    const mInput = grab('.list-form input');
    const disMemos = grab('.todos');
    mInput.value = '';
};

const displayMemos = () => {
    if (updating === true) {
        addItemBtn.classList.remove('show');
        addItemBtn.classList.add('hide');
        updateItemBtn.classList.remove('hide');
        updateItemBtn.classList.add('show');
        memotray = getLocalStorage();
        let inheritValue = memotray.find((itm) => Object.keys(itm) == transitID)
        const val = grab('.list-form input');
        val.value = Object.values(inheritValue)[0];

    } else {
        updateItemBtn.classList.remove('show');
        updateItemBtn.classList.add('hide');
        addItemBtn.classList.remove('hide');
        addItemBtn.classList.add('show');
    }

    const disMemos = grab('.todos');
    disMemos.innerHTML = '';
    memotray = getLocalStorage();
    memotray.map((itm) => {
        let newMemo = document.createElement('div');
        let key = Object.keys(itm)[0];
        let keyTxt = Object.values(itm)[0];
        newMemo.classList.add('todo');
        newMemo.innerHTML = `
            <div class="todo-title">
                <h4>${keyTxt}</h4>
            </div>
            <button class="todo-update">
                <i class="fas fa-wrench update" data-id=${key}></i>
            </button>
            <button class="todo-delete">
                <i class="fas fa-times delete" data-id=${key}></i>
            </button>
        `
        disMemos.appendChild(newMemo);
    });


    disMemos.addEventListener('click', function (e) {
        e.preventDefault();
        const dataset = e.target.dataset.id;
        if (e.target.classList.contains('delete')) {
            if (dataset === transitID) {
                updating = false;
            }
            deleteItem(dataset);
        }
        if (e.target.classList.contains('update')) {
            transitID = dataset;
            updating = true;
            displayMemos();
        }

    });
    const deleteItem = (id) => {
        // console.log(id);
        let storage = getLocalStorage();
        storage = storage.filter((itm) => Object.keys(itm)[0] != id);
        localStorage.setItem('memos', JSON.stringify(storage));
        displayMemos();
        resetMemo();
    }
    const updateItem = (id) => {
        console.log(typeof (id));
    }

    const delContainer = grab('.delete-all-container');
    const delAll = grab('.delete-all');
    if (disMemos.innerHTML !== '') {
        delContainer.classList.add('show');
    } else {
        delContainer.classList.remove('show');
    }
    delAll.addEventListener('click', function (e) {
        localStorage.removeItem('memos');
        updating = false;
        displayMemos();
    })

}