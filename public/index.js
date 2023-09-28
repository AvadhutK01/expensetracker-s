let submit = document.getElementById("submit");
let amount = document.querySelector("#amount");
let category = document.getElementById("category");
let desc = document.getElementById("description");
let tabel = document.getElementById("table");
let tabelbody = document.getElementById("tablebody");
window.addEventListener("DOMContentLoaded", async () => {
    await createli();
});
submit.addEventListener("click", (e => {
    e.preventDefault();
    if (amount.value == "" || category.value == "" || desc.value == "") {
        alert('Please fill all the fields');
    }
    else {
        let Amountval = amount.value;
        let Descval = desc.value;
        let Categoryval = category.value;
        if (submit.value === "Add") {
            axios.post('/post-data', { Amountval, Descval, Categoryval }).then(createli()).catch(err => {
                console.log("err:", err);
            });
        }
        else if (submit.value === "Update") {
            let id = submit.getAttribute("id");
            axios.post('/editdata', { id, Amountval, Descval, Categoryval })
                .then(() => {
                    createli();
                    submit.removeAttribute("id");
                    submit.value = "Add";
                })
                .catch(err => {
                    console.log("err:", err);
                });

        }
    }
}));
tabelbody.addEventListener("click", del);
tabelbody.addEventListener("click", edit);
async function del(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            let Parelement = e.target.parentElement.parentElement;
            let id = Parelement.getAttribute("data-id");
            try {
                await axios.post('/delete-user', { id });
                tabelbody.removeChild(Parelement);
                await createli();
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        }
    }
}
async function edit(e) {
    if (e.target.classList.contains('edit')) {
        let Parelement = e.target.parentElement.parentElement;
        let id = Parelement.getAttribute("data-id");
        let response = await axios.post("/getdatasingle", { id });
        let inforparsed = response.data;
        amount.value = inforparsed.amount;
        desc.value = inforparsed.desc;
        category.value = inforparsed.category;
        submit.setAttribute("id", id);
        tabelbody.removeChild(Parelement);
        submit.value = "Update";
    }
}
async function createli() {
    let response = await axios.get("/getData");
    let inforparsed = response.data;
    tabelbody.innerText = "";
    for (let i = 0; i < inforparsed.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("data-id", inforparsed[i].id);
        let td1 = document.createElement("td");
        td1.id = "td1";
        td1.setAttribute("attr", inforparsed["amount"]);
        td1.appendChild(document.createTextNode(inforparsed[i].amount));
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.id = "td2";
        td2.appendChild(document.createTextNode(inforparsed[i].category));
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        td3.id = "td3";
        td3.appendChild(document.createTextNode(inforparsed[i].desc));
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
    }
    amount.value = "";
    desc.value = "";
    category.value = "";

}