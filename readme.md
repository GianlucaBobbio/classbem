# useBEM
 
El hook useBEM tiene 2 objetivos principales, por un lado mejorar la legibilidad del markup y por el otro abstraer las reglas de [BEM](http://getbem.com/introduction/)
 
BEM es una convención de naming para las clases css que nos ayuda a organizar mejor nuestros estilos.
 
Todas las clases se construyen a partir de 3 elementos
 
Block__Element__Modifier
 
<br>
 
Ejemplos:
 
menu__items--selected
 
profile--open
 
profile__title--big
 
<br>
 
### Uso
 
Para generar estas clases debemos utilizar el hook __useBEM__, por parámetros le vamos a pasarle nuestra clase block.
 
```js
   const { useBEM } = require('syi-frontend-commons')
 
   const {b, e} = useBEM('button');
```
 
El hook nos retornara 2 funciones __b, e__.
 
__b__(block): Esta función nos retornará la clase block.
```js
   b().get();
   //'button'
 
   // Si lo llamamos con un 'baseCustom' nos lo retornará
 
   b('catalog-button').get(); 
   //'button catalog-button'
```
 
<br>
 
__e__(element): Esta función recibe un elemento, retornará la clase block con su elemento
 
```js
   e('icon').get();
   //'button button__icon'
 
   // No esta permitido concatenar elementos ya que BEM no esta pensado para representar jerarquías
 
   e('button').e('text).get(); 
   // not allowed
```
 
<br>
 
__m__(modifier): Esta función debe ser concatenada con alguna de las anteriores. Recibe un modifier y retornará la clase block o element con sus modificadores.
 
Puede recibir una condición para aplicar o no el modificador, por defecto es verdadero
 
```js
   e('icon').m('warning').get();
   //'button button--warning'

   e('icon').m('danger', false).get();
   //'button '
 
   // Podemos agregar modificadores al block. 
   b('button').m('success').get();
   // 'button--success'
 
   // También podemos agregar elementos a los modificadores
 
   b('button').m('success').e('close-cross').get();
   // 'button--success__close-cross'
```
 