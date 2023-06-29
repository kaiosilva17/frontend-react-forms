import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiFillSave, AiOutlineDoubleLeft } from 'react-icons/ai'
import vooValidator from '../../validators/vooValidator'
import { mask } from 'remask'



const form = () => {

    const { push, query } = useRouter()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [voar, setVoos] = useState([])

    useEffect(() => {

        if (query.id) {
            const id = query.id
            const voos = JSON.parse(window.localStorage.getItem('voos'))
            const voo = voos[id]

            for (let atributo in voo) {
                setValue(atributo, voo[atributo])
            }
        }
    }, [query.id])

    function salvar(dados) {
        console.log(dados)
        const voos = JSON.parse(window.localStorage.getItem('voos')) || []
        voos.splice(query.id, 1, dados)
        window.localStorage.setItem('voos', JSON.stringify(voos))
        push('/voo')
    }

    function handleChange(event) {
        const name = event.target.name
        const valor = event.target.value
        const mascara = event.target.getAttribute('mask')

        setValue(name, mask(valor, mascara))
    }

    useEffect(() => {
        setVoos(getVoos())
    }, [])


    function getVoos() {
        return JSON.parse(window.localStorage.getItem("classes")) ?? []
    }


    return (
        <>
            <Pagina titulo='Voo' typeNavBar="adm">
                <Form>
                    <Form.Group className="mb-3" controlId="companhia_aerea">
                        <Form.Label>Companhia:</Form.Label>
                        <Form.Control
                            isinvalid={errors.companhia_aerea}
                            type="text"
                            {...register('companhia_aerea', vooValidator.companhia_aerea)} />
                        {
                            errors.companhia_aerea &&
                            <small className='text-danger'>{errors.companhia_aerea.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="nome_id">
                        <Form.Label>Nome_ID:</Form.Label>
                        <Form.Control
                            isinvalid={errors.nome_id}
                            type="text"
                            {...register('nome_id', vooValidator.nome_id)} />
                        {
                            errors.nome_id &&
                            <small className='text-danger'>{errors.nome_id.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="origem">
                        <Form.Label>Origem:</Form.Label>
                        <Form.Control
                            isinvalid={errors.origem}
                            type="text"
                            {...register('origem', vooValidator.origem)} />
                        {
                            errors.origem &&
                            <small className='text-danger'>{errors.origem.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sigla_origem">
                        <Form.Label>Sigla O.:</Form.Label>
                        <Form.Control
                            isinvalid={errors.sigla_origem}
                            type="text"
                            {...register('sigla_origem', vooValidator.sigla_origem)} />
                        {
                            errors.sigla_origem &&
                            <small className='text-danger'>{errors.sigla_origem.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="destino">
                        <Form.Label>Destino:</Form.Label>
                        <Form.Control
                            isinvalid={errors.destino}
                            type="text"
                            {...register('destino', vooValidator.destino)} />
                        {
                            errors.destino &&
                            <small className='text-danger'>{errors.destino.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sigla_destino">
                        <Form.Label>Sigla D.:</Form.Label>
                        <Form.Control
                            isinvalid={errors.sigla_destino}
                            type="text"
                            {...register('sigla_destino', vooValidator.sigla_destino)} />
                        {
                            errors.destino &&
                            <small className='text-danger'>{errors.sigla_destino.message}</small>
                        }

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="classe">
                        <Form.Label>Classe:</Form.Label>
                        <Form.Select aria-label="Default select example" {...register('nome')}>
                            {Object.keys(voar).length === 0 ?
                                <option>classes não cadastradas.</option>
                                :
                                voar.map(item => (
                                    <option value={item.nome}>{item.nome}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="horario_embarque">
                        <Form.Label>Hrio Embarque:</Form.Label>
                        <Form.Control
                            mask='99:99'
                            isinvalid={errors.horario_embarque}
                            type="text"
                            {...register('horario_embarque', vooValidator.horario_embarque)}
                            onChange={handleChange} />
                        {
                            errors.horario_embarque &&
                            <small className='text-danger'>{errors.horario_embarque.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="horario_chegada">
                        <Form.Label>Hrio Chegada:</Form.Label>
                        <Form.Control
                            mask='99:99'
                            isinvalid={errors.horario_chegada}
                            type="text"
                            {...register('horario_chegada', vooValidator.horario_chegada)}
                            onChange={handleChange} />
                        {
                            errors.horario_chegada &&
                            <small className='text-danger'>{errors.horario_chegada.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="portao">
                        <Form.Label>Portão:</Form.Label>
                        <Form.Control
                            isinvalid={errors.portao}
                            type="text"
                            {...register('portao', vooValidator.portao)} />
                        {
                            errors.portao &&
                            <small className='text-danger'>{errors.portao.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="data">
                        <Form.Label>Dt:</Form.Label>
                        <Form.Control
                            mask='99/99/9999'
                            isinvalid={errors.dara}
                            type="text"
                            {...register('data', vooValidator.data)}
                            onChange={handleChange} />
                        {
                            errors.data &&
                            <small className='text-danger'>{errors.data.message}</small>
                        }
                    </Form.Group>


                    <div className='text-center'>
                        <Link className='btn btn-outline-warning' href="/voo">
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