import { useState } from "react";
import "./index.css";
import Sidebar from "./Sidebar";
import CtaButton from "./Button";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [activeID, setActiveID] = useState();
  const activeFriend = friendList
    .slice()
    .filter((friend) => friend.id === activeID)[0];

  function handleSubmitFriend(newFriend) {
    setFriendList((friends) => [...friends, newFriend]);
  }

  function updateBalance(id, newBalance) {
    setFriendList((friends) =>
      friends.map((friend) =>
        friend.id === id ? { ...friend, balance: newBalance } : friend
      )
    );
    setActiveID(null);
  }

  return (
    <div className="app">
      <Sidebar
        friendList={friendList}
        activeFriend={activeID}
        setActiveFriend={setActiveID}
        handleSubmitFriend={handleSubmitFriend}
      />
      <>
        {activeID && (
          <BillSplit friend={activeFriend} updateBalance={updateBalance} />
        )}
      </>
    </div>
  );
}

function BillSplit({ friend, updateBalance }) {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [payer, setPayer] = useState("user");
  const friendExpense = bill - expense;
  var newBalance;

  function findNewBalance(e) {
    e.preventDefault();
    if (payer === "user") {
      newBalance = friend.balance + friendExpense;
    } else {
      newBalance = friend.balance - expense;
    }
    updateBalance(friend.id, newBalance);
  }

  return (
    <form className="form-split-bill" onSubmit={findNewBalance}>
      <h2>Split a bill with {friend.name}</h2>
      <label>💰 Bill value</label>
      <input value={bill} onChange={(e) => setBill(e.target.value)} />
      <label>🧍‍♀️ Your expense</label>
      <input value={expense} onChange={(e) => setExpense(e.target.value)} />
      <label>👫 {friend.name}'s expense</label>
      <input value={expense ? friendExpense : ""} disabled />
      <label>🤑 Who is paying the bill</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <CtaButton>Split bill</CtaButton>
    </form>
  );
}
