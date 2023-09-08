# BuyBusy

BuyBusy is a web application for the customers of an e-commerce business

## Goal

Develop an E-Commerce that enables individuals to browse available items, add or remove them from their shopping cart, and complete the purchasing process.

## Technology used

- **Firebase Firestore:** Our database of choice, Firebase Firestore, offers real-time data storage and synchronization, enabling dynamic updates and data consistency.

- **Firebase Authentication:** Secure user authentication is handled by Firebase Authentication, ensuring a safe and reliable login and registration process.

- **React:** The core of the user interface is built using React, a powerful JavaScript library for building responsive and interactive web applications.

- **Tailwind CSS:** Styling is powered by Tailwind CSS, a utility-first CSS framework that simplifies and streamlines the styling process, resulting in a sleek and consistent design.

- **React Hook Form:** For form validation and handling user input, we leverage React Hook Form, which simplifies form management and validation.

- **React Query:** Data fetching and state management are efficiently handled by React Query, enhancing the performance and responsiveness of the application.

- **Redux Toolkit:** Redux Toolkit is used to manage complex application state, providing a clean and efficient way to handle data and UI changes. It's particularly useful for managing user authentication, managing cart, and handling asynchronous actions.

## Approach - Solution

#### Database Schema Design:

- **Schema Definition:** Created a well-structured database schema to store crucial data, including user details, product information, shopping carts, and order history.
- **Relational Design:** Established relationships between different data collections to maintain data integrity.

#### User Authentication Flow:

- **Authentication Setup:** Implemented secure user authentication using Firebase Authentication.
- **Registration and Login:** Developed user registration and login pages for a smooth account creation and login process.
- **Error Handling:** Implemented error-handling mechanisms to gracefully handle authentication-related issues.

#### User Data Storage:

- **Firestore Integration:** Leveraged Firebase Firestore for efficient storage of user data.
- **User Collection:** Designed a user collection to store comprehensive user information, including names and contact details.
- **Shopping Cart:** Integrated a cart reference within the user collection to manage product IDs and quantities for personalized shopping experiences.

#### Redux Implementation:

- **authReducer:** Established a global login state through Redux, providing consistent login status information across the application.
- **Cross-Component Access:** Ensured easy access to user login status across various components for improved user experience and security.

#### Product Page Development:

- **User-Centric UI:** Designed an intuitive and visually appealing product page to showcase available items.
- **Firestore Integration:** Seamlessly integrated the product page with Firestore, enabling dynamic product detail updates.
- **Admin Control:** Implemented an admin control panel for efficient product management.

#### Routing and Navigation:

- **Navigation Setup:** Configured routing and navigation using React Router DOM for smooth transitions between app sections.
- **Reusable Components:** Developed versatile card components for displaying product information, promoting code reusability, and easier maintenance.

#### Cart Reducer:

- **Efficient Cart Management:** Created a cart reducer to streamline cart-related operations.
- **Event Handling:** Incorporated event handlers to manage user interactions with the cart.
- **Data Synchronization:** Fetched and synchronized cart data with the Firestore database, reflecting real-time changes.

#### Order Processing:

- **Order Page Creation:** Designed and implemented an order page to provide users with detailed order information.
- **Firestore Order Storage:** Stored order data in the Firestore order collection, maintaining user IDs and order history.
- **Timestamps:** Recorded timestamps for each order, facilitating tracking and historical reference.
