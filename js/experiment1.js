// Research data storage -------------------------//

        let researchData = [];
        let currentSession = {
            startTime: Date.now(),
            sessionId: 'session_' + Date.now(),
            configurations: []
        };

// UI elements ---------------------------//

        const controls = {
            duration: document.getElementById('duration'),
            delay: document.getElementById('delay'),
            scale: document.getElementById('scale'),
            easing: document.getElementById('easing'),
            shadow: document.getElementById('shadow'),
            colorShift: document.getElementById('colorShift')
        };

        const testButton = document.getElementById('test-button');
        const currentConfig = document.getElementById('current-config');
        const brandDescription = document.getElementById('brand-description');



// Brand personality presets -------------------//

        const presets = {
            premium: {
                duration: 300,
                delay: 0,
                scale: 0.98,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                shadow: 2,
                colorShift: 5,
                description: 'Smooth, controlled, premium feel - subtle and refined'
            },
            playful: {
                duration: 200,
                delay: 0,
                scale: 1.1,
                easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                shadow: 8,
                colorShift: 20,
                description: 'Bouncy, energetic, fun - encourages interaction'
            },
            corporate: {
                duration: 150,
                delay: 0,
                scale: 0.96,
                easing: 'ease-out',
                shadow: 1,
                colorShift: 3,
                description: 'Efficient, minimal, professional - gets the job done'
            },
            energetic: {
                duration: 100,
                delay: 0,
                scale: 1.05,
                easing: 'ease-in-out',
                shadow: 6,
                colorShift: 15,
                description: 'Fast, responsive, dynamic - motivating and action-oriented'
            },
            minimal: {
                duration: 250,
                delay: 0,
                scale: 1.0,
                easing: 'ease',
                shadow: 0,
                colorShift: 8,
                description: 'Clean, simple, understated - focuses on content'
            }
        };


// Update Functions ---------------------//

        function updateAllValues() {
            document.getElementById('duration-value').textContent = controls.duration.value + 'ms';
            document.getElementById('delay-value').textContent = controls.delay.value + 'ms';
            document.getElementById('scale-value').textContent = controls.scale.value;
            document.getElementById('shadow-value').textContent = controls.shadow.value + 'px';
            document.getElementById('colorShift-value').textContent = controls.colorShift.value + '%';
            
            updateButtonStyle();
            updateConfigDisplay();
        }

        function updateButtonStyle() {
            const duration = controls.duration.value;
            const delay = controls.delay.value;
            const scale = controls.scale.value;
            const easing = controls.easing.value;
            const shadow = controls.shadow.value;
            
            testButton.style.transitionDuration = duration + 'ms';
            testButton.style.transitionDelay = delay + 'ms';
            testButton.style.transitionTimingFunction = easing;
            testButton.style.setProperty('--press-scale', scale);
            testButton.style.boxShadow = `0 ${shadow}px ${shadow*2}px rgba(0,0,0,0.2)`;
        }
        
        // Create separate hover handlers outside updateButtonStyle
        const originalColor = '#007AFF'
        function handleMouseEnter() {
            const shiftPercentage = controls.colorShift.value / 100;
            testButton.style.backgroundColor = adjustColor(originalColor, shiftPercentage);
        }

        function handleMouseLeave() {
            testButton.style.backgroundColor = originalColor;
        }

        // Add event listeners once
        testButton.addEventListener('mouseenter', handleMouseEnter);
        testButton.addEventListener('mouseleave', handleMouseLeave);
        
        function updateConfigDisplay() {
            currentConfig.innerHTML = `
                Duration: ${controls.duration.value}ms<br>
                Delay: ${controls.delay.value}ms<br>
                Scale: ${controls.scale.value}<br>
                Easing: ${controls.easing.value}<br>
                Shadow: ${controls.shadow.value}px<br>
                Color Shift: ${controls.colorShift.value}%
            `;
        }


        
// Event Listeners ---------------------//

        Object.values(controls).forEach(control => {
            control.addEventListener('input', updateAllValues);
        });



// Preset Buttons ---------------------//

        document.querySelectorAll('.preset-button').forEach(button => {
            button.addEventListener('click', () => {
                const presetName = button.dataset.preset;
                
                // Check if button is already active
                if (button.classList.contains('active')) {
                    // Deselect the preset
                    button.classList.remove('active');
                    // Reset to default values
                    controls.duration.value = 200;
                    controls.delay.value = 0;
                    controls.scale.value = 0.95;
                    controls.easing.value = 'ease';
                    controls.shadow.value = 4;
                    controls.colorShift.value = 10;
                } else {
                    // Select new preset
                    const preset = presets[presetName];
                    
                    // Update controls
                    controls.duration.value = preset.duration;
                    controls.delay.value = preset.delay;
                    controls.scale.value = preset.scale;
                    controls.easing.value = preset.easing;
                    controls.shadow.value = preset.shadow;
                    controls.colorShift.value = preset.colorShift;
                    
                    // Visual feedback
                    document.querySelectorAll('.preset-button').forEach(b => b.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Record preset selection
                    const config = {
                        timestamp: Date.now() - currentSession.startTime,
                        duration: preset.duration,
                        delay: preset.delay,
                        scale: preset.scale,
                        easing: preset.easing,
                        shadow: preset.shadow,
                        colorShift: preset.colorShift,
                        note: `Preset: ${presetName}`
                    };
                    
                    currentSession.configurations.push(config);
                    researchData.push(config);
                }
                
                // Update UI
                updateAllValues();
            });
        });

// Research functions
        function recordCurrentConfig(note = '') {
            const config = {
                timestamp: Date.now() - currentSession.startTime,
                duration: controls.duration.value,
                delay: controls.delay.value,
                scale: controls.scale.value,
                easing: controls.easing.value,
                shadow: controls.shadow.value,
                colorShift: controls.colorShift.value,
                note: note
            };
            
            currentSession.configurations.push(config);
            researchData.push(config);
            
            alert('Configuration recorded! Continue exploring different settings.');
        }
        
        function generateRandomConfig() {
            controls.duration.value = Math.floor(Math.random() * 750) + 50;
            controls.delay.value = Math.floor(Math.random() * 200);
            controls.scale.value = (Math.random() * 0.4 + 0.9).toFixed(2);
            controls.shadow.value = Math.floor(Math.random() * 20);
            controls.colorShift.value = Math.floor(Math.random() * 40);
            
            const easingOptions = controls.easing.options;
            controls.easing.selectedIndex = Math.floor(Math.random() * easingOptions.length);
            
            updateAllValues();
            recordCurrentConfig('Random generation');
        }
        
        function exportResearchData() {
            const exportData = {
                sessionInfo: currentSession,
                allConfigurations: researchData,
                researchNotes: {
                    purpose: 'Brand personality perception through interaction parameters',
                    parameters: Object.keys(controls),
                    totalConfigurations: researchData.length
                }
            };
            
            const blob = new Blob([JSON.stringify(exportData, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `interaction_research_${currentSession.sessionId}.json`;
            a.click();
            
            console.log('Research data exported:', exportData);
            alert('Research data exported to JSON file!');
        }
        
        function showConfigCode() {
            const css = `
.button {
    transition-duration: ${controls.duration.value}ms;
    transition-delay: ${controls.delay.value}ms;
    transition-timing-function: ${controls.easing.value};
    box-shadow: 0 ${controls.shadow.value}px ${controls.shadow.value*2}px rgba(0,0,0,0.2);
}

.button:active {
    transform: scale(${controls.scale.value});
}

.button:hover {
    filter: brightness(${100 - controls.colorShift.value}%);
}
            `.trim();
            
            navigator.clipboard.writeText(css);
            alert('CSS code copied to clipboard!');
        }
        
        function adjustColor(color, percentage) {
            const hex = color.replace('#', '');
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            
            // Change to negative amount to darken
            const amount = -Math.round(255 * percentage);
            
            const newR = Math.max(0, r + amount);
            const newG = Math.max(0, g + amount);
            const newB = Math.max(0, b + amount);
            
            return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
        }
        
        // Initialize
        updateAllValues();

