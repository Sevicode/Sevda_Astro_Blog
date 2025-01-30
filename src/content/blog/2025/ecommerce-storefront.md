---
title: "Beginner’s Guide To ShadCN UI: Learn By Building An e-commerce Store in React-TypeScript(2025)"
description: "A step by step tutorial for beginner developers to learn ShadCN UI by building and styling an e-commerce storefront in React-Typescript."
pubDate: 2025-01-28
author: "Sevda Amini-Uhde"
tags: ["shadcnui", "beginners", "programming", "e-commerce", "React"]
canonical: "https://medium.com/@SevdaSevinu/beginners-guide-to-shadcn-ui-learn-by-building-an-e-commerce-store-in-react-typescript-dbef3004b195"
---

![Screen shot of the final store front](/public/images/blog/ecommerce-storefront-shadcn/shop-banner.png)

## Introduction

I recently started experimenting with ShadCN UI, and the more I use it, the more I like it. If you’ve read my previous article comparing ShadCN UI and Material UI, you know I initially had some doubts about whether it would simplify styling or make it more complicated.

On that article I compared these two styling frameworks with a small example where I showed you how to style a Button component with either of them.

In that article, I compared these two styling frameworks with a small example, showing how to style a Button component using each.

In this tutorial, I’m taking it a step further by building and styling an e-commerce storefront with React, TypeScript, and ShadCN UI. This article focuses on developing the front end of an e-commerce website and does not cover the backend.

<div style="text-align: center;">••••</div>

## Features

- Getting products from an [API](https://fakestoreapi.com/)
- Display all the products on Home page
- Product details page
- Shopping cart
- The shopping cart icon shows the number of items added to the cart
- Add or remove an item from the cart
- Clear all items from the cart

The primary focus of this tutorial is to practice using ShadCN UI with more examples. I’ll only provide a brief explanation of the other functionalities. You can check out the complete code in the project’s [GitHub repository](https://github.com/Sevicode/ecommerce-store-front).

## Project Setup and Structure

I created the project with Vite and installed the ShadCN UI and Tailwind CSS following [these steps](https://ui.shadcn.com/docs/installation/vite).

I also installed React Router to handle navigation between pages (refer to the [React Router Docs](https://reactrouter.com/start/library/installation)):

```js
npm i react-router

```

### 1. Components

Apart from the ShadCN UI components added as needed, we currently have only the `Header` and `Footer` components.

### 2. Pages

- `Home` : this page displays all the products. Each product has an `id`,`title`, `description`, `image` and `price` which are fetched from API.

![Screen shot of the Home page of the shop](/public/images/blog/ecommerce-storefront-shadcn/shop-responsive.png)

- `ProductPage` : when a user clicks on a product on the `Home` page, they are redirected to the `ProductPage`, which provides more details about the selected product.

![Screen shot if product's detail page](/public/images/blog/ecommerce-storefront-shadcn/store-product-page.png)

- `Cart` : this page shows the products added to the shopping cart

![screenshot of the cart page](/public/images/blog/ecommerce-storefront-shadcn/store-cart.png)

- `CheckOut` : This is a static page that informs users that checkout functionality is not available in this app.

![Screen shot of checkout page](/public/images/blog/ecommerce-storefront-shadcn/store-checkout.png)
