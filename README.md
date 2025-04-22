<p align="center">
<img src="https://online-project-images.s3.us-east-2.amazonaws.com/goshop/GoShop.png"  height="55%" width="55%" alt="GoShop Logo"/>
</p>

<div align="center" id="toc">
<ul style="list-style: none">
<summary>
 <h1>E-commerce Storefront</h1>
</summary>
</ul>
</div>

<br>

GoShop is a full-featured, Amazon-inspired e-commerce platform built with Next.js, TypeScript, MySQL, and Prisma, integrating Clerk for secure authentication and showcasing advanced multi-vendor functionality with responsive Storefront, Admin, and Seller Dashboards, customizable shipping logic, real-time search, dynamic product management, and a scalable, user-centric checkout system that highlights expertise in full-stack development and modern web architecture.

## 🚀 Technologies Used 🚀

- **Next.js**: React framework for scalable, full-stack web apps.
- **React**: Library for building the user interface.
- **TypeScript**: Adds type safety and scalability to JavaScript code.
- **Prisma**: Database ORM for schema management and database operations.
- **Clerk**: User authentication and authorization.
- **MySQL**: Relational database for structured data storage.
- **Shadcn-ui**: Prebuilt, customizable UI components for React.
- **Swiper.js**: Enables touch-friendly sliders and carousels with smooth transitions.
- **Supabase**: Backend-as-a-service for database and authentication.
- **Render**: Hosts and deploys web applications easily.
- **Vercel**: Hosting and deployment for optimized speed and scalability.
- **Railway**: Deploys app and infrastructure seamlessly to the cloud.

## 📑 Key Features 📑

- **Multi-Vendor Support**: Separate dashboards for sellers, admins, and users.
- **Responsive Storefront**: Mobile-friendly design with dynamic product displays.
- **Advanced Shipping Logic**: Custom rates by country, quantity, or weight.
- **Real-Time Features**: Live viewer count and instant search suggestions.
- **Product Reviews**: Includes ratings, images, and Q&A sections.
- **Cart & Checkout**: Live updates, coupons, and multi-payment support.
- **User Profiles**: Manage orders, wishlists, addresses, and followed stores.
- **ElasticSearch Filtering**: Fast, accurate product filtering and search results.

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

## 📂 Project Structure 📂

- **/app: Main application directory with API routes and pages**

- **/components: UI components and forms**

- **/utils: Utility functions for formatting, database, and API helpers**

- **/prisma: Prisma schema and migrations**

- **/public: Static assets and images**

## 📌 Learn More 📌

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## ❗Deploy on Vercel❗

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### ⭐️ Support ⭐️
If you found this project helpful or interesting, please give it a ⭐️! Your support helps to grow the project and boosts visibility. Thank you!
