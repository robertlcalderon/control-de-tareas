const express=require('express');
const router=express.Router();
const pool=require('../database');



router.get('/add', (req, res) => {
  res.render('./links/add');
});

//AGREGAR TAREA
router.post('/add', async (req, res) => {
  const {id, nombre, tarea, fecha, estado, observacion} = req.body;
    const newLink = {
      id,
      nombre,
      tarea,
      fecha,
      estado,
      observacion
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success','Tarea guardada correctamente');
    res.redirect('/links/list');
});

//Enlistar tarea

router.get('/list', async (req, res) => {
  const links=await pool.query('SELECT * FROM links')
  res.render('./links/list', {links});
});


//eliminar tarea
router.get('/delete/:id', async(req, res) => {
  const { id }= req.params;
  await pool.query('DELETE FROM links WHERE ID = ?', [id]);
  req.flash('success','Tarea Removida');
  res.redirect('/links/list')
});

//editar tarea
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
  res.render('./links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const {nombre, tarea, fecha, estado, observacion} = req.body; 
  const newLink = {
    nombre,
    tarea,
    fecha,
    estado,
    observacion
  };
  await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
  req.flash('success', 'La tarea a sido actualizada');
  res.redirect('/');
});

module.exports= router;