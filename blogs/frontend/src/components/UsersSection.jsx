import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <tr key={user.username}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Users;
