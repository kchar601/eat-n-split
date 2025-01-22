import { useState } from "react";
import CtaButton from "./Button";

export default function Sidebar({
  friendList,
  activeFriend,
  setActiveFriend,
  handleSubmitFriend,
}) {
  const [newOpen, setNewOpen] = useState(false);

  function handleNewFriendClick() {
    setNewOpen(!newOpen);
  }

  function handleSubmitNew(newFriend) {
    setNewOpen(false);
    handleSubmitFriend(newFriend);
  }

  return (
    <div className="sidebar">
      <ul>
        {friendList.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            activeFriend={activeFriend}
            setActiveFriend={setActiveFriend}
          />
        ))}
      </ul>
      <NewFriend handleSubmit={handleSubmitNew} isOpen={newOpen} />
      <CtaButton onClick={handleNewFriendClick}>
        {newOpen ? "Close" : "Add friend"}
      </CtaButton>
    </div>
  );
}

function Friend({ friend, activeFriend, setActiveFriend }) {
  const isActive = activeFriend === friend.id;

  function getBalance() {
    if (friend.balance > 0) {
      return (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      );
    } else if (friend.balance < 0) {
      return (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      );
    } else if (friend.balance === 0) {
      return <p>You and {friend.name} are even</p>;
    }
  }

  function handleActiveFriend() {
    if (isActive) {
      setActiveFriend(null);
    } else {
      setActiveFriend(friend.id);
    }
  }

  return (
    <li key={friend.id} className={isActive ? "selected" : ""}>
      <img src={friend.image} alt={"Photo of" + friend.name} />
      <h3>{friend.name}</h3>
      {getBalance()}
      <CtaButton onClick={handleActiveFriend}>
        {isActive ? "Close" : "Select"}
      </CtaButton>
    </li>
  );
}

function NewFriend({ handleSubmit, isOpen }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("https://i.pravatar.cc/48");

  function addFriend() {
    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: name,
      image: url,
      balance: 0,
    };

    setName("");
    setUrl("https://i.pravatar.cc/48");
    handleSubmit(newFriend);
  }

  return (
    <>
      {isOpen && (
        <form className="form-add-friend">
          <label>👫 Friend name</label>
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
          <label>🌄 Image URL</label>
          <input
            placeholder="https://i.pravatar.cc/48"
            value={url}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <CtaButton onClick={addFriend}>Add</CtaButton>
        </form>
      )}
    </>
  );
}
