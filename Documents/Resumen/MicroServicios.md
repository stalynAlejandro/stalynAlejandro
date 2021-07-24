# Aplicaciones basadas en microservicios.

 Los microservicios nos permiten desarollar aplicaciones con módulos físicamente separados. 

 Es una técnica de desarrollo de aplicaciones software según la cuál podemos construir una aplicación como un conjunto de servicios modulares, pequeños e independientemente desplegables. 

Actúan como un sistema distribuido en el que cada servicio tiene deseablemente una única responsabilidad y se intercomunican a través de protocolos independientes de la implementación (JSON, HTTP).

· Principio de única responsabilidad. Describe que una unidad (un microservicio) debe tener una única responsabilidad. 

· Principio de Autonomía. Los microservicios son servicios autónomos e independientemente desplegables, que toman la responsabilidad completa sobre una tarea y su ejecución. Cuando un servicio se ha desplegado decimos que se ha instanciado.  

· Principio de Descentralización. Gestión descentralizada, cada servicio gestiona su propia base de datos. Flexibilidad y consistencia para realizar cambios a múltiples recursos. 

· Principio de bajo acomplamiento. Interactúan por interfaces claramente definidas a través de eventos, mientras la implementación interna permanece independiente. Actúan como cajas negras, permite que los equipos de desarrollo se organicen de manera independiente. 

· Principio de Resilencia. Los microservicios son un mecanismo natural para aislar los fallos. Al ser independientes, si ocurre un fallo lo más probable es que ese fallo afecte sólo a una parte del sistema. 

· Principio de Antifragilidad. Recuperarse rápido de los fallos. El sistema puede detectar los fallos y se ajusta automáticamente para evitar seguir fallando. 

# Spring Boot

Spring Boot es uno de los 21 proyectos que tiene activos el equipo de Spring.

Spring Framework está construido alrededor de la idea de inyección de Dependencias (DI). 

La DI es un patrón que implementa el principio de Inversion de Control (loC), el cual se basa en que el control de los objetos se delega a un contenedor o un framework. 

En contraste con la prog. tradicional, en la que nuestro código realiza llamadas a una librería. **IoC** permite al framework tomar el control del flujo de un programa y hacer llamadas a nuestro código. 

Para conseguir esto los diferentes frameworks usan abstracciones con comportamientos definidos, los cuáles podemos modificar extendiendo estas clases o construyendo las nuestras propias. 

Ventajas **IoC**: 
- Desacoplar la ejecución de una tarea de su implementación.
- Facilitar el cambio de las implementaciones.
- Incrementar la modularidad del programa. 
- Facilita el testeo de un programa porque nos permite aislar componentes o simular sus dependencias. 

Existen diferentes mecanismos para conseguir la **IoC(Inversión de Control)** como *Factory Pattern* o *Strategy Design Pattern*, o (la que queremos analizar) *DI*. 


Normalmente crearemos un objeto de la siguiente manera:
```java
public class Store{
    private Item item;
    public Store(){
        item = new ItemImp1();
    }
}
```
Como podemos observar, necesitamos instanciar una implementación de la interfaz dentro de la clase *Store()*. 

En cambio, si usamos *DI* podemos reescribir la clase sin necesidad de especificar la implementación de *Item* que usaremos. 

```java
public class Store(){
    private Item item;
    public Store(Item item){
        this.item = item;
    }
}
```
El contenedor de Spring es el encargado de crear los objetos, configurarlos, conectarlos y gestionarlos durante su ciclo de vida completo, desde que son creados hasta que son eliminados. 

El contenedor de Spring está representado en el **AplicationContext**. Este es quien se encarga de controlar todas las clases y gestionarlas de manera correcta, proporcionando las dependencias necesarias.

```java
AplicationContext ctx = new AnnotationConfigAplicationContext(someConfigClass)

ctx.getBean(Class.class)
```

Como podemos ver en el ejemplo necesitamos una clase para la configuración del Aplication Context. Esta clase debería ser algo parecido a esto:

```java
@Configuration
public class MyApplicationContextConfiguration{
    @Bean
    public DataSource dataSource(){
        MySqlDataSource dataSource = new MySqlDataSource();
        dataSource.setUser("root");
        dataSource.setPassword("s3crt3t");
        dataSource.setURL("jbc:mysql://localhost:3306/myDatabase");
        return dataSource;
    }

    @Bean
    public UserDao userDao(){
        return new UserDao(dataSource());
    }
}
```

Esta clase se interpretará como la configuración del **AplicationContext** gracias a la anotación *@Configuration*, mientras que los objetos están anotados con *@Bean*. 

También se puede construir un *ApplicationContext* a través de un XML o clases de Java anotadas, pero en este caso la interfaz *AplicatinoContext* es la más clara para entender el funcionamiento y objetivo de esta. 

## La anotación BEAN

La anotación Bean que vemos en las dependencias que vamos a crear indica que los objetos que sean creados por ellas serán Beans. 

La implicación directa de este "marcador" es que Spring reconocerá estas instancias como propias, y se responsabilizará de su gestión. 

Si queremos especificar cuántas instancias debe generar Spring, podemos conseguirlo con la anotación **@Scope**. 

Podemos usar **@Scope("singleton")** para crear un singleton, es decir, una instancia única. Esta configuración es la más habitual, pero también existen otras opciones como **@Scope("prototype")**, que creará una instancia nueva cada vez que alguien referencie a ese Bean, o **@Scope("session")**, que creará una instancia nueva cada sesión HTTP. 

Podemos ahorrarnos tener que realizar las llamadas a las nuevas instancias usando la anotación **@ComponentScan()**. Esta anotación, que acompañada a la clase encargada del **ApplicationContext**, escanea el paquete en el que se encuentra y busca Beans que puedan ser inyectadas. 

Spring reconocerá las Beans gracias a la anotación **@Component()** que debemos usarla para etiquetar las Beans y que Spring, pueda reconocerlas. Sólo nos queda una parte por resolver en este esquema después de que Spring ya sepa cómo reconocer las Beans, y es concretar dónde debe inyectarlas. 

Con la anotación **@Autowired** que la usaremos para declarar las instancias en el ApplicationContext, **Spring** sabrá que debe inyectar esa dependencia cuando sea necesario, es decir, cuando alguna clase la use como parámetro de su constructor. Con el paso del tiempo Spring tiene mecanismos para reconocer las dependencias hasta cuando no están anotadas con @Autowired, pero su uso es altamente recomendable. 

Vamos a concretar toda esta teoría repasando las diferentes maneras en las que podemos aplicar el patrón de *DI* con Spring.

- DI mediante constructor. 
```java
private DataSource dataSource;

private UserDao(@Autowired DataSource dataSource){
    this.dataSource = dataSource;
}
```

- DI mediante campo. 
```java
@Autowired
private DataSource dataSource;
```

- DI mediante setter
```java
private DataSource dataSource;

@Autowired
public void setDataSource(DataSource dataSource){
    this.dataSource = dataSource;
}
```

Con los tres métodos conseguimos el mismo resultado, nuestro *Bean* será inyectado y funcionará correctamente. 

La recomendación oficial de Spring es que, para que las dependencias obligatorias, se use la *DI* mediante constructor, y para las opcionales mediante *campo/setter*.

# Spring Cloud Netflix
En una aplicación basada en la arq. de microservicios queremos que los servicios tengan una comunicación fluida. Aquí es donde entra Spring Cloud Netflix, que nos ayudará a implementar:

- Localización de Servicio
- Enrutamiento de Servicio
- Balance de carga
- Patrón de cortocircuito 

Existen diferentes tecnologías que nos ofrecen estas características dentro de Spring Cloud Netflix, siendo las más importantes Eureka y Zuul. 

Eureka es una servicio REST que actúa como un servidor de descubrimiento, que localiza y registra los microservicios desplegados(que estén configurados para ello), para tener constancia de su salud y carácteristicas generales. Su funcionamiento es tan simple que cuando tenemos levantada nuestro servidor, los servicios clientes que estén configurados para conectarse con Eureka, lo buscarán y Eureka les notificará que han sido registrados, manteniendo una comunicación constante a través de "latidos" cada 30 segundos. De esta manera Eureka tiene constancia del estado de sus servicios clientes, pudiendo liminar de su registro a los microservicios "muertos" (que no hayan latido pasado 30 segundos).  
