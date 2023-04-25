import { useEffect, useState } from "react";

const List = ({ list, orderByEndereco, orderBySku }) => {

  const [stateList, setStateList] = useState(list);

  //I need to tranform this in a statefull list
  //because I want to keep the information about the select line

  useEffect(() => setStateList(list), [list]);

  function select(evt, row) {
    let { target } = evt;
    
    row.selected = row.selected?false:true;
    
    if (target.nodeName === "SPAN") {
      target = target.parentElement;
    }

    target.parentElement.classList.toggle('bg-green-400');
    target.parentElement.classList.toggle('text-slate-900');
  }

  //I wanna save the state of the list

  return (
    <div className="container text-center bg-transparent list">
      <table className="w-full my-3 table-auto border-collapse font-bold dark:bg-slate-900 dark:text-white border-slate-800 border">
        <thead>
          <tr className="border border-slate-800">
            <th className="p-2"><a onClick={orderByEndereco}>Endereco</a></th>
            <th><a onClick={orderBySku}>Nome</a></th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {
            stateList.map((row, index) => (
              <tr onClick={(evt) => select(evt, row)} className={`${row.selected?"bg-green-400 text-slate-900":""} border border-slate-800`} key={`${row.description[0]}-${index}`}>
                <td className="p-2 align-middle">{row.address}</td>
                <td className="flex flex-col p-2 align-middle">
                  <span >{row.description[0]}</span>
                  <span>{row.description[1]}</span>
                </td>
                <td className="p-2 align-middle">{row.qtd}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}


export default List;