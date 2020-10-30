import React, { Component } from 'react';
import db from '../server/firebase'
import "./soundbox.css"

class Soundbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            soundList: [],
            voteList: [],
            maxVote: ''
        }
        this.myRef = React.createRef();
        this.onValueChange = this.onValueChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    //modifie state input type radio
    onValueChange(event) {
        this.setState({
            selectedOption: event.target.value
        });
    }

    formSubmit(event) {
        event.preventDefault();
        if(this.state.selectedOption) {
            //désactive le bouton après vote
            this.refs.btn.setAttribute("disabled", "disabled");
            this.refs.btn.innerHTML = 'Vous avez déjà voté';
            //ajoute le vote à firebase
            const voteRef = db.collection('vote')
            const vote = {
                vote: this.state.selectedOption,
                user: this.state.user.displayName,
            }
            voteRef.doc(new Date().getTime().toString()).set(vote)
            this.setState({
                selectedOption: '',
            })
            const voteRefGet = db.collection('vote').get()
            voteRefGet.then((querySnapshot) => {
                const doc = querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
            })
                this.calcMax(doc)
            })
        }
    }

    componentDidMount() {
        //récupère la liste des bruitages
        const soundRef = db.collection('sounds').get()
        soundRef.then((querySnapshot) => {
            const doc = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            this.setState({
                soundList: doc
            })
        })
        //récupère la liste des votes
        const voteRef = db.collection('vote').get()
        voteRef.then((querySnapshot) => {
            const doc = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })         
        this.calcMax(doc)
        })
    }

    calcMax(doc) {
        //récupère tous les numéros de votes
        const voteList = doc.map(vote =>
            (vote.vote)
        )
        const voteUsers = doc.map(vote =>
            (vote.user)
        )
        for (var j = 0; j < voteUsers.length; j++) {
            if (voteUsers[j] === this.state.user.displayName) {
                this.refs.btn.setAttribute("disabled", "disabled");
                this.refs.btn.innerHTML = 'Vous avez déjà voté';
            }
        }

        //calcule le vote le plus fréquent
        voteList.sort();
        var max = 0,
            result, freq = 0;
        for (var i = 0; i < voteList.length; i++) {
            if (voteList[i] === voteList[i + 1]) {
                freq++;
            } else {
                freq = 0;
            }
            if (freq > max) {
                result = voteList[i];
                max = freq;
            }
        }
        if (result===undefined){
            result = voteList[0];
        }
        const maxVote = result;
        this.setState({
            voteList: voteList,
            maxVote: maxVote
        })
    }
    //joue l'audio quand on clique sur l'id
    playAudio(id) {
        const audioEl = document.getElementById(id)
        audioEl.play()
    }
    render () {
        //récupère la liste des sons
        const soundList = this.state.soundList.map(sound =>
            (
            <>
            <input id={sound.label} name="soundList" type="radio" value={sound.id} checked={this.state.selectedOption === sound.id} onChange={this.onValueChange}/>
            <label htmlFor={sound.label} onClick={() => this.playAudio(sound.id)}>
                <figure>
                    <figcaption>{sound.label}</figcaption>
                    <audio
                        id={sound.id}
                        controls
                        src={process.env.PUBLIC_URL + sound.file}>
                            Your browser does not support the
                            <code>audio</code> element.
                    </audio>            
               </figure>

            </label>                     

            </>
            )
        )
        this.state.voteList.map(vote =>
            (vote.vote)
        )
        return (
        <>
            <form style={{ backgroundImage: `url(${process.env.PUBLIC_URL +'soundbox-background.png'})`,  boxShadow: '0 0 0 200px rgba(105, 28, 51,0.3) inset',  backgroundPosition: 'center',backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}  className="soundForm" onSubmit={this.formSubmit}>
            <h1 className="UBB-title">Mets du son au stade !</h1>
            <div className="soundList">
                {soundList}
            </div>
            <div className="soundData">
            <p>Vous avez sélectionné le bruitage numéro : {this.state.selectedOption}</p>
            <button ref="btn" className="btn btn-default" type="submit">
            Voter !
            </button>
            <p>Le bruitage le plus voté est le numéro : {this.state.maxVote}</p>
            </div>
            </form>
            
        </>
        )
    }
}

export default Soundbox;
