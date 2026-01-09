
        let isVoiceActive = false;
        let attachedFile = null;

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
                
                // Simulate voice input (in real app, would use Web Speech API)
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

        function processInput(text) {
            const outputArea = document.getElementById('outputArea');
            const outputText = document.getElementById('outputText');
            const model = document.getElementById('selectedModel').textContent;
            
            outputArea.classList.add('active');
            outputText.innerHTML = `<strong>Model:</strong> ${model}<br><br><strong>Your input:</strong> ${text}`;
            
            if (attachedFile) {
                outputText.innerHTML += `<br><br><strong>Attached file:</strong> ${attachedFile.name}`;
            }
            
            outputText.innerHTML += `<br><br><em>In a real implementation, this would send your input to the AI model for processing.</em>`;
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('dropdownMenu');
            const selector = document.querySelector('.model-selector');
            
            if (!selector.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    