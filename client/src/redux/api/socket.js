import io from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_BASE_URL

let socket = io(URL, {autoConnect: false});



export default socket;