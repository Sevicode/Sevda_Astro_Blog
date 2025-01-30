---
title: "Understanding Data Loading in React Router 7: A Beginner’s Guide(2025)"
description: "A beginner’s guide to React Router 7 data loading patterns. Learn through examples and transform how you handle data in your React applications."
pubDate: 2025-01-01
author: "Sevda Amini-Uhde"
image: "/images/blog/data-loading-2.png"
tags: ["web development", "beginners", "programming", "react router 7", "React"]
canonical: "https://javascript.plainenglish.io/understanding-data-loading-in-react-router-7-829df70f23ab"
---

![AI generated image for this article](/public/images/blog/data-loading-2.png)

## Introduction

React Router v7 was officially released on 22 November 2024 and brings powerful new features to simplify routing in your React applications.

One of its standout features is its data loading capabilities which helps you fetch and manage data seamlessly.

In this guide, I’ll show you how to effectively load data using React Router 7’s new features, with practical examples that even the ones who are new to React and react routing can follow.

## The Basics of Data Loading

When building modern and complex web apps (or any web app that requires fetching data!), fetching the right data is very important for a smooth user experience.

React Router 7 allows you to couple data fetching with route definitions, through its loader functions. Think of loaders as your data-fetching assistants that work behind the scenes before a route renders.

## Key Concepts in React Router 7 Data Loading

**1- Loaders:** These are functions you define in your route configuration to fetch data before rendering a route:

```javascript
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router";

async function fetchUserData() {
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
}

const UserPage = ({ data }) => {
  return (
    <div>
      <h1>Welcome, {data.name}!</h1>
    </div>
  );
};

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>{error.message}</p>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/user",
    element: <UserPage />,
    loader: fetchUserData,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

In this example:

- The `fetchUserData` function fetches user data from an API.
- The `loader` key in the route configuration ensures the data is fetched before rendering the `UserPage` component.
- In React Router 7, loader data is directly passed as props to the route component. The UserPage component now receives the fetched data (data) as a prop.

**3- Error Handling:** React Router 7 allows you to define error elements for routes, making it easy to handle failures.

This ensures users see a friendly message if the data fetch fails.

```javascript
const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>{error.message}</p>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/user",
    element: <UserPage />,
    loader: fetchUserData,
    errorElement: <ErrorPage />,
  },
]);
```

The `ErrorPage` component uses `useRouteError` hook from React Router to access the error object thrown during data loading and displays a more informative error message by accessing `error.message` property.

**2- Deferred Data:** In React Router 7 the `defer` function which allowed you to load data in parallel **is deprecated** instead now we can use the React `Suspense` component.

_“[React Router](https://reactrouter.com/how-to/suspense) supports React Suspense by returning promises from loaders and actions.”_

**what is `Suspense`?**

Suspense is a React component which help us to “suspend” or delay the rendering of a part of UI until all the code or data are loaded.

Simply, imagine you have a list of products, each with a title, image, and description, but not all of them load at the same time. The `Suspense` component steps in to show something (a fallback component) while your API is busy loading the data.

```javascript
import { createBrowserRouter, RouterProvider } from "react-router";

const fetchCriticalData = async () =>
  fetch("/api/critical").then((res) => res.json());

const fetchNonCriticalData = async () =>
  fetch("/api/non-critical").then((res) => res.json());

const loader = async () => ({
  critical: await fetchCriticalData(),
  nonCritical: fetchNonCriticalData(),
});

const Page = ({ data }) => {
  return (
    <div>
      <h1>Critical Data: {data.critical}</h1>
      <Suspense fallback={<div>Loading non-critical data...</div>}>
        <div>Non-Critical Data: {data.nonCritical}</div>
      </Suspense>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/page",
    element: <Page />,
    loader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

In the code above imagine you’re ordering food at a restaurant.

- The `loader` is like the kitchen staff! They prepare your main course (critical data) quickly and start preparing a side dish (non-critical data) in the background. The loader function calls `fetchCriticalData` and waits for the result. It also calls `fetchNonCriticalData` but does not wait for the results immediately because we want the critical data to be display first and then load the non-critical data in the background.
- The `Page` is your table. It displays the main course immediately. It displays the critical data immediately and while the non-critical data are fetched but it shows “Loading non-critical data…” message.
- `Suspense` is like a placeholder card that says "Side dish coming soon!" while you enjoy your main course. Once the side dish is ready, the placeholder is replaced with the actual dish.

## Best Practices for Data Loading

1. **Keep Loaders Focused:** Each loader should fetch only the data needed for its specific route. This helps maintain clean, maintainable code and optimal performance.
2. **Error Handling:** Always provide fallback UI for errors
3. **Optimize Performance:** Use deferred loading for non-critical data.
4. **Stay DRY:** Reuse loader functions wherever possible.
5. **Test Your Routes:** Ensure data fetching logic works in different scenarios, like offline mode or slow networks.

## Conclusion

React Router 7’s data loading features provide a clean, efficient way to manage data fetching in your React applications. By following these best practices and examples, you’ll be well on your way to building more responsive and user-friendly applications.

Feel free to share your thoughts in the comments if I missed anything or if you have any questions!

<div style="text-align: center;">••••••••••••••••••••••••</div>

_This article was originally posted on [Medium](https://medium.com/@SevdaSevinu/understanding-data-loading-in-react-router-7-829df70f23ab)_
