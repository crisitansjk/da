s = "ac"
k = "car"

arr = len(s)*[0]

ss = []
kk = []

try:
    for i in range(len(s)):
        ss.append(s[i])
        kk.append(k[i])

    bar = []
    bak = []

    for i in range(len(ss)):
        if(ss.index(ss[i]) == i):
            bar.append(ss[i])
            bak.append(kk[i])

    for i in range(len(ss)): 
        for j in range(len(bar)):
            if(ss[i] == bar[j] ):
                bar[j] = [ss[i],1]
                bak[j] = [kk[i],1]

            

        
    for i in range(len(bar)): 
        for j in range(len(ss)):
            nn = bar[i][1]
            nnn = bak[i][1]
            nn = nn + 1
            nnn = nnn + 1

            if(ss[j] == bar[i][0] ):
                bar[i][1] = nn 
                bak[i][1] = nnn  

    bar.sort()
    bak.sort()
    
    if(len(ss) == len(kk)):
        for i in range(len(bar)):
            if(bar[i][0] == bak[i][0] and bar[i][1] == bak[i][1])  :
                print(True)
            else:
                print(False)
        else:
            print(False)
    
except:
    print(False)
        



    


    



                


