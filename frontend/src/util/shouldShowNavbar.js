const shouldShowNavbar = (currentPath, routes, userRole) => {

    if(!userRole) userRole = "ROLE_CUSTOMER";

    const pathToRegex = (path) => 
        new RegExp("^" + path.replace(/:\w+/g, "\\w+") + "$");

    return routes.some( route => (
            route.role === userRole || userRole === "ROLE_ADMIN" && 
            pathToRegex(route.path).test(currentPath)
        )
    )
}

export default shouldShowNavbar;