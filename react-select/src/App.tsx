import React, { useState } from 'react';
import './App.css';
import CustomSelect from './components/CustomSelect/custom-select';

function App() {

  class CustomSelectItem {
    id!: string;
    parentId!: string;
    name!: string;
    type!: Type;
    value!: object;
  }

  class CustomSelectItemWithIcon {
    id!: string;
    parentId!: string;
    name!: string;
    type!: Type;
    value!: object;
    icon!: string;
  }

  enum Type { 'separator', 'parent', 'selectable' }

  const [item, setItem] = useState<CustomSelectItem>();
  const [item2, setItem2] = useState<CustomSelectItemWithIcon>();

  // Examples:

  // Example 1
  // Example how can we create a dataSet!
  const itemsArray = [{ id: '1', name: 'Name1', parentId: '0', type: Type.parent, value: {} },
  { id: '2', name: 'Name2', parentId: '0', type: Type.parent, value: {} },
  { id: '21', name: 'Name2', parentId: '0', type: Type.selectable, value: {} },
  { id: '29', name: 'Separator1', parentId: '0', type: Type.separator, value: {} },
  { id: '22', name: 'Name2', parentId: '0', type: Type.selectable, value: {} },
  { id: '23', name: 'Name23', parentId: '0', type: Type.selectable, value: {}, icon: "🧭" },
  { id: '24', name: 'Name43', parentId: '0', type: Type.selectable, value: {}, icon: "🧭" },
  { id: '224', name: 'Name443', parentId: '0', type: Type.selectable, value: {}, icon: "🧭" },
  { id: '241', name: 'Name43', parentId: '0', type: Type.selectable, value: {}, icon: "🧭" },
  { id: '253', name: 'Name2', parentId: '0', type: Type.selectable, value: {} },
  { id: '264', name: 'Name2', parentId: '0', type: Type.selectable, value: {} },
  { id: '3', name: 'Name3', parentId: '1', type: Type.selectable, value: {} },
  { id: '4', name: 'Name4', parentId: '1', type: Type.selectable, value: {} },
  { id: '5', name: 'Name5', parentId: '2', type: Type.parent, value: {} },
  { id: '6', name: 'Name6', parentId: '5', type: Type.selectable, value: {} },];

  const exampleItem = new CustomSelectItem();

  exampleItem.id = '7';
  exampleItem.name = 'Name12';
  exampleItem.parentId = '2';
  exampleItem.type = Type.selectable;
  exampleItem.value = {};
  itemsArray.push(exampleItem);

  const getItemsByParentId = (parentId: string | number) => itemsArray.filter((item) => item.parentId === `${parentId}`);

  const getItemsByParentIdFromArray2 = (parentId: string | number) => itemsArray2.filter((item) => item.parentId === `${parentId}`);


  // Example 1
  // Example how can we create a dataSet!
  const itemsArray2 = [{ id: '1', name: 'Name1', parentId: '0', type: Type.parent, value: {}, icon: "⨭" },
  { id: '2', name: 'Name2', parentId: '0', type: Type.parent, value: {}, icon: "⨭" },
  { id: '21', name: 'Name2', parentId: '0', type: Type.selectable, value: {}, icon: "⚡" },
  { id: '29', name: 'Separator1', parentId: '0', type: Type.separator, value: {}, icon: "⚡" },
  { id: '22', name: 'Name2', parentId: '0', type: Type.selectable, value: {}, icon: "⚡" },
  { id: '23', name: 'Name23', parentId: '0', type: Type.selectable, value: {}, icon: "🧭" },
  { id: '24', name: 'Name43', parentId: '0', type: Type.selectable, value: {}, icon: "🧭" },
  { id: '224', name: 'Name443', parentId: '0', type: Type.selectable, value: {}, icon: "🧭" },
  { id: '241', name: 'Name43', parentId: '0', type: Type.selectable, value: {}, icon: "🧭" },
  { id: '3', name: 'Name3', parentId: '1', type: Type.selectable, value: {}, icon: "🧭" },
  { id: '4', name: 'Name4', parentId: '1', type: Type.selectable, value: {}, icon: "⥺" },
  { id: '5', name: 'Name5', parentId: '2', type: Type.parent, value: {}, icon: "⨭" },
  { id: '6', name: 'Name6', parentId: '5', type: Type.selectable, value: {}, icon: "⥺" },];


  // Example of using the selects

  return (
    <div className="App">
      <div className="example">
        <div className="flex flex-col flex-align-start">
          <p>Selected item: {item?.name}</p>
          <CustomSelect
            initialItems={getItemsByParentId(0)}
            anchor={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transform={{
              vertical: 'top',
              horizontal: 'left',
            }}
            getItemKey={(item) => item.id}
            getItemLabel={(item) => item.name}
            getNestedItems={(item) =>
              getItemsByParentId(item.id)
            }
            hasNestedItems={(item) => item.type == Type.parent}
            isEqual={(item, item2) => item?.id === item2?.id}
            isSeparator={(item) => item.type == Type.separator}
            placeholder="Choose item"
            onChange={setItem}
          />
        </div>
      </div>

      <div className="example">
        <div className="flex flex-col flex-align-start">
          <p>Selected item: {item2?.icon} {item2?.name}</p>
          <CustomSelect
            initialItems={getItemsByParentIdFromArray2(0)}
            anchor={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transform={{
              vertical: 'top',
              horizontal: 'left',
            }}
            getItemKey={(item) => item.id}
            getItemLabel={(item) => item.name}
            getNestedItems={(item) =>
              getItemsByParentIdFromArray2(item.id)
            }
            getIcon={(item) => item.icon}
            hasNestedItems={(item) => item.type == Type.parent}
            isEqual={(item, item2) => item?.id === item2?.id}
            isSeparator={(item) => item.type == Type.separator}
            placeholder="Choose item"
            onChange={setItem2}
          />
        </div>
      </div>
    </div>
  );
}

export default App;