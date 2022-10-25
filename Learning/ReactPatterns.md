# Introduction

Design patterns are a fundamental part of software development, as they provide typical solutions to commonly recurring problems in software design.

## Overview of ReactJs

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

## Other concepts in React

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

# Proxy Pattern

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

```javacript
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

```javascript
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
