const submitbtn = document.getElementById("submitBtn");
const audiobtn = document.getElementById("audioBtn");
var cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp = document.getElementById("temp");
const data_hide = document.querySelector(".middle_layer");

// speak function
const synth = window.speechSynthesis;

function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  const allVoices = speechSynthesis.getVoices();
  speech.voice = allVoices[30];

  //----
  speech.text = message;
  speech.volume = 1;
  // speech.lang ='hi-IN'

  window.speechSynthesis.speak(speech);
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recogniation = new SpeechRecognition();

// sr start
recogniation.onstart = function (e) {
  console.log("vr active");
};

recogniation.onresult = function (e) {
  // console.log(e)
  let current = e.resultIndex;
  let transcript = e.results[current][0].transcript;
  console.log(transcript);
  let voiceResult = transcript;
  cityName.value = voiceResult;
  
  submitbtn.click()
};

recogniation.onend = function (e) {
  console.log("vr close");
};

const getInfo = async (event) => {
  event.preventDefault();
  let cityVal = cityName.value;
  if (cityVal === "") {
    console.log("empty");
    city_name.innerText = `Empty`;
    data_hide.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=9ce44af0a7e61e95eb071fe7ba4a2143`;
      const response = await fetch(url);

      const data = await response.json();
      const arrData = [data];

      city_name.innerText = `${arrData[0].name},   ${arrData[0].sys.country}`;
      // var citySpeak = new SpeechSynthesisUtterance(arrData[0].name);
      readOut(arrData[0].name);

      // temp.innerText = arrData[0].main.temp;
      temp.innerText = `${arrData[0].main.temp}°C`;
      // temp_status.innerText = arrData[0].weather[0].main;
      // var cityTempSpeak = new SpeechSynthesisUtterance(
      //   `${arrData[0].main.temp}degree celcius`
      // );
      // window.speechSynthesis.speak(cityTempSpeak);
      readOut(`${arrData[0].main.temp}degree celcius`);

      // console.log("F");

      // console.log(data);
      //condition to check  sunny or cloundy icons

      const tempMood = arrData[0].weather[0].main;

      //  var tempMoodSpeak = new SpeechSynthesisUtterance(arrData[0].weather[0].main);
      // window.speechSynthesis.speak(tempMoodSpeak);
      readOut(tempMood);

      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color:#eccc68;'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud'   style='color:#f1f2f6;'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          " <i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-cloud ' style='color:#f1f2f6'></i>";
      }
      data_hide.classList.remove("data_hide");

      // console.log("Fuck You you cant ");
    } catch {
      city_name.innerText = `Please eneter cityName Properly`;
      data_hide.classList.add("data_hide");
    }
  }
};
submitbtn.addEventListener("click", getInfo);
audiobtn.addEventListener("click", (e) => {
  e.preventDefault();
  readOut("Which city weather you want to search");
  setTimeout(() => {
    recogniation.start();
    console.log("active");
  }, 5000);
});
