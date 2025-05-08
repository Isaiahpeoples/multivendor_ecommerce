<p align="center">
  <img src="https://online-project-images.s3.us-east-2.amazonaws.com/goshop/GoShop.png" height="55%" width="55%" alt="GoShop Logo"/>
</p>

<div align="center" id="toc">
  <ul style="list-style: none">
	<summary>
  	<h1>🛒 GoShop - Multi-Vendor E-commerce</h1>
	</summary>
  </ul>
</div>

<div align="center">

[![Version](https://img.shields.io/badge/version-47.0.0-blue.svg)](https://github.com/Isaiahpeoples/multivendor_ecommerce)
[![Built With](https://img.shields.io/badge/Built_with-Next.js_13-blue)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![ORM](https://img.shields.io/badge/ORM-Prisma-blue)](https://www.prisma.io/)
[![DB](https://img.shields.io/badge/Database-MySQL-blue)](https://www.mysql.com/)
[![Auth](https://img.shields.io/badge/Auth-Clerk-blue)](https://clerk.dev/)

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-brightgreen)](https://vercel.com/)
[![Live](https://img.shields.io/badge/Live-Demo-brightgreen)](https://go-shop-store.com/)

</div>
<br/>

## 🛍️ Project Overview

**GoShop** is a comprehensive, Amazon-style multi-vendor e-commerce platform built with **Next.js**, **TypeScript**, and **MySQL**, and secured with **Clerk**. It features multi-role access (Admin, Seller, Buyer), advanced product filtering via **ElasticSearch**, real-time features, dynamic checkout, and modern UI using **Shadcn**, **Swiper.js**, and **TailwindCSS**.

<br/>

## 🚀 Technologies Used

| Technology    	| Description                                                           	|
|-------------------|---------------------------------------------------------------------------|
| **Next.js**   	| ⚡ Full-stack framework for scalable apps and API integration.         	|
| **React**     	| ⚛️ Component-based library for dynamic UIs.                           	|
| **TypeScript**	| 🔒 Strong typing for robust, maintainable code.                       	|
| **Prisma**    	| 🗄️ Modern ORM for database schema and queries.                        	|
| **MySQL**     	| 💾 Relational database for structured, reliable data storage.         	|
| **Clerk**     	| 🔐 Authentication and user management system.                         	|
| **Shadcn-ui** 	| 🎨 Headless UI components styled with Tailwind CSS.                   	|
| **Supabase**  	| ☁️ BaaS for database, auth, and real-time subscriptions.              	|
| **Render / Vercel / Railway** | 🚀 Cloud deployment platforms.                          	|

<br/>

## 📸 Project Screenshot

![GoShop Preview](https://online-project-images.s3.us-east-2.amazonaws.com/goshop/Go+Shop-1.png)

*A powerful and scalable storefront supporting buyers, sellers, and admin dashboards.*

<br/>

## 📑 Key Features

- 🧑‍🤝‍🧑 **Multi-Vendor Dashboards** – Tailored interfaces for sellers, admins, and buyers.  
- 🔍 **ElasticSearch Filtering** – Blazing fast, full-text product search and filters.  
- 🚚 **Custom Shipping Logic** – Rates by country, quantity, or weight.  
- 🛒 **Real-Time Cart & Checkout** – Live updates, multi-gateway support with Stripe & PayPal.  
- 📦 **Product Management** – Dynamic add/edit/delete with review & Q&A support.  
- 🔐 **Secure Authentication** – Seamless login and registration via Clerk.  
- 💬 **Live Viewer Count + Instant Search** – Boosts engagement and UX.  
- 📱 **Mobile-Responsive UI** – Optimized for users on any device.

<br/>

## 🔧 Installation & Setup 🔧

1. **Clone the repository**:
```bash
git clone https://github.com/Isaiahpeoples/multivendor_ecommerce.git
cd nextjs-store
```

2. **Install dependencies**:
```bash
npm install
```

3. **Environment variables: Configure the .env file with the following keys**:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

WEBHOOK_SECRET=

DATABASE_URL=""

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=""

IPINFO_TOKEN=


NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_SECRET=


NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=


ELASTICSEARCH_CLOUD_ID=
ELASTICSEARCH_API_KEY=

WATCHERS_SERVER=
```

4. **Start the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

<br/>

## 📂 Project Structure 📂

- **/app: Main application directory with API routes and pages**

- **/components: UI components and forms**

- **/utils: Utility functions for formatting, database, and API helpers**

- **/prisma: Prisma schema and migrations**

- **/public: Static assets and images**

<br/>

## 📌 Learn More 📌

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

<br/>

## ❗Deploy on Vercel❗

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<br/>

## 🌐 Live Demo

Check out the live version:  
👉 [GoShop Live Demo](https://go-shop-store.com/)

<br/>

### ⭐️ Support ⭐️
If you found this project helpful, give it a ⭐️ Star!
Your support makes a difference and encourages continued innovation.
