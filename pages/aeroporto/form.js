import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiFillSave, AiOutlineDoubleLeft } from 'react-icons/ai'
import aeroportoValidator from '../../validators/aeroportoValidator'
import { mask } from 'remask'

const form = () => {

    const { push } = useRouter()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    function salvar(dados) {
        console.log(dados)
        const aeroportos = JSON.parse(window.localStorage.getItem('aeroportos')) || []
        aeroportos.push(dados)
        window.localStorage.setItem('aeroportos', JSON.stringify(aeroportos))
        push('/aeroporto')
    }

    function handleChange(event) {
        const name = event.target.name
        const valor = event.target.value
        const mascara = event.target.getAttribute('mask')

        setValue(name, mask(valor, mascara))
    }


    return (
        <>
            <Pagina titulo='aeroporto'>
                <Form>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control isInvalid={errors.nome} type="text" {...register('nome', aeroportoValidator.nome)} />
                        {
                            errors.nome &&
                            <small className='text-danger'>{errors.nome.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sigla">
                        <Form.Label>Sigla:</Form.Label>
                        <Form.Control 
                        
                        isInvalid={errors.sigla} 
                        type="text" 
                        {...register('sigla', aeroportoValidator.sigla)} 
                        />
                        {
                            errors.sigla &&
                            <small className='text-danger'>{errors.sigla.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="estado">
                        <Form.Label>Estado:</Form.Label>
                        <Form.Control isInvalid={errors.estado} type="text" {...register('estado', aeroportoValidator.estado)} />
                        {
                            errors.estado &&
                            <small className='text-danger'>{errors.estado.message}</small>
                        }
                    </Form.Group>
                    

                    <div className='text-center'>
                        <Link className='btn btn-outline-warning' href="/aeroporto">
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