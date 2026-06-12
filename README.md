<div align="center">

# 💳 Satnam.pay — Direct Stripe Payment Gateway

**A minimal, secure, production-ready Stripe checkout portal that accepts dynamic, custom USD amounts — no pre-configured products or Price IDs required.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-10b981?style=for-the-badge&logo=amazonaws&logoColor=white)](http://16.170.214.82:3000/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-635bff?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ed?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![AWS EC2](https://img.shields.io/badge/AWS-EC2_Deployed-ff9900?style=for-the-badge&logo=amazon-ec2&logoColor=white)](https://aws.amazon.com/ec2/)
[![License: MIT](https://img.shields.io/badge/License-MIT-a855f7?style=for-the-badge)](LICENSE)

🔗 **[Live Application](http://16.170.214.82:3000/)** &nbsp;•&nbsp; 🛠️ **Built with Node, Express, Stripe & Docker** &nbsp;•&nbsp; ☁️ **Deployed on AWS EC2**

</div>

---

## 📸 Preview

> _Add your screenshots here_

| Payment Portal | Stripe Checkout | Success Page |
| :---: | :---: | :---: |
| `./docs/screenshot-portal.png` | `./docs/screenshot-checkout.png` | `./docs/screenshot-success.png` |

---

## ✨ Key Features

- **💸 Dynamic Price Payments** — Accepts any custom amount typed directly into the UI. Amounts are generated on the backend with Stripe's inline `price_data`, so there's no need to pre-create products or Price IDs in the Stripe dashboard.
- **🔐 Secure Key Injection** — The Express server supplies the Stripe Publishable Key to the frontend at runtime via a `/api/config` endpoint, keeping keys out of the committed source code.
- **🎨 Premium Glassmorphic UI** — A sleek dark checkout card built with Outfit & Plus Jakarta Sans typography, an indigo→purple gradient theme, and interactive glowing inputs.
- **🌐 Relative Redirections** — Success and cancel URLs resolve dynamically from request headers, so the same build runs unchanged on localhost, a staging VM, or production.
- **🐳 Containerized & Cloud-Deployed** — Ships with a Dockerfile and is deployed live on an AWS EC2 Ubuntu instance.

---

## 🧱 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (glassmorphism), Vanilla JavaScript |
| **Backend** | Node.js, Express |
| **Payments** | Stripe Checkout (dynamic `price_data`) |
| **Container** | Docker (`node:18-alpine`) |
| **Hosting** | AWS EC2 (Ubuntu) |

---

## ⚙️ How It Works

```
Customer enters amount  ──▶  Express backend creates a Stripe
+ email in the UI            Checkout Session with inline price_data
                                        │
                                        ▼
              Stripe-hosted secure checkout page (card entry)
                                        │
                        ┌───────────────┴───────────────┐
                        ▼                                ▼
                  /success?id=...                     /cancel
            (session details retrieved          (graceful cancel
             via /checkout-session)               redirect)
```

---

## 🚀 Local Setup & Testing

### 1. Configure environment variables

Create a `.env` file in the root directory with your Stripe credentials:

```env
PORT=3000
STATIC_DIR="./client"

PUBLISHABLE_KEY="pk_test_your_publishable_key"
SECRET_KEY="sk_test_your_secret_key"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Launch the server

```bash
npm start
```

Open your gateway at `http://localhost:3000`. If port 3000 is occupied, run on another port:

```bash
PORT=3005 npm start
```

---

## 🐳 Run with Docker

```bash
docker build -t satnam-pay .
docker run -p 3000:3000 \
  -e PUBLISHABLE_KEY="pk_test_..." \
  -e SECRET_KEY="sk_test_..." \
  satnam-pay
```

---

## ☁️ Deploying on AWS EC2

**1. Launch an instance** — Create an EC2 instance running **Ubuntu**. In the Security Group **Inbound Rules**, allow TCP traffic on your app's port (e.g. `3000`).

**2. Install packages** — SSH into the instance and install git, Node, and npm:

```bash
sudo apt update
sudo apt install git nodejs npm -y
```

**3. Deploy the app** — Clone the repo, add your `.env`, install, and run:

```bash
git clone https://github.com/satnamjohal710-create/AWS-Stripe-Payment.git
cd AWS-Stripe-Payment
# Create and populate your .env file
npm install
npm start
```

Payment forms, Stripe handlers, and success redirects automatically resolve to your server's public IP.

---

## 🧪 Test Card

Stripe test mode accepts the following card for end-to-end testing:

```
Card:  4242 4242 4242 4242
Exp:   any future date    CVC: any 3 digits    ZIP: any
```

---

## 📂 Project Structure

```
AWS-Stripe-Payment/
├── client/              # Frontend (static assets)
│   ├── index.html       # Payment portal UI
│   ├── success.html     # Post-payment success page
│   ├── cancel.html      # Cancelled-payment page
│   ├── app.js           # Stripe.js + form handling
│   └── css/             # Glassmorphic styles
├── server.js            # Express server + Stripe API routes
├── Dockerfile           # Container build (node:18-alpine)
├── package.json
└── README.md
```

---

## 📜 License

Released under the [MIT License](LICENSE).

<div align="center">

**Built by [Satnam Singh](https://github.com/satnamjohal710-create)** • If you found this useful, consider giving the repo a ⭐

</div>
