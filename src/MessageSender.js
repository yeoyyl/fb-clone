import React, {useState} from 'react'
import './MessageSender.css'
import { Avatar } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useStateValue } from './StateProvider';
import db from "./firebase"
import firebase from "firebase"

function MessageSender() {
    const [{ user }, dispatch] = useStateValue();
	const [input, setInput] = useState('');
	const [imageUrl, setImageUrl] = useState(''); 
	const handleSubmit = (e) => {
		  e.preventDefault();
		  
		  db.collection('posts').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic: user.photoURL,
            username: user.displayName,
            image: imageUrl
          })

          setInput("")
          setImageUrl("")
    };

    return (
        <div className="messageSender">
            <div class="messageSender__top">
                <Avatar src= {user.photoURL}/>
                <form>
                    <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="messageSender__input"
                    placeholder={`What's on your mind, ${user.displayName} ? `}
                    />
						  <input 
						  value={imageUrl}
						  onChange={(e) => setImageUrl(e.target.value)}
						  placeholder="image URL (Optional}"/>
                    <button onClick={handleSubmit} type="submit">
                        Hidden Submit
                    </button>
                </form>

            </div>

            <div class="messageSender__bottom">
                <div class="messeageSender__option">
                    <VideocamIcon style={{color :"red"}} />
                    <h3>Live Video</h3>
                </div>
                <div class="messeageSender__option">
                    <PhotoLibraryIcon style={{color :"green"}} />
                    <h3>Live Video</h3>
                </div>
                <div class="messeageSender__option">
                    <InsertEmoticonIcon style={{color :"orange"}} />
                    <h3>Live Video</h3>
                </div>

            </div>
        </div>
    )
}

export default MessageSender
