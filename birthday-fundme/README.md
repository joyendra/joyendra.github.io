# Birthday Fundraiser Campaign

Welcome to the Birthday Fundraiser Campaign project! This static website is designed to help raise funds for a special birthday celebration with a goal of $549. Below are the details regarding the project structure, features, and setup instructions.

## Project Structure

```
birthday-fundraiser
├── assets
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   ├── animations.js
│   │   ├── app.js
│   │   └── progressBar.js
│   └── qr-code
│       └── qr-code.svg
├── index.html
└── README.md
```

## Features

- **Donation Buttons**: Users can donate in increments of $1, $5, $10, and $50, or enter a custom amount. Each button triggers a unique funny animation.
- **Hit It Button**: A button that displays a payment QR code, which is enabled only after at least $1 is donated.
- **Exit Button**: An "X" button to close the QR code display after payment, along with a thank you message.
- **Animated Progress Bar**: A cola-style progress bar that visually tracks the total donations towards the goal of $549.

## Setup Instructions

1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd birthday-fundraiser
   ```

2. **Open the Project**: Use your preferred code editor to open the project folder.

3. **Run the Website**: Open `index.html` in your web browser to view the fundraising campaign page.

4. **Update Progress Bar**: To manually update the progress bar, modify the donation amounts in `assets/js/app.js` as needed.

## Contribution

Feel free to contribute to this project by adding features, fixing bugs, or improving the design. Pull requests are welcome!

Thank you for supporting the birthday fundraising campaign!