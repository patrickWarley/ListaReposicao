const UserSelector = ({ users, onSelect }) => {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className=" bg-white text-black block text-sm p-3 m-3 rounded-lg border border-gray-600 dark:bg-black dark:text-white"
    >{
        users.map(user => <option value={user} className="">{user}</option>)
      }
    </select>
  );
}

export default UserSelector;