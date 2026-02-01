console.log("JS Loaded");

const ctaButton = document.getElementById("ctaButton");
const contactCta = document.getElementById("contactCta");
const modalOverlay = document.getElementById("modalOverlay");
const cancelBtn = document.getElementById("cancelBtn");
const contactForm = document.getElementById("contactForm");

ctaButton.addEventListener("click", function(){
    modalOverlay.style.display = "flex";
});

contactCta.addEventListener("click", function(){
    modalOverlay.style.display = "flex";
});

cancelBtn.addEventListener("click", function(){
    modalOverlay.style.display = "none";
});

modalOverlay.addEventListener("click", function(){
    modalOverlay.style.display = "none";
})

const modal = document.querySelector(".modal");

modal.addEventListener("click", function(event){
    event.stopPropagation();
});

contactForm.addEventListener("submit", function(event){

event.preventDefault();
const inputs = contactForm.querySelectorAll("input, textarea");

    const data = {
        nume: inputs[0].value,
        prenume: inputs[1].value,
        email: inputs[2].value,
        telefon: inputs[3].value,
        mesaj: inputs[4].value
    };

console.log(data);
contactForm.reset();
modalOverlay.style.display = "none";

});
