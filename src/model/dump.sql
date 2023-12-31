CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);


CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL
);


INSERT INTO categorias (descricao) VALUES
  ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games');


CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  quantidade_estoque INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  categoria_id INTEGER REFERENCES categorias(id)
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  cpf CHAR(11) UNIQUE NOT NULL,
  cep VARCHAR(8),
  rua VARCHAR(255),
  numero VARCHAR(20),
  bairro VARCHAR(255),
  cidade VARCHAR(255),
  estado VARCHAR(255)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER,
    observacao TEXT,
    valor_total INTEGER
);

CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER,
    produto_id INTEGER,
    quantidade_produto INTEGER,
    valor_produto INTEGER,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

ALTER TABLE produtos
ADD COLUMN produto_imagem TEXT;
