import gensim

def word2vec(data):
    # chive-1.2-mc5.kv  読み込み時間長すぎ
    # chive-1.2-mc30.kv 
    # chive-1.2-mc90.kv
    model = gensim.models.KeyedVectors.load("./chive-1.2-mc90.kv")
    flag_word = False
    flag_postive = True

    positivelist = []
    negativelist = []
    outputlist = []

    temp_word = ''

    for char in data:
        if(flag_word == False):
            if(char == "'"):
                flag_word = True
                continue
            if(char == "+"):
                flag_postive = True
                continue
            if(char == "-"):
                flag_postive = False
                continue
        else: # flag_word == True
            if(char == "'"):
                flag_word = False
                if(flag_postive == True):
                    positivelist.append(temp_word)
                else:
                    negativelist.append(temp_word)
                temp_word = ''
                continue
            else:
                temp_word += char
                continue

    for item, value in model.most_similar(
        positive=positivelist,
        negative=negativelist,
        topn=1
        ):
        outputlist.append(item)

    return outputlist