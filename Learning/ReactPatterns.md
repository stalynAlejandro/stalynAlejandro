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


