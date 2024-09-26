
document.addEventListener('DOMContentLoaded', function(){
    
    document.getElementById('form-sorteador').addEventListener('submit',function(e){
        e.preventDefault()
        
        let numeroMaximo = document.querySelector('#numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);
        
        let paragrafoResultado = document.createElement('p');
        paragrafoResultado.classList.add('resultado');
        paragrafoResultado.innerHTML = 'O número sorteado foi: <span id="resultado-valor"></span>';

        let numeroaleatorio = Math.floor(Math.random() * numeroMaximo) +1 ;

        let container = document.querySelector('.container');
        container.appendChild(paragrafoResultado);

        document.getElementById('resultado-valor').innerHTML = numeroaleatorio;

    })
});