# Forms folder structure

The operational structure of this application relies mainly in two properties: _event type_ and _product type_.

The different values that they can have - in the frontend application - can be found in the following files:

- [Product types](/src/enums/productTypes.ts)
- [Event types](/src/enums/eventTypes.ts)

:warning: Its important to understand that each event type has its own workflow. So an _Advance Modification_ is not a _Modification_ operation inside an _Advance_ event, but an _Advance Modification_ event on its own, and can have its own operations.

**For example:** an _Advance Modification_ can have a _Create_ operation to create a new item of this kind, or a _Cancel_ operation to try to cancel an _Advance Modification_ item.

## Operation forms

For each product and event type there can be multiple operations to be made, **each one with its own form** and validation rules.

Operation types are **not limited**, but they should try to be **homogeneous**. This means that not all products and events have to share the same kind of forms, but if they do they will have to **respect the naming**.

**For example:** both _Advance_ and _Request_ events inside _CLE_ product have a _Create_ operation. It is not called _Create_ in one event and _New_ in another. Both share the same naming, as the aim and view of the operation is the same.

In the case of the example, the folder name would be **CreateForm**.

## From generic to specific

The most generic classification will be by **product type**, followed by the **event type** and, finally, the type of the operation. The structure will look like the following:

- forms/
  - [productName]/
    - [eventName]/
      - [_OperationName_]**Form**/
        - steps/
        - [_OperationName_]**Form**.tsx
        - ...

_Product_ and _event_ folders will be named following **camelCase** naming.

_Operations_ folders will be named in **PascalCase**, as they will contain a _React component_, and **will end with the word _Form_**.

**For example:** for a _Create_ operation of an _Advance Modification_ event inside a _CLE_ product, the naming of the form folder would be _**cle/advanceModification/CreateForm/**_.

## Common components and types

There will be cases in which multiple forms share the same step behaviour or the same types.

In these cases, that code will be **isolated to avoid duplication** and will be located **in the _forms/common_ folder**, grouped by their _category_.

If it's a common step, it will be located under the _steps_ folder; if it's a Typescript type, it'll be located under the _types_ folder.

For other common utils, methods..., they should be located in the dedicated folder inside _src_ for this kind of code: _helpers_, _hooks_ and _utils_.

As for now, _Client_, _Documentation_ (or _DocumentationWithPriceLetter_) and _Confirm_ are all common steps and must be reused whenever possible.

_**TODO:** it is intended to create a HOC component to allocate all the common logic of the main Form components, as most of the methods (`nextStep`, `goBackPage`, `updateFormData`...) are common in all forms._

# Creating new forms

If we wanted to create a new form, generally we would use some of the already created ones and we would duplicate it. However, there are some things that we must ensure they are done this process:

- [ ] Create new data TS types
- [ ] Add new API URLs
- [ ] Add needed mappers
- [ ] Duplicate an already existing form
  - [ ] Adapt the specific steps of the new form
  - [ ] Check the type of _Documentation_ step
  - [ ] Adapt the fetched endpoints to the new operation
  - [ ] Use the newly created mappers
- [ ] Add translations for the form
- [ ] Add mocked data and testing
- [ ] Add routes and navigation to the form

_**TODO:** Create template files and add script to automatically create the new form._

## Data TS types

We can find the TS types for every product and event inside the [src/api/types](/src/api/types) folder. As the rest of the project, its folders are structured by product and event.

We will find three _.ts_ files, although they can be more depending on the needs of every event:

- **CompleteInformationFormDataDto**: type used in the _CompleteInformationForm_.
- **CreateApiDataDto**: type with the data structure coming from the backend service.
- **CreateFormDataDto**: type used in the _CreateForm_.

Generally speaking, the most important file is the _CreateFormDataDto_ as there's always a _create_ operation for every event.

The rest of the types tend to use the same data design, as the service uses the same structure, too, so they are just _extending_ this _CreateFormDataDto_ type:

```js
export interface CreateApiDataDto extends CreateFormDataDto {}
```

However, **if the data structure returned by the service or the one used in other forms is different** from the one used in the _CreateForm_, we will have to adapt those changes.

## API URLs

Each product, event and operation have their own API service endpoints which they fetch to store and retrieve the information. All of the routes related to APIs can be found in the [apiUrls](/src/constants/apiUrls.ts) file.

When a new operation is added, we will need to add the new endpoints to this file **following the already defined structure**.

## Mappers

Every form uses, at least, a _summarizer_ and a _serializer_ and, optionally, a _deserializer_. They can be found in [src/helpers/mappers](/src/helpers/mappers) folder:

- **Summarizers**: these are functions that receive the actual form data and map it to a [SymmaryCardProps](/src/components/SummaryCard/SummaryCard.tsx) structure so that it can be shown in the _SummaryCard_ component.
- **Serializers**: are used to serialize the form data to a structure that the backend services can understand. Also, these encode the uploaded files data into _base64_ before sending it to the services.
- **Deserializers**: these are functions to map data returned by the service into local form data structure. They are rarely used, as backend services tend to use the same structure as the local form data in most of the forms.

Each of these kinds of method have their standard defined for its naming. It can be improved and it may not be the best, but **it's important that we keep consistency in the naming of each type**.

## The form and the steps in it

All forms tend to have the same structure and only differ in one of the steps. They usually have the following steps:

- Customer selection
- Specific step for that operation
- Documentation
- Review and confirm

Also, there are **two types of classification** depending on the flow:

- **With save draft**: means the form has to be able to save a draft of the current state of the form data, and also be able to retrieve and load this information from the service.
- **Without save draft**: the form does not need to retrieve any saved data from the service and therefore only works with locally introduced data, so it's simpler.

### Best methodology to date

The easiest way is to **get the already existing form that has more common fields and belongs to the same classification** with the one we want to create and **duplicate it**.

Then, we will have to **change the endpoints** used in the _CreateForm_ file to the ones pointing to the new API operations and **make sure to use in it the new types and mappers** already created for the new operation.

Check if the documentation step needs a price letter (use the common _DocumentationWithPriceLetter_ step) or not (use the common _Documentation_ step), and then **modify the specific step to add the fields for this operations to suit our needs**.

## Translations

Newly created forms should use the [useFormTranslation](/src/hooks/useFormTranslation.ts) hook. This hook uses the translations present in the [forms.json](/src/locales/es/forms.json) file, and it uses a more generic and customizable structure.

For new events and operations, we will have to add the needed translations **following the already existing object structure**.

Keep in mind that the `useFormTranslations` **looks for the translation key in each level of the provided context**. Therefore, if we want to translate the word `payment` and we set the context to `cli.request.create`, it will look for `cli.request.create.payment` translation and, if it does not exist, it will then look for `cli.request.payment`, and if it does not exist, it will look for `cli.payment`.

This means that if we want to add **a translation that is shared across multiple forms for the same operation**, we may want to set the translation value not in the specific operation context, but in a higher level.

## Form navigation and routes

All the routing in the application is managed in the [AppRoutes component](/src/containers/AppRoutes/AppRoutes.tsx), which at the same time uses the [FormRoutes function](/src/forms/FormRoutes.tsx) to manage all the routing related to the forms. These files use the [navigation](/src/constants/navigation.ts) file to get the local app endpoints that point to each form.

We will have to **add the new local app endpoints** to the _navigation_ file and, once we have created our form files, we will have to add the new form components pointing to the newly added navigation endpoints in the _FormRoutes_ file.

## Mocked data for tests

We will need to mock the data of the form to be used in the _CompleteInformationForm_ and the _CreateForm_ and also the data returned by the service response. The mock folder can be found in [src/testUtils/mocks/data](/src/testUtils/mocks/data), and it is separated by product and event for the data used in forms.

Usually, we will need to have at least a _completeInformation_ and a _formData_ data file:

- **completeInformation**: this will contain the data structure used in the _CompleteInformationForm_ with the raw response returned by the service.
- **formData**: this will contain a **valid and complete form data** for the operation, in order to use it and be able to test different steps without having to input all the data on each test.

On each test, we will have to mock using `fetchMockJest` the fetch calls to return the mocked data when needed.

## Testing

Most of the times we will need to test a few files:

- The specific step(s) file for the operation.
- The _form_ file.

For these, there are specific sections in the already created test files for the different forms. Make sure to check the right one (depending on the _save/no save draft_ feature).

The common steps (_Customer_, _Documentation_ and _Summary_) **are already tested** in their own so there's no need to re-test them.

## Final step

Finally, we will have to add the **link to the new form to allow the user to access it**. Usually, this will mean updating the `onClick` prop in one of the [main page tabs](/src/pages/NewRequests/NewRequestsTabs) to navigate to the new local endpoint and render the new form.

If the new form is not yet approved to go to production, we can use the `navigateIfDev` method so that it only works while executing it in local development environment.
