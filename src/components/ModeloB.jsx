import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf/dist/jspdf.umd.min.js";
import VisualizadorPDF from "./VisualizadorPDF";
import firma from "./firma_rectora.png";
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
    cc2: "",
    // Agrega aquí todos los inputs que necesites
  });

  const [outputUrl, setOutputUrl] = useState("");

  //***** Nuevo estado para almacenar el archivo seleccionado
  const [pdfFile, setPdfFile] = useState(null);

  //****** Función para manejar la carga de archivos
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
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

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`REMITIDO POR: ${formValues.remitido2}`, 20, 140);

    // Define the maximum width for the ASUNTO field
const maxAsuntoWidth = 180;

// Split the content of the ASUNTO field into lines
const asuntoLines = doc.splitTextToSize(formValues.asunto2, maxAsuntoWidth);
// Añadir el campo "Documento" en el PDF
doc.setFontSize(12);
doc.setFont("times", "normal");
doc.text(`ASUNTO: `, 20, 150);


// Calculate the height needed for the ASUNTO field
const asuntoHeight = asuntoLines.length * 5; // Multiplying by 5 for line spacing

// Initial Y-coordinate for the ASUNTO field
let asuntoY = 150;

// Add the ASUNTO field in the PDF
doc.setFontSize(12);
doc.setFont("times", "normal");

// Loop through the ASUNTO lines and add them to the PDF
for (let line of asuntoLines) {
  // Check if adding this line will exceed the page height
  if (asuntoY + 5 > doc.internal.pageSize.height - 20) {
    // Create a new page
    doc.addPage();
    asuntoY = 20; // Reset Y-coordinate to start at the top of the new page
  }

  doc.text(line, 40, asuntoY);
  asuntoY += 5; // Increase Y-coordinate for the next line
}

    
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PASE AL CONSEJO UNIVERSITARIO PARA SU TRATAMIENTO.", 20, asuntoY+10);

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("OBSERVACIONES:", 20, asuntoY+15);

   // Split the observaciones text into lines
const maxObservacionesWidth = 160; // Maximum width for observaciones text
const observacionesLines = doc.splitTextToSize(formValues.observaciones2, maxObservacionesWidth);

// Initial Y-coordinate for the observaciones text
let observacionesY = asuntoY + 20;

// Draw each line of observaciones with a line separator
doc.setFontSize(12);
doc.setFont("times", "normal");
for (const line of observacionesLines) {
  doc.text(line, 20, observacionesY);
  observacionesY += 1; // Adjust the spacing as needed

  // Draw a line separator
  doc.setLineWidth(0.2);
  doc.line(20, observacionesY, 180, observacionesY);
  observacionesY += 5; // Adjust the spacing between lines and the line separator
}

   // doc.setLineWidth(0.5);
    //doc.line(20, 176, 190, asuntoY+21);

   /* doc.setFontSize(6);
    doc.setFont("times", "normal");
    doc.text("cc.", 15, 270);
    if (formValues.cc2) {
      doc.text(`- ${formValues.cc2}`, 15, asuntoY+27);
      doc.text(`-Archivo`, 15, asuntoY+29);
      doc.text("LVAT/nmgf", 15, asuntoY+31);
    } else {
      doc.text(`-Archivo`, 15, asuntoY+27);
      doc.text("LVAT/nmgf", 15, asuntoY+29);
    }*/

    const imgeData = firma;

    doc.addImage(imgeData, "PNG", 100, 200, 60, 30, { align: "center" });
    // Guardar el PDF
    // doc.save("ModeloB.pdf");

    // Actualizar el estado con la URL del PDF
    const pdfUrl = doc.output("bloburl");
    setOutputUrl(pdfUrl);
  };

  const handleGeneratePDF = async () => {
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
    }

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`N° DE FOLIOS: ${formValues.folios2}`, 130, 120);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`DOCUMENTO: ${formValues.documento2}`, 20, 130);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`REMITIDO POR: ${formValues.remitido2}`, 20, 140);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`ASUNTO: ${formValues.asunto2}`, 20, 150);

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("PASE AL CONSEJO UNIVERSITARIO PARA SU TRATAMIENTO.", 20, 160);

    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("OBSERVACIONES:", 20, 170);

    doc.setFontSize(12);
    doc.setFont("times", "normal");
    doc.text(`${formValues.observaciones2}`, 20, 175);

    doc.setLineWidth(0.5);
    doc.line(20, 176, 190, 176);

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

    doc.addImage(imgeData, "PNG", 100, 200, 60, 30, { align: "center" });
    const pdfBlob1 = doc.output("blob");
    
    const pdfDoc1 = await PDFDocument.load(await pdfBlob1.arrayBuffer());
    const pdfDoc2 = await PDFDocument.create();

    if(pdfFile){
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBlob2 = new Blob([e.target.result], {
          type: "application/pdf",
        });

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
        downloadLink.download = `H.T. N ${formValues.envio2}-2023-R-UNE.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    reader.readAsArrayBuffer(pdfFile);
  } else {
    const mergedPdfBlob = await pdfDoc1.save();
    
        // Descarga directa del archivo PDF combinado
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(
          new Blob([mergedPdfBlob], { type: "application/pdf" })
        );
        downloadLink.download = `H.T. N ${formValues.envio2}-2023-R-UNE.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
  }
        

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
              CON COPIA A:
            </label>
            <input
              type="text"
              id="cc2"
              name="cc2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cc"
              value={formValues.cc2}
              onChange={handleInputChange}
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
