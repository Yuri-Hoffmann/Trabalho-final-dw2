$(function() {
    $("#cpf").mask('000.000.000-00');

    $('#modalMsgRetorno').modal('show');
});

function validarFormulario() {
    let ret = true;
    let msgToast = document.getElementById('msgToast')
    msgToast.innerHTML = "";



    if (form.nome.value.trim() == "") {
        msgToast.innerHTML = "Informar o nome <br>";
        form.nome.focus();
        ret = false;
    }

    if (form.cpf.value.trim() == "") {
        msgToast.innerHTML = msgToast.innerHTML + "Informar o CPF <br>";
        form.cpf.focus();
        ret = false;
    }

    if (form.idade.value.trim() == "") {
        msgToast.innerHTML = msgToast.innerHTML + "Informar a Idade <br>";
        form.idade.focus();
        ret = false;
    }

    if ((form.email.value.indexOf(".") == -1) ||
        (form.email.value.indexOf("@") == -1) ||
        (form.email.value.indexOf(".") - form.email.value.indexOf("@") == 1)) {
        msgToast.innerHTML = msgToast.innerHTML + "Informar um e-mail válido <br>";
        form.email.focus();
        ret = false;
    }

    if (form.nivel.selectedIndex < 1) {
        msgToast.innerHTML = msgToast.innerHTML + "Informar o Nivel <br>";
        form.nivel.focus();
        ret = false;
    }

    if (form.sexo.selectedIndex < 1) {
        msgToast.innerHTML = msgToast.innerHTML + "Informar o Sexo";
        form.sexo.focus();
        ret = false;
    }

    if (!ret) {
        let toastLive = document.getElementById('liveToast')
        let toast = new bootstrap.Toast(toastLive)
        toast.show()
    }

    return ret;
}

function apresentarMensagem(mensagem) {
    alert(mensagem);
}