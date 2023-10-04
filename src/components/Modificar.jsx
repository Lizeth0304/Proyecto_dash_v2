import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import selloFechaImage from './images/sello_fecha.png';
import selloFolioImage from './images/sello_folio.png';

function Modificar() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fecha, setFecha] = useState(new Date());

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Selecciona un archivo PDF primero');
      return;
    }

    try {
      const pdfBytes = await agregarTextoAlPDF(selectedFile, fecha);
      descargarPDF(pdfBytes);
    } catch (error) {
      console.error('Error al modificar el PDF:', error);
    }
  };

  const calcularCoordenadas = (page, selloFechaWidth, selloFechaHeight, selloFolioWidth, selloFolioHeight, pageCount, pageIndex) => {
    const { width, height } = page.getSize();

    let selloX, selloY, fechaX, fechaY, folioX, folioY;

    // Calcular las coordenadas de los sellos y texto
    selloX = width - selloFechaWidth - 20;
    selloY = height - selloFechaHeight - 20;
    fechaX = width - selloFechaWidth + 20;
    fechaY = height - selloFechaHeight + 12;
    folioX = width - selloFolioWidth - 20;
    folioY = 20;

    // Calcular el número de folio en orden descendente
    const folioNumero = pageCount - pageIndex;

    return { selloX, selloY, fechaX, fechaY, folioX, folioY, folioNumero };
  };

  const agregarTextoAlPDF = async (file, fecha) => {
    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const selloFechaWidth = 119;
    const selloFechaHeight = 72;
    const selloFolioWidth = 100;
    const selloFolioHeight = 30.75;

    const formattedDate = fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const monthAbbr = formattedDate.split(' ')[1].toUpperCase().slice(0, 3);
    const formattedDateWithMonth = `${formattedDate.split(' ')[0]} ${monthAbbr}. ${formattedDate.split(' ')[2]}`;

    const pageCount = pdfDoc.getPageCount();

    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.getPage(i);
    
      const {
        selloX,
        selloY,
        fechaX,
        fechaY,
        folioX,
        folioY,
        folioNumero,
      } = calcularCoordenadas(
        page,
        selloFechaWidth,
        selloFechaHeight,
        selloFolioWidth,
        selloFolioHeight,
        pageCount,
        i
      );
    
      const selloFolioImageBytes = await fetch(selloFolioImage).then((res) => res.arrayBuffer());
      const selloFolioImageXObject = await pdfDoc.embedPng(selloFolioImageBytes);
    
      page.drawImage(selloFolioImageXObject, {
        x: folioX,
        y: folioY,
        width: selloFolioWidth,
        height: selloFolioHeight,
      });
    
      page.drawText(`${folioNumero}`, {
        x: folioX + 75,
        y: folioY + 10,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    
      // Verificar si es la primera página y agregar selloFecha y fecha
      if (i === 0) {
        const selloFechaImageBytes = await fetch(selloFechaImage).then((res) => res.arrayBuffer());
        const selloFechaImageXObject = await pdfDoc.embedPng(selloFechaImageBytes);
    
        page.drawImage(selloFechaImageXObject, {
          x: selloX,
          y: selloY,
          width: selloFechaWidth,
          height: selloFechaHeight,
        });
    
        page.drawText(`${formattedDateWithMonth}`, {
          x: fechaX,
          y: fechaY,
          size: 9,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
    }

    return pdfDoc.save();
  };

  const descargarPDF = (pdfBytes) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const urlBlob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlBlob;
    a.download = 'pdf_con_texto.pdf';
    a.click();
  };

  return (
    <div>
      <h1 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Editor de PDF</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha: </label>
        <DatePicker type='date' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" selected={fecha} onChange={(date) => setFecha(date)} />
      </div>
      <br></br>
      <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"onClick={handleUpload}>Subir y Modificar PDF</button>
    </div>
  );
}

export default Modificar;