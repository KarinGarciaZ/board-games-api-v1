const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const pendientesPorHacer = [
    {id: 1, descripcion: "Comprar comida", completado: true},
    {id: 2, descripcion: "Preparar comida", completado: false},
    {id: 3, descripcion: "Pasear al perro", completado: true},
    {id: 4, descripcion: "Estudiar React y VueJS", completado: false},
    {id: 5, descripcion: "Terminar series pendientes", completado: false},
    {id: 6, descripcion: "Reparar el celular", completado: true}
]; 

const encontrarPendiente = (id) => pendientesPorHacer.find((dato) => dato.id == id);

const encontrarIndexDePendiente = (id) => {
    return pendientesPorHacer.findIndex((dato) => {
        return dato.id == id;
    });
};

app.get('/', (req, res) => {
  return res.status(200).json(pendientesPorHacer);
});

app.get('/count', (req, res) => {
    const count = pendientesPorHacer.length;
    res.status(200).json({count});
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const pendiente = encontrarPendiente(id);
    if(!pendiente) {
        return res.status(404).json({mensaje: 'no se encontraron resultados'});
    } else {
        const respuesta = {pendiente}
        return res.status(200).json(respuesta);
    }
});

app.post('/', (req, res) => {
    const body = req.body;
    const pendientesCount = pendientesPorHacer.length;
    const newId = pendientesPorHacer[pendientesCount - 1].id + 1;
    const nuevoPendiente = {...body, id: newId};
    pendientesPorHacer.push(nuevoPendiente);
    return res.status(201).send('OK');
});

app.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const pendientesIndex = encontrarIndexDePendiente(id);
    const pendiente = pendientesPorHacer[pendientesIndex];
    pendientesPorHacer[pendientesIndex] = { ...pendiente, ...body };
    return res.status(201).send();
});

app.patch('/:id', (req, res) => {
    const id = req.params.id;
    const pendientesIndex = encontrarIndexDePendiente(id);
    const pendiente = pendientesPorHacer[pendientesIndex];
    pendientesPorHacer[pendientesIndex].completado = !pendiente.completado;
    return res.status(201).send();
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    const pendientesIndex = encontrarIndexDePendiente(id);
    pendientesPorHacer.splice(pendientesIndex, 1);
    return res.status(200).send();
});

const port = 3000;
const host = '127.0.0.1';


app.listen(port, host, () => {
  console.log('¡Escuchando en puerto 3000!');
});
