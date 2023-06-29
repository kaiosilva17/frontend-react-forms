import Pagina from '../../Components/Pagina'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { set } from 'react-hook-form'
import { BsTrash, BsFillPlusCircleFill } from 'react-icons/bs'
import { HiPencil } from 'react-icons/hi'
import { MdAirplaneTicket } from 'react-icons/md'


const index = () => {

  const [passagens, setPassagens] = useState([])

  useEffect(() => {
    setPassagens(getAll())
  }, [])

  function getAll() {
    return JSON.parse(window.localStorage.getItem('passagens')) || []
  }

  function excluir(id) {
    if (confirm('Deseja realmente excluir o resgistro?')) {
      const items = getAll()
      items.splice(id, 1)
      window.localStorage.setItem('passagens', JSON.stringify(items))
      setPassagens(items)
    }
  }

  return (
    <>
      <Pagina titulo='Passagem' typeNavBar="usuario">

        <Link href='/passagem/form' style={{ background: '#4300d2', color: 'white' }} className='mb-2 btn '>
          <BsFillPlusCircleFill className='me-2' />
          Novo
        </Link>

        <Table variant='dark' striped bordered hover>
          <thead>
            <tr style={{ color: '#9400D3' }}>
              <th>Opções</th>
              <th>Nome</th>
              <th>Orgm</th>
              <th>sgl orgm</th>
              <th>Dstno</th>
              <th>sgl dstno</th>
              <th>Cmpnhia aer</th>
              <th>id_voo</th>
              <th>clss</th>
              <th>H embarque</th>
              <th>H chegada</th>
              <th>pt</th>
              <th>dt</th>
              <th>assento</th>
            </tr>
          </thead>
          <tbody>
            {passagens.map((item, i) => (
              <tr key={i}>
                <td>
                  <Link href={'/passagem/' + i}>
                    <HiPencil title='alterar' className='text-primary' />
                  </Link>
                  {''}
                  <BsTrash title='excluir' onClick={() => excluir(i)} className='text-info' />
                  <Link href={'/ticket/' + i}>
                    <MdAirplaneTicket title='ticket' className='text-warning' />
                  </Link>
                </td>
                <td>{item.nome2}</td>
                <td>{item.origem}</td>
                <td>{item.sigla_origem}</td>
                <td>{item.destino}</td>
                <td>{item.sigla_destino}</td>
                <td>{item.companhia_aerea}</td>
                <td>{item.nome_id}</td>
                <td>{item.nome}</td>
                <td>{item.horario_embarque}</td>
                <td>{item.horario_chegada}</td>
                <td>{item.portao}</td>
                <td>{item.data}</td>
                <td>{item.assento}</td>
              </tr>
            ))}
          </tbody>

        </Table>

      </Pagina>
    </>
  )
}

export default index