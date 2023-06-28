import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiFillSave, AiOutlineDoubleLeft } from 'react-icons/ai'
import aeronaveValidator from '../../validators/aeronaveValidator'
import { mask } from 'remask'

const form = () => {

    const { push } = useRouter()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    function salvar(dados) {
        console.log(dados)
        const aeronaves = JSON.parse(window.localStorage.getItem('aeronaves')) || []
        aeronaves.push(dados)
        window.localStorage.setItem('aeronaves', JSON.stringify(aeronaves))
        push('/aeronave')
    }

    function handleChange(event) {
        const name = event.target.name
        const valor = event.target.value
        const mascara = event.target.getAttribute('mask')

        setValue(name, mask(valor, mascara))
    }

    return (
        <>
            <Pagina titulo='Aeronave'>
                <Form>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control isInvalid={errors.nome} type="text" {...register('nome', aeronaveValidator.nome)} />
                        {
                            errors.nome &&
                            <small className='text-danger'>{errors.nome.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="assentos">
                        <Form.Label>Assentos:</Form.Label>
                        <Form.Control 
                        mask='99'
                        isInvalid={errors.assentos} 
                        type="text" 
                        {...register('assentos', aeronaveValidator.assentos)} 
                        onChange={handleChange} />
                        {
                            errors.assentos &&
                            <small className='text-danger'>{errors.assentos.message}</small>
                        }
                    </Form.Group>
                    

                    <div className='text-center'>
                        <Link className='btn btn-outline-warning' href="/aeronave">
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