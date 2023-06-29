import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { set } from 'react-hook-form'
import { BsTrash, BsFillPlusCircleFill } from 'react-icons/bs'
import { HiPencil } from 'react-icons/hi'


const index = () => {

  const [cadastros, setCadastros] = useState([])

  useEffect(() => {
    setCadastros(getAll())
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('cadastros')) || []
  }

  function excluir(id) {
    if (confirm('Deseja realmente excluir o resgistro?')) {
      const items = getAll()
      items.splice(id, 1)
      window.localStorage.setItem('cadastros', JSON.stringify(items))
      setCadastros(items)
    }
  }

  return (
    <>
      <Pagina titulo='Cadastro' typeNavBar="usuario">

        <Link href='/cadastro/form' style={{background:'#4300d2', color:'white'}}className='mb-2 btn '>
          <BsFillPlusCircleFill className='me-2' />
          Novo
        </Link>

        <Table variant='dark' striped bordered hover>
          <thead>
            <tr style={{color: '#9400D3'}}>
              <th>Opções</th>
              <th>Usuário</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Data_de_Nascimento</th>
            </tr>
          </thead>
          <tbody>
            {cadastros.map((item, i) => (
              <tr key={i}>
                <td>
                  <Link href={'/cadastro/' + i}>
                    <HiPencil title='alterar' className='text-primary' />
                  </Link>
                  {''}
                  <BsTrash title='excluir' onClick={() => excluir(i)} className='text-info' />
                </td>
                <td>{item.nome}</td>
                <td>{item.cpf}</td>
                <td>{item.email}</td>
                <td>{item.telefone}</td>
                <td>{item.data_de_nascimento}</td>
              </tr>
            ))}
          </tbody>

        </Table>

      </Pagina>
    </>
  )
}

export default index