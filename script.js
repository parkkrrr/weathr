document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let search=document.getElementById("searchBox").value;
    fetchWeather(search);
});


async function fetchWeather(search) {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${search}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': api_key,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        document.getElementById("city").innerHTML=result.location.name+', '+ result.location.country ;
        //For Main Cards
        document.getElementById('temp_c').innerHTML=result.current.temp_c;
        document.getElementById('wind_kph').innerHTML=result.current.wind_kph;
        document.getElementById('wind_degree').innerHTML=result.current.wind_degree;
        document.getElementById('humidity').innerHTML=result.current.humidity;
        document.getElementById('feelslike_c').innerHTML=result.current.feelslike_c;
        document.getElementById('condition').innerHTML=result.current.condition.text;
        document.getElementById('uv').innerHTML=result.current.uv;
        document.getElementById('conditionBG').innerHTML=`<img src="https:${result.current.condition.icon}" style="width: 30px; height: 30px;">`;
        
        return result;
    } catch (error) {
        console.error(error);
    }
}


async function fetchWeatherForCities(cities) {
    for (let i = 0; i < cities.length; i++) {
        const result = await fetchWeather(cities[i]);

        document.getElementById(`temp_c${i + 1}`).innerHTML = result.current.temp_c;
        document.getElementById(`wind_kph${i + 1}`).innerHTML = result.current.wind_kph;
        document.getElementById(`wind_degree${i + 1}`).innerHTML = result.current.wind_degree;
        document.getElementById(`humidity${i + 1}`).innerHTML = result.current.humidity;
        document.getElementById(`feelslike_c${i + 1}`).innerHTML = result.current.feelslike_c;
        document.getElementById(`uv${i + 1}`).innerHTML = result.current.uv;
    }
}

const cities = ["Singapore", "Shanghai", "Nanjing", "Lucknow", "Delhi", "Kolkata"];
fetchWeatherForCities(cities);
