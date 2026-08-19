# RentHub – Apartment Rental Platform

RentHub is a web-based apartment rental platform built with Angular. 
It provides an intuitive interface for landlords/property managers to
post apartment listings and for prospective renters to search, filter, favourite 
and interact with available properties.

The application was developed as part of the Angular Assignment and 
implements the core requirements along with additional usability and UI enhancements.

---

## Live Application

**Deployed Application:**  
[RentHub – Live Application](https://gitparasthamman.github.io/rent-hub-angular/home)

---

## Credentials for Demo

- Email: paras@renthub.com
  Password: Password@123

- Email: rahul@renthub.com
  Password: Password@123

---
## GitHub Repository

**Source Code:**  
[RentHub – GitHub Repository](https://github.com/gitparasthamman/rent-hub-angular)

> Note: `node_modules` and generated build files are excluded from the repository.

---

# Application Overview

RentHub provides a centralized platform for apartment rentals where users can:

- Browse available apartments
- Search apartments based on different criteria
- Filter and sort apartment listings
- View detailed apartment information
- Create new apartment listings
- Edit existing apartment listings
- Mark apartments as favourites
- View favourite apartments
- Add comments and replies to apartment listings
- Register and authenticate users
- Access protected functionality through authentication guards

The application also provides a responsive and intuitive UI designed to make apartment discovery and listing management easier.

---

# Key Features

## User Registration & Authentication

Users can:

- Register a new account
- Login using their credentials
- Logout from the application
- Access protected application functionality only after authentication

Authentication guards are implemented to protect routes that require an authenticated user.

---

## Apartment Listings

Users can create apartment listings with information such as:

- Title
- Description
- Location
- Price
- Number of bedrooms
- Number of bathrooms
- Property type
- Furnished / Unfurnished
- Amenities
- Vegetarian preference
- Apartment images
- Landlord contact information

Form validation has been implemented wherever applicable.

---

## Search, Filter & Sort

The Home page provides functionality to help users quickly find relevant properties.

Users can:

- Search apartment listings
- Filter listings based on available criteria
- Sort listings
- Navigate through paginated results

This makes it easier to locate apartments based on individual requirements.

---

## Favourites

Users can mark apartments as favourites.

Favourite functionality includes:

- Add apartment to favourites
- Remove apartment from favourites
- View favourite apartments
- Maintain favourite state for the logged-in user

---

## Comments & Replies

Users can interact with apartment listings through comments.

The application supports:

- Adding comments
- Viewing comments
- Replying to comments

This allows prospective renters and landlords to communicate around individual apartment listings.

---

# Create & Edit Apartment

Authenticated users can create new apartment listings.

The application provides:

- Form-based apartment creation
- Validation
- Preview before submission
- Submit functionality
- Edit existing apartment listings
- Update existing apartment information

---

# Bonus Features Implemented

The following bonus functionality from the assignment has been implemented:

### Preview & Submit

A dedicated preview step allows users to review apartment information before submitting the listing.

The flow is:

```text
Create Apartment
       ↓
    Preview
       ↓
   ┌───────┐
   │       │
 Submit   Edit
   │
   ↓
Create Apartment