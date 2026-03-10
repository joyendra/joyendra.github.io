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
        1: `Thanks for the PolarPop money! 🥤<img src="https://img.cdn4dd.com/cdn-cgi/image/fit=contain,width=1200,height=672,format=auto/https://doordash-static.s3.amazonaws.com/media/photosV2/b7055bc9-4ba5-4f4d-ae6f-b53d4fb22bc7-retina-large.png" alt="Candy" style="max-width: 200px; display: block; margin: 10px auto;">`,
        5: `Thanks for the starbucks money! ☕<img src="https://cloudassets.starbucks.com/is/image/sbuxcorp/IcedCaramelBruleeLatte?impolicy=1by1_wide_topcrop_630&crop=180,360,1440,1440&wid=630&hei=630&qlt=85" alt="Coffee" style="max-width: 200px; display: block; margin: 10px auto;">`,
        10: `Thanks for the chicken-over-rice money! 🍛<img src="https://halaladdict.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-05-11-at-4.38.51-PM.jpeg" alt="Chicken over rice" style="max-width: 200px; display: block; margin: 10px auto;">`,
        50: `Thanks for the pizza party money! 🍕<img src="https://media.gettyimages.com/id/1297246932/photo/different-tipes-of-pizza.jpg?b=1&s=2048x2048&w=0&k=20&c=JheyUJeAYlUb3BY3DF4tKIhaBlncojqhucOSWELB3z4=" alt="Pizza" style="max-width: 200px; display: block; margin: 10px auto;">`,
        other: `Oooh secret! 🎁<img src="https://i.pinimg.com/originals/1e/97/79/1e9779723401a29d9a3dd859d41f2ab0.gif" alt="Secret gift" style="max-width: 200px; display: block; margin: 10px auto;">`
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