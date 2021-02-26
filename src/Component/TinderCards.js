import React, { useState , useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import "../Style/TinderCard.css"
import firebaseApp from '../firebase'
import firebase from "firebase/app"
import { useHistory } from "react-router-dom";

    


const database = firebaseApp.firestore()

function TinderCards() {
    
    const [people, setPeople] = useState([]) 
    let history = useHistory();

     useEffect(() => {
         database
         .collection("images")
         .onSnapshot((snapshot) => 
             setPeople(snapshot.docs.map((docs) => docs.data()))   
            )
     }, [])

     useEffect(() => {
     firebase.auth().onAuthStateChanged(_usr => {
      if (!_usr) {
       history.push("/login")
      } 
     })
    });
    return (
        <div>
          <div className="cardContainer">
            {people.map((person)=>(
                <TinderCard 
                  className = "swiper"
                  key= {person.Name}
                  >
                   <div 
                    style ={{backgroundImage : `url(${person.img})`}}
                    className="cards"
                   >
                     <h3>{person.Name}</h3>
                   </div>
                </TinderCard>
             ))} 
            </div>
        </div>
    )
}

export default TinderCards
