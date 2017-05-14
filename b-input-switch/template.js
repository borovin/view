import stringifyAttributes from '../utils/stringifyAttributes'

export default block => {
  const inputAttributes = stringifyAttributes({
    name: block.name,
    disabled: block.disabled,
    type: 'checkbox',
    checked: block.getAttribute('checked')
  })

  return `
        <label>

            <input ${inputAttributes} />
    
            <b-input-switch--icon></b-input-switch--icon>
    
            ${block.label ? `<b-input-switch--text>${block.label}</b-input-switch--text>` : ''}
    
        </label>
    `
}
