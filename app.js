let elQuestionScreen = document.getElementById("questionscreen")
let elScreenResult = document.getElementById("resultscreen")
let elWelcomeScr = document.getElementById("welcomescreen")
let elResumenScr = document.getElementById("resumenscreen")
let elUsuarioRegistrado = document.getElementById("usuarioregistrado")
let nombreUsuario = ''

console.log("localStorage")
console.log(localStorage);
console.log("")
console.log("")
console.log("sesionStorage")
console.log(sessionStorage);
//sessionStorage.names = JSON.stringify(names);
// localStorage.setItem("userInfo",""); localStorage.setItem("userDataAnswer","")

if(sessionStorage.questions!=null){
    var questionsArray = JSON.parse(sessionStorage.questions);
}else{
    var questionsArray = [];
}
if(localStorage.userInfo){
    var userInfo = JSON.parse(localStorage.userInfo);
}else{
    var userInfo = [];
}
if(localStorage.userDataAnswer){
    var userDataAnswer = JSON.parse(localStorage.userDataAnswer);
}else{
    var userDataAnswer = [];
}
console.log(userDataAnswer)

// userInfoNew= {"userName": "prueba", "indexCurrentQuestion" : 0, "NumPregunta" : 0}
// localStorage.setItem("userInfo", JSON.stringify(userInfoNew))


nombreUsuario = document.getElementById("username_id").value
nombreUsuarioInput = document.getElementById("username_id")
let numRes = 0;
let resumen_data = []
let resumen_data_general = []
console.log(resumen_data)

//Mientras no cerremos el navegador se mantendra nuestro usuario abierto
let userName = sessionStorage.getItem('Nombre')
nombreUsuarioInput.value = userName
/*if(name!="" && name!=null){
    nombreUsuarioInput.setAttribute('readonly', true)
}*/

//sessionStorage.setItem('Nombre', nombreUsuario)

function Quiz() {
    this.questions = []   // Traigo el Array con la Data 
  
    this.counter = 0
    let indexCurrentQuestion = 0
    console.log(questionsArray);
    
    if(sessionStorage.questions!=null){
        for (let i = 0; i < 21; i++) {
            if(!questionsArray[i]){
                indexCurrentQuestion= i;
                console.log(indexCurrentQuestion)
                break;
            }
        }
    }else{
        indexCurrentQuestion= 0
    }

    console.log("el index es: "+this.indexCurrentQuestion);
    
    this.indexCurrentQuestion = indexCurrentQuestion
    this.addQuestion = function(question) {
        this.questions.push(question)
    }

    this.showCurrentQuestion = function(indexCurrentQuestionSend=0) {
        console.log("indexCurrentQuestionSend: "+indexCurrentQuestionSend)
        
        //codigo nuevo, guardar el nombre de usuario en localstorage y compara si el nombre de usuario ya existe
        

        let localUser = document.getElementById("username_id").value
        let userCom = localStorage.getItem('Nombre de usuario');   
        console.log(localStorage)


        if (localUser === userCom) {
            //Punto 3 de la tarea, falta añadir el && de numero de respuestas que tiene
            seRegistrado();
            
            //localStorage.names = JSON.stringify(names);
            /*var storedNames = JSON.parse(localStorage.names);
            console.log(storedNames);*/
            
        }       

        if(sessionStorage.questions!=null){
            for (let i = 0; i < 21; i++) {
                if(!questionsArray[i]){
                    indexCurrentQuestion= i;
                    console.log(indexCurrentQuestion)
                    break;
                }
            }
        }else{
            indexCurrentQuestion= 0
        }
        if(indexCurrentQuestionSend!=0){
            indexCurrentQuestion = indexCurrentQuestionSend
        }

        const result = userInfo.find(element  => element.userName == localUser)
        if(result.indexCurrentQuestion){ indexCurrentQuestion = result.indexCurrentQuestion }else{ indexCurrentQuestion = 0}
        
        this.indexCurrentQuestion = indexCurrentQuestion;
        console.log("el index es: "+this.indexCurrentQuestion);

        if (this.indexCurrentQuestion < this.questions.length) {

            console.log(this.indexCurrentQuestion)
            this.questions[this.indexCurrentQuestion].getElement()  // recupera dato del array[x]
            console.log("Soy this.indexCurrentQuestion Despues: " + this.indexCurrentQuestion)
            localStorage.setItem('Nombre de usuario', localUser);
            /*var names = [];
            names = [{"name": "hola","obj": "hola",}]
            names.push({ name: 'example', obj: 'example2' })
            localStorage.setItem("names", JSON.stringify(names));

            localStorage.names = JSON.stringify(names);
            var storedNames = JSON.parse(localStorage.names);
            console.log(storedNames);*/
            
            //...
            var storedNames = JSON.parse(localStorage.getItem("names"));

            elWelcomeScr.style.display = "none"
            elQuestionScreen.style.display = "block"
            elInicioBtnregresar2.style.display = "block"
            

            sessionStorage.setItem('Nombre', localUser)
            sessionStorage.setItem('Estado', "proceso")

        } else {
            console.log("aloja")
            /*var questions = [];
            questions.push({ question: , aswer:  })
            sessionStorage.setItem("names", JSON.stringify(questions));*/
            elQuestionScreen.classList.add('hidden')                                // --
                                                                                    //
            // let elCorrectAnswers = document.querySelector("#correctAnswers")        //  -->> Activa Ventana de Resultados
            // elCorrectAnswers.innerHTML = quiz.counter                               // 
                
            // --- Elimina data del Array[resumen_data] y Suma data al Array[resumen_data_general]  
            resumen_data[0] = document.getElementById("username_id").value
            
            resumen_data_general.push(resumen_data)
            resumen_data = []
            nombreUsuario = ""
            console.log(resumen_data)
            console.log('Data_General_Usuarios: ' + resumen_data_general)
            // elScreenResult.classList.add('block')                                //
            elScreenResult.style.display = "block"                                  // --

            sessionStorage.setItem('Estado', "finalizado")
        }

        console.log(sessionStorage)
    }
}


function Question(numeroPregunta, title, answers, correctAnswer, condicionante, numeroCondicionante) {
    this.title = title
    this.answers = answers
    this.correctAnswer = correctAnswer
    this.condicionante = condicionante
    this.numeroPregunta = numeroPregunta
    this.numeroCondicionante = numeroCondicionante
    
//  console.log("SOY CONDICIONANTE: " + this.condicionante)

    this.getBody = function() {
        let body = this.title.toUpperCase() + '\n'
        for (let i=0; i<this.answers.length; i++) {
             body += (i+1) + '. ' + this.answers[i] + '\n'
        }
        return body
    }
    this.addAnswer = function(answer) {
        // this.answers[this.answers.length] = answer
        this.answers.push(answer)
    }
    
    this.getElement = function() {

        // Suma Nombre de Usuario
        let questionNombreUsuario = document.createElement("h2")
        usuarioLocal = document.getElementById("username_id").value
        questionNombreUsuario.textContent = 'Usuario: '+usuarioLocal
        elQuestionScreen.append(questionNombreUsuario)


        // Suma el Titulo  
        let questionNumber = document.createElement("h2")
        questionNumber.textContent = "Pregunta " + this.numeroPregunta  + " / " + "20"
        elQuestionScreen.append(questionNumber)

        // Suma la Pregunta
        let questionTitle = document.createElement("h3")
        questionTitle.textContent = this.title
        elQuestionScreen.append(questionTitle)

        // Valor para ver si es --->>> Pregunta Condicionante
        let questionCondicionante = document.createElement("h3")
        questionCondicionante.textContent = this.condicionante
        elQuestionScreen.append(questionCondicionante)

        // crea el Encabezado de la lista en Html
        let questionAnswers = document.createElement("ul")
        questionAnswers.classList.add("question__awswers")

        // las opciones estan en this.answers   y lo maneja como "answer" dentro del ciclo forEach
        this.answers.forEach((answer, index) => {
            let elAnswer = document.createElement("li")
            elAnswer.classList.add("awswer")
            elAnswer.textContent = answer
            elAnswer.id = index+1
            elAnswer.addEventListener("click", this.checkAnswer)
            questionAnswers.append(elAnswer)
        })

        elQuestionScreen.append(questionAnswers)
    }

   


    this.checkAnswer = (event) => {
        let anwserSelected = event.target
    
        //Save numberdePregunta in localstorage
        localStorage.setItem('Numero de pregunta', numeroPregunta);
    
        //  console.log(event.target)
    //  console.log(anwserSelected)
        console.log("pregunta "+numeroPregunta+" y Respuesta: "+anwserSelected.id)
        
        questionsArray.push({ "respuesta" : anwserSelected.id})
        sessionStorage.setItem("questions", JSON.stringify(questionsArray));


        resumen_data[this.numeroPregunta] = anwserSelected.id
            //  console.log(anwserSelected)
        if (this.isCorrectAnswer(anwserSelected.id)) {
            anwserSelected.classList.add('answer--correct')
            quiz.counter++
        } else {
            anwserSelected.classList.add('answer--wrong')
            let elCorrectAnswer = document.getElementById(this.correctAnswer)
            elCorrectAnswer.classList.add('answer--correct')
        }

        //Preguntas Condicionante
        if (condicionante === true && (this.isCorrectAnswer(anwserSelected.id)) ) {
//          console.log('Soy condicionante y correcta')
            
            quiz.indexCurrentQuestion= this.numeroCondicionante;
            quiz.indexCurrentQuestion--;
            setTimeout(function() {
                elQuestionScreen.textContent = ''
                quiz.showCurrentQuestion()
            }, 1000)
        }
         else {                 
//          console.log('Nose si Soy condicionante y Nose si soy correcta')

        setTimeout(function() {
            elQuestionScreen.textContent = '';
            quiz.indexCurrentQuestion++;
            quiz.showCurrentQuestion()
        }, 1000)}


        //Guardamos la informacion dentro de el localStorage para reutilizarla luego y mostrarla
        userName = document.getElementById("username_id").value
        NumPregunta = this.numeroPregunta+1
        console.log(NumPregunta)

        console.log("si paso por aqui")
        console.log(userInfo)
        console.log(userName)
        const result = userInfo.findIndex(element  => element.userName == userName);
        userInfo[result]= {"userName": userName,  "indexCurrentQuestion" : NumPregunta-1}
        console.log(userInfo[result])
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        const result2 = userInfo.findIndex(element  => element.userName == userName);
        userDataAnswer[result2]["p"+(NumPregunta-1)]= anwserSelected.id
        console.log(userDataAnswer[result2]["p"+NumPregunta])

        localStorage.setItem("userDataAnswer", JSON.stringify(userDataAnswer));


    }
 
    this.isCorrectAnswer = function(userAnswer) {
        if (this.correctAnswer == userAnswer) return true
        else return false
    }
    
}



let question1 = new Question(1, '¿La calidad del producto o servicio es la esperada?', ["Si", "No", "Quizás", "Nunca"], 1, true, 2)
let question2 = new Question(2, '¿Repetiría la experiencia de compra?', ["Si", "No", "Quizás", "Nunca"], 2, false, 3)
let question3 = new Question(3, '¿Nos recomendaría a sus amigos o familiares?', ["Si", "No", "Quizás", "Nunca"], 2, false, 4)
let question4 = new Question(4, '¿Ha tenido algún problema en el proceso de compra?', ["Si", "No", "Quizás", "Nunca"], 1, true, 5)
let question5 = new Question(5, '¿Cuántas veces ha utilizado el producto o servicio?', ["Si", "No", "Quizás", "Nunca"], 2, false, 6)
let question6 = new Question(6, '¿Cuánto tiempo hace que conoce nuestra empresa? ¿Desde cuándo es nuestro cliente?', ["Si", "No", "Quizás", "Nunca"], 2, false, 7)
let question7 = new Question(7, '¿Qué le ha parecido la relación entre la calidad ofrecida y el precio?', ["Si", "No", "Quizás", "Nunca"], 1,true, 8)
let question8 = new Question(8, '¿Con qué frecuencia se puede permitir comprar nuestro producto o servicio?', ["Si", "No", "Quizás", "Nunca"], 2, false, 9)
let question9 = new Question(9, '¿Volvería a invertir su dinero en nuestros productos o servicios?', ["Si", "No", "Quizás", "Nunca"], 2, false, 10)
let question10 = new Question(10, '¿Es nuestra marca la primera que tiene en mente en nuestro sector?', ["Si", "No", "Quizás", "Nunca"], 1, true, 11)
let question11 = new Question(11, '¿Cómo valora usted la relación calidad-precio?', ["Si", "No", "Quizás", "Nunca"], 2, false, 12)
let question12 = new Question(12, '¿Cómo valora usted la atención recibida?', ["Si", "No", "Quizás", "Nunca"], 1, true, 13)
let question13 = new Question(13, '¿Cómo ha sido tratado?', ["Si", "No", "Quizás", "Nunca"], 1, true, 14)
let question14 = new Question(14, '¿Considera suficientes los conocimientos de la persona que le ha atendido?', ["Si", "No", "Quizás", "Nunca"], 2, false, 15)
let question15 = new Question(15, '¿Le ha inspirado confianza la atención recibida?', ["Si", "No", "Quizás", "Nunca"], 2, false, 16)
let question16 = new Question(16, '¿La persona que le ha atendido ha comprendido sus necesidades?', ["Si", "No", "Quizás", "Nunca"], 2, false, 17)
let question17 = new Question(17, '¿Añadiría alguna pregunta a esta encuesta de satisfacción?', ["Si", "No", "Quizás", "Nunca"], 1, true, 18)
let question18 = new Question(18, 'Aproveche este apartado para comunicarnos cualquier tema que considere relevante y sobre el cual no ha sido preguntado.', ["Si", "No", "Quizás", "Nunca"], 2, false, 19)
let question19 = new Question(19, '¿Tiene alguna sugerencia adicional sobre nuestro producto o servicio?', ["Si", "No", "Quizás", "Nunca"], 2, false, 20)
let question20 = new Question(20, '¿Tiene alguna sugerencia sobre la encuesta?', ["Si", "No", "Quizás", "Nunca"], 2, false, 0)


let quiz = new Quiz()
quiz.addQuestion(question1)
quiz.addQuestion(question2)
quiz.addQuestion(question3)
quiz.addQuestion(question4)

quiz.addQuestion(question5)
quiz.addQuestion(question6)
quiz.addQuestion(question7)
quiz.addQuestion(question8)
quiz.addQuestion(question9)
quiz.addQuestion(question10)

quiz.addQuestion(question11)
quiz.addQuestion(question12)
quiz.addQuestion(question13)
quiz.addQuestion(question14)
quiz.addQuestion(question15)
quiz.addQuestion(question16)
quiz.addQuestion(question17)
quiz.addQuestion(question18)
quiz.addQuestion(question19)
quiz.addQuestion(question20)

let elNumberOfQuestions = document.querySelectorAll(".numberOfQuestions")

elNumberOfQuestions.forEach(function(elnumberofquestions) {
    elnumberofquestions.textContent = quiz.questions.length
})

// Puntapie Inicial ...!! en el Codigo.. 
// -------------------------------------
function seeFirstQuestion() {
   //  elWelcomeScr.style.display = "block"

    // con este suma una class 
  //  let userName = document.getElementById("username").value;
   // console.log(userName);
    //elWelcomeScr.classList.add('hidden')
    elQuestionScreen.textContent = ''

    elWelcomeScr.style.display = "none"

//  elQuestionScreen.classList.add('block')                                // --
    indexCurrentQuestion= 0
    elQuestionScreen.style.display = "block"
    elInicioBtnregresar2.style.display = "block"

    console.log("primera pregunta")
    userName = document.getElementById("username_id").value

    console.log("userInfo")
    console.log(userInfo)
    const result = userInfo.find(element  => element.userName == userName)
    console.log(result)
    if(!result){
        console.log("no existo")
        //si no existe lo agregamos
        userInfoNew= {"userName": userName,  "indexCurrentQuestion" : 0, "NumPregunta" : 0}
        console.log(userInfoNew)
        userInfo.push(userInfoNew)
        localStorage.setItem("userInfo", JSON.stringify(userInfo))

        //userDataAnswerNew = {"userName": userName}

        userDataAnswerNew = {"userName": userName, "p1": false, "p2": false, "p3": false, "p4": false, "p5": false, "p6": false, "p7": false, "p8": false, "p9": false, "p10": false, "p11": false, "p12": false, "p13": false, "p14": false, "p15": false, "p16": false, "p17": false, "p18": false, "p19": false, "p20": false}
        console.log(userDataAnswerNew)
        userDataAnswer.push(userDataAnswerNew)
        localStorage.setItem("userDataAnswer", JSON.stringify(userDataAnswer))
    }else{
        console.log("si existo")
        if(result.indexCurrentQuestion){ indexCurrentQuestion = result.indexCurrentQuestion }else{ indexCurrentQuestion = 0}
    }
    
    quiz.showCurrentQuestion(indexCurrentQuestion)
}


function seeEncuestas() {
    
    elWelcomeScr.style.display = "none"
    elScreenResult.style.display = "none"
    elResumenScr.style.display = "block"

    // -- 2 DETALLE DE LA DATA
    console.log('Valor de Array : ' + resumen_data_general)
    console.log('Largo de Array : ' + resumen_data_general.length)
    
  

    let tr = document.createElement("tr");

    var tituloArray = ['Nombre', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7','P8','P9','P10','P11','P12','P13','P14','P15','P16','P17','P18','P19','P20'];
        tituloArray.forEach( function(valor, indice, array) {
            th = document.createElement("th");
            thText = document.createTextNode(tituloArray[indice]);
            th.appendChild(thText);
            tr.appendChild(th);
        });

    tabla.appendChild(tr);
   
    console.log("datos")
    console.log(userDataAnswer)
    for (i=0;i<userDataAnswer.length;i++){ 
        tr = document.createElement("tr");
            for (j=0;j<21;j++) {
                if (userDataAnswer[i]["p"+j] == false && j!=0 ) {
                    
                    td = document.createElement("td");
                    tdText = document.createTextNode('-');
                    td.appendChild(tdText);
                    tr.appendChild(td);
    
                 } else {
                    let response = ""
                    td = document.createElement("td");
                    //console.log(resumen_data_general[i][j])
                    
                    if(j==0){
                        response = userDataAnswer[i]["userName"];
                    }else{
                        if(userDataAnswer[i]["p"+j]==="1"){
                            response = "Si"
                        }else if(userDataAnswer[i]["p"+j]==="2"){
                            response = "No"
                        }else if(userDataAnswer[i]["p"+j]==="3"){
                            response = "Quizás"
                        }else if(userDataAnswer[i]["p"+j]==="4"){
                            response = "Nunca"
                        }else{
                            response = ""
                        }
                    }
                    tdText = document.createTextNode(response);
                    td.appendChild(tdText);
                    tr.appendChild(td);
                 }
            } 
        tabla.appendChild(tr);

    }

    // -- 2

    // -- MUestra Total
    elResumenScr.appendChild(tabla);

}
function seRegistrado() {
    elWelcomeScr.style.display = "none"
    elQuestionScreen.style.display = "none"
    elScreenResult.style.display = "none"
    elResumenScr.style.display = "none"
    elUsuarioRegistrado.style.display = "flex"
}


function seeInicio() {
    
    elResumenScr.style.display = "none"
    elScreenResult.style.display = "none"
    elWelcomeScr.style.display = "block"
    quiz.indexCurrentQuestion = 0

}

function seeInicioDos() {
    
    elResumenScr.style.display = "none"
    elScreenResult.style.display = "none"
    elInicioBtnregresar2.style.display = "none"
    elQuestionScreen.style.display = "none"
    elWelcomeScr.style.display = "block"
    let tabla=document.querySelector("table#tabla")
    //tabla.textContent= ""
    

 // elResumenScr.textContent = ""
 }

// -------------------------

    let tituloResumen = document.createElement("h2")
    tituloResumen.textContent = "Resumen de Encuestas" 
    elResumenScr.append(tituloResumen)

    const tabla = document.createElement("table");
    tabla.setAttribute("border", "1");
    tabla.id = "tabla"; 

 

// -------------------------


let elWelcomeBtn = document.getElementById("welcome_btn")
elWelcomeBtn.addEventListener("click", seeFirstQuestion)

let elResumenBtn = document.getElementById("resumen_btn")
elResumenBtn.addEventListener("click", seeEncuestas)

let elInicioBtn = document.getElementById("inicio_btn")
elInicioBtn.addEventListener("click", seeInicio)

let elInicioBtnregresar = document.getElementById("regresar_btn")
elInicioBtnregresar.addEventListener("click", seeInicioDos)

let elInicioBtnregresar2 = document.getElementById("regresar_btn2")
elInicioBtnregresar2.addEventListener("click", seeInicioDos)


