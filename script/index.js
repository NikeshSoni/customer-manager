


const EmployeeData = [
    {
        id: 1, firstName: "Nikesh", lastName: "Rajbhar",
        age: 1512345167, email: 'nikki@gmail.com',
        date: "2001/11/21", address:'chembur'
    },
    {
        id: 2, firstName: "Nikki", lastName: "Soni",
        age: 1512345167, email: 'nikki@gmail.com',
        date: "2001/11/21", address:'chembur'

    },
    {
        id: 3, firstName: "Harry", lastName: "Potter",
        age: 1512345167, email: 'nikki@gmail.com',
        date: "2001/11/21", address:'chembur'

    }
];


let store = document.querySelector('.search-input').value

// store.addEventListener('onchange' , function name(params) {
   
// })



let data = [...EmployeeData];
let currentId = 0;

document.getElementById('saveButton').addEventListener('click', handleSave);
document.getElementById('updateButton').addEventListener('click', handleUpdate);
document.getElementById('clearButton').addEventListener('click', handleClear);

function renderTable() {
    const tbody = document.getElementById('employeeTable');
    tbody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
                    <td>${item.firstName}</td>
                     <td>${item.email}</td>
                    <td>${item.age}</td>
                    <td>${item.date}</td>
                    <td>${item.address}</td>

                    <td>
                        <button class="btn btn-primary model-store"
                             data-bs-toggle="modal" data-bs-target="#exampleModal"
                                class="customer-btn comman-radius " onclick="handleEdit(${item.id})">Edit</button>
                        <button class="btn btn-secondary" onclick="handleDelete(${item.id})">Delete</button>
                    </td>
                `;
        tbody.appendChild(row);
    });
}

function handleSave() {
    const firstName = document.getElementById('firstName').value;
    const age = parseInt(document.getElementById('age').value);
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const address = document.getElementById('address').value;


    // 
    if (firstName === '' || email === '' || address === '' || age <= 0) {
        alert("Enter valid details");
        return;
    }

    const newEmployee = {
        id: data.length + 1,
        firstName,
        // lastName,
        age,
        email,
        date,
        address

    };

    data.push(newEmployee);
    renderTable();
    handleClear();
}


function handleEdit(id) {
    const employee = data.find(item => item.id === id);
    if (employee) {
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('age').value = employee.age;
        document.getElementById('email').value = employee.email;
        document.getElementById('date').value = employee.date;
        document.getElementById('address').value = employee.address;

        currentId = id;
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('updateButton').style.display = 'inline-block';
    }
}

function handleUpdate() {
    const firstName = document.getElementById('firstName').value;
   const email = document.getElementById('email').value
   const date =  document.getElementById('date').value
   const address =  document.getElementById('address').value
    // document.getElementById('date').value
    const age = parseInt(document.getElementById('age').value);

    if (firstName === '' || email === '' || address === '' || age <= 0) {
        alert("Enter valid details");
        return;
    }

   
    const index = data.findIndex(item => item.id === currentId);
    if (index > -1) {
        data[index].firstName = firstName;
        // data[index].lastName = lastName;
        data[index].age = age;
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

function handleClear() {
    document.getElementById('firstName').value = '';
    // document.getElementById('lastName').value = '';
    document.getElementById('age').value = '';
    document.getElementById('email').value = '';
    document.getElementById('date').value = '';
    document.getElementById('address').value = '';
    currentId = 0;
    document.getElementById('saveButton').style.display = 'inline-block';
    document.getElementById('updateButton').style.display = 'none';


}

renderTable()