import { useState } from "react";

function Menu({ callback, categories, initialValues }) {
  const [selectedItems, setSelectedItems] = useState(initialValues);

  function removeItem(category) {
    let newItems = selectedItems.filter(item => item !== category);
    newItems.length === 0 ? setSelectedItems(null) : setSelectedItems(newItems);
  }

  function addItem(category) {
    if (selectedItems === null) return setSelectedItems([category]);

    let newItems = selectedItems.slice();
    if (newItems.indexOf(category) === -1) newItems.push(category);

    setSelectedItems(newItems);
  }

  return (
    <div>
      <div className="container flex flex-col dark:text-white">
        <button onClick={() => callback(selectedItems)} className="text-white bg-slate-800 dark:bg-white dark:text-slate-800 active:bg-green-400 p-3"> Aplicar filtros</button>
        <ul>
          {
            categories.map(category =>
              <li key={category} className="m-2"><a onClick={() => addItem(category)} className="block p-3 hover:text-white hover:bg-slate-800 dark:hover:bg-green-500 rounded">{category}</a></li>)
          }
        </ul>
        <div className="container flex flex-wrap">
          {selectedItems?.map(item => (
            <span key={item} onClick={() => removeItem(item)} className="rounded p-2 m-1 text-sm bg-green-300 text-black">{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Menu;