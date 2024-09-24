document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('form-sorteador').addEventListener('submimt',function(){
        let numeroMaximo = document.querySelector('#numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroaleatorio = Math.random() * numeroMaximo;

        document.getElementById('resultado-valor').innerHTML = numeroaleatorio
    })
});