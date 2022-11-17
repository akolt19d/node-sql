const mysql = require('mysql2');
// const queries = ["INSERT INTO tabela VALUES ('Quandale','Dingle',7)","SELECT * from tabela","DELETE FROM tabela WHERE imie='Kevin'", "UPDATE tabela SET nazwisko='Pringle' WHERE wiek=7"]

async function pobierz(table, id)
{
	return await this.promise().query(id ? `SELECT * FROM ${table} WHERE id=${id};` : `SELECT * FROM ${table};`)
}

async function aktualizuj(table, id, arg)
{
	return await this.promise().query(`UPDATE ${table} SET ${Object.entries(arg).map(entry => `${entry[0]}=${entry[1]}`)} WHERE id=${id};`)
}

async function usun(table, id)
{
	return await this.promise().query(`DELETE FROM ${table} WHERE id=${id};`)
}

async function dodaj(table, values, arr)
{
	arguments = arguments.map(arg => {
    	return typeof arg == 'number' ? arg : `"${arg}"`;
    })
	let q = arr ? `INSERT INTO ${table} (${arr}) VALUES (${values});` : `INSERT INTO ${table} VALUES (${values});`;
	console.log(q)
	return await this.promise().query(q)
}

async function main() {
	var connection = mysql.createConnection({
 		host     : 'localhost',
  		user     : 'mugabe',
  		password : 'f60RRY!QvLKAEiKO',
  		database : 'mugabe'
	});

	connection.pobierz = pobierz;
	connection.aktualizuj = aktualizuj;
	connection.usun = usun;
	connection.dodaj = dodaj;

	connection.connect();

// 	let responses = []

// 	queries.forEach(async function(x, i){
// 		let q = await connection.promise().query(x)
// 		responses.push(q)
// 		if(i == queries.length-1)
// 		{
// 			responses.map(q => q[0]).forEach(x => console.log(x))
// 			connection.end()
// 		}
// 	})

	let essior = await connection.dodaj('kolezcy', ['Greg', 'Sanches', '44'], ['imie', 'nazwisko', 'wiek'])
    console.log(essior[0])
	
	connection.end()
}

main();