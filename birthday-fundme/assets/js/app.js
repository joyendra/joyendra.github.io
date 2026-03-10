import { updateProgressBar } from './progressBar.js';
import { animateHeading, animateButtons, showFunnyAnimation } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    // Trigger heading and button animations on page load
    animateHeading();
    animateButtons();

    const donateButtons = document.querySelectorAll('.donate-btn');
    const otherBtn = document.getElementById('other-btn');
    const customSubmit = document.getElementById('custom-submit');
    const customAmountInput = document.getElementById('custom-amount');
    const hitItBtn = document.getElementById('hit-it-btn');
    const donationDisplay = document.getElementById('donation-display');
    const customDonationSection = document.querySelector('.custom-donation');
    const patronsList = document.getElementById('patrons-list');
    const patronsListThankYou = document.getElementById('patrons-list-thank-you');

    let totalDonated = 0;
    let patrons = [{ name: 'Siddharth', date: new Date().toLocaleDateString() },
    { name: 'Urvika', date: new Date().toLocaleDateString() },
    { name: 'Vridhi', date: new Date().toLocaleDateString() }
];

    // Initially hide the custom donation section and show donation display
    customDonationSection.classList.add('hidden');
    donationDisplay.textContent = `You want to donate: $${totalDonated}`;

    // Display existing patrons
    displayPatrons();

    donateButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amount = parseInt(button.dataset.amount);
            handleDonation(amount, amount);
        });
    });

    otherBtn.addEventListener('click', () => {
        // Show the custom input section
        customDonationSection.classList.remove('hidden');
        customAmountInput.focus();
    });

    customAmountInput.addEventListener('input', () => {
        // Validate input in real-time
        if (customAmountInput.value < 1 || isNaN(customAmountInput.value)) {
            customSubmit.disabled = true;
        } else {
            customSubmit.disabled = false;
        }
    });

    customSubmit.addEventListener('click', () => {
        const amount = parseInt(customAmountInput.value);
        if (amount > 0) {
            handleDonation(amount, 'other');
            customAmountInput.value = '';
            customSubmit.disabled = true;
            // Hide the custom donation section after submit
            customDonationSection.classList.add('hidden');
        } else {
            alert('Please enter a valid amount greater than $0');
        }
    });

    hitItBtn.addEventListener('click', () => {
        // Show QR code as a modal/popup
        showQRModal();
    });

    function handleDonation(amount, type) {
        totalDonated += amount;
        updateProgressBar(amount);
        showFunnyAnimation(type);

        // Update the donation display - KEEP VISIBLE
        donationDisplay.textContent = `You want to donate: $${totalDonated}`;
        donationDisplay.classList.remove('hidden');

        if (totalDonated >= 1) {
            hitItBtn.disabled = false;
        }
    }

    function showQRModal() {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.id = 'qr-modal';
        modal.className = 'qr-modal-overlay';
        modal.innerHTML = `
            <div class="qr-modal-content">
                <button class="qr-modal-close">&times;</button>
                <h2>Scan to Donate</h2>
                <img src="assets/qr-code/qr-code.jpeg" alt="Payment QR Code" class="qr-modal-image">
                <p>Total: $${totalDonated}</p>
                <p class="text-white mt-3 small">After scanning, enter your name below to be added to our patrons list!</p>
                <input type="text" id="patron-name-input" placeholder="Enter your name" class="form-control mb-2 mt-2" maxlength="30">
                <button id="add-patron-btn" class="btn btn-sm btn-success mt-2">Add to Patrons</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal on X click or outside click
        const closeBtn = modal.querySelector('.qr-modal-close');
        const addPatronBtn = modal.querySelector('#add-patron-btn');
        const patronNameInput = modal.querySelector('#patron-name-input');

        closeBtn.addEventListener('click', () => {
            showThankYouMessage();
            modal.remove();
        });

        addPatronBtn.addEventListener('click', () => {
            const name = patronNameInput.value.trim();
            if (name) {
                addPatron(name);
                modal.remove();
            } else {
                alert('Please enter your name');
            }
        });

        patronNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addPatronBtn.click();
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                showThankYouMessage();
                modal.remove();
            }
        });

        patronNameInput.focus();
    }

    function addPatron(name) {
        patrons.push({
            name: name,
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('patrons', JSON.stringify(patrons));
        displayPatrons();
        
        // Show thank you message
        showThankYouMessage();
    }

    function displayPatrons() {
        if (patrons.length === 0) {
            patronsList.innerHTML = '<p class="text-muted small">No patrons yet. Be the first to donate!</p>';
            patronsListThankYou.innerHTML = '<p class="text-muted small">No patrons yet. Be the first to donate!</p>';
            return;
        }

        let patronsHTML = '<div class="patron-names">';
        patrons.forEach(patron => {
            patronsHTML += `
                <div class="patron-badge">
                    <span class="patron-name">${patron.name}</span>
                </div>
            `;
        });
        patronsHTML += '</div>';
        patronsList.innerHTML = patronsHTML;
        patronsListThankYou.innerHTML = patronsHTML;
    }

    function showThankYouMessage() {
        const donationSection = document.querySelector('.donation-section');
        const thankYouSection = document.getElementById('thank-you-section');
        
        donationSection.classList.add('hidden');
        thankYouSection.classList.remove('hidden');
    }
});