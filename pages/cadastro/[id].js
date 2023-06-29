import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { AiFillSave, AiOutlineDoubleLeft } from 'react-icons/ai'
import cadastroValidator from '../../validators/cadastroValidator'
import { mask } from 'remask'

const form = () => {

    const { push, query } = useRouter()
    const { register, handleSubmit, formState: {errors}, setValue } = useForm()

    useEffect(() => {

        if (query.id) {
            const id = query.id
            const cadastros = JSON.parse(window.localStorage.getItem('cadastros'))
            const cadastro = cadastros[id]

            for (let atributo in cadastro) {
                setValue(atributo, cadastro[atributo])
            }
        }
    }, [query.id])

    function salvar(dados) {
        console.log(dados)
        const cadastros = JSON.parse(window.localStorage.getItem('cadastros')) || []
        cadastros.splice(query.id, 1, dados)
        window.localStorage.setItem('cadastros', JSON.stringify(cadastros))
        push('/cadastro')
    }

    function handleChange(event) {
        const name = event.target.name
        const valor = event.target.value
        const mascara = event.target.getAttribute('mask')

        setValue(name, mask(valor, mascara))
    }

    return (
        <>
            <Pagina titulo='Cadastro' typeNavBar="usuario">
                <Form>
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Usuário:</Form.Label>
                        <Form.Control isInvalid={errors.nome} type="text" {...register('nome', cadastroValidator.nome)} />
                        {
                            errors.nome &&
                            <small className='text-danger'>{errors.nome.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cpf">
                        <Form.Label>CPF:</Form.Label>
                        <Form.Control
                            mask='999.999.999-99'
                            isInvalid={errors.cpf}
                            type="text"
                            {...register('cpf', cadastroValidator.cpf)}
                            onChange={handleChange} />
                        {
                            errors.cpf &&
                            <small className='text-danger'>{errors.cpf.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control isInvalid={errors.email} type="text" {...register('email', cadastroValidator.email)} />
                        {
                            errors.email &&
                            <small className='text-danger'>{errors.email.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="telefone">
                        <Form.Label>Telefone:</Form.Label>
                        <Form.Control
                            mask='(99) 99999-9999'
                            isInvalid={errors.telefone}
                            type="text"
                            {...register('telefone', cadastroValidator.telefone)}
                            onChange={handleChange} />
                        {
                            errors.telefone &&
                            <small className='text-danger'>{errors.telefone.message}</small>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="data_de_nascimento">
                        <Form.Label>Data de Nascimento:</Form.Label>
                        <Form.Control
                            mask='99/99/9999'
                            isInvalid={errors.data_de_nascimento}
                            type="text"
                            {...register('data_de_nascimento', cadastroValidator.data_de_nascimento)}
                            onChange={handleChange} />
                        {
                            errors.data_de_nascimento &&
                            <small className='text-danger'>{errors.data_de_nascimento.message}</small>
                        }
                    </Form.Group>


                    <div className='text-center'>
                        <Link className='btn btn-outline-warning' href="/cadastro">
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