import java.util.Scanner;

public class PlayGround {

  // UTILS
  public static void Print(Integer ii){
    System.out.println(ii);
  }

  public static void Print(String ss){
    System.out.println(ss);
  }

  public static Integer ReadInt(){
    Scanner reader = new Scanner(System.in);
    return reader.nextInt();
  }

  // EJERCICIOS ... 
  // Ej. 1
  public static void HelloWorld(){
    Print(new String("Buenos Días")); 
  }

  // Ej. 2
  public static void SquareArea(){
    Print(new String("Escribe el lado de un cuadrado: "));
    Integer squareSide = ReadInt();
    Print(new String("El area del cuadrado es : " + (int)Math.pow(squareSide, 2)));
  }

  // Ej. 16
  public static void CalculateSalary(){
    Print(new String("Tarea 16 ... "));
  }

  public static void main(String[] args){
    Integer opExercice = 1;
    String Menu = "\n ----- Menu -----\n"  + 
      "\n\t Nivel PADAWAN"        + 
      "\n\t\t 1. Escribe un programa que de los 'buenos dias'." +
      "\n\t\t 2. Escribe un programa que calcule y muestre el área de un cuadrado." +
      "\n\n\t Nivel MAESTRO JEDI" + 
      "\n\t\t 16. Escribe un programa que calcula el salario neto semanal de un trabajador " + 
      "\n\t\t en función del número de horas trabajadas y la tasa de impuestos de acuerdo a las siguientes hipótesis: " + 
      "\n\t\t\t - Las primeras 35 horas se pagan a tarifa normal." + 
      "\n\t\t\t - Las horas que pasen de 35 se pagan a 1.5 veces la tarifa normal." + 
      "\n\t\t\t - Las tasas de impuestos son: " + 
      "\n\t\t\t    - Los primeros 500 euros son libres de impuestos." +
      "\n\t\t\t    - Los siguientes 400 tienen un 25% de impuestos." +
      "\n\t\t\t    - Los restantes un 45% de impuestos" +
      "\n\nEscribir nombre, salario bruto, tasas y salario neto.";
    
    Print(Menu);

    while(opExercice != 0){
      Print(new String("\nElige un ejercicio: (0 para salir)"));
      opExercice = ReadInt();

      switch(opExercice){
        case 0: break;
        case 1: HelloWorld();
        break;
        case 2: SquareArea();
        break;
        case 16: CalculateSalary();
        break;
        default: 
          opExercice = 0; 
        break; 
      }
    }
    
    Print("Exiting ...");
    return;
  }
}
