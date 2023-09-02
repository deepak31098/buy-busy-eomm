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

- **Context API:** We use the Context API to manage user authentication and the shopping cart, providing a convenient and centralized way to share data and state between components.

- **Custom Hooks:** Throughout the application, custom hooks have been developed to encapsulate and reuse functionality, promoting clean and maintainable code.

## Approach - Solution

Database Schema Design:

Schema Definition: Began by carefully crafting the database schema to ensure it accommodates all critical data for BusyBuy.
Structured Data: Designed collections to store user information, product details, shopping cart contents, and order history.
Relational Design: Created relationships between collections to maintain data integrity.
User Authentication Flow:

Authentication Setup: Implemented user authentication using Firebase Authentication, ensuring robust security for user accounts.
Registration and Login: Developed user registration and login pages, enabling users to create accounts and securely access the platform.
Error Handling: Implemented error handling mechanisms to gracefully manage authentication-related issues.

User Data Storage:

Firestore Integration: Utilized Firebase Firestore for storing user data.
User Collection: Designed the user collection to include comprehensive user details, such as name and contact information.
Shopping Cart: Implemented a cart reference within the user collection to store product IDs and quantities, facilitating personalized shopping experiences.

User Context Integration:

Global User Context: Established a global user context to provide consistent login status information throughout the application.
Cross-Component Access: Ensured that user login status is easily accessible across various components, enhancing user experience and security.

Product Page Development:

User-Centric UI: Created an intuitive and visually appealing product page to showcase available items.
Firestore Integration: Seamlessly integrated the product page with Firestore, dynamically populating product details.
Admin Control: Implemented an admin control panel to manage product listings, ensuring efficient product management.

Routing and Navigation:

Navigation Setup: Configured routing and navigation using React Router DOM for smooth transitions between app sections.
Reusable Components: Developed a versatile card component for displaying product information, promoting code reusability and maintainability.

Cart Context Integration:

Efficient Cart Management: Developed a cart context to streamline cart-related operations.
Event Handling: Incorporated event handlers to manage user interactions with the cart.
Data Synchronization: Fetched and synchronized cart data with the Firestore database, reflecting real-time changes.

Order Processing:

Order Page Creation: Designed and implemented an order page to provide users with detailed order information.
Firestore Order Storage: Stored order data in the Firestore order collection, maintaining user IDs and order history.
Timestamps: Recorded timestamps for each order, facilitating tracking and historical reference.
