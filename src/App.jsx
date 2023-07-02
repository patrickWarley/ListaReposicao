import { useEffect, useState } from 'react'
import './App.css'
import List from './assets/components/List';
import OffCanvas from './assets/components/OffCanvas';
import Menu from './assets/components/Menu';
import Toggle from './assets/components/Toggle';
import axios from 'axios';


function App() {
  const [currList, setCurrList] = useState(0);
  const [lists, setLists] = useState(null);
  const [showList, setShowList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const getListsServer = async () => {
    try {
      const request = await axios.get('/reposicao.json');
      if (request.status === 200) {
        setLists(request.data.lists);
        setShowList(request.data.lists[0]);
        setCategories(request.data.categories);
      }
    } catch (e) { console.log(e); }
  }

  const getListsLocal = () => {
    setLists(reposicao.lists);
    setShowList(reposicao.lists[0]);
    setCategories(reposicao.categories);
  }

  useEffect(() => {
    getListsServer();
  }, []);

  useEffect(() => {
    filter();
  }, [currList, selectedCategory]);

  const proximaLista = (incr) => {
    let nextList = currList + incr;
    nextList === lists.length ? nextList = 0 : nextList < 0 ? nextList = lists.length - 1 : nextList;
    return setCurrList(nextList);
  }

  const orderByEndereco = () => {
    console.log("Need to implement this!");
  }

  const orderBySku = () => {
    console.log("Need to implement this!");
  }

  const filter = () => {

    if (showList === null) return;

    //if selectedCategory is null just reset the listcenter
    if (selectedCategory === null) return setShowList(lists[currList]);

    //each row is a different category
    var result = lists[currList].rows.filter(category => selectedCategory.indexOf(category[0]) !== -1);

    if (result.length !== 0) return setShowList({ "name": lists[currList].name, "rows": result });

    setShowList(lists[currList]);
  }


  return (
    <div className='min-h-screen w-screen dark:bg-slate-800 flex flex-col items-center'>
      <OffCanvas title={'Menu'}>
        <Menu
          callback={(categories) => setSelectedCategory(categories)}
          categories={categories}
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
