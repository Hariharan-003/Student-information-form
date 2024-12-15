const saveBtn = document.querySelector(".savebtn");
const studentData = document.getElementById("studentData");
let editRow = null;

saveBtn.addEventListener("click", function () {
        const name = document.getElementById("nameInput").value;
        const age = document.getElementById("ageInput").value;
        const gender = document.querySelector("input[name='Gender']:checked")?.value || 'Not specified';
        const course = document.getElementById("courseSelect").value;
        const email = document.getElementById("emailInput").value;

        if (name === "" || age === "" || email === "") {
                alert("Please fill all the fields.");
                return;
        }

        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td>${name}</td>
        <td>${age}</td>
        <td>${gender}</td>
        <td>${course}</td>
        <td>${email}</td>
        <td>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </td>
    `;

        // Delete functionality
        tr.querySelector(".deleteBtn").addEventListener("click", function () {
                studentData.removeChild(tr);
        });

        // Edit functionality
        tr.querySelector(".editBtn").addEventListener("click", function () {
                if (editRow) {
                        alert("You are already editing another entry.");
                        return;
                }

                // Set the form inputs to the current row's values
                document.getElementById("nameInput").value = name;
                document.getElementById("ageInput").value = age;
                document.querySelector(`input[name='Gender'][value='${gender}']`).checked = true;
                document.getElementById("courseSelect").value = course;
                document.getElementById("emailInput").value = email;

                // Mark the row as being edited
                editRow = tr;

                // Change the button text to 'Save Changes'
                saveBtn.textContent = "Save Changes";

                // Update the save button functionality
                saveBtn.removeEventListener("click", saveForm);
                saveBtn.addEventListener("click", function () {
                        saveEdit(editRow);
                });
        });

        studentData.appendChild(tr);

        // Clear inputs after saving
        clearInputs();
});

function saveEdit(row) {
        const name = document.getElementById("nameInput").value;
        const age = document.getElementById("ageInput").value;
        const gender = document.querySelector("input[name='Gender']:checked")?.value || 'Not specified';
        const course = document.getElementById("courseSelect").value;
        const email = document.getElementById("emailInput").value;

        row.cells[0].textContent = name;
        row.cells[1].textContent = age;
        row.cells[2].textContent = gender;
        row.cells[3].textContent = course;
        row.cells[4].textContent = email;

        // Reset save button and event listener
        saveBtn.textContent = "Save";
        saveBtn.removeEventListener("click", saveEdit);
        saveBtn.addEventListener("click", function () {
                saveForm();
        });

        // Clear inputs after saving
        clearInputs();

        // Reset the editRow
        editRow = null;
}

function clearInputs() {
        document.getElementById("nameInput").value = '';
        document.getElementById("ageInput").value = '';
        document.querySelectorAll("input[name='Gender']").forEach(input => input.checked = false);
        document.getElementById("courseSelect").selectedIndex = 0;
        document.getElementById("emailInput").value = '';
}



