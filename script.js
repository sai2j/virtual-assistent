let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "En-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good morning, sir!");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon, sir!");
    } else {
        speak("Good evening, sir!");
    }
}

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = "en-US";

recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript.toLowerCase();
    content.innerText = transcript;
    takeCommand(transcript);
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none"; 
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sahil, how can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Sahil sir.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open brave")) {
        speak("Opening Brave Browser...");
        window.open("https://www.brave.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calc");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
        speak("The current time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: "2-digit", month: "short" });
        speak("Today's date is " + date);
    } else {
        let finalText = "Here is what I found on the internet regarding " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("shifra", "").replace("shipra", "")}`, "_blank");
    }
}

