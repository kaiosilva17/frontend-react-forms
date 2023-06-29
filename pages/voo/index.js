import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { set } from 'react-hook-form'
import { BsTrash, BsFillPlusCircleFill } from 'react-icons/bs'
import { HiPencil } from 'react-icons/hi'


const index = () => {

  const [voos, setVoos] = useState([])

  useEffect(() => {
    setVoos(getAll())
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('voos')) || []
  }

  function excluir(id) {
    if (confirm('Deseja realmente excluir o resgistro?')) {
      const items = getAll()
      items.splice(id, 1)
      window.localStorage.setItem('voos', JSON.stringify(items))
      setVoos(items)
    }
  }

  return (
    <>
      <Pagina titulo='Voo' typeNavBar="adm">

        <Link href='/voo/form' style={{background:'#4300d2', color:'white'}}className='mb-2 btn '>
          <BsFillPlusCircleFill className='me-2' />
          Novo
        </Link>

        <Table variant='dark'striped bordered hover>
          <thead>
            <tr style={{color: '#9400D3'}}>
              <th>Opções</th>
              <th>Companhia</th>
              <th>Nome_ID</th>
              <th>Origem</th>
              <th>Sigla O.</th>
              <th>Destino</th>
              <th>Sigla D.</th>
              <th>Classe</th>
              <th>Hrio Embarque</th>
              <th>Hrio Chegada</th>
              <th>Portão</th>
              <th>Dt</th>
            </tr>
          </thead>
          <tbody>
            {voos.map((item, i) => (
              <tr key={i}>
                <td>
                  <Link href={'/voo/' + i}>
                    <HiPencil title='alterar' className='text-primary' />
                  </Link>
                  {''}
                  <BsTrash title='excluir' onClick={() => excluir(i)} className='text-info' />
                </td>
                <td>{item.companhia_aerea}</td>
                <td>{item.nome_id}</td>
                <td>{item.origem}</td>
                <td>{item.sigla_origem}</td>
                <td>{item.destino}</td>
                <td>{item.sigla_destino}</td>
                <td>{item.nome}</td>
                <td>{item.horario_embarque}</td>
                <td>{item.horario_chegada}</td>
                <td>{item.portao}</td>  
                <td>{item.data}</td>              
              </tr>
            ))}
          </tbody>

        </Table>

      </Pagina>
    </>
  )
}

export default index