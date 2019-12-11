CREATE DATABASE tareasdb;

USE tareasdb;
CREATE TABLE usuario(
    id INT(4) PRIMARY KEY NOT NULL,
    nombre VARCHAR(25) NOT NULL,
    password VARCHAR(60) NOT NULL
);

INSERT INTO usuario(id, nombre, password) 
  VALUES (1, 'roberto', '1234');

SELECT * FROM usuario;

USE tareasdb;
CREATE TABLE links (
    id INT(4) PRIMARY KEY,
    nombre VARCHAR(25),
    tarea VARCHAR(30),
    fecha DATETIME,
    estado VARCHAR(10),
    asignado VARCHAR(25),
    observacion VARCHAR(60)
);



