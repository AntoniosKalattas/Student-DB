#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<time.h>
#include<stdbool.h>

#define sleepData "sleepData.txt"
#define generalData "data.txt"
#define grindData "grindData.txt"
#define chillData "chillData.txt"

void readData(char* fileName){
    FILE *fp=fopen(fileName, "r");
    char line[100];
    if(fp==NULL){
        printf("Error: File Not Open");
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
        printf("Faild to locate file");
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
        printf("Faild to locate file");
        return;
    }
    char line[100];             //sotre the input line;
    float value = 0;              // used to calculate the avg. Total Value.
    int month = -1;             // used to store each monnth. 0 based.
    int x=1;                    // used to calculate the avg. Number of values.

    while(fgets(line, sizeof(line),fp)){
        float value_t;
        int month_t;
        if(sscanf(line,"%f - %d",&value_t, &month_t)==2){
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
        printf("Faild to locate file");
        return;
    }
    fprintf(fp,"\n%s - %d" ,argv[2], month);    // will store the value from the arguments.
    fclose(fp);
}

// Used to clean old months that are now being overwritten.
//void clearOldMonth(char *fileName){
//    time_t t = time(NULL);
//    struct tm *tm_info = localtime(&t);
//    int month = tm_info->tm_mon; 
//
//    FILE *fp = fopen(argv[1],"r");
//    if(fp==NULL){
//        printf("Faild to locate file");
//        return;
//    }
//    char line[100];             //sotre the input line;
//    while(fgets(line, sizeof(line),fp)){
//        int value_t;
//        int month_t;
//        if(sscanf(line,"%f - %d",&value_t, &month_t)==2){
//            ;
//        }
//    }
//}

void calculateSum(char **argv){
    time_t t = time(NULL);
    struct tm *tm_info = localtime(&t);
    int month = tm_info->tm_mon;    

    FILE *fp = fopen(argv[1],"r");
    if(fp==NULL){
        printf("Faild to locate file");
        return;
    }
    char line[100];                 //sotre the input line;
    float value = 0;                // used to calculate the avg. Total Value.
    while(fgets(line, sizeof(line),fp)){
        float value_t;
        int month_t;
        if(sscanf(line,"%f - %d",&value_t, &month_t)==2){
            if(month_t==month){
                value+=value_t;
            }
        }

    }
    fclose(fp);
    printf("%.1f",value);
}

void montlyValue(char **argv){
    time_t t = time(NULL);
    struct tm *tm_info = localtime(&t);
    int month = tm_info->tm_mon;            // get current month.

    FILE *fp = fopen(argv[1],"r");
    if(fp==NULL){
        printf("Faild to locate file");
        return;
    }
    char line[100];                         //sotre the input line;
    int value = 0;                        // used to calculate the avg. Total Value.
    bool exist=false;
    while(fgets(line, sizeof(line),fp)){
        int value_t;
        int month_t;
        if(sscanf(line,"%d - %d",&value_t, &month_t)==2){
            if(month_t!=month)
                exist=false;
            if(month_t==month){
                    if(exist==false)
                        value=0;
                value+=value_t;
                exist=true;
            }

        }
    }
    fclose(fp);
    printf("%d", value);
}

int main(int argc, char* argv[]){
    /**     File Format
     * 
     * 1) active assignments.
     * 2) active projects.
     * 3) completed assignments.
     * 4) completed projects.
     * 5) next break.
     */

    if(strcmp(argv[argc-1],"wActiveAndComplete")==0)                     // wrtie grind chill etc.
        writeData(argc,argv);   
    else if(strcmp(argv[argc-1],"rActiveAndComplete")==0)                // read grind, chill etc.
        readData(argv[1]);


    else if(strcmp(argv[argc-1],"rSleep")==0)           // read sleep data
        readAvgData(argc,argv);
    else if(strcmp(argv[argc-1],"wSleep")==0)           // write sleep.
        writeAvgData(argv);
    else if(strcmp(argv[argc-1],"rGrades")==0)          // read grades.
        readAvgData(argc,argv);
    else if(strcmp(argv[argc-1],"wGrade")==0)           // write grade.
        writeAvgData(argv);
    else if(strcmp(argv[argc-1],"rGrind")==0)           // read grindData.
        readAvgData(argc,argv);
    else if(strcmp(argv[argc-1],"wGrind")==0)           // write grindData.
        writeAvgData(argv);
    else if(strcmp(argv[argc-1],"rChill")==0)           // read ChillData.
        readAvgData(argc,argv);
    else if(strcmp(argv[argc-1],"wChill")==0)           // write chillData.
        writeAvgData(argv);

    else if(strcmp(argv[argc-1],"monthlyGrind")==0){           // read total monthly Grind.
        montlyValue(argv);
    }
    else if(strcmp(argv[argc-1],"monthlyChill")==0){           // read total monthly chill.
        montlyValue(argv);
    }
    
    else
        printf("Invalid Arguments");

    return 0;
}