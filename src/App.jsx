import { useEffect, useState } from 'react'
import './App.css'
import reposicao from '../reposicao.json';
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
      const request = await axios.get('https://patrickwarley.github.io/reposicao.json');
      setLists(request.data.lists);
      setShowList(request.data.lists[0]);
      setCategories(request.data.categories);

      console.log(request.data)

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
  }, [currList]);

  useEffect(() => {
    filter();
  }, [selectedCategory]);

  const proximaLista = () => {
    //increment list
    let nextList = currList + 1;
    if (nextList <= lists.length - 1)
      return setCurrList(nextList);
    setCurrList(0);
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

    //if selectedCategory is null just reset the listcenter
    if (selectedCategory === null) return setShowList(lists[currList]);

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
        <button onClick={proximaLista} className=' p-3 m-3 bg-green-400 border drop-shadow'>Proxima lista</button>
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
