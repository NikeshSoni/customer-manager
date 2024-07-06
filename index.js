const EmployeeData = [
    {
        id: 1, firstName: "Nikesh", number: 1512345167,
        email: 'nikesh@gmail.com',
        date: "2001-11-21", address: 'chembur'
    },
    {
        id: 2, firstName: "Nikki", 
        number: 1512345167, email: 'nikki@gmail.com',
        date: "2001-11-21", address: 'chembur'
    },
    {
        id: 3, firstName: "Harry",
        number: 1512345167, email: 'harry@gmail.com',
        date: "2001-11-21", address: 'chembur'
    }
];

let data = [...EmployeeData];
let currentId = 0;
let storeValue = document.querySelector('.search-input').value;

document.querySelector('.search-input').addEventListener('keyup', function() {
    let value = this.value.toLowerCase();
    filterTable(value);
});

function filterTable(value) {
    const filteredData = data.filter(item => {
        return (
            item.firstName.toLowerCase().includes(value) ||
            item.email.toLowerCase().includes(value) ||     
            item.address.toLowerCase().includes(value)
        );
    });
    renderTable(filteredData);
}


document.getElementById('saveButton').addEventListener('click', handleSave);
document.getElementById('updateButton').addEventListener('click', handleUpdate);
document.getElementById('clearButton').addEventListener('click', handleClear);


function renderTable(filteredData = data) {
    const tbody = document.getElementById('employeeTable');
    tbody.innerHTML = '';
    filteredData.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.firstName}</td>
            <td>${item.email}</td>
            <td>${item.number}</td>
            <td>${item.date}</td>
            <td>${item.address}</td>
            <td>
                <button 
                    class="border border-dark model-store customer-btn comman-button comman-radius"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onclick="handleEdit(${item.id})">
                        <img class="image" src="./pencil-lined.png" alt="edit" />
                </button>
                
                <button 
                    class="model-store customer-btn comman-button comman-radius border border-dark" 
                    onclick="handleDelete(${item.id})">
                    <img class="image" src="./delete.png" alt="delete" />
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

   
}

// displayValue()

// saveHandel Was Here 

function handleSave() {
    const firstName = document.getElementById('firstName').value;
    const number = parseInt(document.getElementById('number').value);
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const address = document.getElementById('address').value;

    // 
    if (firstName === '' || email === '' || address === '' || number <= 0) {
        alert("Enter valid details");
        return;
    }

    const newEmployee = {
        id: data.length + 1,
        firstName,
        number,
        email,
        date,
        address
    };

    data.push(newEmployee);
    renderTable();
    handleClear();

   var close = document.querySelector(".comman-class");

   close.style.display = 'none !important';

//    document.getElementById('#exampleModal')
}

console.log(data);


// edit code was here 

document.querySelector('.modal-title').innerHTML = "Add Customer"
document.querySelector('.discription').innerHTML = "Enter The Deatail of new Customer"


function handleEdit(id) {


    document.querySelector('.modal-title').innerHTML = "Edit Customer"
    document.querySelector('.discription').innerHTML = "Update the Customer Data"

    const employee = data.find(item => item.id === id);
    if (employee) {
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('number').value = employee.number;
        document.getElementById('email').value = employee.email;
        document.getElementById('date').value = employee.date;
        document.getElementById('address').value = employee.address;

        currentId = id;
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('updateButton').style.display = 'inline-block';
    }
}

//  Update Code are here

function handleUpdate() {
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value
    const date = document.getElementById('date').value
    const address = document.getElementById('address').value
    // document.getElementById('date').value
    const number = parseInt(document.getElementById('number').value);

    if (firstName === '' || email === '' || address === '' || number <= 0) {
        alert("Enter valid details");
        return;
    }

    const index = data.findIndex(item => item.id === currentId);
    if (index > -1) {
        
        data[index].firstName = firstName;
        data[index].number = number;
        data[index].email = email;
        data[index].date = date;
        data[index].address = address;
        renderTable();
        handleClear();
    }

    console.log();
}

function handleDelete(id) {
    if (confirm("Do you want to delete this employee?")) {
        data = data.filter(item => item.id !== id);
        renderTable();
    }
}

//  Clear Handel Was Here 

function handleClear() {
    document.getElementById('firstName').value = '';
    document.getElementById('number').value = '';
    document.getElementById('email').value = '';
    document.getElementById('date').value = '';
    document.getElementById('address').value = '';
    currentId = 0;
    document.getElementById('saveButton').style.display = 'inline-block';
    document.getElementById('updateButton').style.display = 'none';
}

renderTable()