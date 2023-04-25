/*Criando  e preenchendo um vetor*/
alunos = getAluno();
//alunos = getAluno();
// montarTabela();




function enviarAvaliacao(){

    /* Criando o objeto aluno,um objeto é uma varivel para o computador */
    const aluno = montAluno();

    let errosEncontrados = validarDados (aluno);
    if (errosEncontrados != ""){
        alert(errosEncontrados);
        return   
     }

    let media = caculoMedia(aluno);
    aluno.media = media;
    let resultado = montarResultado(media) ;
    aluno.resultado = resultado;

    
     
     addAluno(aluno);
     montarTabela();
     limparForm();
    
    
}

function montAluno () {
        const aluno = {
        idAluno: 0,
        nome: "",
        matricula: "",
        turma: "",
        avaliacao1: 0,
        avaliacao2: 0,
        media: 0,
        cepEnd: 0,
        logradouroEnd:"",
        numEnd: 0,
        bairroEnd: "",
        cidadeEnd: "",
        estadoEnd: "",
        resultado: ""
    
    }
        /*alert ("teste de função");*/
        aluno.nome = document.getElementById("nome").value;
        //aluno.matricula = document.getElementById("matricula").value;
        //aluno.turma = document.getElementById("turma").value;
        aluno.avaliacao1 =parseFloat(document.getElementById("avaliacao1").value);
        aluno.avaliacao2 =parseFloat(document.getElementById("avaliacao2").value);
        aluno.idAluno =parseFloat(document.getElementById("idAluno").value);

        aluno.cepEnd =parseFloat(document.getElementById("cep").value);
        aluno.logradouroEnd = document.getElementById("logradouro").value;
        aluno.numEnd =parseFloat(document.getElementById("numeEndereco").value);
        aluno.bairroEnd =document.getElementById("bairro").value;
        aluno.cidadeEnd =document.getElementById("cidade").value;
        aluno.estadoEnd =document.getElementById("estado").value;

        return aluno;
}

function validarDados (aluno = {}){

    let erros = "";
    if(aluno.none){
        erros += "Nome em branco.\n";
    }
    if (aluno.avaliacao1 < 0 || aluno.avaliacao1 > 10 || Number.isNaN(aluno.avaliacao1)) {
        erros += "O valor informado para a avaliação 1 está fora dos padrões esperados, favor informar um numero entre 0 e 10 \n" ;
    }
    if (aluno.avaliacao2 < 0 || aluno.avaliacao2 > 10 || Number.isNaN(aluno.avaliacao2)) {
       erros += "O valor informado para a avaliação 2 está fora dos padrões esperados, favor informar um numero entre 0 e 10 \n ";
        
    }
    if (aluno.idAluno = null ||Number.isNaN(aluno.idAluno))
    {
        aluno.idAluno = new Date().getTime();
        alert("Novo Aluno Matriculado " +aluno.idAluno );
        
    } else {
        aluno.idAluno = parseFloat(document.getElementById("idAluno").value)
    }
    return erros;
}

function caculoMedia(aluno) {
    return (aluno.avaliacao1 + aluno.avaliacao2) / 2 .toFixed(2);
}

function montarResultado (mediaAluno=0) {
    
    if (mediaAluno >=6) {
        return  "Aprovado" ;  
    } else if (mediaAluno >= 3 && mediaAluno < 6){
        return  "Recuperacao";
    }else {
        return "Reprovado";
    }

}

function montarTabela(){
    let dadosAlunos = getAluno();
    let saidaTexto = document.getElementById("saidaTexto");
    saidaTexto.innerHTML = "";
    for (let index = 0; index < dadosAlunos.length; index++){
       saidaTexto.innerHTML += `<tr>
       <td>${dadosAlunos[index].nome}</td>
       <td>${dadosAlunos[index].resultado}</td>
       <td>${dadosAlunos[index].media}</td>
       <td><i class="fa-solid fa-trash" onclick="deleteAluno(${index})"></i></td>
       <td><i class="fa-solid fa-pen-to-square" onclick="updateAluno(${index})"></i></td>
       <tr>`;
    }
      
}

function limparForm(){
    document.getElementById("myForm").reset();
}

function alteraBotao() {
    let titulobotao = document.getElementById("entrar").textContent;
    if (titulobotao != "Entrar"){
        document.getElementById("entrar").textContent = "Entrar";
    }
    if (document.getElementById("enderecoAluno").style.display = "block"){document.getElementById("enderecoAluno").style.display = "none";

    }
}

// Defini uma funcao como assincrona, ela espera a promessa do retorno


async function pesquisarCep () {
    let cep = document.getElementById("cep").value;
    let url = `http://viacep.com.br/ws/${cep}/json`; // modelo
    let dados = await fetch(url);
    let endereco = await dados.json();
    
    preencherEnderco (endereco);

    //fetch(url).then (console.log); // ferramenta do JS para retorno de promessas / retorno assíncrono
}

function preencherEnderco (endereco) {
    document.getElementById("logradouro").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade; 
    document.getElementById("estado").value = endereco.uf;
} 


function mostrarBotao() { // quero futuramente usar essa funcao para deixar mais prof o codg
    alert("testeok!")
    var display = document.getElementById(el).style.display;
    if(display == "none")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}



//CRUD

function addAluno (aluno = {}){

    alunos.push(aluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));

  
}

function getAluno () {
    let dadosAlunos = JSON.parse(localStorage.getItem("alunos"));
    //let resultado = [];
    if (dadosAlunos == null){
        dadosAlunos =[];
    }
    //for (let index = 0; index < dadosAlunos.length; index++)/*length seria o tanho do vetor */
    //{
       // let obj = dadosAlunos[index]; /* para acompanhar a criaçao do objeto */
       // resultado.push(obj); /*push e para passar dados pro vetor */
   // }
   // }   
    return dadosAlunos;

}


function deleteAluno(index = 0){
    let dadosAlunos = getAluno();
    let pergunta = ` Deseja remover o aluno ${dadosAlunos[index].nome}?`;
    if (confirm(pergunta)){
    dadosAlunos.splice(index, 1);
    localStorage.setItem("alunos", JSON.stringify(dadosAlunos));
    location.reload();
    montarTabela();
    }
    return dadosAlunos;
    
}

function updateAluno(index = 0) {
    let dadosAlunos = getAluno();
    let aluno = dadosAlunos[index];
    let pergunta = ` A edição irá apagar os dados do aluno ${dadosAlunos[index].nome}, não atualizar a pagina até terminar a alteração e cliclar no botão SALVAR`;
    let resultado = confirm(pergunta);
    if (resultado == true) {
        document.getElementById("nome").value = aluno.nome;
        document.getElementById("avaliacao1").value = aluno.avaliacao1;
        document.getElementById("avaliacao2").value = aluno.avaliacao2;
        document.getElementById("idAluno").value = aluno.idAluno;
        document.getElementById("cep").value = aluno.cepEnd;
        document.getElementById("logradouro").value = aluno.logradouroEnd;
        document.getElementById("numeEndereco").value = aluno.numEnd;
        document.getElementById("bairro").value = aluno.bairroEnd;
        document.getElementById("cidade").value = aluno.cidadeEnd; 
        document.getElementById("estado").value = aluno.estadoEnd;
        document.getElementById("entrar").textContent = "Salvar";
        document.getElementById("enderecoAluno").style.display = "block"; 
        dadosAlunos.splice(index, 1);
        alunos = dadosAlunos;
        localStorage.setItem("alunos", JSON.stringify(dadosAlunos));
        
    }
    else{
        alert("Melhor deixar quieto mesmo !");
    } 

}


