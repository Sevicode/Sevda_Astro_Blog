---
title: "Use localStorage API in React- TypeScript to persist data: A beginner’s guide"
description: "Learn How to Use the Native localStorage API in React TypeScript: A Beginner-Friendly Guide to Storing and Managing Data in Your Applications."
pubDate: 2024-11-27
author: "Sevda Amini-Uhde"
image: "/public/images/blog/localAPI.png"
tags: ["React-TypeScript", "LocalStorage API", "MaterialUI", "Beginners guide"]
canonical: "https://javascript.plainenglish.io/4-ways-to-use-localstorage-in-react-typescript-part-1-4671460ac2b2"
---

![](/public/images/blog/localAPI.png)

## Introduction

Local storage is a simple yet powerful feature of modern web browsers that lets you store data on a user’s device for later use. Whether it’s saving user preferences, maintaining session data, or caching information, local storage can significantly improve the efficiency and user experience of your web applications.

In this article, we’ll focus on using the native localStorage API in a React TypeScript application. You’ll learn how to store, retrieve, and manage data effectively with the built-in methods provided by the browser.

This is the first in a series of three articles where we’ll explore different techniques to work with local storage. In upcoming articles, we’ll dive into more advanced methods, such as using the Context API and creating Custom Hooks. Each approach offers unique advantages, so stay tuned to discover the best fit for your projects.

<div style="text-align: center;">••••••••••••••••••••••••</div>

### Using the Native localStorage API

The localStorage API is a built-in feature of web browsers that allows you to store data locally on the user’s device. It provides a simple key-value storage system that is persistent across browser sessions, meaning the data will remain stored even if the user closes and reopens the browser.

### Key Features:

**1. Persistence:** Data is stored until explicitly cleared by the developer or the user.

**2. String-based Storage:** Only string values can be stored. Non-string data must be converted (e.g., using JSON.stringify for objects).

**3. Storage Limit:** Typically around 5MB per domain.

### When to Use localStorage

- Storing user preferences (e.g., theme selection).
- Caching small amounts of data that don’t change often.
- Keeping session-less information across browser tabs.

### Important Notes

- Data in localStorage is not encrypted, so avoid storing sensitive information.
- It’s synchronous, meaning large operations could block the main thread.

## Methods:

**1. setItem(key,value)**

Stores a value under the specified key (i.e. key, value).

```javascript
localStorage.setItem("username", value);
```

**2. getItem(key)**

Retrieves the value associated with a given key. If the key does not exist, it returns null.

```javascript
const username: string | null = localStorage.getItem("username");
```

**3. removeItem(key)**

This method is used to remove a specific item from the local storage. It only deletes the key-value pair associated with the provided key. Other items in local storage remain unchanged.

```javascript
localStorage.removeItem("key");
```

**4. clear()**

Clears all data stored in localStorage for the domain. It **empties** the entire local storage, deleting **all** key-value pairs.

```javascript
localStorage.clear();
```

**5. key(index)**
Returns the key at a given index (useful for iterating over stored keys).

```javascript
const firstKey: string | null = localStorage.key(0);
```

### Storing and Retrieving Complex Data

For objects or arrays, use JSON.stringify and JSON.parse with proper type annotations.

```javascript
type User = {
  name: string,
  age: number,
};

const user: User = { name: "John", age: 30 };

// Storing the object
localStorage.setItem("user", JSON.stringify(user));

// Retrieving and parsing the object
const storedUser = localStorage.getItem("user");
const retrievedUser: User | null = storedUser ? JSON.parse(storedUser) : null;

if (retrievedUser) {
  console.log(retrievedUser.name); // Outputs: 'John'
} else {
  console.log("No user found in localStorage");
}
```

## How to use localStorage in my app?

In the following sections, I will show you how to use the localStorage API in your React TypeScript application. While I am using Material UI, as it is one of my favorite styling libraries, feel free to use any styling framework or language you are comfortable with.

### Create your react-typescript app

```javascript
npx create-react-app my-app --template typescript
```

Replace my-app with your desired project name. This will set up a new React project with TypeScript configured. Alternatively, if you’re using Yarn, you can use:

```javascript
yarn create react-app my-app --template typescript
```

Install MaterialUI:

```javascript
npm install @mui/material @emotion/react @emotion/styled
```

The following example is a react-typescript app that allows users to add, display, remove, and clear names stored in the browser’s local storage.

```javascript
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";
import { ChangeEvent, useEffect, useState } from "react";
function App() {
  const [name, setName] = useState<string>("");
  const [nameList, setNameList] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  useEffect(() => {
    const savedList = localStorage.getItem("nameList");
    if (savedList) {
      setNameList(JSON.parse(savedList));
    }
  }, []);

  const handleSave = (): void => {
    if (!name.trim()) {
      alert("Please insert a name!");
      return;
    }
    const updatedList = [...nameList, name];
    setNameList(updatedList);
    localStorage.setItem("nameList", JSON.stringify(updatedList));
    setName("");
  };

  const handleRemove = (nameToRemove: string): void => {
    const updatedList = nameList.filter((item) => item !== nameToRemove);
    setNameList(updatedList);
    localStorage.setItem("nameList", JSON.stringify(updatedList));
  };

  const handleClear = (): void => {
    localStorage.clear();
    setNameList([]);
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "400px",
          maxWidth: "90%",
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={2} direction={"row"}>
            <TextField
              id="outlined-basic"
              label="name"
              variant="outlined"
              name="name"
              value={name}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Stack>

          <Stack spacing={2} direction={"column"}>
            <Typography variant="h6">Saved Names:</Typography>
            {nameList.length === 0 ? (
              <Box
                sx={{
                  backgroundColor: "#d2faf8",
                  p: 2,
                  borderRadius: 1,
                  textAlign: "center",
                }}
              >
                <Typography>No names saved yet.</Typography>
              </Box>
            ) : (
              nameList.map((nameItem, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: 2,
                    padding: 1,
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Typography>{nameItem}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemove(nameItem)}
                  >
                    Remove
                  </Button>
                </Box>
              ))
            )}
            <Button variant="contained" color="error" onClick={handleClear}>
              Clear All
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default App;
```

Let’s break it down step by step:

### 1. Component State and Initialization

```javascript
const [name, setName] = useState<string>("");
const [nameList, setNameList] = useState<string[]>([]);
```

In this code section :

`name`

- Stores the current value of the input field.
- Initially set to an empty string.

`nameList`

- An array that stores the list of saved names.
- Initially set to an empty array.

### 2. Handling Input Changes

```js
const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
  setName(event.target.value);
};
```

This section of code updates the name state when the user types into the input field.

### 3. Loading Data from Local Storage

```js
useEffect(() => {
  const savedList = localStorage.getItem("nameList");
  if (savedList) {
    setNameList(JSON.parse(savedList));
  }
}, []);
```

### 4. Saving a Name

```js
const handleSave = (): void => {
  if (!name.trim()) {
    alert("Please insert a name!");
    return;
  }
  const updatedList = [...nameList, name];
  setNameList(updatedList);
  localStorage.setItem("nameList", JSON.stringify(updatedList));
  setName("");
};
```

In this section of the code three things happen:

**a. Validation:**

- Checks if the input is empty or just whitespace. If so, alerts the user.

**b. Update State:**

- Creates a new array (updatedList) with the current name added to nameList.
- Updates nameList state and clears the input field.

**c. Local Storage:**

- Stores the updated list in local storage as a JSON string.

**5. Removing a Name**

```js
const handleRemove = (nameToRemove: string): void => {
  const updatedList = nameList.filter((item) => item !== nameToRemove);
  setNameList(updatedList);
  localStorage.setItem("nameList", JSON.stringify(updatedList));
};
```

In this code section we first filter names which creates a new array excluding the name to be removed and then update nameList state and local storage.

**6. Clearing All Names**

```js
const handleClear = (): void => {
  localStorage.clear();
  setNameList([]);
};
```

This section of code clears all data from local storage and resets nameList to an empty array.

This is how the app looks like:

![An screenshot of the example app without any list items.](/public/images/blog/1.png)

![The screenshot of the example app with the list items showing save, remove and clear buttons.](/public/images/blog/2.png)

**Please follow [this link](https://github.com/Sevicode/Local_Storage_React_TypeScript/tree/main/simple-local-storage) to the Github repository of this project.**

## Conclusion

In this article, we explored what localStorage is and demonstrated how to use the localStorage API in a React TypeScript application with a practical example. In the next article, we’ll take it a step further by using the Context API to manage and save data in localStorage.

<div style="text-align: center;">••••••••••••••••••••••••</div>

_This article was originally published in [JavaScript in Plain English](https://javascript.plainenglish.io/) a [Medium](https://javascript.plainenglish.io/4-ways-to-use-localstorage-in-react-typescript-part-1-4671460ac2b2) publication_
