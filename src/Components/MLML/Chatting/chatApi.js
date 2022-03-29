let socket;

const connect = (userIdx, userNickname, bodyRef, setMsgs) => {
  socket = new WebSocket(process.env.REACT_APP_CHATTING_URL);
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
    sessionStorage.setItem("chatStart", true);
    const message = {
      type: 2,
      idx: userIdx,
      nickname: userNickname,
    };
    socket.send(JSON.stringify(message));
  };

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    // console.log("Received message: ", data);

    if (data.type === 1) {
      const msgParsed = JSON.parse(data.body);
      setMsgs((prevMsgs) => [...prevMsgs, msgParsed]);
    } else {
      console.log("etc type: ", data.type);
    }
  };

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event);
  };

  socket.onerror = (error) => {
    console.log("Socket Error: ", error);
  };
};

const disconnect = (userIdx, userNickname) => {
  console.log("Socket Closing");
  const message = {
    type: 3,
    idx: userIdx,
    nickname: userNickname,
  };
  socket.send(JSON.stringify(message));
  socket.close();
  sessionStorage.removeItem("chatStart");
  sessionStorage.removeItem("msgs");
};

const sendMsg = (userIdx, userNickname, msg) => {
  const now = new Date();
  const message = {
    type: 1,
    idx: userIdx,
    nickname: userNickname,
    message: msg,
    time: now.getHours() + ":" + (now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()),
  };
  socket.send(JSON.stringify(message));
};

export { connect, disconnect, sendMsg };
