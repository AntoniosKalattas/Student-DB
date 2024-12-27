#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<time.h>

#define sleepData "sleepData.txt"
#define generalData "data.txt"
#define grindData "grindData.txt"
#define chillData "chillData.txt"

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
    for(int i=2;i<argc-1;i++)
        fprintf(fp, "%s : \n",argv[i]);
    fclose(fp);
}


void readAvgData(int argc, char **argv){
    /**
     *  Used to Read FIle Formats vv - mm, where vv is the value and the mm the coresponding month of that value
     *  It is used to calculathe average sleep and grade performance.
     * 
     *  */
    float avg[12]={0};
    FILE *fp = fopen(argv[1],"r");
    if(fp==NULL){
        perror("Faild to locate file");
        return;
    }
    char line[100];             //sotre the input line;
    int value = 0;              // used to calculate the avg. Total Value.
    int month = -1;             // used to store each monnth. 0 based.
    int x=1;                    // used to calculate the avg. Number of values.

    while(fgets(line, sizeof(line),fp)){
        int value_t;
        int month_t;
        if(sscanf(line,"%d - %d",&value_t, &month_t)==2){
            if(month ==-1){             // handle the first ever iteration.
                value = value_t;        // set the value to the firt read value.
                month = month_t;        // set the month to the first read month.
            }
            else if(month_t!=month){
                if(month_t<month)       // in case the year changes and we go from 12th month to 1st.
                    avg[month_t]=0;     //  That means we need to clear the data of the 1st month.
                avg[month] = (float)value/x;
                month = month_t;
                value = value_t;
                x=1;
            }
            else{
                value+=value_t;
                x++;
            }
        }

    }
    avg[month]=(float)value/x;         //handle the last input month.
    for(int i=0;i<12;i++)                           // print sequentially all moths.
    printf("%.1f\n", avg[i]);
    fclose(fp);
}

void writeAvgData(char **argv){
    /**
     *  Used to store in file with the readAvgData format vv-dd.
     *  It will store in the given file the second argument in the current month.
     */
    time_t t = time(NULL);
    struct tm *tm_info = localtime(&t);
    int month = tm_info->tm_mon;                // current month.
    FILE *fp = fopen(argv[1], "a");
    if(fp==NULL){
        perror("Faild to locate file");
        return;
    }
    fprintf(fp,"%s - %d\n" ,argv[2], month);    // will store the value from the arguments.
    fclose(fp);
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
    if(strcmp(argv[argc-1],"0")==0)                 // wrtie grind chill etc.
        writeData(argc,argv);   
    else if(strcmp(argv[argc-1],"1")==0)            // read grind, chill etc.
        readData(argv[1]);


    else if(strcmp(argv[argc-1],"rSleep")==0){            // read sleep data
        printf("rSleep");
        readAvgData(argc,argv);
    }
    else if(strcmp(argv[argc-1],"wSleep")==0)            // write sleep.
        writeAvgData(argv);

    else
        printf("Invalid Arguments");

    return 0;
}