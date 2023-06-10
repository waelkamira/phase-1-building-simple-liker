// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const hearts = document.getElementsByClassName("like-glyph");
  const EMPTY_HEART = "♡";
  const FULL_HEART = "♥";

  errorModal.classList.add("hidden");

  // Check if the error modal is initially hidden
  it("contains a hidden modal", () => {
    expect(errorModal.classList.contains("hidden")).to.be.true;
  });

  // Add event listener to each heart
  Array.from(hearts).forEach((heart) => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          // Server request successful
          heart.classList.toggle("activated-heart");
          if (heart.innerText === EMPTY_HEART) {
            heart.innerText = FULL_HEART;
          } else {
            heart.innerText = EMPTY_HEART;
          }
        })
        .catch(() => {
          // Server request failed
          errorModal.classList.remove("hidden");
          const errorMessage = document.getElementById("modal-message");
          errorMessage.textContent = "Server Error";
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
