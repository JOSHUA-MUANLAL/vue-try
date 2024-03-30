Vue.component('weather', {
      template: `
        <div>
          <h1>Weather App</h1>
          <div v-if="loading">Loading...</div>
          <div v-else-if="error">{{ error }}</div>
          <div v-else>
            <p>City: {{ weather.city }}</p>
            <p>Temperature: {{ weather.temperature }}°C</p>
            <p>Description: {{ weather.description }}</p>

            <form @submit.prevent="fetchWeatherData">
            <label for="cityInput">Enter City Name:</label>
            <input type="text" id="cityInput" v-model="city">
            <button type="submit">Get Weather</button>
          </form>
          </div>
        </div>
      `,
      data() {
        return {
          weather: {},
          loading: false,
          error: null,
          city:""
        };
      },
      methods: {
        fetchWeatherData() {
          if (!this.city) {
            this.error = 'Please enter a city name';
            return;
          }
        
          const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=4de4db30a24565b1ba581198fbedf9e4`;
        this.loading=true;
          axios.get(URL)
            .then(response => {
              this.loading=false;
              this.weather = {
                city: response.data.name,
                temperature: response.data.main.temp,
                description: response.data.weather[0].description
              };
              this.loading = false;
            })
            .catch(error => {
              this.loading = false;
              this.error = 'Error fetching weather data';
              console.error(error);
            });
        }
        
        
      }
    });

    new Vue({
      el: '#app'
    });