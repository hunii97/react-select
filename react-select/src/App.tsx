import React, { useState } from 'react';
import './App.css';
import { Category } from './types/global-types'
import MultipleLevelSelection from './components/CustomSelect/custom-select';
import { getCategoriesByParentId } from './seeds';

function App() {
  const [category, setCategory] = useState<Category>();
  return (
    <div className="App">
      <main className="App-main">
        <div className="example">
          <div className="flex flex-col flex-align-start">
            <p>Selected category: {category?.name}</p>
            <MultipleLevelSelection
              initialItems={getCategoriesByParentId(0)}
              getItemKey={(item) => item.categoryId}
              getItemLabel={(item) => item.name}
              getNestedItems={(item) =>
                getCategoriesByParentId(item.categoryId)
              }
              hasNestedItems={(_, level) => level < 3}
              isSeparator={(item) => item.categoryId == ''}
              isEqual={(item, item2) => item?.categoryId === item2?.categoryId}
              placeholder="Choose category"
              onChange={setCategory}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;