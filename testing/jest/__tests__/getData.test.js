// __tests__/getData.test.js
const axios = require('axios');
const getData = require('../src/getData');

// Simulamos axios con Jest
jest.mock('axios');

test('debe devolver datos cuando la petición es exitosa', async () => {
    const mockData = { data: { id: 1, name: 'Test' } };

    // Simulamos que axios.get resuelve con un objeto de respuesta exitoso
    axios.get.mockResolvedValue(mockData);

    const result = await getData('https://api.chucknorris.io/jokes/random');

    // Esperamos que getData devuelva los datos correctos
    expect(result).toEqual(mockData.data);
});

test('debe lanzar un error cuando la petición falla', async () => {
    // Simulamos un error en la petición
    axios.get.mockRejectedValue(new Error('Error en la petición'));

    await expect(getData('https://api.test.com/data')).rejects.toThrow('Error al obtener los datos');
});

test("debe devolver un array vacio cuando la API no tiene datos", async () => {
    const mockData = { data: [] }
    axios.get.mockResolvedValue(mockData)

    const result = await getData('https://api.chucknorris.io/jokes/random');
    expect(result).toEqual([]);
})

test('debe lanzar un error cuando la API devuelve un 404', async () => {
    const errorResponse = {
        response: {
            status: 404,
            statusText: 'Not Found'
        }
    };

    // Simulamos que axios.get rechaza con un error 404
    axios.get.mockRejectedValue(errorResponse);

    // Esperamos que getData lance un error con el mensaje adecuado
    await expect(getData('https://api.test.com/404')).rejects.toThrow('Error al obtener los datos');
});

test('debe manejar correctamente una respuesta lenta', async () => {
    const mockData = { data: { id: 1, name: 'Test' } };

    // Simulamos que axios.get resuelve después de un retraso
    axios.get.mockImplementation(() =>
        new Promise(resolve => setTimeout(() => resolve(mockData), 5000))
    );

    // Usamos fake timers de Jest para avanzar el tiempo
    jest.useFakeTimers();

    const promise = getData('https://api.test.com/slow-response');

    // Avanzamos el tiempo para que se resuelva la promesa
    jest.runAllTimers();

    const result = await promise;

    // Verificamos que la función devuelve los datos correctamente
    expect(result).toEqual(mockData.data);

    // Restauramos los timers después del test
    jest.useRealTimers();
});