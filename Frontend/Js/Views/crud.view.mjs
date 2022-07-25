/* + ----------------------- + Imports + ----------------------- + */

import {getFunction} from '../Controller/crud.data.mjs'
import {url} from '../../../config.js'

/* + ----------------------- + Container global + ----------------------- + */

const root = document.getElementById('root')

/* + ----------------------- + Elementos HTML + ----------------------- + */

const table = document.createElement('table') // Contenedores principales
const caption = document.createElement('caption') // Contenedores principales
const tbody = document.createElement('tbody') // Contenedores principales

const tr = document.createElement('tr') // Cabecera de la tabla

const thName = document.createElement('th') // Cabecera de la tabla
const thLevel = document.createElement('th') // Cabecera de la tabla
const thActions = document.createElement('th') // Cabecera de la tabla

/* + ----------------------- + Añadiendo texto a los elementos HTML + ----------------------- + */

caption.innerHTML ='Table of characters of naruto shipudden'
thName.innerHTML = 'Name'
thLevel.innerHTML = 'Level'
thActions.innerHTML = 'Actions'

table.append(caption)

tr.append(thName,thLevel,thActions)
tbody.append(tr)

table.append(tbody)

/* + ----------------------- + Funciones internas del crud + ----------------------- + */

const updateTable = async () =>{

    const res = await getFunction(url)
    
    for (let index in res){
        
        let data = res[index]

        const btnUpdate = document.createElement('button')
        const btnDelete = document.createElement('button')

        btnUpdate.innerHTML = 'Update'
        btnDelete.innerHTML = 'Delete'

        btnDelete.value = data.id
        btnUpdate.value = data.id

        btnUpdate.addEventListener('click', async ()=>{

            alert(`Hola mundo: ${btnUpdate.value}`)
        
        })

        btnDelete.addEventListener('click', async ()=>{

            alert(`Chao mundo: ${btnDelete.value}`)
        
        })

        const trIterated = document.createElement('tr') 

        const tdName = document.createElement('td')
        const tdLevel = document.createElement('td')
        const tdActions = document.createElement('td')

        tdName.innerHTML = data.name
        tdLevel.innerHTML = data.level

        tdActions.append(btnUpdate,btnDelete)

        trIterated.append(tdName,tdLevel,tdActions)

        table.appendChild(trIterated)

    }


}

/* + ----------------------- + Main launch + ----------------------- + */

export const seeTable = () =>{
    updateTable()
    root.append(table)
}
