
import { methodBody } from "./crud.method.mjs"

export const getFunction = async(url) =>{

    try {
        
        return (
            fetch(url)
            .then( res => res.json() )
        )

    } catch (err) {
        console.error(err)
    }

}

export const postFunction = async(url, charName, charLevel) =>{

    let data = methodBody('POST', charName, charLevel)

    try {
        
        await fetch(url, data)

    } catch (err) {
        console.log(err)
    }

}
