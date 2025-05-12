 
 function setActiveLink(event) {
  const navlinks = document.querySelectorAll(".nav1 a");
  navlinks.forEach(link => {
    link.classList.remove("active");
  });
  event.target.classList.add("active");

  const navContainers = document.querySelectorAll(".nav1");
  navContainers.forEach(container => {
    container.classList.remove("active");
  });

  const parentNavContainer = event.target.closest(".nav1");
  if (parentNavContainer) {
    parentNavContainer.classList.add("active");
  }
}

window.addEventListener("load", () => {
  const firstLink = document.querySelector(".nav1 a"); 
  if (firstLink) {
    firstLink.classList.add("active");
    const firstNavContainer = firstLink.closest(".nav1");
    if (firstNavContainer) {
      firstNavContainer.classList.add("active");
    }
  }
});

document.querySelectorAll(".nav1 a").forEach(link => {
  link.addEventListener("click", setActiveLink);
});

function validateName(name) {
  const regex = /^[A-Za-z\s]+$/;
  const errormsg = document.querySelector("#error1");
  const nameinput = document.querySelector("#name");

  if (!regex.test(name)) {
    errormsg.textContent = "Please enter a valid name (letters only)";
    errormsg.style.color = "red";
    nameinput.style.borderColor = "red"; 
    nameinput.style.boxShadow = "0 0 5px red";
    return false;
  } else {
    errormsg.textContent = "";
    nameinput.style.borderColor = "rgb(39, 240, 39)";
    nameinput.style.boxShadow = "0 0 5px rgb(39, 240, 39)";
    return true;
  }
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const errormsg = document.querySelector("#error2");
  const emailinput = document.querySelector("#email");

  if (!regex.test(email)) {
    errormsg.textContent = "Please enter a valid email";
    errormsg.style.color = "red";
    emailinput.style.borderColor = "red"; 
    emailinput.style.boxShadow = "0 0 5px red";
    return false;
  } else {
    errormsg.textContent = "";
    emailinput.style.borderColor = "rgb(39, 240, 39)";
    emailinput.style.boxShadow = "0 0 5px rgb(39, 240, 39)";
    return true;
  }
}

function handleFormSubmit(event) {
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();

  let valid = true;

  if (!validateName(name)) {
    valid = false;
  }

  if (!validateEmail(email)) {
    valid = false;
  }

  if (!valid) {
    event.preventDefault();
  }
}

function animateBars() {
  document.querySelectorAll(".percentage").forEach((element) => {
    const percent = element.getAttribute("data-percent");
    element.style.width = "0%";
    element.style.transition = "width 2s ease, background-color 2s ease";

    setTimeout(() => {
      element.style.width = percent;
    }, 200);

    setBarColor(element, percent);
  });
}

function setBarColor(element, percent) {
  if (parseInt(percent) <= 40) {
    element.style.backgroundColor = "rgb(235, 52, 52)";
  } 
  else if (parseInt(percent) <= 60) {
    element.style.backgroundColor = "rgb(233, 153, 34)";
  } 
  else if (parseInt(percent) <= 75) {
    element.style.backgroundColor = "rgb(235, 220, 52)";
  } 
  else if (parseInt(percent) <= 85) {
    element.style.backgroundColor = "rgb(125, 235, 52)";
  } 
  else {
    element.style.backgroundColor = "rgb(31, 153, 31)";
  }

}

function handleMessageInput() {
  const messagediv = document.querySelector("#message");
  const countdiv = document.querySelector("#charCount");

  if (messagediv && countdiv) {
    messagediv.addEventListener("input", () => {
      let text = messagediv.innerText.trim();
      let charCount = text.replace(/\s/g, "").length;

      if (charCount > 200) {
        messagediv.innerText = text.substring(0, 200);
        charCount = 200;
      }

     countdiv.textContent = `${charCount}/200`;
    });
  }
}

function pageload(pg) {
  const loadingIndicator = document.createElement("div");
  loadingIndicator.textContent = "Loading...";
  document.getElementById("content").appendChild(loadingIndicator);

   fetch(pg)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const content = doc.querySelector("main");
      document.getElementById("content").innerHTML = content.innerHTML;

     animateBars();

      const nameInput = document.querySelector("#name");
      const emailInput = document.querySelector("#email");
      const btn = document.querySelector("#button2");

      if (nameInput) {
        nameInput.addEventListener("input", () => validateName(nameInput.value));
      }

      if (emailInput) {
        emailInput.addEventListener("input", () => validateEmail(emailInput.value));
      }

      if (btn) {
        btn.addEventListener("click", handleFormSubmit);
      }

      handleMessageInput();

      loadingIndicator.remove();

    })

    .catch(error => {
      document.getElementById("content").innerHTML = "Loading failed";
      loadingIndicator.remove();
      console.error(error);
    });
}


