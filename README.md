# Finance Tracker

A modern, responsive web application for tracking personal finances and managing transactions.

## Features

-  Track income and expenses
-  View financial summaries and balances
-  Filter transactions by category and date
-  Responsive design for all devices
-  Real-time updates
-  Transaction analytics

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- SweetAlert2
- Lucide Icons
- Tailwind-merge
- Recharts

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm

### Installation

1. Clone the repository:

```
git clone https://github.com/nuruzzamn/finance_tracker.git
```

2. Go to project directory:

```
cd finance_tracker
```

3. Installing dependancies:

```
npm install
```

4. Run the the project:

```
npm run dev
```

## Technical Challenges & Solutions

### State Management
- **Challenge**: Managing complex transaction state with filters and pagination
- **Solution**: Implemented a robust state management system using React's useState and useEffect hooks, with proper TypeScript interfaces for type safety

### Real-time Updates
- **Challenge**: Ensuring transaction data stays synchronized after CRUD operations
- **Solution**: Data fetching from api and using useEffect hooks state management system refreshes data after each operation while maintaining filter states

### Type Safety
- **Challenge**: Handling complex nested API response types with optional fields
- **Solution**: Developed comprehensive TypeScript interfaces for API responses and component props, ensuring type safety throughout the application

### Performance Optimization
- **Challenge**: Preventing unnecessary re-renders with filtered data
- **Solution**: Implemented proper dependency arrays in useEffect hooks and optimized state updates

### Data Visualization with Recharts
- **Challenge**: Encountered re-rendering issues in the report page while dynamically updating Recharts with filtered data
- **Solution**: Utilized useCallback to memoize chart-related functions and prevent unnecessary re-renders. This significantly improved performance and ensured smooth rendering of updated data

### Server side rendaring
- **Challenge**: Fetching all API data using server-side rendering
- **Solution**: Implemented proper handling for server-side rendering to avoid using client-side components unnecessarily

### API Integration
- **Challenge**: Handling loading states and error boundaries
- **Solution**: Created a unified error handling system with loading states and user-friendly error messages using SweetAlert2