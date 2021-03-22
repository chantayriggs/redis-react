import React, { useEffect, useState } from 'react'
import axios from "axios"

const AllLinks = () => {

    const [ allLinks, setAllLinks ] = useState(null)

    const hello = [1, 2, 3, 4, 5, 6]


    useEffect( () => {
        axios.get("http://localhost:5000/links")
             .then( response => {
                setAllLinks(Object.entries(response.data))
             })
             .catch( error => console.log(error))
    }, [])


    return (
        <div className="all-links">
            <div className="for-width">
                <h1>Your Links</h1>
                {
                    allLinks === null ? "Loading" :

                    <div> 

                        {
                            allLinks.map( link => (
                                <div className="link-list" key={link[0]}>
                                    <a target="_blank" href={link[1]} >http://localhost/{link[0]}</a>
                                </div>
                            ))
                        }

                    </div>
                }
            </div>
        </div>
    )
}

export default AllLinks