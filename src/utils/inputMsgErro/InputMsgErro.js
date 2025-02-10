export default function InputMsgErro(id, erro, msg) { 
    const input = document.getElementById(id);
    if (!input) return;  // Garante que o elemento existe antes de tentar modificar

    if (erro === true) {
        input.style?.setProperty('border', '1px solid red');
        input.style?.setProperty('outline', '3px solid rgba(255, 0, 0, 0.3)');
        input.focus();
        return msg;
    } 
    
    if (erro === 'sucesso') {
        input.style?.setProperty('border', '1px solid green');
        input.style?.setProperty('outline', '3px solid rgba(0, 255, 0, 0.3)');

        setTimeout(() => {
            input.style?.removeProperty('border');
            input.style?.removeProperty('outline');
        }, 4000);
        
        return msg;
    }

    // Se erro for falso ou outro valor, limpa os estilos
    input.style?.removeProperty('border');
    input.style?.removeProperty('outline');
}
