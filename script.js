// MAP INITIALIZATION (example: Bangalore)
const map = L.map('map').setView([12.9716, 77.5946], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Sample zones
L.marker([12.9716, 77.5946]).addTo(map).bindPopup("City Center");
L.marker([12.9352, 77.6245]).addTo(map).bindPopup("Residential Zone");
L.marker([12.9986, 77.5921]).addTo(map).bindPopup("Industrial Area");

function showPanel(type) {
    const panel = document.getElementById("panel");

    if (type === "traffic") {
        panel.innerHTML = `
            <h3>🚦 Traffic Status</h3>
            <p>Peak Hour: 5–7 PM</p>
            <p>Congestion Level: <b style="color:red">HIGH</b></p>
            <p>AI Prediction: Avoid central roads</p>
        `;
    }

    if (type === "electricity") {
        panel.innerHTML = `
            <h3>⚡ Electricity Management</h3>
            <p>City Load: 78%</p>
            <p>Outage Zones: 2</p>
            <p>Status: <b style="color:#22c55e">STABLE</b></p>
        `;
    }

    if (type === "water") {
        panel.innerHTML = `
            <h3>💧 Water Management</h3>
            <p>Reservoir Level: 64%</p>
            <p>Supply Status: Normal</p>
            <p>Leak Alerts: 1 detected</p>
        `;
    }

    if (type === "safety") {
        panel.innerHTML = `
            <h3>🚺 Women Safety</h3>
            <p>Safe Zones: 12</p>
            <p>Active SOS Alerts: 0</p>
            <p>Police Patrols: Active</p>
        `;
    }
   if (type === "news") {
    panel.innerHTML = `
        <h3>📰 Latest City News</h3>

        <ul style="margin-top:10px; line-height:1.6">
            <li>🚧 Road maintenance on MG Road (10 PM – 5 AM)</li>
            <li>⚡ Power shutdown in Sector 12 tomorrow (2 hrs)</li>
            <li>💧 Water supply restored in North Zone</li>
            <li>🚨 Traffic advisory due to public event</li>
            <li>🚺 New women safety patrol units deployed</li>
        </ul>

        <p style="margin-top:10px; font-size:12px; color:#94a3b8">
            Updated every 30 minutes
        </p>
    `;
   }
   if (type === "connect") {
    panel.innerHTML = `
        <h3>🧑‍🤝‍🧑 Find Someone Nearby</h3>

        <p>Select your preference:</p>
        <select id="pref">
            <option>Casual Talk</option>
            <option>Study</option>
            <option>Fitness</option>
            <option>Technology</option>
            <option>Travel</option>
        </select>

        <button style="margin-top:10px" onclick="findPeople()">Find People</button>

        <div id="peopleResult" style="margin-top:10px;"></div>

        <p style="font-size:12px;color:#94a3b8;margin-top:10px">
            Radius: 1000 meters | Privacy-safe | Opt-in users only
        </p>
    `;
}

function findPeople() {
    const pref = document.getElementById("pref").value;

    const people = [
        { name: "Aarav", interest: "Technology", distance: 450 },
        { name: "Meera", interest: "Casual Talk", distance: 700 },
        { name: "Rohit", interest: "Fitness", distance: 900 },
        { name: "Ananya", interest: "Study", distance: 300 }
    ];

    let matches = people.filter(
        p => p.interest === pref && p.distance <= 1000
    );

    let html = "<b>Available nearby:</b><ul>";

    if (matches.length === 0) {
        html += "<li>No matching users nearby</li>";
    } else {
        matches.forEach(p => {
            html += `<li>${p.name} – ${p.distance} m away</li>`;
        });
    }

    html += "</ul>";
    document.getElementById("peopleResult").innerHTML = html;
}
if (type === "recommend") {
    panel.innerHTML = `
        <h3>🌟 Explore & Try New Things</h3>

        <p>Your interest:</p>
        <select id="interest">
            <option>Food</option>
            <option>Nature</option>
            <option>Technology</option>
            <option>Fitness</option>
            <option>Art & Culture</option>
        </select>

        <button style="margin-top:10px" onclick="recommend()">Get Recommendations</button>

        <div id="recResult" style="margin-top:10px;"></div>
    `;
}

function recommend() {
    const interest = document.getElementById("interest").value;

    const recommendations = {
        Food: [
            "🍜 Visit a local street food market",
            "☕ Try a newly opened café nearby"
        ],
        Nature: [
            "🌳 Morning walk at city park",
            "🚴 Cycling trail near lake"
        ],
        Technology: [
            "💻 Attend a tech meetup",
            "🧠 Visit innovation hub"
        ],
        Fitness: [
            "🏋️ Open-air gym session",
            "🧘 Yoga workshop"
        ],
        "Art & Culture": [
            "🎨 Art exhibition",
            "🎭 Local theatre performance"
        ]
    };

    let html = "<b>Recommended for you:</b><ul>";
    recommendations[interest].forEach(r => {
        html += `<li>${r}</li>`;
    });
    html += "</ul>";

    document.getElementById("recResult").innerHTML = html;
}
if (type === "aqi") {
    panel.innerHTML = `
        <h3>🌫️ Air Quality Monitoring</h3>

        <label>Enter City:</label><br>
        <input type="text" id="cityInput" placeholder="Enter city name" />

        <br><br>
        <button onclick="checkAQI()">Check AQI</button>

        <div id="aqiResult" style="margin-top:12px;"></div>

        <br>
        <button onclick="showHeatMap()">🗺️ View AQI Heat Map</button>

        <div id="heatmapInfo" style="margin-top:10px;"></div>
    `;
}
function checkAQI() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    // Simulated AQI values (prototype)
    const aqi = Math.floor(Math.random() * 200) + 50;

    let status = "";
    let advice = "";

    if (aqi <= 50) {
        status = "Good 🟢";
        advice = "Air quality is satisfactory.";
    } else if (aqi <= 100) {
        status = "Moderate 🟡";
        advice = "Sensitive individuals should reduce outdoor activity.";
    } else if (aqi <= 150) {
        status = "Unhealthy for Sensitive Groups 🟠";
        advice = "Avoid prolonged outdoor exposure.";
    } else {
        status = "Unhealthy 🔴";
        advice = "Wear masks and avoid outdoor activity.";
    }

    document.getElementById("aqiResult").innerHTML = `
        <b>City:</b> ${city}<br>
        <b>AQI:</b> ${aqi}<br>
        <b>Status:</b> ${status}<br>
        <b>Health Advisory:</b> ${advice}
    `;
}
function showPanel(type) {
    const panel = document.getElementById("panel");

    if (type === "sos") {
        panel.innerHTML = `
        <h3>🚨 Emergency SOS</h3>
        <button onclick="alert('SOS sent to nearest control center')">
            Send SOS
        </button>
        <p>Nearby Police, Hospitals notified</p>`;
    }

    if (type === "aqi") {
        panel.innerHTML = `
        <h3>🌫️ AQI Monitor</h3>
        <input id="cityInput" placeholder="Enter city">
        <button onclick="checkAQI()">Check AQI</button>
        <div id="aqiResult"></div>
        <button onclick="showHeatMap()">🗺️ Heat Map</button>
        <div id="heatmapInfo"></div>`;
    }

    if (type === "connect") {
        panel.innerHTML = `
        <h3>🧑‍🤝‍🧑 Find Someone Nearby</h3>
        <select id="pref">
            <option>Casual Talk</option>
            <option>Study</option>
            <option>Fitness</option>
            <option>Technology</option>
        </select>
        <button onclick="findPeople()">Find</button>
        <div id="peopleResult"></div>`;
    }

    if (type === "recommend") {
        panel.innerHTML = `
        <h3>🌟 Recommendations</h3>
        <select id="interest">
            <option>Food</option>
            <option>Nature</option>
            <option>Fitness</option>
            <option>Art & Culture</option>
        </select>
        <button onclick="recommend()">Suggest</button>
        <div id="recResult"></div>`;
    }

    if (type === "news") {
        panel.innerHTML = `
        <h3>📰 City News</h3>
        <ul>
            <li>⚡ Power shutdown in Sector 5</li>
            <li>🚧 Road work near bus stand</li>
            <li>🚺 Women patrol expanded</li>
        </ul>`;
    }

    if (type === "feedback") {
        panel.innerHTML = `
        <h3>🗳️ Citizen Feedback</h3>
        <textarea placeholder="Report issue"></textarea>
        <button onclick="alert('Issue submitted')">Submit</button>`;
    }

    if (type === "chat") {
        panel.innerHTML = `
        <h3>🤖 City Assistant</h3>
        <input id="q" placeholder="Ask something">
        <button onclick="chat()">Ask</button>
        <div id="chatAns"></div>`;
    }
}
function checkAQI() {
    const aqi = Math.floor(Math.random() * 200) + 50;
    document.getElementById("aqiResult").innerHTML =
        "AQI: " + aqi + (aqi > 150 ? " 🔴 Unhealthy" : " 🟢 Safe");
}

function showHeatMap() {
    document.getElementById("heatmapInfo").innerHTML =
        "🔴 High | 🟠 Medium | 🟢 Low pollution zones";
}

function findPeople() {
    document.getElementById("peopleResult").innerHTML =
        "✔ 2 users found within 1000m";
}

function recommend() {
    document.getElementById("recResult").innerHTML =
        "🌟 Visit city park, try yoga session";
}

function chat() {
    document.getElementById("chatAns").innerHTML =
        "Today AQI is moderate. Best travel time: morning.";
}

}
