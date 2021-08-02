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

Existen diferentes tecnologías que nos ofrecen estas características dentro de Spring Cloud Netflix, siendo las más importantes *Eureka* y *Zuul*. 

## Eureka

*Eureka* es una servicio REST que actúa como un servidor de descubrimiento, que localiza y registra los microservicios desplegados(que estén configurados para ello), para tener constancia de su salud y carácteristicas generales.

Su funcionamiento es tan simple que cuando tenemos levantada nuestro servidor, los servicios clientes que estén configurados para conectarse con *Eureka*, lo buscarán y *Eureka* les notificará que han sido registrados, manteniendo una comunicación constante a través de "latidos" cada 30 segundos. De esta manera Eureka tiene constancia del estado de sus servicios clientes, pudiendo liminar de su registro a los microservicios "muertos" (que no hayan latido pasado 30 segundos).  

Además, cada servicio conectado al servidor puede recuperar el registro de los servicios conectados para tener constancia del ecosistema completo. *Eureka* puede funcionar a modo de clúster si lo configuramos de tal manera, para que existan varias instancias del servidor. En resumen, *Eureka* nos proporciona enormes ventajas en una aplicación basada en microservicios, pudiendo abstraer las direcciones físicas de los servicios y ayudarnos a tener constancia del estado del ecosistema de la aplicación.

## Zuul

**Zuul** es un edge service (o servicio frontera) que nos ayuda a aplicar el patrón API Gateway. Esto significa que nos permite filtrar y enrutar todas las peticiones a nuestra aplicación dinámicamente. Se comunica con *Eureka* para solicitar las instancias de los servicios desplegados y realiza las peticiones a estos. 

A primera vista, puede parecer una desventaja que la aplicación pueda tener aparentemente un único punto de fallo, pero al poder replicar las instancias de este servicio sorbepasamos este problema sin mayor dificultad. Además nos ofrece la capacidad de filtrar las peticiones según los filtros que definamos y balancea automáticamente la carga de su tráfico. 

Al configurar Zuul, automáticamente dispondremos de **Hystrix** y **Ribbon** en nuestra aplicación. Ambas son dos herramientas que también pertenecen a *Spring Cloud Netflix* y aportan características adicionales a nuestro servicio de frontera. 

**Hystrix** proporciona tolerancia a fallos y resiliencia gracias a que implementa el patrón de cortocircuito (*circuit-braker*). 

*Ribbon* por su parte nos permite el balanceo de carga de peticiones. Además, podemos añadir **Spring Security** para securizar el acceso a las rutas que intercepta este servicio, lo cuál es muy útil para implementar un sistema de inicio de sesión (ej.). 

# Spring Security

**Spring Security** nos ofrece soluciones sencillas para securizar nuestras aplicaciones sean tanto de microservicios o no. Nos interesa securizar nuestra aplicación ya que no queremos que cualquiera se pueda comunicar con los microservicios y hacer las peticiones que quiera. De esto se encargará **Zuul**, que, en conjunto con el servicio de autenticación **filtrará las peticiones**. 

**Spring Security** en pocas palabras es una serie de filtros que podemos aplicar al servidor *embebido Tomcat* de una aplicación Spring Boot. Estos filtros, entre otras cosas, nos permiten implementar **autenticación** y **autorización** a nuestra aplicación. 

> La autenticación es poder verificar que un usuario es realmente quién dice ser. 

> La autorización es definir si un usuario puede realizar una tarea o no, dependiendo del rol que tenga asignado. 

Estos filtros se sitúan antes de la llamada al controller, lo que nos permite definir quién puede acceder a ese recurso o quién no. 

**Spring Security** nos ofrece varios filtros que extender, pero sólo nos incumben dos. 

**UserNamePasswordAuthenticationFilter** nos ofrece la posibilidad de identificar una petición POST, con nombre de usuario y contraseña e intenta autenticarla. **OncePerRequestFilter** nos permitirá filtrar todas las llamadas como queramos. 

Para configurar **Spring Security** necesitamos crear un **WebSecurityConfigurerAdapter** que filtrará las peticiones por criterios como *origen*, si está *autenticada* la petición o la *url* a al aque se quiera acceder. 

También necesitaremos un último filtro, que será *UserNamePasswordAuthenticationFilter*, que nos permite filtrar según el nombre del usuario y la contraseña introducida. Como última característica necesaria para nuestro proyecto, estará el *UserDetailsService*, que es necesario implementarlo en una clase para que podamos manejar los usuarios de la aplicación.

## Servicios REST con Spring Boot 
La parte más importante del funcionamiento de los microservicios y de todo tipo de aplicaciones web es la comunicación. Hoy en día, los servicios REST son el estándar para crear API's que se comuniquen a través de internet. 

Los servicios REST (Representational State Transfer) exponen una serie de recursos a través de internet, a los que se puede acceder con peticiones HTTP sencillas del tipo GET, PUT, POST o DELETE. Estas peticiones nos permiten acceder a recursos que consisten en datos. Estas peticiones pueden ir acompañadas de datos adicionales a la propia petición o respuesta, que peuden ser de tipos muy variados. 

En Spring, el módulo web-MVC se encarga de proporcionar el soporte necesario para crear servicios REST. Como casi todos los módulos, incluye sus propias anotaciones específicas. Para implementar este módulo, debemos anotar una clase con la etiqueta **@RestController**. Además los métodos HTTP tienen anotados un etiqueta específica como **@GetMapping**, **@PostMapping**..etc.

```
                             - Clase con anotaciones Spring
cliente ------- HTTP -------
                             - Spring MVC
```

## Microservicios en Spring Boot
Un microservicio en Spring Boot es muy similar a una aplicación normal que podemos desarrollar. La diferencia radica en que estará preparado para enviar y recibir datos de otros microservicios de la aplicación y trabajar en conjunto con ellos, siendo una pieza de un esquema mucho más grande. 

Estructura estándar de un microservicio: 
```
                                .jar
        |...............................................|
        |                                               |
        |           LANZADOR (class Main)  <----> .pom  |
        |                                               |
        |                                               |
CLIENT<-|--------> CONTROLLER <------> MODELO <---------|-----> BD
        |                                               |
        |                                               |
        |...............................................|

```

Las partes que observamos en la estructura serán fáciles de identificar si estamos familiarizados con las API's web. La diferencia más notable en Spring Boot es que la clase *main* generalmente será algo como esto:

```java
    @SpringBootApplication
    public class Application{
        public static void main(String[] args){
            SpringApplication.run(Application.class, args);
        }
    }
```

Habitualmente el main suele realizar llamadas a otros métodos o clases de la aplicación, pero no necesitamos prácticamente codificar la clase main. 

La anotación **@SpringBootApplication** es vital para el proyecto, ya que resume tres anotaciones en ella, que son **@Configuration**, **@EnableAutoConfiguration** y **@ComponentScan**. Estas anotaciones noes permiten, respectivamente, definir los parámetros de configuración del servicio, dejar que SpringBoot configure automáticamente nuestra aplicación en función de las dependencias del proyecto y por último escanear el paquete para buscar Beans que puedan ser inyectadas. 

## Ciclo de vida de los servicios en Spring Boot. 
**En primer lugar** este debe ser empaquetado y desplegado de manera independiente. Se usa *Maven* para crear el ejecutable del microservicio y ponerlo en marcha. 

En sus primeros instantes de vida el servicio entra en la fase de **bootstrap**, lo que significa que cargará los datos de configuración que necesite para empezar a funcionar. 

**Como tercer paso** necesita comunicarse con un agente localizador de servicios, que registrará su IP (única y no permanente) y gestionará las solicitudes para consumir ese servicio. 

**Tras superar esta fase**, el microservicioi está funcionando y la única tarea que tenemos que llevar a cabo es la monitorización. Esta tarea la lleva a cabo el localizador de servicios, asegurando que el microservicio mantiene una buena *salud* durante su ejecución. 

Si se descrubre algún problema con el servicio, se encargará de bien apagarlo o levantar más instancias de este para superar momentos de gran estrés debidos a un aumento en la demanda. 

```
|---- 1. ASSEMBLY ----|---- 2. BOOTSTRAPING ----|---- 3. DISCOVERY ----|---- 4. MONITORING ----|
|                     |                         |                      |                       |
|Build/deploy -> .jar |  configuration repo     |   service discovery  |   service discovery   |
|     .               |         .               |                      |                       |
|     .               |         .               |                      |Failing -> recover     |
| source code repo.   |  service instance star  |   multiple service   |                       |
|                     |                         |     instances        |                       |
|.....................|.........................|......................|.......................|

```

## Arquitectura Software
Para nuestra aplicación se usa el patrón Modelo-Vista-Controlador. 

El concepto teórico detrás de este patrón se basa en la separación en capas de la aplicación, la cuál se hará función de las responsibilidades que debe tener cada una de ellas. 

**El Back End** se encargará de recuperar los datos de las Bases de Datos y ejecutar la lógica de negocio necesaria para entregar los datos correctamente, según lo que haya solicitado el **Controlador**.

**La Vista** en nuestra aplicación será el navegador web y se encargará de mostrar la información de una manera visualmente atractiva para el usuario. Conseguirá la información conectándose con el **Controlador** para recibirla y la expondrá según le indique.

**El Controlador** en nuestra aplicación será el Front-End, es decir, la aplicación de React. Actuará como intermediario entre el modelo y la vista y procesa las peticiones de la vista para solicitar los datos necesarios al modelo, y posteriormente entregárselos a la vista junto con un estilo de presentación.

```
------------------------------------- FRONT END----------------------------------------

    Home   Films    Series  Authentication  Search  SeriesDetails   FilmDetails

-----------------------------------------------------------------------------------------

------------------------------------- BACK END----------------------------------------

                    ------------Servicio Frontera (Zuul) ----------------
                    |                                                    |
                    |                                            Servicio Descubrimiento
        -------------------------------------------------------------(Eureka)
        |                 |             |
        |                 |             |
        |                 |             |
 S.Authentication      S.Films     S.Series    S....

-----------------------------------------------------------------------------------------

----------------------------------------- BBDD ------------------------------------------

                        Films         Reviews      Series
-----------------------------------------------------------------------------------------
```

## Implementación

### Eureka
El componente *Eureka* es probablemente, el más importante de todos para nuestra aplicación basada en microservicios. Su objetivo es el registro de microservicios. 

Cuando queremos crear un proyecto de SpringBoot, tenemos a nuestra disposición una herramienta previamente mencionada, que es Spring Initializr. Con esta herramienta podemos crear nuestro proyecto con toda la estructura de carpetas y archivos necesarios para tener un proyecto de SpringBoot. 

El proyecto tendrá como dependencias: 

- Eureka server
- Spring Web

La dependencia de Spring Web nos permite contruir aplicaciones RESTful que contengan Spring MVC y que se ejecutan en un servidor *Apache Tomcat embebido* que se usa para desplegar el servicio. 

La dependencia *Eureka Server*  permite a este servicio actuar como un servidor. 

Una vez creado nuestro proyecto, debemos ir a la clase principal y anotarla con **@EnableEurekaServer** para activar la configuración relativa a Eureka. 


### Zuul
El componente *Zuul* será el servicio frontera. Debemos repetir el proceso, pero debemos añadirle la dependencia *Zuul* [Maintenance] y como dependencias adicionales añadiremos *Spring Web*  y *Eureka Discovery Client* que permitirá a este servicio ser registrado por **Eureka**, además añadiremos *Spring Security* con **JWT**. Este sistema nos permitirá la autenticación de usuarios mediante JWT, que es un token de acceso creado cuando inicia sesión cada usuario.

Tras crear el proyecto, debemos anotar la clase principal con las anotaciones **@EnableZuulProxy** y **@SpringBootApplication**. Estas anotaciones nos permitirán usar todas las características que nos ofrece *Zuul*. Para configurarlo, debemos hacerlo en *application.yml* del proyecto. Debemos declarar todos los servicios y las rutas que debemos interceptar. Estas rutas serán las que definiremos en cada servicio respectivamente.

## Sistema de Seguridad
Además de esta configuración, debemos establecer el sistema de seguridad. Este funcionará interceptando las peticiones a las rutas que define Zuul, y las únicas que permitirá sin identificar será las que se hagan el servicio de autorización, que veremos más adelante. 

Para configurar esto, debemos crear métodos que nos permitan: aceptar orígenes cruzados, ya que por defecto nuestra aplicación nos permitirá esta característica, denegar las peticiones a rutas securizadas (peticiones que no contengan el token de identificación) y permitir el paso de peticiones identificadas por el token. 

Este token se obtendrá realizando una petición POST al servicio de autenticación con unas credenciales correctas, y en la respuesta obtendremos el token. Ese token lo añadimos a las cabeceras de las peticiones (ReactJs) y podremos acceder a todas las rutas securizadas.

Tras implementar estas características, podemos ejecutar el servidor *Zuul* y ver cómo *Eureka* lo registra. Además, podremos comprobar que no podemos acceder a las rutas de los servicios a través del puerto **7000** a menos que iniciemos sesión.

## Auth
El componente de autenticación será el encargado de gestionar el inicio de sesión. Al igual que todos los componentes del **BackEnd**, lo crearemos con *Spring Initializr* con las dependencias de **Eureka Discovery Client**, **Spring Web** y **Spring Security**. Tras crear el proyecto, debemos implementar el código y las clases que nos permitan validar los inicios de sesión. 

Usaremos la clase **UsernamePasswordAuthenticationFilter** de Spring Security, extendiéndola para poder autenticar a los usuarios y en caso de que sea un usuario correcto, nos devolverá el token en la petición POST que hayamos realizado. Los usuarios los definimos por código. 

Su configuración mediante *application.properties* es muy genérica, únicamente definimos el nombre del servicio, su puerto y la dirección en la que se podrá registrar en **Eureka**.

```
spring.application.name=auth-service
server.port=9101
eureka.client.service-url.default-zone=http://localhost:8761/eureka
```

## Films
El componente Films será el encargado de gestionar las películas. Lo crearemos con *Spring Intializr* añadiendo las dependencias de *Spring Web*, *Eureka Discovery Client*, *MySql Driver* que nos permitirá conectarnos con la base de datos **Films** (que tenemos que haber creado y que contega la información de las películas) y *Spring Data JPA* que nos permitirá acceder a la base de datos y recuperar los datos, conviertiéndolos para que Java pueda reconocerlos y operar con ellos. 

Tras crear el proyecto, creamos las capas de **Contorller**, **Service**, **DAO** y **Modelo** junto con algunas clases, que nos permiten estructurar la aplicación con el patrón MVC y dao, para que cada capa se encargue de una sola función. 

```
src/main/java
    |---------- controller
    |---------- model
    |---------- service

```
Para empezar con el desarrollo, debemos definir qué es una pelicula, lo que significa que debemos definir sus campos en el modelo. 

El *modelo* se encarga de declarar estos campos y gracias a la información recogida en las **Historias de Usuario** serán los siguientes: 

- idFilm (Integer) primary key
- duration (Integer) 
- genre (String) 
- year (Integer)
- director (String)
- rating (String)
- summary (String)
- urlimg (URL)
- urltrailer (URL)
- reviews ()

Como punto más importante, en la capa **Model** es donde debemos anotar la clase **Film.java** con **@Entity**, lo que nos permite que las películas puedan ser manejadas por **JPA** y podamos recuperarlas de la base de datos, como persistirlas. 

Una vez definidos los campos, nuestro siguiente paso es la creación de los endpoints en la **capa controller** y los métodos de la **capa service**.

En la **capa Controller** definiremos 4 endpoints que nos permitirán acceder a todos los datos que necesitamos para que nuestro servicio de películas funcione según lo definido en las **Historias de Usuario**:

- 1. Para recuperar las películas.
- 2. Recuperar una película por su nombre.
- 3. Recuperar una película por su Id.
- 4. Recuperar las películas en función de su género. 

Es **muy importante** qye anotemos el controller con **@RestController** para que pueda usar los métodos REST.

```java
package controller;

import java.utils.*;

@CrossOrigin(origins="*")
@RestController
public class FilmController{

    @Autowired
    ServiceFilms service;

    @GetMapping(value = "films", products = MediaType.APPLICATION_JSON_VALUE)
    public List<Film> getFilms(){
        return service.getFilms();
    }

    @GetMapping(value="films/name/{filname}", products = MediaType.APPLICATION_JSON_VALUE)
    public Film getFilmByName()
}
```