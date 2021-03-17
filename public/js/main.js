const submitbtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');

const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');
const  data_hide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === '') {
        console.log('empty')
        city_name.innerText = `Empty`;
        data_hide.classList.add('data_hide');

    }
    else {
        try {

            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=9ce44af0a7e61e95eb071fe7ba4a2143`;
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name},   ${arrData[0].sys.country}`;

            temp.innerText = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;

            console.log('Fuck You you  ');


            console.log(data)
//condition to check  sunny or cloundy icons

 const tempMood = arrData[0].weather[0].main;

 if(tempMood == 'Clear')
 {
    temp_status.innerHTML =   "<i class='fas fa-sun' style='color:#eccc68;'></i>";
 }

 else if(tempMood == 'Clouds')
 {
     temp_status.innerHTML = "<i class='fas fa-cloud'   style='color:#f1f2f6;'></i>";
 }
 else if(tempMood =="Rain")
 {
     temp_status.innerHTML = " <i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>";

 }
 else{
     temp_status.innerHTML =  "<i class='fas fa-cloud ' style='color:#f1f2f6'></i>";
 }
 data_hide.classList.remove('data_hide');

 console.log('Fuck You you cant ')




        }
    catch{
                city_name.innerText = `Please eneter cityName Properly`;
                data_hide.classList.add('data_hide');
            }
        }

    

}
    submitbtn.addEventListener('click', getInfo);
