import { toJS } from "mobx";
import { useContext, useEffect, useState } from "react";
import { Context } from "../index";

export const useRoles = (permission: string) => {
    const [hasRole, setHasRole] = useState<boolean>(false)
    const { user } = useContext(Context)

    const checkHasRole = () => {
        const roles = toJS(user.data.roles)
        if (!roles) return;

        const isHasRole = roles.some(({ value }: any) => {
            return value.toUpperCase() === permission.toUpperCase()
        })

        setHasRole(isHasRole)
    }

    useEffect(() => {
        checkHasRole()
    }, [])

    return [hasRole]
}