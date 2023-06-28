import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiFillSave, AiOutlineDoubleLeft } from 'react-icons/ai'
import passagemValidator from '../../validators/passagemValidator'
import { mask } from 'remask'

const form = () => {

    const { push, query } = useRouter()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [passar, setPassagem] = useState([])

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

    function salvar(dados) {
        console.log(dados)
        const passagens = JSON.parse(window.localStorage.getItem('passagens')) || []
        passagens.splice(query.id, 1, dados)
        window.localStorage.setItem('passagens', JSON.stringify(passagens))
        push('/passagem')
    }

    function handleChange(event) {
        const name = event.target.name
        const valor = event.target.value
        const mascara = event.target.getAttribute('mask')

        setValue(name, mask(valor, mascara))
    }

    useEffect(() => {
        setPassagem(getPassagens())
    }, [])


    function getPassagens() {
        return JSON.parse(window.localStorage.getItem("voos")) ?? []
    }

    return (
        <>
             <Pagina titulo='Passagem'>
                
                <Form>
                <Form.Group className="mb-3" controlId="nome">
                        <Form.Label >Nome:</Form.Label>
                        <Form.Control isInvalid={errors.nome} type="text" {...register('nome', passagemValidator.nome)} />
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
                        <Form.Select aria-label="Default select example" {...register('origem',  passagemValidator.local_origem)}>
                            {Object.keys(passar).length === 0 ?
                                <option>Classes não cadastradas.</option>
                                :
                                passar.map(item => (
                                    <option value={item.origem}>{item.origem}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col md={2}></Col>
                    <Col md={4}>
                    <Form.Group className="mb-3" controlId="local_destino">
                        <Form.Label>local de Destino:</Form.Label>
                        <Form.Select aria-label="Default select example" {...register('destino', passagemValidator.local_destino)}>
                            {Object.keys(passar).length === 0 ?
                                <option>Classes não cadastradas.</option>
                                :
                                passar.map(item => (
                                    <option value={item.destino}>{item.destino}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col md={1}></Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="assento">
                        <Form.Label>Assento:</Form.Label>
                        <Form.Control 
                        mask='9A'
                        isInvalid={errors.assento} 
                        type="text" 
                        {...register('assento', passagemValidator.assento)} 
                        onChange={handleChange}/>
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


