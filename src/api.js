const baseUrl = "https://swapi.dev/api/";
const url ={
people: `${baseUrl}people/`,
planets: `${baseUrl}planets/`,
starships: `${baseUrl}starships/`,
vehicles: `${baseUrl}vehicles/`,

}
// let params = "page=1"

// async function getPeople({params}) {
//     const res = await fetch(`${url}people/?${{params}}`)
//     const data = await res.json()
//     return this.characters = data
// }

// async function getPlanets() {
//     const res = await fetch(`${url}planets/${params}`)
//     const data = await res.json()
//     return this.planets = data
// }

// async function getstarships() {
//     const res = await fetch(`${url}starships/${params}`)
//     const data = await res.json()
//     return this.starships = data
// }

// async function getVehicles() {
//     const res = await fetch(`${url}vehicles/${params}`)
//     const data = await res.json()
//     return this.vehicles = data
// }

export default{
    url
};