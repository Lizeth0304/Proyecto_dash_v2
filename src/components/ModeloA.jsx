import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf/dist/jspdf.umd.min.js";
import VisualizadorPDF from "./VisualizadorPDF";
import firma from "./firma_rector_vladimiro.png";
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
    cc3: "",
    cc4: "",
    cc5: "",
    cc6: "",
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
    cc3: "",
    cc4: "",
    cc5: "",
    cc6: "",
    // Agrega aquí todos los inputs que necesites
  });

  const [showCustomFacultad, setShowCustomFacultad] = useState(false);

  const [outputUrl, setOutputUrl] = useState("");

  const [pdfFiles, setPdfFiles] = useState([]); // Cambia a un array para manejar múltiples archivos PDF

  const [generatedPdf, setGeneratedPdf] = useState(null); // Nuevo estado para el PDF generado

  //****** Función para manejar la carga de archivos
  const handleFileChange = (event, index) => {
    const files = event.target.files;
    const newPdfFiles = [];
  
    for (let i = 0; i < files.length; i++) {
      newPdfFiles.push(files[i]);
    }
  
    setPdfFiles((prevPdfFiles) => [...prevPdfFiles, ...newPdfFiles]);
  
     // Actualiza el nombre del archivo en el arreglo de nombres
  if (files.length > 0) {
    const newFileNames = [...fileNames];
    newFileNames[index] = files[0].name; // Actualiza el nombre del archivo en la posición correspondiente
    setFileNames(newFileNames);
  } else {
    // Si no se selecciona un archivo, borra el nombre del archivo en la posición correspondiente
    const newFileNames = [...fileNames];
    newFileNames[index] = "";
    setFileNames(newFileNames);
  }
  };
  

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    
    if (name === "ciencias2") {
      // Si el usuario selecciona "Otro", muestra el campo de texto personalizado.
      setShowCustomFacultad(value === "Otro");
    }
  
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: inputValue,
    }));
  };
  const [fileNames, setFileNames] = useState(["", "", ""]); // Inicializa los nombres de los archivos

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
    doc.text(`DOCUMENTO: ${formValues.documento}`, 20, 80);

    // Definir la posición inicial para el campo "Documento"
    let docY = 80;
    let docZ = 76;

    
   /* // Dibujar cada línea del campo "Documento"
    for (let line of docLines) {
      doc.text(line, 50, docY);
      doc.setLineWidth(0.2);
      docY += 5;
      // Aumentar la posición para la siguiente línea
      docZ += 5;
      doc.line(50, docZ, 192, docZ);
    }*/

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
    doc.text(`REMITIDO POR:`, 20, 90);
    // Definir la posición inicial para el campo "Documento"
    let docY2 = 90;
    let docZ2 = 94;

    // Dibujar cada línea del campo "Documento"
    for (let line of docLines2) {
      doc.text(line, 53, docY2);
      //doc.setLineWidth(0.2);
      docY2 += 5; // Aumentar la posición para la siguiente línea
      docZ2 += 5;
      //doc.line(53, docZ2, 192, docZ2);
    }
    const maxDocWidthAsunto = 155;
    const docLines3 = doc.splitTextToSize(formValues.asunto, maxDocWidthAsunto);
        
    // Añadir el campo "Documento" en el PDF
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`ASUNTO:`, 20, docY2+2);
    // Definir la posición inicial para el campo "Documento"
    let docY3 = docY2+2;
    let docZ3 = 108;


    // Dibujar cada línea del campo "Documento"
    for (let line of docLines3) {
      doc.text(line, 40, docY3);
      //doc.setLineWidth(0.2);
      docY3 += 5; // Aumentar la posición para la siguiente línea
      docZ3 += 5;
      //doc.line(40, docZ3, 192, docZ3);
    }



    // Calculate the height needed for the ASUNTO field
    const asuntoHeight = docLines3.length * 5; // Multiplying by 5 for line spacing

    // Initial Y-coordinate for the "PASE A" section
    let paseAY = docY3; // Add some spacing



    //PASE A:
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PASE A:", 20, paseAY+5);

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

    // Esta parte es la del Facultad y agregar
const maxDocWidth2 = 57;
const maxLinesFacultad = 4; // Puedes ajustar este número según tus necesidades

// Dividir el contenido del campo "Documento" en líneas
const docLines4 = doc.splitTextToSize(formValues.ciencias2, maxDocWidth2);

// Añadir el campo "Documento" en el PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`${formValues.ciencias ? "(X)" : "(   )"}  Facultad `, 20, paseAY + 35);
// Definir la posición inicial para el campo "Documento"
let docY4 = paseAY + 35;
let docZ4 = paseAY + 31;

// Dibujar cada línea del campo "Documento"
for (let i = 0; i < docLines4.length; i++) {
  const line = docLines4[i];
  if (i === 0) {
    doc.text(line, 44, docY4);
    docZ4 += 5;
    doc.line(44, docZ4, 100, docZ4);
  } else {
    if (i < maxLinesFacultad) {
      doc.text(line, 44, docY4);
      docZ4 += 5;
      doc.line(44, docZ4, 100, docZ4);
    } else {
      // Agregar más espacio para el texto si se excede de 2 líneas
      doc.text(line, 44, docY4 + (i - maxLinesFacultad) * 5);
      docZ4 += 5;
    }
  }
  doc.setLineWidth(0.2);
  docY4 += 5; // Aumentar la posición para la siguiente línea
}

 // Esta parte es para "Dirección"
const maxDocWidth3 = 57;
const maxLinesDireccion = 4; // Puedes ajustar este número según tus necesidades

// Dividir el contenido del campo "Dirección" en líneas
const docLines5 = doc.splitTextToSize(formValues.direccion2, maxDocWidth3);

// Añadir el campo "Dirección" en el PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`${formValues.direccion ? "(X)" : "(   )"}  Dirección `, 20, docY4);
// Definir la posición inicial para el campo "Dirección"
let docY5 = docY4;
let docZ5 = docY4-4;

// Dibujar cada línea del campo "Dirección"
for (let i = 0; i < docLines5.length; i++) {
  const line = docLines5[i];
  if (i === 0) {
    doc.text(line, 46, docY5);
    docZ5 += 5;
    doc.line(46, docZ5, 100, docZ5);
  } else {
    if (i < maxLinesDireccion) {
      doc.text(line, 46, docY5);
      docZ5 += 5;
      doc.line(46, docZ5, 100, docZ5);
    } else {
      // Agregar más espacio para el texto si se excede de 2 líneas
      doc.text(line, 46, docY5 + (i - maxLinesDireccion) * 5);
      docZ5 += 5;
    }
  }
  doc.setLineWidth(0.2);
  docY5 += 5; // Aumentar la posición para la siguiente línea
}

// Repetir el mismo enfoque para los campos "Oficina" y "Otro"
// Esta parte es para "Oficina"
const maxDocWidth4 = 57;
const maxLinesOficina = 4; // Puedes ajustar este número según tus necesidades

// Dividir el contenido del campo "Oficina" en líneas
const docLines6 = doc.splitTextToSize(formValues.oficina2, maxDocWidth4);

// Añadir el campo "Oficina" en el PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`${formValues.oficina ? "(X)" : "(   )"}  Oficina `, 20, docY5);
// Definir la posición inicial para el campo "Oficina"
let docY6 = docY5;
let docZ6 = docY5-4;

// Dibujar cada línea del campo "Oficina"
for (let i = 0; i < docLines6.length; i++) {
  const line = docLines6[i];
  if (i === 0) {
    doc.text(line, 43, docY6);
    docZ6 += 5;
    doc.line(43, docZ6, 100, docZ6);
  } else {
    if (i < maxLinesOficina) {
      doc.text(line, 43, docY6);
      docZ6 += 5;
      doc.line(43, docZ6, 100, docZ6);
    } else {
      // Agregar más espacio para el texto si se excede de 2 líneas
      doc.text(line, 43, docY6 + (i - maxLinesOficina) * 5);
      docZ6 += 5;
    }
  }
  doc.setLineWidth(0.2);
  docY6 += 5; // Aumentar la posición para la siguiente línea
}

// Esta parte es para "Otro"
const maxDocWidth5 = 57;
const maxLinesOtro = 4; // Puedes ajustar este número según tus necesidades

// Dividir el contenido del campo "Otro" en líneas
const docLines7 = doc.splitTextToSize(formValues.otro2, maxDocWidth5);

// Añadir el campo "Otro" en el PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`${formValues.otro ? "(X)" : "(   )"}  Otro `, 20, docY6);
// Definir la posición inicial para el campo "Otro"
let docY7 = docY6;
let docZ7 = docY6-4;

// Dibujar cada línea del campo "Otro"
for (let i = 0; i < docLines7.length; i++) {
  const line = docLines7[i];
  if (i === 0) {
    doc.text(line, 38, docY7);
    docZ7 += 5;
    doc.line(38, docZ7, 100, docZ7);
  } else {
    if (i < maxLinesOtro) {
      doc.text(line, 38, docY7);
      docZ7 += 5;
      doc.line(38, docZ7, 100, docZ7);
    } else {
      // Agregar más espacio para el texto si se excede de 2 líneas
      doc.text(line, 38, docY7 + (i - maxLinesOtro) * 5);
      docZ7 += 5;
    }
  }
  doc.setLineWidth(0.2);
  docY7 += 5; // Aumentar la posición para la siguiente línea
}

    //PARA:
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PARA:", 110, paseAY+5);

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
doc.text("OBSERVACIONES:", 15, docY7+15);
const maxObservacionesWidth = 177;
// Split the observaciones text into lines
const observacionesLines = doc.splitTextToSize(formValues.observaciones, maxObservacionesWidth);

// Initial Y-coordinate for the observaciones text
let observacionesY = docY7+20;

// Dibujar cada línea del observaciones text
for (const line of observacionesLines) {
  doc.setFontSize(12);
  doc.setFont("times", "normal");
  doc.text(line, 15, observacionesY);

  // Draw a line after each line of observaciones
  doc.setLineWidth(0.2);
  //doc.line(15, observacionesY + 1, 192, observacionesY + 1);

  // Increase the Y-coordinate for the next line
  observacionesY += 5; // Adjust the spacing as needed
}
    

doc.setFontSize(6);
doc.setFont("times", "normal");

let yPosition = 270; // Posición vertical inicial
let hasCC = false; // Variable para verificar si hay al menos un campo cc
doc.text("cc.", 15, 268);
// Verificar y agregar campos cc
if (formValues.cc2) {
  doc.text(`- ${formValues.cc2}`, 15, yPosition);
  yPosition += 2; // Añadir un espacio adicional
  hasCC = true; // Indicar que hay al menos un campo cc
}

if (formValues.cc4) {
  doc.text(`- ${formValues.cc4}`, 15, yPosition);
  yPosition += 2; // Añadir otro espacio adicional
  hasCC = true; // Indicar que hay al menos un campo cc
}

if (formValues.cc6) {
  doc.text(`- ${formValues.cc6}`, 15, yPosition);
  yPosition += 2; // Añadir otro espacio adicional
  hasCC = true; // Indicar que hay al menos un campo cc
}

// Agregar un guion solo si no hay campos cc
if (!hasCC) {
  doc.text("- ", 15, yPosition);
  yPosition += 2; // Añadir un espacio adicional
}

doc.text("- Archivo", 15, yPosition);
doc.text("LVAT/nmgf", 15, yPosition + 2); // Agregar espacio después de "Archivo"



    const imgeData = firma;

    doc.addImage(imgeData, "PNG", 70, observacionesY, 60, 30, { align: "center" });

    // Guardar el PDF
    // doc.save("ModeloA.pdf");

    // Actualizar el estado con la URL del PDF
    const pdfUrl = doc.output("bloburl");
    setOutputUrl(pdfUrl);
    return doc;
  };

  const handleGeneratePDF = async (event, index) => {
    const generatedPDF = generatePDF();
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
doc.text(`DOCUMENTO: ${formValues.documento}`, 20, 80);

// Definir la posición inicial para el campo "Documento"
let docY = 80;
let docZ = 76;


/* // Dibujar cada línea del campo "Documento"
for (let line of docLines) {
  doc.text(line, 50, docY);
  doc.setLineWidth(0.2);
  docY += 5;
  // Aumentar la posición para la siguiente línea
  docZ += 5;
  doc.line(50, docZ, 192, docZ);
}*/

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
doc.text(`REMITIDO POR:`, 20, 90);
// Definir la posición inicial para el campo "Documento"
let docY2 = 90;
let docZ2 = 94;

// Dibujar cada línea del campo "Documento"
for (let line of docLines2) {
  doc.text(line, 53, docY2);
  //doc.setLineWidth(0.2);
  docY2 += 5; // Aumentar la posición para la siguiente línea
  docZ2 += 5;
  //doc.line(53, docZ2, 192, docZ2);
}

const maxDocWidthAsunto = 155;
const docLines3 = doc.splitTextToSize(formValues.asunto, maxDocWidthAsunto);
    
// Añadir el campo "Documento" en el PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`ASUNTO:`, 20, docY2+2);
// Definir la posición inicial para el campo "Documento"
let docY3 = docY2+2;
let docZ3 = 108;


// Dibujar cada línea del campo "Documento"
for (let line of docLines3) {
  doc.text(line, 40, docY3);
  //doc.setLineWidth(0.2);
  docY3 += 5; // Aumentar la posición para la siguiente línea
  docZ3 += 5;
  //doc.line(40, docZ3, 192, docZ3);
}



// Calculate the height needed for the ASUNTO field
const asuntoHeight = docLines3.length * 5; // Multiplying by 5 for line spacing

// Initial Y-coordinate for the "PASE A" section
let paseAY = docY3; // Add some spacing



//PASE A:
doc.setFontSize(12);
doc.setFont("times", "bold");
doc.text("PASE A:", 20, paseAY+5);

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

// Esta parte es la del Facultad y agregar
const maxDocWidth2 = 57;
const maxLinesFacultad = 4; // Puedes ajustar este número según tus necesidades

// Dividir el contenido del campo "Documento" en líneas
const docLines4 = doc.splitTextToSize(formValues.ciencias2, maxDocWidth2);

// Añadir el campo "Documento" en el PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`${formValues.ciencias ? "(X)" : "(   )"}  Facultad `, 20, paseAY + 35);
// Definir la posición inicial para el campo "Documento"
let docY4 = paseAY + 35;
let docZ4 = paseAY + 31;

// Dibujar cada línea del campo "Documento"
for (let i = 0; i < docLines4.length; i++) {
const line = docLines4[i];
if (i === 0) {
doc.text(line, 44, docY4);
docZ4 += 5;
doc.line(44, docZ4, 100, docZ4);
} else {
if (i < maxLinesFacultad) {
  doc.text(line, 44, docY4);
  docZ4 += 5;
  doc.line(44, docZ4, 100, docZ4);
} else {
  // Agregar más espacio para el texto si se excede de 2 líneas
  doc.text(line, 44, docY4 + (i - maxLinesFacultad) * 5);
  docZ4 += 5;
}
}
doc.setLineWidth(0.2);
docY4 += 5; // Aumentar la posición para la siguiente línea
}

// Esta parte es para "Dirección"
const maxDocWidth3 = 57;
const maxLinesDireccion = 4; // Puedes ajustar este número según tus necesidades

// Dividir el contenido del campo "Dirección" en líneas
const docLines5 = doc.splitTextToSize(formValues.direccion2, maxDocWidth3);

// Añadir el campo "Dirección" en el PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`${formValues.direccion ? "(X)" : "(   )"}  Dirección `, 20, docY4);
// Definir la posición inicial para el campo "Dirección"
let docY5 = docY4;
let docZ5 = docY4-4;

// Dibujar cada línea del campo "Dirección"
for (let i = 0; i < docLines5.length; i++) {
const line = docLines5[i];
if (i === 0) {
doc.text(line, 46, docY5);
docZ5 += 5;
doc.line(46, docZ5, 100, docZ5);
} else {
if (i < maxLinesDireccion) {
  doc.text(line, 46, docY5);
  docZ5 += 5;
  doc.line(46, docZ5, 100, docZ5);
} else {
  // Agregar más espacio para el texto si se excede de 2 líneas
  doc.text(line, 46, docY5 + (i - maxLinesDireccion) * 5);
  docZ5 += 5;
}
}
doc.setLineWidth(0.2);
docY5 += 5; // Aumentar la posición para la siguiente línea
}

// Repetir el mismo enfoque para los campos "Oficina" y "Otro"
// Esta parte es para "Oficina"
const maxDocWidth4 = 57;
const maxLinesOficina = 4; // Puedes ajustar este número según tus necesidades

// Dividir el contenido del campo "Oficina" en líneas
const docLines6 = doc.splitTextToSize(formValues.oficina2, maxDocWidth4);

// Añadir el campo "Oficina" en el PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`${formValues.oficina ? "(X)" : "(   )"}  Oficina `, 20, docY5);
// Definir la posición inicial para el campo "Oficina"
let docY6 = docY5;
let docZ6 = docY5-4;

// Dibujar cada línea del campo "Oficina"
for (let i = 0; i < docLines6.length; i++) {
const line = docLines6[i];
if (i === 0) {
doc.text(line, 43, docY6);
docZ6 += 5;
doc.line(43, docZ6, 100, docZ6);
} else {
if (i < maxLinesOficina) {
  doc.text(line, 43, docY6);
  docZ6 += 5;
  doc.line(43, docZ6, 100, docZ6);
} else {
  // Agregar más espacio para el texto si se excede de 2 líneas
  doc.text(line, 43, docY6 + (i - maxLinesOficina) * 5);
  docZ6 += 5;
}
}
doc.setLineWidth(0.2);
docY6 += 5; // Aumentar la posición para la siguiente línea
}

// Esta parte es para "Otro"
const maxDocWidth5 = 57;
const maxLinesOtro = 4; // Puedes ajustar este número según tus necesidades

// Dividir el contenido del campo "Otro" en líneas
const docLines7 = doc.splitTextToSize(formValues.otro2, maxDocWidth5);

// Añadir el campo "Otro" en el PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`${formValues.otro ? "(X)" : "(   )"}  Otro `, 20, docY6);
// Definir la posición inicial para el campo "Otro"
let docY7 = docY6;
let docZ7 = docY6-4;

// Dibujar cada línea del campo "Otro"
for (let i = 0; i < docLines7.length; i++) {
const line = docLines7[i];
if (i === 0) {
doc.text(line, 38, docY7);
docZ7 += 5;
doc.line(38, docZ7, 100, docZ7);
} else {
if (i < maxLinesOtro) {
  doc.text(line, 38, docY7);
  docZ7 += 5;
  doc.line(38, docZ7, 100, docZ7);
} else {
  // Agregar más espacio para el texto si se excede de 2 líneas
  doc.text(line, 38, docY7 + (i - maxLinesOtro) * 5);
  docZ7 += 5;
}
}
doc.setLineWidth(0.2);
docY7 += 5; // Aumentar la posición para la siguiente línea
}

//PARA:
doc.setFontSize(12);
doc.setFont("times", "bold");
doc.text("PARA:", 110, paseAY+5);

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
doc.text("OBSERVACIONES:", 15, docY7+15);
const maxObservacionesWidth = 177;
// Split the observaciones text into lines
const observacionesLines = doc.splitTextToSize(formValues.observaciones, maxObservacionesWidth);

// Initial Y-coordinate for the observaciones text
let observacionesY = docY7+20;

// Dibujar cada línea del observaciones text
for (const line of observacionesLines) {
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(line, 15, observacionesY);

// Draw a line after each line of observaciones
doc.setLineWidth(0.2);
//doc.line(15, observacionesY + 1, 192, observacionesY + 1);

// Increase the Y-coordinate for the next line
observacionesY += 5; // Adjust the spacing as needed
}


doc.setFontSize(6);
doc.setFont("times", "normal");

let yPosition = 270; // Posición vertical inicial
let hasCC = false; // Variable para verificar si hay al menos un campo cc
doc.text("cc.", 15, 268);
// Verificar y agregar campos cc
if (formValues.cc2) {
doc.text(`- ${formValues.cc2}`, 15, yPosition);
yPosition += 2; // Añadir un espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

if (formValues.cc4) {
doc.text(`- ${formValues.cc4}`, 15, yPosition);
yPosition += 2; // Añadir otro espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

if (formValues.cc6) {
doc.text(`- ${formValues.cc6}`, 15, yPosition);
yPosition += 2; // Añadir otro espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

// Agregar un guion solo si no hay campos cc
if (!hasCC) {
doc.text("- ", 15, yPosition);
yPosition += 2; // Añadir un espacio adicional
}

doc.text("- Archivo", 15, yPosition);
doc.text("LVAT/nmgf", 15, yPosition + 2); // Agregar espacio después de "Archivo"



const imgeData = firma;

doc.addImage(imgeData, "PNG", 70, observacionesY, 60, 30, { align: "center" });

// Crea una lista de promesas para cargar y combinar archivos PDF adjuntos
const loadAndCombinePromises = [];

// Genera el PDF base y agrégalo a la lista de promesas
loadAndCombinePromises.push(
  new Promise(async (resolve) => {
    const generatedPdfBlob = await generatedPDF.output("blob");
    const generatedPdfDoc = await PDFDocument.load(
      await generatedPdfBlob.arrayBuffer()
    );
    resolve(generatedPdfDoc);
  })
);

// Carga y combina Archivo Adjunto 1 y agrégalo a la lista de promesas
if (pdfFiles.length > 0) {
  loadAndCombinePromises.push(
    new Promise(async (resolve) => {
      const pdfFile = pdfFiles[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBlob = new Blob([e.target.result], {
          type: "application/pdf",
        });
        const pdfDoc = await PDFDocument.load(await pdfBlob.arrayBuffer());
        resolve(pdfDoc);
      };
      reader.readAsArrayBuffer(pdfFile);
    })
  );
}

// Carga y combina Archivo Adjunto 2 y agrégalo a la lista de promesas
if (pdfFiles.length > 1) {
  loadAndCombinePromises.push(
    new Promise(async (resolve) => {
      const pdfFile = pdfFiles[1];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBlob = new Blob([e.target.result], {
          type: "application/pdf",
        });
        const pdfDoc = await PDFDocument.load(await pdfBlob.arrayBuffer());
        resolve(pdfDoc);
      };
      reader.readAsArrayBuffer(pdfFile);
    })
  );
}

// Carga y combina Archivo Adjunto 3 y agrégalo a la lista de promesas
if (pdfFiles.length > 2) {
  loadAndCombinePromises.push(
    new Promise(async (resolve) => {
      const pdfFile = pdfFiles[2];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBlob = new Blob([e.target.result], {
          type: "application/pdf",
        });
        const pdfDoc = await PDFDocument.load(await pdfBlob.arrayBuffer());
        resolve(pdfDoc);
      };
      reader.readAsArrayBuffer(pdfFile);
    })
  );
}

// Espera a que todas las promesas se completen
const loadedPdfDocs = await Promise.all(loadAndCombinePromises);

// Combina todos los archivos PDF en el orden deseado
const mergedPdfDoc = await PDFDocument.create();
for (const pdfDoc of loadedPdfDocs) {
  const copiedPages = await mergedPdfDoc.copyPages(
    pdfDoc,
    pdfDoc.getPageIndices()
  );
  copiedPages.forEach((page) => {
    mergedPdfDoc.addPage(page);
  });
}

// Descarga el PDF resultante
const mergedPdfBlob = await mergedPdfDoc.save();
const downloadLink = document.createElement("a");
downloadLink.href = URL.createObjectURL(
  new Blob([mergedPdfBlob], { type: "application/pdf" })
);
downloadLink.download = `H.E. N ${formValues.envio}-2023-R-UNE.pdf`;
document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);

// Actualiza los nombres de archivo a vacío
setFileNames(["", "", ""]);

resetFormValues();
};
  const resetFormValues = () => {
    console.log("Resetting form values");
    setFormValues(initialFormValues);
    setPdfFiles([]);
    setFileNames(["", "", ""]);
    console.log(pdfFile)
  };

  useEffect(() => {
    generatePDF();
  }, [formValues]); // Ejecutar generatePDF cada vez que formValues cambie

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones con los valores del formulario
  };
  const handleRemoveFile = (index) => {
    const newPdfFiles = [...pdfFiles];
    newPdfFiles.splice(index, 1); // Elimina el archivo en la posición especificada
    setPdfFiles(newPdfFiles);
  
    const newFileNames = [...fileNames];
    newFileNames[index] = ""; // Establece el nombre del archivo en blanco
    setFileNames(newFileNames);
  
    // Restablecer el valor del input file
    const fileInput = document.getElementById(`fileAdjunto${index + 1}`);
    if (fileInput) {
      fileInput.value = "";
    }
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
                  htmlFor="ciencias2"
                  className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Facultad
                </label>
                <select
                  id="ciencias2"
                  name="ciencias2"
                  value={formValues.ciencias2}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="">Selecciona una facultad</option>
                  <option value=" de Agropecuaria y Nutrición"> de Agropecuaria y Nutrición</option>
                  <option value=" de Ciencias"> de Ciencias</option>
                  <option value=" de Ciencias Empresariales"> de Ciencias Empresariales</option>
                  <option value=" de Ciencias Sociales y Humanidades"> de Ciencias Sociales y Humanidades</option>
                  <option value=" de Educación Inicial"> de Educación Inicial</option>
                  <option value=" de Pedagogía y Cultura Física"> de Pedagogía y Cultura Física</option>
                  <option value=" de Tecnología"> de Tecnología</option>
                  {/* Agrega más opciones según sea necesario */}
                </select>

{/* Caja de texto "Otro" que se muestra cuando se selecciona "Otro" */}
<input
  type="text"
  id="otraFacultad"
  name="otraFacultad"
  placeholder="Especificar otra facultad"
  value={formValues.otraFacultad}
  onChange={handleInputChange}
  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
    formValues.ciencias2 === "Otro" ? "" : "hidden"
  }`} // Agrega o quita la clase "hidden" según la selección
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
                  <div className="flex items-center pl-3">
                  <input
                      id="cc3"
                      name="cc3"
                      type="checkbox"
                      checked={formValues.cc3}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      cc2
                    </label>
                    <input
                      type="text"
                      id="cc4"
                      name="cc4"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="cc2"
                      value={formValues.cc4}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="flex items-center pl-3">
                  <input
                      id="cc5"
                      name="cc5"
                      type="checkbox"
                      checked={formValues.cc5}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      for="laravel-checkbox"
                      className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      cc3
                    </label>
                    <input
                      type="text"
                      id="cc6"
                      name="cc6"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="cc3"
                      value={formValues.cc6}
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
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Archivo Adjunto 1:
  </label>
  <div className="flex items-center">
    <input
      type="file"
      id="fileAdjunto1"
      name="fileAdjunto1"
      className="hidden" // Oculta el input de tipo "file"
      onChange={(e) => handleFileChange(e, 0)}
    />
    <label
      htmlFor="fileAdjunto1"
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
    >
      Adjuntar Archivo
    </label>
    {fileNames[0] && (
      <div className="text-gray-900 dark:text-white mr-2">{fileNames[0]}</div>
    )}
    {fileNames[0] && (
      <button
        type="button"
        className="text-red-500 hover:text-red-600 font-semibold"
        onClick={() => handleRemoveFile(0)}
      >
        Eliminar
      </button>
    )}
  </div>
</div>
<div>
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Archivo Adjunto 2:
  </label>
  <div className="flex items-center">
    <input
      type="file"
      id="fileAdjunto2"
      name="fileAdjunto2"
      className="hidden" // Oculta el input de tipo "file"
      onChange={(e) => handleFileChange(e, 1)}
    />
    <label
      htmlFor="fileAdjunto2"
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
    >
      Adjuntar Archivo
    </label>
    {fileNames[1] && (
      <div className="text-gray-900 dark:text-white mr-2">{fileNames[1]}</div>
    )}
    {fileNames[1] && (
      <button
        type="button"
        className="text-red-500 hover:text-red-600 font-semibold"
        onClick={() => handleRemoveFile(1)}
      >
        Eliminar
      </button>
    )}
  </div>
</div>
<div>
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Archivo Adjunto 3:
  </label>
  <div className="flex items-center">
    <input
      type="file"
      id="fileAdjunto3"
      name="fileAdjunto3"
      className="hidden" // Oculta el input de tipo "file"
      onChange={(e) => handleFileChange(e, 2)}
    />
    <label
      htmlFor="fileAdjunto3"
      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
    >
      Adjuntar Archivo
    </label>
    {fileNames[2] && (
      <div className="text-gray-900 dark:text-white mr-2">{fileNames[2]}</div>
    )}
    {fileNames[2] && (
      <button
        type="button"
        className="text-red-500 hover:text-red-600 font-semibold"
        onClick={() => handleRemoveFile(2)}
      >
        Eliminar
      </button>
    )}
  </div>
</div>
<br></br>
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
