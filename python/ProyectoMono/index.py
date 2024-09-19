import string, random

def contRandom(): 
    key = 0
    cont = 0

    while key < len(val):
        char = random.choice(string.ascii_letters+"ñ"+" "+"."+",")
        cont = cont + 1
        if char == val[key] : 
            key = key + 1
        else: 
            key = 0
    print("\nCosto un total de ",cont, " intentos") 


def contSave():
    cont = 0
    resultado = []  

    for i in val:
        char = random.choice(string.ascii_letters + "ñ" + " " + "." + ",")
        while i != char:
            char = random.choice(string.ascii_letters + "ñ" + " " + "." + ",")
            cont += 1
        resultado.append(char)  
        print(char, end="")  
    print("\nCosto un total de ",cont, " intentos") 

########################################################################
print("---Mono Infinito---")
print("Ingrese una frase: ")
val = str(input())
print("Ingrese el tipo de conteo: ")
print("===========================")
print("1 - Original ( sin guardar)")
print("2 - Gaurdar Aciertos ======")
print("===========================")
op = int((input()))
match op:
    case 1:
        contRandom()
    case 2: 
        contSave()