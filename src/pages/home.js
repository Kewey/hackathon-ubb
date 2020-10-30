import React, { Component } from 'react'
import logoUBB from "../assets/icons/logoUBB.png"
import logoSP from "../assets/icons/logosp.png"

export default class Home extends Component {
    render() {
        return (
            <>
                <div className="highlight-match home">
                    <div className="row">
                        <div className="col">
                            <h1 className="UBB-title">Votre e-match</h1>
                            <strong>28/10/2020 - 18h00</strong>
                            <div className="row">
                                <div className="col">
                                    <img src={logoUBB} alt=""/>
                                    <h5>UBB</h5>
                                </div>
                                <div className="col">
                                    <strong>
                                        VS
                                    </strong>
                                </div>
                                <div className="col">
                                    <img src={logoSP} alt=""/>
                                    <h5>Sélection Paloise</h5>                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h2 className="UBB-title">E-match à venir</h2>
                                <div className="card home">
                                    <div className="row aic">
                                        <div className="col">
                                            <strong>
                                                Le chat est disponible
                                            </strong>
                                        </div>
                                        <div className="col-a">
                                            <a href="/chat" className="btn-primary">Tester</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card home">
                                    <div className="row aic">
                                        <div className="col">
                                            <strong>
                                                Faites du bruit
                                            </strong>
                                        </div>
                                        <div className="col-a">
                                            <a href="/soundbox" className="btn-primary">Essayer</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card home">
                                    <div className="row aic">
                                        <div className="col">
                                            <strong>
                                                25/11/2020 - 18h00
                                            </strong>
                                            <div className="row aic no-g show-team">
                                                <img src={logoUBB} height="30" alt="Logo UBB"/>
                                                <span>VS</span>
                                                <img src={logoSP} height="30" alt="Logo SP"/>
                                            </div>
                                        </div>
                                        <div className="col-a">
                                            <a href="/resa" className="btn-primary">Réservez</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
