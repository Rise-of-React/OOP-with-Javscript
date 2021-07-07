let memoArray = new Array();
let memoInput = document.querySelector('#memo_input');
let button = document.querySelector('#memo_add');
let memoList = document.querySelector('#memo_list');

window.onload = () => {
    console.log(document.cookie);
    const loadMemoList = document.cookie.split("=")[1].split(",");
    memoArray = loadMemoList;
    showList();
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    memoArray.push(memoInput.value);
    memoInput.value = "";
    showList();
});

const showList = () => {
    memoList.innerHTML = memoArray.map(memo => {
        return (`<div class="memo"><div class="memo_text">${memo}</div><span class="delete">x</span></div>`)
    }).join('');

    document.cookie = encodeURIComponent("memoList") + '=' + memoArray;
}

const deleteMemo = (e) => {
    e.preventDefault();
    let memo;
    if (typeof (e.target.parentNode.childNodes[0].childNodes[0]) === "undefined") {
        memo = "";
    }
    else {
        memo = e.target.parentNode.childNodes[0].childNodes[0].nodeValue;
    }
    console.log(memo);
    let position = memoArray.indexOf(memo);
    console.log(position);
    memoArray.splice(position, 1);
}

const updateMemo = (e) => {
    e.preventDefault();
    let update = prompt("update memo :)", "enter memo to change");
    console.log(e);
    let memo = e.target.childNodes[0].nodeValue;
    let position = memoArray.indexOf(memo);

    memoArray[position] = update;
}

const checkEvent = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.target.className == 'memo_text') {
        console.log("update")
        updateMemo(e);
        showList();
    }
    else if (e.target.className == 'delete') {
        deleteMemo(e);
        showList();
    }
}

memoList.addEventListener('click', checkEvent);