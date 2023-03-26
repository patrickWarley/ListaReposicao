export default function Toggle() {

  function handleChange() {
    let root = document.getElementsByTagName('html');
    root[0].classList.toggle('dark');
  }

  return (
    <div className="flex m-3 p-3 relative space-x-2 ">
      <span className="text-xs font-extralight dark:text-white">Light </span>
      <div>
        <input type="checkbox" name="" id="checkbox" className="hidden" onChange={handleChange} />
        <label htmlFor="checkbox" className="cursor-pointer" >
          <div className="w-9 h-5 flex items-center bg-gray-300 rounded-full p2">
            <div className="switch-ball w-4 h-4 bg-white rounded-full shadow"></div>
          </div>
        </label>
      </div>
      <span className="text-xs font-semibold dark:text-white">Dark</span>
    </div >
  );
}