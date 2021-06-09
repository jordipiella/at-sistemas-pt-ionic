# Prueba técnica At Sistemas


## Iniciar el proyecto en local

```
json-server --watch db.json --delay 1000 

npm install -g @ionic/cli

npm i

ionic serve


```


## Información

Desarrollo de 3 vistas con side menú en Ionic. Con un CRUD de películas.

Se ha añadido un template para los PR.


La estrategia de ramas se basa en US Historias de usuario y en algún caso esta puede tener TASK tareas propias dentro de la US.


## Lazy Load

Se ha implementado una ustructura basada en módulos con lazy load para optimizar el rendimiento de la aplicación y mantener separados los bloques de lógica de negocio.
Los módulos shared no forman un módulo en si mismo ya que así permiten la implementación en cada módulo de las dependencias concretas que necesitas.

## Infinite scroll

Se ha añadido un infinite scroll en la lista de movies, complementado con virtual scroll.


## Virtual Scroll

El virtual scroll renderiza solo los elementos que son visibles en pantalla, así evitamos hacer más peticiones al server y evitamos que el cliente se ralentize.


## Tailwind

En la vista de detalle y la de edición/creación se ha implementado scss de utilidad con Tailwind. Por falta de tiempo no se ha perfeccionado el comportamiento responsive ni unificado el diseño corporativo.


## Reactive Forms

Para la gestión de los formularios se ha utilizado Reactive Forms con los Validators propios de este, aunque se podrían haber añadido Validators custom.


## Forms module Control Value Accessor

Se ha creado un módulo independiente Shared para algunos componentes de formulario, dos de ellos con Control Value Accesor para facilitar la interacción con Reactive Forms.


## Error interceptor

Se ha añadido un interceptor de errores que lanza una notificación Toast en caso de ser necesario.


## Pipe minutos a HH:mm

Se ha añadido un Pipe custom para convertir los minutos en HH:mm


## Toast notifications

Se usa Toast para confirmaciones de éxito al guardar, eliminar o mostrar errores.


## Animations

Se ha añadido un animación a la lista de películas para suavizar los loading.


## Skeleton y loading

Se ha añadido en la lista un loading con el infinite scroll, me ha faltado un refresh en la parte superior por falta de tiempo. También se ha añadido un skeleton loading en la vista de detalle de película.


## Basic state con Behavior subject, Facade

Se han añadido algunos state básicos basados en Behaviour Subject, se ha optado inicialmente por esta opción por un tema de tiempo, pero lo ideal sería usar ngrx si la aplicación va a crecer más.
Siempre con un Facade a nivel de módulo y otro para app que centraliza el acceso a los múltiples servicios.


## Ngrx

Se ha implementado ngrx para el módulo de movies, concretamente para la lista de movies.


## Test

Se han añadido test de servicios, test del módulo de api y test de un componente.

 