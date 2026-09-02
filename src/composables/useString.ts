export const camelCaseToTitleCase = (camelcase: string): string => {
    const spaces = camelcase.replace(/([A-Z])/g, " $1")
    return spaces.charAt(0).toUpperCase() + spaces.slice(1)
}
