create database mini_insta;

create table if not exists usuarios (
	id serial primary key,
  username text not null unique,
  senha text not null,
  imagem text,
  nome text,
  site text,
  bio text,
  email text unique,
  telefone text,
  genero text,
  perfil_oficial boolean default false
);

create table postagens (
	id serial primary key,
  usuario_id int not null references usuarios(id),
  data timestamptz default now(),
  texto text
);

create table postagem_fotos (
	id serial primary key,
  postagem_id int not null references postagens(id),
  imagem text not null
);

create table postagem_comentarios (
	id serial primary key,
  usuario_id int not null references usuarios(id),
  postagem_id int not null references postagens(id),
  texto text not null,
  data timestamptz default now()
);

create table postagem_curtidas (
  usuario_id int not null references usuarios(id),
  postagem_id int not null references postagens(id),
  data timestamptz default now()
);

