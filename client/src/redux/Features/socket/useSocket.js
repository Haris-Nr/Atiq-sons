// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setConnected, setDisconnected, setUserCount } from "./socketSlice";
// import socket from "../../api/socket";

// const useSocket = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         // Only connect if the socket is not already connected
//         if (!socket.connected) {
//             socket.connect();
//         }

//         // Set connected status on successful connection
//         socket.on('connect', () => {
//             dispatch(setConnected());
//         });

//         // Listen for user count updates
//         socket.on("userCounts", (count) => {
//             dispatch(setUserCount(count));
//         });

//         // Clean up the listener when the component unmounts
//         return () => {
//             socket.off('connect');
//             socket.off('userCounts');
//             if (socket.connected) {
//                 socket.disconnect();
//             }
//             dispatch(setDisconnected());
//         };
//     }, [dispatch]);

//     // ... any other logic or return statements if needed
// };

// export default useSocket;




//// backend code 
// socket.on('employeeAction', (data) => {
//     onlineAdmins.forEach(admin => {
//         io.to(admin.userId).emit('notifyAdmin', data);
//     });
// });


// // Example of an admin sending a message to a specific employee
// socket.on('adminToEmployee', ({ employeeId, message }) => {
//     const employee = getUser(employeeId);
//     if (employee) {
//         io.to(employee.userId).emit('messageFromAdmin', message);
//     }
// });