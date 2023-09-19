import React from 'react'

const Modificar = () => {
  return (
    <div className="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <form action="">
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
                
                
                required
              />
            </div>
        </form>
      </div>
    </div>
  )
}

export default Modificar
