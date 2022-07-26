import { toJS } from "mobx";
import { useContext, useEffect, useState } from "react";
import { Context } from "../index";

export const useRoles = (permission: string) => {
    const [hasRole, setHasRole] = useState<boolean>(false)
    const { user } = useContext(Context)

    const checkHasRole = () => {
        const isHasRole = toJS(user.data.roles).some(({ value }: any) => {
            return value.toUpperCase() === permission.toUpperCase()
        })
        setHasRole(isHasRole)
    }

    useEffect(() => {
        checkHasRole()
    }, [])

    return [hasRole]
}