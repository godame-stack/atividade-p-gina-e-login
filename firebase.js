// 1. Suas credenciais reais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyASU2XPFrQAkrJr8EQ5zHyam-lu4ElXbxU",
  authDomain: "cadastro-10195.firebaseapp.com",
  projectId: "cadastro-10195",
  storageBucket: "cadastro-10195.firebasestorage.app",
  messagingSenderId: "134071854178",
  appId: "1:134071854178:web:626b7a06c3b3b83ad51d3b",
  measurementId: "G-TCXBCHEHYK"
};

// 2. Inicializando o Firebase com as suas configurações
firebase.initializeApp(firebaseConfig);

// 3. Função que será disparada pelo botão "Criar Conta" do seu HTML
function cadastrar() {
    // Pegando os valores direto dos IDs que você colocou no HTML
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const campoMensagem = document.getElementById('mensagem'); // Para mostrar avisos no seu <p>

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Verificação de campos vazios
    if (email === "" || senha === "") {
        campoMensagem.innerText = "Ops! Preencha o e-mail e a senha.";
        campoMensagem.style.color = "red";
        return; 
    }

    // Validação do formato do e-mail
    if (!regexEmail.test(email)) {
        campoMensagem.innerText = "Por favor, insira um e-mail válido.";
        campoMensagem.style.color = "red";
        return;
    }

    // A MÁGICA ACONTECE AQUI: Chamando o Firebase para cadastrar
    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            // Se deu tudo certo
            console.log("--- Novo Cadastro no Firebase ---");
            console.log("E-mail criado:", userCredential.user.email);
            
            campoMensagem.innerText = "Conta criada com sucesso! Redirecionando...";
            campoMensagem.style.color = "green";

            // Limpar campos
            document.getElementById('email').value = "";
            document.getElementById('senha').value = "";

            // Aguarda um pouquinho e redireciona (opcional)
            setTimeout(() => {
                window.location.href = "pagina-de-sucesso.html";
            }, 2000);
        })
        .catch((error) => {
            // Se deu algum erro (ex: e-mail já existe, senha muito curta)
            console.error("Erro do Firebase:", error);
            
            if (error.code === 'auth/email-already-in-use') {
                campoMensagem.innerText = "Esse e-mail já está cadastrado!";
            } else if (error.code === 'auth/weak-password') {
                campoMensagem.innerText = "A senha deve ter pelo menos 6 caracteres.";
            } else {
                campoMensagem.innerText = "Erro ao criar conta. Tente novamente.";
            }
            campoMensagem.style.color = "red";
        });
}
// 4. Função que será disparada pelo botão "Entrar" do seu HTML
function login() {
    // Pegando os valores digitados
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const campoMensagem = document.getElementById('mensagem');

    // Verificação simples: não deixa o usuário tentar logar com campos vazios
    if (email === "" || senha === "") {
        campoMensagem.innerText = "Por favor, preencha o e-mail e a senha para entrar.";
        campoMensagem.style.color = "red";
        return; 
    }

    campoMensagem.innerText = "Carregando...";
    campoMensagem.style.color = "blue";

    // O Firebase verifica se o e-mail e a senha batem com o banco de dados
    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            // Sucesso! O usuário existe e a senha está correta.
            console.log("--- Login Realizado ---");
            console.log("Bem-vindo de volta:", userCredential.user.email);
            
            campoMensagem.innerText = "Login realizado com sucesso! Entrando...";
            campoMensagem.style.color = "green";

window.location.href = "index.html";

            // Limpar campos
            document.getElementById('email').value = "";
            document.getElementById('senha').value = "";

            // Aguarda um pouquinho e redireciona para a página principal do seu sistema
            setTimeout(() => {
                // Altere "pagina-principal.html" para o nome do arquivo da sua página de destino
                window.location.href = "pagina-principal.html"; 
            }, 1500);
        })
        .catch((error) => {
            // Se deu erro (senha errada, usuário não existe, etc.)
            console.error("Erro ao fazer login:", error);
            
            // Tratando os erros de forma mais humana e simples para o usuário
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                campoMensagem.innerText = "E-mail ou senha incorretos. Tente novamente.";
            } else if (error.code === 'auth/invalid-email') {
                campoMensagem.innerText = "O formato do e-mail é inválido.";
            } else {
                // Mensagem genérica para outros erros
                campoMensagem.innerText = "Não foi possível entrar. Verifique seus dados."; 
            }
            campoMensagem.style.color = "red";
        });
}
