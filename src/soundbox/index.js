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
            //récupère tous les numéros de votes
            const voteList = doc.map(vote =>
                (vote.vote)
            )
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
            const maxVote = result;
            this.setState({
                voteList: voteList,
                maxVote: maxVote
            })
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
            <figure value={sound.id} onClick={() => this.playAudio(sound.id)}>
            <figcaption>{sound.label}</figcaption>
            <audio
                id={sound.id}
                controls
                src={process.env.PUBLIC_URL + sound.file}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio> 
            <input type="radio" value={sound.id} checked={this.state.selectedOption === sound.id} onChange={this.onValueChange}/>
            </figure>
            )
        )
        this.state.voteList.map(vote =>
            (vote.vote)
        )
        const isEnabled = this.state.selectedOption;
        return (
        <>
            <form onSubmit={this.formSubmit}>
            <div className="soundList">{soundList}
            </div>
            <div>
            Vous avez sélectionné le bruitage numéro : {this.state.selectedOption}
            </div>
            <button ref="btn" disabled={!isEnabled} className="btn btn-default" type="submit">
            Voter !
            </button>
        
            </form>
            <p>Liste votes {this.state.voteList}</p>
            <p>Le bruitage le plus voté est le numéro : {this.state.maxVote}</p>
        </>
        )
    }
}

export default Soundbox;
