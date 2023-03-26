const List = ({ list, orderByEndereco, orderBySku }) => {

  function select(evt) {
    let { target } = evt;

    target.parentElement.classList.toggle('bg-green-400');
  }
  return (
    <div className="container text-center bg-transparent list">
      <table className="w-full my-3 table-auto border-collapse font-bold dark:bg-slate-900 dark:text-slate-500 border-slate-800 border">
        <thead>
          <tr className="border border-slate-800">
            <th className="p-2"><a onClick={orderByEndereco}>Endereco</a></th>
            <th><a onClick={orderBySku}>Nome</a></th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((row, index) => (
              <tr onClick={select} className="border border-slate-800" key={`${row.dedcription}-${index}`}>
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