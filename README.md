# 🛍️ Fake Store App

A professional React Native/Expo e-commerce application with authentication, product browsing, and cart functionality. Built with modern React Native practices and a clean, user-friendly interface.

## ✨ Features

### 🔐 Authentication
- **Secure Login System** - Professional login screen with validation
- **Session Persistence** - Automatic token management with AsyncStorage
- **Global Auth Context** - Centralized authentication state management
- **User Menu** - Professional logout functionality with user menu

### 🛒 Product Management
- **Product Grid** - Responsive product listing with dynamic columns
- **Product Details** - Comprehensive product information with image gallery
- **Add to Cart** - Professional cart functionality with success feedback
- **Real-time Updates** - Pull-to-refresh and cache management

### 🎨 User Experience
- **Professional UI/UX** - Clean, modern design with consistent styling
- **Loading States** - Professional loading indicators and spinners
- **Error Handling** - Centralized error management with user-friendly messages
- **Success Feedback** - Animated toast notifications for user actions
- **Responsive Design** - Optimized for different screen sizes

### 🛠️ Technical Features
- **React Navigation** - Smooth navigation between screens
- **Custom Hooks** - Reusable logic for error handling and user menu
- **Error Boundaries** - Graceful error handling for unhandled exceptions
- **Performance Optimized** - Memoized components and efficient rendering


## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AgusFeoli/fake-store-app.git
   cd fake-store-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on your preferred platform**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For Web
   npm run web
   ```

## 🏗️ Project Structure

```
fake-store-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CustomButton.js
│   │   ├── CustomInput.js
│   │   ├── ErrorBoundary.js
│   │   ├── ErrorDisplay.js
│   │   ├── GoPersonalLogo.js
│   │   ├── Header.js
│   │   ├── LoadingSpinner.js
│   │   ├── ProductCard.js
│   │   ├── ProductGrid.js
│   │   ├── SuccessToast.js
│   │   └── UserMenu.js
│   ├── contexts/           # React Context providers
│   │   └── AuthContext.js
│   ├── hooks/              # Custom React hooks
│   │   ├── useErrorHandler.js
│   │   └── useUserMenu.js
│   ├── navigation/         # Navigation configuration
│   │   └── appNavigator.js
│   ├── screens/            # App screens
│   │   ├── LoginScreen.js
│   │   ├── ProductDetailScreen.js
│   │   └── ProductsScreen.js
│   ├── services/           # API services
│   │   ├── authService.js
│   │   └── productService.js
│   └── utils/              # Utility functions
│       └── errorUtils.js
├── assets/                 # App assets and icons
├── App.js                  # Main app component
└── package.json           # Dependencies and scripts
```

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation between screens
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client for API calls
- **React Native Reanimated** - Smooth animations
- **React Native Vector Icons** - Icon library

## 🔧 Configuration

### Environment Setup

The app uses the [FakeStore API](https://fakestoreapi.com/) for product data. No additional configuration is required as it's a public API.

### Key Features Configuration

- **Authentication**: Uses AsyncStorage for token persistence
- **Error Handling**: Centralized error management with custom hooks
- **Loading States**: Professional loading indicators throughout the app
- **Navigation**: Stack-based navigation with authentication flow

## 📱 Usage

### Authentication Flow
1. Launch the app
2. Enter credentials on the login screen
3. Access the product catalog
4. Use the user menu to logout

### Product Browsing
1. View products in a responsive grid
2. Tap on products to see detailed information
3. Add products to cart with quantity selection
4. Pull to refresh for updated product data

### Error Handling
- Network errors are handled gracefully
- User-friendly error messages in English
- Retry functionality for failed operations
- Error boundaries for unhandled exceptions

