import List from "./components/list/List"
import Detail from "./components/details/Detail"
import Chat from "./components/chat/Chat"
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

const App = () => {
  const user = false;

  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (<Login />)}
      <Notification />
    </div>
  )
}
export default App