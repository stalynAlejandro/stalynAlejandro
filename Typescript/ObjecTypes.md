#Object Types

In JavaScript, the fundamental way that we group and pass around data is through objects. In *Typescript*, we represent those through *object types*.

As we've seen, they can be anonymous: 

```
function greet(person: { name: string, age: number}){
  return "Hello " + person.name;
}
```

or they can be named by using either an interface

```
interface Person{
  name: string;
  age: number;
}

function greet(person: Person){
  return "Hello " + person.name;
}
```

or type alias.

```
type Person = {
  name: string;
  age: number;
}

function greet(person: Person){
  return "Hello " + person.name;
}
```

## Property Modifiers

Each property in an object can specify a couple of things: the type, whether the property is optional, and whether the property can be written to.

### Optional Propertieso

Much of the time, we'll find ourselves a dealing with objects that might have a property set. In those cases, we can mark those properties as *optional* by adding
a question mark `(?)` to the end of their names.

```
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions){
  // ...
}

const shape = getShape();

paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

// In this example, xPos and yPos are considered optional. 
```

We can just handle `undefined` specially.

```
function paintShape(opts: PaintOptions){
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  //... 
}

```

or

```
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions){
  console.log("x coor ", xPos); 
}
// Default will be 0 if undefined
```

## ReadOnly Properties

Properties can also be marked as `readonly` for TypeScript. While it won't change any behaviour at runtime, a property marked as `readonly` can't be written to 
during type-checking.

```
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType){
  console.log("value ", obj.prop); // OK.

  obj.prop = "hello"; // ERROR.
}
  
```

Using the `readonly` modifier doesn't necessarily imiply that a value is totally immutable - or in other words, that is internal contents can't be changed. 
It just means the property itself can't be re-written to. 

```
interface Home {
  readonly resident: { name: string, age: number }; 
}

function evict( home: Home) {
  console.log("hello ", home.resident.name);
  home.resident.age++; // WE CAN READ AND UPDATE PROPERTIES FROM 'HOME.RESIDENT'

  home.resident = {...} // BUT WE CAN'T WRITE THE 'RESIDENT' PROPERTY ITSELF ON A 'HOME'
}
```
It's important to manage expectations of what `readonly` implies. It's useful to signal intent during development time for TypeScript on how an object should 
be used.  

TypeScript doesn't factor in whether properties on two types are `readonly` when checking whether those types are compatible, so `readonly` properties can also 
change via aliasing. 

```
interface Person {
  name: string;
  age: number;
}

interface ReadOnlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "Person ",
  age: 42
}

let readonlyPerson: ReadOnlyPerson = writablePerson;


console.log(readonlyPerson.age);  // 42
writablePerson.age++;

console.log(readonlyPerson.age);  // 43

```

## Index Signatures

Sometimes you don't know al the names of a type's properties ahead of time, but you do know the shape of the values.

In those cases you can use an *Index Signature* to describe the types of possible values: 

```
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];

```

While string index signatures are a powerful way to describe the "dictionary" pattern, they also enforce that all properties match their return type. 
This is because a string index declares that `obj.property` is also available as `obj["property"]`. In the following example, `name`'s type does not match the
string index's type, and gives an error.

```
interface NumberDictionary {
  [index: string]: number;
  lenght: number; // OK
  name: string;   // ERROR
}

```

However, properties of different types are acceptables if the index signature is a union of the property types:

```
interface NumberOrStringDictionary{
  [index: string]: number | string;
  length: number; // OK
  name: string;   // OK
}

```

Finally, you can make index signatures `readonly` in order to prevent assigment to their indices:

```
interface ReadOnlyStringArray{
  readonly [index: number]: string;
}

let myArray: ReadOnlyStringArray = getReadOnlyStringArray();
myArray[2] = "Mallory";

// INDEX SIGNATURE IN TYPE 'READONLYSTRINGARRAY' ONLY PERMITS READING
```
## Extending Types

It's pretty common to have types that might be more specific versions of other types. 

```
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
}

interface AddressWithUnit extends BasicAdress {
  unit: string;
}

```

The `extends` keyword on an `interface` allows us to effectively copy members from other named types, and add whatever new members we want. 

```
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

cons cc: ColorfulCircle = {
  color: "red",
  radius: 43
}
```
## Intersection Types

`interfaces` allowed us to build up new types from other types by extending them. 

TypeScript provides another construct called *intersection types* that is mainly used to combine existing object types.

An intersection type is defined using the & operator.

```
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

Here, we've intersected `Colorful` & `Circle` to produce a new type that has all the members of `Colorful` and `Circle`.

```
function draw(circle: Colorful & Circle){
  console.log("color was ", circle.color);
  console.log(circle.radius);
}
```

## Interfaces vs Intersections

We just looked at two ways to combine types which are similar, but are actually subtly different.

With *Interfaces*, we could use an `extends` clause to extend from other types, and we were able to do something 
similar with *intersections* and name the result with *type alias*. 

The principle difference between the two is how conflicts are handled, and that difference is typically one of the main
reasons why you'd pick one over the other between an *interface* and a *type alias* of an intersection type. 

## Generic Object Types

Let's imagine a `Box` type that can contain any value - `string`, `number`, whatever.

```
interface Box {
  contents: any;
}
```

Right now, the `contents` property is typed as any, which works, but can lead to accidents down the line. 

We could use `unknown`, but that would mean that in cases where we already know the type of `contents`, we'd need
to do precautionary checks, or use error-phone type assertions.

```
interfce Box {
  contents: unknown;
}

le x: Box = {
  contents: "Hello worl",
}

// WE COULD CHECK 'X.CONTENTS'
if(typeof x.contents === 'string') console.log(x.contents.toLowerCase());

// WE COULD USE A TYPE ASSERTION
console.log((x.contents as string).toLowerCase());

```

Other option is to make a *Generic Box* type which declares a type parameter.

```
interface Box<Type> {
  contents: Type;
}
```

Later on, when we refer to `Box`, we have to give a *type argument* in place of Type.

```
let box: Box<string>;
```

`Box` is reusable in that `Type` can be subsituted with anything. That means that when we 
need a box for a new type, we don't need to declare a new `Box` type at all. 

```
interface Box<Type> {
  contents: Type;
}

interface Apple {
  //..
}

// SAME AS {CONTENTS: APPLE}
type AppleBox = Box<Apple>;
```

This also means that we can avoid overload entirely by using *generic functions*

```
function setContents<Type> (box: Box<Type>, newContents: Type){
  box.contents = newContents;
}
```

It is worth noting that type aliasses can also be generic. 

```
type Box<Type> = {
  contents: Type;
}
```

Since type aliases, unlike interfaces, can describe more than just *Object types*, we can also
use them to write other kinds of generic helper types.

```
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

```


