export default function InputMsgErro(id, erro, msg) {

    const input = document.getElementById(id);
    if (input) {
        if (erro === true) {
            input.style.border = '1px solid red';
            input.style.outline = '3px solid rgba(255, 0, 0, 0.3)';
            input.focus()
            return msg
        } else if (erro === 'sucesso') {
            input.style.border = '1px solid green';
            input.style.outline = '3px solid rgba(0, 255, 0, 0.3)';

            setTimeout(() => {
                input.style.border = '';
                input.style.outline = '';
            }, 4000); 
            return msg
        }
    } else {
        input.style.border = '';
        input.style.outline = '';
    }

}