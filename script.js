const password = document.querySelector(".password");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const symbol = document.getElementById("symbols");
const number = document.getElementById("numbers");
const generateBtn = document.getElementById("generate_button");
const length = document.getElementById("length");
const error = document.getElementById("error");
const copy_btn = document.getElementById('copy_btn')
length.focus();

let psd_length = parseInt(length.value);
let psd = "";
const passwords = [""];

length.addEventListener("change", (e) => {
  psd_length = parseInt(e.target.value);
});

generateBtn.addEventListener("click", () => {
  
  copy_btn.classList.add('before')
  copy_btn.classList.remove('copy_btn')
  const capitals_ = uppercase.checked;
  const numbers_ = number.checked;
  const symbols_ = symbol.checked;
  const small_ = lowercase.checked;
  error.innerHTML = "";

  function generate(len) {
    const capitals_ = uppercase.checked;
    const numbers_ = number.checked;
    const symbols_ = symbol.checked;
    const small_ = lowercase.checked;

    const capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "1234567890";
    const symbols = "!@#$%^&*()_";
    const small = "abcdefghijklmnopqrstuvwyz";
    let sequence = "";

    if (capitals_ && small_ && symbols_ && numbers_) {
      sequence = capitals + small + numbers + symbols;
      // -------------------
    } else if (capitals_ && small_ && symbols_) {
      sequence = capitals + small + symbols;
    } else if (capitals_ && small_ && numbers_) {
      sequence = capitals + small + numbers;
    } else if (capitals_ && symbols_ && numbers_) {
      sequence = capitals + symbols + numbers;
    } else if (small_ && symbols_ && numbers_) {
      sequence = small + symbols + numbers;
    }
    // ---------------
    else if (capitals_ && small_) {
      sequence = capitals + small;
    } else if (capitals_ && numbers_) {
      sequence = capitals + numbers;
    } else if (capitals_ && symbols_) {
      sequence = capitals + symbols;
    }
    // -------------
    else if (small_ && symbols_) {
      sequence = small + symbols;
    } else if (small_ && numbers_) {
      sequence = small + numbers;
    }
    // -------------
    else if (symbols_ && numbers_) {
      sequence = symbols + numbers;
    }
    //   ------------
    else if (capitals_) {
      sequence = capitals;
    } else if (small_) {
      sequence = small;
    } else if (symbols_) {
      sequence = symbols;
    } else if (numbers_) {
      sequence = numbers;
    } else {
      error.innerHTML = "choose alteast one combination";
    }

    return generatePassword(sequence, len);
  }
  function generatePassword(seq, len) {
    let psd = "";
    for (let i = 0; i < len; i++) {
      let a = Math.floor(Math.random() * seq.length);
      psd = psd + seq.charAt(a);
    }
    return psd;
  }
  passwords.push(psd);
  passwords.shift();

  document.getElementById("last_psd").innerHTML =
    passwords[passwords.length - 1];
  psd = generate(psd_length);
  password.innerHTML = psd;


  let text = password.innerHTML;
  async function copyPassword() {
    try {
      await navigator.clipboard.writeText(text);
      console.log("copied the password",);
    } catch (err) {
      console.log("failed to copy password:", err);
    }
  }

  password.addEventListener("click", () => {
    copyPassword();
    copy_btn.classList.add('copy_btn')
    copy_btn.classList.remove('before')
  });
});

// copying the password
