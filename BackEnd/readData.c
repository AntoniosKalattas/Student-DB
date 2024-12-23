#include<stdio.h>
#include<stdlib.h>
#include<string.h>

void readData(char* fileName){
    FILE *fp  = fopen(fileName, "r+");
    if(fp==NULL){
        perror("Error: File Not Open");
        return;
    }
    int a;
    while(fscanf(fp, "%d", &a) != EOF){
        printf("%d\n",a);
    }

}

void writeData(char* fileName){
    

}

int main(int argc, char* argv[]){
    /**     File Format
     * 
     * 1) total study hours.
     * 2) chill hours.
     * 3) sleep hours.
     * 4) active assignments.
     * 5) active projects.
     * 6) completed assignments.
     * 7) completed projects.
     * 8) next break.
     */

    if(argc !=3){
        perror("Wrong number of arguments");
        return EXIT_FAILURE;
    }
    if(strcmp(argv[argc-1],"1")==0) 
        readData(argv[1]);
    else if(strcmp(argv[argc-1],"0")==0)
        writeData(argv[1]);
    else
        printf("Invalid Arguments");

    return 0;
}