import { useState, useEffect } from 'react';

export function useRoles() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Здесь будет логика получения роли пользователя
        // Например, из localStorage или API запроса
        const storedRole = localStorage.getItem('currentUserRole');
        setRole(storedRole);
    }, []);

    return role;
}
