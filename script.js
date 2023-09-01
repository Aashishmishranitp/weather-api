const apiKey = '6f206354c2c3ac7b43a4d76707e7f3d4';
const message = document.querySelector(".head");
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const weatherDiv = document.querySelector('#weather');

document.addEventListener('DOMContentLoaded', () => {
    const imageUrl = ["backgroung2.jpg", "homepageImage.webp", "homepageImage2.jpeg", "homepageImage3.jpeg", "homepageImage4.jpeg"];
    const backgroud = document.querySelector(".bg1");
    let currentIndex = 0;

    function changeBackground() {
        currentIndex = (currentIndex + 1) % imageUrl.length;
        backgroud.src = `/${imageUrl[currentIndex]}`;
    }

    // Start the automatic background slide
    setInterval(changeBackground, 3000);
})
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchQuery = searchInput.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then(data => {
            if (data.cod === 200) {
                const city = data.name;
                const temp = data.main.temp;
                const description = data.weather[0].description;
                weatherDiv.innerHTML = `
					<h2>Weather in ${city}</h2>
					<p>Temperature: ${temp} &#8451;</p>
					<p>Description: ${description}</p>
				`;
                weatherDiv.style.display = 'block';
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            weatherDiv.innerHTML = error.message;
        })
        .finally(() => {
            searchInput.value = '';
        });
});
