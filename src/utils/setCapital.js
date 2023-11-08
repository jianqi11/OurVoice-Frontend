function capitalizeFirstLetter(fullName) {
    if (!fullName) {
        return ''
    }
    return fullName.charAt(0).toUpperCase() + fullName.slice(1).toLowerCase()
}

export { capitalizeFirstLetter }
