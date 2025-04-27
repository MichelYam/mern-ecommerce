import React, { useEffect } from 'react'
import { BsTelephone } from "react-icons/bs"
import Nav from '../Nav'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setUser } from '../../redux/features/userSlice'
// import { useGetUserQuery } from '../../redux/api/api'
import { useGetUserQuery } from '../../redux/api/userApi'

const Index = () => {
    const dispatch = useAppDispatch()
    // const { userInfo } = useAppSelector((state) => state.user)
    const { data: user, isFetching } = useGetUserQuery('userDetails')

    useEffect(() => {
        if (user) dispatch(setUser(user))
    }, [user, dispatch])

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

export default Index