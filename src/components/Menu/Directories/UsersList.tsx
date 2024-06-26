// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks";
// import { usersActions } from "../../../store/Users.store";

// const UsersList: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const users = useAppSelector((store) => store.state.users);
//   console.log(users);

//   useEffect(() => {
//     dispatch({ type: "users/fetchUsers" });
//   }, [dispatch]);

//   return (
//     <div>
//       <h2>Users</h2>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.id}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
export {}
// export default UsersList;