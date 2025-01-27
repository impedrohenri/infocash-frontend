export default function InputMsgErro(id, erro, msg) {

    const input = document.getElementById(id);
    if (input) {
        if (erro) {
            input.style.border = '1px solid red';
            input.style.outline = '3px solid rgba(255, 0, 0, 0.3)';
            input.focus()
            return msg
        }
    } else {
        input.style.border = '';
        input.style.outline = '';
    }

}