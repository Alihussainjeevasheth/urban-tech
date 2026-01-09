let isVoiceActive = false;
let attachedFile = null;

/* =========================
   🔹 API CONFIGURATION
   🔹 ADD YOUR API DETAILS HERE
   ========================= */

// Example backend endpoint (Node / AWS / etc.)
const API_ENDPOINT = "https://your-backend-api.com/chat";

// If using API key (recommended to keep this on backend)
const API_KEY = "YOUR_API_KEY_HERE"; // ❌ Avoid exposing in production

/* ========================= */

function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('active');
}

function selectModel(modelName) {
    document.getElementById('selectedModel').textContent = modelName;
    toggleDropdown();
}

function addContent() {
    const input = document.getElementById('mainInput');
    if (input.value.trim()) {
        processInput(input.value);
        input.value = '';
    } else {
        alert('Please enter some text first!');
    }
}

function attachFile() {
    document.getElementById('fileInput').click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        attachedFile = file;
        document.getElementById('fileInfo').textContent = `📎 ${file.name}`;
        document.getElementById('filePreview').classList.add('active');
    }
}

function removeFile() {
    attachedFile = null;
    document.getElementById('filePreview').classList.remove('active');
    document.getElementById('fileInput').value = '';
}

function toggleVoice() {
    isVoiceActive = !isVoiceActive;
    const indicator = document.getElementById('voiceIndicator');
    const voiceBtn = document.getElementById('voiceBtn');
    
    if (isVoiceActive) {
        indicator.classList.add('active');
        voiceBtn.style.background = '#ffebee';
        
        // Simulated voice input
        setTimeout(() => {
            const simulatedText = "This is simulated voice input";
            document.getElementById('mainInput').value = simulatedText;
            toggleVoice();
        }, 3000);
    } else {
        indicator.classList.remove('active');
        voiceBtn.style.background = 'transparent';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addContent();
    }
}

/* =========================
   🔹 API CALL FUNCTION
   🔹 THIS SENDS DATA TO BACKEND
   ========================= */

async function sendToAPI(text, model) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}` // Optional
            },
            body: JSON.stringify({
                model: model,
                prompt: text,
                fileName: attachedFile ? attachedFile.name : null
            })
        });

        const data = await response.json();
        return data.reply || "No response from API";

    } catch (error) {
        console.error("API Error:", error);
        return "Error connecting to AI service.";
    }
}

/* ========================= */

async function processInput(text) {
    const outputArea = document.getElementById('outputArea');
    const outputText = document.getElementById('outputText');
    const model = document.getElementById('selectedModel').textContent;
    
    outputArea.classList.add('active');
    outputText.innerHTML = `<strong>Model:</strong> ${model}<br><br>
                            <strong>Your input:</strong> ${text}<br><br>
                            <em>Processing...</em>`;

    /* =========================
       🔹 API ENDPOINT IS CALLED HERE
       ========================= */

    const aiResponse = await sendToAPI(text, model);

    outputText.innerHTML = `<strong>Model:</strong> ${model}<br><br>
                            <strong>Your input:</strong> ${text}<br><br>
                            <strong>AI Response:</strong><br>${aiResponse}`;

    if (attachedFile) {
        outputText.innerHTML += `<br><br><strong>Attached file:</strong> ${attachedFile.name}`;
    }
}

/* ========================= */

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdownMenu');
    const selector = document.querySelector('.model-selector');
    
    if (!selector.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});
