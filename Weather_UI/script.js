document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Array of weekday names
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Create a new Date object for today
    const todayDate = new Date();

    // Get today's day index
    const todayIndex = todayDate.getDay();

    // Select DOM elements for the days
    const day2 = document.getElementById("day2");
    const day3 = document.getElementById("day3");
    const day4 = document.getElementById("day4");
    const day5 = document.getElementById("day5");
    const day6 = document.getElementById("day6");
    const day7 = document.getElementById("day7");

    // Select other DOM elements
    const city = document.getElementById("city");
    const search =
      document.getElementById("search-btn");
    const currentWeather =
      document.getElementById("temperature");
    const weatherDescription =
      document.getElementById(
        "weather_description"
      );
    const humidity =
      document.getElementById("humidity");
    const uvIndex =
      document.getElementById("uvIndex");
    const windSpeed =
      document.getElementById("windSpeed");
    const visibility =
      document.getElementById("visibility");
    const sunSet =
      document.getElementById("sunSet");
    const sunRise =
      document.getElementById("sunRise");

    // Function to fetch data
    const fetchCurrentData = async (cityName) => {
      const url = `http://api.weatherstack.com/current?access_key=dec72b39a76d40863c324fcd99a6aaa4&query=${cityName}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.current;
      } catch (error) {
        console.error(
          "Error fetching data:",
          error
        );
        return null;
      }
    };

    // Event listener for the search button click
    search.addEventListener("click", async () => {
      console.log("tapped");

      // Get the city name from the input field
      const cityName = city.value.trim();
      console.log("City:", cityName);

      if (!cityName) {
        console.error(
          "Please enter a valid city name."
        );
        return;
      }

      // Fetch data using the city name
      const currentData = await fetchCurrentData(
        cityName
      );

      if (currentData) {
        // Display the data
        currentWeather.innerText =
          currentData.temperature;
        weatherDescription.innerText =
          currentData.weather_descriptions[0];
        humidity.innerText = currentData.humidity;
        windSpeed.innerText =
          currentData.wind_speed;
        uvIndex.innerText = currentData.uv_index;
        visibility.innerText =
          currentData.visibility;

        day2.innerText =
          days[(todayIndex + 1) % 7];
        day3.innerText =
          days[(todayIndex + 2) % 7];
        day4.innerText =
          days[(todayIndex + 3) % 7];
        day5.innerText =
          days[(todayIndex + 4) % 7];
        day6.innerText =
          days[(todayIndex + 5) % 7];
        day7.innerText =
          days[(todayIndex + 6) % 7];
      } else {
        console.error(
          "Error: Invalid data received"
        );
        currentWeather.innerText =
          "Error fetching weather data.";
        weatherDescription.innerText = "";
      }
    });
  }
);
