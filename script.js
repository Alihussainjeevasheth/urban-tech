
        let attachedFile = null;
        let fileContent = null;

        function toggleDropdown() {
            const dropdown = document.getElementById('dropdownMenu');
            dropdown.classList.toggle('active');
        }

        function selectModel(modelName) {
            document.getElementById('selectedModel').textContent = modelName;
            toggleDropdown();
        }

        async function addContent() {
            const input = document.getElementById('mainInput');
            const text = input.value.trim();
            
            if (!text && !attachedFile) {
                alert('Please enter some text or attach a document!');
                return;
            }
            
            await processInput(text);
            input.value = '';
        }

        function attachFile() {
            document.getElementById('fileInput').click();
        }

        async function handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                attachedFile = file;
                document.getElementById('fileInfo').textContent = `📎 ${file.name}`;
                document.getElementById('filePreview').classList.add('active');
                
                // Read file content
                try {
                    const text = await readFileContent(file);
                    fileContent = text;
                } catch (error) {
                    console.error('Error reading file:', error);
                    alert('Error reading file. Please try again.');
                }
            }
        }

        function readFileContent(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = (e) => reject(e);
                reader.readAsText(file);
            });
        }

        function removeFile() {
            attachedFile = null;
            fileContent = null;
            document.getElementById('filePreview').classList.remove('active');
            document.getElementById('fileInput').value = '';
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                addContent();
            }
        }

        async function processInput(text) {
            const welcomeText = document.getElementById('welcomeText');
            const outputAreaTop = document.getElementById('outputAreaTop');
            const outputTextTop = document.getElementById('outputTextTop');
            const model = document.getElementById('selectedModel').textContent;
            
            // Hide welcome text and show output area
            welcomeText.classList.add('hidden');
            outputAreaTop.classList.add('active');
            
            outputTextTop.innerHTML = '<div class="loading"></div> Processing...';
            
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            let result = `<strong>Mode:</strong> ${model}<br><br>`;
            
            if (attachedFile && fileContent) {
                result += `<strong>Document:</strong> ${attachedFile.name}<br><br>`;
                result += `<strong>Analysis:</strong><br>`;
                result += analyzeLegalDocument(fileContent, model);
            } else if (text) {
                result += `<strong>Your question:</strong> ${text}<br><br>`;
                result += `<strong>Answer:</strong><br>`;
                result += generateResponse(text, model);
            }
            
            outputTextTop.innerHTML = result;
        }

        function analyzeLegalDocument(content, mode) {
            const wordCount = content.split(/\s+/).length;
            
            if (mode === 'Brief') {
                return `This document contains approximately ${wordCount} words. It appears to be a legal or terms document. Key sections may include terms of service, privacy policies, and user agreements.<br><br><em>Tip: Upload actual legal documents for detailed analysis.</em>`;
            } else if (mode === 'Detailed') {
                return `<strong>Document Statistics:</strong><br>
                        • Word count: ${wordCount}<br>
                        • Estimated reading time: ${Math.ceil(wordCount / 200)} minutes<br><br>
                        <strong>Common Legal Sections Detected:</strong><br>
                        • Terms and Conditions<br>
                        • Privacy Policy<br>
                        • User Responsibilities<br><br>
                        <em>This is a demo. Actual implementation would use AI to analyze legal language.</em>`;
            } else {
                return `<strong>Key Points:</strong><br>
                        ✓ Document length: ${wordCount} words<br>
                        ✓ Type: Legal/Terms document<br>
                        ✓ Complexity: Moderate<br>
                        ✓ Review recommended: Yes<br><br>
                        <em>Upload real documents for AI-powered analysis.</em>`;
            }
        }

        function generateResponse(question, mode) {
            if (mode === 'Brief') {
                return `This is a brief response to your question. In a full implementation, this would provide concise legal information.`;
            } else if (mode === 'Detailed') {
                return `This is a detailed response. A real implementation would provide comprehensive legal explanations, relevant case law, and practical examples.`;
            } else {
                return `<strong>Key Points:</strong><br>
                        • Point 1: Legal concept explanation<br>
                        • Point 2: Relevant considerations<br>
                        • Point 3: Practical implications<br><br>
                        <em>This is a demo interface.</em>`;
            }
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('dropdownMenu');
            const selector = document.querySelector('.model-selector');
            
            if (selector && !selector.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    