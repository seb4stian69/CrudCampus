/* + ----------------------- + Imports + ----------------------- + */

import {getFunction,postFunction, putFunction,deleteFunction, getFunctionById} from '../Controller/crud.data.mjs'
import {url} from '../../../config.js'

/* + ----------------------- + Container global + ----------------------- + */

const root = document.getElementById('root')

/* + ----------------------- + Elementos HTML + ----------------------- + */

const h1 = document.createElement('h1')

const inputName = document.createElement('input')
const inputLevel = document.createElement('input')
const buttonSend = document.createElement('button')

const buttonCancel = document.createElement('button')

const table = document.createElement('table') // Contenedores principales
const tbody = document.createElement('tbody') // Contenedores principales

const tr = document.createElement('tr') // Cabecera de la tabla

const thName = document.createElement('th') // Cabecera de la tabla
const thLevel = document.createElement('th') // Cabecera de la tabla
const thActions = document.createElement('th') // Cabecera de la tabla

/* + ----------------------- + Añadiendo texto a los elementos HTML + ----------------------- + */

h1.innerHTML = "CRUD About characters of Naruto Shippuden"

inputName.placeholder = "Put a name of character"
inputLevel.placeholder = "Put a level of character"
buttonSend.innerHTML = "Send"
buttonCancel.innerHTML = "Cancel update"
buttonCancel.style.display = 'none'

thName.innerHTML = 'Name'
thLevel.innerHTML = 'Level'
thActions.innerHTML = 'Actions'

tr.append(thName,thLevel,thActions)
tbody.append(tr)

table.append(tbody)

/* + ----------------------- + Events Listeners + ----------------------- + */

buttonCancel.addEventListener('click', ()=>{

    buttonSend.innerHTML = 'Send'
    inputName.value = ''
    inputLevel.value = ''
    buttonCancel.style.display = 'none'

})

buttonSend.addEventListener('click', async() => {

    if(inputName.value.trim() === '' && inputLevel.value.trim() === ''){

        alert("Rellena los campos con valores")
        inputName.value = ''
        inputLevel.value = ''
        inputName.focus()

    } else {

        (buttonSend.innerHTML === 'Send') ? 
            await postFunction(url, inputName.value, inputLevel.value) : 
            await putFunction(url, sessionStorage.getItem('id') ,inputName.value, inputLevel.value)

    }

})

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

            sessionStorage.setItem('id', btnDelete.value )

            let dataFind = await getFunctionById(url,btnUpdate.value)

            inputName.value = dataFind.name
            inputLevel.value = dataFind.level

            buttonCancel.style.display = 'inline'
            buttonSend.innerHTML = 'Update'
        
        })

        btnDelete.addEventListener('click', async ()=>{

            let dataFind = await getFunctionById(url,btnUpdate.value)

            if (confirm("Are you sure to delete it?")) { await deleteFunction(url, dataFind.id) }
        
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

export const launchViews = () =>{
    updateTable()
    root.append(h1,inputName,inputLevel,buttonSend,buttonCancel,table)
}
