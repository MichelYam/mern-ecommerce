import React from 'react'
import { BsTelephone } from "react-icons/bs"
import Nav from '../Nav'
const index = () => {
    return (
        <header  >
            {/* <div>

                <BsTelephone />
                <div>
                    <p>
                        Get 50% Off on Selected Items
                    </p>
                    <p>
                        Shop Now
                    </p>
                </div>
                <select name="" id="">
                    <option value="eng">Eng</option>
                    <option value="fr">Fr</option>
                </select>
                <select name="" id="">
                    <option selected={true} disabled={true}>location</option>
                    <option value=""></option>
                </select>
            </div> */}
            <Nav />
        </header >
    )
}

export default index