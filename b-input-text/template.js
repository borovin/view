import stringifyAttributes from '../utils/stringifyAttributes'

export default block => {
  const label = block.label ? `<b-input-text--label>${block.label}</b-input-text--label>` : ''

  const inputAttributes = stringifyAttributes({
    value: block.value,
    type: block.type,
    placeholder: block.placeholder,
    name: block.name,
    autofocus: block.autofocus
  })

  return `
        <input ${inputAttributes} />
        
        <b-input-text--border></b-input-text--border>
        
        ${label}
    `
}
