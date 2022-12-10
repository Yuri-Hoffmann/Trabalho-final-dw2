function confirmarExclusao(id) {
    if (confirm("Você realmente deseja excluir o registro?")) {
        window.location.href = "/excluir/" + id;
    }
}