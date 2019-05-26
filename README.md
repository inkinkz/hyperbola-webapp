# (ICE CU 3rd year project) Hyperbola Web Application

**Available [here](https://hyperbola.herokuapp.com/). (Better optimized for mobile devices)**

## Built With
* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org)
* [Firebase](https://firebase.google.com/)
* [Heroku](https://www.heroku.com/home)
* [Heroku PostgreSQL](https://www.heroku.com/postgres)

## Features
* Home page provides the current queue, available flavors and store locations.
* Users register/login with `Firebase` auth (Facebook, Twitter, Google)
* Users can order cup/cone ice-cream with desired flavor and toppings.
* Each order gets points and points can be used to redeem (discounts).
* Pay with `PayPal`.
* Receipt with QR code provided for a completed order.
* QR code used to scan at the storefront to notice the vendor to start making your ice-cream.
* Order history with QR codes for each user can be viewed.
* Vendors can login with the special accounts.
* Vendors can manage (add/remove/change status) flavors and queue (finished/cancelled/pending)
* Sell history for each branch.
* [Real-time queue](https://hyperbola.herokuapp.com/queue) at storefront
* Customers get notification when their ice-cream is almost ready [(FCM)](https://firebase.google.com/docs/cloud-messaging).
