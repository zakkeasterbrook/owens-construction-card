// JavaScript to control audio playback and synchronized real-time captions
const playButton = document.getElementById('play-voice');
const caption = document.getElementById('caption');

// Array of audio elements with their captions and exact durations
const voices = [
    { 
        audio: document.getElementById('voice1'), 
        text: "Hey, I’m Mike Owens, founder of Owens Construction. At Owens, we’re committed to providing top-notch roofing and siding services in Northeast Ohio. Whether it's storm damage repair or a complete roofing makeover, we’ve got you covered. Visit owensroofs.com to learn more and get your free quote today!", 
        duration: 15 // seconds
    },
    { 
        audio: document.getElementById('voice2'), 
        text: "Mike Owens here from Owens Construction. Our team believes in delivering quality you can trust with every project. From start to finish, we ensure the highest standards of workmanship and customer service. Need help with your roof? Don’t worry, just give us a call or check us out at owensroofs.com!", 
        duration: 16 // seconds
    },
    { 
        audio: document.getElementById('voice3'), 
        text: "Hi, this is Mike from Owens Construction. Right now, we’re offering free estimates on all roofing and siding projects. With over 25 years of experience, we’re your go-to experts in Northeast Ohio. Contact us today to see how we can help protect and beautify your home!", 
        duration: 14 // seconds
    },
    { 
        audio: document.getElementById('voice4'), 
        text: "Hello, I’m Mike Owens from Owens Construction. We’re proud to serve the communities of Columbiana, Mahoning, and Trumbull counties. Our goal is to make sure every roof we work on keeps your family safe and secure. Need a trusted roofer? Visit owensroofs.com and let’s get started!", 
        duration: 16 // seconds
    },
    { 
        audio: document.getElementById('voice5'), 
        text: "Mike Owens here with Owens Construction. When it comes to roofing, quality and reliability are our top priorities. We offer 24/7 emergency services and are always ready to help with storm damage or any roofing needs. Reach out to us at owensroofs.com for fast, friendly service!", 
        duration: 17 // seconds
    }
];

playButton.addEventListener('click', function() {
    // Stop and reset all audio elements
    voices.forEach(voice => {
        voice.audio.pause();
        voice.audio.currentTime = 0;
    });

    // Pick a random voice and play it
    const randomVoice = voices[Math.floor(Math.random() * voices.length)];
    randomVoice.audio.play();

    // Display captions with precise timing
    showCaptions(randomVoice.text, randomVoice.audio, randomVoice.duration);
});

// Function to display captions in sync with audio
function showCaptions(text, audio, duration) {
    const words = text.split(' ');
    let index = 0;
    caption.style.display = 'block';
    caption.textContent = '';

    // Calculate exact time per word based on total duration
    const totalWords = words.length;
    const intervalTime = (duration * 1000) / (totalWords / 3); // Adjusted to split words into smaller groups

    const updateCaptions = () => {
        if (index < words.length) {
            // Get a segment of 2-4 words depending on remaining words
            const segmentLength = Math.min(Math.floor(Math.random() * 3) + 2, words.length - index);
            const segment = words.slice(index, index + segmentLength).join(' ');
            caption.textContent = segment;
            index += segmentLength;
        } else {
            clearInterval(intervalId);
        }
    };

    // Set interval for updating captions based on calculated time per segment
    const intervalId = setInterval(updateCaptions, intervalTime);

    // Clear captions when audio ends
    audio.onended = () => {
        clearInterval(intervalId);
        caption.style.display = 'none';
    };
}
