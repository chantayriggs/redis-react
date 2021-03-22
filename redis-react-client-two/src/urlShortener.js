import React, { useState } from 'react'
import axios from "axios"

const URLShortener = () => {

    const [ userURL, setUserURL ] = useState("")
    const [ shortenedUrl, setShortenedUrl ] = useState(null)
    const [ stayingURL, setStayingURL ] = useState(null)

    const handleUrlChange = event => {
        setUserURL(event.target.value)
    }


    const handleSubmit = event => {
        event.preventDefault()
        let obj = {
            "long": userURL
        }
        axios.post("http://localhost:5000/link/add", obj)
        axios.get("http://localhost:5000/links")
             .then( response => {
                Object.entries(response.data).map( item => {
                    if (item[1] === userURL) {
                        setStayingURL(userURL)
                        setShortenedUrl(item[0])
                    } 
                })
             })
             .catch( error => console.log(error))

        setUserURL("")
    }


    return (
        <div className="container">
            <div className="content-wrapper">
                <div className="header">Add a URL to shorten:</div>
                <form onSubmit={handleSubmit}> 
                    <input type="text" onChange={handleUrlChange} value={userURL} />
                    <button type="submit">Shorten URL</button>
                </form>
                {
                    shortenedUrl === null ? null :
                    <div>
                        <h2>Your shortened URL is</h2> 
                        <a target="_blank" href={stayingURL} className='link'>{ `localhost:5000/${shortenedUrl}` }</a>
                    </div>
                    
                }
            </div>
        </div>
    )
}

export default URLShortener