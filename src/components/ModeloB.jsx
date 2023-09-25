import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf/dist/jspdf.umd.min.js";
import VisualizadorPDF from "./VisualizadorPDF";
import firma from "./firma_rector_vladimiro.png";
import { PDFDocument } from "pdf-lib";

const ModeloB = () => {
  const [formValues, setFormValues] = useState({
    envio2: "",
    fecha2: "",
    folios2: "",
    documento2: "",
    remitido2: "",
    asunto2: "",
    observaciones2: "",
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
  const [fileNames, setFileNames] = useState(["", "", ""]); // Inicializa los nombres de los archivos
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

    //Añadir imagen
    let imgData =
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Escudo_UNE.png";
    doc.addImage(imgData, "PNG", 102, 35, 8, 12, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("times", "bold");
    doc.text("RECTORADO", doc.internal.pageSize.getWidth() / 2, 55, {
      align: "center",
    });

    //Añadir linea
    doc.setLineWidth(0.5);
    doc.line(50, 60, 155, 60);

    doc.setFontSize(14);
    doc.text("HOJA DE TRÁMITE", doc.internal.pageSize.getWidth() / 2, 90, {
      align: "center",
    });

    doc.setFontSize(14);
    doc.text(
      "CONSEJO UNIVERSITARIO",
      doc.internal.pageSize.getWidth() / 2,
      95,
      { align: "center" }
    );

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(
      `N°: ${formValues.envio2}-2023-R-UNE`,
      doc.internal.pageSize.getWidth() / 2,
      110,
      { align: "center" }
    );
    
    if (formValues.fecha2) {
    const formattedFecha = new Date(formValues.fecha2 + 'T00:00:00Z').toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      timeZone: 'UTC',
    });

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`FECHA: ${formattedFecha}`, 20, 120);
  }else{
    doc.setFontSize(12);
  doc.setFont("times", "normal");
  doc.text("FECHA: ", 20, 120);
  }

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`N° DE FOLIOS: ${formValues.folios2}`, 130, 120);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`DOCUMENTO: ${formValues.documento2}`, 20, 130);

// Define the maximum width for REMITIDO POR field
const maxRemitidoWidth = 140;

// Split the REMITIDO POR content into lines
const remitidoLines = doc.splitTextToSize(formValues.remitido2, maxRemitidoWidth);

// Calculate the height needed for the REMITIDO POR field
const remitidoHeight = remitidoLines.length * 5; // Multiplying by 5 for line spacing

// Initial Y-coordinate for the REMITIDO POR field
let remitidoY = 140;

// Add the REMITIDO POR field in the PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`REMITIDO POR: `, 20, remitidoY);

let remitidoTextY = remitidoY;
// Loop through the REMITIDO POR lines and add them to the PDF
for (let line of remitidoLines) {
  // Check if adding this line will exceed the page height
  if (remitidoTextY + 5 > doc.internal.pageSize.height - 20) {
    // Create a new page
    doc.addPage();
    remitidoTextY = 20; // Reset Y-coordinate to start at the top of the new page
  }

  doc.text(line, 52, remitidoTextY);
  remitidoTextY += 5; // Increase Y-coordinate for the next line
}

// Calculate the new Y-coordinate for the ASUNTO field, taking into account the height of REMITIDO POR
const asuntoY = remitidoY+remitidoHeight+2; // Adjust spacing as needed

// Define the maximum width for the ASUNTO field
const maxAsuntoWidth = 160;

// Split the content of the ASUNTO field into lines
const asuntoLines = doc.splitTextToSize(formValues.asunto2, maxAsuntoWidth);

// Add the ASUNTO field in the PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`ASUNTO: `, 20, asuntoY);

// Initialize Y-coordinate for the ASUNTO field
let asuntoTextY = asuntoY;

// Loop through the ASUNTO lines and add them to the PDF
for (let line of asuntoLines) {
  // Check if adding this line will exceed the page height
  if (asuntoTextY + 5 > doc.internal.pageSize.height - 20) {
    // Create a new page
    doc.addPage();
    asuntoTextY = 20; // Reset Y-coordinate to start at the top of the new page
  }

  doc.text(line, 40, asuntoTextY);
  asuntoTextY += 5; // Increase Y-coordinate for the next line
}

const asuntoHeight = asuntoLines.length * 5; // Multiplying by 5 for line spacing
const paseY = asuntoY+asuntoHeight+5;
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PASE AL CONSEJO UNIVERSITARIO PARA SU TRATAMIENTO.", 20, paseY);

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("OBSERVACIONES:", 20, paseY+5);
    
// Split the observaciones text into lines
const maxObservacionesWidth = 160; // Maximum width for observaciones text
const observacionesLines = doc.splitTextToSize(formValues.observaciones2, maxObservacionesWidth);

// Calculate the total height of observaciones text
const observacionesHeight = observacionesLines.length * 5; // Assuming a font size of 12 and 1 unit spacing between lines

// Initial Y-coordinate for the observaciones text
let observacionesY = paseY + 12;

// Draw each line of observaciones with a line separator
doc.setFontSize(12);
doc.setFont("times", "normal");
for (const line of observacionesLines) {
  doc.text(line, 20, observacionesY);
  observacionesY += 1; // Adjust the spacing as needed

  // Draw a line separator
  doc.setLineWidth(0.2);
 // doc.line(20, observacionesY, 180, observacionesY);
  observacionesY += 5; // Adjust the spacing between lines and the line separator
}

// Calculate the new Y-coordinate for the firma image
const firmaY = observacionesY + observacionesHeight; // Adjust the spacing as needed

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

if (formValues.cc3) {
doc.text(`- ${formValues.cc3}`, 15, yPosition);
yPosition += 2; // Añadir otro espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

if (formValues.cc4) {
doc.text(`- ${formValues.cc4}`, 15, yPosition);
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

// Add the firma image at the new Y-coordinate
const imgeData = firma;
doc.addImage(imgeData, "PNG", 100, firmaY, 60, 30, { align: "center" });
    // Guardar el PDF
    // doc.save("ModeloB.pdf");

    // Actualizar el estado con la URL del PDF
    const pdfUrl = doc.output("bloburl");
    setOutputUrl(pdfUrl);
    return doc;
  };

  const handleGeneratePDF = async () => {
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

 //Añadir imagen
 let imgData =
   "https://upload.wikimedia.org/wikipedia/commons/0/08/Escudo_UNE.png";
 doc.addImage(imgData, "PNG", 102, 35, 8, 12, { align: "center" });

 doc.setFontSize(14);
 doc.setFont("times", "bold");
 doc.text("RECTORADO", doc.internal.pageSize.getWidth() / 2, 55, {
   align: "center",
 });

 //Añadir linea
 doc.setLineWidth(0.5);
 doc.line(50, 60, 155, 60);

 doc.setFontSize(14);
 doc.text("HOJA DE TRÁMITE", doc.internal.pageSize.getWidth() / 2, 90, {
   align: "center",
 });

 doc.setFontSize(14);
 doc.text(
   "CONSEJO UNIVERSITARIO",
   doc.internal.pageSize.getWidth() / 2,
   95,
   { align: "center" }
 );

 doc.setFontSize(12);
 doc.setFont("times", "normal");
 doc.text(
   `N°: ${formValues.envio2}-2023-R-UNE`,
   doc.internal.pageSize.getWidth() / 2,
   110,
   { align: "center" }
 );
 
 if (formValues.fecha2) {
 const formattedFecha = new Date(formValues.fecha2 + 'T00:00:00Z').toLocaleDateString('es-ES', {
   day: '2-digit',
   month: 'long',
   timeZone: 'UTC',
 });

 doc.setFontSize(12);
 doc.setFont("times", "normal");
 doc.text(`FECHA: ${formattedFecha}`, 20, 120);
}else{
 doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text("FECHA: ", 20, 120);
}

 doc.setFontSize(12);
 doc.setFont("times", "normal");
 doc.text(`N° DE FOLIOS: ${formValues.folios2}`, 130, 120);

 doc.setFontSize(12);
 doc.setFont("times", "normal");
 doc.text(`DOCUMENTO: ${formValues.documento2}`, 20, 130);

// Define the maximum width for REMITIDO POR field
const maxRemitidoWidth = 140;

// Split the REMITIDO POR content into lines
const remitidoLines = doc.splitTextToSize(formValues.remitido2, maxRemitidoWidth);

// Calculate the height needed for the REMITIDO POR field
const remitidoHeight = remitidoLines.length * 5; // Multiplying by 5 for line spacing

// Initial Y-coordinate for the REMITIDO POR field
let remitidoY = 140;

// Add the REMITIDO POR field in the PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`REMITIDO POR: `, 20, remitidoY);

let remitidoTextY = remitidoY;
// Loop through the REMITIDO POR lines and add them to the PDF
for (let line of remitidoLines) {
// Check if adding this line will exceed the page height
if (remitidoTextY + 5 > doc.internal.pageSize.height - 20) {
 // Create a new page
 doc.addPage();
 remitidoTextY = 20; // Reset Y-coordinate to start at the top of the new page
}

doc.text(line, 52, remitidoTextY);
remitidoTextY += 5; // Increase Y-coordinate for the next line
}

// Calculate the new Y-coordinate for the ASUNTO field, taking into account the height of REMITIDO POR
const asuntoY = remitidoY+remitidoHeight+2; // Adjust spacing as needed

// Define the maximum width for the ASUNTO field
const maxAsuntoWidth = 160;

// Split the content of the ASUNTO field into lines
const asuntoLines = doc.splitTextToSize(formValues.asunto2, maxAsuntoWidth);

// Add the ASUNTO field in the PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`ASUNTO: `, 20, asuntoY);

// Initialize Y-coordinate for the ASUNTO field
let asuntoTextY = asuntoY;

// Loop through the ASUNTO lines and add them to the PDF
for (let line of asuntoLines) {
// Check if adding this line will exceed the page height
if (asuntoTextY + 5 > doc.internal.pageSize.height - 20) {
 // Create a new page
 doc.addPage();
 asuntoTextY = 20; // Reset Y-coordinate to start at the top of the new page
}

doc.text(line, 40, asuntoTextY);
asuntoTextY += 5; // Increase Y-coordinate for the next line
}

const asuntoHeight = asuntoLines.length * 5; // Multiplying by 5 for line spacing
const paseY = asuntoY+asuntoHeight+5;
 doc.setFontSize(12);
 doc.setFont("times", "bold");
 doc.text("PASE AL CONSEJO UNIVERSITARIO PARA SU TRATAMIENTO.", 20, paseY);

 doc.setFontSize(12);
 doc.setFont("times", "bold");
 doc.text("OBSERVACIONES:", 20, paseY+5);
 
// Split the observaciones text into lines
const maxObservacionesWidth = 160; // Maximum width for observaciones text
const observacionesLines = doc.splitTextToSize(formValues.observaciones2, maxObservacionesWidth);

// Calculate the total height of observaciones text
const observacionesHeight = observacionesLines.length * 5; // Assuming a font size of 12 and 1 unit spacing between lines

// Initial Y-coordinate for the observaciones text
let observacionesY = paseY + 12;

// Draw each line of observaciones with a line separator
doc.setFontSize(12);
doc.setFont("times", "normal");
for (const line of observacionesLines) {
doc.text(line, 20, observacionesY);
observacionesY += 1; // Adjust the spacing as needed

// Draw a line separator
doc.setLineWidth(0.2);
// doc.line(20, observacionesY, 180, observacionesY);
observacionesY += 5; // Adjust the spacing between lines and the line separator
}

// Calculate the new Y-coordinate for the firma image
const firmaY = observacionesY + observacionesHeight; // Adjust the spacing as needed

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

if (formValues.cc3) {
doc.text(`- ${formValues.cc3}`, 15, yPosition);
yPosition += 2; // Añadir otro espacio adicional
hasCC = true; // Indicar que hay al menos un campo cc
}

if (formValues.cc4) {
doc.text(`- ${formValues.cc4}`, 15, yPosition);
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

// Add the firma image at the new Y-coordinate
const imgeData = firma;
doc.addImage(imgeData, "PNG", 100, firmaY, 60, 30, { align: "center" });


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
         
    
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const resetFormValues = () => {
    setFormValues({
      envio2: "",
      fecha2: "",
      folios2: "",
      documento2: "",
      remitido2: "",
      asunto2: "",
      observaciones2: "",
      cc2: "",
    });
    setPdfFiles([]);
    setFileNames(["", "", ""]);
    fileNames[0]=null;
    fileNames[1]=null;
    fileNames[2]=null;
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
                id="envio2"
                name="envio2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Hoja Envio"
                value={formValues.envio2}
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
                id="fecha2"
                name="fecha2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Fecha"
                value={formValues.fecha2}
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
                id="folios2"
                name="folios2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="N° Folios"
                value={formValues.folios2}
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
              id="documento2"
              name="documento2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tipo de Documento"
              value={formValues.documento2}
              onChange={handleInputChange}
              required
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
              id="remitido2"
              name="remitido2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nombre del Área"
              value={formValues.remitido2}
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
              id="asunto2"
              name="asunto2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="asunto"
              value={formValues.asunto2}
              onChange={handleInputChange}
              required
            />
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
              id="observaciones2"
              name="observaciones2"
              value={formValues.observaciones2}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Colocar alguna Observación"
              required
            />
          </div>
          <div className="mb-6">
            <label
              for="documento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              CON COPIA A 1:
            </label>
            <input
              type="text"
              id="cc2"
              name="cc2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cc1"
              value={formValues.cc2}
              onChange={handleInputChange}
            />
            <label
              for="documento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              CON COPIA A 2:
            </label>
            <input
              type="text"
              id="cc3"
              name="cc3"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cc2"
              value={formValues.cc3}
              onChange={handleInputChange}
            />
            <label
              for="documento"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              CON COPIA A 3:
            </label>
            <input
              type="text"
              id="cc4"
              name="cc4"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cc3"
              value={formValues.cc4}
              onChange={handleInputChange}
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
          type="button"
          onClick={handleGeneratePDF}
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Generar Hoja de Trámite
        </button>
      </div>

      <VisualizadorPDF url={outputUrl} />
    </div>
  );
};

export default ModeloB;
