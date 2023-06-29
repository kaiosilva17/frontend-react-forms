import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { set } from 'react-hook-form'
import { BsTrash, BsFillPlusCircleFill } from 'react-icons/bs'
import { HiPencil } from 'react-icons/hi'


const index = () => {

  const [aeroportos, setAeroportos] = useState([])

  useEffect(() => {
    setAeroportos(getAll())
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('aeroportos')) || []
  }

  function excluir(id) {
    if (confirm('Deseja realmente excluir o resgistro?')) {
      const items = getAll()
      items.splice(id, 1)
      window.localStorage.setItem('aeroportos', JSON.stringify(items))
      setAeroportos(items)
    }
  }

  return (
    <>
      <Pagina titulo='Aeroporto' typeNavBar="adm">

        <Link href='/aeroporto/form' style={{background:'#4300d2', color:'white'}}className='mb-2 btn '>
          <BsFillPlusCircleFill className='me-2' />
          Novo
        </Link>

        <Table variant='dark' striped bordered hover>
          <thead>
            <tr style={{color: '#9400D3'}}>
            <th>Opções</th>
              <th>Nome</th>
              <th>Sigla</th>
              <th>Estado</th>              
            </tr>
          </thead>
          <tbody>
            {aeroportos.map((item, i) => (
              <tr key={i}>
                <td>
                  <Link href={'/aeroporto/' + i}>
                    <HiPencil title='alterar' className='text-primary' />
                  </Link>
                  {''}
                  <BsTrash title='excluir' onClick={() => excluir(i)} className='text-info' />
                </td>
                <td>{item.nome}</td>
                <td>{item.sigla}</td>
                <td>{item.estado}</td>
               
              </tr>
            ))}
          </tbody>

        </Table>

      </Pagina>
    </>
  )
}

export default index