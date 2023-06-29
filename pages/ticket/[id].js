import Head from 'next/head'
import React from 'react'
import { FaPlane } from "react-icons/fa";
import Ticket from '../../Components/Ticket';


const ticket = ({id}) => {
    console.log(id)
    return (
        <>
           <Ticket ticketid={id}></Ticket>
        </>
    )
}

export default ticket

export async function getServerSideProps(context) {
    const id = context.params.id
    
    return {
        props: { id },
    }
}