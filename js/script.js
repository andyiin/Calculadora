/**
 * Calculadora con distinas funcionalidades
 * 
 * @author Andrea Solís Tejada
 */

const calculadora = {
    botones: ["CE", "DEL", "%", "+", "7", "8", "9", "-", "4", "5", "6", "x", "1", "2", "3", "/", "0", "+/-", ",", "="],
    input: null,
    div: null,
    crearCalculadora: function () {
        this.div = document.createElement("div");
        this.div.setAttribute("class", "calculadora");
        document.body.appendChild(this.div);

        this.input = document.createElement("input");
        this.input.setAttribute("type", "text");
        this.input.setAttribute("class", "pantalla");
        this.input.setAttribute("value", "0");
        this.input.setAttribute("disabled", "true");
        this.div.appendChild(this.input);

        const divBotones = document.createElement("div");
        divBotones.setAttribute("class", "botones");
        this.div.appendChild(divBotones);
        // CSS a la calculadora
        const style = document.createElement("style");
        style.textContent = `
            .calculadora {
                width: 300px;
                height: 400px;
                border: 1px solid black;
                margin: 0 auto;
                padding: 10px;
                box-sizing: border-box;
                background-color: #B28DFF;
            }
            .pantalla {
                width: 100%;
                height: 50px;
                font-size: 30px;
                text-align: right;
                margin-bottom: 10px;
            }
            .botones {
                width: 100%;
                height: 300px;
            }
            .botones .boton {
                width: 25%;
                height: 50px;
                font-size: 20px;
                border: 1px solid black;
                border-radius: 5px;
                margin-bottom: 10px;
                box-sizing: border-box;
                background-color: #D5AAFF;
            }
            .botones .boton:hover {
                background-color: #C5A3FF;
            }
            .botones .clear {
                clear: both;
            }
        `;
        document.head.appendChild(style);

        const fragment = document.createDocumentFragment();
        this.botones.forEach((boton, i) => {
            const botonCalculadora = document.createElement("button");
            botonCalculadora.setAttribute("id", boton);
            botonCalculadora.setAttribute("class", "boton");
            botonCalculadora.textContent = boton;
            fragment.appendChild(botonCalculadora);

            if (i % 4 === 3) {
                const div = document.createElement("div");
                div.setAttribute("class", "clear");
                fragment.appendChild(div);
            }
        });
        divBotones.appendChild(fragment);
    },
    comportamientoDisplay: () => {
        const botones = document.querySelectorAll(".botones button");
        botones.forEach(boton => {
            boton.addEventListener("click", () => {
                const display = document.querySelector(".pantalla");
                const valorDisplay = display.value;
                const valorBoton = boton.textContent;
                const ultimoCaracter = valorDisplay[valorDisplay.length - 1];

                switch (valorDisplay) {
                    case "0":
                        if (valorBoton === "0") {
                            display.value = "0";
                        } else if (valorBoton === ",") {
                            display.value = "0,";
                        } else {
                            display.value = valorBoton;
                        }
                }

                switch (valorBoton) {
                    case "CE":
                        display.value = "0";
                        break;
                    case "DEL":
                        if (valorDisplay.length === 1) {
                            display.value = "0";
                        } else {
                            display.value = valorDisplay.slice(0, -1);
                        }
                        break;
                    case "+/-":
                        if (valorDisplay === "0") {
                            display.value = "0";
                        } else if (valorDisplay[0] === "-") {
                            display.value = valorDisplay.slice(1);
                        } else {
                            display.value = "-" + valorDisplay;
                        }
                        break;

                    case "+":
                    case "-":
                    case "x":
                    case "/":
                    case "%":
                        if (valorDisplay === "0") {
                            display.value = "0";
                        } else if (valorDisplay[valorDisplay.length - 1] === "+" || valorDisplay[valorDisplay.length - 1] === "-" || valorDisplay[valorDisplay.length - 1] === "x" || valorDisplay[valorDisplay.length - 1] === "/" || valorDisplay[valorDisplay.length - 1] === "%") {
                            display.value = valorDisplay.slice(0, -1) + valorBoton;
                        } else {
                            display.value = valorDisplay + valorBoton;
                        }
                        break;

                    case "=":
                        if (valorDisplay === "0") {
                            display.value = "0";
                        } else if (valorDisplay !== "0" && valorDisplay[valorDisplay.length - 1] === "+" || valorDisplay[valorDisplay.length - 1] === "-" || valorDisplay[valorDisplay.length - 1] === "x" || valorDisplay[valorDisplay.length - 1] === "/") {
                            display.value = valorDisplay.slice(0, -1);
                        } else {

                            const array = valorDisplay.split(/(\+|-|x|\/)/);
                            let resultado = parseFloat(array[0]);
                            for (let i = 1; i < array.length; i += 2) {
                                switch (array[i]) {
                                    case "+":
                                        resultado += parseFloat(array[i + 1]);
                                        break;
                                    case "-":
                                        resultado -= parseFloat(array[i + 1]);
                                        break;
                                    case "x":
                                        resultado *= parseFloat(array[i + 1]);
                                        break;
                                    case "/":
                                        resultado /= parseFloat(array[i + 1]);
                                        break;
                                    case "%":
                                        resultado %= parseFloat(array[i + 1]);
                                        break;
                                }
                            }
                            display.value = resultado;
                        }
                        break;
                    default:
                        if (valorDisplay !== "0" && valorBoton === "0" && ultimoCaracter !== "0") {
                            display.value = valorDisplay + valorBoton;
                        } else if (valorDisplay !== "0" && valorBoton === "0" && ultimoCaracter === "0") {
                            display.value = valorDisplay;
                        } else if (valorDisplay !== "0" && valorBoton === ",") {
                            if (valorDisplay.includes(",")) {
                                display.value = valorDisplay;
                            } else {
                                display.value = valorDisplay + valorBoton;
                            }
                        } else if (valorDisplay !== "0" && valorBoton !== "0" && valorBoton !== ",") {
                            display.value = valorDisplay + valorBoton;
                        }
                }

            });
        });

    }
};

document.addEventListener("DOMContentLoaded", () => {
    calculadora.crearCalculadora();
    calculadora.comportamientoDisplay();
});