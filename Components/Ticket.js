import { useReactToPrint } from 'react-to-print';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { FaPlane } from "react-icons/fa";

const Ticket = ({ ticketid }) => {

    const [passagens, setPassagens] = useState([])

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'temp-data',
        onAfterPrint: () => alert('printado com sucesso')
    })


    useEffect(() => {
        setPassagens(getAll())
    }, [])

    function getAll() {
        return JSON.parse(window.localStorage.getItem('passagens')) || []
    }




    return (
        <>
            <div ref = {componentRef} style={{width:'100%', height: window.innerHeight}}>
                <div className="body">
                
                    {passagens.map((item, i) => (i == ticketid ?
                        <div className="boarding-pass">
                            <div className="cardTicket card-top">
                                <div className="source">
                                    <div className="code" key={i} >{item.sigla_origem}</div>
                                    <div className="city">{item.origem}</div>

                                </div>
                                <div className="flight-median">
                                    <FaPlane />
                                </div>
                                <div className="destination">
                                    <div className="code">{item.sigla_destino}</div>
                                    <div className="city">{item.destino}</div>
                                </div>
                            </div>
                            <div className="median"></div>
                            <div className="cardTicket card-bottom">
                                <div className="card-row">
                                    <div className="card-item">
                                        <span className="label">Passageiro</span>
                                        <p className="content">{item.nome2}</p>
                                    </div>
                                    <div className="card-item">
                                        <span className="label">Data</span>
                                        <p className="content">{item.data}</p>
                                    </div>
                                </div>
                                <div className="card-row">
                                    <div className="card-item">
                                        <span className="label">Numero do Voo</span>
                                        <p className="content">{item.nome_id}</p>
                                    </div>
                                    <div className="card-item">
                                        <span className="label">Portão</span>
                                        <p className="content">{item.portao}</p>
                                    </div>
                                    <div className="card-item">
                                        <span className="label">Assento</span>
                                        <p className="content">{item.assento}</p>
                                    </div>
                                    <div className="card-item">
                                        <span className="label">Classe</span>
                                        <p className="content">{item.nome}</p>
                                    </div>
                                </div>
                                <div className="card-row">
                                    <div className="card-item">
                                        <span className="label">Horário de embarque</span>
                                        <p className="content">{item.horario_embarque}</p>
                                    </div>
                                    <div className="card-item">
                                        <span className="label">Horário de chegada</span>
                                        <p className="content">{item.horario_chegada}</p>

                                    </div>
                                </div>
                            </div>
                        </div> : <></>))}
                       
                </div><Button onClick={handlePrint}>
printar
                        </Button>
            </div>

        </>
    )
}

export default Ticket

