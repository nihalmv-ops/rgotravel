# GoTravel Admin Suite

A dedicated, standalone Enterprise Administrative Web Application for the **GoTravel** platform.

## Overview

This is an independent administrative web app located in a separate folder (`gotravel-admin`). It runs completely isolated from the user-facing web app (`gotravel-react`), offering full management controls over travel packages, destinations, reservations, user accounts, analytics, and platform settings.

## Features

- **Executive Dashboard**: Real-time gross bookings value, total reservations counter, active destination catalog, traveler statistics, and visual booking breakdown.
- **Bookings Manager**: Filter by status (*Confirmed*, *Pending*, *Cancelled*), search by customer/tour/ID, instant approve/cancel actions, detailed reservation modal, and 1-click **Export to CSV**.
- **Destinations Manager**: Complete CRUD (Create, Read, Update, Delete) with image preview, pricing, category tags, and star ratings.
- **Tour Packages Manager**: Complete CRUD for tour packages with day duration, group size, featured badges, and pricing.
- **Users & Travelers Directory**: User role management (*Customer*, *Premium Traveler*, *Manager*, *Super Admin*), account suspension/activation, and new user creation.
- **Financial & Trend Analytics**: Monthly revenue bar chart, top destination revenue shares, and payment method distribution.
- **System Settings**: Global branding, currency switcher, auto-confirm toggle, maintenance mode, full JSON database backup export, and factory reset.
- **Admin Authentication**: Dedicated Admin login portal with demo autofill option and session persistence.

## Tech Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS v4**
- **React Router 7**
- **React Icons**
- **React Toastify**

## Getting Started

```bash
# Navigate to admin directory
cd gotravel-admin

# Install dependencies
npm install

# Start Admin development server (runs on port 5174)
npm run dev

# Build for production
npm run build
```

The user client app runs on `http://localhost:5173` and this admin app runs on `http://localhost:5174` concurrently without any port conflicts.

