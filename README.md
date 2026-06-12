# Satnam's Direct Stripe Payment Gateway

A minimal, secure, and production-ready Stripe payment checkout portal. This template allows you to accept dynamic payments of any custom USD amount securely using Stripe Checkout with inline `price_data` generation on the backend. This means you do not need to pre-configure products or Price IDs inside your Stripe dashboard!

## Key Features
- **Dynamic Price Payments**: Accepts custom amounts typed directly into the UI by the customer.
- **Dynamic Key Injection**: The backend Express server supplies the Stripe Publishable Key to the frontend at runtime, preventing key exposure in repository code.
- **Premium Glassmorphic Theme**: centrated payment checkout card styled with Outfit & Plus Jakarta Sans typography, sleek gradient inputs, and interactive glowing selectors.
- **Relative Redirections**: No hardcoded domain URLs, ensuring seamless deployments on localhost, staging VM, or production servers without configuration changes.

---

## Local Setup & Testing

### 1. Configure environment variables
Create a `.env` file in the root directory and supply your Stripe API credentials:
```env
PORT=3000
STATIC_DIR="./client"

PUBLISHABLE_KEY="pk_test_your_publishable_key"
SECRET_KEY="sk_test_your_secret_key"
```

### 2. Install dependencies
Install Node.js modules:
```bash
npm install
```

### 3. Launch server
Run the Express application:
```bash
npm start
```
You can access your payment gateway in the browser at `http://localhost:3000`. If port 3000 is occupied, you can launch on a different port using:
```bash
PORT=3005 npm start
```

---

## Deploying on AWS EC2

### 1. Launch instance
- Create an EC2 instance running **Ubuntu**.
- In the Security Group settings, edit the **Inbound Rules** to allow TCP traffic on your app's port (e.g. `3000` or `3005`).

### 2. Setup packages
Connect to your remote instance via SSH and install git, node, and npm:
```bash
sudo apt update
sudo apt install git nodejs npm -y
```

### 3. Deploy app
Clone your repository, set up the `.env` variables matching the EC2 public domain, install, and run:
```bash
git clone <your-git-repo-url>
cd AWS-Session
# Create and write your .env variables
npm install
npm start
```
Your payment gateway forms, Stripe checkout handlers, and success redirects will automatically resolve to your server's IP address.
