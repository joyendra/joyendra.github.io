function animateDonation(amount) {
    const animations = {
        1: "bounce",
        5: "shake",
        10: "spin",
        50: "jiggle",
        custom: "flash"
    };
    const animationClass = animations[amount] || animations.custom;
    const donationMessage = `Thank you for your generous donation of $${amount}!`;
    const animationElement = document.createElement('div');
    animationElement.className = `donation-animation ${animationClass}`;
    animationElement.innerText = donationMessage;
    document.body.appendChild(animationElement);
    setTimeout(() => {
        animationElement.remove();
    }, 3000);
}

function triggerAnimation(amount) {
    animateDonation(amount);
}

function showFunnyAnimation(amount) {
    const messages = {
        1: `Thanks for the candy money! 🍬<img src="https://c8.alamy.com/comp/2T2J6Y4/candy-cartoon-icon-vector-illustration-of-candy-isolated-on-white-background-candy-icon-for-web-mobile-app-promo-vector-illustration-2T2J6Y4.jpg" alt="Candy" style="max-width: 200px; display: block; margin: 10px auto;">`,
        5: `Thanks for the coffee money! ☕<img src="https://i.etsystatic.com/40533556/r/il/0c9678/5570064193/il_fullxfull.5570064193_s3wi.jpg" alt="Coffee" style="max-width: 200px; display: block; margin: 10px auto;">`,
        10: `Thanks for the chicken-over-rice money! 🍛<img src="https://platform.ny.eater.com/wp-content/uploads/sites/6/chorus/uploads/chorus_asset/file/25984340/RMMY_S1_FG_01081801_Still192_3000.jpg?quality=90&strip=all&crop=0%2C10.747415390477%2C100%2C78.505169219047&w=1200" alt="Chicken over rice" style="max-width: 200px; display: block; margin: 10px auto;">`,
        50: `Thanks for the pizza party money! 🍕<img src="https://twinkletwinklelittleone.com/cdn/shop/products/PizzaParty_FingerPuppetBoardBook1.jpg?v=1656538349&width=2100" alt="Pizza" style="max-width: 200px; display: block; margin: 10px auto;">`,
        other: `Oooh secret! 🎁<img src="https://stock.adobe.com/images/cartoon-gift-box-surprise-present-with-ribbon-and-bow-festive-package-with-confetti-greeting-card-birthday-and-christmas-celebration-secret-wrapped-container-isolated-vector-illustration/681251096?as_campaign=ft_confirmation&as_content=stock.adobe.com/en/images&as_audience=srp&tduid=2c3f0e8f4a2de9f0b9a4ef0f8d3d3b70&as_channel=affiliate&as_campclass=redirect&as_source=arvato" alt="Secret gift" style="max-width: 200px; display: block; margin: 10px auto;">`
    };
    const message = messages[amount] || "Thanks for your generosity! 🎉";
    
    // Show notification
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    notificationMessage.innerHTML = message;
    notification.classList.remove('hidden');
    
    // Animate notification with GSAP
    gsap.fromTo(
        notification,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );
    createConfetti();
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        gsap.to(notification, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => notification.classList.add('hidden'),
        });
    }, 3000);
}

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.setProperty('--hue', Math.random());
        confettiContainer.appendChild(confetti);
        
        gsap.fromTo(
            confetti,
            {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: Math.random() * 0.5 + 0.5,
                rotation: Math.random() * 360,
            },
            {
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                rotation: Math.random() * 360 + 360,
                duration: Math.random() * 2 + 1,
                ease: "power2.out",
                onComplete: () => confetti.remove(),
            }
        );
    }
    
    setTimeout(() => {
        confettiContainer.remove();
    }, 4000);
}

function animateHeading() {
    // Animate the main heading
    gsap.from("#main-heading", {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "bounce.out",
    });
    
    // Animate the subheading
    gsap.from("#subheading", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: "power2.out",
    });
}

function animateButtons() {
    // Animate the donation buttons
    gsap.from(".donation-buttons button", {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
    });
}

export { animateHeading, animateButtons, showFunnyAnimation };