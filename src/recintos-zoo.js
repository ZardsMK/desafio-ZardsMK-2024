class RecintosZoo {

    #animal;
    #quantidade;
    #arrayFinal = [];
    erro;
    recintosViaveis;
    #dados = [
        {
            especie: "LEAO",
            tamanho: 3,
            quantidade: 1,
            bioma: ["savana"],
            tolera : ["LEAO"]
        }, {
            especie: "LEOPARDO",
            tamanho: 2,
            quantidade: 0,
            bioma: ["savana"],
            tolera : ["LEOPARDO"]
        }, {
            especie: "CROCODILO",
            tamanho: 3,
            quantidade: 0,
            bioma: ["rio"],
            tolera : ["CROCODILO"]
        }, {
            especie: "MACACO",
            tamanho: 1,
            quantidade: 3,
            bioma:["savana", "floresta"],
            tolera : ["GAZELA", "HIPOPOTAMO", "MACACO"]
        }, {
            especie: "GAZELA",
            tamanho: 2,
            quantidade: 1,
            bioma: ["savana"],
            tolera : ["MACACO", "HIPOPOTAMO", "GAZELA"]
        }, {
            especie: "HIPOPOTAMO",
            tamanho: 4,
            quantidade: 0,
            bioma: ["savana" && "rio"],
            tolera : ["MACACO", "GAZELA", "HIPOPOTAMO"]
        } 
    ];

    #recinto = [
        {
            id: 1,
            bioma: ["savana"],
            tamanho: 10,
            animais: [ { nome: "MACACO", qtd : 3 } ]
        }, {
            id: 2,
            bioma: ["floresta"],
            tamanho: 5,
            animais: [ ]
        }, {
            id: 3,
            bioma: ["savana", "rio", "savana" && "rio"],
            tamanho: 7,
            animais: [ { nome: "GAZELA", qtd : 1 } ]
        }, {
            id: 4,
            bioma: ["rio"],
            tamanho: 8,
            animais: [ ]
        }, {
            id: 5,
            bioma: ["savana"],
            tamanho: 9,
            animais: [ { nome: "LEAO", qtd : 1 } ]
        }
];

#pode(rec, animalEntrando){
    let i, v1, v2;

    for( i = 0; i < rec.animais.length; i++ ){        
        v1 = this.#dados.findIndex(val => val.especie === rec.animais[i].nome);
        v2 = this.#dados[v1].tolera.findIndex(val => val === animalEntrando);
        if(v2 != -1) return true;
        
    }
    return false;
}

#reduzir(calc, recinto, animalDiferente){
    let i, x, animal;

    for(i = 0; i < recinto.animais.length; i++){
        animal = recinto.animais[i].nome
        for(x = 0; x < this.#dados.length; x++) {
            if (this.#dados[x].especie === animal ) calc -= recinto.animais[i].qtd * this.#dados[x].tamanho;
        }
    }
    if (animalDiferente != animal && recinto.animais.length > 0) calc--;
    return calc;
}

#habitate(habitate, x){
    let i, res, tamanho = habitate.bioma.length;
    for ( i = 0; i < tamanho; i++) {
        res = this.#recinto[x].bioma.findIndex(val => val === habitate.bioma[i]);
        if (res != -1) return true;   
    }
    return false;
}


analisaRecintos(animal, quantidade) {
    let recintosViaveis, erro, arrayFinal = [];;
    this.#animal = animal;
    this.#quantidade = quantidade;

    if (this.#quantidade < 1) {
        recintosViaveis = false
        erro = "Quantidade inválida"
        return { recintosViaveis, erro };
    };
    let calc, i, x, animais, habitate, msg;

    i = this.#dados.findIndex(val => val.especie === this.#animal);
    if(i != -1) {

        for (x = 0; x < this.#recinto.length; x++) {

            calc = this.#dados[i].tamanho * this.#quantidade;
            habitate = this.#habitate(this.#dados[i], x);
            if (this.#recinto[x].animais.length === 0 && habitate && calc < this.#recinto[x].tamanho) {
                msg = `Recinto ${this.#recinto[x].id} (espaço livre: ${this.#recinto[x].tamanho - calc} total: ${this.#recinto[x].tamanho})`;
                arrayFinal.push(msg);
                
            } else if (this.#recinto[x].animais.length > 0 && habitate) {
                animais = this.#reduzir(this.#recinto[x].tamanho, this.#recinto[x], this.#animal);
                if (this.#recinto[x].tamanho >= (animais - calc) && this.#pode(this.#recinto[x], this.#animal) && (animais - calc) > 0) { 
                    msg = `Recinto ${this.#recinto[x].id} (espaço livre: ${animais - calc} total: ${this.#recinto[x].tamanho})`; 
                    arrayFinal.push(msg); 
                } else if (this.#recinto[x].tamanho <= (animais + calc)) {  
                    recintosViaveis = false
                    erro = "Não há recinto viável";
                }; 
            };           
        }; 

    } else {
        erro = "Animal inválido"
        recintosViaveis = false
        return { recintosViaveis, erro };
    };
    if (arrayFinal.length < 1) return { recintosViaveis, erro };
    recintosViaveis = arrayFinal;
    erro = false
    return { recintosViaveis, erro };
};

};

export { RecintosZoo as RecintosZoo };


// const user = new RecintosZoo().analisaRecintos("UNICORNIO", 1);
// const user2 = new RecintosZoo().analisaRecintos("LEAO", 1);
// const user3 = new RecintosZoo().analisaRecintos("MACACO", 10);
// const user4 = new RecintosZoo().analisaRecintos("GAZELA", 2);
// const user5 = new RecintosZoo().analisaRecintos("MACACO", 2);

// console.log(user);

// console.log(user2);

// console.log(user3);

// console.log(user4);

// console.log(user5);