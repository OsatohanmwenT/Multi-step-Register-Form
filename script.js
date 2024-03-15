const nameInput = document.getElementById("name-input")
const emailInput = document.getElementById("email-input")
const formOptions = document.querySelectorAll(".options")
const btn = document.querySelector(".btn-one")
const btnTwo = document.querySelector(".btn-two")
const btnThree = document.querySelector(".btn-three")
const dot = document.querySelector(".dot-item")
const stepTab = document.getElementById("step")
const userName = document.querySelector(".name")
const userEmail = document.querySelector(".email")

const selectedInterests = JSON.parse(localStorage.getItem("interests")) || [];

btn.addEventListener("click",()=>{
    if(!validate(emailInput.value) || nameInput.value == ""){
        alert("error");
    }else{
        btn.parentElement.setAttribute("hidden",true)
        btn.parentElement.nextElementSibling.removeAttribute("hidden")
        thirdStep(nameInput.value,emailInput.value)
        stepTab.innerHTML = "2"
    }
})

btnTwo.addEventListener("click",()=>{
        btnTwo.parentElement.setAttribute("hidden",true)
        btnTwo.parentElement.nextElementSibling.removeAttribute("hidden")
        dot.nextElementSibling.classList.add("active-tab")
        displayInterests()
        stepTab.innerHTML = "3"
})

btnThree.addEventListener("click",()=>{
    localStorage.removeItem("interests")
    alert("✅You have done signing up")
})

const thirdStep = (name,email) => {
    userName.innerHTML = `Name: <span>${name}</span>`
    userEmail.innerHTML = `Email: <span>${email}</span>`
}

const validate = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.trim() === "") {
        return false; // Empty input
    } else {
        return emailRegex.test(input);
    }
}


  
formOptions.forEach((option) => {
    option.addEventListener("click", () => {
        const selectedInterests = JSON.parse(localStorage.getItem("interests")) || []; // Retrieve existing interests from localStorage or initialize an empty array
        const interest = option.innerText;
        if (option.classList.contains("active")) {
            option.classList.remove("active");
            const index = selectedInterests.indexOf(interest);
            if (index !== -1) {
                selectedInterests.splice(index, 1) // Remove the interest from the array if already present
            }
        } else {
            option.classList.add("active");
            if (!selectedInterests.includes(interest)) {
                selectedInterests.push(interest) // Add the interest to the array if not already present
            }
        }

        localStorage.setItem("interests", JSON.stringify(selectedInterests)) // Store the updated interests array in localStorage
        console.log(selectedInterests.length)
    })
})

function displayInterests() {
    // Retrieve interests array from local storage
    const storedInterests = JSON.parse(localStorage.getItem("interests")) || [];

    // Get container to display interests
    const interestsContainer = document.getElementById("selected-interests-list");

    // Clear previous content
    interestsContainer.innerHTML = "";

    // Iterate over stored interests and create HTML elements to display each interest
    storedInterests.forEach(interest => {
        const interestElement = document.createElement("li");
        interestElement.textContent = interest;
        interestsContainer.appendChild(interestElement);
    });
}
