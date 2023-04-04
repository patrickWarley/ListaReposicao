import { useEffect, useState } from 'react'
import './App.css'
import reposicao from '../reposicao.json';
import List from './assets/components/List';
import OffCanvas from './assets/components/OffCanvas';
import Menu from './assets/components/Menu';
import Toggle from './assets/components/Toggle';
function App() {
  const [currList, setCurrList] = useState(0);
  const [lists, setLists] = useState(reposicao.lists);
  const [showList, setShowList] = useState(reposicao.lists[0]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setLists(reposicao.lists);
    setShowList(reposicao.lists.slice());
  }, []);

  useEffect(() => {
    filter();
  }, [currList]);

  useEffect(() => {
    filter();
  }, [selectedCategory]);

  const proximaLista = (incr) => {
    let nextList = currList + incr;
    nextList === lists.length ? nextList = 0 : nextList < 0 ? nextList = lists.length - 1 : nextList;
    return setCurrList(nextList);
  }


  const orderByEndereco = () => {
    let result = lists[currList].rows.sort((a, b) => {
      return a.address > b.address ? 1 : a.address === b.address ? 0 : -1;
    });

    setLists({ ...lists, result })
  }

  const orderBySku = () => {
    let result = lists[currList].rows.sort((a, b) => {
      return a.sku > b.sku ? 1 : a.sku === b.sku ? 0 : -1;
    })

    setLists({ ...lists, result })
  }

  const filter = () => {

    if (showList === null) return;

    //if selectedCategory is null just reset the list
    if (selectedCategory === null) return setShowList(lists[currList]);

    var result = lists[currList].rows.filter(category => selectedCategory.indexOf(category[0]) !== -1);

    if (result.length !== 0) return setShowList({ "name": showList.name, "rows": result });

    setShowList(lists[currList]);
  }


  return (
    <div className='w-screen dark:bg-slate-800 flex flex-col items-center justify-center'>
      <OffCanvas title={'Menu'}>
        <Menu
          callback={(categories) => setSelectedCategory(categories)}
          categories={reposicao.categories}
          initialValues={selectedCategory}
        />
      </OffCanvas>
      <div className=' w-full contianer justify-end flex'>
        <Toggle />
        <button onClick={() => proximaLista(-1)} className=' p-3 m-3 bg-green-400 border drop-shadow'>Anterior</button>
        <button onClick={() => proximaLista(1)} className=' p-3 m-3 bg-green-400 border drop-shadow'>Proxima</button>
      </div>
      {
        lists !== null &&
        <div className='w-full flex flex-col items-center justify-center'>
          <h1 className='dark:text-white font-extrabold'>{showList?.name}</h1>
          {
            showList?.rows.map(category =>
              < List key={category[0]} list={category[1]} orderByEndereco={orderByEndereco} orderBySku={orderBySku} />)
          }
        </div>
      }
    </div >
  )
}

export default App
