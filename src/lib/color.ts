export function getRootColorCssVar(key: string): string{
    const rootStyles = getComputedStyle(document.documentElement)
    return  rootStyles.getPropertyValue(key).replace(/\s+/g, ',')
}
