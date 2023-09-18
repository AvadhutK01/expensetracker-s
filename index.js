let submit = document.getElementById("submit");
let amount = document.querySelector("#amount");
let category = document.getElementById("category");
let desc = document.getElementById("description");
let tabel = document.getElementById("table");
let tabelbody = document.getElementById("tablebody");
submit.addEventListener("click", (e => {
    let id = amount.value + category.value + desc.value;
    e.preventDefault();
    if (amount.value == "" || category.value == "" || desc.value == "") {
        alert('Please fill all the fields');
    }
    else {
        let data = {
            "amount": amount.value, "desc": desc.value, "category": category.value
        }
        let jsondata = JSON.stringify(data);
        localStorage.setItem(id, jsondata)
        createli(id);
    }
    tabelbody.addEventListener("click", del);
    tabelbody.addEventListener("click", edit);
    function del(e) {
        if (e.target.classList.contains('delete')) {
            let Parelement = e.target.parentElement.parentElement;
            let id = "";
            let trElements = Parelement.querySelectorAll('td');
            for (let i = 0; i < trElements.length; i++) {
                const attributes = trElements[i].getAttribute('attr');
                if (attributes === null) {
                    break;
                }
                id += attributes
            }
            if (id != "") {
                tabelbody.removeChild(Parelement);
                localStorage.removeItem(id);
            }
        }
    }
    function createli(id) {
        let tr = document.createElement("tr");
        let inforparsed = JSON.parse(localStorage.getItem(id));
        let td1 = document.createElement("td");
        td1.id = "td1";
        td1.setAttribute("attr", inforparsed["amount"]);
        td1.appendChild(document.createTextNode(inforparsed["amount"]));
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.id = "td2";
        td2.setAttribute("attr", inforparsed["category"]);
        td2.appendChild(document.createTextNode(inforparsed["category"]));
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        td3.id = "td3";
        td3.setAttribute("attr", inforparsed["desc"]);
        td3.appendChild(document.createTextNode(inforparsed["desc"]));
        tr.appendChild(td3);
        let td4 = document.createElement("td");
        var delbutton = document.createElement('button');
        delbutton.className = "btn btn-danger btn-sm float-right m-0 delete w-25";
        delbutton.appendChild(document.createTextNode("X"));
        var Editbutton = document.createElement('button');
        Editbutton.className = "btn mr-1 btn-info btn-sm float-right ms-2 edit w-25";
        Editbutton.appendChild(document.createTextNode("Edit"));
        td4.appendChild(delbutton);
        td4.appendChild(Editbutton);
        tr.appendChild(td4);
        tabelbody.appendChild(tr);
        amount.value = "";
        desc.value = "";
        category.value = "";

    }
    function edit(e) {
        if (e.target.classList.contains('edit')) {
            let Parelement = e.target.parentElement.parentElement;
            let id = "";
            let trElements = Parelement.querySelectorAll('td');
            for (let i = 0; i < trElements.length; i++) {
                const attributes = trElements[i].getAttribute('attr');
                if (attributes === null) {
                    break;
                }
                id += attributes
            }
            if (id != "") {
                tabelbody.removeChild(Parelement);
                let data = localStorage.getItem(id);
                localStorage.removeItem(id);
                let dataparsed = JSON.parse(data)
                amount.value = dataparsed["amount"];
                desc.value = dataparsed["desc"];
                category.value = dataparsed["category"]
            }
        }
    }
}));