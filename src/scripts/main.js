
document.addEventListener('DOMContentLoaded', function(){
    console.log('iniciou');
    document.getElementById('form-sorteador').addEventListener('submimt',function(e){
        e.preventDefault()
        console.log('ahah')
        let numeroMaximo = document.querySelector('#numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroaleatorio = Math.random() * numeroMaximo;

        document.getElementById('resultado-valor').innerHTML = numeroaleatorio
    })
});