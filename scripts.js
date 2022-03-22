var valorTroco = document.getElementsByName("anotarvalor");
var valorEntrega = document.getElementsByName("anotarentrega");
var valorInputEntrega = document.getElementsByName("valorentr");
var somaTroco = 0;
var somaEntrega = 0;
var somainputent = 0;
var somaTotal = 0;
var totalentregas = 0;
var RefEntregas = 0;
var RefValores = 0;
var RefResultEntregas = 0;
var RefResultValores = 0;
var RefSubEntregas = 0;
var RefSubValores = 0;


var tro = [];
var ent = [];
var inputent = [];

var lerLog = "0";
var lerTroco = "0";
var lerEntregas = "0";

const S = setInterval(somar, 2000);

var firebaseConfig = {
    apiKey: "AIzaSyDpa7lriOmFp9IR28zspFjZg9k5Dc8Phe0",
    authDomain: "entregas-d963d.firebaseapp.com",
    projectId: "entregas-d963d",
    storageBucket: "entregas-d963d.appspot.com",
    messagingSenderId: "150523899932",
    appId: "1:150523899932:web:2d541392434c149b456fd9",
    measurementId: "G-V92LQWXMQT"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


function cmdImprimir() {
    imprimir1();
    imprimir2();
    setTimeout(() => { gravar(); }, 3000);
}
function cmdImprimir2via() {
    imprimir1();
    limparvia2();
}
//================================================== IMPRIMIR ==========================================
function imprimir1() {
    let tela_impressaoip1;

    let dataip1 = new Date();
    let diamesip1 = dataip1.getDate();
    let mesmesip1 = dataip1.getMonth() + 1;
    let anomesip1 = dataip1.getFullYear();
    let horadiaip1 = dataip1.getHours();
    let minutodiaip1 = dataip1.getMinutes();

    let impri1 = document.getElementById("inputnome");
    let impri2 = document.getElementById("inputend");
    let impri3 = document.getElementById("inputtel");
    let impri4 = document.getElementById("inputpag");
    let impri5 = document.getElementById("inputvalor");
    let impri6 = document.getElementById("inputtroco");

    tela_impressaoip1 = window.open('about:blank');
    tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Karmem Noleto Doceria -<br>");
    if (document.getElementById("inputpag").value === "Presente") {
        tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>Para: " + impri1.value + "<br>");
    }
    else {
        tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>Cliente: " + impri1.value + "<br>");
    }
    tela_impressaoip1.document.write("<h1 align='left' style='font-family:Arial,sans-serif'>Endereço: " + impri2.value + ".<p>");
    if (document.getElementById("inputtel").value === '') {

    }
    else {
        tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>Telefone: " + impri3.value + "<br>");
    }
    if (document.getElementById("inputpag").value === "Presente") {
        tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Presente -" + "<br>");
    }
    else {
        tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>Pagamento: " + impri4.value + "<br>");
    }
    if (document.getElementById("inputpag").value === "Pix/Transferência" || document.getElementById("inputpag").value === "Estabelecimento") {
        tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>Valor: R$" + impri5.value + "&nbsp;&nbsp;(Pago)" + "<br>");
    }
    else if (document.getElementById("inputpag").value === "Presente") {
        //Presente não deve constar o valor
    }
    else {
        tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>Valor: R$" + impri5.value + "<br>");
    }
    if (document.getElementById('inputtroco').value === '' || document.getElementById("inputpag").value === "Cartão" || document.getElementById("inputpag").value === "Pix/Transferência" || document.getElementById('inputpag').value === 'Estabelecimento' || document.getElementById("inputpag").value === "Presente") {
        // tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>Troco: Não precisa de troco.<br>");
    }
    else {
        let troc = impri5.value - impri6.value;
        let vt = Math.abs(troc);
        tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>Troco para: R$" + impri6.value + "&nbsp;&nbsp;&nbsp;" + "(T:" + vt + ")" + "<br>");
    }
    tela_impressaoip1.document.write("<h1 style='font-family:Arial,sans-serif'>Horário: " + diamesip1 + "/" + mesmesip1 + "/" + anomesip1 + " às " + horadiaip1 + "h" + minutodiaip1 + "min.<br>");
    tela_impressaoip1.document.write("<h2 style='font-family:Arial,sans-serif'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; @DS Delivery");
    tela_impressaoip1.window.print();
    tela_impressaoip1.window.close();
}
//========================================== IMPRIMIR NA CAIXA LOG ======================================
function imprimir2() {
    if (document.getElementById('inputvalor').value === '') {
        //Daniel Sousa! DS Delivery 2021 <
    }
    else if (document.getElementById("inputpag").value === "Presente") {
        let EnviarEntregaspe = document.getElementById("inputvalor");
        let EnviarNomepe = document.getElementById("inputnome");
        let CaixaEntregaspe = document.getElementById("CaixaEntregas");
        CaixaEntregaspe.value += ' R$' + EnviarEntregaspe.value + ` - ` + EnviarNomepe.value + ' (PR)' + `\n`;
    }
    else if (document.getElementById("inputpag").value === "Estabelecimento") {
        let EnviarEntregaspe = document.getElementById("inputvalor");
        let EnviarNomepe = document.getElementById("inputnome");
        let CaixaEntregaspe = document.getElementById("CaixaEntregas");
        CaixaEntregaspe.value += ' R$' + EnviarEntregaspe.value + ` - ` + EnviarNomepe.value + ' (E)' + `\n`;
    }
    else if (document.getElementById("inputpag").value === "Pix/Transferência") {
        let EnviarEntregaspix = document.getElementById("inputvalor");
        let EnviarNomepix = document.getElementById("inputnome");
        let CaixaEntregaspix = document.getElementById("CaixaEntregas");
        CaixaEntregaspix.value += ' R$' + EnviarEntregaspix.value + ` - ` + EnviarNomepix.value + ' (P)' + `\n`;
    }
    else if (document.getElementById("inputpag").value === "Cartão") {
        somarinputentregas();
        let EnviarEntregascart = document.getElementById("inputvalor");
        let EnviarNomecart = document.getElementById("inputnome");
        let CaixaEntregascart = document.getElementById("CaixaEntregas");
        CaixaEntregascart.value += ' R$' + EnviarEntregascart.value + ` - ` + EnviarNomecart.value + ' (C)' + `\n`;
    }
    else {
        somarinputentregas();
        let EnviarEntregasdin = document.getElementById("inputvalor");
        let EnviarNomedin = document.getElementById("inputnome");
        let CaixaEntregasdin = document.getElementById("CaixaEntregas");
        CaixaEntregasdin.value += ' R$' + EnviarEntregasdin.value + ` - ` + EnviarNomedin.value + ' (D)' + `\n`;
    }
    let nome = document.getElementById("inputnome");
    let textarea1 = document.getElementById("CaixaLog");
    textarea1.value += 'Cliente: ' + nome.value + `.\n`;
    nome.value = '';

    let endereço = document.getElementById("inputend");
    let textarea2 = document.getElementById("CaixaLog");
    textarea2.value += 'Endereço: ' + endereço.value + `.\n`;
    endereço.value = '';

    if (document.getElementById("inputtel").value === '') {

    }
    else {
        let tel = document.getElementById("inputtel");
        let textarea3 = document.getElementById("CaixaLog");
        textarea3.value += 'Telefone: ' + tel.value + `.\n`;
        tel.value = '';
    }

    let pagamento = document.getElementById("inputpag");
    let textarea5 = document.getElementById("CaixaLog");
    textarea5.value += 'Pagamento: ' + pagamento.value + `.\n`;

    if (document.getElementById('inputpag').value === 'Pix/Transferência' || document.getElementById('inputpag').value === 'Estabelecimento' || document.getElementById('inputpag').value === 'Presente') {
        let valor = document.getElementById("inputvalor");
        let textarea4 = document.getElementById("CaixaLog");
        textarea4.value += 'Valor: R$' + valor.value + '  (Pago)' + `.\n`;
        valor.value = '';

    }
    else {
        let valor = document.getElementById("inputvalor");
        let textarea4 = document.getElementById("CaixaLog");
        textarea4.value += 'Valor: R$' + valor.value + `.\n`;
        valor.value = '';
    }

    if (document.getElementById('inputtroco').value === '' || document.getElementById('inputpag').value === 'Cartão' || document.getElementById('inputpag').value === 'Pix/Transferência' || document.getElementById('inputpag').value === 'Estabelecimento' || document.getElementById('inputpag').value === 'Presente') {

        // let textarea6 = document.getElementById("CaixaLog");
        // textarea6.value += `Troco: Não precisa de troco.\n`;
        let trocos = document.getElementById("inputtroco");
        trocos.value = '';
    }
    else {
        let troco = document.getElementById("inputtroco");
        let textarea6 = document.getElementById("CaixaLog");
        textarea6.value += 'Troco para: R$' + troco.value + `.\n`;
        troco.value = '';
    }

    let datalog = new Date();
    let diameslog = datalog.getDate();
    let mesmeslog = datalog.getMonth() + 1;
    let anomeslog = datalog.getFullYear();
    let horadialog = datalog.getHours();
    let minutodialog = datalog.getMinutes();
    let textarea = document.getElementById("CaixaLog");
    textarea.value += "Horário: " + diameslog + "/" + mesmeslog + "/" + anomeslog + " às " + horadialog + "h" + minutodialog + "min.\n\n";
}
function limparvia2() {
    let nome = document.getElementById("inputnome");
    nome.value = '';

    let endereço = document.getElementById("inputend");
    endereço.value = '';

    let tel = document.getElementById("inputtel");
    tel.value = '';

    let valor = document.getElementById("inputvalor");
    valor.value = '';

    let troco = document.getElementById("inputtroco");
    troco.value = '';
}
function gravar() {

    lerLog = ($("#CaixaLog").val());
    lerTroco = ($("#CaixaTroco").val());
    lerEntregas = ($("#CaixaEntregas").val());

    localStorage.setItem("Log", lerLog);
    localStorage.setItem("Troco", lerTroco);
    localStorage.setItem("Entregas", lerEntregas);

    localStorage.setItem("VTroco", somaTroco);
    localStorage.setItem("VEntregas", totalentregas);
    localStorage.setItem("VTotal", somaTotal);
}
function LocalStorage() {
    if (localStorage.getItem("Log") === null) {
        localStorage.setItem("Log", "");
    }
    else {
        let CL = document.getElementById("CaixaLog");
        CL.value += localStorage.Log;
    }

    if (localStorage.getItem("Troco") === null) {
        localStorage.setItem("Troco", "");
    }
    else {
        let CT = document.getElementById("CaixaTroco");
        CT.value += localStorage.Troco;
    }

    if (localStorage.getItem("Entregas") === null) {
        localStorage.setItem("Entregas", "");
    }
    else {
        let CE = document.getElementById("CaixaEntregas");
        CE.value += localStorage.Entregas;
    }


    if (localStorage.getItem("VTroco") === null) {
        localStorage.setItem("VTroco", 0);
    }
    else {
        somaTroco += parseFloat(localStorage.VTroco);
    }

    if (localStorage.getItem("VEntregas") === null) {
        localStorage.setItem("VEntregas", 0);
    }
    else {
        somaEntrega += parseFloat(localStorage.VEntregas);
    }

    if (localStorage.getItem("VTotal") === null) {
        localStorage.setItem("VTotal", 0);
    }
    else {
        somaTotal += parseFloat(localStorage.VTotal);
    }

}

//==================================================== SOMAR TOTAL ====================================
function somar() {

    totalentregas = somaEntrega + somainputent;
    document.getElementById("CaixaSomaTroco").innerHTML = "Troco: R$" + somaTroco;
    document.getElementById("CaixaSomaEntregas").innerHTML = "Entregas: R$" + totalentregas;
    somaTotal = somaTroco + totalentregas;
    document.getElementById("CaixaSomaTotal").innerHTML = "Total: R$" + somaTotal;
}
//=================================== ANOTAR E SOMAR TROCO =========================================
function anotarTroco() {
    setTimeout(() => { gravar(); }, 3000);
    if (document.getElementById('CaixaInputAnotarTroco').value === '') {

    }
    else {
        somarTroco();
        var valoranotar = document.getElementById("CaixaInputAnotarTroco");
        let textarea = document.getElementById("CaixaTroco");
        textarea.value += ' Pegou R$' + valoranotar.value + `.\n`
        valoranotar.value = '';
    }
}
function somarTroco() {
    for (var i = 0; i < valorTroco.length; i++) {

        tro[i] = parseFloat(valorTroco[i].value);
        somaTroco += parseFloat(tro[i]);
    }

}
//================================= ANOTAR E SOMAR ENTREGAS============================================
function anotarEntrega() {
    setTimeout(() => { gravar(); }, 3000);
    if (document.getElementById('CaixaInputAnotarEntrega').value === '') {


    }
    else {
        somarEntrega();
        let valoranotar = document.getElementById("CaixaInputAnotarEntrega");
        let textarea = document.getElementById("CaixaEntregas");
        textarea.value += ' R$' + valoranotar.value + ` - Inserido.\n`;
        valoranotar.value = '';
    }
} function subtrairEntrega() {
    setTimeout(() => { gravar(); }, 3000);
    if (document.getElementById('CaixaInputAnotarEntrega').value === '') {


    }
    else {
        somarEntrega();
        let valoranotar = document.getElementById("CaixaInputAnotarEntrega");
        valoranotar.value = '';
    }
}
function somarEntrega() {
    for (var i = 0; i < valorEntrega.length; i++) {

        ent[i] = parseFloat(valorEntrega[i].value);
        somaEntrega += parseFloat(ent[i]);
    }
}
function somarinputentregas() {
    for (var i = 0; i < valorInputEntrega.length; i++) {

        inputent[i] = parseFloat(valorInputEntrega[i].value);
        somainputent += parseFloat(inputent[i]);
    }
}
function cmdlimpar() {
    let textarealog = document.getElementById("CaixaLog");
    localStorage.removeItem("Log");
    textarealog.value = '';
}
function relatorio() {
    let rows = ($("#CaixaEntregas").val()).split("\n").length;
    rows -= 1;

    let tela_impressao;
    let data = new Date();
    let diames = data.getDate();
    let mesmes = data.getMonth() + 1;
    let anomes = data.getFullYear();
    let horadia = data.getHours();
    let minutodia = data.getMinutes();

    let ReTroco = parseFloat(localStorage.VTroco);
    let ReEntregas = parseFloat(localStorage.VEntregas);
    let ReTotal = parseFloat(localStorage.VTotal);

    tela_impressao = window.open('about:blank');
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>--------------------------------------------<br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>DS Delivery - Relatório Diário " + " <br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>--------------------------------------------<br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>Nº de Entregas:  " + rows + " <br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>Troco do caixa: R$ " + ReTroco + "  <br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>Total de entregas: R$ " + ReEntregas + " <br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>Soma total: R$ " + ReTotal + "  <br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>--------------------------------------------<br>");
    tela_impressao.document.write("<h2 style='font-family:Arial,sans-serif'>OBS:<br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>--------------------------------------------<br>");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>Data: " + diames + "/" + mesmes + "/" + anomes + " às " + horadia + "h" + minutodia + "min.");
    tela_impressao.document.write("<h1 style='font-family:Arial,sans-serif'>--------------------------------------------<br>");
    tela_impressao.window.print();
    tela_impressao.window.close();
    enviardados();
}

function enviardados() {

    let LocalDB = parseFloat(localStorage.VEntregas);
    let LocalLog = localStorage.Log;

    if (LocalDB != 0) {
        let datadb = new Date();
        let day = datadb.toLocaleDateString();
        let gd = datadb.getDay();
        let hora = datadb.getHours();
        let minuto = datadb.getMinutes();

        var semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

        DataBaseEntregas = ($("#CaixaEntregas").val());
        let ER = ($("#CaixaEntregas").val()).split("\n").length;
        ER -= 1;

        db.collection("KarmemNoleto22").add({
            Data: day,
            Horário: hora + ":" + minuto,
            Entregas_Realizadas: ER,
            Lista_Entregas: DataBaseEntregas,
            Valor_Entregas: LocalDB,
            Log_Impressão: LocalLog,
            Dia_Semana: semana[gd]

        }).then(() => {
            console.log("Relatório Diário foi enviado para o banco de dados!");
        });

        let docRef = db.collection("KN - Valores22").doc("Valores");

        docRef.get().then((doc) => {
            const { R$, Entregas_Totais } = doc.data();

            RefValores = LocalDB + R$;
            RefEntregas = ER + Entregas_Totais;
            BSValores();
            $("#squaredados").fadeIn();

        })
    }
    else {
        console.log("REPORT: Falha ao enviar dados.");
    }
}
function BSValores() {
    db.collection("KN - Valores22").doc("Valores").update({

        R$: RefValores,
        Entregas_Totais: RefEntregas


    }).then(() => {
        console.log("Valores enviados para KN - Valores 2022!");
        setTimeout(() => { $("#squaredados").fadeOut(); }, 3000);
    });

}
function reiniciar() {
    $("#square").fadeIn();
}
function cmdtrue() {
    localStorage.removeItem("Troco");
    localStorage.removeItem("Entregas");
    localStorage.removeItem("Log");
    localStorage.removeItem("VTroco");
    localStorage.removeItem("VEntregas");
    localStorage.removeItem("VTotal");
    window.location.reload();
}
function cmdfalse() {
    $("#square").fadeOut();
}
//=================================================================================
function dsadmin() {
    if(containerdados.style.display === 'block') {
        containerdados.style.display = 'none';
    } else {
        containerdados.style.display = 'block';
    }
    window.scrollBy(1100, 800);
    db.collection("KarmemNoleto22")
        .where("Dia_Semana", "==", "Segunda-Feira").get()
        .then(querySnapshot => {
            const dls1 = querySnapshot.docs.reduce((acc, doc) => {

                const { Data, Entregas_Realizadas, Lista_Entregas, Valor_Entregas } = doc.data();

                acc +=

                    `
          <div id="admlist" onClick="oi()">
          <ul>
          <li>Data: ${Data}</li>
          <li>Entregas Realizadas: ${Entregas_Realizadas}</li>
          <li>Rendimentos: R$${Valor_Entregas}</li>
          <br>
          <li id="idlist">ID:&nbsp;&nbsp;${doc.id}</li>
          </ul>
          <br>
          </div>
          <br>`

                return acc;
            }
                , '')
            const dt1 = document.querySelector('[data-js="lists1"]')
            dt1.innerHTML = dls1;
        })

    db.collection("KarmemNoleto22")
        .where("Dia_Semana", "==", "Terça-Feira").get()
        .then(querySnapshot => {
            const dls2 = querySnapshot.docs.reduce((acc, doc) => {

                const { Data, Entregas_Realizadas, Lista_Entregas, Valor_Entregas } = doc.data();

                acc +=

                    `
          <div id="admlist">
          <ul>
          <li>Data: ${Data}</li>
          <li>Entregas Realizadas: ${Entregas_Realizadas}</li>
          <li>Rendimentos: R$${Valor_Entregas}</li>
          <br>
          <li id="idlist">ID:&nbsp;&nbsp;${doc.id}</li>
          </ul>
          </div>
          <br>`

                return acc;
            }
                , '')
            const dt2 = document.querySelector('[data-js="lists2"]')
            dt2.innerHTML = dls2;
        })

    db.collection("KarmemNoleto22")
        .where("Dia_Semana", "==", "Quarta-Feira").get()
        .then(querySnapshot => {
            const dls3 = querySnapshot.docs.reduce((acc, doc) => {

                const { Data, Entregas_Realizadas, Lista_Entregas, Valor_Entregas } = doc.data();

                acc +=

                    `
          <div id="admlist">
          <ul>
          <li>Data: ${Data}</li>
          <li>Entregas Realizadas: ${Entregas_Realizadas}</li>
          <li>Rendimentos: R$${Valor_Entregas}</li>
          <br>
          <li id="idlist">ID:&nbsp;&nbsp;${doc.id}</li>
          </ul>
          <br>
          </div>
          <br>`

                return acc;
            }
                , '')
            const dt3 = document.querySelector('[data-js="lists3"]')
            dt3.innerHTML = dls3;
        })


    db.collection("KarmemNoleto22")
        .where("Dia_Semana", "==", "Quinta-Feira").get()
        .then(querySnapshot => {
            const dls4 = querySnapshot.docs.reduce((acc, doc) => {

                const { Data, Entregas_Realizadas, Lista_Entregas, Valor_Entregas } = doc.data();

                acc +=

                    `
          <div id="admlist" >
          <ul>
          <li>Data: ${Data}</li>
          <li>Entregas Realizadas: ${Entregas_Realizadas}</li>
          <li>Rendimentos: R$${Valor_Entregas}</li>
          <br>
          <li id="idlist">ID:&nbsp;&nbsp;${doc.id}</li>
          </ul>
          <br>
          </div>
          <br>`

                return acc;
            }
                , '')
            const dt4 = document.querySelector('[data-js="lists4"]')
            dt4.innerHTML = dls4;
        })

    db.collection("KarmemNoleto22")
        .where("Dia_Semana", "==", "Sexta-Feira").get()
        .then(querySnapshot => {
            const dls5 = querySnapshot.docs.reduce((acc, doc) => {

                const { Data, Entregas_Realizadas, Lista_Entregas, Valor_Entregas } = doc.data();

                acc +=

                    `
          <div id="admlist">
          <ul>
          <li>Data: ${Data}</li>
          <li>Entregas Realizadas: ${Entregas_Realizadas}</li>
          <li>Rendimentos: R$${Valor_Entregas}</li>
          <br>
          <li id="idlist">ID:&nbsp;&nbsp;${doc.id}</li>
          </ul>
          <br>
          </div>
          <br>`

                return acc;
            }
                , '')
            const dt5 = document.querySelector('[data-js="lists5"]')
            dt5.innerHTML = dls5;
        })


    db.collection("KarmemNoleto22")
        .where("Dia_Semana", "==", "Sábado").get()
        .then(querySnapshot => {
            const dls6 = querySnapshot.docs.reduce((acc, doc) => {

                const { Data, Entregas_Realizadas, Lista_Entregas, Valor_Entregas } = doc.data();

                acc +=

                    `
          <div id="admlist">
          <ul>
          <li>Data: ${Data}</li>
          <li>Entregas Realizadas: ${Entregas_Realizadas}</li>
          <li>Rendimentos: R$${Valor_Entregas}</li>
          <br>
          <li id="idlist">ID:&nbsp;&nbsp;${doc.id}</li>
          </ul>
          <br>
          </div>
          <br>`

                return acc;
            }
                , '')
            const dt6 = document.querySelector('[data-js="lists6"]')
            dt6.innerHTML = dls6;
        })

    db.collection("KarmemNoleto22")
        .where("Dia_Semana", "==", "Domingo").get()
        .then(querySnapshot => {
            const dls7 = querySnapshot.docs.reduce((acc, doc) => {
                const { Data, Entregas_Realizadas, Lista_Entregas, Valor_Entregas } = doc.data();

                acc +=

                    `
          <div id="admlist" >
          <ul>
          <li>Data: ${Data}</li>
          <li>Entregas Realizadas: ${Entregas_Realizadas}</li>
          <li>Rendimentos: R$${Valor_Entregas}</li>
          <br>
          <li id="idlist">ID:&nbsp;&nbsp;${doc.id}</li>
          </ul>
          <br>
          </div>
          <br>`

                return acc;
            }
                , '')
            const dt7 = document.querySelector('[data-js="lists7"]')
            dt7.innerHTML = dls7;
        })
    // VALORES ==============================================
    db.collection("KN - Valores22").get()
        .then(querySnapshot => {
            const vd = querySnapshot.docs.reduce((acc, doc) => {

                const { R$, Entregas_Totais } = doc.data();

                acc +=

                    `
            <div id="admvalores">
            <h5 class="admValoresMarginH2">INFORMAÇÕES</h5>  
            <hr>
            <br>
            <li class="admValoresMargin">Entregas Realizadas:<b><a style='color:green;'> ${Entregas_Totais}</b></a></li>
            <br>
            <hr>
            <br>
            <li class="admValoresMargin">Rendimentos Totais:<b><a style='color:green;'> R$ ${R$}</b></a></li>
            <br>
            </div>
            <br>`

                return acc;

            }
                , '')
            const vv = document.querySelector('[data-js="valores"]')
            vv.innerHTML = vd;
        })
    //   ======================================================
}
function buscar() {

    let idbusca = document.getElementById("inputbusca").value;

    let docRef = db.collection("KarmemNoleto22").doc(idbusca);

    docRef.get().then((doc) => {

        const { Data, Entregas_Realizadas, Lista_Entregas, Valor_Entregas, Horário, Log_Impressão} = doc.data();

        let oi = document.getElementById("textareabusca");
        oi.value += "Data" + " " + Data + `\n` + "Entregas Realizadas:" + " " + Entregas_Realizadas + `\n` + "Lista:" + `\n` + Lista_Entregas + `\n` + "Rendimentos:" + " " + "R$" + Valor_Entregas + `\n`+ `\n` + "Fechamento do Sistema:" + Horário + `\n` +`\n` + "Log Impressão:"+`\n`+`\n` + Log_Impressão;

    })

}
function limparb() {
    let daniel = document.getElementById("textareabusca");
    daniel.value = '';

    let ana = document.getElementById("inputbusca");
    ana.value = '';
}
function deletarb() {

    $("#squarebusca").fadeIn();

}
function Resetb() {

    $("#squareReset").fadeIn();

}
function cmdtruedelete() {


    let idbusca = document.getElementById("inputbusca").value;

    let docRefKN = db.collection("KarmemNoleto22").doc(idbusca);

    docRefKN.get().then((doc) => {

        const { Entregas_Realizadas, Valor_Entregas } = doc.data();

        RefSubEntregas = Entregas_Realizadas;
        RefSubValores = Valor_Entregas;
    })

    let docRefKNV = db.collection("KN - Valores22").doc("Valores");

    docRefKNV.get().then((doc) => {
        const { R$, Entregas_Totais } = doc.data();

        RefResultEntregas = Entregas_Totais - RefSubEntregas;
        RefResultValores = R$ - RefSubValores;

    }).then(() => {
        db.collection("KN - Valores22").doc("Valores").update({

            Entregas_Totais: RefResultEntregas,
            R$: RefResultValores

        });
    }).then(() => {

        db.collection("KarmemNoleto22").doc(idbusca).delete().then();
        limparb();
        $("#squarebusca").fadeOut();
        if(containerdados.style.display === 'block') {
            containerdados.style.display = 'none';
            dsadmin();
        } else {
            containerdados.style.display = 'block';
        }
        
    });
}
// function Resetb() {

//     $("#squareReset").fadeIn();

// }
// function cmdtrueReset()
// {
//     db.collection('KarmemNoleto22').get().then(querySnapshot => {
//         querySnapshot.docs.forEach(snapshot => {
//             snapshot.ref.delete();
//         })
//     })
//     $("#squareReset").fadeOut();
// }
// function cmdfalseReset()
// {
//     $("#squareReset").fadeOut();
// }
// function cmdfalsedelete() {
//     $("#squarebusca").fadeOut();
// }



