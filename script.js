const form = document.getElementsByTagName("form")[0];
let x = 1;

function novoCampo(){
    let label = document.createElement("label");
    label.setAttribute("for","rotulo"+x);
    label.innerText = "Rótulo";

    let input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("name","rotulo"+x);

    let label1 = document.createElement("label");
    label1.setAttribute("for","tipo"+x);
    label1.innerText = " Tipo ";

    let select = document.createElement("select");
    select.setAttribute("name","tipo"+x);
    select.setAttribute("onchange","mostrarOpcoes(this,"+x+")");

    let vet = {
        text:"Texto",
        number:"Número",
        date:"Data",
        select:"Opções",
        textarea:"Texto longo"
    }

    for(let chave in vet){
        let opt = document.createElement("option");
        opt.value = chave;
        opt.innerText = vet[chave];
        select.appendChild(opt);
    }

    // campo para opções do select (inicialmente escondido)
    let opcoes = document.createElement("input");
    opcoes.setAttribute("type","text");
    opcoes.setAttribute("name","opcoes"+x);
    opcoes.setAttribute("placeholder","Digite opções separadas por vírgula");
    opcoes.style.display = "none";

    let br = document.createElement("br");

    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(label1);
    form.appendChild(select);
    form.appendChild(opcoes);
    form.appendChild(br);

    x++;
}

function mostrarOpcoes(select, index){
    let campoOpcoes = document.getElementsByName("opcoes"+index)[0];
    if(select.value === "select"){
        campoOpcoes.style.display = "inline";
    } else {
        campoOpcoes.style.display = "none";
    }
}

function visualizarForm(){
    const iframe = document.getElementById("preview");
    let doc = iframe.contentDocument || iframe.contentWindow.document;

    let html = "<form>";

    for(let i = 0; i < x; i++){
        let rotuloEl = document.getElementsByName("rotulo"+i)[0];
        let tipoEl = document.getElementsByName("tipo"+i)[0];

        if(!rotuloEl || !tipoEl) continue;

        let rotulo = rotuloEl.value;
        let tipo = tipoEl.value;

        html += `<label>${rotulo}</label>`;

        if(tipo === "select"){
            let opcoesEl = document.getElementsByName("opcoes"+i)[0];
            let lista = opcoesEl ? opcoesEl.value.split(",") : [];

            html += "<select>";
            lista.forEach(op => {
                html += `<option>${op.trim()}</option>`;
            });
            html += "</select><br>";

        } else if(tipo === "textarea"){
            html += `<textarea name="${rotulo}"></textarea><br>`;

        } else {
            html += `<input type="${tipo}" name="${rotulo}"><br>`;
        }
    }

    html += "</form>";

    doc.open();
    doc.write(html);
    doc.close();
}
