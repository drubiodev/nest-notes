# Nest Notes

## Project Overview

As an intern at Digital Nest, I want a note taking app to efficiently record and manage my work and learnings during my internship.

The app should provide the following features:

1. Create Note: As an intern, I want to be able to create new notes easily, to document my tasks, ideas, and learnings.

2. Update Note: As an intern, I want the ability to edit and update my existing notes to keep them relevant and accurate as my work progresses.

3. Delete Note: As an intern, I want the option to delete notes that are no longer needed.

4. Store Notes Locally: As an intern, I want the app to store my notes locally on my device to ensure accessibility and privacy without requiring an internet connection.

5. (Optional): Although not an immediate requirement, it would be beneficial to have the ability to search through my notes to quickly find relevant information or references as needed.

<hr>

### Getting Started

1. Create a new directory for your project

for example:

```bash
mkdir nest-notes
cd nest-notes

code . # open the project in Visual Studio Code
```

2. Initializing a new Git repo

```bash
cd /path/to/your/code
git init
```

3. Cread a README.md file

- in the root of your project, create a new file called `README.md`
- add some content to the file

```markdown
# Nest Notes
```

4. Commit your changes

```bash
git add .
git commit -m "Initial commit"
```

5. If you have a git repo push your changes.

### Debuging

#### JavaScript

- Use `console.log()` to print values to the console for debugging purposes.

```javascript
console.log("Note created successfully!");
```

- Use `debugger` to pause the execution of your code and inspect the current state.

```javascript
const appName = "Nest Notes";

debugger;
```

#### Chrome DevTools

- Use the Chrome DevTools to inspect and debug your JavaScript code.

- Open the Chrome DevTools by right-clicking on your web page and selecting "Inspect" or pressing `Ctrl + Shift + I` for windows or `Cmd + Option + I` for Mac.

- Navigate to the "Console" tab to view logs and errors.

#### VS Code Debugger

- Use the VS Code Debugger to set breakpoints and step through your code.

- Open the VS Code Debugger by clicking on the "Run and Debug" icon in the sidebar or pressing `F5`.

##### nav or aside

The aside element is used for content that is tangentially related to the content around it and could be considered separate from that content. It can be used for things like pull quotes or sidebars.

The nav element, on the other hand, is meant to be a container for major navigational elements. If the list of notes is a major part of the navigation of your application, then nav would be more semantically correct.

In the context of a note-taking app, if the list of notes is used to navigate between different notes, then a nav element would be more appropriate. This is because the list of notes is a major part of the navigation of the application.

However, if the list of notes is just a feature or an additional part of the application and not a main navigational element, then an aside element would be more appropriate.

##### JavaScript Classes

Classes in JavaScript are a way to define objects and their behavior. They are a template for creating objects with similar properties and methods.

In the context of a note-taking app, you could use classes to define the structure and behavior of notes. For example, you could create a Note class that has properties like title, content, and date, and methods like update and delete.

Here's an example of how you could define a Note class in JavaScript:

```javascript
class Note {
  constructor(title, content) {
    this.title = title;
    this.content = content;
    this.date = new Date();
  }
}
```

##### Logical OR vs Coalescing operator

The logical OR operator (`||`) and the nullish coalescing operator (`??`) are both used to provide a default value when a variable is falsy or nullish. However, they behave differently in certain cases.

By using the logical OR (`||`) operator, you can assign a default value to a property if the provided value is undefined, null, or any other falsy value.

However, if you want to allow properties to be 0, false, or '' (empty string), you should use the nullish coalescing operator (`??`) instead of the logical OR (`||`) operator. The nullish coalescing operator (`??`) only assigns the default value if the provided value is null or undefined.

##### Functions vs arrow functions
