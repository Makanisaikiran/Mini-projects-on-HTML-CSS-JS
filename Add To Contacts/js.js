

const form = document.getElementById("form");

form.querySelector("button").innerHTML = "Add Contact"

let editingRow = null;

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (editingRow) {
        saveEdits();
    }else{
        AddContact();
    }
});

function AddContact(event){

    form.querySelector("button").innerHTML = "Add Contact"

    const fName = document.getElementById("fName");
    let FName = fName.value.trim();

    const lName = document.getElementById("lName");
    let LName = lName.value.trim();

    const pNumber = document.getElementById("pNumber");
    let PNumber = pNumber.value;

    const email = document.getElementById("email");
    let Email = email.value.trim();


    const table = document.getElementById("tablebody");
    const tr = document.createElement("tr");
    tr.innerHTML +=`<td class="NAME">${FName}${" "}${LName}</td>
            <td class="MOBILENUMBER">${PNumber}</td>
            <td class="EMAIL">${Email}</td>
            <td><button class="edit">Edit</button></td>
            <td><button class="deletee">Delete</button></td>`

    const edit = tr.querySelector(".edit")
    const deletee = tr.querySelector(".deletee")

    edit.addEventListener("click",()=>Edit(tr))
    deletee.addEventListener("click",()=>Deletee(tr))
    
    table.append(tr);
    form.reset();
}

function Edit(a){
    form.querySelector("button").innerHTML = "Save Changes"
    let editName = a.firstChild.innerHTML.split(" ");
    let oldLastName = editName[0];
    let oldFirstName = editName.slice(1,editName.length).join(" ");
    let oldPnumber = a.querySelector(".MOBILENUMBER").innerHTML;
    let oldEmail = a.querySelector(".EMAIL").innerHTML;



    document.getElementById("fName").value = oldLastName;
    document.getElementById("lName").value = oldFirstName;
    document.getElementById("pNumber").value = oldPnumber;
    document.getElementById("email").value = oldEmail;

    let cancel = document.createElement("a")
    cancel.innerHTML = `Cancel`
    cancel.id = "cancel";
    form.append(cancel);

    cancel.addEventListener("click",(cancel)=>{
        cancel.preventDefault();
        discard(cancel)})
    editingRow = a;
}

function Deletee(a){
    if(!editingRow){
    const confirmation = confirm("Do you really want to delete");
    if(confirmation){
        a.remove();
    }else{
        return;
    }
    }else return alert("Cannot Delete Right Now")
}
function saveEdits(){
    if(editingRow){
        const fName = document.getElementById("fName");
        let FName = fName.value.trim();
         
        const lName = document.getElementById("lName");
        let LName = lName.value.trim();

        const pNumber = document.getElementById("pNumber");
        let PNumber = pNumber.value;

        const email = document.getElementById("email");
        let Email = email.value.trim();

        editingRow.querySelector(".NAME").innerHTML = `${FName}${" "}${LName}`
        editingRow.querySelector(".MOBILENUMBER").innerHTML = `${PNumber}`
        editingRow.querySelector(".EMAIL").innerHTML = `${Email}`

        form.querySelector("button").innerHTML = "Save Edits";
        editingRow = null;
        form.querySelector("button").innerHTML = "Add Contact"
        form.querySelector("a").remove();
        form.reset();

    }
}

function discard(a){
    form.reset();
    form.querySelector("button").innerHTML = "Add Contact"
    editingRow = null;
    form.querySelector("a").remove();
}