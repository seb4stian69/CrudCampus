export const methodBody = (method, charName, charLevel) =>{

    return {

        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: charName || '',
            level: charLevel || ''
        })

    }

}