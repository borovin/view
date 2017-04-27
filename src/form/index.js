const Block = require('../block');
const template = require('./template');
const qs = require('query-string');

class Form extends Block {
    static get tagName() {
        return 'b-form';
    }

    static get properties() {
        return {
            action: document.location.pathname
        }
    }

    get template() {
        return template(this);
    }

    get errors() {
        return this._errors;
    }

    set errors(value) {
        this._errors = value;
        this.render();
    }

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submit();
        });
    }

    serialize() {
        const formElement = this;
        const data = {};

        formElement.querySelectorAll('[name]').forEach(inputElement => {
            const inputName = inputElement.name;
            let inputValue = inputElement.value;

            if (inputValue && isFinite(inputValue)) {
                inputValue = Number(inputValue);
            }

            switch (inputElement.type) {
                case 'radio': {
                    const property = get(data, inputName);
                    if (typeof property === 'undefined' || property === false) {
                        data[inputName] = inputElement.checked ? inputValue : false;
                    }
                    break;
                }
                case 'checkbox': {
                    data[inputName] = inputElement.checked;
                    break;
                }
                default: {
                    data[inputName] = inputValue;
                }
            }
        });

        return data;
    }

    submit() {
        const data = this.serialize();
        const errors = this.validate(data);

        if (!errors) {
            return this.save(data);
        } else {
            this.errors = errors;
            return errors;
        }
    }

    validate() {
    }

    save(data) {
        document.location.href = `${this.action}?${qs.stringify(data)}`
    }
}

window.customElements.define(Form.tagName, Form);

module.exports = Form;