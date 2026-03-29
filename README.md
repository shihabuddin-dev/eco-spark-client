# EcoSpark Hub - Client

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://eco-spark-client.vercel.app/)
[![Server API](https://img.shields.io/badge/Server%20API-View%20API-green?style=for-the-badge&logo=vercel)](https://eco-spark-server.vercel.app/)
[![License](https://img.shields.io/badge/License-ISC-yellow?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🌟 Overview

**EcoSpark Hub** is a revolutionary decentralized sustainability portal that empowers individuals and communities to share, discover, and support innovative ideas for a greener planet. Our platform serves as a bridge between visionary thinkers, environmental enthusiasts, and impact-driven investors, fostering collaboration to create real-world environmental solutions.

### 🎯 Mission

To democratize sustainability innovation by providing a comprehensive platform where eco-friendly ideas can flourish, gain community support, and secure funding to become reality.

### 🚀 Key Features

#### For Idea Creators (Members)
- **Idea Submission**: Submit detailed proposals with problem statements, solutions, and supporting documentation
- **Rich Media Support**: Upload multiple images to showcase your ideas visually
- **Community Engagement**: Receive votes, comments, and feedback from the community
- **Monetization Options**: Set prices for premium ideas and access to detailed implementation guides
- **Progress Tracking**: Monitor idea status from draft to approval

#### For Supporters & Investors
- **Idea Discovery**: Browse curated ideas by category, popularity, and recency
- **Voting System**: Support ideas you believe in through our democratic voting mechanism
- **Discussion Forums**: Engage in meaningful conversations through comments and feedback
- **Premium Access**: Purchase detailed implementation plans for approved ideas

#### For Administrators
- **Content Moderation**: Review and approve/reject submitted ideas
- **User Management**: Manage user accounts, roles, and permissions
- **Analytics Dashboard**: Monitor platform metrics, user engagement, and idea performance
- **Payment Processing**: Oversee Stripe-based transactions and revenue tracking

#### Platform Features
- **Authentication**: Secure login with email/password and Google OAuth
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Eye-friendly dark theme option
- **Real-time Updates**: Live notifications and dynamic content updates
- **Newsletter Integration**: Stay updated with the latest environmental innovations

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 16.1.7** - React framework for production-grade applications
- **React 19.2.3** - Modern React with concurrent features
- **TypeScript 5** - Type-safe JavaScript for better development experience

### UI/UX
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Beautiful, consistent icon library
- **Next Themes** - Dark/light mode implementation

### State Management & Data Fetching
- **TanStack Query 5.95.2** - Powerful data synchronization for React
- **Axios 1.13.6** - HTTP client for API communications

### Forms & Validation
- **React Hook Form 7.72.0** - Performant forms with easy validation
- **Zod 4.3.6** - TypeScript-first schema validation
- **@hookform/resolvers 5.2.2** - Integration between React Hook Form and Zod

### Authentication
- **Better Auth 1.5.6** - Modern authentication library with multiple providers

### Utilities
- **Class Variance Authority 0.7.1** - Create variant-based component APIs
- **clsx 2.1.1** - Conditional CSS classes utility
- **Tailwind Merge 3.5.0** - Merge Tailwind CSS classes intelligently
- **date-fns 4.1.0** - Modern JavaScript date utility library
- **React CountUp 6.5.3** - Animated counter component
- **React Intersection Observer 10.0.3** - Trigger animations on scroll
- **Sonner 2.0.7** - Toast notifications

### Development Tools
- **ESLint 9** - Code linting and formatting
- **PostCSS** - CSS processing tool
- **TypeScript** - Type checking

## 📁 Project Structure

```
eco-spark-client/
├── src/
│   ├── actions/           # Server actions for form submissions
│   │   ├── admin.actions.ts
│   │   ├── contact.actions.ts
│   │   └── idea.actions.ts
│   ├── app/               # Next.js app router pages
│   │   ├── (auth)/        # Authentication routes
│   │   ├── (dashboard)/   # Protected dashboard routes
│   │   ├── (marketing)/   # Public marketing pages
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── not-found.tsx  # 404 page
│   ├── components/        # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── features/      # Feature-specific components
│   │   ├── form/          # Form components
│   │   ├── home/          # Homepage sections
│   │   ├── layout/        # Layout components
│   │   ├── providers/     # React context providers
│   │   ├── shared/        # Shared components
│   │   └── ui/            # Base UI components
│   ├── config/            # Configuration files
│   ├── data/              # Static data and constants
│   ├── lib/               # Utility libraries
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **pnpm** (recommended) or npm/yarn
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eco-spark-client
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://eco-spark-server.vercel.app
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
pnpm build
pnpm start
```

## 📱 Pages & Features

### Public Pages
- **Homepage** (`/`) - Landing page with hero, features, testimonials, and pricing
- **About** (`/about`) - Company mission and team information
- **Blog** (`/blog`) - Environmental news and insights
- **Contact** (`/contact`) - Contact form and information
- **Ideas** (`/ideas`) - Browse public ideas
- **Pricing** (`/pricing`) - Subscription and premium access plans
- **Privacy Policy** (`/privacy`) - Privacy and data protection information
- **Terms of Service** (`/terms`) - Platform terms and conditions

### Authentication Pages
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - New user registration

### Dashboard Pages (Protected)
- **Member Dashboard** (`/member-dashboard`) - Personal dashboard for members
- **Admin Dashboard** (`/admin-dashboard`) - Administrative control panel

## 🔧 Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code linting

## 🌐 Deployment

The application is deployed on Vercel and can be accessed at:
- **Live Application**: https://eco-spark-client.vercel.app/

### Deployment Steps

1. **Connect to Vercel**
   - Import your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard

2. **Build Settings**
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

3. **Environment Variables**
   Set the following environment variables in your deployment platform:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## 🤝 Contributing

We welcome contributions to EcoSpark Hub! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer Information

**Developed by: Shihab Uddin**

- **Portfolio**: [https://shihab-dev.web.app/](https://shihab-dev.web.app/)
- **LinkedIn**: [https://www.linkedin.com/in/shihab-dev](https://www.linkedin.com/in/shihab-dev)
- **Facebook**: [https://www.facebook.com/shihab.dev](https://www.facebook.com/shihab.dev)

## 🙏 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries
- Special thanks to environmental activists and innovators worldwide
- Gratitude to all contributors and early adopters

## 📞 Support

For support, email support@ecosparkhub.com or join our community Discord.

---

**EcoSpark Hub** - Sparking Ideas for a Greener Planet 🌱
