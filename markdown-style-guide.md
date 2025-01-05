# Markdown Style Guide

## Headers

Use ATX-style headers with a space after the `#`:

```markdown
# H1 Header

## H2 Header

### H3 Header
```

## Text Formatting

- **Bold**: Use double asterisks `**bold**`
- _Italic_: Use single asterisks `*italic*`
- ~~Strikethrough~~: Use double tildes `~~strikethrough~~`
- `Code`: Use backticks for `inline code`

## Lists

### Unordered Lists

Use `-` for list items:

```markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
```

### Ordered Lists

Use `1.` for all items (they'll be automatically numbered):

```markdown
1. First item
1. Second item
1. Third item
```

## Links and Images

### Links

```markdown
[Link text](URL "Optional title")
```

### Images

```markdown
![Alt text](image-path.jpg "Optional title")
```

Width control:

```markdown
<img src="image-path.jpg" alt="Alt text" width="100%">
```

## Code Blocks

Use triple backticks with language specification:

````markdown
```javascript
const greeting = "Hello, world!";
console.log(greeting);
```
````

## Blockquotes

Use `>` for blockquotes:

```markdown
> This is a blockquote
> Multiple lines
```

## Tables

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
```

## Line Breaks

- End a line with two spaces for a line break
- Use a blank line for a new paragraph

## Horizontal Rules

Use three hyphens:

```markdown
---
```
