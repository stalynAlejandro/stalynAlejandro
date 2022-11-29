# Introduction

Design patterns are a fundamental part of software development, as they provide typical solutions to commonly recurring problems in software design.

[Overview of ReactJs](#overview-of-reactjs)

[Ohter concepts](#other-concepts-in-react)

[Singleton Pattern](#singleton-pattern)

[Proxy Pattern](#proxy-pattern)

[Provider Pattern](#provider-pattern) :fire:

[Prototype Pattern](#prototype-pattern)

[Container / Presentational Pattern](#container--presentational-pattern) :fire:

[Observer Pattern](#observer-pattern) :fire:

[Module Pattern](#module-pattern)

[Dynamic Import](#dynamic-import) :fire:

[Mediator / Middleware Pattern](#mediator--middleware-pattern) :fire:

[Render Props Pattern](#render-props-pattern)

[Hooks Pattern](#hooks-pattern) :fire:

[HOC Pattern](#hoc-pattern) :fire:

[Flyweight Pattern](#flyweight-pattern)

[Factory Pattern](#factory-pattern)

[Rendering](#rendering)

[Overview of Nextjs](#overview-of-nextjs)

[Client-side Rendering](#client-side-rendering)

[Server-side Rendering](#server-side-rendering)

[Static Rendering](#static-rendering)

[Incremental Static Generation](#incremental-static-generation)

# Overview of ReactJs

A UI library for building reusable user interface components. React provides an optimized and simplified way of expressing interfaces in these elements. It also helps build complex and tricky interfaces by organizing your interface into three key concepts - _compnents, props and state_.

Designing for React actually rewards you for thinking in a modular way. It allows you to design individual components before putting together a page or view, so you fully understand each component's scope and purpose - a process referred to as _componentization_.

### Terminology

> ReactDOM : The package for DOM and server rendering

> JSX : Syntax extension to JavaScript

> Redux : Centralized state container

> Hooks : A new way to use React features without writing classes

> React Native : The library to develop cross-platform native apps with JavaScript

> Webpack : Javascript module bundler, popular in React community.

> NextJS : A React framework with many best-in-class features including SSR, Code-splitting, optimized for performance.

### Rendering with JSX

JSX is an extension to JavaScript which embeds template HTML in JS using XML-like syntax. It is meant to be transformed into valid JavaScript, though the semantics of that transformation are implementation-specific. JSX rose to popularity with the React library.

### Components, Props and State

Components are the building block of any React App. They are like JavaScript functions that accept arbitrary input (props) and return React elements describing what should be displayed on the screen.

The first thing to understand is that everything on screen in a React app is part of a component.

A React app is just components within components. So developers don't build pages in React: they build components.

Components let you split your UI into independent, reusable pieces.

The most direct way to define a component is to write a JavaScript function.

```javascript
function Badge(props) {
  return <h1>Hello, my name is {props.name}</h1>;
}
```

This function is a valid React Component because it accepts a single prop (which stands for properties) object argument with data and returns a React element. Such components are called "functions components" because they are literally JavaScripts functions.

Extracting components seems like a tedius job, but having reusable components make things easier when coding for larger apps. A good criterion to consider when simplifying components is this:

> if a part of your UI is used several times (Button, Panel), or complex enough on its own (App, FeedStory, Comment) it is a good candidate to be extracted to a separate component.

### Props

Props are short form for properties, and they simply refer to the internal data of a component in React.

Two things are worth remembering about props:

> 1. We determine the value of a prop and use it as part of the blueprint before the component is built.

> 2. The value of a prop will never change i.e.props are read-only once they are passed into components.

### State

State is an object that holds some information that may change over the lifetime of the component. Meaning it is just the current snapshot of data stored in a component's Props.

The data can change over time, so techniques to manage the way that data changes become necessary to ensure the component looks the way engineers want it to, at just the right time - this is called _State management_.

### State and Props

**Props** are variables passed by its parent components.

**State** still variables, but directly initialized and managed by the component.

Think of React components like micro-applications with their own data, logic, and presentation. Each component should have a single purpose.

## How to add State in React

When designing, including state is a task that you should save for last. It is much better to desing everything as stateless as possible, using props and events. This makes components easier to maintain, test and understand.

Adding states should be done through either state containers such as _Redux_ and _MobX_ or a container/wrapper component.

Redux implements a centralized state machine driven by actions.

**Without Redux** : Each component has its own state, and requires extra logic for passing data outside of the component.

**With Redux** : All components refer to the centralized state. Each component only handles its representation based on a specific state, but not the logic of data handling.

## Prop vs State

**Props**

- The data remains unchanged from component to to component.
- The data is read-only.
- The data in props cannot be modified.
- Props are what is passed on to the component.

**State**

- Data is the current snapshot of data stored in a component's Props. It changes over the lifecycle of the component.
- The data can be asynchronous.
- The data in state can be modified using _setState_.
- State is managed within the component.

# Other concepts in React

### Lifecycle

Every react component goes through three stages: mounting, rendering and dismounting.

Lifecyle methods:

- render() : It handles the rendering of your component to the UI, and it happens during mounting and rendering of your component.

- componentDidMount(): runs after the component output has been rendered to the DOM.

- componentWillUnmount(): is invoked immediately before a component is unmounted and destroyed.

- shouldComponentUpdate(): is invoked before rendering when new props or state are being received.

- componentDidUpdate(): is invoked immediately after updating occurs. This method is not called for the initial render.

### Higher-order component (HOC)

They are patterns that emerge from React's compositional nature. A HOC component transforms a component into another component, and they tend to be popular in third-party libraries.

## Context

Usually data is passed down via props, but this can be cumbersome for some types of props that are required by many components within an application.

Context provides a way to share these types of data between components without having to explicitly pass a prop through every level or hierarchy. Meaning with context, we can avoid passing props through intermediate elements.

## React Hooks

Hooks are functions that let you 'hook into' React state and lifecycle features from functional components. They let you use state and other React features without writing a class.

## Break the UI into a Hierarchy Component

Use the single responsability principle: a component should ideally have a single function. If it ends up growing, it should be broken down into smaller subcomponents.

# Singleton Pattern

Share a single global instance throughout the application.

Singletons are classes which can be instantiated once, and can be accessed globally. This single instance can be throughout our app location, which make Singletons great for managing global state in an application.

# Proxy Pattern

Share a single global instance throughout our application

With a Proxy object, we get more control over the interactions with certain objects. A proxy object can determine the behaviour whenever we're interacting with the object, for example when we're getting a value, or setting a value.

Generally speaking, a proxy means a stand-in for someone else. Instead of speaking to that person directly, you'll speak to the proxy person who will represent the person your were trying to reach. The same happens in JavaScript: Instead of interacting with the target object directly, we'll interact with the Proxy object.

```javascript
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};
```

Instead of interacting with this object directly, we want to interact with a proxy object. In JavaScript, we can easily create a new proxy with by creating a new instance of Proxy.

```javascript
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

const personProxy = new Proxy(person, {});
```

The second argument of Proxy is an object that represents the handler. In the handler object, we can define specific behaviour based on the type of interaction.

Two most common methods to add to the Proxy are:

- get: Gets invoked when trying to access a property

- set: Gets invoked when trying to modify a property

Instead of interacting with the person object directly, we'll be interacting with the _personProxy_.

Let's add handlers to the _personProxy_.

When trying to modify a property, thus invoking the _set_ method on the proxy, we want it to log the previous value and the new value of the property.

When trying to access a property, thus invoking the _get_ method of the Proxy, we want it to log a more readable sentence that contains the key and value of the property.

A proxy can be useful to add **validation**. A user shouldn't be able to change person's age to a string value, or give him an empty name. Or if the user is trying to access a property on the object that doesn't exist, we should let the user know.

```javascript
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log("Sorry, age has to be a numeric value");
    }
    if (prop === "name" && typeof value.length < 2) {
      console.log("You need to provide a valid name");
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
  },
});

personProxy.name; // The value of name is John Doe
personProxy.age = 43; // Changed age from 42 to 43
```

The proxy makes sure that we weren't modifying the person object with faulty values, which helps us keep our data pure!

### Reflect

JavaScript provides a built-in object called _Reflect_, which makes it easier for us to manipulate the target object when working with proxies.

Instead of accessing properties through _obj[prop]_, we can access or modify properties on the target with _Reflect.get()_ and _Reflect.set()_.

```javascript
const personProxy = new Proxy(person, {
  get: (obj, prop) =>{
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  }

  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    Reflect.set(obj, prop, value);
  }

})

```

**Proxies** are powerful way to add control over the behaviour of an object. A proxy can have various use-cases: it can help with validation, formatting, notifications, or debugging.

Overusing the _Proxy_ object or perfoming heavy operations on each handler method invocation can easily affect the performance of your application negatively. It's best to **not** use proxies for performance-critical code.

# Provider Pattern

Make data available to multiple child components

In some cases, we want to make available data to many (if not all) components in an application. Although we can pass data to components using props, this can be difficult to do if almost all components in your application need access to the value of the props.

Passing props down this way can get quite messy. If we want to rename the data prop in the future, we'd have to rename it in all components. The bigger your application gets, the trickier _prop drilling can be_.

This is where the **Provider Pattern** can help us! We can make data available to multiple to components. Rather than passing that data down each layer through props, we can wrap all components in a _Provider_.

A _Provider_ is a higher order component provided to us by the _Context object_. We can create a _Context_ object, using the _createContext_ method that React provide for us.

The _Provider_ receives a value prop, which contains the data that we want to pass down. All components that are wrapped within this provider have access to the value of the prop.

```javascript
const DataContext = React.createContext()

function App(){
  const data = { ... }

  return (
    <DataContext.Provider value={data}>
      <SideBar />
      <Content />
    </DataContext.Provider>
  )
}

```

We no longer have to manually pass down the data prop to each component! Each component can get access to the data.

The _useContext_ hook lets us read and write data to the context object.

```javascript

function SideBar = () => {

  const {data} = React.useContext(DataContext)

  return <ul>{data.list}</ul>

}

function Content = () => {

  const {data} = React.useContext(DataContext)

  return <div>{data.text}</div>

}
```

The _Provider_ pattern is very useful for sharing global data.

A common use case for the provider pattern is sharing a theme UI state with many components.

```javascript

export const ThemeContext = React.createContext()

const themes = {
  light: { background: "#FFF", color: "#000"}
  dark: { background: "#1717", color: "#FFF"}
};

export default function App(){

  const [theme, setTheme] = useState('dark')

  function toggleTheme(){
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  const providerValue = { theme: themes[theme], toggleTheme};

  return(
    <div className={`App theme-${theme}`}>
      <ThemeContext.Provider value={providerValue}>
        <Toggle />
        <List />
      </ThemeContext.Provier>
    </div>
  )

}

export default function Toggle(){

  const theme = useContext(ThemeContext)

  return(
    <label>
      <input type="checkbox" onClick={theme.toggleTheme} />
    </label>
  )
}

```

### Hooks

We can create a hook to provide context to components. Instead of having to import useContext and the Context in each component, we can use a hook that returns the context we need.

```javascript
function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return theme;
}
```

Instead of wrapping the component directly with the _ThemeContext.Provider_ component, we can create a HOC that wraps this component to provide its values.

This way we can separate the context logic from the rendering components, which improves the reusability of the provider.

```javascript

function ThemeProvider({children}){
  const [theme, setTheme] = useState('dark');

  function toggleTheme(){
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  const providerValue = { theme: themes[theme], toggleTheme};

  return (
    <ThemeProvider.Provider value={providerValue} >
      {children}
    </ThemeProvider.Provider>

  )
}

export default function App(){
  return (
    <div className={`App theme`}>
      <ThemeProvider>
        <List />
      </ThemeProvider>
    </div>

  )
}

export default function ListItem(){
  const theme = useThemeContext();
  return <li style={theme.theme}>...</li>
}

```

# Prototype Pattern

Share properties among many objects of the same type

The prototype pattern is a useful way to share properties among many objects of the same type. The prototpe is an object that's native to JavaScript, and can be accessed by objects through the prototype chain.

In our applications, we often have to create many objects of the same type. A useful way of doing this is by creating multiple instances.

The prototype pattern is very powerful when working with objects that should have access to the same properties. Instead of creating a duplicate of the property each time, we can simply add the property to the prototype, since all instances have acess to the prototype object.

Since _all insntances have access to the prototype_, it's easy to add properties to the prototype even after creating instances.

```javascript

class Dog{

  constructor(name){
    this.name = name;
  }

  bark(){
    return 'woof!';
  }

}


const dog1 = new Dog('Daisy');

Dog.prototype.play() => console.log('Playing now!')


dog1.play(); // Playing now!


```

The term _prototype chain_ indicates that there could be more than one step. We've only seen how we ca access properties that are directly available on the first object that _**proto**_ has a reference to. However, prototypes themselves also have a _**proto**_ object.

Let's create a super dog.

```javascript
class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    return "flying!";
  }
}

const dog1 = new SuperDog("Daisy");

dog1.bark();
dog1.fly();
```

### Object.create

The _Object.create_ method let us create a new object, to which we can explicitly pass the value of its prototype.

```javascript
const dog = {
  bark() {
    console.log("Woof!");
  },
};

const pet1 = Object.create(dog);

pet1.bark(); // Woof!

console.log('Direct properties on pet1: ', Object.keys(pet1))
console.log('Properties on pet1's prototype: ', Object.keys(pet1.__proto__));
```

_Object.crate_ is a simple way to let objects directly inherit properties from other objects, by specifying the newly created object's prototype. The new object can access the new properties by walking down the prototype chain.

The **Prototype Pattern** allows us to easily let objects acess and inherit properties from other objects. Since the prototype chain allows us to access properties that aren't directly defined on the object itself, we can avoid duplication of methods and properties, thus reducing the amount of memory used.

# Container / Presentational Pattern

Enforce separation of concerns by separating the view from the application logic.

Ideally, we want to enforce separation of concerns by separating this process into two parts:

1. Presentational Components: Components that care about how data is shown to the user. Example, that's rendering the list of images.

2. Container Components: Components that care about what data is shown to the user. Example fetching the dog images.

_Fetching_ the dog images deals with application _logic_, whereas **displaying** the images only deals with the **view**.

## Presentational Component

A presentational component receives its data through props. Its primary function is to simply display the data it receives the way we want them to, including styles, without modifying that data.

Let's take a look at the example that displays the images. When rendering the images, we simply want to map over each dog image that was fetched from the API, and render those images.

We can create a functional component that receives the data through props, and renders the data it received.

```javascript
export const DogImages = ({ dogs }) => {
  return dogs.map((dog, i) => <img key={i} src={dog} alt="Dog" />);
};
```

The _DogsImages_ component is _presentational component_. Presentational Components are usually stateless: **they do not contain their own State**, unless they need a state for UI purposes. The data they receive, is not altered by the representational components themselves.

Presentational components receive their data from container components.

## Container Components

The primary function container components is to pass data to presentational components, which they contain. Container components themselves usually don't render any other components besides the presentational components that care about their data. They usually don't contain any styling either.

We need to create a container that fetches this data, and passes to the presentational component in order to display it on the screen.

```javascript
export const DogImagesContainer = () => {
  const [dogs, setDogs] = useState([]);

  const fetchData = () => {
    fetch("https://dog.ceo/api/bread/labrador/images/random/6")
      .then((res) => res.json())
      .then(({ message }) => setDogs({ dogs: message }));
  };

  return <DogImages dogs={dogs} />;
};
```

Combining these two components together makes it possible to separate handling application logic with the view.

## Hooks

In many cases, the Container/Presentational can be replaced with React hooks. The introduction of hooks made it easy for developers to add satefulness without needing a container to provide that state.

Instead of having the data fetching in the _Container_ component, we can create a custom hook that fetches the images and returns the array of dogs.

```javascript
export function useDogImages() {
  const [dogs, setDogs] = useSate([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/bread/labrador/images/random/6")
      .then((res) => res.json())
      .then(({ message }) => setDogs(message));
  }, []);

  return dogs;
}
```

By using this hook, we no longer need the wrapping Container component to fetch the data, and send this to the presentational component.

**We use this hook directly in our presentational component**.

```js
import {useState, useEffect} from 'react'

export function useDogImages(){
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    asyn function fetchDogs(){
      const res = await fetch('https://dog.ceo/random/6');
      const {message} = await res.json();
      setDogs(message)
    }

    fetchDogs();
  },[])

  return dogs;
}

```

```js
import { useDogImages } from "./useDogImages";

export const DogImages = () => {
  const dogs = useDogImages();

  return dogs.map((dog, i) => <img key={i} src={dog} alt="Dog" />);
};
```

By using the _useDogImages_ hook, we still separated the application logic from the view. We're simply using the returned data from the _useDogImages_ hook, without modifying that data.

Hooks make it easy to separete logic and view in a component, just like the Container/Presentational pattern. It saves us the extra layer that was necessary in order to wrap the presentational component within the container component.

### Pros

This makes it easy to enforce the separation of concerns.

Presentational components are easly made reusable, as they simply display data without altering this data.

Testing presentational components is easy, as they are usually pure functions.

# Observer Pattern

Use observables to notify subscribers when an event occurs.

With the observer pattern, we can subscribe certain objects. the observers, to another object, called the observable. Whenever an event occurs, the observable notifies all its observers!

An observable object usually contains 3 important parts:

- observers: an array of observers that will get notified whenever a specific event occurs.
  }
- subscribe(): a method in order to add observers to the observers list.

- unsubscribe(): a method in order to remove observers from the observers list.

- notify(): a method to notify all observers whenever a specific event occurs.

```javascript
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
```

Let's build something observable. We have a very basic app that only consists of two components: a _Button_ and a _Swtich_.

```javascript
export default function App() {
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLable control={<Switch />} />
    </div>
  );
}
```

We want to keep track of the user interaction with the application. Whenever a user clicks the button or toggles the swtich, we want to log this event with the timestamp. Besides loggin it, we also want to create a toast notification that shows up whenever an event occurs!

Whenever the user invokes the _handleClick_ or _handleToggle_ function, the functions invoke the notify method on the observer. The notify method notifies all subscribers with the data that was passed by the _handleClick_ or _handleToggle_ functions!

First, let's create the _logger_ and _tastily_ functions. This functions will eventually receive data from the notify method.

```javascript
import { ToastContainer, toast } from "react-toastify";

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data);
}

observable.subscribe(logger);
observable.subscribe(toastify);

export default function App() {
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLable control={<Switch />} />
    </div>
  );
}
```

Whenever an event occurs, the _logger_ and _toastify_ functions will get notified. Now we just need to implement the functions that actually notify the observable: the _handleClick_ and _handleToggle_ functions! These functions should invoke the notify mehtod on the observable, and pass the data to the observers should receive.

```javascript
import { ToastContainer, toast } from "react-toastify";

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data, {
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: flase,
    autoClose: 2000,
  });
}

observable.subscribe(logger);
observable.subscribe(toastify);

export default function App() {
  function handleClick() {
    observable.notify("User clicked button!");
  }

  function handleToggle() {
    observable.notify("User toggled switch!");
  }

  return (
    <div className="App">
      <Button onClick={handleClick}>Click me!</Button>
      <FormControlLable control={<Switch onChange={handleToggle} />} />
    </div>
  );
}
```

We just finished the entire flow: _handleClick_ and _handleToggle_ invoke the notify method on the observer with the data, after which the observer notifies the subscribers: the _logger_ and _toastify_ functions in this case.

Whenever a user interacts with either of the components, both the logger and the toastify functions will get notified with the data that we passed to the notify method!

## Pros

Using the observer pattern is a great way to enforce separation of concerns and the single-responsability principle. The observer objects aren't tightly coupled to the observer object, and can be (de)coupled at any time.

The observable object is responsible for monitoring the events, while the observers simply handle the received data.

## Cons

If an observer becomes too complex, it may cause performance issues when notifying all subscribers.

## Case Study

A popular library that uses the observable pattern is _RxJs_.

_ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events. - RxJS_

With RxJS we can create observables and subscribe to certain events! Let's look at an example that's covered in their documentation, which logs whether a user was dragging in the document or not.

```javascript
import { fromEvent, merge } from "rxjs";
import { sample, mapTo } from "rxjs/operatos";
import "./styles.css";

merge(
  fromEvent(document, "mousedown").pipe(mapTo(false)),
  fromEvent(document, "mousemove").pipe(mapTo(true))
)
  .pipe(sample(fromEvent(document, "mouseup")))
  .subscribe((isDraggin) => {
    console.log("Were you draggin?", isDraggin);
  });

  ReactDOM.render(
    <div className='App'>
      Click or drag anywhere and check the console!
    </div>
    document.getElementById('root')
  )

```

# Module Pattern

Split up your code into smaller, reusable pieces.

Besides being able to split your code into smaller reusable pieces, _modules_ allow you to keep certain values within your file private.

Declarations within a _module_ are scoped (encapsulated) to that module, by default. If we don't explicitly export certain value, that value is not available outside that module.

This reduces the risk of name collisions for values declared in other parts of your codebase, since the values are not available on the global scope.

## ES2015 Modules

A module is a file containing JavaScript code, with some difference in behaviour compared to a normal script.

example: _math.js_

```javascript
// math.js

export function add(x, y) {
  return x + y;
}

export function multiply(x) {
  return x * 2;
}

export function substract(x, y) {
  return x - y;
}

export function square(x) {
  return x * x;
}
```

We have a _math.js_ file containing some simple mathematical logic.

However, we don't just want to use these functions in the _math.js_ file, we want to be able to refernce them in the _index.js_ file. That's why every functions has an _export_ key work in front of them.

Let's use these functions now!

```javascript
//  index.js

import { add, multiply, substract, sqare } from "./math";

console.log(add(2, 3));
console.log(multiply(2));
console.log(substract(2, 3));
console.log(square(2));
```

Besides named exports, which are exports defined with just the export keyword, you can also use a defult export. You can only have one default per module.

The difference between named exports and default exports, is the way the value is exported from the module, effectively changing the way we have to import the value.

In this case, we're importing all exports from a module. Be careful when doing this, since you may end up unnecessarily importing values. Using the \* only imports all exported values. Values private to the module are still not available in the file that imports the module, unless you explicitly exported them.

## React

When building applications with React, you often have to deal with a large amount of components. Instead of writing all of these components in one file, we can separate the components in their own files, essentially creating a module for each component.

```javascript
//Button.js

import React from "react";
import Button from "@material-ui/core/Button";

export default function CustomButton(props){
  return(
    <Button {..props}>
      {props.children}
    </Button>
  )
}

```

```javascript
// Input.js

import React from "react";
import Input from "@material-ui/core/Input";

export default function CustomInput(props, { variant = "standard" }) {
  return (
    <Input {...props} variant={variant} placeholder="Type" />;
  )
}
```

Throughout the app, we don't want to use the default _Button_ and _Input_ component, imported from the material-ui library. Instead, we want to use our custom version of the components, by adding custom styles to it defined in the styles object in their files.

Rather than importing the default _Button_ and _Input_ component each time in our application and adding custom styles to it over and over, we can now simply import the default _Button_ and _Input_ component once, add styles, and export our custom component.

# Dynamic Import

When importing all modules on the top of a file, all modules get loaded before the rest of the file. In some cases, we only need to import a module based on a certain condition. With a dynamic import, we can import modules on demand.

Let's dynamically import the _math.js_ example used in the previous paragraphs. The module only gets loaded, if the user clicks on the button.

```javascript
const button = document.getElementById("btn");

button.addEventListener("click", () => {
  import("./math.js").then((module) => {
    console.log("Add: ", module.add(1, 2));
    console.log("Multiply: ", module.multiply(3, 2));

    const button = document.getElementById("btn");
    button.innerHTML = "Check the console";
  });
});
```

By dynamically importing modules, we can reduce the page load time. We only have to load, parse, and compile the code that the user really needs, when the user needs it.

With the module pattern, we can encapsulate parts of our code that should not be publicy exposed. This prevents accidental name collisions and global scope pollution, which makes working with multiple dependencies and namespace less risky.

# Mediator / Middleware Pattern

Use central mediator object to handle communication between components.
}
The mediator pattern makes it possible for components to interact with each other through a central point: _the mediator_. Instead of directly talking to each other, the mediator receives the requests, and sends them forward! In Javascript, the mediator is often nothing more than an object litral or a function.

Instead of letting every object talk directly to the other objects, resulting in a many-to-many relationships, the object's requests get handled by the mediator. The mediator processes this request, and sends it forward to where it needs to be.

A good use case for the mediator pattern is a chatroom.

```javascript
class ChatRoom {
  logMessage(user, message) {
    const time = new Date();
    const sender = user.getName();

    console.log(`${time} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(meesage) {
    this.chatroom.logMessage(this, message);
  }
}
```

We can create new users that are connected to the chat room. Each user instance has send method which we can use in order to send messages.

```javascript
const chatroom = new ChatRoom();

const user1 = new User("John", chatroom);
const user2 = new User("Doe", chatroom);

user1.send("Hi there!");
```

## Case Study

**Expres.js** is a popular web application server framework. We can add callbacks to certain routes that the user can access.

Say we want to add a header to the request if the user hits the root '/'. We can add this header in the middleware callback.

```javascript
const app = require('express');

app.use('/', (req, res, next) => {
  req.headers('test-header') = 1234;
  next();
})

```

The _next_ method calls the next callback in the request-response cycle. We'd be creating a chain of middleware functions that sit between the request and the response, or vice versa.

```
request => next (middleware) => next (middleware) => response
```

Let's add another middleware function that checks whether the test-header was added correctly.

```javascript
const app = require("express");

app.use("/", (req, res, next) => {
  req.headers('test-header') = 1234;
  next();
},
(req,res,next) => {
  console.log(`Request has test header: ${!!req.headers["test-headers"]}`);
next();
}
);
```

We can track and modify the request object all the way to the response through one or multiple middleware functions.

```javascript
const app = require('express')
const html = require(./data)

app.use("/", (req, res, next) => {
  req.headers('test-header') = 1234;
  next();
},
(req,res,next) => {
  console.log(`Request has test header: ${!!req.headers["test-headers"]}`);
next();
}
);

app.get('/', (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from(html))
})

app.listen(8080, function(){
  console.log('Server is running on 8080..')
})
```

Every time the user hits a root endpoint '/' the two middleware callbacks will be invoked.

The middleware pattern makes it easy for us to simply many-to-many relationships between objects, by leeting all comunication flow through one central point.

# Render Props Pattern

Pass JSX elements to components through props.

In the section on Higher Order Components, we saw that being able to reuse component logic can be very convenient if multiple components needs access to the same data, or contain the same logic.

Another way of making components very reusable, is by using the render prop pattern. A render prop is a prop component, which value is a function that return a JSX element.

The component itself does not render anything besides the render prop. Instead, the component simply calls the render prop, instead of implementing its own render logic.

Imagine that we have a _Title_ component. In this case, the _Title_ component shouldn't do anything besides rendering the value that we pass.

Let's pass the value that we want the _Title_ component to render the render prop.

```javascript
<Title render={() => <h1>I am a render prop</h1>} />
```

Within the _Title_ component, we can render this data by returning the invoked render prop!

```javascript
const Title = (props) => props.render();
```

The cool thing about render props, is that the component that receives the prop is very reusable. We can use it multipel times, passing different values to the render prop each time.

```javascript
import React from "react";
import { render } from "react-dom";
import "./styles.css";

const Title = (props) => props.render();

render(
  <div className="App">
    <Title render={() => <h1>"First render"</h1>} />
    <Title render={() => <h1>"Second render"</h1>} />
  </div>,
  document.getElementById("root")
);
```

Great! We've just seen that we can use render props in order to make a component reusable, as we can pass different data to the render prop each time. But, why would you want to use this?

A component that takes a render prop usually does a lot more than simply invoking the render prop. Instead, we usually want to pass data from the component that takes the render prop, to the element that we pass as a render prop!

```javascript
function component(props){
  const data = {...}
  return props.render(data)
}
```

The render prop can now receive this value that we passed as its argument.

```javascript
<Component render={data => <ChildComponent data={data}>} />
```

Let's look at an example. The app shows the value of this temperature in Fahrenheit and Kelvin.

```javascript

function Input({value, handleChange}) => {
  return <input value={value} onChange={e => handleChange(e.targe.value)} />;
}

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <h1>Temperature Converter</h1>
      <Input value={value} handleChange={setValue} />
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </div>
  );
}
```

Although this is a valid solution, it can be tricky to lift state in larger applications with components that handle many children. Each state change could cause a re-render of all the children, even the ones that don't handle the data, which could negatively affect the performance of your app.
Let's change the _Input_ component in a way that it can receive render props.

```javascript
function Input(props) {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={"Temp"}
      />
      {props.render(value)}
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Temperature Converter</h1>
      <Input
        render={(value) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </div>
  );
}
```

The _Kelvin_ and _Fahrenheit_ components now have access to the value of the user's input.

Besides regular JXS components, we can pass functions as children to React components. This function is available to us through the children prop, which is technically also a render prop.

Let's change the _Input_ component. Instead of explicitly passing the render prop, we'll just pass a function as child for the _Input_ component.

```javascript
export default function App() {
  return (
    <div className="App">
      <h1>Temperature Converter</h1>
      <Input
        {value => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </div>
  );
}
```

We have access to this function, through the _props.children_ prop that's available on the _Input_ component. Instead of calling _props.render_ with the value of the user input, we'll call _props.children_ with the value of the user input.

```javascript

function Input(props){
  const [value, setValue] = useState("");

  return(
    <>
      <input type="text" value={value} onChange={e => setValue(e.target.value) placeholder="Temp"} />
      {props.children(value)}
    </>
  )
}

```

## Hooks

In some cases, we can replace render props with Hooks. A good example of this Apollo Client.

After the release of Hooks, Apollo added Hooks support to the Apollo Client library. Instead of using the _Mutation_ and _Query_ render props, developers can now directly access the data through the hooks that the library provides.

Let's look at an example that uses the exact same data as we previously saw in the exmple with the _Query_ render prop.

This time we'll provide the data to the component by using the _useQuery_ hook that Apollo Client provided for us.

```javascript
import React, { useState } from "react";
import "./styles.css";

import { useMutation } from "@apollo/react-hooks";
import { ADD_MESSAGE } from "./resolver";

export default function Input() {
  const [message, setMessage] = useState("");
  const [addMessage] = useMutation(ADD_MESSAGE, { variables: { message } });

  return (
    <div className="input-row">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type something ..."
      />
      <button onClick={addMessage}>Add</button>
    </div>
  );
}
```

By using the _useQuery_ hook, we reduced the amount of code that was needed in order to provide the data to the component.

## Pros

Sharing logic and data among several component is easy with the render pros pattern. Components can be made very reusable, by using a render of children prop. Although the _Higher Order Component_ pattern mainly solves the same issues, namely reusability and sharing data, the render props pattern solves some of the issues we could ecounter by using the HOC pattern.

The issue of naming collisions that we can run into by using the HOC pattern no longer applies by using the render props pattern, since we don't automatically merge props.

We explicitly pass the props down to the child components, with the value provided by the parent component.

Since we explicitly pass props, we solve the HOC's implicitly prop issue. The props that should get passed down to the element, are all visible in the render prop's arguments list. This way, we know exactly where certain props come from.

We can separate our app's logic from rendering components through render props. The stateful component that receives a render prop can pass the data onto stateless components, which merely render the data.

## Cons

The issues that we tried to solve with render props, have largely been replaced by React Hooks. As hooks changed the way we can add reusability and data sharing to components, they can replace the render props pattern in many cases.

Since we can't add lifecycle mehtods to a render prop, we can only use it on components that don't need to alter the data they recive.

# Hooks Pattern

Use functions to reuse stateful logic among multiple components throught the app

React 16.8 introduced a new feature called Hooks. Hooks make it possible to use React state and lifecycle methods, withouth having to use a class component.

Hooks play a very important role in your application design. Meny traditional design patterns can bre replaced by Hooks.

React Hooks are functions that you can use to manage a component state and lifecycle methods. React Hooks make it possible to:

- Add state to a functional component

- Manage a component's lifecycle without having to use lifecycle methods such as _componentDidMount_ and _componentWillUnmount_

- Reuse the same stateful logic among multiple components throughout the app

First, let's take a look at how we can add state to a functional component, using React Hooks.

## State Hooks

React provides a hook that manages state within a functional component, called _useState_.

We can refactor the _Input_ into a stateful functional component.

```javascript
function input() {
  const [input, setInput] = useState("");

  return (
    <input
      onChange={(e) => setInput(e.target.value)}
      value={input}
      placeholder="Type something ..."
    />
  );
}
```

## Effect Hook

We've seen we can use the _useState_ component to handle state within a functional component, but another benefit of class components was the possibility to add lifecycle methods to a component.

With the _useEffect_ hook, we can "hook into" a components lifecycle. The _useEffect_ hook effectively combines the _componentDidMount_, _componentDidUpdate_ and _componentWillUnmount_ lifecycle methods.

```javascript
componentDidMount(){ ... }
useEffect(() => { ... }, [])

componentWillUnmount(){ ... }
useEffect(() => {return () => { ... }})

componentDidUpdate(){ ... }
useEffect(() => { ... })
```

We can add input dependency array to the _useEffect_ hook.

```javascript
import React, { useState, useEffect } from "react";

export function Input() {
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(`The user typed ${input}`);
  }, [input]);

  return (
    <input
      onChange={(e) => setInput(e.target.value)}
      value={input}
      placeholder="Type something "
    />
  );
}
```

The value of the input gets logged to the console whenever the user types a value.

## Custom Hooks

Besides the built-in hooks that React provides:

- useState

- useEffect

- useReducer

- useRef

- useContext

- useMemo

- useContext

- useImperativeHandle

- useLayoutEffect

- useDebugValue

- useCallback

You may have noticed that all hooks start with _use_. It's important to start your hooks with _use_ in order for React to check if it violates the rules of Hooks.

Let's say we want to keep track of certain keys that the user may press when writing the input. Our custom hooks sould be able to receive the key we want to target as its argument.

We want to add a keydown and keyup event listener to the key that the user passed as an argument. If the user pressed that key, meaning the keydown event gets triggered, the state within the hook should toggle to true. Else, when the user stops pressing that button, the keyup event gets triggered and the state toggles to false.

```javascript
// useKeyPress.js

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  function handleDown() {
    if (key === targetKey) setKeyPressed(true);
  }

  function handleUp({ key }) {
    if (key === targetKey) setKeyPressed(false);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  return keyPressed;
}
```

```javascript
// Input.js
import useKeyPress from "./useKeyPress";

export function Input() {
  const [input, setInput] = useState("");
  const pressQ = useKeyPress("q");
  const pressW = useKeyPress("w");
  const pressL = useKeyPress("l");

  useEffect(() => {
    console.log(`The user pressed Q!`);
  }, [pressQ]);

  return (
    <input
      onChange={(e) => setInput(e.target.value)}
      value={input}
      placeholder="Type something ..."
    />
  );
}
```

Instead of keeping the _key pressed_ logic local to the input component, we can now reuse the _useKeyPress_ hook throughout multiple components, without having to rewrite the same logic over and over.

Let's rewrite the counter and width example shown in the previous section.

```javascript
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, []);

  return width;
}

export function App() {
  const counter = useCounter();
  const width = useWindowWidth();

  return (
    <div className="App">
      <Count
        count={counter.count}
        increment={counter.increment}
        decrement={counter.decrement}
      />
      <div id="divider" />
      <Width width={width} />
    </div>
  );
}
```

We broke the logic of the _App_ function into several pieces:

- useCounter: A custom hook that returns the current value of count, an increment method, and a decrement method.

- useWindowWidth: A custom hook that returns the window's current width.

- App: A functional, stateful component that returns the _Counter_ and _Width_ component.

By using Hooks instead of a class component, we were able to break the logic into smaller, reusable pieces that separate the logic.

Using hooks just made it much clearer to separate the logic of our component into several smaller pieces. Reusing the same stateful logic just became much easier, and we no longer have to rewrite functional components into class components if we want to make the component stateful.

Having reusable stateful logic increases the testatibily, flexibility and readability of components.

## Adding Hooks

Like other components, there are special functions that are used when you want to add Hooks to the code you have written. Here's a brief of overview of some common Hooks functions.

- useState. Enables developers to update and manipulate state inside functions components without needing to convert it to a class component. One advantage of this hook is that is simple and does not require as much complexity as other react hooks.

- useEffect. Is used to run code during major lifecycle events in a function component. The main body of a function component does not allow mutations, subscriptions, timers, loggins and other side effects. If they are allowed, it could lead to confusing bugs and inconsistencies within the UI. The useEffect hook prevents all of these "side effects" and allows the UI to run smoothly. It is a combination of _comopnentDidMount_, _componentDidUpdate_, and _componentWillUnmount_ all in one place.

- useContext. Accepts a context object, which is the value returned from React.createContext, and returns the current context value for that context. The useContext hooks also works with the React Context API in order to share data through various levels.
  It should be noted that the argument passed to the _useContext_ hook must be the context object itself and any component calling the _useContext_ always re-render whenever the context value changes.

- useReducer. Gives an alternative to _useState_ and is specially preferable to it when you have complex state logic that involves multiple subvalues or when the next state depends on the previous one. It takes on a reducer function and an initial state input and returns the current state and a dispatch function as output by means of array destructuring. useReducer also optimizes the performance of components that trigger deep updates.

## Pros and Cons of using hooks.

Here are some benefits of making use of Hooks:

Fewer lines of code Hooks allows you group code by concern and functionality, and not by lifecycle. This makes the code not only cleaner and concise but also shorter. Below is a comparision of a simple stateless component of a searchable product data table using React, and how it looks in Hooks after using the _useState_ keyword.

```javascript
// Component with hooks

const TweetSearchResults = ({ tweets }) => {
  const [filterText, setFilterText] = useState("");
  const [inThisLocation, setInThisLocation] = useState("");

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inThisLocation={inThisLocation}
        setFilterText={setFilterText}
        setInThisLocation={setInThisLocation}
      />
      <TweetList
        tweets={tweets}
        filterText={filterText}
        inThisLocation={inThisLocation}
      />
    </div>
  );
};
```

# HOC Pattern

Pass reusable logic down as props to components throughout your application

Within our application, we often want to use the same logic in multiple components. This logic con include applying a certain styling to components, requiring authorization, or adding a global state.

One way of being able to reuse the same logic in multiple components, is by using the higher order component pattern. This pattern allows us to reuse component logic throughout our application.

A HOC is component that receives another component. The HOC contains certain logic that we want to apply to the component that we pass a parameter. After applying that logic, the HOC returns the element with the additional logic.

Say that we always wanted to add a certain styling to multiple components in our application. Instead of creating a style object locally each time, we can symply create a HOC that adds the style objects to the component that we pass to it.

```javascript
function withStyles(Component) {
  return (props) => {
    const styles = { padding: "0.2rem", margin: "1rem" };
    return <Component style={style} {...props} />;
  };
}

const Button = () => <button>Click Me!</button>;
const Text = () => <p>Hello World!</p>;

const StyledButton = withStyles(Button);
const StyledText = withStyles(Text);
```

They now both contain the style that got added in the _withStyles_ HOC.

Let's create a HOC called _withLoader_. A HOC should receive an component, and return that component. In this case, the withLoader HOC should receive the element which should display _Loading..._ until the data is fetched.

Let's create the bare minimum version of the withLoader HOC that we want to use!

A HOC returns an element, a functional componet to which we want to add the logic that allows us to display a text with _Loading..._ as the data is still being fetched. Once the data has been fetched, the component should pass the fetched data as a props.

```javascript
import React, { useEffect, useState } from "react";

function withLoader(Element, url) {
  return (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }
      getData();
    }, []);

    if (!data) return <div>Loading...</div>;

    return <Element {...props} data={data} />;
  };
}
```

We just created a HOC that can receive any component and url.

In the _useEffect_ hook, with _withLoader_ HOC fetches the data from the API endpoint that we pass as the value of url. While the data hasn't returned yet, we return the element containing the _Loading..._ text.

Once the data has been fetched, we set data equal to the data that has been fetched. Since data is no longer null, we can display the element that we passed to the HOC.

```javascript
export default withLoader(
  DogImages,
  "https://dog.ceo/api/bread/labrador/images/random/6"
);
```

Since the _withLoader_ returned the element with an extra data prop, _DogImages_ in this case, we can access the data prop in the DogImages component.

```javascript
import React from "react";
import withLoader from "./withLoader";

function DogImages(props) {
  return props.data.message.map((dog, index) => {
    <img src={dog} alt="Dog" key={index} />;
  });
}

export default withLoader(DogImages, "http://dog.ceo/api/bread/random/6");
```

We now see a _Loading_ screen while the data is being fetched.

The HOC pattern allows us to provide the same logic to multiple components, while keeping all the logic in one single place.

The _withLoader_ HOC doesn't care about the component or url it receives: as long as it's valid component and a valid API endpoint, it'll simply pass the data from that API endpoint to the component that we pass.

## Composing

We can also compose multiple Higher Order Components. Let's say that we also want to add functionality that shows a _Hovering_ the box when the user hovers the _DogImages_ list.

We need to create a HOC that provides a hovering prop to the element that we pass. Bassed on that prop, we can conditionally render the text box based on whether the user is hovering the _DogImages_.

```javascript
import withLoader from './withLoader';
import withHover from './withHover';

function DogImages(props){
  return(
    <div {..props}>
      {props.hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  )
}

export default withHover(
  withLoader(
    DogImages,
    'http://dog.ceo/api/bread/labrador/ramdom/6'
  )
)

```

We can now wrap the _withHover_ around _withLoader_.

_A well-known library used for composing HOCs is recompose. Since HOCs can largely be replaced by Hooks, the recompose library is no longer maintained, thus won't be covered in this article._

## Hooks

In some cases, we can replace the HOC pattern with React Hooks.

Let's replace the _withHover_ with a _useHover_ hook. Instead of having a HOC, we export a hook that adds a _mouseOver_ and _mouseLeave_ event listener to the element.

We cannot pass the element anymore like we did with the HOC. Instead, we'll return a ref from the hook for that should get the _mouseOver_ and _mouseLeave_ events.

```javascript
import { useState, useRef, useEffect } from "react";

export function useHover() {
  const [hovering, setHover] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, hovering];
}
```

The _useEffect_ hook adds an event listener to the component, and sets the value hovering to true or false, depending on whether the user is currently hovering over the element. Both the _ref_ and _hovering_ values need to be returned from the hook: _ref_ to add a ref to the component that should receive the _mouseOver_ and _mouseLeave_ events, and hovering in order to be able to conditionally render the Hovering!

We can use the _useHover_ hook right inside the _DogImages_ component.

```javascript
import useHover from "./useHover";
import withLoader from "./withLoader";

function DogImages(props) {
  const [hoverRef, hovering] = useHover();

  return (
    <div ref={hoverRef} {...props}>
      {hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt={Dog} key={index} />
        ))}
      </div>
    </div>
  );
}

export default withLoader(DogImages, "http://dog.ceo/api/labrador/random/6");
```

Instead of wrapping the DogImages component with the _withHover_ component, we can simply use the _useHover_ hook within the component directly.

Generally speaking, hooks don't replace the HOC pattern. As the React docs tells us, using Hooks can reduce the depth of the component tree. Using the HOC pattern, it's easy to end up with a deeply nested component tree.

By adding a hook to the component directly, we no longer have to wrap components, while keeping that logic all in one single place.

Hooks allows us to add custom behaviour from within the component, which could potentially increase the risk of introducing bugs compared to the HOC pattern if multiple components rely on this behaviour.

# Flyweight Pattern

Reuse existing intances when working with identical objects.

The flyweight pattern is a useful way to conserve memory when we're creating a large number of simliar objects.

In our application, we want users to be able to add books. All books have a title, an author, and an isbn number! However, a library usually doesn't have just one copy of a book: it usually has multiple copies of the same book.

It wouldn't be very useful to create a new book instance each time if there are multiple copies of the exact same book. Instead, we want to create multiple instances of the Book constructor, that represent a single book.

```js
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
```

Let's create the functionality to add new books to the list. If a book has the same ISBM number, thus is the exact same book type, we don't want to create an entirely new Book instance. Instead, we would should first check whether this book already exists.

```js
const books = new Map();

const createBook = (title, author, isbn) => {
  const existingBook = books.has(isbn);

  if (existingBook) return books.get(isbn);

  const book = new Book(title, author, isbn);
  book.set(isbn, book);

  return book;
};
```

The _createBook_ function helps us create new instances of ne type of book.

However, a library usually contains multiple copies of the same book! Let's create a _addBook_ function, which allows us to add multiple copies of the same book. It should invoke the _createBook_ function, which returns either a newly created Book instance, or returns the already existing instance.

In order to keep track of the total amount of copies, let's create a _bookList_ array that contains the total amount of books in the library.

```js
const bookList = [];

const addBook = (title, author, isbn, availability, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn,
  };

  bookList.push(book);
  return book;
};
```

Instead of creating a new Book instance each time we add a copy, we can effectively use the already existing Book instance for that particular copy.

```js
addBook("HarryPotter", "JK Rowling", "AB123", false, 100);
addBook("HarryPotter", "JK Rowling", "AB123", true, 50);

addBook("To Kill", "HarperLee", "CD345", true, 10);
addBook("To Kill", "HarperLee", "CD345", false, 30);

addBook("The Great Gatsby", "Scott", "EF567", false, 20);
```

Although there are 5 copies, we only have 3 Books instances

# Factory Pattern

Use a factory function in order to create objects

With the factory pattern we can use factory functions in order to create new objects. A function is factory function when it returns a new object without the use f the new keyword!

Say that we need many users for our application. We can create new users with a _firstName_, _lastName_, and _emailProperty_. The factory function adds a _fullName_ property to the newly created object as well, which returns the _firstName_ and the _lastName_.

```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});
```

We can now create multiple users by invoking the _createUser function_

# Compound Pattern

Crate multiple components that work together to perform a single task.

In our application, we often have components that belong to each other. They're dependent on each through the shared state, and share logic together. Yout often see this with components like select, dropdown, components or menu items.

The compound component pattern allows you to create components that all work together to perform a task.

## Context API

We have a list of squirrel images, besides just showing squirrel images, we want to add a button that makes it possible for the user to edit or delete the image. We can implement a _FlyOut_ component that shows a list when the user toggles the component.

We essentially have three things:

- The _FlyOut_ wrapper, which contains the toggle button and list.

- The _Toggle_ button, which toggles the list.

- The _List_ which contains the list of menu items.

Using the Compound Pattern with React Context API is perfect.

```js
const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  const providerValue = { open, toggle };

  return (
    <FlyOutContext.Provider value={providerValue}>
      {props.children}
    </FlyOutContext.Provider>
  );
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    <div onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

FlyOut.Toggle = Toggle;
```

In order to actually give _Toggle_ access to the _FlyOutContext_ provider, we need to render it as child component of _FlyOut_.

We could just simply render this as a child component. However we can also make the _Toggle_ component a property of the _FlyOut_ component!

```js
FlyOut.Toggle = Toggle;
```

# Rendering

Before we talk about drawbakcs, let us understand how we could mesure the performance of rendering mechanism.

- A large js could increase how long page takes to reach FCP and LCP. The user will be required to wait for some time to go from a mostly blank page

The available frameworks and libraries can be used to implement different rendering patterns like _Client-Side Rendering_, _Static Rendering_, _Hydration_, _Progressive Rendering_ and _Server-Side Rendering_. It is important to understand the implications of each of these patterns before we can decide which is best suited for our applications.

## A brief history of web rendering

Web technologies have been continuously evolving to support changing application requirements. The building blocks for all websites HTML, CSS and Js have also evolve over time to support changing requirements and utilize browser advancements.

In the early 2000's we had sites where HTML content was render completely by the server. Developers relied on _server-side_ scripting languages like PHP and ASP to render HTML. Page reloads were required for all key navigations and javascript was used by clients minimally to hide/show or enable/disable HTML elements.

In 2006, Ajax introduced the possiblilty os _Single-Page Applications (SPA)_, Gmail being the most popular example.

Ajax allowed developers to make dynamic requests to the server without landing a new page. Thus, SPAs could be built to resemble desktop applications. Soon developers started using Js to fetch and render data. Js libraries and frameworks were created that could be used to build the view layer functionality in the MVC framework. _Client-Side framework_ like jQuery, Backbone.js and Angularjs made it easier for developers to build core features using js.

React was introduced in 2013 as a flexible framework for building user interfaces UI components and provided a base for developing both single-page web and mobile applications.

From 2015 to 2020 the React ecosystems has evolved to include supporting data-flow architecture libraries (Redux), Css frameworks (React-Boostrap), routing libraries and mobile application frameworks (React Native).

However, there are some drawbakcs of a pure Client-Side rendering. As a result, developers have started exploring new ways to get the best of both the Client-Side and Server-Side rendering worlds.

## Rendering - Key Performance Indicators.

Before we talk about drawbakcs, let us understand how we could mesure the performance of rendering mechanism.

A basic understanding of the following terms will helps us to compare the different patterns discussed here.

- TTFB. Time to First Byte: the time between clicking a link and the first bit of content comming in.

- FP. First Paint: First time any content becomes visible to the user or the time when the first few pixels are painted on the screen.

- FCP. Fist Contentful Paint: Time when all the requested content becomes visible.

- LCP. Largest Content Paint: Time when the main page content becomes visible. This refers to the largest image or text block visible within the viewport.

- TTI. Time to Interactive: Time when the page becomes interactive. E.g. events are wired up, etc.

- TBT. Total Blocking Time: The total amount of time between FCP and TTI.

Some important notes about these performance parameters are as follows.

- A large js could increase how long page takes to reach FCP and LCP. The user will be required to wait for some time to go from a mostly blank page to a page with content loaded.

- Larger js bundles also affect TTI and TBT as the page can only become interactive once the minimal required js is loaded and events are wired.

- The time required for the first byte content to reach the browser (TTFB) is dependent on time taken by the server to process the request.

- Techniques such as preload, prefetch and script attributes can affect the above parameters as different browsers interpet them differently. It is helpful to understand the loading and execution priorities assigned by the browser for such attributes before using them.

## Patterns - A Quick Look

_Client-Side Rendering (CSR)_ and _Server-Side Rendering (SSR)_ from the two extremes of the spectrum of choices available for rendering. The other patterns listed in the following illustration use different approaches to provide some combination of features borrowed from both _CSR_ and _SSR_.

### Server Rendering

- Overview: An application where input is navigation requests and the outputs is HTML response on them.

- Authoring: Entirely server-side.

- Rendering: Dynamic HTML.

- Sever Role: Controls all aspects.

- Pros: TTI = FCP. Full Streaming.

- Cons: Slow TTFB. Inflexible.

- Scales via: Infra size / cost.

- Examples: Gmail HTML, Hacker News.

### Static SSR

- Overview: Built as a Single Page App, but all pages pretended to static HTML as a build step, and then js is removed.

- Authoring: Built as if client-side.

- Rendering: Static HTML.

- Sever Role: Delivers static HTML.

- Pros: Fast TTFB. TTI = FCP.

- Cons: Inflexible. Leads to hydration.

- Scales via: build/deploy size.

- Examples: Docusaurus, Netflix.

### SSR with Re(hydration)

- Overview: Build as a Single Page App. The server prerenders pages, but the full app is also booted on the client.

- Authoring: Built as client-side.

- Rendering: Dynamic HTML and js/dom.

- Sever Role: Renders pages (navigation requests).

- Pros: Flexible.

- Cons: Slow TTFB. TTI >>> FCP. Usually buffered.

- Scales via: Infra size && js size.

- Examples: Nextjs, Razzle.

### CSR with Prerendering

- Overview: A Single Page App, where the initial shell/skeleton is prerendered to static HTML at build time.

- Authoring: Client-Side.

- Rendering: Partial static HTML then js/dom.

- Sever Role: Delivers static HTML.

- Pros: Flexible. Fast TTFB.

- Cons: TTI > FCP. Limited streaming.

- Scales via: js size.

- Examples: Gatsby, Vuepress.

### Full CSR.

- Overview: A Single Page App. All logic, rendering and booting is done on the client. HTML is essentially just script and style tags.

- Authoring: Client-Side.

- Rendering: Entirely js/dom.

- Sever Role: Delivers static html.

- Pros: Flexible. Fast TTFB.

- Cons: TTI >>> FCP. No streaming.

- Scales via: js size.

- Examples: Most Apps.

We will explore each of these patterns in detail. Before that, however, let us talk about NextJs which is a React-based framework. Nextjs is relevant to our discussio because it can be used to implement all of the following patterns.

- SSR.

- Static SSR (experimental flag).

- SSR with Rehydration.

- CSR with Prerendering also known as Automatic Static Optimization.

- Full CSR.

```

 Server-Side   -   SSR With    -   Static    -   Clien-Side
  rendering        hydration   -  rendering  -   rendering

```

Depending on the type of the application or the page type, some of the patterns may be more suitable than the others.

# Overview of Nextjs

Vercel's framework for hybrid Rect applications.

It is often difficult to understand all the different ways you might load content. NextJs abstracts this to make it as easy as possible.

## Basic Features

### Pre-rendering

By default, NextJs generates the HTML for each page in advance and not on the client-side. This process is called _pre-rendering_. NextJs ensures that js code required to make the page fully interactive gets associated with generated HTML. This js code runs once the page loads.

At this point, Reactjs works in a shadow DOM to ensure that the rendered content matches with what the React application would render without actually manipulating it. This process is called **hydration**.

Each page is a React component exported from `.js, .jsx, .ts, or .tsx` file in the pages directory. The route is determined based on the file named `pages/about.js` corresponds to `/about`.

Nextjs supports pre-rendering through both _Server-Side rendering_ and _Static Generation_. You can also mix different renderings methods in the same app where some pages are generated using _SSR and others using Static Generation_.

_Client-Side_ rendering may also be used to render certain sections of these pages.

### Data Fetching

Nextjs supports data fetching with both _SSR_ and _Static Generation_.

NextJs functions:

- _getStaticProps_: Used with static generation to render data.

- _getStaticPaths_: Used with static generation to render dynamic routes.

- _getServerSideProps_: Applicable to SSR.

### Static File Serving

Static files like images can be served under a folder called `public` in the root directory. The same image may the be refered in the `<img>` tag code on diferent pages using the root url `src=/logo.png`

### Automatic Image Optimization

Allows for resizing, optimizing, and serving images in modern formats when the browser supports it. Thus, larger images are resized for smaller viewports when required.

This functionality is implemented by importing the Nextjs _Image_ component which is an extension of the HTML `<img>`.

```js
import Image from "next/Image";

<Image src="/logo.png" alt="logo" width={300} height={300} />;
```

### Routing

Supports routing through the `pages` directory.

Also supports the creation of _dynamic routes_ using named parameters where the actual document displayed is determined by the value of the parameter.

For example, a page `pages/products/[pid].js` will get matched to routes like `post/1` with `pid=1` as one of the query parameters.

### Code Splitting

Code splitting ensures that only the required js is sent to the client which helps to improve performance. Nextjs supports two types of code splitting.

- Route-based. This is implemented by default in Nextjs. When a user visits a route, Nextjs only sends the code needed for the initial route. The other chunks are downloaded as required when the user navigates around the application. This limits the amount of code that needs to be parsed and compiled at once thereby improving the page load times.

- Component-based. This type of code splitting allows splitting large components into separate chunks that can be lazy-load when required. Nextjs supports component based code splitting through **dynamic import**. This allows you to import js modules dynamically and load each import as a separate chunk.

#Client-side Rendering

Render our application's UI on the client.

In Client-Side Rendering (CSR) only the barebones HTML container for a page is rendered by the server.

The logic, data fetching, templating and routing required to display content on the page is handled by js code that executes in the browser/client.

CSR became popular as method of building single-page applications. It helped to blur the difference between websites and installed applications.

To better appreciate the benefits provided by other patterns, let us first take a deeper look at Client-Side Rendering (CSR) and find out which are the situations where it works great and what are its drawbacks.

Consider this simple example for showing and updating the current time on page using React.

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world</h1>
      <h2>It is {new Date().toLocalTimeString()}</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById("root"));
}
setInterval(tick, 1000);
```

The HTML consists of just a single root `div` tag. Content display and updates on the other hand are handled completely in js. There is no round trip to the server and rendered HTML is updated in-place.

Here time could be replaced by any other real-time information like exchange rates or stock prices obtained from an API and displayed without refreshing the page or a round trip to the server.

### JavaScript bundles and Performance

As the complexity of the page increases to show images, display data from a data store and include event handling, the complexity and size of the js code required to render the page also will increase.

CSR resulted in large js bundles which increased the FCP and TTI of the page.

```js
        |-- GET / --|
                  |-- GET /bundle.js --|
Network
----------------------------------------------------------
JavaScript
                                       |-- render (app) --|
```

As shown in the above illustration, as the size of `bundle.js` increases, the FCP and TTI are pushed forwar. This implies that the user will see a blank screen for the entire duration between FP and FCP.

## Client-side React - Pros and Cons

With React most of the application logic is executed on the client and it interacts with the server through API calls to fetch or save data. Almost all of the UI is thus generated on the client. The entire web application is loaded on the first request. As the user navigates by clicking on links, no new request is generated to the server for rendering the pages. The code runs on the client to change the view/data.

CSR allows us to have a Single-Page Application that supports navigation without page refresh and provides a great user experience. As the data processed to change the view is limited, routing between is generally faster making the CSR application seem more responsive.

CSR also allows developers to achieve a clear separation between client and server code. Despite the great interactive experience that it provides, there are a few pitfalls to this CSR.

- 1.**SEO considerations**. Most web crawlers can interpret server rendered websites in a staright-forward manner. Things get slightly complicated in the case of clien-side rendering as large payloads and a waterfall of network requests (e.g for API responses) may result in a meaningful content not being rendered fast enough for a crawler to index it. Crawlers may understand js but there are limitations. As such, some workarounds are required to make a client-rendered website SEO friendly.

- 2. **Performance**. With client-side, the response time during interactions is greatly improved as there is no round trip to the server. However, for browsers to render content on clien-side the first time, they have to wait for the js to load first and start processing. Thus users will experience some lag before the initial page loads. This may affect the user experience as the size of js bundles gets bigger and/or the client does not have sufficient processing power.

- 3. **Code Maintainability**. Some elements of code may get repeated across client and server (APIs) in different languages. In other cases, clean separation of bussiness logic may not be possible. Examples of this could include validations and formatting logic for currency and date fields.

- 4. **Data Fetching**. With client-side rendering, data fetching is usually event-driven. The page could initially be loaded without any data. Data may be subsequently fetched on the occurrence of events like page-load or button clicks using API calls. Depending on the size of data this could add to the load/interaction time of the application.

The importance of these considerations may be different across applications. Developers are often interested in finding SEO friendly solutions that can serve pages faster without compromising on the interaction time. Priorities assigned to the different performance criteria may be different based on application requirements. Sometimes it may be enough to use client-side rendering with some tweaks of going for a completely different pattern.

### Improving CSR performance

Since performance for CSR is inversely proportional to the size of the js bundle, the best thing we can do is structure our js code for optimal performance. Following is a list of pointers that could help.

- 1. **Budgeting js**. Ensure that you have a reasonably tight js budget for your initial page loads. An initial of < 100-170 Kb minified and gzipped is a good starting point. Code can then be loaded on-demand as features are needed.

- 2. **Preloading**. This technique can be used to preload critical resources that would be required by the page, earlier in the page lifecycle. Critical resources may include js which can be preloaded by including the following directive in the `head` section of the HTML.

```js
<link rel="preload" as="script" href="critical.js" />
```

This informs the browser to start loading the _critical.js_ file before the page rendering mechanism starts. The script will be available earlier and will not block the page rendering mechanism thereby improving the performance.

- 3. **Lazy Loading**. With lazy loading, you can identify resources that are non-critical and load these only when needed. Initial page load times can be improved using this approach as the size of resources loaded initially is reduced. For example, a chat widget component would generally not be needed immediately on page load and can be lazy loaded.

- 4. **Code Splitting**. To avoid a large bundle of js code, you could start splitting your bundles. Code-splitting is supported by bundlers like webpack where it can be used to create multiple bundles that can be dynamically loaded at runtime. Code splitting also enables you to lazy load js resources.

- 5. **Application shell caching with service workers**. This technique involves caching the application shell which is the minimal HTML, CSS and js powering a user interface. Service workers can be used to cache the application shell offline. This can be useful in providing a native single-page app experience where the remaining content is loaded progressively as needed.

With these techniques, CSR can help to provide a faster Single-Page Application experience with a decent FCP and TTI. Next we will se what is available at the other end of the spectrum with Server-Side Rendering.

# Server-Side Rendering

Generate HTML to be rendered on the server in response to a user request.

Server-Side Rendering (SSR) is one of the oldest methods of rendering web content. SSR generates the full HTML for the page content to be rendered in response to a user request. The content may include data from a datastore or external API.

The content and fetch operations are handled on the server. HTML required to format the content is also generated on the server. Thus, with SSR we can avoid making additional round trips for data fetching and templating. As such, rendering code is not required on the client and the js corresponding to this need not be sent to the client.

With SSR every request is treated independently and will be processed as a new request by the server. Even if the output of two consecutive request is not very different, the server will process and generate it from scratch. Since the server is common to multiple users, the processing capability is shared by all active users at a given time.

## Classic SSR Implementation

Let us see how you would create a page for displaying the current time using classic SSR and js.

```js
//index.html

<html>
  ...
  <body>
    <h1>It is <div id=currentTime></div></h1>
  </body>
</html>
```

```js
//index.js

function tick() {
  var d = new Date();
  var n = d.toLocalTimeString();
  document.getElementById("currentTime").innerHTML = n;
}
```

Note how this is different from the CSR code that provides the same output. Also note that, while the HTML is rendered by the server, the time displayed here is the local time on the client as populated by the js function `tick()`. If you want to display any other data that is server specific, e.g. server time, you will need to embed it in the HTML before it is rendered. This means it will not get refreshed automatically without a round trip to the server.

## SSR - Pros and Cons

Executing the rendering code on the server and reducing js offers the following advantges.

- 1. **Lesser js leads to quicker FCP and TTI**. In cases where there are multiple UI elements and applications logic on the page, SSR has considerably less js when compared to CSR. The time required to load and process the script is thus lesser. FP, FCP and TTI are shorter and FCP = TTI. With SSR, users will not be left waiting for all the screen elements to appear and for it to become interactive.

```js
          |-- GET/top/1 --|
network
-------------------------------------------
js                       |FCP| |TTI|
                          SSR    js
```

- 2. **Provides additional budget for client-side js**

Developments teams are required to work with a js budget that limits the amount of js on the page to achieve the desired performance. With SSR, since you are directly eliminating the js required to render the page, it creates additional space for any third party js that may be required by the application.

- 3. **SEO Enabled**. Search engine crawlers are easily able to crawl the content of an SSR application thus ensuring higher search engine optimization on the page. SSR works great for static content due to the above advantages. However, it does have a few disadvantages because os which it is not perfect for all scenarios.

- 4. **Slow TTFB**. Since all processing takes place on the server, the response from the server may be delayed in case of one or more of the following scenarios:

  - Multiple simultaneous users causing excess load on the server.
  - Slow network.
  - Server code not optimized.

- 5. **Full Page reloads required for some interactions**. Since all code is not available on the client, frequent round trips to the server are required for all key operations causing full page reloads. This could increase the time between interactions as users are required to wait longer between operations. A single-page applications is thus not possible with SSR.

To address these drawbacks, modern frameworks and libraries allow rendering on both server and client for the same application. We will go into details of these in the following sections. First, let's look at a simpler form of SSR with Nextjs.

### SSR with Nextjs

The Nextjs framework also supports SSR. This pre-renders a page on the server on every request. It can be accomplished by exporting an async function called _getServerSideProps()_ from a page as follows.

```js
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
```

The context object contains keys for HTTP request and response objects, routing parameters, querystring, locale, etc.

### React for the Server

React can be rendered isomorphically, which means that it can function both on the browser as well as other platforms like the server. Thus, UI elements may be rendered on the server using React.

React can also be used with universal code which allow the same code to run in multiple environments. This is made by using Nodejs on the server or what is known as a Nodejs server. Thus, universal js may be used to fetch data on the server and then render it using isomorphic React.

Let us take a look at the react functions that make this possible.

```js
ReactDOMServer.renderToString(element);
```

This function returns HTML string corresponding to the React element. The HTML can then be rendered to the client for a faster page load.

The _renderToString()_ function may be used with _ReactDOM.hydrate()_. This will ensure that the rendered HTML is preserved as-is on the client and only the event handdlers attached after load.

To implement this, we use `a.js` file on both client and server corresponding to every page. The `.js` file on the server will render HTML content, and the `.js` file on the client will hydrate it.

Assume you have a React element called App which consists the HTML to be rendered defined in the universal `app.js`. Both the server and client-side React can recognize the App element.

The `ipage.js` file on the server can have the code:

```js
app.get(`/`, (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);
});
```

The constant App can now be used to generate the HTML to be rendered. The `ipage.js` on the client side will have the following to ensure that the element App is hydrated.

```js
ReactDOM.hydrate(<App />, document.getElementById("root"));
```

# Static Rendering

Deliver pre-rendered HTML content that was generated when the site was built

Based on our discussion on SSR, we know that a high request processing time on the server negatively affects the TTFB. Similarly, with CSR, a large js bundle can be detrimental to the FCP, LCP and TTI of the application due to the time taken to download and process the script.

Static Rendering or Static Generation (SSG) attemps to resolve these issues by delivering pre-rendered HTML content to the client that was generated when the site was built.

A static HMTL file is generated ahead of time corresponding to each route that the user can access. These static HTML files may be available on a server or a CDN and fetched as and when requested by the client.

Static files may also be cached thereby providing greater resiliency. Since the HMTL response is generated in advance, the processing time on the server is negligible thereby resulting in a faster TTFB and better performance. In an ideal scenario, client-side js should be minimal and static pages should become interactive soon after the response is received by the client. As a result, SSG helps to achieve a faster FCP/TTI.

```js

network   |-- GET --|
---------------------------------------------
js                  | render(app) |

                              FCP | TTI
```

## Basic structure

As the suggests, static rendering is ideal for static content, where the page need not be customized based on the logged-in user (e.g personalized recomendations). Thus static pages like 'About us', 'Contact us', Blog pages for websites or product pages for e-commerce apps, are ideal candidates for static rendering.

Frameworks like Nextjs, Gatsby, and VuePress support static generation. Let us start with this simple Nextjs example of static content rendering without any data.

```js
export default function About() {
  return (
    <div>
      <h1>About us</h1>
    </div>
  );
}
```

When the site is built, this page will be pre-rendered into a HTML file `about.html` accessible at the route `/about`.

### SSG with Data

Static content like that in `About us` or `Contact us` pages may be rendered as-is without getting data from a data-store. However, for content like individual blog pages or product pages, the data from a data-store has to be merged with specific template and then rendered to HTML at build time.

The number of HTML pages generated will depend on the number of blog posts or the number of products respectively. To get to these pages, you may also have listing pages which will be HTML pages that contain a categorized and formatted list of data items. These scenarios can be addressed using nextjs static rendering. We can generate listing pages or individual item pages based on the available items. Let us see how.

## Listing Page - All Items

Generation of a listing page is a scenario where the content to be displayed on the page depends on external data. This data will be fetched from the database at build time to construct the page. In Nextjs this can be achieved by exporting the function _getStaticProps()_ in the page component. The function is called at build time on the build server to fetch the data. The data can then be passed to the page's props to pre-render the page component.

```js
//  This function runs at build time on the build server
export async function getStaticProps() {
  return {
    props: {
      products: await getProductsFromDatabase(),
    },
  };
}

// The page component receives products prop from getStaticProps at build time
export default function Products({ products }) {
  return (
    <>
      <h1>Products</h1>
      <ul>
        {products.map((products) => (
          <li key={product.id}> {product.name} </li>
        ))}
      </ul>
    </>
  );
}
```

The function will not be included in the client-side js bundle and hence can even be used to fetch the data directly from a database.

### Individual Details Page - Per Item

In the above example, we could have an individual detailed page for each of the products listed on the listing page. These pages could be accesse by clicking on the corresponding items on the listing page or directly through some other route.

Assume we have products with ids 101, 102 and so on. We need their information to be available at routes `/products/101`, `/products/102`, etc.

To achieve this at build time in Nextjs we can use the function _getStaticPaths()_ in combitaion with dynamic routes. We need to create a common page component `products/[id].js` for this and export the function _getStaticPaths()_ in it. The function will return all possible products ids which can be used to pre-render individual product pages at build time. The following Nextjs skeleton available here shows how to structure the code for this.

```js
//  In getStaticPaths(), you need to return the list of
//  ids of product pages (/products/[id]) that you'd
//  like to pre-render at build time. To do so,
//  you can fetch all products from a database

export async function getStaticPaths() {
  const products = await getProductsFromDatabase();

  const paths = products.map((products) => ({
    {
      params: {
        id: product.id;
      }
    }
  }));
  return {paths, fallback: false}
}

export async function getStaticProps({params}){
  return{
    props:{
      product: await getProductFromDatabase(params.id)
    }
  }
}

export default function Product({product}){
  // Render product
}
```

The details on the product page may be populated at build time by using the function _getStaticProps_ for the specific product id.

Note the use of the fallback: false indicator here. It means that if the page is not available corresponding to a specific route or product id, the 404 error page will be shown.
Thus we can use SSG to pre-render many different types of pages.

## Key Considerations

As discussed, SSG results in a great performance for websites as its cuts down the processing required both on the client and the server. The sites are also SEO friendly as the content is already there and be rendered by web crawlers with no extra effort. While performing and SEO make SSG a great rendering pattern, the following factors need to be considered when assessing the suitability of SSG for specific applications.

- 1. **A large number of HTML files**. Individual HTML files need to be generated for every possible route that the user may access. For example, when using it for a blog, an HTML file will be generated for every blog post available in the data store. Subsequently, edits to any of the posts will require a rebuild for the update to be reflected in the static HTML files. Maintaining a large number of HTML files can be challenging.

- 2. **Hosting Dependency**. For an SSG site to be super-fast and respond quickly, the hosting platform used to store and serve the HTML files should also be good. Superlative perfomance is possible if a well-tunned SSG website is hosted right on multiple CDNs to take advantage of edge-caching.
- 3. **Dynamic Content**. An SSG site needs to be built and re-deployed every time the content changes. The content displayed may be stale if the sites has not been built + deployed after any content change. This makes SSG unsuitable for highly dynamic content.

# Incremental Static Generation

Update static content after your have built your site.

Static Generation (SSG) addresses most of concerns of SSR and CSR but is suitable for rendering mostly static content. It poses limitations when the content to be rendered is dynamic or changing frequently.

Think of a growing blog with multiple posts. You wouldn't possibly want to rebuild and replaced the site just because you want to correct a type in one of the posts.

Similarly, one new blog post should also not require a rebuild for all the existing pages. Thus, SSG on its own is not enough for rendering large websites or applications.

The incremental Static Generation (iSSG) pattern was introduced as an upgrade to SSG, to help solve the dynamic data problem and help static sites scale for large amounts of frequently changing data. iSSG allows you to update existing pages and add new ones by pre-rendering a subset of pages in the background even while fresh requests for pages are comming in.

## Sample Code

iSSG works on two fronts to incrementally introduce updates to an existing static site after it has been built.

1. Allows addition of new pages.
2. Allows updates to existing pages also known as Incremental Static Regeneration.

## Adding new pages

The lazy loading concept is used to include new pages on the website after the build. This means that the new page is generated immediately on the first request. While the generation takes place, a fallback page or a loading indicator can be shown to the user on the front-end.

Compare this to the SSG scenario discussed earlier for individual details page per product. The 404 error page was shown here as a fallback for non-existent pages.

Let us now look at the Nextjs code require for lazy-loading the non-existent page with iSSG.

```js
// In getStaticPaths(), you need to return the list of
// ids of product pages (/products/[id]) that you'd
// like to pre-render at build time. To do so,
// you can fetch all products from a database

export async function getStaticPaths() {
  const products = await getProductsFromDatabase();

  const path = products.map((product) => ({
    params: { id: product.id },
  }));

  // fallback: true means that the missing pages
  // will not 404, and instead can render a fallback
  return { paths, fallback: true };
}

//params will contain the id for each generated page
export async function getStaticProps({ params }) {
  return {
    props: {
      product: await getProductFromDatabase(params.id),
    },
  };
}

export default function Product({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading ... </div>;
  }

  // Render product
}
```

Here, we have used _fallback: true_. Now if the page corresponding to a specific product is unavailable, we show a fallback version of the page, eg. a **loading** indicator as shown in the Product function above.

Meanwhile, Nextjs will generate the page in the background. Once it is generated, it will be cached and shown instead of the fallback page. The cached version of the page will now be shown to any subsequent visitor immediately upon request. For both new and existing pages, we can set an expiration time for when Nextjs should revalidate and update it.

This can be achieved by using the revalidate property as shown in the following section.

## Update existing pages

To re-render an existing page, a suitable timeout is defined for the page. This will ensure that the page is revalidate whenever the defined timeout period has elapsed. The timeout could be set to as low as 1 second. The user will continue to see the previous version of the page, till the page has finished revalidation.

Thus, iSSG uses the stale-while-revalidate strategy where the user receives the cached or stale version while the revalidation takes place. The revalidation takes place completely in the background without the need for a full rebuild.

Let us go back to the example for generating a static listing page for products based on the data in the database. To make it serve a relatively dynamic list of products, we will include the code to set the timeout for rebuilding the page. This is what the code will look like after including the timeout.

```js
// This function runs at build time on the build server
export async function getStaticProps() {
  return {
    props: {
      products: await getProductsFromDatabase(),
      revalidate: 60, // This will force the page to revalidate after 60 seconds
    },
  };
}
```
