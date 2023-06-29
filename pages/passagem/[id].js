import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiFillSave, AiOutlineDoubleLeft } from 'react-icons/ai'
import passagemValidator from '../../validators/passagemValidator'
import { mask } from 'remask'
import { DataGrid  } from '@mui/x-data-grid';


const form = () => {

    const { push, query } = useRouter()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [passar, setPassagem] = useState([])
    const [data, setData] = useState([])
    const [origem, setOrigem] = useState("")
    const [destino, setDestino] = useState("")
    const [passagensAchadas, setPassagensAchadas] = useState([])
    const [row, setRow] = useState({})
    const columns = [
        { field: 'companhia_aerea', headerName: 'Companhia', width: 120 },
        { field: 'nome_id', headerName: 'Nome_ID', width: 120 },
        { field: 'sigla_origem', headerName: 'Sigla O.', width: 120 },
        { field: 'sigla_destino', headerName: 'Sigla D.', width: 120 },
        { field: 'nome', headerName: 'Classe', width: 120 },
        { field: 'horario_embarque', headerName: 'Hrio Embarque', width: 120 },
        { field: 'horario_chegada', headerName: 'Hrio Chegada', width: 120 },
        { field: 'portao', headerName: 'Portão', width: 120 },
        { field: 'data', headerName: 'Dt', width: 120 },

    ];
    


    function salvar(dados) {
        
        let employee = {
            ...dados,
            ...row
        };
        
        

        const passagens = JSON.parse(window.localStorage.getItem('passagens')) || []
        passagens.push(employee)
        window.localStorage.setItem('passagens', JSON.stringify(passagens))
        push('/passagem') 
        
    }

    function handleChange(event) {
        const name = event.target.name
        const valor = event.target.value
        const mascara = event.target.getAttribute('mask')


        setValue(name, mask(valor, mascara))
    }


    function getPassagens() {
        return JSON.parse(window.localStorage.getItem("voos")) ?? []
    }

    const rowValue = (value) => {
        console.log(value)
        setRow(value)
    }

    useEffect(() => {

        if (query.id) {
            const id = query.id
            const passagens = JSON.parse(window.localStorage.getItem('passagens'))
            const passagem = passagens[id]
    
            for (let atributo in passagem) {
                setValue(atributo, passagem[atributo])
            }
        }
    }, [query.id])
    


    useEffect(() => {
        setPassagem(getPassagens())
    }, [])

    useEffect(() => {
        if (origem && destino) {
            const resultado = passar.find(item => item.origem === origem && item.destino === destino)
            setPassagensAchadas([resultado])
        }
    }, [origem, destino])


    return (
        <>
            <Pagina titulo='Passagem' typeNavBar="usuario">

                <Form>
                    <Form.Group className="mb-3" controlId="nome2">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control isInvalid={errors.nome} type="text" {...register('nome2', passagemValidator.nome)} />
                        {
                            errors.nome &&
                            <small className='text-danger'>{errors.nome.message}</small>
                        }
                    </Form.Group>
                    <Row>
                        <Col md={1}></Col>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="local_origem">
                                <Form.Label>local de Origem:</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register('origem', passagemValidator.local_origem)}
                                    value={origem}
                                    onChange={e => {
                                        setValue("origem", e.target.value)
                                        setOrigem(e.target.value);
                                    }}


                                >
                                    {Object.keys(passar).length === 0 ?
                                        <option>Classes não cadastradas.</option>
                                        :
                                        [<option selected="selected">Selecione uma origem</option>,
                                        passar.map(item => (
                                            <option value={item.origem}>{item.origem}</option>
                                        ))]
                                    }
                                </Form.Control>



                            </Form.Group>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={4}>
                            <Form.Group className="mb-3" controlId="local_destino">
                                <Form.Label>local de Destino:</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register('destino', passagemValidator.local_destino)}
                                    value={destino}
                                    onChange={e => {
                                        setValue("destino", e.target.value)
                                        setDestino(e.target.value);
                                    }}

                                >
                                    {Object.keys(passar).length === 0 ?
                                        <option>Classes não cadastradas.</option>
                                        :
                                        [<option selected="selected">Selecione um destino</option>,
                                        passar.map(item => (
                                            <option value={item.destino}>{item.destino}</option>
                                        ))]
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={passagensAchadas}
                            columns={columns}
                            getRowId={(row) => Math.random}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            onCellClick={(params, event) => {
                                if(!params.value) {
                                    rowValue(params.row)
                                }
                              }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div>

                    <Form.Group className="mb-3" controlId="assento">
                        <Form.Label>Assento:</Form.Label>
                        <Form.Control
                            mask='9A'
                            isInvalid={errors.assento}
                            type="text"
                            {...register('assento', passagemValidator.assento)}
                            onChange={handleChange} />
                        {
                            errors.assento &&
                            <small className='text-danger'>{errors.assento.message}</small>
                        }
                    </Form.Group>

                    <div className='text-center'>
                        <Link className='btn btn-outline-warning' href="/passagem">
                            <AiOutlineDoubleLeft className="me-2" />
                            Voltar
                        </Link>
                        <Button className="ms-2" variant="outline-info" onClick={handleSubmit(salvar)}>
                            <AiFillSave className='me-2' />
                            Salvar
                        </Button>
                    </div>
                </Form>
            </Pagina>
        </>
    )
}

export default form
