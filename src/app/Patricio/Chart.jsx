import * as React from 'react';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import {Box,Card,CardContent,List,ListItem,IconButton} from "@mui/material";
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore  = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Pagina() {
  const [ramas, setRamas] = useState([]);
  const [estudianteId, setEstudianteId] = useState("64d320a00f480f1c4de9c6ec"); // ID del estudiante (cámbialo según tu lógica)
  const [ramasEstudiante, setRamasEstudiante] = useState([]); // IDs de las ramas registradas por el estudiante
  const [ramasRegistradas, setRamasRegistradas] = useState([]);
  const [ramasNoRegistradas, setRamasNoRegistradas] = useState([]);

  const handleExpandClick = (rama) => {
    let update = ramasRegistradas.map(item => {
      if(item == rama){
        return {...item, expandir: !item.expandir}
      }else{
        return item
      }
    })
    setRamasRegistradas(update);
  }
  const handleExpandClick1 = (rama) => {
    let update = ramasNoRegistradas.map(item => {
      if(item == rama){
        return {...item, expandir: !item.expandir}
      }else{
        return item
      }
    })
    setRamasNoRegistradas(update);
  }
  useEffect(() => {
    // Obtener información del estudiante y sus ramas registradas
    fetch(`http://localhost:3000/api1/estudiantes/${estudianteId}`)
      .then(response => response.json())
      .then(data => {
        setRamasEstudiante(data.ramaDeportiva); // Asignar las IDs de las ramas registradas por el estudiante
      })
      .catch(error => {
        console.error('Error al cargar las ramas del estudiante:', error);
      });

    // Obtener todas las ramas
    fetch('http://localhost:3000/api1/ramas')
      .then(response => response.json())
      .then(data => {
        setRamas(data);
      })
      .catch(error => {
        console.error('Error al cargar todas las ramas:', error);
      });
      //setRamasRegistradas(ramas.filter(rama => ramasEstudiante.includes(rama._id)));
      //setRamasNoRegistradas(ramas.filter(rama => !ramasEstudiante.includes(rama._id)));
  }, [estudianteId]);
  
  useEffect(() => {
    setRamasRegistradas(ramas.filter(rama => ramasEstudiante.includes(rama._id)));
    setRamasNoRegistradas(ramas.filter(rama => !ramasEstudiante.includes(rama._id)));
  }, [ramas, ramasEstudiante]);

  const editarEstudiante = async (accion, ramaId) => {
    try {
      const response = await fetch(`http://localhost:3000/api1/estudiantes/${estudianteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ accion, ramaId })
      });

      if (response.ok) {
        // Actualizar la lista de ramas del estudiante en el cliente
        if (accion === 'agregar') {
          setRamasEstudiante([...ramasEstudiante, ramaId]);
        } else if (accion === 'eliminar') {
          setRamasEstudiante(ramasEstudiante.filter(id => id !== ramaId));
        }
      } else {
        console.error('Error al editar el estudiante');
      }
    } catch (error) {
      console.error('Error al editar el estudiante:', error);
    }
  };

  const generateCardContent = (item, isRegistered) => {
    return (
      <>
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
          {item.nombre}
        </CardContent>
        <CardContent>
          <Typography variant="body2">
            {item.descripcion}
          </Typography>
        </CardContent>
        <Collapse in={item.expandir} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2">
              Ubicacion: {item.recinto}
            </Typography>
            <Typography variant="body2">
              Dia: {item.horario.dia}
            </Typography>
            <Typography variant="body2">
              Inicio: {item.horario.horaInicio}
            </Typography>
            <Typography variant="body2">
              Termina: {item.horario.horaSalida}
            </Typography>
          </CardContent>
        </Collapse>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Tooltip title={isRegistered ? 'Eliminar Solicitud' : 'Solicitar'} followCursor>
            <IconButton aria-label="" onClick={() => editarEstudiante(isRegistered ? 'eliminar' : 'agregar', item._id)}>
              {isRegistered ? (
                <RemoveCircleOutlineIcon sx={{ height: 38, width: 38 }} />
              ) : (
                <AddCircleOutlineIcon sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Ver más" followCursor>
            <ExpandMore
              expand={item.expandir}
              onClick={() => (isRegistered ? handleExpandClick(item) : handleExpandClick1(item))}
              aria-expanded={item.expandir}
              aria-label="mostrar descripcion"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Tooltip>
        </Box>
      </>
    );
  };

  return (
    <List sx={{ overflow: 'auto', paddingTop: '0' }}>
      {ramasRegistradas.slice(0).reverse().map((item, index) => (
        <ListItem sx={{ display: "block", paddingLeft: "0", paddingRight: "0", paddingTop: "0" }} key={index}>
          <Card>
            {generateCardContent(item, true)}
          </Card>
        </ListItem>
      ))}
      {ramasNoRegistradas.slice(0).reverse().map((item, index) => (
        <ListItem sx={{ display: "block", paddingLeft: "0", paddingRight: "0", paddingTop: "0" }} key={index}>
          <Card>
            {generateCardContent(item, false)}
          </Card>
        </ListItem>
      ))}
    </List>
  );
}
