# Iglesia Asamblea de Dios — Sitio Web

Sitio web institucional de la Iglesia **Asamblea de Dios**. Una plataforma informativa disenada para conectar a la comunidad con las actividades, horarios de culto, eventos y ensenanzas de la iglesia.

## Vista previa

El sitio es completamente estatico (HTML + CSS) y responsivo, adaptandose a dispositivos moviles, tablets y escritorio.

## Estructura del proyecto

```
├── src/
│   ├── img/
│   │   └── LogoAD.PNG       # Logotipo principal de la iglesia
│   ├── styles/
│   │   └── styles.css        # Estilos globales del sitio
│   └── index.html            # Pagina principal
└── README.md
```

## Caracteristicas

- **Diseno responsivo** — Adaptable a cualquier dispositivo mediante media queries.
- **Navegacion fluida** — Menu con anclaje suave a las secciones y menu hamburguesa en movil.
- **Secciones principales:**
  - Hero / Bienvenida — Portada con llamado a la accion.
  - Horarios de Culto — Tarjetas con los dias y horarios de reuniones.
  - Quienes Somos — Historia, mision y valores de la iglesia.
  - Pastores — Presentacion del liderazgo pastoral.
  - Eventos — Proximas actividades con fecha.
  - Contacto — Informacion de contacto y formulario.
  - Footer — Enlaces rapidos y redes sociales.
- **Paleta de colores** — Azul institucional (#1a3a5c) con detalles en dorado (#c9a84c).

## Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, variables, transiciones)
- Google Fonts (Playfair Display + Inter)

## Como usar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   ```
2. Abre `src/index.html` en tu navegador.

No requiere servidor ni dependencias — es HTML y CSS puro.

## Responsividad

| Dispositivo | Comportamiento |
|------------|----------------|
| Escritorio (>768px) | Diseno completo en grid, navbar horizontal |
| Movil (<768px) | Menu hamburguesa, columnas apiladas, tipografia escalada |

## Licencia

Este proyecto es de uso libre para fines ministeriales y educativos.
