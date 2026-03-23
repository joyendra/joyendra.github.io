const liquidProgress = document.getElementById('liquid-progress');
const progressText = document.getElementById('progress-text');
const goalAmount = 549;
let currentAmount = 405;
let currentAnimation = null;

function updateProgressBar(amount) {
    currentAmount += amount;
    const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
    
    // Update liquid progress indicator
    if (liquidProgress) {
        const wave = document.getElementById('wave');
        const radius = 75;
        const centerY = 80;
        
        // Calculate fill height based on percentage
        const fillHeight = (progressPercentage / 100) * (2 * radius);
        const fillY = centerY + radius - fillHeight;
        
        // Kill previous animation
        if (currentAnimation) {
            currentAnimation.kill();
        }
        
        // Create smooth wave path with reduced amplitude
        const waveAmplitude = 2;
        const path = `
            M 0,${fillY}
            Q 20,${fillY - waveAmplitude} 40,${fillY}
            T 80,${fillY}
            T 120,${fillY}
            T 160,${fillY}
            L 160,160
            L 0,160
            Z
        `;
        
        wave.setAttribute('d', path);
        
        // Animate wave motion with small range (±5 pixels)
        currentAnimation = gsap.to(wave, {
            attr: { 
                d: `
                    M 0,${fillY - 5}
                    Q 20,${fillY - 5 - waveAmplitude} 40,${fillY - 5}
                    T 80,${fillY - 5}
                    T 120,${fillY - 5}
                    T 160,${fillY - 5}
                    L 160,160
                    L 0,160
                    Z
                `
            },
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }
    
    // Update percentage text
    if (currentAmount >= goalAmount) {
        progressText.textContent = `🎉`;
        progressText.style.fontSize = "24px";
    } else {
        progressText.textContent = `${Math.round(progressPercentage)}%`;
        progressText.style.fontSize = "14px";
    }
}

function resetProgressBar() {
    currentAmount = 0;
    if (currentAnimation) {
        currentAnimation.kill();
    }
    const wave = document.getElementById('wave');
    if (wave) {
        wave.setAttribute('d', 'M 0,155 Q 20,145 40,155 T 80,155 T 120,155 T 160,155 L 160,160 L 0,160 Z');
    }
    progressText.textContent = `0%`;
}

// Initialize progress bar with current amount
updateProgressBar(0);

export { updateProgressBar, resetProgressBar };