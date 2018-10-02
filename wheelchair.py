def main():
    readFile()
    pass

def readFile():
    try:
        file  = open("weight.txt", "r")
        print(file.read())
    except:
        print("FILE NOT FOUND!")

if __name__ == '__main__':
    main()

