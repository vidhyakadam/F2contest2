const sortAtoZ = document.getElementById('sortAtoZ')
const sortZtoA = document.getElementById('sortZtoA')
const sortbymarks = document.getElementById('sortbymarks')
const sortbypassing = document.getElementById('sortbypassing')
const sortbyclass = document.getElementById('sortbyclass')
const sortbygender = document.getElementById('sortbygender')

/* --------------------Fetching Data from json file ---------------- */
let studentsData = [];

fetch("./students.json")
.then(function(response){
   return response.json();
})
.then(function(students){
    studentsData = students;
    renderTable(studentsData);  
})
.catch(error => console.error('Error fetching data: ', error));

function renderTable(students){
    const tbody = document.querySelector("#tableBody");

    let out = "";
 
    for(let data of students){
       out += `
          <tr>
             <td>${data.id}</td>
             <td>${data.first_name} ${data.last_name}</td>
             <td>${data.gender}</td>
             <td>${data.class}</td>
             <td>${data.marks}</td>
             <td>${data.passing}</td>
             <td>${data.email}</td>
          </tr>
       `;
    }
  
    tbody.innerHTML = out;
}

function filterTable(query) {
    const filteredData = studentsData.filter(student => {
        const lowercaseQuery = query.toLowerCase();
        return (
            student.first_name.toLowerCase().includes(lowercaseQuery) ||
            student.last_name.toLowerCase().includes(lowercaseQuery) ||
            student.email.toLowerCase().includes(lowercaseQuery)
        );
    });

    renderTable(filteredData);
}

const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value;
    filterTable(query);
});

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    if (query === '') {
        renderTable(studentsData); // Render all data when input is cleared
    }
});

/--------------- Buttons functionality --------------/

// Sort by A to Z 
sortAtoZ.addEventListener('click', () => {
    studentsData.sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    renderTable(studentsData);
});

// Sort by Z to A 
sortZtoA.addEventListener('click', () => {
    studentsData.sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return nameB.localeCompare(nameA);
    });

    renderTable(studentsData);
});

// Sort by marks in ascending order
sortbymarks.addEventListener('click', () => {
    studentsData.sort((a, b) => a.marks - b.marks); 
    renderTable(studentsData);
});

// Sort by passing by true value
sortbypassing.addEventListener('click', () => {
    const passingStudents = studentsData.filter(student => student.passing === true);
    renderTable(passingStudents);
});

// Sort by class in ascending order
sortbyclass.addEventListener('click', () => {
    studentsData.sort((a, b) => a.class - b.class);
    renderTable(studentsData);
});
//Sort by gender 
sortbygender.addEventListener('click', () =>{
   const maleGender = studentsData.filter(student => student.passing === true);
   renderTable(maleGender);
})