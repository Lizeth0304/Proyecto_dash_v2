import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf/dist/jspdf.umd.min.js";
import VisualizadorPDF from "./VisualizadorPDF";
import firma from "./firma_rectora.png";
import { PDFDocument } from "pdf-lib";

const ModeloA = () => {
  const initialFormValues = {
    envio: "",
    fecha: "",
    folios: "",
    documento: "",
    expediente: "",
    remitido: "",
    asunto: "",
    viceacade: false,
    viceinve: false,
    secre: false,
    diga: false,
    posgrado: false,
    ciencias: false,
    ciencias2: "",
    direccion: false,
    direccion2: "",
    oficina: false,
    oficina2: "",
    otro: false,
    otro2: "",
    accion: "",
    conocimiento: "",
    informar: "",
    opinion: "",
    corresponderle: "",
    indicado: "",
    respuesta: "",
    resolucion: "",
    presupuestal: "",
    devolver: "",
    verobs: "",
    observaciones: "",
    cc: "",
    cc2: "",
    // Agrega aquí todos los inputs que necesites
  };
  const [formValues, setFormValues] = useState({
    envio: "",
    fecha: "",
    folios: "",
    documento: "",
    expediente: "",
    remitido: "",
    asunto: "",
    viceacade: "",
    viceinve: "",
    secre: "",
    diga: "",
    posgrado: "",
    ciencias: "",
    ciencias2: "",
    direccion: "",
    direccion2: "",
    oficina: "",
    oficina2: "",
    otro: "",
    otro2: "",
    accion: "",
    conocimiento: "",
    informar: "",
    opinion: "",
    corresponderle: "",
    indicado: "",
    respuesta: "",
    resolucion: "",
    presupuestal: "",
    devolver: "",
    verobs: "",
    observaciones: "",
    cc: "",
    cc2: "",
    // Agrega aquí todos los inputs que necesites
  });

  const [outputUrl, setOutputUrl] = useState("");

  const [pdfFile, setPdfFile] = useState(null);

  //****** Función para manejar la carga de archivos
  const handleFileChange = (event) => {
    
    setPdfFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: inputValue,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Crear instancia de jsPDF

    doc.addFont("times", "normal", "WinAnsiEncoding");
    // Definir el estilo de fuente
    doc.setFont("times", "bold");

    // Añadir titulo parte arriba
    doc.setFontSize(15);
    doc.text(
      `UNIVERSIDAD NACIONAL DE EDUCACIÓN`,
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    doc.setFontSize(14);
    doc.text(
      "Enrique Guzmán y Valle",
      doc.internal.pageSize.getWidth() / 2,
      25,
      { align: "center" }
    );

    doc.setFontSize(14);
    doc.setFont("times", "bolditalic");
    doc.text(
      `"Alma Máter del Magisterio Nacional"`,
      doc.internal.pageSize.getWidth() / 2,
      30,
      { align: "center" }
    );

    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text("RECTORADO", doc.internal.pageSize.getWidth() / 2, 35, {
      align: "center",
    });
    //Añadir imagen
    let imgData =
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Escudo_UNE.png";
    doc.addImage(imgData, "PNG", 102, 36, 8, 12, { align: "center" });
    //Añadir linea
    doc.setLineWidth(0.5);
    doc.line(20, 50, 190, 50);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `Hoja de Envío N°: ${formValues.envio}-2023-R-UNE`,
      doc.internal.pageSize.getWidth() / 2,
      58,
      { align: "center" }
    );

    if (formValues.fecha) {
      const formattedFecha = new Date(formValues.fecha + 'T00:00:00Z').toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        timeZone: 'UTC',
      });
  
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      doc.text(`FECHA: ${formattedFecha}`, 20, 70);
    }else{
      doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text("FECHA: ", 20, 70);
    }

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`N° DE FOLIOS: ${formValues.folios}`, 130, 70);

    // Ancho máximo para el campo "Documento"
    const maxDocWidth = 140;

    // Dividir el contenido del campo "Documento" en líneas
    const docLines = doc.splitTextToSize(formValues.documento, maxDocWidth);

    // Calcular la altura necesaria para dibujar el campo "Documento"
    const docHeight = docLines.length * 5; // Multiplicar por 5 para el espacio entre líneas

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`DOCUMENTO:`, 20, 80);

    // Definir la posición inicial para el campo "Documento"
    let docY = 80;
    let docZ = 76;

    // Dibujar cada línea del campo "Documento"
    for (let line of docLines) {
      doc.text(line, 50, docY);
      doc.setLineWidth(0.2);
      docY += 5;
      // Aumentar la posición para la siguiente línea
      docZ += 5;
      doc.line(50, docZ, 192, docZ);
    }

    // Verificar si el campo "Documento" ocupó más de una línea
    if (docHeight > 5) {
      // El campo "Documento" ocupó más de una línea, colocar "expediente" debajo
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      doc.text(`${formValues.expediente}`, 20, docY + 0); // Colocar el campo "expediente" debajo del campo "Documento"
    } else {
      // El campo "Documento" ocupó solo una línea, colocar "expediente" en su posición original
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      doc.text(`${formValues.expediente}`, 20, 85); // Posición original para "expediente"
    }

    // Dividir el contenido del campo "Documento" en líneas
    const docLines2 = doc.splitTextToSize(formValues.remitido, maxDocWidth);

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`REMITIDO POR: `, 20, 98);
    // Definir la posición inicial para el campo "Documento"
    let docY2 = 98;
    let docZ2 = 94;

    // Dibujar cada línea del campo "Documento"
    for (let line of docLines2) {
      doc.text(line, 53, docY2);
      doc.setLineWidth(0.2);
      docY2 += 5; // Aumentar la posición para la siguiente línea
      docZ2 += 5;
      doc.line(53, docZ2, 192, docZ2);
    }

    const docLines3 = doc.splitTextToSize(formValues.asunto, maxDocWidth);
        
    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`ASUNTO: `, 20, 112);
    // Definir la posición inicial para el campo "Documento"
    let docY3 = 112;
    let docZ3 = 108;


    // Dibujar cada línea del campo "Documento"
    for (let line of docLines3) {
      doc.text(line, 40, docY3);
      doc.setLineWidth(0.2);
      docY3 += 5; // Aumentar la posición para la siguiente línea
      docZ3 += 5;
      doc.line(40, docZ3, 192, docZ3);
    }
    // Calculate the height needed for the ASUNTO field
    const asuntoHeight = docLines3.length * 5; // Multiplying by 5 for line spacing

    // Initial Y-coordinate for the "PASE A" section
    let paseAY = 115 + asuntoHeight; // Add some spacing



    //PASE A:
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PASE A:", 20, paseAY);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.viceacade ? "(X)" : "(   )"}  Vicerrectorado Académico`,
      20,
      paseAY+10
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${
        formValues.viceinve ? "(X)" : "(   )"
      }  Vicerrectorado de Investigación`,
      20,
      paseAY+15
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.secre ? "(X)" : "(   )"}  Secretaría General`,
      20,
      paseAY+20
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.diga ? "(X)" : "(   )"}  DIGA`, 20, paseAY+25);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.posgrado ? "(X)" : "(   )"}  Escuela de Posgrado`,
      20,
      paseAY+30
    );

    //Esta parte es la del Facultad y agregar
    const maxDocWidth2 = 57;
    // Dividir el contenido del campo "Documento" en líneas
    const docLines4 = doc.splitTextToSize(formValues.ciencias2, maxDocWidth2);

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.ciencias ? "(X)" : "(   )"}  Facultad `, 20, paseAY+35);
    // Definir la posición inicial para el campo "Documento"
    let docY4 = paseAY+35;
    let docZ4 = 156;

    // Dibujar cada línea del campo "Documento"
    for (let i = 0; i < docLines4.length; i++) {
      const line = docLines4[i];
      if (i === 0) {
        doc.text(line, 44, docY4);
        docZ4 += 5;
        doc.line(44, docZ4, 100, docZ4);
      } else {
        doc.text(line, 28, docY4);
        docZ4 += 5;
        doc.line(28, docZ4, 100, docZ4);
      }
      doc.setLineWidth(0.2);
      docY4 += 5; // Aumentar la posición para la siguiente línea
    }

    // Dividir el contenido del campo "Documento" en líneas
    const docLines5 = doc.splitTextToSize(formValues.direccion2, maxDocWidth2);

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.direccion ? "(X)" : "(   )"}  Dirección `, 20, paseAY+40);
    // Definir la posición inicial para el campo "Documento"
    let docY5 = paseAY+40;
    let docZ5 = 166;

    // Dibujar cada línea del campo "Documento"
    for (let i = 0; i < docLines5.length; i++) {
      const line = docLines5[i];
      if (i === 0) {
        doc.text(line, 46, docY5);
        docZ5 += 5;
        doc.line(46, docZ5, 100, docZ5);
      } else {
        doc.text(line, 28, docY5);
        docZ5 += 5;
        doc.line(28, docZ5, 100, docZ5);
      }
      doc.setLineWidth(0.2);
      docY5 += 5; // Aumentar la posición para la siguiente línea
    }

    // Dividir el contenido del campo "Documento" en líneas
    const docLines6 = doc.splitTextToSize(formValues.oficina2, maxDocWidth2);

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.oficina ? "(X)" : "(   )"}  Oficina `, 20, paseAY+45);
    // Definir la posición inicial para el campo "Documento"
    let docY6 = paseAY+45;
    let docZ6 = 176;

    // Dibujar cada línea del campo "Documento"
    for (let i = 0; i < docLines6.length; i++) {
      const line = docLines6[i];
      if (i === 0) {
        doc.text(line, 43, docY6);
        docZ6 += 5;
        doc.line(43, docZ6, 100, docZ6);
      } else {
        doc.text(line, 28, docY6);
        docZ6 += 5;
        doc.line(28, docZ6, 100, docZ6);
      }
      doc.setLineWidth(0.2);
      docY6 += 5; // Aumentar la posición para la siguiente línea
    }

    // Dividir el contenido del campo "Documento" en líneas
    const docLines7 = doc.splitTextToSize(formValues.otro2, maxDocWidth2);

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.otro ? "(X)" : "(   )"}  Otro `, 20, paseAY+50);
    // Definir la posición inicial para el campo "Documento"
    let docY7 = paseAY+50;
    let docZ7 = 186;

    // Dibujar cada línea del campo "Documento"
    for (let i = 0; i < docLines7.length; i++) {
      const line = docLines7[i];
      if (i === 0) {
        doc.text(line, 38, docY7);
        docZ7 += 5;
        doc.line(38, docZ7, 100, docZ7);
      } else {
        doc.text(line, 28, docY7);
        docZ7 += 5;
        doc.line(28, docZ7, 100, docZ7);
      }
      doc.setLineWidth(0.2);
      docY7 += 5; // Aumentar la posición para la siguiente línea
    }

    //PARA:
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PARA:", 110, paseAY);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.accion ? "(X)" : "(   )"}  Acción Necesaria`,
      110,
      paseAY+10
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.conocimiento ? "(X)" : "(   )"}  Conocimiento`,
      110,
      paseAY+15
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.informar ? "(X)" : "(   )"}  Informar`, 110, paseAY+20);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.opinion ? "(X)" : "(   )"}  Opinión Legal`,
      110,
      paseAY+25
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.corresponderle ? "(X)" : "(   )"}  Por corresponderle`,
      110,
      paseAY+30
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.indicado ? "(X)" : "(   )"}  Según lo indicado`,
      110,
      paseAY+35
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.respuesta ? "(X)" : "(   )"}  Proyectar Respuesta`,
      110,
      paseAY+40
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.resolucion ? "(X)" : "(   )"}  Proyectar Resolución`,
      110,
      paseAY+45
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.presupuestal ? "(X)" : "(   )"}  Previsión Presupuestal`,
      110,
      paseAY+50
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.devolver ? "(X)" : "(   )"}  Devolver`, 110, paseAY+55);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.verobs ? "(X)" : "(   )"}  VER OBSERVACIONES`,
      110,
      paseAY+60
    );

// OBSERVACIONES
doc.setFontSize(12);
doc.setFont("times", "bold");
doc.text("OBSERVACIONES:", 15, paseAY + 65);
const maxObservacionesWidth = 177;
// Split the observaciones text into lines
const observacionesLines = doc.splitTextToSize(formValues.observaciones, maxObservacionesWidth);

// Initial Y-coordinate for the observaciones text
let observacionesY = paseAY + 70;

// Dibujar cada línea del observaciones text
for (const line of observacionesLines) {
  doc.setFontSize(12);
  doc.setFont("times", "normal");
  doc.text(line, 15, observacionesY);

  // Draw a line after each line of observaciones
  doc.setLineWidth(0.2);
  doc.line(15, observacionesY + 1, 192, observacionesY + 1);

  // Increase the Y-coordinate for the next line
  observacionesY += 5; // Adjust the spacing as needed
}
    

    doc.setFontSize(6);
    doc.setFont("times", "normal");
    doc.text("cc.", 15, 270);
    if (formValues.cc2) {
      doc.text(`- ${formValues.cc2}`, 15, 272);
      doc.text(`-Archivo`, 15, 274);
      doc.text("LVAT/nmgf", 15, 276);
    } else {
      doc.text(`-Archivo`, 15, 272);
      doc.text("LVAT/nmgf", 15, 274);
    }
    const imgeData = firma;

    doc.addImage(imgeData, "PNG", 70, 230, 60, 30, { align: "center" });

    // Guardar el PDF
    // doc.save("ModeloA.pdf");

    // Actualizar el estado con la URL del PDF
    const pdfUrl = doc.output("bloburl");
    setOutputUrl(pdfUrl);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Crear instancia de jsPDF

    doc.addFont("times", "normal", "WinAnsiEncoding");
    // Definir el estilo de fuente
    doc.setFont("times", "bold");

    // Añadir titulo parte arriba
    doc.setFontSize(15);
    doc.text(
      `UNIVERSIDAD NACIONAL DE EDUCACIÓN`,
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    doc.setFontSize(14);
    doc.text(
      "Enrique Guzmán y Valle",
      doc.internal.pageSize.getWidth() / 2,
      25,
      { align: "center" }
    );

    doc.setFontSize(14);
    doc.setFont("times", "bolditalic");
    doc.text(
      `"Alma Máter del Magisterio Nacional"`,
      doc.internal.pageSize.getWidth() / 2,
      30,
      { align: "center" }
    );

    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text("RECTORADO", doc.internal.pageSize.getWidth() / 2, 35, {
      align: "center",
    });
    //Añadir imagen
    let imgData =
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Escudo_UNE.png";
    doc.addImage(imgData, "PNG", 102, 36, 8, 12, { align: "center" });
    //Añadir linea
    doc.setLineWidth(0.5);
    doc.line(20, 50, 190, 50);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `Hoja de Envío N°: ${formValues.envio}-2023-R-UNE`,
      doc.internal.pageSize.getWidth() / 2,
      58,
      { align: "center" }
    );

    if (formValues.fecha) {
      const formattedFecha = new Date(formValues.fecha + 'T00:00:00Z').toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        timeZone: 'UTC',
      });
  
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      doc.text(`FECHA: ${formattedFecha}`, 20, 70);
    }else{
      doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text("FECHA: ", 20, 70);
    }

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`N° DE FOLIOS: ${formValues.folios}`, 130, 70);

    // Ancho máximo para el campo "Documento"
    const maxDocWidth = 140;

    // Dividir el contenido del campo "Documento" en líneas
    const docLines = doc.splitTextToSize(formValues.documento, maxDocWidth);

    // Calcular la altura necesaria para dibujar el campo "Documento"
    const docHeight = docLines.length * 5; // Multiplicar por 5 para el espacio entre líneas

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`DOCUMENTO:`, 20, 80);

    // Definir la posición inicial para el campo "Documento"
    let docY = 80;
    let docZ = 76;

    // Dibujar cada línea del campo "Documento"
    for (let line of docLines) {
      doc.text(line, 50, docY);
      doc.setLineWidth(0.2);
      docY += 5;
      // Aumentar la posición para la siguiente línea
      docZ += 5;
      doc.line(50, docZ, 192, docZ);
    }

    // Verificar si el campo "Documento" ocupó más de una línea
    if (docHeight > 5) {
      // El campo "Documento" ocupó más de una línea, colocar "expediente" debajo
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      doc.text(`${formValues.expediente}`, 20, docY + 0); // Colocar el campo "expediente" debajo del campo "Documento"
    } else {
      // El campo "Documento" ocupó solo una línea, colocar "expediente" en su posición original
      doc.setFontSize(12);
      doc.setFont("times", "normal");
      doc.text(`${formValues.expediente}`, 20, 85); // Posición original para "expediente"
    }

    // Dividir el contenido del campo "Documento" en líneas
    const docLines2 = doc.splitTextToSize(formValues.remitido, maxDocWidth);

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`REMITIDO POR: `, 20, 98);
    // Definir la posición inicial para el campo "Documento"
    let docY2 = 98;
    let docZ2 = 94;

    // Dibujar cada línea del campo "Documento"
    for (let line of docLines2) {
      doc.text(line, 53, docY2);
      doc.setLineWidth(0.2);
      docY2 += 5; // Aumentar la posición para la siguiente línea
      docZ2 += 5;
      doc.line(53, docZ2, 192, docZ2);
    }

    const docLines3 = doc.splitTextToSize(formValues.asunto, maxDocWidth);
    
    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`ASUNTO: `, 20, 112);
    // Definir la posición inicial para el campo "Documento"
    let docY3 = 112;
    let docZ3 = 108;

    // Dibujar cada línea del campo "Documento"
    for (let line of docLines3) {
      doc.text(line, 40, docY3);
      doc.setLineWidth(0.2);
      docY3 += 5; // Aumentar la posición para la siguiente línea
      docZ3 += 5;
      doc.line(40, docZ3, 192, docZ3);
    }

    //PASE A:
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PASE A:", 20, 125);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.viceacade ? "(X)" : "(   )"}  Vicerrectorado Académico`,
      20,
      135
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${
        formValues.viceinve ? "(X)" : "(   )"
      }  Vicerrectorado de Investigación`,
      20,
      140
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.secre ? "(X)" : "(   )"}  Secretaría General`,
      20,
      145
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.diga ? "(X)" : "(   )"}  DIGA`, 20, 150);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.posgrado ? "(X)" : "(   )"}  Escuela de Posgrado`,
      20,
      155
    );

    //Esta parte es la del Facultad y agregar
    const maxDocWidth2 = 57;
    // Dividir el contenido del campo "Documento" en líneas
    const docLines4 = doc.splitTextToSize(formValues.ciencias2, maxDocWidth2);

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.ciencias ? "(X)" : "(   )"}  Facultad `, 20, 160);
    // Definir la posición inicial para el campo "Documento"
    let docY4 = 160;
    let docZ4 = 156;

    // Dibujar cada línea del campo "Documento"
    for (let i = 0; i < docLines4.length; i++) {
      const line = docLines4[i];
      if (i === 0) {
        doc.text(line, 44, docY4);
        docZ4 += 5;
        doc.line(44, docZ4, 100, docZ4);
      } else {
        doc.text(line, 28, docY4);
        docZ4 += 5;
        doc.line(28, docZ4, 100, docZ4);
      }
      doc.setLineWidth(0.2);
      docY4 += 5; // Aumentar la posición para la siguiente línea
    }

    // Dividir el contenido del campo "Documento" en líneas
    const docLines5 = doc.splitTextToSize(formValues.direccion2, maxDocWidth2);

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.direccion ? "(X)" : "(   )"}  Dirección `, 20, 170);
    // Definir la posición inicial para el campo "Documento"
    let docY5 = 170;
    let docZ5 = 166;

    // Dibujar cada línea del campo "Documento"
    for (let i = 0; i < docLines5.length; i++) {
      const line = docLines5[i];
      if (i === 0) {
        doc.text(line, 46, docY5);
        docZ5 += 5;
        doc.line(46, docZ5, 100, docZ5);
      } else {
        doc.text(line, 28, docY5);
        docZ5 += 5;
        doc.line(28, docZ5, 100, docZ5);
      }
      doc.setLineWidth(0.2);
      docY5 += 5; // Aumentar la posición para la siguiente línea
    }

    // Dividir el contenido del campo "Documento" en líneas
    const docLines6 = doc.splitTextToSize(formValues.oficina2, maxDocWidth2);

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.oficina ? "(X)" : "(   )"}  Oficina `, 20, 180);
    // Definir la posición inicial para el campo "Documento"
    let docY6 = 180;
    let docZ6 = 176;

    // Dibujar cada línea del campo "Documento"
    for (let i = 0; i < docLines6.length; i++) {
      const line = docLines6[i];
      if (i === 0) {
        doc.text(line, 43, docY6);
        docZ6 += 5;
        doc.line(43, docZ6, 100, docZ6);
      } else {
        doc.text(line, 28, docY6);
        docZ6 += 5;
        doc.line(28, docZ6, 100, docZ6);
      }
      doc.setLineWidth(0.2);
      docY6 += 5; // Aumentar la posición para la siguiente línea
    }

    // Dividir el contenido del campo "Documento" en líneas
    const docLines7 = doc.splitTextToSize(formValues.otro2, maxDocWidth2);

    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.otro ? "(X)" : "(   )"}  Otro `, 20, 190);
    // Definir la posición inicial para el campo "Documento"
    let docY7 = 190;
    let docZ7 = 186;

    // Dibujar cada línea del campo "Documento"
    for (let i = 0; i < docLines7.length; i++) {
      const line = docLines7[i];
      if (i === 0) {
        doc.text(line, 38, docY7);
        docZ7 += 5;
        doc.line(38, docZ7, 100, docZ7);
      } else {
        doc.text(line, 28, docY7);
        docZ7 += 5;
        doc.line(28, docZ7, 100, docZ7);
      }
      doc.setLineWidth(0.2);
      docY7 += 5; // Aumentar la posición para la siguiente línea
    }

    //PARA:
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PARA:", 110, 125);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.accion ? "(X)" : "(   )"}  Acción Necesaria`,
      110,
      135
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.conocimiento ? "(X)" : "(   )"}  Conocimiento`,
      110,
      140
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.informar ? "(X)" : "(   )"}  Informar`, 110, 145);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.opinion ? "(X)" : "(   )"}  Opinión Legal`,
      110,
      150
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.corresponderle ? "(X)" : "(   )"}  Por corresponderle`,
      110,
      155
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.indicado ? "(X)" : "(   )"}  Según lo indicado`,
      110,
      160
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.respuesta ? "(X)" : "(   )"}  Proyectar Respuesta`,
      110,
      165
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.resolucion ? "(X)" : "(   )"}  Proyectar Resolución`,
      110,
      170
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.presupuestal ? "(X)" : "(   )"}  Previsión Presupuestal`,
      110,
      175
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.devolver ? "(X)" : "(   )"}  Devolver`, 110, 180);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `${formValues.verobs ? "(X)" : "(   )"}  VER OBSERVACIONES`,
      110,
      185
    );

    //OBSERVACIONES
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("OBSERVACIONES:", 15, 210);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.observaciones}`, 15, 215);

    doc.setLineWidth(0.3);
    doc.line(15, 216, 100, 216);

    doc.setFontSize(6);
    doc.setFont("times", "normal");
    doc.text("cc.", 15, 270);
    if (formValues.cc2) {
      doc.text(`- ${formValues.cc2}`, 15, 272);
      doc.text(`-Archivo`, 15, 274);
      doc.text("LVAT/nmgf", 15, 276);
    } else {
      doc.text(`-Archivo`, 15, 272);
      doc.text("LVAT/nmgf", 15, 274);
    }

    const imgeData = firma;

    doc.addImage(imgeData, "PNG", 70, 230, 60, 30, { align: "center" });

    const pdfBlob1 = doc.output("blob");
    // Resetear los valores del formulario
    
    if (pdfFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBlob2 = new Blob([e.target.result], {
          type: "application/pdf",
        });

        const pdfDoc1 = await PDFDocument.load(await pdfBlob1.arrayBuffer());
        const pdfDoc2 = await PDFDocument.load(await pdfBlob2.arrayBuffer());

        const copiedPages = await pdfDoc1.copyPages(
          pdfDoc2,
          pdfDoc2.getPageIndices()
        );
        copiedPages.forEach((page) => {
          pdfDoc1.addPage(page);
        });

        const mergedPdfBlob = await pdfDoc1.save();

        // Descarga directa del archivo PDF combinado
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(
          new Blob([mergedPdfBlob], { type: "application/pdf" })
        );
        downloadLink.download = `H.E. N ${formValues.envio}-2023-R-UNE.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

      reader.readAsArrayBuffer(pdfFile);
    }
    resetFormValues();
  };

  const resetFormValues = () => {
    console.log("Resetting form values");
    setFormValues(initialFormValues);
    
    console.log(pdfFile)
  };

  useEffect(() => {
    generatePDF();
  }, [formValues]); // Ejecutar generatePDF cada vez que formValues cambie

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones con los valores del formulario
  };

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-2">
      <div className="w-full">
        <form action="" onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <div>
              <label
                for="Hoja de Envío N°"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Envío N°
              </label>
              <input
                type="number"
                id="envio"
                name="envio"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Hoja Envio"
                value={formValues.envio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                for="Fecha"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fecha
              </label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Fecha"
                value={formValues.fecha}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                for="N° Folios"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Folios
              </label>
              <input
                type="number"
                id="folios"
                name="folios"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="N° Folios"
                value={formValues.folios}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              for="documento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Documento
            </label>
            <input
              type="text"
              id="documento"
              name="documento"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tipo de Documento"
              value={formValues.documento}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="expediente"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Expediente
            </label>
            <input
              type="text"
              id="expediente"
              name="expediente"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tipo de Documento"
              value={formValues.expediente}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              for="remitido"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Remitido por
            </label>
            <input
              type="text"
              id="remitido"
              name="remitido"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nombre del Área"
              value={formValues.remitido}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="asunto"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Asunto
            </label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="asunto"
              value={formValues.asunto}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                PASE A:
              </h3>
              <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="viceacade"
                      name="viceacade"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      checked={formValues.viceacade}
                      onChange={handleInputChange}
                    />
                    <label
                      for="viceacade"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Vicerrectorado Académico
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="viceinve"
                      type="checkbox"
                      name="viceinve"
                      checked={formValues.viceinve}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="viceinve"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Vicerrectorado de Investigación
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="secre"
                      name="secre"
                      type="checkbox"
                      checked={formValues.secre}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="angular-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Secretaría General
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="diga"
                      name="diga"
                      type="checkbox"
                      checked={formValues.diga}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      DIGA
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="posgrado"
                      name="posgrado"
                      type="checkbox"
                      checked={formValues.posgrado}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Escuela de Posgrado
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="ciencias"
                      type="checkbox"
                      name="ciencias"
                      checked={formValues.ciencias}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Facultad
                    </label>
                    <input
                      type="text"
                      id="ciencias2"
                      name="ciencias2"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nombre Facultad"
                      value={formValues.ciencias2}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="direccion"
                      name="direccion"
                      type="checkbox"
                      checked={formValues.direccion}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      id="dirección2"
                      name="direccion2"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nombre Dirección"
                      value={formValues.direccion2}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="oficina"
                      name="oficina"
                      type="checkbox"
                      checked={formValues.oficina}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Oficina
                    </label>
                    <input
                      type="text"
                      id="oficina2"
                      name="oficina2"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nombre de Oficina"
                      value={formValues.oficina2}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="otro"
                      name="otro"
                      type="checkbox"
                      checked={formValues.otro}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Otro
                    </label>
                    <input
                      type="text"
                      id="otro2"
                      name="otro2"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Otro"
                      value={formValues.otro2}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="cc"
                      name="cc"
                      type="checkbox"
                      checked={formValues.cc}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      cc
                    </label>
                    <input
                      type="text"
                      id="cc2"
                      name="cc2"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="cc"
                      value={formValues.cc2}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                PARA:
              </h3>
              <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="accion"
                      name="accion"
                      type="checkbox"
                      checked={formValues.accion}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="vue-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Acción Necesaria
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="conocimiento"
                      name="conocimiento"
                      type="checkbox"
                      checked={formValues.conocimiento}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="react-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Conocimiento
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="informar"
                      name="informar"
                      type="checkbox"
                      checked={formValues.informar}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="angular-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Informar
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="opinion"
                      name="opinion"
                      type="checkbox"
                      checked={formValues.opinion}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Opinión Legal
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="corresponderle"
                      name="corresponderle"
                      type="checkbox"
                      checked={formValues.corresponderle}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Por corresponderle
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="indicado"
                      name="indicado"
                      type="checkbox"
                      checked={formValues.indicado}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Según lo indicado
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="respuesta"
                      name="respuesta"
                      type="checkbox"
                      checked={formValues.respuesta}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Proyectar Respuesta
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="resolucion"
                      name="resolucion"
                      type="checkbox"
                      checked={formValues.resolucion}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Proyectar Resolución
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="presupuestal"
                      name="presupuestal"
                      type="checkbox"
                      checked={formValues.presupuestal}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Previsión Presupuestal
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="devolver"
                      name="devolver"
                      type="checkbox"
                      checked={formValues.devolver}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Devolver
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="verobs"
                      name="verobs"
                      type="checkbox"
                      checked={formValues.verobs}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      VER OBSERVACIONES
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-6">
            <label
              for="documento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              OBSERVACIONES
            </label>
            <input
              type="text"
              id="observaciones"
              name="observaciones"
              value={formValues.observaciones}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Colocar alguna Observación"
              required
            />
          </div>
        </form>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="fileInput"
          >
            Adjuntar Archivo
          </label>
          <input
            type="file"
            id="fileAdjunto"
            name="fileAdjunto"
            class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            onChange={handleFileChange}
          ></input>
        </div>
        <button
          type="submit"
          onClick={handleGeneratePDF}
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Generar Hoja de Envío
        </button>
      </div>
      <VisualizadorPDF url={outputUrl} />
    </div>
  );
};

export default ModeloA;
