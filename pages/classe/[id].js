import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiFillSave, AiOutlineDoubleLeft } from 'react-icons/ai'
import classeValidator from '../../validators/classeValidator'
import { mask } from 'remask'


const form = () => {

    const { push, query } = useRouter()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    useEffect(() => {

        if (query.id) {
            const id = query.id
            const classes = JSON.parse(window.localStorage.getItem('classes'))
            const classe = classes[id]

            for (let atributo in classe) {
                setValue(atributo, classe[atributo])
            }
        }
    }, [query.id])

    function salvar(dados) {
        console.log(dados)
        const classes = JSON.parse(window.localStorage.getItem('classes')) || []
        classes.splice(query.id, 1, dados)
        window.localStorage.setItem('classes', JSON.stringify(classes))
        push('/classe')
    }

    function handleChange(event) {
        const name = event.target.name
        const valor = event.target.value
        const mascara = event.target.getAttribute('mask')

        setValue(name, mask(valor, mascara))
    }


    return (
        <>
            <Pagina titulo='Classe' typeNavBar="adm">
                <Form>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control isInvalid={errors.nome} type="text" {...register('nome', classeValidator.nome)} />
                        {
                            errors.nome &&
                            <small className='text-danger'>{errors.nome.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="valor">
                        <Form.Label>Valor:</Form.Label>
                        <Form.Control 
                        mask='$999.999' 
                        isInvalid={errors.valor} 
                        type="text" 
                        {...register('valor', classeValidator.valor)} 
                        onChange={handleChange}/>
                        {
                            errors.valor &&
                            <small className='text-danger'>{errors.valor.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="bagagem">
                    <Form.Label>Bagagem:</Form.Label>
                        <Form.Control isInvalid={errors.bagagem} type="text" {...register('bagagem', classeValidator.bagagem)} />
                        {
                            errors.bagagem &&
                            <small className='text-danger'>{errors.bagagem.message}</small>
                        }
                    </Form.Group>


                    <div className='text-center'>
                        <Link className='btn btn-outline-warning' href="/classe">
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