import { useState } from 'react'
import './chatList.css'
import AddUser from './addUser/AddUser';

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeChat, setActiveChat] = useState(null);

    // Mock data - replace with actual data from your backend
    const chats = [
        {
            id: 1,
            name: 'Jane Doe',
            lastMessage: 'Hello',
            avatar: './user.png',
            time: '1 min ago',
            unread: 2
        },
        {
            id: 2,
            name: 'John Smith',
            lastMessage: 'How are you?',
            avatar: './user.png',
            time: '5 mins ago',
            unread: 0
        },
        {
            id: 3,
            name: 'Alice Johnson',
            lastMessage: 'See you tomorrow!',
            avatar: './user.png',
            time: '1 hour ago',
            unread: 1
        }
    ];

    const filteredChats = chats.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChatClick = (chatId) => {
        setActiveChat(chatId);
        // Add logic to load chat messages here
    };

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt="Search" />
                    <input 
                        type="text" 
                        placeholder='Search chats...' 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <img 
                    src={addMode ? "./minus.png" : "./plus.png"} 
                    alt={addMode ? "Close" : "Add chat"} 
                    className='add' 
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {filteredChats.map(chat => (
                <div 
                    key={chat.id}
                    className={`item ${activeChat === chat.id ? 'active' : ''}`}
                    onClick={() => handleChatClick(chat.id)}
                >
                    <img src={chat.avatar} alt={chat.name} />
                    <div className="texts">
                        <span>{chat.name}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                        <div className="badge">{chat.unread}</div>
                    )}
                    <span className="time">{chat.time}</span>
                </div>
            ))}
            {filteredChats.length === 0 && (
                <div className="no-results">
                    <p>No chats found</p>
                </div>
            )}
            {addMode && <AddUser />}
        </div>
    )
}

export default ChatList







