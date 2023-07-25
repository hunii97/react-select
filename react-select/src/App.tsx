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

  enum Type {'separator', 'parent', 'selectable'}

  const [item, setItem] = useState<CustomSelectItem>();

  // Example how can we create a dataSet!
  const itemsArray = [{id: '1', name: 'Name1', parentId: '0', type: Type.parent, value:{}}, 
    {id: '2', name: 'Name2', parentId: '0', type: Type.parent, value: {}}, 
    {id: '21', name: 'Name2', parentId: '0', type: Type.selectable, value: {}}, 
    {id: '29', name: 'Separator1', parentId: '0', type: Type.separator, value: {}}, 
    {id: '22', name: 'Name2', parentId: '0', type: Type.selectable, value: {}}, 
    {id: '23', name: 'Name2', parentId: '0', type: Type.selectable, value: {}}, 
    {id: '24', name: 'Name2', parentId: '0', type: Type.selectable, value: {}}, 
    {id: '3', name: 'Name3', parentId: '1', type: Type.selectable, value: {}}, 
    {id: '4', name: 'Name4', parentId: '1', type: Type.selectable, value: {}}, 
    {id: '5', name: 'Name5', parentId: '2', type: Type.parent, value: {}}, 
    {id: '6', name: 'Name6', parentId: '5', type: Type.selectable, value: {}},];
    
  const exampleItem = new CustomSelectItem();
  
  exampleItem.id = '7';
  exampleItem.name = 'Name12';
  exampleItem.parentId = '2';
  exampleItem.type = Type.selectable;
  exampleItem.value = {};
  itemsArray.push(exampleItem);
  
  const getItemsByParentId = (parentId: string | number) => itemsArray.filter((item) => item.parentId === `${parentId}`);

  // Example of using the select

  return (
    <div className="App">
      <main className="App-main">
        <div className="example">
          <div className="flex flex-col flex-align-start">
            <p>Selected item: {item?.name}</p>
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
              onChange={setItem}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;