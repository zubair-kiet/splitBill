import { useState } from "react";

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
function Button({children,onClick}){
  return (
  <button className="button" onClick={onClick}>{children}</button>
  )
}
export default function App(){
  const [showAddFriend,setShowAddFriend]=useState(false)
  const [friends,setFriends]=useState(initialFriends)
  const [selectedFriend,setSelectedFriend]=useState(null);
  function handleShowAddFriend(){
    setShowAddFriend(!showAddFriend)
  }
  function handleAddFriend(friend){
    setFriends((friends)=>[...friends,friend]);
    setShowAddFriend(false)
  }
  function handleSelection(friend){
    setSelectedFriend(selected=>selected?.id===friend.id?null:friend);  
    setShowAddFriend(false);
  }
  function handleSplitBill(value){
          console.log(value)
          setFriends(friends=>friends.map(friend=>friend.id===selectedFriend.id?{...friend,balance:friend.balance+value}:friend))
            setSelectedFriend(null);
        }
  
  return(
    <div className="app">
      <div className="sidebar">
      <FriendList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend}/>
      {showAddFriend&&<FormAddFriend onAddFriend={handleAddFriend} />}
      <Button onClick={handleShowAddFriend}>{showAddFriend?"close":"Add Friend"}</Button>
      </div>
      {selectedFriend&&<FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
    </div>
  )
}
function FriendList({friends,onSelection,selectedFriend}){
 
  return (
    <ul>
      {friends.map(friend=><Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/>)}
    </ul>
  )
}
function Friend({friend,onSelection,selectedFriend}){
  const isSelected=selectedFriend?.id===friend.id;
  return(
     <li className={isSelected?"selected":""}>
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>
      {friend.balance<0&&(<p className="red">You owes {friend.name} {Math.abs(friend.balance)}</p>)}
     {friend.balance>0&&(<p className="green">{friend.name} owes you {friend.balance}</p>)}
      {friend.balance===0&&(<p>You and {friend.name} are even</p>)}
      <Button onClick={()=>onSelection(friend)}>{isSelected?"close":"select"}</Button>
     </li>
  )
}
function FormAddFriend({onAddFriend}){
 const [name,setName]=useState("");
 const [image,setImage]=useState("https://i.pravatar.cc/48?u=933372")
 function handleSubmit(e){
  e.preventDefault();
  const id=crypto.randomUUID();
  if(!name || !image)return;
  const newFriend={
    id,
    name,
    image:`${image}?=${id}`,
    balance:0,
  }
  onAddFriend(newFriend);
  console.log(newFriend);
  setName("");
  setImage("https://i.pravatar.cc/48?u=933372")
 }
  
  return(
    <form className="form-add-friend" onSubmit={handleSubmit} >

    <label>Friend Name</label>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
    <label>Image Url</label>
    <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}/>
    <Button>Add</Button>
    </form>
  )
}
function FormSplitBill({selectedFriend,onSplitBill}){
  const [bill,setBill]=useState("");
  const [paidByUser,setPaidByUser]=useState('');
  const [WhoIsPaying,setWhoIsPaying]=useState("user")
  const paidByFriend=bill?bill-paidByUser:"";
  function handleSubmit(e){
    e.preventDefault();
    if(!bill || !paidByUser)return;
    onSplitBill(WhoIsPaying==="user"?paidByFriend:-paidByUser)
     
  }
    return (
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a bill with {selectedFriend.name}</h2>
        <label>Bill value</label>
        <input type="text" value={bill} onChange={(e)=>setBill(Number(e.target.value))}/>
        <label>Your expenses</label>
        <input type="text" value={paidByUser} onChange={(e)=>setPaidByUser(Number(e.target.value)>bill?paidByUser:Number(e.target.value))}/>
        <label>{selectedFriend.name} expenses</label>
        <input type="text" disabled value={paidByFriend}/>
        <label>Who is paying the bill</label>
        <select value={WhoIsPaying}onChange={(e)=>setWhoIsPaying(e.target.value)}>
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button>Split bill</Button>
      </form>
    )
  }
// function Button({ children, onClick }) {
//   return (
//     <button onClick={onClick} className="button">
//       {children}
//     </button>
//   );
// }

// export default function App(){
//   const [friends, setFriends] = useState(initialFriends);
//   const [showFriend,setShowFriend]=useState(false);
//  const [selectedFriend,setSelectedFriend]=useState(null);
//   function handleFriend(){
//     setShowFriend(showFriend=>!showFriend)
//    }
//    function handleShowAddFriend(friend){
//     setFriends(friends=>[...friends,friend])
//     setShowFriend(showFriend=>!showFriend)

//    }
//    function handleSelection(friend){
//     setSelectedFriend(friend);
//     console.log(friend)
//    }
   
 
//   return <div className="app">
//     <div className="sidebar">

//     <FriendsList friends={friends} onClick={handleSelection}  selectedFriend={selectedFriend}/>
//     { showFriend&&<FormAddFriend  onAddfriend={handleShowAddFriend}/>}
//    <Button  onClick={handleFriend}>{showFriend?"Close friend":"Add Friend"}</Button>
//     </div>
//    {selectedFriend && <FormSplitBill friend={selectedFriend} selectedFriend={selectedFriend}/>}
//   </div>
// }
//  function FriendsList({friends,onClick,selectedFriend}){
//   return(
//     <ul>
      
//     {friends.map(friend=><Friend friend={friend} key={friend.id} onClick={onClick} selectedFriend={selectedFriend}/>)}
//     </ul>
//   )
//  }
//  function Friend({friend,onClick},selectedFriend){
//   const isSelected=selectedFriend.id===friend.id;
//   console.log(isSelected)
 
//   return(
//     <li className={isSelected?"selected":""}>
//       <img src={friend.image} alt={friend.name}/>
//       <h3>{friend.name}</h3>
//      {friend.balance<0&&(<p className="red">You owes {friend.name} {Math.abs(friend.balance)}</p>)}
//      {friend.balance>0&&(<p className="green">{friend.name} owes you {friend.balance}</p>)}
//      {friend.balance===0&&(<p>You and {friend.name} are even</p>)}
//       <Button onClick={()=>onClick(friend)}>select</Button>
//     </li>
//   )
//  }
 
//  function FormAddFriend({onAddfriend}){
//   const [name,setName]=useState("");
//   const [image,setImage]=useState("https://i.pravatar.cc/48")
//   function handleSubmit(e){
//     e.preventDefault();
//     if(!name || !image)return;
//    const  id=crypto.randomUUID()
//     const newFriend={
//       name,
//       image:`${image}?=${id}`,
//       balance:0,
//       id
//     }
//     console.log(newFriend);
//     onAddfriend(newFriend)
   
    
    
//     setName("");
//     setImage("https://i.pravatar.cc/48")
//   }
//   return( 
// <form className="form-add-friend" onSubmit={handleSubmit}>
//    <label>Friend name</label>
//    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
//    <label>Image url</label>
//    <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}/>
//    <Button>Add</Button>
//   </form>
//   )
//  }
// function FormSplitBill({friend}){
//   return (
//     <form className="form-split-bill">
//       <h2>Split a bill with {friend.name}</h2>
//       <label>Bill value</label>
//       <input type="text"/>
//       <label>Your expenses</label>
//       <input type="text"/>
//       <label>{friend.name} expenses</label>
//       <input type="text" disabled/>
//       <label>Who is paying the bill</label>
//       <select>
//         <option value="user">You</option>
//         <option value="friend">{friend.name}</option>
//       </select>
//       <Button>Split bill</Button>
//     </form>
//   )
// }














// export default function App() {
//   const [friends, setFriends] = useState(initialFriends);
//   const [showFriend, setShowFriend] = useState("true");
//   const [splitBill, setSplitBill] = useState(null);
 
//   function handleShowFriend() {
//     setShowFriend((s) => !s);
//   }
//   function handleAddFriends(friend) {
//     setFriends((friends) => [...friends, friend]);
//     setShowFriend(false);
//   }
//   function handleSelection(friend) {
//     setSplitBill((cur) => (cur?.id === friend.id ? null : friend));
//     setShowFriend(false);
//   }
//   function handleSplitBill(value){
//     setFriends((friends)=>friends.map((friend)=>friend.id===splitBill.id?{...friend,balance:friend.balance+value}:friend))
//     setSplitBill(null);
//   }

//   return (
//     <div className="app">
//       <div className="sidebar">
//         <FriendsList
//           onSelection={handleSelection}
//           friends={friends}
//           selectedFriend={splitBill}
//         />
//         {showFriend && <FormAddFriend onAddFriend={handleAddFriends} />}

//         <Button onClick={handleShowFriend}>
//           {showFriend ? "Close" : "Open"}
//         </Button>
//       </div>
//       {splitBill && <FormSplitBill splitBill={splitBill} OnSplitbill={handleSplitBill} key={friends.id}/>}
//     </div>
//   );
// }
// function FriendsList({ friends, onSelection, selectedFriend }) {
//   return (
//     <ul className="ul">
//       {friends.map((e) => (
//         <Individual
//           onSelection={onSelection}
//           selectedFriend={selectedFriend}
//           friend={e}
//         />
//       ))}
//     </ul>
//   );
// }
// function Individual({ friend, onSelection, selectedFriend }) {
//   const isSelected = selectedFriend?.id === friend.id;

//   return (
//     <li className={isSelected ? "li" : ""}>
//       <img src={friend.image} alt={friend.image}></img>

//       <h3>{friend.name}</h3>
//       {friend.balance < 0 && (
//         <p className="red">
//           You owe {friend.name} {Math.abs(friend.balance)}$
//         </p>
//       )}
//       {friend.balance > 0 && (
//         <p className="green">
//           {" "}
//           {friend.name} owe you {Math.abs(friend.balance)}$
//         </p>
//       )}
//       {friend.balance === 0 && <p>You and {friend.name} are even</p>}
//       <Button onClick={() => onSelection(friend)}>
//         {isSelected ? "Close" : "Select"}
//       </Button>
//     </li>
//   );
// }
// function Button({ children, onClick }) {
//   return (
//     <button onClick={onClick} className="button">
//       {children}
//     </button>
//   );
// }
// function FormAddFriend({ onAddFriend }) {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState("https://i.pravatar.cc/48?");
//   function handleClick(e) {
//     e.preventDefault();
//     const id = crypto.randomUUID();
//     if (!name || !image) return;
//     const newFriend = {
//       id,
//       name,
//       image: `${image}?=${id}`,
//       balance: 0,
//     };
//     onAddFriend(newFriend);

//     setImage("https://i.pravatar.cc/48?");
//     setName("");
//   }

//   return (
//     <form className="form-add-friend" onSubmit={handleClick}>
//       <label>👨👨‍💼 Friend name</label>
//       <input
//         type="text"
//         placeholder="friend name.."
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <label>😎image Url</label>
//       <input
//         type="text"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//       />
//       <Button>Add</Button>
//     </form>
//   );
// }
// function FormSplitBill({ splitBill,OnSplitbill,key }) {
  
//   const [bill, setBill] = useState("");
//   const [paidByUser, setPaidByUser] = useState("");
//   const paidByFriend=bill&&paidByUser<=bill?bill-paidByUser:"";
//   const [WhoIsPaying, setWhoIsPaying] = useState("user");
//   function handleSubmit(e){
//     e.preventDefault();
//     if(!bill&&!paidByUser)return;
//     OnSplitbill(WhoIsPaying==='user'?paidByFriend:-paidByUser)
//   }
  
//   return (
//     <form className="form-split-bill" onSubmit={handleSubmit}>
//       <h2>split a bill with {splitBill.name} </h2>
//       <label>Bill value</label>
//       <input
//         type="text"
//         value={bill}
//         onChange={(e) => setBill(Number(e.target.value))}
//       />
//       <label>Your expenses</label>
//       <input
//         type="text"
//         value={paidByUser}
//         onChange={(e) => setPaidByUser(Number(e.target.value)>bill?paidByUser:Number(e.target.value))}
//       />
//       <label>{splitBill.name} expenses</label>
//       <input type="text" disabled  value={paidByFriend
//       }/>
//       <label>Who is paying the bill?</label>
//       <select value={WhoIsPaying}onChange={(e)=>setWhoIsPaying((e.target.value))}>
//         <option value="user" >
//           You
//         </option>
//         <option value="friend" >
//           {splitBill.name}
//         </option>
//       </select>
//       <Button>splitBill</Button>
//     </form>
//   );
// }
