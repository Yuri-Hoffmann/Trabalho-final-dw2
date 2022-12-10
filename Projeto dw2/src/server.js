const express = require("express");
const app = express();

/**
 * Colocar servidor no ar
 * process.env.PORT     -> Variável de ambiente.
 */
const PORTA = process.env.PORT || 8081;
app.listen(PORTA, function () {
  console.log("Servidor rodando na porta 8081");
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

const pool = require("./dao/conexao");

app.get("/listar", function (req, res) {
  pool
    .query(
      `SELECT id, nome, cpf, idade, email, nivel, sexo
                 FROM Registro ORDER BY ID ASC`
    )
    .then(function (resultado) {
      resultado.rows.forEach(function (row) {
        console.log(row.nome, row.cpf);
      });
      let listaCompleta = resultado.rows;
      res.render("listar", { listaCompleta });
    })
    .catch(function (erro) {
      console.log(erro.stack);
      //  res.render('lista');
    });
});
app.post("/cadastro-album", function (req, res) {
  pool
    .query(
      `
                INSERT INTO Registro 
		            (nome, cpf, idade, email,nivel,sexo) 
	            VALUES
                    ($1, $2, $3, $4, $5, $6)`,
      [
        req.body.nome,
        req.body.cpf,
        req.body.idade,
        req.body.email,
        req.body.nivel,
        req.body.sexo,
      ]
    )
    .then(function (retorno) {
      console.log("Cadastro realizado com sucesso!");
      let mensagem = "Cadastro realizado com sucesso!";
      res.render("form-album", { mensagem });
    })
    .catch(function (erro) {
      console.log("Apresentou erro: " + erro);
      let mensagem = "Ops! Tivemos problemas com esta solicitação";
      res.render("form-album", { mensagem });
    });
});

/**
 * caminhos estaticos
 * ./           -> indica o diretório raiz do projeto
 * __dirname    -> retorna o diretório do arquivo que está sendo executado, no caso, o server.js
 */
app.use("/bscss", express.static("./node_modules/bootstrap/dist/css"));
app.use("/bsjs", express.static("./node_modules/bootstrap/dist/js"));
app.use("/popperjs", express.static("./node_modules/@popperjs/core/dist/umd"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/mask", express.static("./node_modules/jquery-mask-plugin/dist"));
app.use("/publico", express.static(__dirname + "/publico"));

/**
 * Requisições
 */
app.get("/", function (req, res) {
  res.render("inicio");
});

app.get("/form-album", function (req, res) {
  res.render("form-album");
});

app.get("/solicita-alterar/:id", function (req, res) {
  const { id } = req.params;
  pool
    .query(
      `SELECT id, nome, cpf, idade, email, nivel, sexo
                 FROM Registro WHERE ID = ${id}`
    )
    .then(function (resultado) {
      let jogador = resultado.rows[0];

      res.render("form-album", { jogador });
    })
    .catch(function (erro) {
      console.log(erro.stack);
      //res.render('lista');
    });
});

app.post("/alterar/:id", function (req, res) {
  const { id } = req.params;
  pool
    .query(
      `
                UPDATE Registro SET
		            nome = '${req.body.nome}',
                    cpf = '${req.body.cpf}',
                    idade = '${req.body.idade}',
                    email = '${req.body.email}',
                    nivel = ${req.body.nivel},
                    sexo = ${req.body.sexo}
	            WHERE 
                    ID = ${id}`
    )
    .then(function (retorno) {
      throw "erro";
    })
    //TRATAR ERROS NA CAMADA VISUAL
    .catch(function (erro) {
      console.log("Apresentou erro: " + erro);
      res.redirect(`/solicita-alterar/${id}`);
    });
});

app.get("/excluir/:id", function (req, res) {
  const { id } = req.params;
  pool
    .query(
      `
                DELETE FROM Registro 
	            WHERE 
                    ID = ${id}`
    )
    .then(function (retorno) {
      console.log("Jogador morto com sucesso!");
      //throw "erro"
      res.redirect("/listar");
    })
    //TRATAR ERROS NA CAMADA VISUAL
    .catch(function (erro) {
      console.log("Apresentou erro: " + erro);
      res.redirect("/listar");
    });
});
