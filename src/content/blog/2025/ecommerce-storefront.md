---
title: "Beginner’s Guide To ShadCN UI: Learn By Building An e-commerce Store in React-TypeScript(2025)"
description: "A step by step tutorial for beginner developers to learn ShadCN UI by building and styling an e-commerce storefront in React-Typescript."
pubDate: 2025-01-28
author: "Sevda Amini-Uhde"
image: "/public/images/blog/ecommerce-storefront-shadcn/shop-banner.png"
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

- `NotFound` : if the path is not defined or is incorrect the user will be redirected to this page.

### 3. Hooks

The custom hooks for fetching data is created under this folder

### 4. Interfaces

This folder contains the `interface.ts` file, where we define our types.

### 5. Routes

We use simple routing with React Router to navigate between pages.

## Define the Product Type

Create an `interface.ts` file inside the `interface` folder. As mentioned earlier each product has an `id`, `title`, `price`, `description`, `category` and `image` . In this file, we define the types for these properties.

```js
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
```

## Fetching Products from an API

In this project, we use [Fake Store API](https://fakestoreapi.com/docs) to fetch data for our store and display ‘All Products’ on the `Home` page. (Read my [latest article]() on how to fetch data using React Router 7).

## Displaying Products and Styling them With ShadCN UI

### ShadCN UI Card Component

After fetching the products, they are displayed in the `Card` component from ShadCN UI on the `Home` page. This component provides a beautiful layout to showcase the product details.

To add the `Card` component to your project, run this command:

```js
npx shadcn@latest add card
```

Adding this component also includes other supporting components such as `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` and `CardFooter` which build the structure of a card.

A `Button` component is added to the `CardFooter` so users can add products to the shopping cart by clicking it. To include the `Button` component, install it using a command similar to the one used for the Card.

```js
npx shadcn@latest add button
```

To ensure the “Add to Cart” button aligns uniformly across all product cards on the homepage, make sure the `CardFooter` section has a consistent height and the parent card has a structure that stretches elements correctly (e.g., `flex justify-center mt-auto`).

```js
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {filteredProducts.map((product) => (
    <Card
      key={product.id}
      className="hover:shadow-lg transition-shadow flex flex-col justify-between h-full "
    >
      <div>
        <CardHeader>
          <CardTitle className="text-lg font-bold">{product.title}</CardTitle>
          <CardDescription>${product.price}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-40 object-contain"
          />
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center">
        <Link to={`/product/${product.id}`}>
          <Button variant="link" className="text-blue-600">
            View Details
          </Button>
        </Link>
        <Button
          variant="outline"
          className="text-gray-600 border-[#FA812F]"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

Whenever additional styling is required for ShadCN UI components, we use Tailwind CSS. For example, to arrange the product cards in four columns, we use Tailwind’s `grid` and `grid-cols-4` utilities.

### ShadCN UI Carousel Component

I added a `Carousel` component to the top of the `Home` page, displaying three images that automatically transition every five seconds. Install the `Carousel` component using this command:

```js
npx shadcn@latest add carousel
```

First, define the items to display in the carousel:

```js
const carouselItems = [
  {
    image: "/src/assets/images/landing-img.jpg",
    title: "Welcome to My Store",
    description: "Discover the best products tailored just for you!",
    alt: "Image by Pexels from Pixabay showing a modern shopping environment",
  },
  {
    image: "/src/assets/images/landing-img2.jpg",
    title: "New Arrivals",
    description: "Check out our latest collection",
    alt: "Image by Orna from Pixabay",
  },
  {
    image: "/src/assets/images/landing-img3.jpg",
    title: "Special Offers",
    description: "Get amazing deals on selected items",
    alt: "Image by Pexels from Pixabay showing a rack of clothes",
  },
];
```

Then, create the carousel itself:

```js
<Carousel
  opts={{
    align: "start",
    loop: true,
  }}
  plugins={[
    Autoplay({
      delay: 5000, // 5 seconds
      stopOnInteraction: true,
    }),
  ]}
  className="mb-6"
>
  <CarouselContent>
    {carouselItems.map((item, index) => (
      <CarouselItem key={index}>
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
            <p className="text-lg mb-6">{item.description}</p>
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="left-4" />
  <CarouselNext className="right-4" />
</Carousel>
```

To enable smooth transitions between images, the carousel uses the `Autoplay` plugin. The `plugins` prop accepts an array of plugins to enhance functionality.

To configure the `Autoplay` plugin, I set delay to 5000ms(5sec). `delay` sets how long each slide is displayed before moving to the next one. You can adjust this value to make slides change faster or slower.

The `stopOnInteractioncontrols` what will happen if the user interacts with the carousel. It is set to true in this app, so the `Autoplay` stops if the user interacts with the carousel, for example clicks on the arrows. If set to `false`, autoplay continues even when the user interacts.

You can customize these settings for different behaviors, for example:

faster slides:

```js
plugins={[
  Autoplay({
    delay: 3000,
    stopOnInteraction: true,
  }),
]}

```

slower slides and and continuous play:

```js
plugins={[
  Autoplay({
    delay: 7000,
    stopOnInteraction: false,  // Won't stop on user interaction
  }),
]}
```

### ShadCN UI Dropdown-menu Component

To filter products by category I created `Select Category` dropdown menu using ShadCN UI `Dropdown-menu` (Dropdown Menu) component. Install this component using this command:

```js
npx shadcn@latest add dropdown-menu
```

```js
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="outline"
      className="mb-6 border-[#FA812F] text-[#FA812F] hover:bg-[#FA812F] hover:text-white"
    >
      {selectedCategory ? selectedCategory : "Select Category"}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-white border-[#FA812F] min-w-[150px] shadow-md z-50">
    <DropdownMenuItem
      onClick={() => setSelectedCategory(null)}
      className="hover:bg-[#FA812F] hover:text-white cursor-pointer"
    >
      All Categories
    </DropdownMenuItem>
    {categories.map((category) => (
      <DropdownMenuItem
        key={category}
        onClick={() => setSelectedCategory(category)}
        className="hover:bg-[#FA812F] hover:text-white cursor-pointer"
      >
        {category}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
```

![Dropdown menu when closed](/public/images/blog/ecommerce-storefront-shadcn/store-select-category.png)

![Dropdown menu when open to select the category](/public/images/blog/ecommerce-storefront-shadcn/store-selected-categories.png)

The structure of `Dropdown-menu` component includes the following:

`<DropdownMenu>` is the container for the entire dropdown

`<DropdownMenuTriger>` is the button that opens the dropdown

`<DropdownMenuContent>` displays the content when the dropdown is opened.

`<DropdownMenuItem>` shows the individual menu items in the dropdown

```js
<DropdownMenu>
  <DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
```

The asChild prop allows the component to use its child (e.g., a Button) as the trigger:

```js
<DropdownMenuTrigger asChild>
  <Button
    variant="outline"
    className="mb-6 border-[#FA812F] text-[#FA812F] hover:bg-[#FA812F] hover:text-white"
  >
    {selectedCategory ? selectedCategory : "Select Category"} // Shows selected
    category or default text
  </Button>
</DropdownMenuTrigger>
```

To create menu items we map through the categories :

```js
{
  categories.map((category) => (
    <DropdownMenuItem
      key={category}
      onClick={() => setSelectedCategory(category)}
      className="hover:bg-[#FA812F] hover:text-white cursor-pointer"
    >
      {category}
    </DropdownMenuItem>
  ));
}
```

## Header

For the `Header` component, I used ShadCN UI’s `Button` and `Sheet` components, styled with Tailwind CSS, and incorporated icons from the [Lucide](https://lucide.dev/guide/packages/lucide-react) library.

```js
import { useCart } from "@/hooks/CartContext";
import { Link } from "react-router";
import { Menu, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Header() {
  const { cartCount } = useCart();
  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  const NavigationLinks = () => (
    <div className="space-y-4">
      <SheetClose asChild>
        <Link to="/" className="block hover:text-[#FA812F] transition-colors">
          Home
        </Link>
      </SheetClose>
      {categories.map((category) => (
        <SheetClose asChild key={category}>
          <Link
            to={`/?category=${category}`}
            className="block hover:text-[#FA812F] transition-colors capitalize"
          >
            {category}
          </Link>
        </SheetClose>
      ))}
    </div>
  );

  return (
    <div className="bg-white shadow-sm h-20">
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo */}
          <div className="text-xl font-bold">
            <Link to="/">My Store</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6 flex-1 justify-center">
            <Link to="/" className="hover:text-[#FA812F] transition-colors">
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/?category=${category}`}
                className="hover:text-[#FA812F] transition-colors capitalize"
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/wishlist"
              className="hidden sm:flex items-center hover:text-[#FA812F] transition-colors"
            >
              <Heart className="h-6 w-6" />
              <span className="sr-only">Wishlist</span>
            </Link>

            <Link
              to="/account"
              className="hidden sm:flex items-center hover:text-[#FA812F] transition-colors"
            >
              <User className="h-6 w-6" />
              <span className="sr-only">Account</span>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative flex items-center">
              <span role="img" aria-label="cart" className="text-2xl">
                🛒
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button - Moved to the end */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white">
                  <SheetHeader>
                    <SheetTitle className="text-[#FA812F]">Menu</SheetTitle>
                    <SheetDescription>
                      Browse our categories and more
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <NavigationLinks />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Lucide is the recommended icon library for Shadcn UI, which is why it’s commonly used together. You can browse all available icons in their gallery and use any of them by importing them from `lucide-react`. To use the Lucid icons install them by following command:

```js
npm install lucide-react
```

In this section I used `Menu` , `Heart` and `User icons` from `lucid-react` :

```js
<Link
              to="/wishlist"
              className="hidden sm:flex items-center hover:text-[#FA812F] transition-colors"
            >
              <Heart className="h-6 w-6" />
              <span className="sr-only">Wishlist</span>
            </Link>


            <Link
              to="/account"
              className="hidden sm:flex items-center hover:text-[#FA812F] transition-colors"
            >
              <User className="h-6 w-6" />
              <span className="sr-only">Account</span>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative flex items-center">
              <span role="img" aria-label="cart" className="text-2xl">
                🛒
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
           </Link>
```

The `Sheet` component is commonly used for mobile navigation, settings panels, or any content that should slide in from the side of the screen.

Let’s break it down:

```js
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <Menu className="h-6 w-6" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent className="bg-white">
    <SheetHeader>
      <SheetTitle className="text-[#FA812F]">Menu</SheetTitle>
      <SheetDescription>Browse our categories and more</SheetDescription>
    </SheetHeader>
    <div className="py-4">
      <NavigationLinks />
    </div>
  </SheetContent>
</Sheet>
```

`<Sheet>` is the main container for the slide-out panel.

`<SheetTrigger>`: uses the `asChild` prop to make its child (e.g., a `Button`) the trigger. The `variant="ghost"` makes the button transparent, `size="icon"` makes it square-shaped for icons, and `sr-only` provides accessible text for screen readers.

![Mobile menu in open state](/public/images/blog/ecommerce-storefront-shadcn/store-mobile-menu.png)

`<SheetContent>` creates a mobile menu that slides in from the right side. It includes a header with a title and description, navigation links, and options to close the menu by clicking outside or using a close button.

<div style="text-align: center;">•••</div>

## Final Thoughts

This tutorial provided a practical introduction to ShadCN UI by building a basic e-commerce storefront. Remember, this is just a starting point, and you can expand this project by adding features like user authentication, order management, and more detailed product information. Whether you’re experimenting or planning to build a full-fledged store in the future, this is a great starting point to level up your skills.
