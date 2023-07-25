# Custom Select

Reusable react component with easily changeable style and functioning.

## Features

- Multi level changes
- Selectable elements on all level
- Data can be provided as JSON or can be built from objects with using classes.
- Generic input properties for functionalities.

## Tech

- [ReactJs]
- [Eslint]
- [Material UI]

## Installation

Dillinger requires NodeJs for using.

```sh
npm install
npm start
```

## Usability

```
<CustomSelect
      initialItems={getItemsByParentId(0)}
      getItemKey={(item) => item.id}
      getItemLabel={(item) => item.name}
      getNestedItems={(item) =>
        getItemsByParentId(item.id)
      }
      hasNestedItems={(item) => item.type == Type.parent }
      isEqual={(item, item2) => item?.id === item2?.id}
      isSeparator={(item) => item.type == Type.separator}
      placeholder="Choose item"
      onChange={setItem}/>
```

### Input properties:

For making the select generic: 
    - initialItems: Items for the first level
    - getItemKey: Method, to specify the key of the item 
    - getItemLabel: Method, to specify the label of the item 
    - getNestedItems: The way how the select will get the nested items of a specific one 
    - hasNestedItem: The way how the select can decide if an item is a parent item or not 
    - isEqual: The way how the select can decide if an item is a parent item or not 
    - isSeparator: The way how the select can decide if an item is a parent item or not 
    - placeholder: The text when nothing is selected 
    - onChange: the callback function for selecting a new item

### Using

An example usecase is provided in the App.tsx file. That can be changed, the way the user would like.

### Style

The classes have their concrete, well-divided style class names, so the style can be changed easily with css.
