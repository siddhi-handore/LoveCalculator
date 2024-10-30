document.addEventListener("DOMContentLoaded", () => {
  const path = document.location.pathname;

  if (path.includes("LoveCalculator.html")) {
    
    const nm1 = document.querySelector("#nm1");
    const nm2 = document.querySelector("#nm2");
    const btn = document.querySelector("#btn");

    btn.addEventListener("click", () => {
      const str1 = nm1.value.trim();
      const str2 = nm2.value.trim();
	  nm1.value = "";
	  nm2.value = "";

     
      if (str1.length <= 2 || str2.length <= 2) {
        nm1.value = "Enter valid name";
        nm2.value = "Enter valid name";
        nm1.style.color = "red";
        nm2.style.color = "red";
        setTimeout(() => {
          nm1.value = "";
          nm2.value = "";
          nm1.style.color = "#fb6f92";
          nm2.style.color = "#fb6f92";
        }, 1000);
      } else {
        
        localStorage.setItem("name1", str1);
        localStorage.setItem("name2", str2);
        calculateLoveScore(str1, str2);
        window.location.href = "result.html"; 
      }
    });
  } else if (path.includes("result.html")) {
    
    const name1Elem = document.getElementById("name1");
    const name2Elem = document.getElementById("name2");
    const mainResult = document.querySelector(".percentage h1");
    const ansText = document.querySelector(".ans h1");

    const name1 = localStorage.getItem("name1");
    const name2 = localStorage.getItem("name2");

    if (name1 && name2) {
      name1Elem.innerText = name1;
      name2Elem.innerText = name2;

      const score = calculateLoveScore(name1, name2);
      mainResult.innerText = `${score}%`;

      if (score > 75) {
        ansText.innerText = "You are a perfect match!";
      } else if (score > 50) {
        ansText.innerText = "You have a good connection!";
      } else {
        ansText.innerText =
          "It's hard for both of you to be together; you are poles apart.";
      }
      localStorage.removeItem("name1");
      localStorage.removeItem("name2");
    } else {
      ansText.innerText = "Names not provided. Go back and try again.";
    }
  }

  // Function to calculate love score based on names
  function calculateLoveScore(name1, name2) {
    let count = [];
    let name = name1.concat(name2).toLowerCase();

    // Count occurrences of each character
    for (let i = 0; i < name.length; i++) {
      let char = name[i];
      if (name.indexOf(char) === i) {
        count.push(name.split(char).length - 1);
      }
    }

    // Reduce counts using the calc function
    let arr = calc(count);
    while (arr.length > 2) {
      arr = calc(arr);
    }

    if (arr[0] >= 10 || arr[1] >= 10) {
      let temp = [];
      arr.forEach((num) => {
        if (num >= 10) {
          temp.push(Math.floor(num / 10));
          temp.push(num % 10);
        } else {
          temp.push(num);
        }
      });
      arr = calc(temp);
    }

    return parseInt(arr[0] + "" + arr[1]);
  }

  // Helper function to reduce array
  function calc(arr) {
    let result = [];
    let i = 0,
      j = arr.length - 1;
    while (i <= j) {
      result.push(i === j ? arr[i] : arr[i] + arr[j]);
      i++;
      j--;
    }
    return result;
  }
});
