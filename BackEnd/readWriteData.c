#include<stdio.h>
#include<stdlib.h>
#include<string.h>

void readData(char* fileName){
    FILE *fp=fopen(fileName, "r");
    char line[100];
    if(fp==NULL){
        perror("Error: File Not Open");
        return;
    }
    int a;
    while(fgets(line, sizeof(line),fp))
        if(sscanf(line,"%d",&a)==1)
            printf("%d\n",a);
    fclose(fp);
}

void writeData(int argc, char **argv){    
    FILE *fp = fopen(argv[1],"w");
    if(fp==NULL){
        perror("Faild to locate file");
        return;
    }
    for(int i=2;i<argc-1;i++){
        fprintf(fp, "%s\n",argv[i]);
    }
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

    //if(argc !=3){
    //    perror("Wrong number of arguments");
    //    return EXIT_FAILURE;
    //}
    if(strcmp(argv[argc-1],"1")==0) 
        readData(argv[1]);
    else if(strcmp(argv[argc-1],"0")==0)
        writeData(argc,argv);
    else
        printf("Invalid Arguments");

    return 0;
}