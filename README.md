# Drug Bust - Narcotics Intelligence Dashboard


**Drug Bust** is an advanced intelligence dashboard designed for law enforcement agencies to monitor, track, and analyze drug trafficking activities across India. This comprehensive platform integrates real-time surveillance, suspect profiling, and data analytics to help combat narcotics-related crimes effectively.

## 🚀 Features

- **Interactive Dashboard**: Real-time overview of active cases, high-risk alerts, and surveillance locations
- **Google Maps Integration**: Visualize and track geographic data with interactive maps
- **Suspect Monitoring**: Track and profile individuals involved in drug-related activities
- **Intelligence Reports**: Create, manage, and share detailed intelligence reports
- **Multi-level Authentication**: Secure access with two-factor authentication and account lockout protection
- **Real-time Alerts**: Instant notifications for high-risk activities and suspicious behavior
- **Data Analytics**: Trend analysis and visualization of drug trafficking patterns
- **Mobile Responsive**: Fully responsive design for field operations

## 💻 Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **UI Components**: Shadcn UI, Lucide Icons
- **Maps**: Google Maps API
- **Authentication**: Custom JWT implementation with 2FA
- **State Management**: React Context API with custom hooks
- **Styling**: Tailwind CSS

## 📋 Prerequisites

- Node.js 16.x or higher
- NPM or Yarn
- Google Maps API key

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/moinuddin-ahamed/Drug--Bust.git
   cd Drug--Bust
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a .env.local file in the root directory with your Google Maps API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Authentication

For demo purposes, use the following credentials:
- Username: `AdminW`
- Password: `Wujjwal@2025`

## 📁 Project Structure

```
Drug--Bust/
├── app/                  # Next.js app directory
│   ├── dashboard/        # Dashboard pages
│   ├── login/            # Authentication pages
│   └── page.tsx          # Landing page
├── components/           # Reusable React components
│   ├── ui/               # UI components
│   └── google-maps-component.tsx # Maps integration
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 📊 Dashboard Sections

- **Overview**: Quick statistics and high-priority cases
- **Reports**: Create and manage intelligence reports
- **Surveillance**: Map-based monitoring of locations
- **Suspects**: Profile management for persons of interest
- **Intelligence**: Data analysis and pattern recognition
- **Settings**: User preferences and system configuration

## 👥 Contributors

This project was created for the Smart India Hackathon (SIH) by:

- **Moin** - _Lead Developer_ - [GitHub Profile](https://github.com/moinuddin-ahamed)
- **Wujjwal** - _Lead Developer_ - [GitHub Profile](https://github.com/wujjwal)

## 🔒 Security Note

This application is designed for law enforcement use only. Unauthorized access is prohibited and may result in criminal prosecution.

## 📄 License

This project is proprietary software developed for the Smart India Hackathon (SIH). All rights reserved.

---

© 2025 Drug Bust - Narcotics Bureau of India Intelligence System
